import { DemoForm } from '@/components/site/demo-form'
import { Container, PageHeader } from '@/components/site/page-parts'
import { siteConfig } from '@/config/site'
import { isLocale, type Locale } from '@/i18n/config'
import { pageMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'

const content = {
  en: {
    meta: {
      title: 'Request a demo',
      description:
        'Tell us about your business. In the demo we look at how you sell, show you the Ansilum cashier app, and try the AI assistant together.',
    },
    title: 'Request a demo.',
    lead: 'Tell us a little about your business. We will get in touch to set up a time to talk. It is free.',
    sessionHeading: 'What happens in the demo',
    session: [
      ['Your business', 'How you sell, which payments you take, and what you want to know about your sales.'],
      ['The cashier app', 'Ringing up sales, managing products, and reading your sales report.'],
      ['The AI assistant', 'We ask it questions together, using a sample shop’s data.'],
      ['Next steps', 'Setup, devices, costs, and support, agreed before you start.'],
    ],
    note: 'We will contact you using the details you give us to agree on a time.',
    whatsapp: 'Message us on WhatsApp',
  },
  id: {
    meta: {
      title: 'Minta demo',
      description:
        'Ceritakan usaha Anda. Saat demo, kita bahas cara Anda berjualan, lihat aplikasi kasir Ansilum, dan coba asisten AI bersama.',
    },
    title: 'Minta demo.',
    lead: 'Ceritakan sedikit soal usaha Anda. Kami akan menghubungi Anda untuk atur waktu ngobrol. Gratis.',
    sessionHeading: 'Yang terjadi saat demo',
    session: [
      ['Usaha Anda', 'Cara Anda berjualan, pembayaran yang diterima, dan apa yang ingin Anda ketahui dari penjualan.'],
      ['Aplikasi kasir', 'Mencatat penjualan, mengelola produk, dan membaca laporan penjualan.'],
      ['Asisten AI', 'Kita coba bertanya bersama, memakai data toko contoh.'],
      ['Langkah berikutnya', 'Penyiapan, perangkat, biaya, dan dukungan disepakati sebelum mulai.'],
    ],
    note: 'Kami akan menghubungi Anda lewat kontak yang Anda berikan untuk menyepakati waktunya.',
    whatsapp: 'Kirim pesan WhatsApp',
  },
}

type Props = { params: { locale: string } }

export function generateMetadata({ params }: Props) {
  if (!isLocale(params.locale)) return {}
  return pageMetadata({ locale: params.locale, path: '/demo', ...content[params.locale].meta })
}

export default function DemoPage({ params }: Props) {
  if (!isLocale(params.locale)) notFound()
  const locale: Locale = params.locale
  const copy = content[locale]
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHeader title={copy.title}>
        <p>{copy.lead}</p>
      </PageHeader>
      <Container className="grid items-start gap-14 py-16 sm:py-20 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div className="lg:sticky lg:top-28">
          <h2 className="font-bold tracking-[-0.03em] text-3xl">{copy.sessionHeading}</h2>
          <ol className="mt-8 space-y-6">
            {copy.session.map(([title, body], index) => (
              <li key={title} className="grid grid-cols-[2rem_1fr] gap-3 border-t border-line pt-5">
                <span className="text-sm font-bold text-brand-ink">0{index + 1}</span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1.5 leading-7 text-soft">{body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-sm leading-6 text-soft">{copy.note}</p>
          {siteConfig.email && (
            <a href={`mailto:${siteConfig.email}`} className="text-link mt-3 break-all">
              {siteConfig.email}
            </a>
          )}
          {siteConfig.whatsapp && (
            <a href={`https://wa.me/${siteConfig.whatsapp}`} className="text-link mt-1 block">
              {copy.whatsapp}
            </a>
          )}
        </div>
        <DemoForm locale={locale} />
      </Container>
    </main>
  )
}
