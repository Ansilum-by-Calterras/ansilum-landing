import { siteConfig } from '@/config/site'
import { IntakeError, persistDemo } from '@/lib/demo/storage'
import { validateDemo } from '@/lib/demo/validation'
import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const attempts = new Map<string, { count: number; until: number }>()
const text = {
  id: {
    origin: 'Permintaan tidak dapat diproses dari halaman ini.',
    format: 'Format permintaan tidak sesuai.',
    throttle: 'Terlalu banyak percobaan. Tunggu beberapa menit, lalu coba lagi.',
    empty: 'Data formulir belum diterima.',
    size: 'Data terlalu panjang.',
    invalid: 'Data formulir tidak valid.',
    rejected: 'Permintaan tidak dapat diproses.',
    fields: 'Periksa kolom yang ditandai.',
    conflict: 'Permintaan sebelumnya sudah tersimpan. Muat ulang untuk membuat permintaan baru.',
    unavailable: 'Konfirmasi penyimpanan belum diterima. Coba kirim lagi untuk memeriksa permintaan yang sama.',
  },
  en: {
    origin: 'This request cannot be processed from this page.',
    format: 'The request format is not supported.',
    throttle: 'Too many attempts. Wait a few minutes, then try again.',
    empty: 'The form data was not received.',
    size: 'The form data is too long.',
    invalid: 'The form data is not valid.',
    rejected: 'This request cannot be processed.',
    fields: 'Please check the highlighted fields.',
    conflict: 'An earlier request is already saved. Reload the page to make a new request.',
    unavailable: 'We have not received confirmation that your request was saved. Send it again to check the same request.',
  },
}
function response(body: unknown, status: number, headers = {}) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...headers },
  })
}
export async function POST(request: NextRequest) {
  const t = text[request.headers.get('x-ansilum-locale') === 'en' ? 'en' : 'id']
  const origin = request.headers.get('origin')
  const allowed = new Set([
    new URL(request.url).origin,
    ...(siteConfig.url ? [siteConfig.url] : []),
  ])
  if (!origin || !allowed.has(origin))
    return response(
      { error: t.origin },
      403,
    )
  if (!request.headers.get('content-type')?.includes('application/json'))
    return response({ error: t.format }, 415)
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
      { error: t.throttle },
      429,
      { 'Retry-After': '600' },
    )
  try {
    // Bound the body while reading, rather than trusting Content-Length.
    const reader = request.body?.getReader()
    if (!reader)
      return response({ error: t.empty }, 400)
    let bytes = 0
    const chunks: Uint8Array[] = []
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      bytes += value.byteLength
      if (bytes > 16384) {
        await reader.cancel()
        return response({ error: t.size }, 413)
      }
      chunks.push(value)
    }
    let raw: unknown
    try {
      raw = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    } catch {
      return response({ error: t.invalid }, 400)
    }
    if (
      raw &&
      typeof raw === 'object' &&
      'website' in raw &&
      (raw as { website?: unknown }).website
    )
      return response({ error: t.rejected }, 422)
    const { data, errors } = validateDemo(raw)
    if (!data)
      return response({ errors, error: t.fields }, 422)
    const requestId = await persistDemo(data)
    return response({ accepted: true, requestId }, 201)
  } catch (error) {
    if (error instanceof IntakeError && error.code === 'conflict')
      return response(
        { error: t.conflict },
        409,
      )
    return response(
      { error: t.unavailable },
      503,
    )
  }
}
