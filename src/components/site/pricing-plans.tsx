import { featureOrder, plans, pricingContent, type Plan } from '@/content/pricing'
import type { Locale } from '@/i18n/config'
import { rupiah } from '@/lib/format'
import { CheckIcon, MinusIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'

type Style = React.CSSProperties & Record<`--${string}`, string | number>

/** The limits and billing facts that apply to every plan. */
export function PlanNotes({ locale }: { locale: Locale }) {
  return (
    <ul className="space-y-2 text-sm leading-6 text-soft">
      {pricingContent[locale].notes.map((note) => (
        <li key={note}>{note}</li>
      ))}
    </ul>
  )
}

/** The AI assistant's status: in development and not part of any plan yet. */
export function AiStatus({ locale }: { locale: Locale }) {
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
          {(
            [
              [copy.rows.monthly, (plan: Plan) => rupiah(plan.price, locale)],
              [copy.rows.yearly, (plan: Plan) => (plan.yearly === null ? copy.notOffered : rupiah(plan.yearly, locale))],
              [copy.rows.businesses, (plan: Plan) => plan.businesses],
              [copy.rows.outlets, (plan: Plan) => plan.outlets],
              [copy.rows.people, () => copy.noLimitShort],
            ] as [string, (plan: Plan) => React.ReactNode][]
          ).map(([label, value]) => (
            <tr key={label} className="border-b border-line">
              <th scope="row" className="py-4 pr-4 font-medium">
                {label}
              </th>
              {plans.map((plan) => (
                <td key={plan.key} className="py-4 text-center font-semibold">
                  {value(plan)}
                </td>
              ))}
            </tr>
          ))}
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
