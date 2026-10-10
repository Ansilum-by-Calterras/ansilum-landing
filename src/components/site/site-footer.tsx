import { Logo } from '@/components/logo'
import { commonContent } from '@/content/common'
import { localePath, type Locale } from '@/i18n/config'
import Link from 'next/link'
import { LanguageSwitch } from './language-switch'
import type { IconType } from 'react-icons'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'

export const socialIcons = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
} as const satisfies Record<string, IconType>

export type SocialId = keyof typeof socialIcons

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = commonContent[locale]
  const { company } = copy.footer

  
  return (
    <footer className="bg-night text-white/75">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,4.3fr)] lg:gap-x-20 xl:gap-x-28">
          <div className="flex max-w-sm flex-col">
            <div>
              <Link href={localePath(locale)} aria-label={copy.homeLabel}>
                <Logo className="!text-white" />
              </Link>
              <p className="mt-5 text-[0.95rem] leading-7 text-white">{copy.footer.tagline}</p>
              <p className="mt-3 text-sm leading-6">{copy.footer.builder}</p>
            </div>

            <ul
              aria-label={copy.footer.socialsLabel}
              className="mt-auto flex flex-wrap items-center gap-3 pt-10"
            >
              {copy.footer.socials.map((social) => {
                const Icon = socialIcons[social.id]
                return (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-white/75 transition hover:border-white/40 hover:text-white"
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[0.9fr_0.9fr_0.9fr_1.43fr]">
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

            <div>
              <h2 className="text-sm font-semibold text-white">{company.title}</h2>
              <address className="mt-4 space-y-4 text-sm not-italic leading-6">
                <div>
                  <p className="font-medium text-white">{company.legalName}</p>
                  <p className="mt-1">
                    {company.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
                  
                <ul className="space-y-1">
                  {company.channels.map((channel) => (
                    <li key={channel.href}>
                      <a
                        href={channel.href}
                        className="inline-flex min-h-9 items-center gap-2 underline-offset-4 transition hover:text-white hover:underline"
                        {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        <span className="text-white/60">{channel.label}</span>
                        <span>{channel.value}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </address>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/15 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName}. {copy.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
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