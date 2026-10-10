'use client'
import {
  consultationContent,
  daily,
  dayKeys,
  dayLabel,
  products,
  totals,
  type QuestionKey,
  type Segment,
} from '@/content/consultation'
import type { Locale } from '@/i18n/config'
import { formatNumber, rupiah, shortRupiah, signedRupiah } from '@/lib/format'
import { ArrowUpIcon, CheckIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import { useState } from 'react'
import { trackEvent } from './analytics'
import icon from '@/app/icon_bg.png'
import Image from 'next/image'

const questionOrder: QuestionKey[] = ['weekly', 'products', 'daily']
type View = 'chart' | 'table'

/** Scripted conversation over the sample dataset. No model is called. */
export function ConsultationPreview({ locale }: { locale: Locale }) {
  const copy = consultationContent[locale]
  const [question, setQuestion] = useState<QuestionKey>('weekly')
  const [active, setActive] = useState<string | null>(null)
  const [view, setView] = useState<View>('chart')
  const current = copy.questions[question]
  const activeKeys = active ? active.split(' ') : []
  const wordCount = countWords(current.answer)
  // Each segment's first word index, worked out up front so rendering stays pure.
  const starts = current.answer.flat().reduce<number[]>(
    (list, segment, index, all) => [...list, index ? list[index - 1] + words(all[index - 1]).length : 0],
    [],
  )
  let segmentIndex = 0

  function ask(next: QuestionKey) {
    setQuestion(next)
    setActive(null)
    trackEvent('preview_question', { question: next })
  }
  function show(next: View) {
    setView(next)
    trackEvent('preview_action', { action: next })
  }

  return (
    // `data-typing` replays the typing animation each time a question is asked (see marketing.css).
    <figure data-reveal="none" data-typing>
      <div className="ui-window overflow-hidden text-ink">
        <div className="flex items-center gap-3 border-b border-line px-5 py-3.5 sm:px-6">
          <Image
            src={icon}
            alt=""
            width={32}
            height={32}
            className="size-8 shrink-0 rounded-lg"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{copy.business}</p>
            <p className="text-xs text-soft">{copy.period}</p>
          </div>
        </div>

        {/* Fixed minimum heights keep the window from jumping as answers change length. */}
        <div className="grid lg:min-h-[49rem] lg:grid-cols-[1fr_1.05fr] xl:min-h-[41rem]">
          <div className="flex flex-col px-5 py-6 sm:px-6">
            <div key={question} className="motion-fade flex-1 space-y-5">
              <p className="bubble ml-auto w-fit max-w-[88%] origin-bottom-right rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-[0.95rem] font-medium leading-6 text-white">
                <span className="sr-only">{copy.you}: </span>
                {current.label}
              </p>
              <div className="flex gap-3">
                <span
                  className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand-ink"
                  aria-hidden="true"
                >
                  a
                </span>
                <div
                  className="relative min-w-0 space-y-3 text-[0.95rem] leading-7"
                  aria-live="polite"
                  style={{ '--words': wordCount } as React.CSSProperties}
                >
                  <span className="thinking absolute left-0 top-2.5 flex gap-1" aria-hidden="true">
                    {[0, 1, 2].map((dot) => (
                      <span
                        key={dot}
                        className="size-1.5 rounded-full bg-brand [animation:dot-bounce_900ms_ease-in-out_infinite]"
                        style={{ animationDelay: `${dot * 150}ms` }}
                      />
                    ))}
                  </span>
                  <p className="sr-only">{copy.assistant}:</p>
                  {current.answer.map((paragraph, index) => (
                    <p key={index}>
                      {paragraph.map((segment, part) => (
                        <AnswerSegment
                          key={part}
                          segment={segment}
                          active={active}
                          onActivate={setActive}
                          start={starts[segmentIndex++]}
                        />
                      ))}
                    </p>
                  ))}
                  <div className="after-typing pt-1">
                    <p className="text-sm font-semibold">{copy.nextLabel}</p>
                    <Checklist items={current.next} />
                  </div>
                </div>
              </div>
            </div>

            {/* On small screens the questions sit above the answer, so they stay put when it changes. */}
            <div className="order-first mb-7 lg:order-none lg:mb-0 lg:mt-7">
              <p className="text-xs font-semibold text-soft" id="preview-questions">
                {copy.suggestionsLabel}
              </p>
              <div role="group" aria-labelledby="preview-questions" className="mt-2 flex flex-wrap gap-2">
                {questionOrder.map((key) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={question === key}
                    onClick={() => ask(key)}
                    className="ui-chip"
                  >
                    {copy.questions[key].label}
                  </button>
                ))}
              </div>
              <div
                className="mt-3 hidden min-h-12 items-center justify-between gap-3 rounded-xl border border-line px-4 text-sm text-soft lg:flex"
                aria-hidden="true"
              >
                {copy.composerPlaceholder}
                <span className="flex size-8 items-center justify-center rounded-lg bg-ink text-white">
                  <ArrowUpIcon className="size-4" />
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-line bg-mist/60 px-5 py-6 sm:px-6 lg:border-l lg:border-t-0">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{current.chartTitle}</p>
                <p className="mt-0.5 text-xs text-soft">{copy.compared}</p>
              </div>
              <div
                role="group"
                aria-label={copy.viewLabel}
                className="flex rounded-lg border border-line bg-white p-0.5 text-xs font-semibold"
              >
                {(['chart', 'table'] as View[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={view === option}
                    onClick={() => show(option)}
                    className="min-h-8 rounded-md px-3 text-soft transition-colors aria-pressed:bg-ink aria-pressed:text-white"
                  >
                    {copy[option]}
                  </button>
                ))}
              </div>
            </div>
            <div key={`${question}-${view}`} className="motion-fade mt-6">
              {view === 'table' ? (
                <NumbersTable locale={locale} question={question} />
              ) : question === 'weekly' ? (
                <WeeklyChart locale={locale} activeKeys={activeKeys} />
              ) : question === 'products' ? (
                <ProductChart locale={locale} activeKeys={activeKeys} />
              ) : (
                <DailyChart locale={locale} activeKeys={activeKeys} />
              )}
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}

function countWords(answer: Segment[][]) {
  return answer.flat().reduce((total, segment) => total + words(segment).length, 0)
}
function words(segment: Segment) {
  const text = typeof segment === 'string' ? segment : segment.text
  return text.match(/\S+\s*|\s+/g) ?? []
}

/** Words as separate spans so they can type in one after another. Trailing spaces stay inside. */
function TypedWords({ segment, start, className }: { segment: Segment; start: number; className?: string }) {
  return (
    <>
      {words(segment).map((word, index) => (
        <span key={index} className={clsx('tw', className)} style={{ '--i': start + index } as React.CSSProperties}>
          {word}
        </span>
      ))}
    </>
  )
}

/** A highlighted phrase in the answer; hovering or selecting it points at the matching chart data. */
function AnswerSegment({
  segment,
  active,
  onActivate,
  start,
}: {
  segment: Segment
  active: string | null
  onActivate: (series: string | null) => void
  start: number
}) {
  if (typeof segment === 'string') return <TypedWords segment={segment} start={start} />
  const on = active === segment.series
  const end = start + words(segment).length
  return (
    <button
      type="button"
      aria-pressed={on}
      onMouseEnter={() => onActivate(segment.series)}
      onMouseLeave={() => onActivate(null)}
      onFocus={() => onActivate(segment.series)}
      onBlur={() => onActivate(null)}
      onClick={() => onActivate(on ? null : segment.series)}
      style={{ '--end': end } as React.CSSProperties}
      className={clsx(
        'seg-line inline rounded px-0.5 text-left transition-colors',
        on ? 'bg-brand-soft [--seg-line:#FF5B1F]' : 'hover:bg-brand-soft/70',
      )}
    >
      <TypedWords segment={segment} start={start} />
    </button>
  )
}

function Checklist({ items }: { items: string[] }) {
  const [done, setDone] = useState<number[]>([])
  return (
    <ul className="mt-2 space-y-1.5">
      {items.map((item, index) => {
        const checked = done.includes(index)
        return (
          <li key={item} className="after-typing" style={{ '--i': index + 1 } as React.CSSProperties}>
            <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-6">
              <input
                type="checkbox"
                checked={checked}
                onChange={() =>
                  setDone((value) => (checked ? value.filter((entry) => entry !== index) : [...value, index]))
                }
                className="peer sr-only"
              />
              <span
                className={clsx(
                  'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-2',
                  checked ? 'border-leaf bg-leaf text-white' : 'border-ink/25 bg-white',
                )}
                aria-hidden="true"
              >
                {checked && <CheckIcon className="size-3.5" strokeWidth={3} />}
              </span>
              <span className={clsx(checked && 'text-soft line-through decoration-leaf')}>{item}</span>
            </label>
          </li>
        )
      })}
    </ul>
  )
}

/** True when another series is highlighted, so this one should step back. */
function dims(keys: string[], own: string[]) {
  if (!keys.length || keys.includes('total')) return false
  return !own.some((key) => keys.includes(key))
}

function WeeklyChart({ locale, activeKeys }: { locale: Locale; activeKeys: string[] }) {
  const copy = consultationContent[locale]
  const max = totals.previous.sales
  const totalOn = activeKeys.includes('total')
  const ordersOn = activeKeys.includes('orders')
  return (
    <div>
      <div className="space-y-5">
        {[
          { label: copy.lastWeek, week: totals.previous },
          { label: copy.thisWeek, week: totals.current },
        ].map(({ label, week }, index) => (
          <div key={label}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="font-medium">{label}</span>
              <span className={clsx('font-semibold tabular-nums', totalOn && 'text-brand-ink')}>
                {rupiah(week.sales, locale)}
              </span>
            </div>
            <div
              className={clsx('bar-x mt-2 flex h-9 overflow-hidden rounded-md', totalOn && 'ring-2 ring-brand ring-offset-2')}
              style={{ width: `${(week.sales / max) * 100}%`, '--i': index } as React.CSSProperties}
              aria-hidden="true"
            >
              <span
                className={clsx(
                  'flex items-center bg-brand px-2 text-xs font-semibold text-white transition-opacity',
                  dims(activeKeys, ['coffee']) && 'opacity-25',
                )}
                style={{ width: `${(week.coffee / week.sales) * 100}%` }}
              >
                {shortRupiah(week.coffee, locale)}
              </span>
              <span
                className={clsx(
                  'flex items-center bg-steel px-2 text-xs font-semibold text-white transition-opacity',
                  dims(activeKeys, ['other']) && 'opacity-25',
                )}
                style={{ width: `${(week.other / week.sales) * 100}%` }}
              >
                {shortRupiah(week.other, locale)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Legend items={[[copy.coffee, 'bg-brand'], [copy.other, 'bg-steel']]} />
      <dl
        className={clsx(
          'mt-6 grid grid-cols-2 gap-3 border-t pt-4 text-xs transition-colors',
          ordersOn ? 'border-brand' : 'border-line',
        )}
      >
        <div>
          <dt className="text-soft">{copy.orders}</dt>
          <dd className={clsx('mt-1 text-base font-semibold tabular-nums', ordersOn && 'text-brand-ink')}>
            {formatNumber(totals.previous.orders, locale)} → {formatNumber(totals.current.orders, locale)}
          </dd>
        </div>
        <div>
          <dt className="text-soft">{copy.average}</dt>
          <dd className={clsx('mt-1 text-base font-semibold tabular-nums', ordersOn && 'text-brand-ink')}>
            {rupiah(totals.current.average, locale)}
          </dd>
        </div>
      </dl>
    </div>
  )
}

function ProductChart({ locale, activeKeys }: { locale: Locale; activeKeys: string[] }) {
  const copy = consultationContent[locale]
  const rows = products
    .map((product) => ({ ...product, change: product.current - product.previous }))
    .sort((a, b) => a.change - b.change)
  const max = Math.max(...rows.map((row) => Math.abs(row.change)))
  return (
    <div>
      <ul className="space-y-3">
        {rows.map((row, index) => (
          <li
            key={row.key}
            className={clsx(
              'grid grid-cols-[6.5rem_1fr_auto] items-center gap-3 text-xs transition-opacity sm:grid-cols-[7.5rem_1fr_auto]',
              dims(activeKeys, [row.key]) && 'opacity-30',
            )}
          >
            <span className="truncate font-medium">{row.name}</span>
            <span className="h-2.5 rounded-full bg-ink/5" aria-hidden="true">
              <span
                className={clsx('bar-x block h-2.5 rounded-full', row.category === 'coffee' ? 'bg-brand' : 'bg-steel')}
                style={{ width: `${(Math.abs(row.change) / max) * 100}%`, '--i': index } as React.CSSProperties}
              />
            </span>
            <span className="text-right font-semibold tabular-nums">
              {row.change ? signedRupiah(row.change, locale) : copy.unchanged}
            </span>
          </li>
        ))}
      </ul>
      <Legend items={[[copy.coffee, 'bg-brand'], [copy.other, 'bg-steel']]} />
    </div>
  )
}

function DailyChart({ locale, activeKeys }: { locale: Locale; activeKeys: string[] }) {
  const copy = consultationContent[locale]
  const max = Math.max(...daily.map((day) => day.previous.sales))
  return (
    <div>
      <ol className="grid h-48 grid-cols-7 items-end gap-1.5 sm:gap-3">
        {daily.map((day, index) => {
          const key = dayKeys[index]
          const change = day.current.sales - day.previous.sales
          const slow = change <= -400_000
          return (
            <li
              key={key}
              className={clsx('flex h-full flex-col justify-end transition-opacity', dims(activeKeys, [key]) && 'opacity-30')}
            >
              <span className="sr-only">
                {dayLabel(day.current.date, index, locale, true)}: {copy.lastWeek} {rupiah(day.previous.sales, locale)},{' '}
                {copy.thisWeek} {rupiah(day.current.sales, locale)}
              </span>
              <span className="flex h-full items-end justify-center gap-0.5" aria-hidden="true">
                <span
                  className="bar-y w-1/2 max-w-4 rounded-t bg-steel/40"
                  style={{ height: `${(day.previous.sales / max) * 100}%`, '--i': index } as React.CSSProperties}
                />
                <span
                  className={clsx('bar-y w-1/2 max-w-4 rounded-t', slow ? 'bg-brand' : 'bg-steel')}
                  style={{ height: `${(day.current.sales / max) * 100}%`, '--i': index } as React.CSSProperties}
                />
              </span>
              <span className="mt-2 text-center text-[0.7rem] font-semibold" aria-hidden="true">
                {copy.dayShort[index]}
              </span>
              <span
                className={clsx(
                  'text-center text-[0.65rem] tabular-nums',
                  slow ? 'font-semibold text-brand-ink' : 'text-soft',
                )}
                aria-hidden="true"
              >
                {shortRupiah(change, locale)}
              </span>
            </li>
          )
        })}
      </ol>
      <Legend items={[[copy.lastWeek, 'bg-steel/40'], [copy.thisWeek, 'bg-steel']]} />
    </div>
  )
}

function Legend({ items }: { items: [string, string][] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-4 text-xs text-soft">
      {items.map(([label, color]) => (
        <li key={label} className="flex items-center gap-2">
          <span className={clsx('size-3 rounded-sm', color)} aria-hidden="true" />
          {label}
        </li>
      ))}
    </ul>
  )
}

/** The same records as a plain table: last week, this week, and the difference. */
function NumbersTable({ locale, question }: { locale: Locale; question: QuestionKey }) {
  const copy = consultationContent[locale]
  const rows =
    question === 'weekly'
      ? [
          { label: copy.coffee, previous: totals.previous.coffee, current: totals.current.coffee },
          { label: copy.other, previous: totals.previous.other, current: totals.current.other },
          { label: copy.total, previous: totals.previous.sales, current: totals.current.sales, strong: true },
        ]
      : question === 'products'
        ? products.map((product) => ({ label: product.name, previous: product.previous, current: product.current }))
        : daily.map((day, index) => ({
            label: copy.dayLong[index],
            previous: day.previous.sales,
            current: day.current.sales,
          }))
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[20rem] text-left text-xs">
        <thead className="text-soft">
          <tr className="border-b border-line">
            <th scope="col" className="py-2 pr-3 font-medium">
              {question === 'daily' ? '' : copy.item}
            </th>
            <th scope="col" className="py-2 pr-3 text-right font-medium">
              {copy.lastWeek}
            </th>
            <th scope="col" className="py-2 pr-3 text-right font-medium">
              {copy.thisWeek}
            </th>
            <th scope="col" className="py-2 text-right font-medium">
              {copy.change}
            </th>
          </tr>
        </thead>
        <tbody className="tabular-nums">
          {rows.map((row) => {
            const change = row.current - row.previous
            return (
              <tr
                key={row.label}
                className={clsx('border-b border-line last:border-0', 'strong' in row && row.strong && 'font-semibold')}
              >
                <th scope="row" className="py-2.5 pr-3 font-medium">
                  {row.label}
                </th>
                <td className="py-2.5 pr-3 text-right">{rupiah(row.previous, locale)}</td>
                <td className="py-2.5 pr-3 text-right">{rupiah(row.current, locale)}</td>
                <td className={clsx('py-2.5 text-right font-semibold', change < 0 && 'text-brand-ink')}>
                  {change ? signedRupiah(change, locale) : copy.unchanged}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
