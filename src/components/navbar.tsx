'use client'
import { navigation, siteConfig } from '@/config/site'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import {
  ArrowUpRightIcon,
  Bars2Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './logo'
import { DemoLink } from './marketing/demo-link'
export function Navbar() {
  const pathname = usePathname()
  return (
    <Disclosure
      as="header"
      className="site-header bg-background/95 sticky top-0 z-50 border-b border-[var(--marketing-line)] backdrop-blur-md"
    >
      {({ open, close }) => (
        <>
          <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
            <Link
              href="/"
              aria-label="Ansilum, beranda"
              onClick={() => close()}
            >
              <Logo />
            </Link>
            <nav
              aria-label="Navigasi utama"
              className="hidden items-center gap-7 lg:flex"
            >
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className="text-sm font-medium text-muted-foreground transition hover:text-foreground aria-[current=page]:text-foreground"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              {siteConfig.appUrl && (
                <a
                  href={siteConfig.appUrl}
                  className="hidden text-sm font-medium lg:block"
                >
                  Masuk
                </a>
              )}
              <DemoLink
                placement="header"
                className="hidden min-h-11 sm:inline-flex"
              >
                Minta Demo{' '}
                <ArrowUpRightIcon className="size-4" aria-hidden="true" />
              </DemoLink>
              <DisclosureButton
                className="flex size-11 items-center justify-center rounded-full border border-[var(--marketing-line)] lg:hidden"
                aria-label={open ? 'Tutup navigasi' : 'Buka navigasi'}
              >
                {open ? (
                  <XMarkIcon className="size-5" />
                ) : (
                  <Bars2Icon className="size-5" />
                )}
              </DisclosureButton>
            </div>
          </div>
          <DisclosurePanel className="border-t border-[var(--marketing-line)] bg-background px-6 py-6 lg:hidden">
            <nav
              aria-label="Navigasi seluler"
              className="mx-auto flex max-w-2xl flex-col gap-2"
            >
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => close()}
                  className="rounded-lg px-3 py-3 font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <DemoLink
                placement="mobile-menu"
                onClick={() => close()}
                className="mt-3"
              >
                Minta Demo
              </DemoLink>
              {siteConfig.appUrl && (
                <a href={siteConfig.appUrl} className="px-3 py-3">
                  Masuk ke aplikasi
                </a>
              )}
            </nav>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}
