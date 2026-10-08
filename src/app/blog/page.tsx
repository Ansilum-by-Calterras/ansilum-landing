import {
  FinalCTA,
  PageIntro,
  Section,
  TextLink,
} from '@/components/marketing/sections'
import { articles } from '@/data/articles'
import { pageMetadata } from '@/lib/metadata'
export const metadata = pageMetadata(
  'Catatan operasional untuk pemilik F&B',
  'Panduan kasir offline, evaluasi POS kafe, serta cara membaca penjualan, stok, dan margin dari Calterras.',
  '/blog',
)
export default function Blog() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageIntro
        eyebrow="Catatan Calterras"
        title="Memahami alat kerja usaha Anda."
      >
        <p>
          Panduan praktis untuk mengevaluasi POS dan membaca data operasional.
          Mulai dari kebutuhan outlet, lalu periksa alurnya.
        </p>
      </PageIntro>
      <Section className="!pt-4">
        <div className="grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <article
              className="surface-card flex flex-col p-7"
              key={article.slug}
            >
              <p className="eyebrow">{article.category}</p>
              <h2 className="mt-5 text-2xl font-medium leading-snug">
                {article.title}
              </h2>
              <p className="mb-8 mt-4 text-sm leading-7 text-muted-foreground">
                {article.description}
              </p>
              <div className="mt-auto">
                <TextLink href={`/blog/${article.slug}`}>Baca artikel</TextLink>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <FinalCTA placement="blog" />
    </main>
  )
}
