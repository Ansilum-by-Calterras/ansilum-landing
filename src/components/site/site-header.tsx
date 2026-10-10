'use client'
import { Logo } from '@/components/logo'
import { siteConfig } from '@/config/site'
import { commonContent } from '@/content/common'
import { localePath, type Locale } from '@/i18n/config'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import {
  ArrowRightIcon,
  Bars2Icon,
  XMarkIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DemoLink } from './demo-link'
import { LanguageSwitch } from './language-switch'
import { useDashboardSession } from '../dashboard-user'

export function SiteHeader({ locale }: { locale: Locale }) {
  const {
    user,
    isAuthenticated,
    isLoading: isCheckingAuth,
  } = useDashboardSession()
  
  const copy = commonContent[locale]
  const pathname = usePathname()

  function getInitials(name?: string | null, email?: string | null) {
    if (name?.trim()) {
      return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('')
    }
  
    return email?.[0]?.toUpperCase() ?? 'U'
  }

  return (
    <Disclosure
      as="header"
      className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur"
    >
      {({ open, close }) => (
        <>
          <div className="mx-auto flex min-h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
            <Link href={localePath(locale)} aria-label={copy.homeLabel} onClick={() => close()}>
              <Logo />
            </Link>
            <nav aria-label={copy.navLabel} className="hidden items-center gap-1 lg:flex">
              {copy.nav.map((item) => {
                const href = localePath(locale, item.href)
                return (
                  <Link
                    key={item.href}
                    href={href}
                    aria-current={pathname === href ? 'page' : undefined}
                    className="rounded-lg px-3.5 py-2 text-[0.92rem] font-medium text-soft transition-colors hover:text-ink aria-[current=page]:font-semibold aria-[current=page]:text-ink"
                  >
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            <div className="flex items-center gap-2 sm:gap-4">
              <LanguageSwitch locale={locale} label={copy.languageLabel} className="hidden sm:flex" />
              {!isCheckingAuth && (
                <>
                  {isAuthenticated ? (
                    <a
                      href="https://dashboard.ansilum.com"
                      aria-label="Open Ansilum dashboard"
                      className="hidden size-11 items-center justify-center overflow-hidden rounded-full border border-line transition-opacity hover:opacity-80 lg:flex"
                    >
                      {user?.image ? (
                        <img
                          src={user.image}
                          alt={user.name ?? 'Profile'}
                          className="size-full object-cover"
                        />
                      ) : (
                        <span className="flex size-full items-center justify-center bg-brand-ink text-xs font-bold text-white">
                          {getInitials(user?.name, user?.email)}
                        </span>
                      )}
                    </a>
                  ) : (
                    <a
                      href="https://dashboard.ansilum.com/sign-in"
                      className="btn-secondary hidden lg:inline-flex"
                    >
                      {copy.signIn}
                    </a>
                  )}
                </>
              )}
              <DemoLink locale={locale} placement="header" className="hidden !min-h-11 !px-5 sm:inline-flex">
                {copy.requestDemo}
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </DemoLink>
              <DisclosureButton
                className="flex size-11 items-center justify-center rounded-lg border border-line lg:hidden"
                aria-label={open ? copy.closeMenu : copy.openMenu}
              >
                {open ? <XMarkIcon className="size-5" /> : <Bars2Icon className="size-5" />}
              </DisclosureButton>
            </div>
          </div>
          <DisclosurePanel className="border-t border-line bg-white px-5 pb-6 pt-3 lg:hidden">
            <nav aria-label={copy.mobileNavLabel} className="mx-auto flex max-w-2xl flex-col">
              {copy.nav.map((item) => (
                <Link
                  key={item.href}
                  href={localePath(locale, item.href)}
                  onClick={() => close()}
                  className="border-b border-line py-3.5 text-xl font-semibold"
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <LanguageSwitch locale={locale} label={copy.languageLabel} />
                <DemoLink locale={locale} placement="mobile-menu" onClick={() => close()}>
                  {copy.requestDemo}
                </DemoLink>
              </div>
              {siteConfig.appUrl && (
                <a href={siteConfig.appUrl} className="mt-4 py-2 text-sm font-semibold">
                  {copy.signIn}
                </a>
              )}
            </nav>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}
