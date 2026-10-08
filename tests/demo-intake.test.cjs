const { test, after } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs/promises')
const os = require('node:os')
const path = require('node:path')
const { randomUUID } = require('node:crypto')
const ts = require('typescript')
// Compile the production modules with the project's existing TypeScript dependency.
require.extensions['.ts'] = (module, filename) => {
  const source = require('node:fs').readFileSync(filename, 'utf8')
  module._compile(
    ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        esModuleInterop: true,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText,
    filename,
  )
}
const { validateDemo } = require('../src/lib/demo/validation.ts')
const { persistDemo, IntakeError } = require('../src/lib/demo/storage.ts')
const originalEnv = { ...process.env }
const originalFetch = global.fetch
let directory
const sample = () => ({
  requestId: randomUUID(),
  name: 'Uji Internal',
  business: 'Kafe Pengujian',
  businessType: 'Kafe / kedai kopi',
  outlets: '1',
  city: 'Kota Uji',
  contactMethod: 'whatsapp',
  contact: '081234567890',
  challenge: 'Laporan',
  notes: '',
  consent: true,
})
after(async () => {
  process.env = originalEnv
  global.fetch = originalFetch
  if (directory) await fs.rm(directory, { recursive: true, force: true })
})
test('normalizes Indonesian contact numbers without retaining unknown fields', () => {
  const result = validateDemo({
    ...sample(),
    name: '  Uji Internal ',
    extra: 'discard',
  })
  assert.deepEqual(result.errors, {})
  assert.equal(result.data.contact, '+6281234567890')
  assert.equal(result.data.name, 'Uji Internal')
  assert.equal(result.data.extra, undefined)
})
test('rejects malformed identifiers, missing consent, invalid contact, and oversized notes', () => {
  const result = validateDemo({
    ...sample(),
    requestId: '../../file',
    consent: false,
    contact: 'invalid',
    notes: 'a'.repeat(1201),
  })
  assert.equal(result.data, undefined)
  for (const field of ['form', 'consent', 'contact', 'notes'])
    assert.ok(result.errors[field])
  for (const input of [null, [], 'text'])
    assert.equal(validateDemo(input).data, undefined)
})
test('concurrent retries publish one durable record; changed payload cannot overwrite it', async () => {
  directory = await fs.mkdtemp(path.join(os.tmpdir(), 'ansilum-intake-test-'))
  delete process.env.DEMO_INTAKE_URL
  delete process.env.VERCEL
  process.env.DEMO_STORAGE_DIR = directory
  const data = validateDemo(sample()).data
  const ids = await Promise.all([
    persistDemo(data),
    persistDemo(data),
    persistDemo(data),
  ])
  assert.deepEqual(ids, [data.requestId, data.requestId, data.requestId])
  assert.deepEqual(await fs.readdir(directory), [`${data.requestId}.json`])
  const stored = JSON.parse(
    await fs.readFile(path.join(directory, `${data.requestId}.json`), 'utf8'),
  )
  assert.equal(stored.contact, '+6281234567890')
  assert.equal(stored.policyVersion, '2026-10-08')
  assert.equal(
    (await fs.stat(path.join(directory, `${data.requestId}.json`))).mode &
      0o777,
    0o600,
  )
  await assert.rejects(
    persistDemo({ ...data, business: 'Changed business' }),
    (error) => error instanceof IntakeError && error.code === 'conflict',
  )
  assert.deepEqual(await fs.readdir(directory), [`${data.requestId}.json`])
})
test('production and serverless cannot acknowledge ephemeral local storage', async () => {
  delete process.env.DEMO_STORAGE_DIR
  process.env.NODE_ENV = 'production'
  await assert.rejects(persistDemo(validateDemo(sample()).data), /unavailable/)
  process.env.DEMO_STORAGE_DIR = directory
  process.env.VERCEL = '1'
  await assert.rejects(persistDemo(validateDemo(sample()).data), /unavailable/)
  delete process.env.VERCEL
})
test('external intake must acknowledge the exact request ID; preserves idempotency key', async () => {
  process.env.DEMO_INTAKE_URL = 'https://intake.example.test/demo'
  const data = validateDemo(sample()).data
  global.fetch = async (_url, options) => {
    assert.equal(options.headers['Idempotency-Key'], data.requestId)
    assert.equal(JSON.parse(options.body).source, 'ansilum-website')
    return new Response(
      JSON.stringify({ accepted: true, requestId: data.requestId }),
    )
  }
  assert.equal(await persistDemo(data), data.requestId)
  global.fetch = async () =>
    new Response(JSON.stringify({ accepted: true, requestId: randomUUID() }))
  await assert.rejects(persistDemo(data), /unavailable/)
  global.fetch = async () => new Response('{}', { status: 409 })
  await assert.rejects(persistDemo(data), /conflict/)
  process.env.DEMO_INTAKE_URL = 'http://intake.example.test/demo'
  await assert.rejects(persistDemo(data), /unavailable/)
})
