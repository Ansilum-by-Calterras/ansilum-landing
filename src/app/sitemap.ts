import { siteConfig } from '@/config/site'
import { articles } from '@/data/articles'
import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.url) return []
  return [
    '/',
    '/about',
    '/products/ansilum',
    '/intelligence',
    '/demo',
    '/pricing',
    '/blog',
    '/privacy',
    '/terms',
    '/security',
    ...articles.map((article) => `/blog/${article.slug}`),
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.6,
  }))
}
