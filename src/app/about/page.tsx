import {
  Eyebrow,
  FinalCTA,
  PageIntro,
  Section,
  TextLink,
} from '@/components/marketing/sections'
import { siteConfig } from '@/config/site'
import { pageMetadata } from '@/lib/metadata'
import Link from 'next/link'
export const metadata = pageMetadata(
  'Tentang Calterras — Pengembang Ansilum',
  'Kenali Calterras, usaha software dari Indonesia yang mengembangkan Ansilum. Lihat fokus produk, tahap pengembangan, dan cara menghubungi kami.',
  '/about',
)
export default function AboutPage() {
  const facts = [
    ['Pengembang', 'Calterras'],
    ['Produk utama', 'Ansilum'],
    [
      'Lokasi operasional',
      siteConfig.city ? `${siteConfig.city}, Indonesia` : 'Indonesia',
    ],
    ['Pendanaan', 'Mandiri / bootstrapped'],
    ['Tahap Ansilum', 'Early Beta'],
    ...(siteConfig.founder ? [['Founder', siteConfig.founder]] : []),
    ...(siteConfig.since ? [['Mulai beroperasi', siteConfig.since]] : []),
  ]
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Calterras',
    ...(siteConfig.url ? { url: `${siteConfig.url}/about` } : {}),
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    ...(siteConfig.founder
      ? {
          founder: {
            '@type': 'Person',
            name: siteConfig.founder,
            ...(siteConfig.founderProfile
              ? { url: siteConfig.founderProfile }
              : {}),
          },
        }
      : {}),
    ...(siteConfig.companyProfile
      ? { sameAs: [siteConfig.companyProfile] }
      : {}),
    description: 'Usaha software dari Indonesia yang mengembangkan Ansilum.',
  }
  return (
    <main id="main-content" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization).replace(/</g, '\\u003c'),
        }}
      />
      <PageIntro
        eyebrow="Tentang Calterras"
        title="Software untuk pekerjaan operasional sehari-hari."
      >
        <p>
          Calterras adalah usaha pengembangan software dari Indonesia yang
          dipimpin langsung oleh founder. Kami telah membangun software
          komersial untuk klien bisnis dan kini mengembangkan Ansilum sebagai
          fokus produk SaaS kami.
        </p>
      </PageIntro>
      <Section className="!pt-6">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="editorial">
            <h2 className="!mt-0">
              Dari sistem bisnis ke produk yang dapat digunakan lebih luas
            </h2>
            <p>
              Pengalaman membangun sistem operasional menjadi dasar langkah kami
              berikutnya: mengembangkan produk untuk bisnis dengan kebutuhan
              serupa. Melalui Ansilum, kami berfokus pada kasir dan visibilitas
              operasional untuk kafe, kedai kopi, serta restoran kecil.
            </p>
            <p>
              Calterras didanai secara mandiri. Kami mengembangkan produk secara
              bertahap, dengan cakupan yang jelas dan proses evaluasi yang
              terbuka bersama calon pengguna.
            </p>
            <h2>Fokus kami saat ini: Ansilum</h2>
            <p>
              Ansilum adalah POS Early Beta yang dirancang dengan pendekatan
              offline-first. Fokusnya adalah pencatatan di kasir pada perangkat
              yang telah disiapkan, lalu sinkronisasi data untuk membantu
              pemilik meninjau operasional.
            </p>
            <p>
              Kami merencanakan integrasi Claude sebagai lapisan tanya jawab dan
              penjelasan atas data bisnis. Fitur AI ini belum tersedia untuk
              merchant.
            </p>
            <Link href="/products/ansilum">Kenali produk Ansilum</Link>
            <h2>Pengalaman komersial</h2>
            <p>
              Calterras telah membangun software untuk klien bisnis berbayar.
              Pengalaman tersebut menjadi dasar pengembangan Ansilum. Pengalaman
              proyek Calterras dan tahap validasi produk Ansilum memiliki
              konteks masing-masing.
            </p>
            {siteConfig.founder && (
              <>
                <h2>Orang di balik Calterras</h2>
                <p>
                  <strong>{siteConfig.founder}</strong>
                  <br />
                  Founder, Calterras.
                </p>
                {siteConfig.founderProfile && (
                  <a href={siteConfig.founderProfile}>Lihat profil founder</a>
                )}
              </>
            )}
            <h2>Hubungi Calterras</h2>
            <p>
              Untuk membahas kebutuhan POS dan kecocokan Ansilum, mulai dari
              permintaan demo.
            </p>
            {siteConfig.email && (
              <p>
                Pertanyaan tentang Calterras atau kerja sama:{' '}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
              </p>
            )}
            <Link href="/demo">Minta Demo</Link>
          </div>
          <div className="h-fit rounded-3xl bg-[var(--marketing-paper)] p-7 sm:p-9">
            <Eyebrow>Calterras → Ansilum</Eyebrow>
            <h2 className="mt-5 text-xl font-medium">Sekilas tentang kami</h2>
            <dl className="mt-6 divide-y divide-[var(--marketing-line)]">
              {facts.map(([label, value]) => (
                <div key={label} className="py-4">
                  <dt className="text-xs text-muted-foreground">{label}</dt>
                  <dd className="mt-1 font-medium">{value}</dd>
                </div>
              ))}
            </dl>
            {siteConfig.companyProfile && (
              <TextLink href={siteConfig.companyProfile}>
                Profil perusahaan
              </TextLink>
            )}
          </div>
        </div>
        <div
          className="mt-16 rounded-2xl border border-[var(--marketing-line)] p-7"
          lang="en"
        >
          <Eyebrow>Company overview</Eyebrow>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">
            Calterras is a bootstrapped, founder-led software venture based in
            Indonesia. It has built commercial software for paying business
            clients and is developing Ansilum, an early Beta POS for F&B
            operators. Ansilum focuses on offline-first cashier operations and
            operational visibility. Claude integration is planned for
            natural-language questions over business data; it is not yet an
            available product feature.
          </p>
        </div>
      </Section>
      <FinalCTA placement="about-final" />
    </main>
  )
}
