import { commonContent } from '@/content/common'
import { localePath, type Locale } from '@/i18n/config'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import Link from 'next/link'
import { DemoLink } from './demo-link'
import { CtaCurve, HeaderArt } from './line-art'

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={clsx('mx-auto w-full max-w-7xl px-5 lg:px-8', className)}>{children}</div>
}

/** Page opening: the heading starts the page, with line art on the right on wide screens. */
export function PageHeader({
  title,
  children,
  aside,
}: {
  title: string
  children?: React.ReactNode
  aside?: React.ReactNode
}) {
  return (
    <header className="relative overflow-hidden border-b border-line">
      <Container className="grid gap-10 pb-14 pt-14 sm:pt-20 lg:grid-cols-[1.5fr_1fr] lg:items-center lg:pb-20">
        <div>
          <h1 className="display-lg max-w-4xl text-balance">
            <RiseWords text={title} />
          </h1>
          {children && (
            <div className="lead mt-6 max-w-2xl" data-reveal style={{ '--delay': '250ms' } as React.CSSProperties}>
              {children}
            </div>
          )}
        </div>
        {aside ?? (
          <div className="hidden max-w-sm justify-self-end lg:block" data-reveal style={{ '--delay': '350ms' } as React.CSSProperties}>
            <HeaderArt />
          </div>
        )}
      </Container>
    </header>
  )
}

/** Splits a heading into words that rise and sharpen in one after another on load. */
export function RiseWords({ text }: { text: string }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, index) => (
        <span key={index}>
          <span className="word-rise" style={{ '--i': index } as React.CSSProperties}>
            {word}
          </span>
          {index < words.length - 1 && ' '}
        </span>
      ))}
    </>
  )
}

export function LocalLink({
  locale,
  href,
  children,
  className = 'text-link',
}: {
  locale: Locale
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link href={localePath(locale, href)} className={className}>
      {children}
      {className.includes('text-link') && <ArrowRightIcon className="size-4 shrink-0" aria-hidden="true" />}
    </Link>
  )
}

export function FinalCta({ locale, placement }: { locale: Locale; placement: string }) {
  const copy = commonContent[locale]
  return (
    <section>
      <Container className="pb-20 sm:pb-28">
        <div
          data-reveal
          className="relative grid gap-10 overflow-hidden rounded-3xl bg-[linear-gradient(100deg,#FF5B1F_0%,#FF7A2E_45%,#FFC53D_100%)] px-7 py-14 text-ink sm:px-12 sm:py-16 lg:grid-cols-[1.5fr_1fr] lg:items-end"
        >
          <CtaCurve className="pointer-events-none absolute -right-16 top-1/2 hidden h-[150%] -translate-y-1/2 opacity-70 md:block" />
          <div className="relative">
            <h2 className="display-lg max-w-3xl text-balance">{copy.finalCta.heading}</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/85">{copy.finalCta.body}</p>
          </div>
          <div className="relative lg:justify-self-end">
            <DemoLink locale={locale} placement={placement} className="!min-h-14 !px-7 !text-base">
              {copy.requestDemo}
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </DemoLink>
            <p className="mt-3 text-sm font-medium text-ink/80">{copy.finalCta.note}</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
