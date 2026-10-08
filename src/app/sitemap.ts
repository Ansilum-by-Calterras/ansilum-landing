import { siteConfig } from '@/config/site'
import { locales, localePath } from '@/i18n/config'
import type { MetadataRoute } from 'next'
const publicPaths = [
  '/',
  '/product',
  '/about',
  '/updates',
  '/demo',
  '/pricing',
  '/privacy',
  '/terms',
  '/security',
]
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteConfig.url
  if (!origin) return []
  return publicPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${origin}${localePath(locale, path)}`,
      changeFrequency: 'monthly' as const,
      priority: path === '/' ? 1 : 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((item) => [item, `${origin}${localePath(item, path)}`]),
        ),
      },
    })),
  )
}
