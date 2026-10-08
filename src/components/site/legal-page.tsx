import { siteConfig } from '@/config/site'
import { localePath, type Locale } from '@/i18n/config'
import Link from 'next/link'
import { Container, PageHeader } from './page-parts'

export type LegalSection = { heading: string; paragraphs: string[] }

const contact = {
  en: {
    updated: 'Updated 9 October 2026',
    heading: 'Contact Calterras',
    email: 'Send questions or requests about your information to',
    form: 'Send questions through the',
    formLink: 'demo and contact form',
    formAfter: 'Describe your request in the notes; it does not start a subscription.',
  },
  id: {
    updated: 'Diperbarui 9 Oktober 2026',
    heading: 'Hubungi Calterras',
    email: 'Kirim pertanyaan atau permintaan terkait informasi Anda ke',
    form: 'Sampaikan pertanyaan melalui',
    formLink: 'formulir demo dan kontak',
    formAfter: 'Jelaskan permintaan Anda di kolom catatan; permintaan tersebut tidak memulai langganan.',
  },
}

export function LegalPage({
  locale,
  title,
  intro,
  sections,
}: {
  locale: Locale
  title: string
  intro: string
  sections: LegalSection[]
}) {
  const text = contact[locale]
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHeader title={title}>
        <p>{intro}</p>
      </PageHeader>
      <Container className="py-14 sm:py-20">
        <div className="prose-site">
          <p className="!mt-0 text-sm font-semibold">{text.updated}</p>
          {sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          <h2>{text.heading}</h2>
          {siteConfig.email ? (
            <p>
              {text.email} <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>
          ) : (
            <p>
              {text.form} <Link href={localePath(locale, '/demo')}>{text.formLink}</Link>. {text.formAfter}
            </p>
          )}
        </div>
      </Container>
    </main>
  )
}
