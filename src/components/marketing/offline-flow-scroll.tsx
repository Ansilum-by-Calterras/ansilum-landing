'use client'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { Eyebrow, TextLink } from './sections'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Siapkan perangkat',
    text: 'Muat menu, siapkan kasir, dan pastikan otorisasi perangkat masih berlaku saat online.',
    image: '/product/sales-report.png',
    imageAlt: 'Pratinjau laporan Ansilum dengan pilihan outlet',
    imageClass: 'top-0',
  },
  {
    number: '02',
    title: 'Catat di kasir',
    text: 'Alur inti dirancang memakai data lokal untuk pesanan dan pembayaran tunai.',
    image: '/product/sales-report.png',
    imageAlt: 'Pratinjau laporan penjualan harian Ansilum',
    imageClass: 'top-[-8rem]',
  },
  {
    number: '03',
    title: 'Simpan & cetak',
    text: 'Transaksi disimpan sebelum struk disiapkan pada perangkat dan printer yang didukung.',
    image: '/product/sales-report-chart.png',
    imageAlt: 'Pratinjau metrik penjualan dan transaksi Ansilum',
    imageClass: 'top-[-10rem]',
  },
  {
    number: '04',
    title: 'Sinkronkan data',
    text: 'Aplikasi mencoba mengirim data saat koneksi tersedia. Sebagian transaksi dapat memerlukan pemeriksaan.',
    image: '/product/sales-report-chart.png',
    imageAlt: 'Pratinjau grafik tren penjualan Ansilum',
    imageClass: 'top-[-16rem]',
  },
]

export function OfflineFlowScroll() {
  const sectionRef = useRef<HTMLElement>(null)
  const nodesRef = useRef<HTMLButtonElement[]>([])
  const panelsRef = useRef<HTMLDivElement[]>([])
  const illustrationRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const panels = panelsRef.current
      const nodes = nodesRef.current
      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (reduceMotion) return

      gsap.set(panels.slice(1), { autoAlpha: 0, y: 32 })
      gsap.set(nodes.slice(1), { opacity: 0.45 })
      gsap.to(illustrationRef.current, {
        rotate: 8,
        y: -10,
        transformOrigin: '50% 50%',
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top+=96',
          end: '+=2400',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      steps.slice(1).forEach((_, index) => {
        const panel = panels[index + 1]
        const node = nodes[index + 1]
        const previousPanel = panels[index]
        const previousNode = nodes[index]

        timeline
          .to(previousPanel, { autoAlpha: 0, y: -32, duration: 0.35 })
          .to(previousNode, { opacity: 0.45, duration: 0.2 }, '<')
          .to(node, { opacity: 1, duration: 0.2 }, '<')
          .fromTo(
            panel,
            { autoAlpha: 0, y: 32 },
            { autoAlpha: 1, y: 0, duration: 0.45 },
            '<',
          )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative">
      <div className="grid min-h-[calc(100svh-7rem)] items-center gap-12 lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="self-center">
          <Eyebrow>Cara kerja offline-first</Eyebrow>
          <h2 className="section-title mt-4 max-w-xl">
            Pesanan disimpan di kasir. Sinkronisasi menyusul.
          </h2>
          <p className="section-lead mt-5 max-w-lg">
            Pekerjaan kasir inti dirancang memakai data pada perangkat yang
            sudah disiapkan. Pencatatan transaksi dan pengiriman ke cloud
            memiliki proses masing-masing.
          </p>
          <div className="mt-7">
            <TextLink href="/products/ansilum#offline">
              Lihat cakupan produk
            </TextLink>
          </div>
          <ol
            className="relative mt-10 grid gap-1"
            aria-label="Alur kerja offline-first"
          >
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-4 top-6 w-px bg-[#d8c7b7]"
            />
            {steps.map((step, index) => (
              <li key={step.number} className="relative">
                <button
                  ref={(node) => {
                    if (node) nodesRef.current[index] = node
                  }}
                  type="button"
                  className="group flex w-full items-start gap-4 rounded-2xl p-3 text-left transition-colors hover:bg-white/60 focus-visible:bg-white/60"
                  aria-label={`Langkah ${step.number}: ${step.title}`}
                >
                  <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-[#bca68e] bg-[var(--marketing-paper)] font-mono text-[10px] font-semibold text-[#765134]">
                    {step.number}
                  </span>
                  <span>
                    <span className="block font-medium text-foreground">
                      {step.title}
                    </span>
                    <span className="mt-1 block max-w-sm text-sm leading-6 text-muted-foreground">
                      {step.text}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative flex min-h-[32rem] items-center justify-center overflow-hidden lg:min-h-[calc(100svh-7rem)]">
          <svg
            ref={illustrationRef}
            aria-hidden="true"
            viewBox="0 0 520 520"
            className="absolute h-full max-h-[34rem] w-full max-w-[34rem] text-[#dfc8b2]"
          >
            <circle cx="260" cy="260" r="190" fill="none" stroke="currentColor" strokeDasharray="3 12" strokeWidth="1" />
            <circle cx="260" cy="260" r="130" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M95 330c65-20 87-111 166-112 79-1 89 91 164 112" fill="none" stroke="#b99572" strokeWidth="2" />
            <circle cx="95" cy="330" r="8" fill="#b99572" />
            <circle cx="261" cy="218" r="8" fill="#63422f" />
            <circle cx="425" cy="330" r="8" fill="#b99572" />
          </svg>
          <div className="relative z-10 h-[min(72svh,35rem)] w-[min(19rem,72vw)] overflow-hidden rounded-[2rem] border-[6px] border-[#63422f] bg-[#fffaf6] shadow-[0_35px_70px_-35px_#69452e99]">
            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={(panel) => {
                  if (panel) panelsRef.current[index] = panel
                }}
                className="absolute inset-0"
              >
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  width={440}
                  height={860}
                  unoptimized
                  className={`absolute left-0 w-full max-w-none ${step.imageClass}`}
                />
              </div>
            ))}
          </div>
          <p className="absolute bottom-3 left-0 right-0 text-center text-xs leading-5 text-muted-foreground">
            Pratinjau pengembangan · Data contoh
          </p>
        </div>
      </div>
      <p className="mt-8 max-w-4xl text-xs leading-6 text-muted-foreground">
        Penjelasan alur produk, bukan rekaman transaksi. Penyiapan awal dan
        otorisasi perangkat yang masih berlaku diperlukan. QRIS, kartu, dan
        gateway tetap mengikuti koneksi serta konfirmasi penyedianya.
      </p>
    </section>
  )
}
