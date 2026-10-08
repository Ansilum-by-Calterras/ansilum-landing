import { siteConfig } from '@/config/site'
import type { Metadata } from 'next'
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const url = siteConfig.url ? `${siteConfig.url}${path}` : undefined
  return {
    title,
    description,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title: `${title} | Ansilum`,
      description,
      url,
      siteName: 'Ansilum',
      locale: 'id_ID',
      type: 'website',
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: 'Ansilum — POS untuk kafe dan restoran. Early Beta. Dikembangkan oleh Calterras.',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Ansilum`,
      description,
      images: ['/opengraph-image'],
    },
  }
}
