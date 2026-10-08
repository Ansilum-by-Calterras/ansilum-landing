import { Container } from '@/components/container'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import Link from 'next/link'
import { DemoLink } from './demo-link'
export function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode
  light?: boolean
}) {
  return (
    <p className={clsx('eyebrow', light && '!text-[#e2c4a8]')}>{children}</p>
  )
}
export function Section({
  id,
  children,
  className,
}: {
  id?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={clsx('section-space', className)}>
      <Container>{children}</Container>
    </section>
  )
}
export function SectionTitle({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className="max-w-3xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="section-title mt-4">{title}</h2>
      {children && <div className="section-lead mt-5">{children}</div>}
    </div>
  )
}
export function TextLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="decoration-primary/40 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground underline underline-offset-8 hover:decoration-foreground"
    >
      {children}
      <ArrowUpRightIcon className="size-4 shrink-0" aria-hidden="true" />
    </Link>
  )
}
export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <Section className="!pb-12 !pt-16 sm:!pt-24">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="page-title mt-5 max-w-4xl">{title}</h1>
      <div className="section-lead mt-6 max-w-3xl">{children}</div>
    </Section>
  )
}
export function FinalCTA({ placement = 'final' }: { placement?: string }) {
  return (
    <Section className="!pt-8">
      <div className="rounded-4xl bg-[#3e2c23] px-7 py-12 text-white sm:px-12 sm:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <Eyebrow light>Bicarakan kebutuhan bisnis Anda</Eyebrow>
            <h2 className="section-title mt-4 !text-white">
              Lihat apakah Ansilum
              <br className="hidden sm:block" /> cocok untuk outlet Anda.
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-[#e6d5c8]">
              Ceritakan alur kasir dan kendala operasional Anda. Kita mulai dari
              fitur yang relevan, status Beta, dan kebutuhan penerapan.
            </p>
          </div>
          <div className="lg:justify-self-end">
            <DemoLink
              placement={placement}
              className="!bg-[#f2dfcb] !text-[#3e2c23]"
            >
              Minta Demo{' '}
              <ArrowUpRightIcon className="size-4" aria-hidden="true" />
            </DemoLink>
            <p className="mt-4 max-w-xs text-xs leading-5 text-[#e6d5c8]">
              Permintaan demo tidak otomatis membuat akun atau memulai
              langganan.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
export function ProductStatus() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[
        {
          label: 'Tahap produk',
          status: 'Early Beta',
          copy: 'Cakupan fitur, perangkat, dan akses merchant dikonfirmasi saat demo, sebelum onboarding.',
          color: 'bg-[#e8eee5] text-[#374b31]',
        },
        {
          label: 'Fokus validasi',
          status: 'Kasir & sinkronisasi',
          copy: 'Alur kasir lokal, pencatatan transaksi, dan sinkronisasi menjadi fokus validasi produk.',
          color: 'bg-[#f2e4d4] text-[#6b4524]',
        },
        {
          label: 'Direncanakan',
          status: 'Claude Intelligence',
          copy: 'Tanya jawab dan ringkasan data operasional. Belum tersedia untuk merchant.',
          color: 'bg-[#ece9e4] text-[#514b43]',
        },
      ].map((item) => (
        <article key={item.label} className="surface-card p-7">
          <span
            className={clsx(
              'inline-flex rounded-full px-3 py-1 text-xs font-medium',
              item.color,
            )}
          >
            {item.label}
          </span>
          <h3 className="mt-6 text-xl font-medium">{item.status}</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {item.copy}
          </p>
        </article>
      ))}
    </div>
  )
}
export function OfflineFlow() {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {[
        [
          'Siapkan perangkat',
          'Muat menu, siapkan kasir, dan pastikan otorisasi perangkat masih berlaku saat online.',
        ],
        [
          'Catat di kasir',
          'Alur inti dirancang memakai data lokal untuk pesanan dan pembayaran tunai.',
        ],
        [
          'Simpan & cetak',
          'Transaksi disimpan sebelum struk disiapkan pada perangkat dan printer yang didukung.',
        ],
        [
          'Sinkronkan data',
          'Aplikasi mencoba mengirim data saat koneksi tersedia. Sebagian transaksi dapat memerlukan pemeriksaan.',
        ],
      ].map(([title, text], i) => (
        <li key={title} className="surface-card p-6">
          <span className="font-mono text-xs text-[#765134]">0{i + 1}</span>
          <h3 className="mt-5 text-lg font-medium">{title}</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
        </li>
      ))}
    </ol>
  )
}
export function AIExample() {
  return (
    <figure className="rounded-3xl border border-[#d9d0c5] bg-white p-5 sm:p-8">
      <figcaption className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-[#e9e2d9] pb-4 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">
          Ilustrasi konsep · Data contoh
        </span>
        <span>Fitur belum tersedia</span>
      </figcaption>
      <div className="ml-6 rounded-2xl rounded-tr-sm bg-[#f3e9de] px-5 py-4 sm:ml-14">
        <p className="text-xs font-medium text-[#795334]">Pemilik</p>
        <p className="mt-2 text-base font-medium">
          Kenapa omzet turun kemarin?
        </p>
      </div>
      <div className="mt-5 pr-3">
        <p className="text-xs font-semibold text-[#795334]">
          Rancangan jawaban Ansilum
        </p>
        <p className="mt-3 text-sm leading-7">
          Dalam data contoh ini, penjualan bersih turun dari{' '}
          <strong>Rp2.000.000</strong> menjadi <strong>Rp1.780.000</strong>{' '}
          dibanding hari yang sama minggu lalu, atau <strong>11%</strong>.
        </p>
        <p className="mt-3 text-sm leading-7">
          Kategori kopi susu menyumbang Rp150.000 dari penurunan Rp220.000.
          Angka ini menunjukkan bagian penjualan yang turun; penyebab di luar
          transaksi belum dapat dipastikan.
        </p>
        <p className="mt-5 border-t border-[#e9e2d9] pt-4 text-xs leading-6 text-muted-foreground">
          Outlet contoh · 7 Oktober vs 30 September 2026
          <br />
          Sumber ilustrasi: penjualan tersinkron, per kategori.
        </p>
      </div>
    </figure>
  )
}
