import { Container, FinalCta, PageHeader } from '@/components/site/page-parts'
import { PlanCards } from '@/components/site/plan-cards'
import { AiStatus, CompareTable, PlanNotes } from '@/components/site/pricing-plans'
import { pricingContent } from '@/content/pricing'
import { isLocale, type Locale } from '@/i18n/config'
import { pageMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'

const content = {
  en: {
    meta: {
      title: 'Pricing',
      description:
        'Ansilum plans: Basic Rp50,000, Standard Rp99,000 and Full Rp199,000 a month. See what each plan includes and how many businesses and outlets it covers.',
    },
    title: 'Simple pricing that grows with your business.',
    lead: 'Pick the plan that fits your outlets. Pay monthly, or yearly on Standard and Full to save 10%, and move up a plan as you grow.',
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
        'Paket Ansilum: Basic Rp50.000, Standard Rp99.000 dan Full Rp199.000 per bulan. Lihat isi setiap paket dan jumlah usaha serta outlet yang dicakup.',
    },
    title: 'Harga sederhana yang tumbuh bersama usaha Anda.',
    lead: 'Pilih paket yang sesuai dengan jumlah outlet Anda. Bayar bulanan, atau tahunan untuk Standard dan Full agar hemat 10%, lalu naik paket saat usaha berkembang.',
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
          <PlanNotes locale={locale} />
          <AiStatus locale={locale} />
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
