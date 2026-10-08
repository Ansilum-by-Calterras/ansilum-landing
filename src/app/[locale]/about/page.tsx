import { HeaderArt, NetworkField } from '@/components/site/line-art'
import { Container, FinalCta, LocalLink, RiseWords } from '@/components/site/page-parts'
import { siteConfig } from '@/config/site'
import { isLocale, type Locale } from '@/i18n/config'
import { pageMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'

/**
 * A letter from the founder. The UMKM count follows Kementerian Koperasi dan UKM figures
 * (more than 60 million businesses); see docs/CLAIMS.md.
 */
const content = {
  en: {
    meta: {
      title: 'About Ansilum and Calterras',
      description:
        'A letter from Saifulloh Fadli, founder of Calterras: why we are bringing AI to every warung, café, and shop in Indonesia, starting with the cashier.',
    },
    title: 'We are bringing AI to every warung, café, and shop in Indonesia.',
    greeting: 'To every business owner in Indonesia,',
    letter: [
      'Small businesses are the backbone of Indonesia. More than 60 million of them, from food stalls in narrow alleys to coffee carts on the roadside, feed families and keep our cities moving. Yet the best technology has always reached big companies first. UMKM have always been served last.',
      'Right now, AI is changing how the world works. Large companies use it to read their data, spot trends, and make decisions in seconds. I refuse to let Indonesian UMKM wait another five or ten years for the same power.',
      'That is why we are building Ansilum. Since March 2024, Ansilum has been a cashier app. Now we are going much further: a cashier you can talk to. An owner simply asks, “Why were sales down this week?” and gets an answer straight from their own sales, along with what to check next.',
      'No complicated technology to learn. No spreadsheets to wrestle with. No consultant to hire. Just the cashier they already open every morning.',
      'Our ambition is big. We want Ansilum to be the business brain of every UMKM in Indonesia. We want the owner of a warung to have the same business intelligence as the director of a large company. When millions of small businesses make slightly better decisions every single day, the whole Indonesian economy moves faster.',
      'This journey has only just begun. A coffee shop, a barbershop, and a dimsum business already record their sales with Ansilum. Next comes the AI assistant that answers their questions. After that, millions more.',
      'If you run a business, I want to hear your story. If you believe in this mission, come build it with us.',
    ],
    role: 'Founder, Calterras',
    byline: 'Calterras founder',
    profile: 'View profile',
    factsHeading: 'At a glance',
    facts: [
      ['Product', 'Ansilum, a cashier app with an AI assistant'],
      ['Started', 'March 2024'],
      ['Built by', 'Calterras'],
      ['Based in', 'Indonesia'],
      ['Funding', 'Bootstrapped'],
      ['Website', 'ansilum.com'],
    ] as [string, string][],
    calterras: {
      heading: 'Ansilum and Calterras.',
      body: 'Ansilum is the product. Calterras is the founder-led, bootstrapped software venture in Indonesia that builds it. Calterras has built commercial software for business clients, and that experience shapes how Ansilum handles the daily rush at the counter.',
    },
    path: {
      heading: 'The road so far, and the road ahead.',
      items: [
        ['March 2024', 'Ansilum starts as a cashier app for Indonesian businesses.'],
        ['Today', 'Toko Kopi Kartika, The Art Barber, and Giafoodies run their sales on Ansilum.'],
        ['Next', 'The Ansilum AI assistant, answering questions from each owner’s own sales.'],
        ['After that', 'Every UMKM in Indonesia.'],
      ] as [string, string][],
      link: 'See dated updates',
    },
    contactHeading: 'Talk to us.',
    contactBody: 'Business owners, partners, and anyone who believes in this mission: start with a demo request.',
    contactEmail: 'Or email us at',
    demo: 'Request a demo',
  },
  id: {
    meta: {
      title: 'Tentang Ansilum dan Calterras',
      description:
        'Surat dari Saifulloh Fadli, founder Calterras: kenapa kami membawa AI ke setiap warung, kedai, dan toko di Indonesia, dimulai dari kasir.',
    },
    title: 'Kami membawa AI ke setiap warung, kedai, dan toko di Indonesia.',
    greeting: 'Untuk setiap pemilik usaha di Indonesia,',
    letter: [
      'UMKM adalah tulang punggung Indonesia. Lebih dari 60 juta usaha, dari warung makan di gang sempit sampai gerobak kopi di pinggir jalan, menghidupi keluarga dan menggerakkan kota kita. Tapi teknologi terbaik selalu datang ke perusahaan besar lebih dulu. UMKM selalu kebagian paling akhir.',
      'Saat ini, AI sedang mengubah cara dunia bekerja. Perusahaan besar memakainya untuk membaca data, melihat tren, dan mengambil keputusan dalam hitungan detik. Saya tidak mau UMKM Indonesia menunggu lima atau sepuluh tahun lagi untuk merasakan kekuatan yang sama.',
      'Itulah kenapa kami membangun Ansilum. Sejak Maret 2024, Ansilum hadir sebagai aplikasi kasir. Sekarang kami melangkah jauh lebih jauh: kasir yang bisa diajak bicara. Pemilik usaha cukup bertanya, “Kenapa penjualan minggu ini turun?”, lalu langsung mendapat jawaban dari angka penjualannya sendiri, lengkap dengan apa yang perlu dicek.',
      'Tanpa harus belajar teknologi yang rumit. Tanpa harus bergulat dengan Excel. Tanpa harus menyewa konsultan. Cukup kasir yang sudah mereka buka setiap pagi.',
      'Ambisi kami besar. Kami ingin Ansilum menjadi otak bisnis bagi setiap UMKM di Indonesia. Kami ingin pemilik warung punya kecerdasan bisnis yang sama dengan direktur perusahaan besar. Ketika jutaan UMKM mengambil keputusan yang sedikit lebih baik setiap hari, seluruh ekonomi Indonesia ikut bergerak lebih cepat.',
      'Perjalanan ini baru dimulai. Kedai kopi, barbershop, dan usaha dimsum sudah mencatat penjualannya dengan Ansilum. Berikutnya, asisten AI yang menjawab pertanyaan mereka. Setelah itu, jutaan usaha lainnya.',
      'Kalau Anda pemilik usaha, saya ingin mendengar cerita Anda. Kalau Anda percaya pada misi ini, mari bangun bersama kami.',
    ],
    role: 'Founder, Calterras',
    byline: 'founder Calterras',
    profile: 'Lihat profil',
    factsHeading: 'Sekilas',
    facts: [
      ['Produk', 'Ansilum, aplikasi kasir dengan asisten AI'],
      ['Dimulai', 'Maret 2024'],
      ['Dibangun oleh', 'Calterras'],
      ['Berbasis di', 'Indonesia'],
      ['Pendanaan', 'Mandiri (bootstrapped)'],
      ['Situs', 'ansilum.com'],
    ],
    calterras: {
      heading: 'Ansilum dan Calterras.',
      body: 'Ansilum adalah produknya. Calterras adalah usaha software dari Indonesia, dipimpin founder dan didanai mandiri, yang membangunnya. Calterras sudah membangun software komersial untuk klien bisnis, dan pengalaman itu membentuk cara Ansilum menangani ramainya kasir setiap hari.',
    },
    path: {
      heading: 'Jalan yang sudah ditempuh, dan yang ada di depan.',
      items: [
        ['Maret 2024', 'Ansilum dimulai sebagai aplikasi kasir untuk usaha di Indonesia.'],
        ['Hari ini', 'Toko Kopi Kartika, The Art Barber, dan Giafoodies menjalankan penjualannya dengan Ansilum.'],
        ['Berikutnya', 'Asisten AI Ansilum, yang menjawab pertanyaan dari penjualan setiap pemilik usaha.'],
        ['Setelah itu', 'Setiap UMKM di Indonesia.'],
      ],
      link: 'Lihat kabar terbaru',
    },
    contactHeading: 'Ngobrol dengan kami.',
    contactBody: 'Pemilik usaha, mitra, dan siapa pun yang percaya pada misi ini: mulai dengan minta demo.',
    contactEmail: 'Atau kirim email ke',
    demo: 'Minta demo',
  },
}

type Props = { params: { locale: string } }

export function generateMetadata({ params }: Props) {
  if (!isLocale(params.locale)) return {}
  return pageMetadata({ locale: params.locale, path: '/about', ...content[params.locale].meta })
}

export default function AboutPage({ params }: Props) {
  if (!isLocale(params.locale)) notFound()
  const locale: Locale = params.locale
  const copy = content[locale]
  const founder = siteConfig.founder
  const initials = founder
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
  const facts = copy.facts.map(([label, value], index) =>
    index === 3 && siteConfig.city ? [label, `${siteConfig.city}, Indonesia`] : [label, value],
  )
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Calterras',
    brand: { '@type': 'Brand', name: 'Ansilum' },
    ...(siteConfig.url ? { url: `${siteConfig.url}/${locale}/about` } : {}),
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    founder: {
      '@type': 'Person',
      name: founder,
      ...(siteConfig.founderProfile ? { url: siteConfig.founderProfile } : {}),
    },
    ...(siteConfig.companyProfile ? { sameAs: [siteConfig.companyProfile] } : {}),
    description: copy.calterras.body,
  }
  return (
    <main id="main-content" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, '\\u003c') }}
      />

      <header className="relative overflow-hidden border-b border-line">
        <Container className="grid gap-10 pb-16 pt-16 sm:pb-20 sm:pt-24 lg:grid-cols-[1.6fr_1fr] lg:items-center">
          <div>
            <h1 className="display-xl max-w-5xl text-balance">
              <RiseWords text={`“${copy.title}”`} />
            </h1>
            <p className="mt-8 flex items-center gap-3 text-lg" data-reveal style={{ '--delay': '600ms' } as React.CSSProperties}>
              <span className="h-0.5 w-8 bg-brand" aria-hidden="true" />
              <span>
                <strong className="font-bold">{founder}</strong>, <span className="text-soft">{copy.byline}</span>
              </span>
            </p>
          </div>
          <div className="hidden max-w-sm justify-self-end lg:block" data-reveal style={{ '--delay': '500ms' } as React.CSSProperties}>
            <HeaderArt />
          </div>
        </Container>
      </header>

      <section>
        <Container className="grid gap-14 py-20 sm:py-24 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <article className="max-w-[44rem]">
            <p className="text-xl font-semibold">{copy.greeting}</p>
            <div className="mt-8 space-y-6 text-lg leading-9 text-ink/85 sm:text-xl sm:leading-10">
              {copy.letter.map((paragraph, index) => (
                <p key={index} className={index === 4 ? 'font-semibold text-ink' : undefined} data-reveal>
                  {paragraph}
                </p>
              ))}
            </div>
            <footer className="mt-12 flex items-center gap-4 border-t border-line pt-8" data-reveal>
              <span
                className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand text-lg font-bold text-white"
                aria-hidden="true"
              >
                {initials}
              </span>
              <div>
                <p className="text-lg font-bold">— {founder}</p>
                <svg viewBox="0 0 200 12" className="h-3 w-40 text-brand" fill="none" aria-hidden="true">
                  <path className="draw" pathLength={100} d="M2 8 C 40 2, 80 12, 120 6 S 180 4, 198 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <p className="text-soft">{copy.role}</p>
                {siteConfig.founderProfile && (
                  <a href={siteConfig.founderProfile} className="text-sm font-semibold text-brand-ink hover:text-ink">
                    {copy.profile}
                  </a>
                )}
              </div>
            </footer>
          </article>
          <aside className="h-fit lg:sticky lg:top-28">
            <h2 className="text-sm font-semibold text-soft">{copy.factsHeading}</h2>
            <dl className="mt-4 divide-y divide-line border-y border-line">
              {facts.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3.5 text-sm">
                  <dt className="text-soft">{label}</dt>
                  <dd className="font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-night text-white">
        <div className="absolute inset-0 opacity-50" aria-hidden="true">
          <NetworkField />
        </div>
        <Container className="relative grid gap-14 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="display-md">{copy.calterras.heading}</h2>
            <p className="mt-6 text-lg leading-8 text-white/75">{copy.calterras.body}</p>
          </div>
          <div>
            <h2 className="display-md">{copy.path.heading}</h2>
            <ol className="mt-8 space-y-6">
              {copy.path.items.map(([when, what], index) => (
                <li key={when} className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-white/15 pt-5">
                  <p className={index === copy.path.items.length - 1 ? 'font-bold text-sun' : 'font-bold'}>{when}</p>
                  <p className="text-white/80">{what}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <LocalLink locale={locale} href="/updates" className="text-link !text-sun hover:!text-white">
                {copy.path.link}
              </LocalLink>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-20 sm:py-24">
          <h2 className="display-md">{copy.contactHeading}</h2>
          <p className="lead mt-4 max-w-2xl">{copy.contactBody}</p>
          {siteConfig.email && (
            <p className="mt-4 text-soft">
              {copy.contactEmail}{' '}
              <a href={`mailto:${siteConfig.email}`} className="font-semibold text-brand-ink hover:text-ink">
                {siteConfig.email}
              </a>
            </p>
          )}
          <div className="mt-6">
            <LocalLink locale={locale} href="/demo">
              {copy.demo}
            </LocalLink>
          </div>
        </Container>
      </section>

      <FinalCta locale={locale} placement="about-final" />
    </main>
  )
}
