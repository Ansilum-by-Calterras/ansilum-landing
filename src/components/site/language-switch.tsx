'use client'
import {
  localeCookie,
  localeNames,
  locales,
  switchLocalePath,
  type Locale,
} from '@/i18n/config'
import { clsx } from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { trackEvent } from './analytics'

/** EN / ID switch that keeps the visitor on the equivalent page and remembers the choice. */
export function LanguageSwitch({
  locale,
  label,
  className,
}: {
  locale: Locale
  label: string
  className?: string
}) {
  const pathname = usePathname() || `/${locale}`
  function remember(target: Locale) {
    document.cookie = `${localeCookie}=${target}; path=/; max-age=31536000; samesite=lax`
    trackEvent('language_switch', { to: target })
  }
  return (
    <nav aria-label={label} className={clsx('flex items-center text-sm font-semibold', className)}>
      {[...locales].reverse().map((target, index) => (
        <span key={target} className="flex items-center">
          {index > 0 && <span className="px-1.5 text-ink/30" aria-hidden="true">/</span>}
          <Link
            href={switchLocalePath(pathname, target)}
            hrefLang={target}
            lang={target}
            aria-current={target === locale ? 'true' : undefined}
            onClick={() => remember(target)}
            className="flex min-h-11 min-w-8 items-center justify-center rounded-md px-1 text-soft underline-offset-[6px] transition hover:text-ink aria-[current=true]:text-ink aria-[current=true]:underline aria-[current=true]:decoration-brand aria-[current=true]:decoration-2"
          >
            <span aria-hidden="true">{localeNames[target].short}</span>
            <span className="sr-only">{localeNames[target].long}</span>
          </Link>
        </span>
      ))}
    </nav>
  )
}
