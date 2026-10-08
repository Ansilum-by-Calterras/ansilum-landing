import { createHash, randomUUID } from 'node:crypto'
import { link, mkdir, open, readFile, unlink } from 'node:fs/promises'
import path from 'node:path'
import type { DemoRequest } from './validation'
export class IntakeError extends Error {
  constructor(public code: 'unavailable' | 'conflict') {
    super(code)
  }
}
function fingerprint(data: DemoRequest) {
  return createHash('sha256').update(JSON.stringify(data)).digest('hex')
}
/** Atomic publication after fsync; an acknowledged ID survives response loss and retries. */
export async function persistDemo(data: DemoRequest) {
  const webhook = process.env.DEMO_INTAKE_URL
  if (webhook) {
    const target = new URL(webhook)
    if (target.protocol !== 'https:') throw new IntakeError('unavailable')
    const response = await fetch(target, {
      method: 'POST',
      redirect: 'error',
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': data.requestId,
        ...(process.env.DEMO_INTAKE_TOKEN
          ? { Authorization: `Bearer ${process.env.DEMO_INTAKE_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        ...data,
        receivedAt: new Date().toISOString(),
        source: 'ansilum-website',
        policyVersion: '2026-10-09',
      }),
    })
    if (response.status === 409) throw new IntakeError('conflict')
    if (!response.ok) throw new IntakeError('unavailable')
    const acknowledgement = await response.json()
    if (
      acknowledgement.accepted !== true ||
      acknowledgement.requestId !== data.requestId
    )
      throw new IntakeError('unavailable')
    return data.requestId
  }
  // Serverless local files are not durable. Production must explicitly select a persistent volume or external intake.
  if (
    process.env.VERCEL ||
    (!process.env.DEMO_STORAGE_DIR && process.env.NODE_ENV === 'production')
  )
    throw new IntakeError('unavailable')
  const directory = path.resolve(
    process.env.DEMO_STORAGE_DIR || '.data/demo-requests',
  )
  await mkdir(directory, { recursive: true, mode: 0o700 })
  const file = path.join(directory, `${data.requestId}.json`)
  const temporary = path.join(
    directory,
    `.${data.requestId}.${randomUUID()}.tmp`,
  )
  const record = {
    ...data,
    receivedAt: new Date().toISOString(),
    source: 'ansilum-website',
    policyVersion: '2026-10-09',
    fingerprint: fingerprint(data),
  }
  const handle = await open(temporary, 'wx', 0o600)
  try {
    await handle.writeFile(JSON.stringify(record) + '\n')
    await handle.sync()
  } finally {
    await handle.close()
  }
  try {
    try {
      await link(temporary, file)
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error
      const previous = JSON.parse(await readFile(file, 'utf8'))
      if (previous.fingerprint !== record.fingerprint)
        throw new IntakeError('conflict')
    }
    const folder = await open(directory, 'r')
    try {
      await folder.sync()
    } finally {
      await folder.close()
    }
    return data.requestId
  } finally {
    await unlink(temporary).catch(() => {})
  }
}
