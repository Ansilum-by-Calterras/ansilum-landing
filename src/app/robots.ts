import { siteConfig } from '@/config/site'
import type { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  return siteConfig.url
    ? {
        rules: {
          userAgent: '*',
          allow: '/',
          disallow: ['/api/', '/studio', '/en/login', '/id/login'],
        },
        sitemap: `${siteConfig.url}/sitemap.xml`,
      }
    : { rules: { userAgent: '*', disallow: '/' } }
}
