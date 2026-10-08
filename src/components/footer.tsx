import { siteConfig } from '@/config/site'
import Link from 'next/link'
import { Container } from './container'
import { Logo } from './logo'
export function Footer() {
  return (
    <footer className="border-t border-[var(--marketing-line)] bg-[var(--marketing-paper)] py-12">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="Ansilum, beranda">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
              Dikembangkan oleh Calterras.
              <br />
              Usaha software dari Indonesia.
              <br />
              Ansilum berada pada tahap Early Beta.
            </p>
          </div>
          {[
            {
              title: 'Ansilum',
              links: [
                ['Produk', '/products/ansilum'],
                ['Status produk', '/#status-produk'],
                ['Rencana Intelligence', '/intelligence'],
                ['Early Merchant Program', '/pricing'],
              ],
            },
            {
              title: 'Calterras',
              links: [
                ['Tentang kami', '/about'],
                ['Panduan', '/blog'],
                ['Minta Demo', '/demo'],
              ],
            },
            {
              title: 'Informasi',
              links: [
                ['Privasi', '/privacy'],
                ['Ketentuan', '/terms'],
                ['Data & keamanan', '/security'],
              ],
            },
          ].map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold">{group.title}</h2>
              <ul className="mt-4 space-y-2">
                {group.links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="inline-flex min-h-8 items-center text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--marketing-line)] pt-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Calterras. Ansilum.</p>
          <div className="flex flex-wrap gap-5">
            {siteConfig.email && (
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            )}
            {siteConfig.companyProfile && (
              <a href={siteConfig.companyProfile}>Profil Calterras</a>
            )}
            <span>Dirancang untuk F&B Indonesia</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
