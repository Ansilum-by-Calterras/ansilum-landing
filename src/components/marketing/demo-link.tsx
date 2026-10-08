'use client'
import { clsx } from 'clsx'
import Link from 'next/link'
import { trackEvent } from './analytics'
export function DemoLink({
  placement,
  className,
  children = 'Minta Demo',
  onClick,
}: {
  placement: string
  className?: string
  children?: React.ReactNode
  onClick?: () => void
}) {
  return (
    <Link
      href="/demo"
      className={clsx('action-primary', className)}
      onClick={() => {
        trackEvent('demo_cta_click', { placement })
        onClick?.()
      }}
    >
      {children}
    </Link>
  )
}
