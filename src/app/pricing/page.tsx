import { DemoLink } from '@/components/marketing/demo-link'
import { FinalCTA, PageIntro, Section } from '@/components/marketing/sections'
import { pageMetadata } from '@/lib/metadata'
export const metadata = pageMetadata(
  'Early Merchant Program',
  'Bahas kebutuhan outlet, biaya, fitur Beta, serta pendampingan Ansilum sebelum onboarding. Mulai dengan permintaan demo.',
  '/pricing',
)
export default function PricingPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageIntro
        eyebrow="Early Merchant Program"
        title="Sepakati kebutuhan dan biaya sebelum mulai."
      >
        <p>
          Ansilum sedang berada pada tahap Early Beta. Kami memulai dari
          percakapan untuk memahami operasional outlet dan cakupan penggunaan
          yang sesuai.
        </p>
      </PageIntro>
      <Section className="!pt-4">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            [
              '01',
              'Lihat kecocokan',
              'Bahas kendala kasir, stok, dan laporan. Tinjau alur serta fitur pada versi yang tersedia.',
            ],
            [
              '02',
              'Sepakati cakupan',
              'Perangkat, pembayaran, biaya, dan bentuk pendampingan diperjelas sebelum onboarding.',
            ],
            [
              '03',
              'Evaluasi bersama',
              'Sepakati apa yang akan dievaluasi dan bagaimana masukan operasional disampaikan.',
            ],
          ].map(([number, title, text]) => (
            <article key={number} className="surface-card p-8">
              <span className="eyebrow">{number}</span>
              <h2 className="mt-5 text-xl font-medium">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {text}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-10 max-w-3xl rounded-3xl bg-[var(--marketing-paper)] p-8">
          <h2 className="section-title">
            Untuk usaha yang ingin mulai dengan jelas.
          </h2>
          <p className="mt-5 leading-8 text-muted-foreground">
            Program awal berfokus pada kafe, kedai kopi, dan restoran kecil,
            terutama sekitar 1–5 outlet. Kebutuhan lebih besar tetap dapat
            dibahas.
          </p>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Tidak ada paket, diskon, atau janji dukungan otomatis dari formulir
            demo. Ketentuan penggunaan dan biaya akan disepakati terlebih
            dahulu.
          </p>
          <div className="mt-7">
            <DemoLink placement="program" />
          </div>
        </div>
      </Section>
      <FinalCTA placement="pricing-final" />
    </main>
  )
}
