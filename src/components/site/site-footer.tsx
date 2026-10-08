import { Logo } from '@/components/logo'
import { siteConfig } from '@/config/site'
import { commonContent } from '@/content/common'
import { localePath, type Locale } from '@/i18n/config'
import Link from 'next/link'
import { LanguageSwitch } from './language-switch'

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = commonContent[locale]
  return (
    <footer className="bg-night text-white/75">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href={localePath(locale)} aria-label={copy.homeLabel}>
              <Logo className="!text-white" />
            </Link>
            <p className="mt-5 text-[0.95rem] leading-7 text-white">{copy.footer.tagline}</p>
            <p className="mt-3 text-sm leading-6">{copy.footer.builder}</p>
          </div>
          {copy.footer.groups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold text-white">{group.title}</h2>
              <ul className="mt-4 space-y-1">
                {group.links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={localePath(locale, href)}
                      className="inline-flex min-h-9 items-center text-sm underline-offset-4 transition hover:text-white hover:underline"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-5 border-t border-white/15 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {copy.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {siteConfig.email && (
              <a href={`mailto:${siteConfig.email}`} className="underline-offset-4 hover:text-white hover:underline">
                {copy.footer.contact}: {siteConfig.email}
              </a>
            )}
            <span>{copy.footer.madeIn}</span>
            <LanguageSwitch
              locale={locale}
              label={copy.languageLabel}
              className="[&_a]:text-white/60 [&_a[aria-current=true]]:!text-white hover:[&_a]:text-white"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
