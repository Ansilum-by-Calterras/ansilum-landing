const { test } = require('node:test')
const assert = require('node:assert/strict')
const ts = require('typescript')
require.extensions['.ts'] = (module, filename) => {
  const source = require('node:fs').readFileSync(filename, 'utf8')
  module._compile(
    ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true, target: ts.ScriptTarget.ES2022 },
    }).outputText,
    filename,
  )
}
const { daily, products, totals, consultationContent } = require('../src/content/consultation.ts')
const sum = (values) => values.reduce((a, b) => a + b, 0)

test('weekly totals match the brief (§7)', () => {
  assert.deepEqual(
    { sales: totals.previous.sales, orders: totals.previous.orders, coffee: totals.previous.coffee, other: totals.previous.other },
    { sales: 12_000_000, orders: 400, coffee: 7_000_000, other: 5_000_000 },
  )
  assert.deepEqual(
    { sales: totals.current.sales, orders: totals.current.orders, coffee: totals.current.coffee, other: totals.current.other },
    { sales: 10_800_000, orders: 360, coffee: 6_000_000, other: 4_800_000 },
  )
  assert.equal(totals.previous.average, 30_000)
  assert.equal(totals.current.average, 30_000)
  assert.equal(totals.previous.orders + totals.current.orders, 760)
})

test('product rows reconcile with category totals', () => {
  for (const week of ['previous', 'current']) {
    assert.equal(sum(products.filter((p) => p.category === 'coffee').map((p) => p[week])), totals[week].coffee)
    assert.equal(sum(products.filter((p) => p.category === 'other').map((p) => p[week])), totals[week].other)
  }
  const kopiSusu = products.find((p) => p.key === 'es-kopi-susu')
  assert.equal(kopiSusu.previous - kopiSusu.current, 800_000)
  for (const key of ['americano', 'es-teh']) {
    const row = products.find((p) => p.key === key)
    assert.equal(row.previous - row.current, 100_000)
  }
  const changes = products.map((p) => p.current - p.previous).sort((a, b) => a - b)
  assert.equal(changes[0], -800_000, 'es kopi susu changed the most')
})

test('daily figures quoted in the answers are consistent', () => {
  const change = (i) => daily[i].current.sales - daily[i].previous.sales
  assert.equal(daily[1].previous.sales, 1_650_000)
  assert.equal(daily[1].current.sales, 1_200_000)
  assert.equal(daily[2].previous.sales, 1_650_000)
  assert.equal(daily[2].current.sales, 1_160_000)
  assert.equal(change(1) + change(2), -940_000)
  for (const i of [0, 3, 4, 5, 6]) assert.ok(Math.abs(change(i)) <= 100_000, `day ${i} within Rp100,000`)
  const coffeeChange = (i) => daily[i].current.coffee - daily[i].previous.coffee
  assert.equal(coffeeChange(1) + coffeeChange(2), -900_000)
  assert.equal(daily[1].current.date, '2026-09-29')
  assert.equal(daily[2].current.date, '2026-09-30')
})

test('both languages quote the same amounts', () => {
  const digits = (locale) =>
    JSON.stringify(consultationContent[locale].questions)
      .match(/Rp[\d.,]+/g)
      .map((value) => value.replace(/[^\d]/g, ''))
  assert.deepEqual(digits('en'), digits('id'))
})
