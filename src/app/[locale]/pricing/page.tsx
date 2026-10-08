import { Container, FinalCta, PageHeader } from '@/components/site/page-parts'
import { AiCredits, CompareTable, PlanCards } from '@/components/site/pricing-plans'
import { pricingContent } from '@/content/pricing'
import { isLocale, type Locale } from '@/i18n/config'
import { pageMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'

const content = {
  en: {
    meta: {
      title: 'Pricing',
      description:
        'Ansilum plans start at Rp50,000 a month: Basic, Standard, and Full. The AI assistant is coming soon with pay-as-you-go credits.',
    },
    title: 'Simple pricing that grows with your business.',
    lead: 'Pick a plan for your cashier, pay monthly, and switch as you grow. The AI assistant is coming soon, paid with credits only when you use it.',
    stepsHeading: 'From demo to your first sale.',
    steps: [
      ['Request a demo', 'Tell us about your business. It is free.'],
      ['Pick a plan', 'We help you choose the plan that fits your outlets.'],
      ['Set up', 'We load your products and prepare your cashier devices.'],
      ['Start selling', 'Your cashier records sales. You read the reports.'],
    ],
  },
  id: {
    meta: {
      title: 'Harga',
      description:
        'Paket Ansilum mulai Rp50.000 per bulan: Basic, Standard, dan Full. Asisten AI segera hadir dengan kredit bayar sesuai pemakaian.',
    },
    title: 'Harga sederhana yang tumbuh bersama usaha Anda.',
    lead: 'Pilih paket kasir, bayar bulanan, dan naik paket kapan saja saat usaha berkembang. Asisten AI segera hadir, dibayar dengan kredit hanya saat dipakai.',
    stepsHeading: 'Dari demo sampai penjualan pertama.',
    steps: [
      ['Minta demo', 'Ceritakan usaha Anda. Gratis.'],
      ['Pilih paket', 'Kami bantu pilih paket yang cocok dengan jumlah outlet Anda.'],
      ['Penyiapan', 'Kami masukkan produk Anda dan siapkan perangkat kasir.'],
      ['Mulai berjualan', 'Kasir mencatat penjualan. Anda membaca laporannya.'],
    ],
  },
}

type Props = { params: { locale: string } }

export function generateMetadata({ params }: Props) {
  if (!isLocale(params.locale)) return {}
  return pageMetadata({ locale: params.locale, path: '/pricing', ...content[params.locale].meta })
}

export default function PricingPage({ params }: Props) {
  if (!isLocale(params.locale)) notFound()
  const locale: Locale = params.locale
  const copy = content[locale]
  const pricing = pricingContent[locale]
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHeader title={copy.title}>
        <p>{copy.lead}</p>
      </PageHeader>

      <section id="plans" className="scroll-mt-20">
        <Container className="space-y-6 py-16 sm:py-20">
          <PlanCards locale={locale} />
          <AiCredits locale={locale} />
        </Container>
      </section>

      <section id="compare" className="scroll-mt-20">
        <Container className="pb-20 sm:pb-28">
          <h2 className="display-md" data-reveal>
            {pricing.compare}
          </h2>
          <div className="mt-8">
            <CompareTable locale={locale} />
          </div>
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="py-20 sm:py-28">
          <h2 className="display-lg max-w-3xl text-balance" data-reveal>
            {copy.stepsHeading}
          </h2>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {copy.steps.map(([title, body], index) => (
              <li
                key={title}
                className="border-t-2 border-ink pt-6"
                data-reveal
                style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}
              >
                <span className="text-sm font-bold text-brand-ink">0{index + 1}</span>
                <h3 className="mt-3 text-xl font-bold tracking-[-0.02em]">{title}</h3>
                <p className="mt-3 leading-7 text-soft">{body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <FinalCta locale={locale} placement="pricing-final" />
    </main>
  )
}
