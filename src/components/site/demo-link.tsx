'use client'
import { localePath, type Locale } from '@/i18n/config'
import { clsx } from 'clsx'
import Link from 'next/link'
import { trackEvent } from './analytics'
export function DemoLink({
  locale,
  placement,
  className,
  children,
  onClick,
}: {
  locale: Locale
  placement: string
  className?: string
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <Link
      href={localePath(locale, '/demo')}
      className={clsx('btn-primary', className)}
      onClick={() => {
        trackEvent('demo_cta_click', { placement })
        onClick?.()
      }}
    >
      {children}
    </Link>
  )
}
