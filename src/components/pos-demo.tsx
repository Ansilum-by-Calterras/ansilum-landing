'use client'

import clsx from 'clsx'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import { Container } from './container'
import { Heading, Subheading } from './text'

gsap.registerPlugin(ScrollTrigger)

// ─── Data ─────────────────────────────────────────────────────────────────────

const STORE    = 'Brew & Bites Café'
const ADDRESS  = 'Central Park, Jakarta'
const ORDER_NO = '#1042'
const DATE     = '19 Mar 2025'
const CASHIER  = 'Ahmad'

const ORDER_ITEMS = [
  { name: 'Kopi Susu Gula Aren', qty: 2, unitPrice: 18_000 },
  { name: 'Butter Croissant',    qty: 1, unitPrice: 28_000 },
  { name: 'Matcha Latte',        qty: 1, unitPrice: 45_000 },
]

const SUBTOTAL = ORDER_ITEMS.reduce((s, i) => s + i.qty * i.unitPrice, 0) // 109,000
const TAX      = Math.round(SUBTOTAL * 0.1)                               // 10,900
const TOTAL    = SUBTOTAL + TAX                                           // 119,900
const CASH_IN  = 150_000
const CHANGE   = CASH_IN - TOTAL                                          // 30,100

function idr(n: number) {
  return n.toLocaleString('id-ID')
}

// ─── Numpad ───────────────────────────────────────────────────────────────────

const NUMPAD_ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['000', '0', '⌫'],
]

const QUICK_AMOUNTS = ['Pas', '50K', '100K', '150K', '200K']

/** Keys pressed in sequence to enter 150,000 then confirm */
const TYPING_SEQ = ['1', '5', '0', '000']

// ─── Receipt lines ────────────────────────────────────────────────────────────

type RLineData =
  | { k: 'center'; text: string; bold?: boolean }
  | { k: 'row';    left: string; right: string; bold?: boolean }
  | { k: 'item';   name: string; qty: number; unitPrice: number }
  | { k: 'div' }

const RECEIPT_LINES: RLineData[] = [
  { k: 'center', text: STORE,   bold: true },
  { k: 'center', text: ADDRESS },
  { k: 'div' },
  { k: 'row', left: 'Order',   right: ORDER_NO },
  { k: 'row', left: 'Kasir',   right: CASHIER },
  { k: 'row', left: 'Tanggal', right: DATE },
  { k: 'div' },
  ...ORDER_ITEMS.map<RLineData>(i => ({ k: 'item', name: i.name, qty: i.qty, unitPrice: i.unitPrice })),
  { k: 'div' },
  { k: 'row', left: 'Subtotal', right: idr(SUBTOTAL) },
  { k: 'row', left: 'PPN 10%',  right: idr(TAX) },
  { k: 'div' },
  { k: 'row', left: 'TOTAL',    right: `Rp ${idr(TOTAL)}`, bold: true },
  { k: 'div' },
  { k: 'row', left: 'Tunai',     right: `Rp ${idr(CASH_IN)}` },
  { k: 'row', left: 'Kembalian', right: `Rp ${idr(CHANGE)}`, bold: true },
  { k: 'div' },
  { k: 'center', text: 'Terima Kasih! 🙏' },
  { k: 'center', text: 'Powered by Ansilum' },
]

function ReceiptLine({ line }: { line: RLineData }) {
  const base = 'leading-snug'
  if (line.k === 'div') {
    return <div data-line className="my-1 border-t border-dashed border-gray-300" />
  }
  if (line.k === 'center') {
    return (
      <p data-line className={clsx(base, 'text-center', line.bold && 'font-bold')}>
        {line.text}
      </p>
    )
  }
  if (line.k === 'row') {
    return (
      <div data-line className={clsx(base, 'flex justify-between', line.bold && 'font-bold')}>
        <span>{line.left}</span>
        <span>{line.right}</span>
      </div>
    )
  }
  // item — two lines
  const lineTotal = line.qty * line.unitPrice
  return (
    <>
      <p data-line className={clsx(base, 'truncate')}>{line.name}</p>
      <div data-line className={clsx(base, 'flex justify-between text-gray-500')}>
        <span>{line.qty} × {idr(line.unitPrice)}</span>
        <span className="text-gray-800">{idr(lineTotal)}</span>
      </div>
    </>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function POSDemo() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const receiptRef  = useRef<HTMLDivElement>(null)
  const scanLineRef = useRef<HTMLDivElement>(null)
  const accumRef    = useRef('')

  const [displayVal,  setDisplayVal]  = useState('')
  const [activeKey,   setActiveKey]   = useState<string | null>(null)
  const [showChange,  setShowChange]  = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)

  // ScrollTrigger — fire once on enter
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 65%',
        once: true,
        onEnter: runTypingAnimation,
      })
    }, el)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Receipt print animation — runs after showReceipt flips true
  useEffect(() => {
    if (!showReceipt || !receiptRef.current) return

    const lines    = receiptRef.current.querySelectorAll('[data-line]')
    const scanLine = scanLineRef.current
    const duration = lines.length * 0.065

    // Slide receipt paper in
    gsap.fromTo(
      receiptRef.current,
      { y: -12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
    )

    // Scan line sweeps top → bottom
    if (scanLine) {
      gsap.fromTo(
        scanLine,
        { top: 0, opacity: 0.75 },
        {
          top: '100%',
          duration,
          ease: 'none',
          onComplete: () => { gsap.to(scanLine, { opacity: 0, duration: 0.2 }) },
        },
      )
    }

    // Lines pop in one by one as scan line passes
    gsap.set(lines, { opacity: 0 })
    gsap.to(lines, { opacity: 1, duration: 0.01, stagger: 0.065, ease: 'none' })
  }, [showReceipt])

  function runTypingAnimation() {
    const tl = gsap.timeline()

    TYPING_SEQ.forEach((key) => {
      tl
        .call(() => setActiveKey(key))
        .to({}, { duration: 0.22 })
        .call(() => {
          setActiveKey(null)
          accumRef.current += key
          setDisplayVal(accumRef.current)
        })
        .to({}, { duration: 0.12 })
    })

    // Press confirm (✓)
    tl
      .to({}, { duration: 0.45 })
      .call(() => setActiveKey('✓'))
      .to({}, { duration: 0.35 })
      .call(() => { setActiveKey(null); setShowChange(true) })
      .to({}, { duration: 0.65 })
      .call(() => setShowReceipt(true))
  }

  const formattedDisplay = displayVal
    ? `Rp ${parseInt(displayVal, 10).toLocaleString('id-ID')}`
    : ''

  return (
    <div ref={sectionRef} className="overflow-hidden py-24">
      <Container>
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">

          {/* ── Left: text ──────────────────────────────────────────────── */}
          <div className="flex-1 lg:sticky lg:top-32 lg:max-w-sm">
            <Subheading>Point of Sale</Subheading>
            <Heading as="h3" className="mt-2">
              Fast, intuitive checkout — for every counter.
            </Heading>
            <p className="mt-6 text-sm/6 text-gray-600">
              Ansilum is built for speed. Process orders in seconds with a clean,
              distraction-free cashier interface — optimised for both touch and
              keyboard-driven workflows.
            </p>
            <p className="mt-4 text-sm/6 text-gray-600">
              Cash, card, or e-wallet — every transaction is recorded instantly,
              with automatic COGS deduction and real-time inventory updates
              across all your outlets.
            </p>
          </div>

          {/* ── Right: UI components ─────────────────────────────────────── */}
          <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-start">


          {/* ── Order list card ───────────────────────────────────────────── */}
          <div className="w-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 lg:w-[300px]">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                  Order
                </p>
                <p className="mt-0.5 text-base font-bold text-gray-900">{ORDER_NO}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">{DATE}</p>
                <p className="text-xs text-gray-400">{STORE}</p>
              </div>
            </div>

            {/* Items */}
            <div className="mt-4 space-y-3">
              {ORDER_ITEMS.map((item) => (
                <div key={item.name} className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.qty} × Rp {idr(item.unitPrice)}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-gray-900">
                    Rp {idr(item.qty * item.unitPrice)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-4 space-y-1.5 border-t border-gray-100 pt-4">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Subtotal</span><span>Rp {idr(SUBTOTAL)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Tax (10%)</span><span>Rp {idr(TAX)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-2 text-sm font-bold text-gray-900">
                <span>TOTAL</span><span>Rp {idr(TOTAL)}</span>
              </div>
            </div>
          </div>

          {/* ── Payment terminal + receipt ────────────────────────────────── */}
          <div className="flex w-full flex-col lg:w-[280px]">

            {/* Terminal */}
            <div className={clsx(
              'bg-[#f0efed] transition-all duration-300',
              showReceipt ? 'rounded-t-2xl' : 'rounded-2xl',
            )}>

              {/* Total header */}
              <div className="px-4 pt-4 pb-3 border-b border-gray-200 bg-white rounded-t-2xl">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] text-gray-500">Jumlah Total</p>
                    <p className="text-xl font-bold text-gray-900 mt-0.5">Rp {idr(TOTAL)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-gray-400">{ORDER_ITEMS.reduce((s,i)=>s+i.qty,0)} item</p>
                    <button className="text-[11px] text-amber-700 font-medium flex items-center gap-0.5 mt-0.5">
                      Lihat detail
                      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-3 space-y-2.5">

                {/* Payment method tabs */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'cash', label: 'Tunai', icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="2" y="6" width="20" height="13" rx="2"/>
                        <circle cx="12" cy="12.5" r="2.5"/>
                        <path d="M6 9.5h.01M18 15.5h.01"/>
                      </svg>
                    )},
                    { id: 'transfer', label: 'Transfer', icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="2" y="5" width="20" height="14" rx="2"/>
                        <path d="M2 10h20"/>
                        <path d="M6 15h4"/>
                      </svg>
                    )},
                    { id: 'qris', label: 'QRIS', icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="7" height="7" rx="1"/>
                        <rect x="14" y="3" width="7" height="7" rx="1"/>
                        <rect x="3" y="14" width="7" height="7" rx="1"/>
                        <path d="M14 14h2v2h-2zM18 14h3M14 18h2M18 18v3M21 18h.01"/>
                      </svg>
                    )},
                  ].map((method) => (
                    <button
                      key={method.id}
                      className={clsx(
                        'flex flex-col items-center gap-1 rounded-xl py-2.5 px-2 text-[11px] font-medium transition-all',
                        method.id === 'cash'
                          ? 'bg-white ring-1 ring-amber-700/40 text-amber-700'
                          : 'bg-white text-gray-700',
                      )}
                    >
                      {method.icon}
                      {method.label}
                    </button>
                  ))}
                </div>

                {/* Amount input */}
                <div className="flex items-center rounded-xl bg-white px-4 py-3 ring-1 ring-gray-200">
                  <span className={clsx(
                    'text-lg font-medium',
                    formattedDisplay ? 'text-gray-900' : 'text-gray-400',
                  )}>
                    {formattedDisplay || 'Rp 0'}
                  </span>
                </div>

                {/* Kembalian row */}
                <div className={clsx(
                  'flex items-center justify-between rounded-xl bg-white px-4 py-3 ring-1 ring-gray-200 transition-opacity duration-500',
                )}>
                  <span className="text-sm text-gray-500">Kembalian</span>
                  <span className={clsx('text-sm font-semibold', showChange ? 'text-gray-900' : 'text-gray-400')}>
                    {showChange ? `Rp ${idr(CHANGE)}` : 'Rp 0'}
                  </span>
                </div>

                {/* Quick amount presets */}
                <div className="flex gap-1.5">
                  {QUICK_AMOUNTS.map((qa) => (
                    <button
                      key={qa}
                      className="flex-1 rounded-lg bg-white py-1.5 text-[10px] font-medium text-gray-700 ring-1 ring-amber-700/30"
                    >
                      {qa}
                    </button>
                  ))}
                </div>

                {/* Numpad */}
                <div className="grid grid-cols-3 gap-2">
                  {NUMPAD_ROWS.map((row, ri) =>
                    row.map((key) => {
                      const isActive  = activeKey === key
                      const isDelete  = key === '⌫'
                      return (
                        <button
                          key={`${ri}-${key}`}
                          className={clsx(
                            'flex h-14 select-none items-center justify-center rounded-xl text-base font-medium transition-all duration-75',
                            isActive && isDelete  && 'scale-95 bg-red-600 text-white shadow-inner',
                            isActive && !isDelete && 'scale-95 bg-amber-700 text-white shadow-inner',
                            !isActive && isDelete && 'bg-red-500 text-white',
                            !isActive && !isDelete && 'bg-[#e5e4e1] text-gray-800',
                          )}
                        >
                          {isDelete ? (
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
                              <line x1="18" y1="9" x2="13" y2="14"/>
                              <line x1="13" y1="9" x2="18" y2="14"/>
                            </svg>
                          ) : key}
                        </button>
                      )
                    }),
                  )}
                </div>

                {/* Bottom action buttons */}
                <div className="grid grid-cols-3 gap-2 pt-0.5">
                  <button className="col-span-1 flex h-12 items-center justify-center rounded-xl bg-white text-sm font-medium text-red-500 ring-1 ring-red-400">
                    Batal
                  </button>
                  <button
                    className={clsx(
                      'col-span-2 flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition-all duration-300',
                      activeKey === '✓' ? 'scale-95 bg-amber-800' : 'bg-amber-700',
                    )}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Bayar Sekarang
                  </button>
                </div>

              </div>
            </div>

            {/* ── Receipt paper ──────────────────────────────────────────── */}
            {showReceipt && (
              <div ref={receiptRef} className="relative overflow-hidden shadow-lg">
                {/* Scan line (thermal head) */}
                <div
                  ref={scanLineRef}
                  className="pointer-events-none absolute left-0 right-0 z-10 h-px bg-[var(--primary)]"
                  style={{ top: 0 }}
                />

                {/* Top perforation */}
                <div
                  className="h-3 w-full bg-[#FFFDF4]"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, #bbb 2px, transparent 2px)',
                    backgroundSize: '10px 12px',
                    backgroundRepeat: 'repeat-x',
                    backgroundPosition: '5px center',
                    borderTop: '1px solid #e5e7eb',
                  }}
                />

                {/* Paper */}
                <div className="bg-[#FFFDF4] px-5 pb-4 pt-3 font-mono text-[10px] leading-relaxed text-gray-800">
                  {RECEIPT_LINES.map((line, i) => (
                    <ReceiptLine key={i} line={line} />
                  ))}
                </div>

                {/* Bottom perforation */}
                <div
                  className="h-3 w-full bg-[#FFFDF4]"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, #bbb 2px, transparent 2px)',
                    backgroundSize: '10px 12px',
                    backgroundRepeat: 'repeat-x',
                    backgroundPosition: '5px center',
                    borderBottom: '1px solid #e5e7eb',
                  }}
                />
              </div>
            )}
          </div>
          </div>{/* end right column */}
        </div>{/* end two-column */}
      </Container>
    </div>
  )
}
