import { siteConfig } from '@/config/site'
import { locales, localePath, ogLocale, type Locale } from '@/i18n/config'
import type { Metadata } from 'next'
/** Locale-aware page metadata with reciprocal language alternates. `path` is locale-neutral. */
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale
  path: string
  title: string
  description: string
}): Metadata {
  const absolute = (target: Locale) =>
    siteConfig.url ? `${siteConfig.url}${localePath(target, path)}` : undefined
  const url = absolute(locale)
  return {
    title,
    description,
    alternates: url
      ? {
          canonical: url,
          languages: {
            ...Object.fromEntries(locales.map((item) => [item, absolute(item)])),
            'x-default': absolute('id'),
          },
        }
      : undefined,
    openGraph: {
      title: `${title} | Ansilum`,
      description,
      url,
      siteName: 'Ansilum',
      locale: ogLocale[locale],
      alternateLocale: locales
        .filter((item) => item !== locale)
        .map((item) => ogLocale[item]),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Ansilum`,
      description,
    },
  }
}
