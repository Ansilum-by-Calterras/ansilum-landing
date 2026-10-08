import { Footer } from '@/components/footer'
import { SiteAnalytics } from '@/components/marketing/analytics'
import { Navbar } from '@/components/navbar'
import { siteConfig } from '@/config/site'
import '@/styles/marketing.css'
import '@/styles/tailwind.css'
import '@/styles/theme.css'
import type { Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url || 'http://localhost:3000'),
  title: {
    default: 'Ansilum — POS untuk Kafe & Restoran Indonesia',
    template: '%s | Ansilum',
  },
  description: siteConfig.description,
  robots: siteConfig.url
    ? { index: true, follow: true }
    : { index: false, follow: false },
  applicationName: 'Ansilum',
  alternates: { types: { 'application/rss+xml': '/blog/feed.xml' } },
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${lexend.variable} scroll-smooth bg-background antialiased`}
    >
      <body className="text-foreground">
        <a href="#main-content" className="skip-link">
          Lewati ke konten utama
        </a>
        <Navbar />
        {children}
        <Footer />
        <SiteAnalytics />
      </body>
    </html>
  )
}
