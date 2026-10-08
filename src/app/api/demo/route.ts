import { siteConfig } from '@/config/site'
import { IntakeError, persistDemo } from '@/lib/demo/storage'
import { validateDemo } from '@/lib/demo/validation'
import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const attempts = new Map<string, { count: number; until: number }>()
function response(body: unknown, status: number, headers = {}) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...headers },
  })
}
export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin')
  const allowed = new Set([
    new URL(request.url).origin,
    ...(siteConfig.url ? [siteConfig.url] : []),
  ])
  if (!origin || !allowed.has(origin))
    return response(
      { error: 'Permintaan tidak dapat diproses dari halaman ini.' },
      403,
    )
  if (!request.headers.get('content-type')?.includes('application/json'))
    return response({ error: 'Format permintaan tidak sesuai.' }, 415)
  const ip =
    (process.env.DEMO_TRUST_PROXY === 'true'
      ? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      : undefined) || 'local'
  const key = createHash('sha256').update(ip).digest('hex')
  const now = Date.now()
  for (const [id, item] of attempts) if (item.until < now) attempts.delete(id)
  const budget = attempts.get(key) || { count: 0, until: now + 600000 }
  budget.count += 1
  attempts.set(key, budget)
  if (budget.count > 10)
    return response(
      {
        error:
          'Terlalu banyak percobaan. Tunggu beberapa menit, lalu coba lagi.',
      },
      429,
      { 'Retry-After': '600' },
    )
  try {
    // Bound the body while reading, rather than trusting Content-Length.
    const reader = request.body?.getReader()
    if (!reader)
      return response({ error: 'Data formulir belum diterima.' }, 400)
    let bytes = 0
    const chunks: Uint8Array[] = []
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      bytes += value.byteLength
      if (bytes > 16384) {
        await reader.cancel()
        return response({ error: 'Data terlalu panjang.' }, 413)
      }
      chunks.push(value)
    }
    let raw: unknown
    try {
      raw = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    } catch {
      return response({ error: 'Data formulir tidak valid.' }, 400)
    }
    if (
      raw &&
      typeof raw === 'object' &&
      'website' in raw &&
      (raw as { website?: unknown }).website
    )
      return response({ error: 'Permintaan tidak dapat diproses.' }, 422)
    const { data, errors } = validateDemo(raw)
    if (!data)
      return response({ errors, error: 'Periksa kolom yang ditandai.' }, 422)
    const requestId = await persistDemo(data)
    return response({ accepted: true, requestId }, 201)
  } catch (error) {
    if (error instanceof IntakeError && error.code === 'conflict')
      return response(
        {
          error:
            'Permintaan sebelumnya sudah tersimpan. Muat ulang untuk membuat permintaan baru.',
        },
        409,
      )
    return response(
      {
        error:
          'Konfirmasi penyimpanan belum diterima. Coba kirim lagi untuk memeriksa permintaan yang sama.',
      },
      503,
    )
  }
}
