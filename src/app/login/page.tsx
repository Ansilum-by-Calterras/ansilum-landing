import { PageIntro, Section, TextLink } from '@/components/marketing/sections'
import { siteConfig } from '@/config/site'
import { redirect } from 'next/navigation'
export const metadata = {
  title: 'Akses Aplikasi',
  robots: { index: false, follow: false },
}
export default function Login() {
  if (siteConfig.appUrl) redirect(siteConfig.appUrl)
  return (
    <main id="main-content" tabIndex={-1}>
      <PageIntro
        eyebrow="Akses Ansilum"
        title="Akses sesuai proses onboarding."
      >
        <p>
          Gunakan alamat aplikasi yang diberikan Calterras saat onboarding.
          Website ini tidak meminta kata sandi akun Anda.
        </p>
      </PageIntro>
      <Section className="!pt-0">
        <TextLink href="/demo">Bahas akses dan kebutuhan Anda</TextLink>
      </Section>
    </main>
  )
}
