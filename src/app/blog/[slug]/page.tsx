import {
  FinalCTA,
  PageIntro,
  Section,
  TextLink,
} from '@/components/marketing/sections'
import { articleAuthor, articleDate, articles } from '@/data/articles'
import { pageMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }))
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = articles.find((item) => item.slug === params.slug)
  return article
    ? pageMetadata(article.title, article.description, `/blog/${article.slug}`)
    : { title: 'Artikel tidak ditemukan', robots: { index: false } }
}
export default function Article({ params }: { params: { slug: string } }) {
  const article = articles.find((item) => item.slug === params.slug)
  if (!article) notFound()
  return (
    <main id="main-content" tabIndex={-1}>
      <article>
        <PageIntro eyebrow={article.category} title={article.title}>
          <p>{article.description}</p>
          <p className="mt-5 text-sm">
            {articleAuthor} · <time dateTime={articleDate}>8 Oktober 2026</time>
          </p>
        </PageIntro>
        <Section className="!pt-2">
          <div className="editorial max-w-3xl">
            {article.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
            <div className="mt-10">
              <TextLink href="/blog">Semua catatan</TextLink>
            </div>
          </div>
        </Section>
      </article>
      <FinalCTA placement="article" />
    </main>
  )
}
