import { ConsultationPreview } from '@/components/site/consultation-preview'
import { DemoLink } from '@/components/site/demo-link'
import { Faq } from '@/components/site/faq'
import { AskArt, HeroFlow, NetworkField, PulseRule, ReceiptArt, SortArt, UmkmScene } from '@/components/site/line-art'
import { Container, FinalCta, LocalLink, RiseWords } from '@/components/site/page-parts'
import { PlanCards } from '@/components/site/pricing-plans'
import { ProductScreens } from '@/components/site/product-screens'
import { commonContent } from '@/content/common'
import { homeContent } from '@/content/home'
import { isLocale, type Locale } from '@/i18n/config'
import { pageMetadata } from '@/lib/metadata'
import {
  ArrowRightIcon,
  BuildingStorefrontIcon,
  ChartBarIcon,
  SignalSlashIcon,
  SparklesIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline'
import { notFound } from 'next/navigation'
import { BetaAccess } from '@/components/site/mobile-app-cta'

type Props = { params: { locale: string } }

export function generateMetadata({ params }: Props) {
  if (!isLocale(params.locale)) return {}
  return pageMetadata({ locale: params.locale, path: '/', ...homeContent[params.locale].meta })
}

const pointIcons = [ChartBarIcon, TrophyIcon, SignalSlashIcon, BuildingStorefrontIcon]
const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties

export default function HomePage({ params }: Props) {
  if (!isLocale(params.locale)) notFound()
  const locale: Locale = params.locale
  const copy = homeContent[locale]
  const common = commonContent[locale]
  const stepArt = [
    <ReceiptArt key="receipt" lines={copy.how.receipt} />,
    <SortArt key="sort" />,
    <AskArt key="ask" question={copy.how.ask} />,
  ]

  return (
    <main id="main-content" tabIndex={-1}>
      {/* Hero */}
      <section className="relative">
        <Container className="pb-14 pt-16 sm:pt-24 lg:pb-10">
          <h1 className="display-xl max-w-5xl text-balance">
            <RiseWords text={copy.hero.headline} />
          </h1>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <div data-reveal style={delay(350)}>
              <p className="lead max-w-2xl">{copy.hero.supporting}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <DemoLink locale={locale} placement="hero">
                  {common.requestDemo}
                  <ArrowRightIcon className="size-4" aria-hidden="true" />
                </DemoLink>
                <a
                  href="https://dashboard.ansilum.com/sign-up"
                  className="btn-secondary"
                >
                  {copy.hero.tryIt}
                </a>
              </div>
              <p className="mt-10 text-sm text-soft">{copy.hero.usedBy}</p>
              <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-lg font-bold tracking-[-0.02em] text-ink/80">
                {copy.customers.entries.map((entry) => (
                  <li key={entry.name}>{entry.name}</li>
                ))}
              </ul>
            </div>
            <div className="relative hidden lg:block" data-reveal style={delay(500)}>
              <div className="absolute -top-6 right-0 w-[26rem]">
                <HeroFlow text={copy.hero.flow} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Demo, straight after the hero, on the brand band */}
      <section id="demo" aria-label={copy.demo.label} className="relative scroll-mt-20 pb-16 sm:pb-24 lg:pt-10">
        <div
          className="absolute inset-x-0 bottom-[38%] top-24 -skew-y-3 bg-[linear-gradient(100deg,#FF5B1F_0%,#FF7A2E_45%,#FFC53D_100%)]"
          aria-hidden="true"
        />
        <Container className="relative">
          <ConsultationPreview locale={locale} />
        </Container>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-20">
        <Container className="py-20 sm:py-28">
          <h2 className="display-lg max-w-4xl text-balance" data-reveal>
            {copy.how.heading} <span className="text-soft">{copy.how.intro}</span>
          </h2>
          <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
            {copy.how.steps.map((step, index) => (
              <li key={step.title} data-reveal style={delay(index * 150)}>
                <div className="mb-6 rounded-2xl bg-mist px-6 py-4">{stepArt[index]}</div>
                <PulseRule />
                <span className="mt-6 block text-sm font-bold text-brand-ink">0{index + 1}</span>
                <h3 className="mt-3 text-xl font-bold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-3 text-[1.05rem] leading-7 text-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* For every UMKM */}
      <section id="umkm" className="scroll-mt-20 bg-mist">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
            <h2 className="display-lg text-balance" data-reveal>
              {copy.umkm.heading}
            </h2>
            <p className="lead" data-reveal style={delay(120)}>
              {copy.umkm.intro}
            </p>
          </div>
          <div className="mt-14" data-reveal style={delay(200)}>
            <UmkmScene question={copy.umkm.scene.question} answer={copy.umkm.scene.answer} />
          </div>
          <ul className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {copy.umkm.examples.map(([type, question], index) => (
              <li key={type} className="border-t border-ink/10 py-5" data-reveal style={delay((index % 4) * 90)}>
                <p className="text-sm font-semibold text-brand-ink">{type}</p>
                <p className="mt-1.5 text-lg font-medium leading-7">“{question}”</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* The cashier app underneath */}
      <section id="product" className="scroll-mt-20">
        <Container className="grid gap-14 py-20 sm:py-28 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <h2 className="display-lg text-balance" data-reveal>
              {copy.product.heading}
            </h2>
            <p className="lead mt-6" data-reveal style={delay(100)}>
              {copy.product.body}
            </p>
            <dl className="mt-10 grid gap-8 sm:grid-cols-2">
              {copy.product.points.map(([title, body], index) => {
                const Icon = pointIcons[index]
                return (
                  <div key={title} data-reveal style={delay(150 + index * 90)}>
                    <dt className="flex items-center gap-2.5 font-bold">
                      <Icon className="size-5 text-brand" aria-hidden="true" />
                      {title}
                    </dt>
                    <dd className="mt-2 leading-7 text-soft">{body}</dd>
                  </div>
                )
              })}
            </dl>
            <div className="mt-8">
              <LocalLink locale={locale} href="/product">
                {copy.product.link}
              </LocalLink>
            </div>
          </div>
          <div
            className="rounded-3xl bg-mist bg-[radial-gradient(rgb(17_20_24/0.09)_1.2px,transparent_1.2px)] px-6 py-10 [background-size:14px_14px] sm:px-10"
            data-reveal
            style={delay(150)}
          >
            <ProductScreens locale={locale} />
          </div>
        </Container>
      </section>

      {/* Closed beta: download request */}
      <section id="download" className="relative scroll-mt-20 overflow-hidden bg-night text-white">
        <Container className="py-20 sm:py-28">
          <BetaAccess copy={copy.beta} locale={locale} />
        </Container>
      </section>

      {/* Businesses using Ansilum */}
      <section id="customers" className="scroll-mt-20">
        <Container className="py-20 sm:py-28">
          <PulseRule className="mb-20 !h-px !bg-line" />
          <div className="max-w-3xl">
            <h2 className="display-lg text-balance" data-reveal>
              {copy.customers.heading}
            </h2>
            <p className="lead mt-6" data-reveal style={delay(100)}>
              {copy.customers.intro}
            </p>
          </div>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {copy.customers.entries.map((entry, index) => (
              <li key={entry.name} className="group bg-white px-7 py-8" data-reveal style={delay(index * 120)}>
                <span className="relative mb-6 flex size-3" aria-hidden="true">
                  <span className="ping absolute inset-0 rounded-full bg-leaf" style={delay(index * 500)} />
                  <span className="relative size-3 rounded-full bg-leaf" />
                </span>
                <p className="text-sm font-semibold text-brand-ink">{entry.type}</p>
                <p className="mt-3 text-2xl font-bold tracking-[-0.03em]">{entry.name}</p>
                <p className="mt-2 text-soft">{entry.owner}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Mission */}
      <section className="relative overflow-hidden bg-night text-white">
        <div className="absolute inset-y-0 right-0 hidden w-[55%] lg:block" aria-hidden="true">
          <NetworkField />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#0D1117_0%,transparent_40%)]" />
        </div>
        <Container className="relative grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-20">
          <div>
            <h2 className="display-lg text-balance" data-reveal>
              {copy.mission.heading}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70" data-reveal style={delay(120)}>
              {copy.mission.body}
            </p>
            <div className="mt-8">
              <LocalLink locale={locale} href="/about" className="text-link !text-sun hover:!text-white">
                {copy.mission.link}
              </LocalLink>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-1">
            {copy.mission.stats.map(([value, label], index) => (
              <div key={label} className="flex flex-col" data-reveal style={delay(200 + index * 150)}>
                <PulseRule dark className="mb-6" />
                <dt className="mt-2 text-sm text-white/60">{label}</dt>
                <dd className={`order-first text-4xl font-bold tracking-[-0.04em] sm:text-5xl ${index ? '' : 'text-sun'}`}>
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-20">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
            <h2 className="display-lg text-balance" data-reveal>
              {copy.pricing.heading}
            </h2>
            <p className="lead" data-reveal style={delay(120)}>
              {copy.pricing.body}
            </p>
          </div>
          <div className="mt-12">
            <PlanCards locale={locale} />
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" data-reveal>
            <p className="flex items-center gap-2 font-semibold">
              <SparklesIcon className="size-5 text-brand" aria-hidden="true" />
              {copy.pricing.ai}
            </p>
            <LocalLink locale={locale} href="/pricing">
              {copy.pricing.link}
            </LocalLink>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 border-t border-line">
        <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <h2 className="display-lg text-balance" data-reveal>
              {copy.faq.heading}
            </h2>
            <div className="mt-6">
              <LocalLink locale={locale} href="/pricing">
                {copy.faq.gettingStarted}
              </LocalLink>
            </div>
          </div>
          <div data-reveal style={delay(120)}>
            <Faq items={copy.faq.items} />
          </div>
        </Container>
      </section>

      <FinalCta locale={locale} placement="home-final" />
    </main>
  )
}
