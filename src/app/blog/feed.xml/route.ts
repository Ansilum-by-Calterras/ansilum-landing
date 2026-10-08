import { siteConfig } from '@/config/site'
import { articleAuthor, articleDate, articles } from '@/data/articles'
import { Feed } from 'feed'
export const dynamic = 'force-dynamic'
export function GET(request: Request) {
  const origin = siteConfig.url || new URL(request.url).origin
  const feed = new Feed({
    title: 'Catatan Calterras — Ansilum',
    description: 'Panduan operasional untuk pemilik usaha F&B Indonesia.',
    id: `${origin}/blog`,
    link: `${origin}/blog`,
    language: 'id',
    author: { name: articleAuthor },
    copyright: `© ${new Date().getFullYear()} Calterras`,
    feedLinks: { rss2: `${origin}/blog/feed.xml` },
  })
  articles.forEach((article) =>
    feed.addItem({
      title: article.title,
      id: `${origin}/blog/${article.slug}`,
      link: `${origin}/blog/${article.slug}`,
      description: article.description,
      date: new Date(`${articleDate}T00:00:00+07:00`),
      author: [{ name: articleAuthor }],
    }),
  )
  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      ...(!siteConfig.url ? { 'X-Robots-Tag': 'noindex' } : {}),
    },
  })
}
