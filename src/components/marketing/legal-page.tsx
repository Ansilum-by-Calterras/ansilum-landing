import { siteConfig } from '@/config/site'
import Link from 'next/link'
import { PageIntro, Section } from './sections'
export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string
  intro: string
  children: React.ReactNode
}) {
  return (
    <main id="main-content">
      <PageIntro eyebrow="Informasi Calterras & Ansilum" title={title}>
        <p>{intro}</p>
      </PageIntro>
      <Section className="!pt-0">
        <div className="editorial">
          <p className="!mb-8 text-xs">Diperbarui 8 Oktober 2026</p>
          {children}
          <h2>Hubungi Calterras</h2>
          {siteConfig.email ? (
            <p>
              Kirim pertanyaan atau permintaan terkait informasi Anda ke{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>
          ) : (
            <p>
              Anda dapat menyampaikan pertanyaan melalui{' '}
              <Link href="/demo">formulir kontak dan demo</Link>. Jelaskan
              kebutuhan Anda di kolom catatan; permintaan tersebut tidak membuat
              langganan.
            </p>
          )}
        </div>
      </Section>
    </main>
  )
}
