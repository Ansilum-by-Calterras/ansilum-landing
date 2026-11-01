'use client'
import { plans, pricingContent, yearlyDiscount } from '@/content/pricing'
import type { Locale } from '@/i18n/config'
import { rupiah } from '@/lib/format'
import { CheckIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import { useState } from 'react'
import { DemoLink } from './demo-link'

type Style = React.CSSProperties & Record<`--${string}`, string | number>
type Period = 'monthly' | 'yearly'

const bestDiscount = Math.max(...plans.map(yearlyDiscount))

/**
 * Three plans side by side in one bordered grid; Standard is highlighted. Each plan after the
 * first lists only what it adds to the one before it. The switch above shows yearly prices and
 * their saving; a plan billed monthly only keeps its monthly price.
 */
export function PlanCards({ locale }: { locale: Locale }) {
  const copy = pricingContent[locale]
  const [period, setPeriod] = useState<Period>('monthly')
  return (
    <div>
      <div className="flex justify-center">
        <div role="group" aria-label={copy.billing.label} className="inline-flex rounded-xl bg-mist p-1">
          {(['monthly', 'yearly'] as Period[]).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={period === option}
              onClick={() => setPeriod(option)}
              className={clsx(
                'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
                period === option ? 'bg-ink text-white shadow-sm' : 'text-soft hover:text-ink',
              )}
            >
              {copy.billing[option]}
              {option === 'yearly' && bestDiscount > 0 && (
                <span
                  className={clsx(
                    'rounded-md px-1.5 py-0.5 text-xs font-bold',
                    period === option ? 'bg-leaf text-white' : 'bg-leaf-soft text-leaf',
                  )}
                >
                  {copy.save(bestDiscount)}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3 md:gap-px">
        {plans.map((plan, index) => {
          const name = copy.plans[plan.key]
          const highlighted = plan.key === 'standard'
          const previous = plans[index - 1]
          const added = previous ? plan.features.filter((feature) => !previous.features.includes(feature)) : plan.features
          const discount = yearlyDiscount(plan)
          const yearly = period === 'yearly' && plan.yearly !== null
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
              <p className="mt-6 flex flex-wrap items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-[-0.04em]">
                  {rupiah(yearly ? plan.yearly! : plan.price, locale)}
                </span>
                <span className="text-soft">{yearly ? copy.perYear : copy.perMonth}</span>
              </p>
              <p className="mt-1 flex min-h-6 flex-wrap items-center gap-2 text-sm text-soft">
                {yearly ? (
                  <>
                    <span className="sr-only">{copy.normally}</span>
                    <s>{rupiah(plan.price * 12, locale)}</s>
                    <span className="rounded-md bg-leaf-soft px-1.5 py-0.5 text-xs font-bold text-leaf">
                      {copy.save(discount)}
                    </span>
                  </>
                ) : plan.yearly === null ? (
                  period === 'yearly' ? copy.yearlyUnavailable : copy.monthlyOnly
                ) : (
                  copy.yearlyHint(discount)
                )}
              </p>
              <ul className="mt-7 flex-1 space-y-3 border-t border-line pt-6">
                <li className="font-semibold">{copy.limits(plan.businesses, plan.outlets)}</li>
                <li className="text-sm text-soft">{copy.noLimit}</li>
                {previous && (
                  <li className="flex items-start gap-2.5 font-semibold">
                    <CheckIcon className="mt-1 size-4 shrink-0 text-leaf" strokeWidth={2.5} aria-hidden="true" />
                    {copy.everythingIn(copy.plans[previous.key].name)}
                  </li>
                )}
                {added.map((feature) => (
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
    </div>
  )
}
