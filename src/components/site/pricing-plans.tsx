import { featureOrder, plans, pricingContent } from '@/content/pricing'
import type { Locale } from '@/i18n/config'
import { rupiah } from '@/lib/format'
import { CheckIcon, MinusIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import { DemoLink } from './demo-link'

type Style = React.CSSProperties & Record<`--${string}`, string | number>

/** Three plans side by side in one bordered grid; Standard is highlighted. */
export function PlanCards({ locale }: { locale: Locale }) {
  const copy = pricingContent[locale]
  return (
    <div className="grid overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3 md:gap-px">
      {plans.map((plan, index) => {
        const name = copy.plans[plan.key]
        const highlighted = plan.key === 'standard'
        return (
          <div
            key={plan.key}
            data-reveal
            style={{ '--delay': `${index * 120}ms` } as Style}
            className={clsx(
              'relative flex flex-col bg-white px-7 pb-8 pt-9 [&:not(:first-child)]:border-t [&:not(:first-child)]:border-line md:[&:not(:first-child)]:border-t-0',
              highlighted && 'bg-[linear-gradient(180deg,#FFEEE6_0%,#FFFFFF_45%)]',
            )}
          >
            {highlighted && <span className="absolute inset-x-0 top-0 h-1 bg-brand" aria-hidden="true" />}
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-bold tracking-[-0.02em]">{name.name}</h3>
              {highlighted && (
                <span className="rounded-md bg-brand px-2 py-0.5 text-xs font-semibold text-white">{copy.recommended}</span>
              )}
            </div>
            <p className="mt-2 min-h-12 leading-6 text-soft">{name.tagline}</p>
            <p className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-[-0.04em]">{rupiah(plan.price, locale)}</span>
              <span className="text-soft">{copy.perMonth}</span>
            </p>
            <ul className="mt-7 flex-1 space-y-3 border-t border-line pt-6">
              <li className="font-semibold">{copy.outlets(plan.outlets)}</li>
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <CheckIcon className="mt-1 size-4 shrink-0 text-leaf" strokeWidth={2.5} aria-hidden="true" />
                  {copy.features[feature]}
                </li>
              ))}
            </ul>
            <DemoLink
              locale={locale}
              placement={`pricing-${plan.key}`}
              className={clsx('mt-8 w-full', !highlighted && '!bg-white !text-ink ring-1 ring-inset ring-line hover:!bg-mist')}
            >
              {name.cta}
            </DemoLink>
          </div>
        )
      })}
    </div>
  )
}

/** Pay-as-you-go credits for the AI assistant, with a credit meter that fills and drains. */
export function AiCredits({ locale }: { locale: Locale }) {
  const copy = pricingContent[locale].ai
  return (
    <div
      data-reveal
      className="grid gap-10 overflow-hidden rounded-2xl bg-night px-7 py-10 text-white sm:px-10 lg:grid-cols-[1.3fr_1fr] lg:items-center"
    >
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-sun px-2.5 py-1 text-xs font-bold text-night">
          <SparklesIcon className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
          {copy.badge}
        </span>
        <h3 className="mt-5 text-2xl font-bold tracking-[-0.03em] sm:text-3xl">{copy.heading}</h3>
        <p className="mt-4 max-w-xl text-lg leading-8 text-white/70">{copy.body}</p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {copy.points.map((point) => (
            <li key={point} className="flex items-start gap-2 text-sm text-white/85">
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-sun" strokeWidth={2.5} aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/5 p-6" data-anim aria-hidden="true">
        <p className="text-sm font-semibold text-white/60">{copy.meter}</p>
        <div className="mt-4 grid grid-cols-12 gap-2">
          {Array.from({ length: 36 }, (_, index) => (
            <span
              key={index}
              className="twinkle aspect-square rounded-full bg-sun"
              style={{ '--delay': `${(index % 12) * 0.12 + Math.floor(index / 12) * 0.3}s`, '--dur': '2.8s' } as Style}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function CompareTable({ locale }: { locale: Locale }) {
  const copy = pricingContent[locale]
  return (
    <div className="overflow-x-auto" data-reveal>
      <table className="w-full min-w-[34rem] text-left">
        <thead>
          <tr className="border-b border-ink">
            <th scope="col" className="py-3 pr-4 text-sm font-semibold text-soft">
              {copy.feature}
            </th>
            {plans.map((plan) => (
              <th key={plan.key} scope="col" className="py-3 text-center text-sm font-bold">
                {copy.plans[plan.key].name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-line">
            <th scope="row" className="py-4 pr-4 font-medium">
              {copy.maxOutlets}
            </th>
            {plans.map((plan) => (
              <td key={plan.key} className="py-4 text-center font-semibold">
                {plan.outlets ?? copy.unlimited}
              </td>
            ))}
          </tr>
          {featureOrder.map((feature) => (
            <tr key={feature} className="border-b border-line">
              <th scope="row" className="py-4 pr-4 font-medium">
                {copy.features[feature]}
              </th>
              {plans.map((plan) => {
                const included = plan.features.includes(feature)
                const Icon = included ? CheckIcon : MinusIcon
                return (
                  <td key={plan.key} className="py-4 text-center">
                    <Icon
                      className={clsx('mx-auto size-5', included ? 'text-leaf' : 'text-steel')}
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                    <span className="sr-only">{included ? copy.included : copy.notIncluded}</span>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
