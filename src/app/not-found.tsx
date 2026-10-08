import { PageIntro, Section } from '@/components/marketing/sections'
import Link from 'next/link'
export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageIntro
        eyebrow="404 · Halaman tidak ditemukan"
        title="Mari kembali ke halaman yang tepat."
      >
        <p>
          Alamat ini tidak tersedia. Anda bisa mengenal produk Ansilum atau
          kembali ke beranda.
        </p>
      </PageIntro>
      <Section className="!pt-0">
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="action-primary">
            Ke beranda
          </Link>
          <Link href="/products/ansilum" className="action-secondary">
            Kenali Ansilum
          </Link>
        </div>
      </Section>
    </main>
  )
}
