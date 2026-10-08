import { Container, LocalLink } from '@/components/site/page-parts'
import { siteConfig } from '@/config/site'
import { isLocale, type Locale } from '@/i18n/config'
import { notFound, redirect } from 'next/navigation'

const content = {
  en: {
    title: 'Sign in through your onboarding link.',
    body: 'Use the app address Calterras gave you during setup. This website never asks for your account password.',
    link: 'Ask about access',
  },
  id: {
    title: 'Masuk melalui alamat dari proses penyiapan.',
    body: 'Gunakan alamat aplikasi yang diberikan Calterras saat penyiapan. Website ini tidak pernah meminta kata sandi akun Anda.',
    link: 'Tanyakan tentang akses',
  },
}

export const metadata = { title: 'Sign in', robots: { index: false, follow: false } }

export default function Login({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound()
  if (siteConfig.appUrl) redirect(siteConfig.appUrl)
  const locale: Locale = params.locale
  const copy = content[locale]
  return (
    <main id="main-content" tabIndex={-1}>
      <Container className="py-24 sm:py-32">
        <h1 className="display-lg max-w-3xl">{copy.title}</h1>
        <p className="lead mt-6 max-w-2xl">{copy.body}</p>
        <div className="mt-8">
          <LocalLink locale={locale} href="/demo">
            {copy.link}
          </LocalLink>
        </div>
      </Container>
    </main>
  )
}
