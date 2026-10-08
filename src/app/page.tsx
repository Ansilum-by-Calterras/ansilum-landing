import { Container } from '@/components/container'
import { DemoLink } from '@/components/marketing/demo-link'
import { OfflineFlowScroll } from '@/components/marketing/offline-flow-scroll'
import { ProductImage } from '@/components/marketing/product-image'
import {
  AIExample,
  Eyebrow,
  FinalCTA,
  ProductStatus,
  Section,
  SectionTitle,
  TextLink,
} from '@/components/marketing/sections'
import { siteConfig } from '@/config/site'
import { pageMetadata } from '@/lib/metadata'
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BuildingStorefrontIcon,
  ChartBarIcon,
  CheckIcon,
  WifiIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
export const metadata = pageMetadata(
  'POS untuk Kafe & Restoran Indonesia',
  'Kenali Ansilum, POS Early Beta untuk kafe dan restoran Indonesia dengan pendekatan offline-first. Lihat alur kasir dan diskusikan kebutuhan lewat demo.',
  '/',
)
export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="relative mx-3 mt-3 overflow-hidden rounded-4xl bg-[#eee2d3] sm:mx-5">
        <Container>
          <div className="grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:py-20">
            <div>
              <div className="mb-7 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[#bca68e] px-3 py-1 text-xs font-medium">
                  Early Beta
                </span>
                <Eyebrow>POS untuk kafe & restoran</Eyebrow>
              </div>
              <h1 className="max-w-3xl font-display text-[2.75rem] font-medium leading-[1.1] tracking-[-0.055em] sm:text-6xl lg:text-[4rem]">
                Kasir lebih andal.
                <br />
                <span className="text-[#825c3c]">Usaha lebih terbaca.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#5d493b]">
                Ansilum dirancang agar kasir tetap mencatat pesanan dan
                pembayaran tunai saat koneksi terganggu. Pahami penjualan, stok,
                dan biaya dari data operasional Anda.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <DemoLink placement="hero">
                  Minta Demo{' '}
                  <ArrowUpRightIcon className="size-4" aria-hidden="true" />
                </DemoLink>
                <Link href="#cara-kerja" className="action-secondary">
                  Lihat Cara Kerja{' '}
                  <ArrowRightIcon className="size-4" aria-hidden="true" />
                </Link>
              </div>
              <p className="mt-6 text-xs leading-6 text-[#66503e]">
                Direncanakan: tanya jawab data bisnis dengan Claude.
                <br />
                Dikembangkan oleh{' '}
                <Link
                  href="/about"
                  className="font-semibold underline underline-offset-4"
                >
                  Calterras
                </Link>{' '}
                untuk F&B Indonesia.
              </p>
            </div>
            <div className="relative mx-auto w-full max-w-xl lg:pl-4">
              <div
                aria-label="Pratinjau laporan Ansilum dengan data contoh"
                className="relative isolate overflow-visible rounded-[2rem] border border-[#cdb9a4] bg-[#f7eee5] p-3 shadow-[0_30px_80px_-30px_#69452e80] sm:p-5"
              >
                <div className="overflow-hidden rounded-[1.45rem] border border-[#d7c5b4] bg-[#fffaf6] shadow-[0_12px_30px_-18px_#69452e99]">
                  <div className="flex h-10 items-center gap-2 border-b border-[#eaded3] bg-[#fffdfb] px-4">
                    <span className="size-2.5 rounded-full bg-[#d59c82]" />
                    <span className="size-2.5 rounded-full bg-[#d8b76e]" />
                    <span className="size-2.5 rounded-full bg-[#9ab39b]" />
                    <span className="ml-3 hidden text-[10px] font-medium tracking-[0.12em] text-[#9c8775] sm:block">
                      APP.ANSILUM.ID / REPORT
                    </span>
                  </div>
                  <div className="relative h-[21rem] overflow-hidden bg-[#f9f1e9] sm:h-[26rem]">
                    <Image
                      src="/product/sales-report.png"
                      alt="Pratinjau laporan penjualan Ansilum dengan data contoh"
                      width={440}
                      height={860}
                      priority
                      unoptimized
                      className="absolute left-1/2 top-4 w-[13.5rem] -translate-x-1/2 rounded-[1.4rem] shadow-[0_20px_35px_-18px_#69452e99] sm:top-6 sm:w-[16rem]"
                    />
                  </div>
                </div>
                <div className="absolute -left-3 top-20 hidden items-center gap-2 rounded-full border border-[#d6c0ab] bg-[#fffaf6] px-3 py-2 text-xs font-semibold text-[#63422f] shadow-lg sm:flex lg:-left-8">
                  <span className="flex size-6 items-center justify-center rounded-full bg-[#e4f0df] text-[#47704b]">
                    <WifiIcon className="size-3.5" aria-hidden="true" />
                  </span>
                  Offline-first
                </div>
                <div className="absolute -right-3 bottom-20 hidden items-center gap-2 rounded-full border border-[#d6c0ab] bg-[#fffaf6] px-3 py-2 text-xs font-semibold text-[#63422f] shadow-lg sm:flex lg:-right-8">
                  <span className="flex size-6 items-center justify-center rounded-full bg-[#f6dfc4] text-[#8a5b2e]">
                    <ChartBarIcon className="size-3.5" aria-hidden="true" />
                  </span>
                  Penjualan lebih terbaca
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between gap-4 px-1 text-xs leading-5 text-[#66503e]">
                <span className="font-medium">Laporan operasional dalam satu tampilan.</span>
                <span className="shrink-0 text-right text-[#8a7564]">
                  Data contoh · Early Beta
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <div className="border-b border-[var(--marketing-line)]">
        <Container>
          <div className="flex flex-wrap justify-between gap-x-8 gap-y-3 py-6 text-sm text-muted-foreground">
            <span>Kafe & kedai kopi</span>
            <span>Restoran kecil</span>
            <span>Fokus awal 1–5 outlet</span>
            <span>Bahasa Indonesia · Rupiah</span>
          </div>
        </Container>
      </div>
      <Section id="cara-kerja">
        <OfflineFlowScroll />
      </Section>
      <Section className="border-y border-[var(--marketing-line)] bg-[var(--marketing-paper)]">
        <SectionTitle
          eyebrow="Saat operasional sedang ramai"
          title="Jangan biarkan pekerjaan kasir menambah pekerjaan pemilik."
        />
        <div className="mt-9 grid gap-8 md:grid-cols-3">
          {[
            [
              'Koneksi bermasalah.',
              'Antrean ikut menunggu.',
              'Pekerjaan di kasir membutuhkan alur yang tetap bisa berjalan dengan data lokal yang telah disiapkan.',
            ],
            [
              'Penjualan tercatat.',
              'Hasil usaha belum jelas.',
              'Menu paling laku belum tentu memiliki margin terbaik. Catatan biaya perlu dibaca bersama penjualan.',
            ],
            [
              'Stok sudah dihitung.',
              'Selisih tetap terjadi.',
              'Hubungkan menu, resep, dan pergerakan bahan untuk menelusuri apa yang perlu diperiksa.',
            ],
          ].map(([first, second, text], i) => (
            <article key={first} className="border-t border-[#c9b9a6] pt-6">
              <span className="font-mono text-xs text-[#765134]">0{i + 1}</span>
              <h3 className="mt-5 text-xl font-medium leading-7">
                {first}
                <br />
                <span className="text-muted-foreground">{second}</span>
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {text}
              </p>
            </article>
          ))}
        </div>
      </Section>
      <Section id="operasional">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle
              eyebrow="Visibilitas operasional"
              title="Lihat hubungan di balik angka."
            >
              <p>
                Tinjau penjualan per periode, menu yang terjual, dan pergerakan
                stok. Lengkapi resep serta biaya bahan untuk menilai margin
                dengan dasar yang jelas.
              </p>
            </SectionTitle>
            <ol className="mt-8 divide-y divide-[var(--marketing-line)]">
              {[
                [
                  'Transaksi & produk',
                  'Apa yang terjual dan apa yang berubah.',
                ],
                [
                  'Resep & stok',
                  'Bahan yang terpakai dan catatan pergerakannya.',
                ],
                [
                  'Biaya & margin',
                  'Perhitungan mengikuti data biaya yang tersedia.',
                ],
              ].map(([title, text]) => (
                <li key={title} className="py-5">
                  <h3 className="font-medium">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {text}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs leading-6 text-muted-foreground">
              Laporan pusat mengikuti transaksi tersinkron. Margin bergantung
              pada kelengkapan data biaya dan hak akses pengguna.
            </p>
            <div className="mt-5">
              <TextLink href="/products/ansilum#operasional">
                Lihat alur operasional
              </TextLink>
            </div>
          </div>
          <div className="rounded-4xl bg-[#f0e8dd] px-6 py-10">
            <ProductImage chart />
          </div>
        </div>
      </Section>
      <Section id="intelligence" className="bg-[#3e2c23] text-white">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow light>Ansilum Intelligence · Direncanakan</Eyebrow>
            <h2 className="section-title mt-5 !text-white">
              Tanyakan
              <br />
              bisnis Anda.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[#e6d5c8]">
              Kami merencanakan integrasi Claude untuk membantu pemilik memahami
              penjualan, produk, stok, dan margin melalui pertanyaan
              sehari-hari.
            </p>
            <p className="mt-5 max-w-lg text-sm leading-7 text-[#e6d5c8]">
              Rencana awal berfokus pada membaca dan menjelaskan data. Fitur ini
              belum tersedia untuk merchant.
            </p>
            <Link
              href="/intelligence"
              className="mt-7 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-[#f5dfc6] underline underline-offset-8"
            >
              Lihat Rencana Intelligence{' '}
              <ArrowUpRightIcon className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="text-foreground">
            <AIExample />
          </div>
        </div>
      </Section>
      <Section id="status-produk">
        <SectionTitle
          eyebrow="Status produk"
          title="Jelas yang sedang diuji. Jelas yang masih direncanakan."
        >
          <p>
            Ansilum berada pada tahap Early Beta. Kita akan membahas cakupan
            fitur dan perangkat yang dapat digunakan sebelum onboarding.
          </p>
        </SectionTitle>
        <div className="mt-9">
          <ProductStatus />
        </div>
        <p className="mt-5 text-xs leading-6 text-muted-foreground">
          Belum ada kemampuan Claude yang dinyatakan tersedia atau dibuka
          sebagai eksperimen merchant. Rencana pengembangan dapat berubah.
        </p>
      </Section>
      <Section className="!pt-0">
        <div className="grid gap-8 rounded-3xl border border-[var(--marketing-line)] p-7 sm:p-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Eyebrow>Pengalaman membangun software bisnis</Eyebrow>
            <h2 className="section-title mt-4">
              Berangkat dari pekerjaan operasional yang nyata.
            </h2>
          </div>
          <div>
            <p className="leading-8 text-muted-foreground">
              Calterras telah membangun software komersial untuk klien bisnis
              berbayar. Pengalaman tersebut menjadi dasar pengembangan Ansilum
              sebagai produk SaaS untuk F&B.
            </p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Ansilum sendiri masih pada tahap Early Beta dan validasi awal
              pelanggan.
            </p>
            <div className="mt-5">
              <TextLink href="/about">Kenali Calterras</TextLink>
            </div>
          </div>
        </div>
      </Section>
      <Section className="bg-[var(--marketing-paper)]">
        <SectionTitle
          eyebrow="Tiga fokus pengembangan"
          title="Dibangun di sekitar pekerjaan harian Anda."
        />
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            {
              icon: WifiIcon,
              title: 'Kasir lebih andal',
              text: 'Pekerjaan kasir inti bertumpu pada data lokal, dengan batas pembayaran dan otorisasi yang jelas.',
            },
            {
              icon: ChartBarIcon,
              title: 'Operasional lebih terbaca',
              text: 'Penjualan, stok, dan biaya ditinjau dengan konteks. Intelligence direncanakan di atas fondasi data ini.',
            },
            {
              icon: BuildingStorefrontIcon,
              title: 'Untuk F&B Indonesia',
              text: 'Fokus pada menu kafe dan restoran, Bahasa Indonesia, serta rupiah. Mulai dari kebutuhan outlet Anda.',
            },
          ].map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon className="size-7 text-[#765134]" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-medium">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {text}
              </p>
            </article>
          ))}
        </div>
      </Section>
      <Section id="early-merchant">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionTitle
            eyebrow="Early Merchant Program"
            title="Mulai dari kebutuhan outlet Anda."
          >
            <p>
              Kami mengundang pemilik kafe, kedai kopi, dan restoran kecil untuk
              membahas kecocokan Ansilum. Mulai dari demo, sepakati alur
              penggunaan, lalu evaluasi hasilnya bersama.
            </p>
          </SectionTitle>
          <div className="surface-card p-7 sm:p-9">
            <h3 className="text-lg font-medium">
              Yang kita bahas sebelum mulai
            </h3>
            <ul className="mt-6 space-y-5">
              {[
                'Alur kasir, perangkat, dan pembayaran yang dibutuhkan.',
                'Cakupan fitur Beta dan penyiapan awal.',
                'Biaya, dukungan, serta proses evaluasi.',
              ].map((text) => (
                <li key={text} className="flex gap-3 text-sm leading-6">
                  <CheckIcon
                    className="mt-0.5 size-5 shrink-0 text-[#765134]"
                    aria-hidden="true"
                  />
                  {text}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <DemoLink placement="early-merchant" />
            </div>
            <p className="mt-4 text-xs leading-6 text-muted-foreground">
              Tidak ada langganan otomatis. Ketentuan disepakati sebelum
              penggunaan.
            </p>
          </div>
        </div>
      </Section>
      <Section className="!pt-0">
        <div className="flex flex-col justify-between gap-6 border-t border-[var(--marketing-line)] pt-10 lg:flex-row">
          <div className="max-w-2xl">
            <Eyebrow>Dikembangkan oleh Calterras</Eyebrow>
            <h2 className="mt-4 text-2xl font-medium tracking-tight">
              Usaha software dari Indonesia, dipimpin founder.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Calterras didanai secara mandiri. Fokus produk SaaS kami saat ini
              adalah Ansilum.
            </p>
            {siteConfig.founder && (
              <p className="mt-3 text-sm">
                {siteConfig.founder} · Founder, Calterras
              </p>
            )}
          </div>
          <div className="lg:self-center">
            <TextLink href="/about">Tentang Calterras</TextLink>
          </div>
        </div>
      </Section>
      <FinalCTA />
    </main>
  )
}
