import { DemoForm } from '@/components/marketing/demo-form'
import { PageIntro, Section } from '@/components/marketing/sections'
import { siteConfig } from '@/config/site'
import { pageMetadata } from '@/lib/metadata'
export const metadata = pageMetadata(
  'Minta Demo — POS untuk Bisnis F&B',
  'Ceritakan kebutuhan kasir, stok, dan laporan bisnis Anda. Bahas kecocokan Ansilum Early Beta, fitur yang tersedia, dan langkah onboarding.',
  '/demo',
)
export default function DemoPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageIntro
        eyebrow="Demo Ansilum · Early Beta"
        title="Ceritakan kebutuhan outlet Anda."
      >
        <p>
          Kita mulai dari alur kasir dan kendala operasional Anda, lalu membahas
          apakah versi Ansilum yang tersedia cocok untuk digunakan.
        </p>
      </PageIntro>
      <Section className="!pt-4">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-xl font-medium">Yang akan dibahas</h2>
            <ol className="mt-6 space-y-7">
              {[
                [
                  '01',
                  'Kebutuhan outlet',
                  'Alur kasir, pembayaran, perangkat, dan kendala harian.',
                ],
                [
                  '02',
                  'Kecocokan produk',
                  'Fitur yang tersedia, batasan Beta, serta kebutuhan stok dan laporan.',
                ],
                [
                  '03',
                  'Langkah berikutnya',
                  'Biaya, dukungan, dan penyiapan sebelum memutuskan penggunaan.',
                ],
              ].map(([number, title, text]) => (
                <li key={number} className="flex gap-4">
                  <span className="pt-1 font-mono text-xs text-[#765134]">
                    {number}
                  </span>
                  <div>
                    <h3 className="font-medium">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-9 rounded-2xl bg-[var(--marketing-paper)] p-6">
              <p className="text-sm leading-7 text-muted-foreground">
                Ansilum masih Early Beta. Permintaan demo bukan pemesanan jadwal
                otomatis. Biaya dan cakupan penggunaan dibahas sebelum
                onboarding.
              </p>
              {siteConfig.email && (
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-4 block break-words text-sm font-medium underline underline-offset-4"
                >
                  {siteConfig.email}
                </a>
              )}
              {siteConfig.whatsapp && (
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  className="mt-4 block text-sm font-medium underline underline-offset-4"
                >
                  Hubungi melalui WhatsApp
                </a>
              )}
            </div>
          </div>
          <DemoForm />
        </div>
      </Section>
    </main>
  )
}
