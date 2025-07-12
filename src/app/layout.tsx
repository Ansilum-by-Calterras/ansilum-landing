import clsx from 'clsx'
import { type Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'

import { Navbar } from '@/components/navbar'
import { FloatingNav } from '@/components/ui/floating-navbar'
import { navItems } from '@/data/links'
import '@/styles/tailwind.css'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import { Analytics } from '@vercel/analytics/next'
import Link from 'next/link'
import Script from 'next/script'

export const metadata: Metadata = {
  title: {
    template: '%s - Calterras',
    default: 'Calterras - Elevate your future',
  },
}

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
        lexend.variable,
      )}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700&amp;display=swap"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="The Calterras Article"
          href="/blog/feed.xml"
        />
      </head>
      <body className="text-gray-950 antialiased">
        {/* Google Ads Scripts */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17343440971"
          strategy="afterInteractive"
          async
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17343440971');
          `}
        </Script>

        <Navbar
          banner={
            <Link
              href="/blog/Calterras-raises-100m-series-a-from-tailwind-ventures"
              className="flex items-center gap-1 rounded-full bg-teal-700/45 px-3 py-0.5 text-sm/6 font-medium text-white data-[hover]:bg-fuchsia-950/30"
            >
              Calterras raises $0. We&apos;re a new business in town
              <ChevronRightIcon className="size-4" />
            </Link>
          }
        />
        <FloatingNav navItems={navItems} />
        {children}

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  )
}
