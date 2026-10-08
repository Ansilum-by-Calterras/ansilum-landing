import { SiteAnalytics } from '@/components/site/analytics'
import { MotionObserver } from '@/components/site/motion-observer'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { siteConfig } from '@/config/site'
import { commonContent } from '@/content/common'
import { htmlLang, isLocale, locales } from '@/i18n/config'
import '@/styles/marketing.css'
import '@/styles/tailwind.css'
import '@/styles/theme.css'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'

// Plus Jakarta Sans was designed in Jakarta. One family carries both headings and body text.
const sans = Plus_Jakarta_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-sans' })

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const en = params.locale === 'en'
  return {
    metadataBase: new URL(siteConfig.url || 'http://localhost:3000'),
    title: {
      default: en
        ? 'Ansilum — Cashier app with an AI assistant for Indonesian small businesses'
        : 'Ansilum — Aplikasi kasir dengan asisten AI untuk UMKM Indonesia',
      template: '%s | Ansilum',
    },
    description: en
      ? 'Ansilum is an AI-native POS for Indonesian UMKM: record sales, ask questions about your business, and choose your next step.'
      : 'Ansilum adalah aplikasi kasir dengan asisten AI untuk UMKM Indonesia: catat penjualan, ajukan pertanyaan tentang usaha, dan tentukan langkah berikutnya.',
    robots: siteConfig.url ? { index: true, follow: true } : { index: false, follow: false },
    applicationName: 'Ansilum',
  }
}

export const viewport: Viewport = { themeColor: '#ffffff' }

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale
  return (
    // `js` is added before paint so content waiting to animate in stays visible without scripts.
    <html lang={htmlLang[locale]} className={`${sans.variable} bg-canvas antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="bg-canvas font-sans text-ink">
        <div className="guide-lines" aria-hidden="true" />
        <a href="#main-content" className="skip-link">
          {commonContent[locale].skipLink}
        </a>
        <SiteHeader locale={locale} />
        {children}
        <SiteFooter locale={locale} />
        <MotionObserver />
        <SiteAnalytics />
      </body>
    </html>
  )
}
