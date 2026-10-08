import { DemoLink } from '@/components/marketing/demo-link'
import { ProductImage } from '@/components/marketing/product-image'
import {
  FinalCTA,
  OfflineFlow,
  PageIntro,
  ProductStatus,
  Section,
  SectionTitle,
  TextLink,
} from '@/components/marketing/sections'
import { pageMetadata } from '@/lib/metadata'
import Link from 'next/link'
export const metadata = pageMetadata(
  'Aplikasi Kasir Kafe & Restoran',
  'Pelajari alur kasir, batasan offline, stok, laporan, dan status fitur Ansilum. Dikembangkan oleh Calterras untuk bisnis F&B Indonesia. Minta demo.',
  '/products/ansilum',
)
export default function ProductPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageIntro
        eyebrow="Ansilum · POS F&B · Early Beta"
        title="Dari pekerjaan kasir ke gambaran usaha yang lebih jelas."
      >
        <p>
          Dikembangkan oleh Calterras untuk kafe, kedai kopi, dan restoran
          kecil. Ansilum menghubungkan pencatatan transaksi dengan kebutuhan
          memahami penjualan, stok, dan biaya.
        </p>
        <div className="mt-7">
          <DemoLink placement="product-intro" />
        </div>
      </PageIntro>
      <Section id="offline" className="bg-[var(--marketing-paper)]">
        <SectionTitle
          eyebrow="Fondasi offline-first"
          title="Pekerjaan inti dimulai di perangkat kasir."
        >
          <p>
            Pada perangkat yang telah disiapkan, alur lokal dirancang untuk
            katalog menu, identitas kasir, transaksi tunai, dan struk. Cakupan
            versi Beta perlu ditinjau sebelum digunakan di outlet.
          </p>
        </SectionTitle>
        <div className="mt-9">
          <OfflineFlow />
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            [
              'Penyiapan & akses',
              'Penyiapan awal, katalog, dan kasir memerlukan internet. Mode offline tetap mengikuti otorisasi perangkat yang masih berlaku.',
            ],
            [
              'Pembayaran',
              'Tunai dapat dicatat pada alur lokal yang didukung. Transfer manual memerlukan konfirmasi dana diterima. QRIS, kartu, dan gateway membutuhkan konfirmasi penyedia.',
            ],
            [
              'Struk & riwayat',
              'Struk disiapkan dari transaksi yang telah disimpan, dengan perangkat dan printer yang didukung. Kegagalan printer tidak berarti pesanan harus diinput ulang.',
            ],
            [
              'Sinkronisasi & laporan',
              'Pengiriman data berjalan ketika koneksi dan layanan tersedia. Sebagian kejadian memerlukan pemeriksaan. Laporan pusat mengikuti transaksi tersinkron.',
            ],
          ].map(([title, text]) => (
            <article key={title} className="surface-card p-6">
              <h3 className="font-medium">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
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
              eyebrow="Penjualan, stok, dan biaya"
              title="Baca angka dengan konteksnya."
            >
              <p>
                Tinjau periode dan outlet yang dapat Anda akses. Gunakan catatan
                menu, resep, serta pergerakan bahan untuk memahami operasional.
              </p>
            </SectionTitle>
            <div className="mt-7 space-y-5 text-sm leading-7 text-muted-foreground">
              <p>
                <strong className="text-foreground">Periode yang jelas.</strong>{' '}
                Bandingkan hasil usaha dengan rentang waktu yang sesuai.
              </p>
              <p>
                <strong className="text-foreground">Biaya yang lengkap.</strong>{' '}
                Margin memerlukan dasar biaya. Data yang belum lengkap tidak
                boleh dianggap sebagai laba yang pasti.
              </p>
              <p>
                <strong className="text-foreground">Akses sesuai peran.</strong>{' '}
                Informasi yang terlihat mengikuti akses pengguna dan cakupan
                produk yang disepakati.
              </p>
            </div>
          </div>
          <ProductImage />
        </div>
      </Section>
      <Section className="!pt-0">
        <div className="grid items-center gap-10 rounded-3xl bg-[var(--marketing-paper)] p-7 sm:p-10 lg:grid-cols-2">
          <ProductImage chart />
          <div>
            <h2 className="section-title">
              Lihat antarmukanya. Bahas batasannya.
            </h2>
            <p className="section-lead mt-5">
              Gambar ini berasal dari pratinjau layar laporan aplikasi dengan
              data contoh. Saat demo, tinjau versi yang ditawarkan, alur kasir,
              varian menu, riwayat transaksi, dan perangkat yang didukung.
            </p>
            <p className="mt-4 text-xs leading-6 text-muted-foreground">
              Pratinjau pengembangan tidak menunjukkan data pelanggan atau
              menjamin ketersediaan setiap fitur.
            </p>
            <div className="mt-7">
              <DemoLink placement="product-evidence" />
            </div>
          </div>
        </div>
      </Section>
      <Section className="bg-[#3e2c23] text-white">
        <p className="eyebrow !text-[#e2c4a8]">
          Arah berikutnya · Belum tersedia
        </p>
        <h2 className="section-title mt-5 !text-white">
          Tanya jawab atas data bisnis.
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#e6d5c8]">
          Claude direncanakan untuk membantu menjelaskan penjualan, stok, dan
          margin. Perhitungan bisnis tetap memerlukan data yang dapat diperiksa,
          dengan hak akses dan batas yang jelas.
        </p>
        <Link
          href="/intelligence"
          className="mt-6 inline-flex min-h-11 items-center font-medium text-[#f5dfc6] underline underline-offset-8"
        >
          Lihat Rencana Intelligence
        </Link>
      </Section>
      <Section>
        <SectionTitle
          eyebrow="Cakupan Early Beta"
          title="Sepakati yang akan digunakan, sebelum mulai."
        />
        <div className="mt-8">
          <ProductStatus />
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-medium">
              Apakah Ansilum cocok untuk saya?
            </h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Fokus awal kami adalah kafe, kedai kopi, dan restoran kecil
              sekitar 1–5 outlet. Kebutuhan lebih besar, perangkat, printer,
              serta metode pembayaran perlu dibahas terlebih dahulu.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-medium">Biaya & pendampingan</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Cakupan penggunaan, biaya, dan bentuk dukungan akan disepakati
              sebelum onboarding. Permintaan demo tidak memulai langganan.
            </p>
            <div className="mt-4">
              <TextLink href="/pricing">Early Merchant Program</TextLink>
            </div>
          </div>
        </div>
        <p className="mt-10 border-t border-[var(--marketing-line)] pt-6 text-sm leading-7 text-muted-foreground">
          Ansilum dikembangkan oleh{' '}
          <Link
            href="/about"
            className="font-medium text-foreground underline underline-offset-4"
          >
            Calterras
          </Link>
          , usaha software dari Indonesia dengan pengalaman membangun software
          komersial untuk klien bisnis.
        </p>
      </Section>
      <FinalCTA placement="product-final" />
    </main>
  )
}
