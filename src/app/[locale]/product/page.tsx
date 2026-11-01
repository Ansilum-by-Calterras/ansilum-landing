import { ConsultationPreview } from '@/components/site/consultation-preview'
import { PulseRule } from '@/components/site/line-art'
import { Container, FinalCta, LocalLink, PageHeader } from '@/components/site/page-parts'
import { ProductScreens } from '@/components/site/product-screens'
import { commonContent } from '@/content/common'
import { isLocale, type Locale } from '@/i18n/config'
import { pageMetadata } from '@/lib/metadata'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import { notFound } from 'next/navigation'

type Status = 'beta' | 'dev' | 'later'

const content = {
  en: {
    meta: {
      title: 'Cashier app with an AI assistant',
      description:
        'How Ansilum records sales, how the AI assistant we are building will explain them, what works without internet, and what is available today.',
    },
    title: 'A cashier app today. An assistant that answers your questions next.',
    lead: 'Ansilum records every sale today. Next, we are building an assistant you can ask, in your own words, what happened, and that answers with the numbers and what to check next.',
    answers: {
      heading: 'Designed so every answer can be checked.',
      points: [
        ['The period is always clear', 'You see exactly which days the answer is about.'],
        ['Numbers behind every sentence', '“Sales fell 10%, from Rp12,000,000 to Rp10,800,000.” Not just “sales fell”.'],
        ['The data is one tap away', 'Switch from the chart to the numbers the answer used.'],
        ['A next step you can act on', 'Something practical to check, like coffee sales on Tuesday.'],
      ] as [string, string][],
    },
    ai: {
      heading: 'Ansilum does the maths. The AI explains it.',
      body: 'In the assistant we are building, Ansilum calculates the totals and comparisons from your cashier records, so the numbers match them. An AI language model then reads your question and explains the result in plain Indonesian or English.',
      steps: [
        ['Ansilum keeps your sales', 'Every sale from the cashier is saved with its products, amount, and time.'],
        ['Ansilum does the maths', 'Totals and comparisons, like this week against last week, are calculated by Ansilum.'],
        ['The AI explains', 'The AI model reads your question and explains the result in everyday language.'],
        ['You decide', 'Check the numbers, then choose what to do.'],
      ] as [string, string][],
      note: 'The assistant only sees the outlets your account can access. It reads records and cannot change prices, stock, or payments.',
    },
    foundation: {
      heading: 'The cashier app underneath.',
      body: 'Our customers already use the Ansilum cashier app every day. The assistant will read from the same records.',
      features: [
        ['Ring up sales', 'Pick products, take payment, save the sale.'],
        ['Manage your products', 'Keep products and prices up to date for your cashier.'],
        ['Read your sales report', 'Your sales total and trend for any date range, on the web dashboard.'],
      ] as [string, string][],
    },
    offline: {
      heading: 'When the internet goes down.',
      columns: [
        ['Keeps working', 'Recording cash and confirmed transfer sales on a prepared device. Receipts and kitchen tickets print on Bluetooth, USB, or network printers.'],
        ['Needs internet', 'First setup, adding products, cashier sign-in, recording QRIS payments, the web dashboard and reports, and the AI assistant.'],
        ['When it comes back', 'Saved sales sync automatically. Now and then a sale needs a quick manual check.'],
      ] as [string, string][],
    },
    scope: {
      heading: 'What you can use today.',
      body: 'We confirm the right features, devices, and printers for your business in the demo.',
      feature: 'Feature',
      status: 'Status',
      labels: { beta: 'Available (beta)', dev: 'Coming soon', later: 'Later' } as Record<Status, string>,
      rows: [
        ['Cashier app: sales, open bills, receipts, kitchen tickets', 'beta'],
        ['Cash and transfer sales without internet', 'beta'],
        ['Web sales dashboard for any date range', 'beta'],
        ['Stock, recipes, and cost of goods (Standard and Full)', 'beta'],
        ['Profit, margin, and stock analytics (Full)', 'beta'],
        ['AI assistant for sales, products, and stock', 'dev'],
      ] as [string, Status][],
    },
    access: {
      heading: 'How to get started.',
      steps: [
        ['Request a demo', 'Tell us about your business.'],
        ['Talk it through', 'We look at how you sell and show you the app.'],
        ['Pick a plan', 'Basic Rp50,000, Standard Rp99,000, or Full Rp199,000 a month. We help you choose.'],
        ['Start selling', 'We load your products and set up your devices.'],
      ] as [string, string][],
      link: 'More about getting started',
    },
  },
  id: {
    meta: {
      title: 'Aplikasi kasir dengan asisten AI',
      description:
        'Cara Ansilum mencatat penjualan, cara asisten AI yang sedang kami bangun akan menjelaskannya, apa yang tetap jalan tanpa internet, dan apa yang tersedia hari ini.',
    },
    title: 'Aplikasi kasir hari ini. Asisten yang menjawab pertanyaan Anda berikutnya.',
    lead: 'Ansilum mencatat setiap penjualan hari ini. Berikutnya, kami sedang membangun asisten yang bisa Anda tanya dengan bahasa sendiri, dan menjawab lengkap dengan angka dan apa yang perlu dicek.',
    answers: {
      heading: 'Dirancang agar setiap jawaban bisa dicek.',
      points: [
        ['Periodenya selalu jelas', 'Anda tahu persis jawaban itu membahas tanggal berapa saja.'],
        ['Ada angka di setiap kalimat', '“Penjualan turun 10%, dari Rp12.000.000 menjadi Rp10.800.000.” Bukan sekadar “penjualan turun”.'],
        ['Datanya tinggal diketuk', 'Pindah dari grafik ke angka yang dipakai jawaban.'],
        ['Langkah yang bisa langsung dikerjakan', 'Hal praktis untuk dicek, misalnya penjualan kopi hari Selasa.'],
      ],
    },
    ai: {
      heading: 'Ansilum yang menghitung. AI yang menjelaskan.',
      body: 'Pada asisten yang sedang kami bangun, Ansilum menghitung total dan perbandingan dari catatan kasir Anda, jadi angkanya sesuai dengan catatan itu. Model bahasa AI lalu membaca pertanyaan Anda dan menjelaskan hasilnya dengan bahasa Indonesia atau Inggris yang mudah.',
      steps: [
        ['Ansilum menyimpan penjualan', 'Setiap penjualan di kasir disimpan beserta produk, jumlah, dan waktunya.'],
        ['Ansilum menghitung angkanya', 'Total dan perbandingan, misalnya minggu ini dengan minggu lalu, dihitung oleh Ansilum.'],
        ['AI menjelaskan', 'Model AI membaca pertanyaan Anda dan menjelaskan hasilnya dengan bahasa sehari-hari.'],
        ['Anda yang memutuskan', 'Cek angkanya, lalu tentukan langkah Anda.'],
      ],
      note: 'Asisten hanya melihat outlet yang bisa diakses akun Anda. Asisten hanya membaca catatan dan tidak bisa mengubah harga, stok, atau pembayaran.',
    },
    foundation: {
      heading: 'Aplikasi kasir di baliknya.',
      body: 'Pelanggan kami sudah memakai aplikasi kasir Ansilum setiap hari. Asisten akan membaca dari catatan yang sama.',
      features: [
        ['Catat penjualan', 'Pilih produk, terima pembayaran, simpan penjualan.'],
        ['Kelola produk', 'Atur produk dan harga yang dipakai kasir.'],
        ['Baca laporan penjualan', 'Total dan tren penjualan untuk periode mana pun, di dasbor web.'],
      ],
    },
    offline: {
      heading: 'Saat internet mati.',
      columns: [
        ['Tetap jalan', 'Mencatat penjualan tunai dan transfer terkonfirmasi di perangkat yang sudah disiapkan. Struk dan tiket dapur tetap tercetak di printer Bluetooth, USB, atau jaringan.'],
        ['Butuh internet', 'Penyiapan awal, menambah produk, masuk sebagai kasir, pencatatan pembayaran QRIS, dasbor web dan laporan, serta asisten AI.'],
        ['Saat internet kembali', 'Penjualan yang tersimpan tersinkron otomatis. Sesekali ada penjualan yang perlu dicek manual.'],
      ],
    },
    scope: {
      heading: 'Yang bisa Anda pakai hari ini.',
      body: 'Kami pastikan fitur, perangkat, dan printer yang cocok untuk usaha Anda saat demo.',
      feature: 'Fitur',
      status: 'Status',
      labels: { beta: 'Tersedia (beta)', dev: 'Segera hadir', later: 'Berikutnya' },
      rows: [
        ['Aplikasi kasir: penjualan, tagihan terbuka, struk, tiket dapur', 'beta'],
        ['Penjualan tunai dan transfer tanpa internet', 'beta'],
        ['Dasbor penjualan web per periode', 'beta'],
        ['Stok, resep, dan HPP (Standard dan Full)', 'beta'],
        ['Analitik laba, margin, dan stok (Full)', 'beta'],
        ['Asisten AI untuk penjualan, produk, dan stok', 'dev'],
      ],
    },
    access: {
      heading: 'Cara mulai.',
      steps: [
        ['Minta demo', 'Ceritakan sedikit soal usaha Anda.'],
        ['Ngobrol bersama', 'Kami lihat cara Anda berjualan dan tunjukkan aplikasinya.'],
        ['Pilih paket', 'Basic Rp50.000, Standard Rp99.000, atau Full Rp199.000 per bulan. Kami bantu memilih.'],
        ['Mulai berjualan', 'Kami masukkan produk Anda dan siapkan perangkatnya.'],
      ],
      link: 'Selengkapnya soal cara mulai',
    },
  },
}

type Props = { params: { locale: string } }

export function generateMetadata({ params }: Props) {
  if (!isLocale(params.locale)) return {}
  return pageMetadata({ locale: params.locale, path: '/product', ...content[params.locale].meta })
}

export default function ProductPage({ params }: Props) {
  if (!isLocale(params.locale)) notFound()
  const locale: Locale = params.locale
  const copy = content[locale]
  const common = commonContent[locale]
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHeader title={copy.title}>
        <p>{copy.lead}</p>
      </PageHeader>

      <section id="assistant" className="scroll-mt-20 bg-mist">
        <Container className="py-16 sm:py-24">
          <ConsultationPreview locale={locale} />
          <h2 className="display-md mt-20" data-reveal>{copy.answers.heading}</h2>
          <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {copy.answers.points.map(([title, body], index) => (
              <div key={title} data-reveal style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}>
                <dt className="flex items-start gap-2.5 font-bold">
                  <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-leaf" aria-hidden="true" />
                  {title}
                </dt>
                <dd className="mt-2 leading-7 text-soft">{body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section id="ai" className="scroll-mt-20">
        <Container className="py-20 sm:py-28">
          <div className="max-w-3xl">
            <h2 className="display-lg text-balance" data-reveal>{copy.ai.heading}</h2>
            <p className="lead mt-6" data-reveal>{copy.ai.body}</p>
          </div>
          <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {copy.ai.steps.map(([title, body], index) => (
              <li key={title} data-reveal style={{ '--delay': `${index * 120}ms` } as React.CSSProperties}>
                <PulseRule className={index === 2 ? '!bg-brand' : undefined} />
                <span className="mt-6 block text-sm font-bold text-brand-ink">0{index + 1}</span>
                <h3 className="mt-3 text-xl font-bold tracking-[-0.02em]">{title}</h3>
                <p className="mt-3 leading-7 text-soft">{body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-12 max-w-3xl border-l-2 border-leaf pl-5 text-lg leading-8">{copy.ai.note}</p>
        </Container>
      </section>

      <section id="foundation" className="scroll-mt-20 border-t border-line">
        <Container className="grid gap-14 py-20 sm:py-28 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <h2 className="display-lg text-balance" data-reveal>{copy.foundation.heading}</h2>
            <p className="lead mt-6" data-reveal>{copy.foundation.body}</p>
            <dl className="mt-10 space-y-6">
              {copy.foundation.features.map(([title, body]) => (
                <div key={title} className="border-t border-line pt-5">
                  <dt className="font-bold">{title}</dt>
                  <dd className="mt-1.5 leading-7 text-soft">{body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-3xl bg-mist bg-[radial-gradient(rgb(17_20_24/0.09)_1.2px,transparent_1.2px)] px-6 py-10 [background-size:14px_14px] sm:px-10" data-reveal>
            <ProductScreens locale={locale} />
          </div>
        </Container>
      </section>

      <section id="offline" className="scroll-mt-20 bg-night text-white">
        <Container className="py-20 sm:py-28">
          <h2 className="display-lg max-w-3xl text-balance" data-reveal>{copy.offline.heading}</h2>
          <dl className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {copy.offline.columns.map(([title, body], index) => (
              <div key={title} data-reveal style={{ '--delay': `${index * 120}ms` } as React.CSSProperties}>
                <PulseRule dark className="mb-6" />
                <dt className={clsx('text-xl font-bold', index === 0 && 'text-sun')}>{title}</dt>
                <dd className="mt-3 leading-7 text-white/70">{body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section id="scope" className="scroll-mt-20">
        <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div>
            <h2 className="display-lg text-balance" data-reveal>{copy.scope.heading}</h2>
            <p className="lead mt-6" data-reveal>{copy.scope.body}</p>
          </div>
          <table className="w-full text-left" data-reveal>
            <thead className="sr-only">
              <tr>
                <th scope="col">{copy.scope.feature}</th>
                <th scope="col">{copy.scope.status}</th>
              </tr>
            </thead>
            <tbody>
              {copy.scope.rows.map(([feature, status]) => (
                <tr key={feature} className="border-b border-line first:border-t">
                  <th scope="row" className="py-5 pr-4 text-[1.05rem] font-semibold">
                    {feature}
                  </th>
                  <td className="py-5 text-right">
                    <span
                      className={clsx(
                        'inline-block whitespace-nowrap rounded-md px-2.5 py-1 text-sm font-semibold',
                        status === 'beta' && 'bg-leaf-soft text-leaf',
                        status === 'dev' && 'bg-brand-soft text-brand-ink',
                        status === 'later' && 'bg-mist text-soft',
                      )}
                    >
                      {copy.scope.labels[status as Status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </section>

      <section id="access" className="scroll-mt-20 border-t border-line">
        <Container className="py-20 sm:py-28">
          <h2 className="display-lg" data-reveal>{copy.access.heading}</h2>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {copy.access.steps.map(([title, body], index) => (
              <li key={title} data-reveal style={{ '--delay': `${index * 120}ms` } as React.CSSProperties}>
                <PulseRule />
                <span className="mt-6 block text-sm font-bold text-brand-ink">0{index + 1}</span>
                <h3 className="mt-3 text-xl font-bold tracking-[-0.02em]">{title}</h3>
                <p className="mt-3 leading-7 text-soft">{body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <LocalLink locale={locale} href="/pricing">
              {copy.access.link}
            </LocalLink>
          </div>
        </Container>
      </section>

      <FinalCta locale={locale} placement="product-final" />
    </main>
  )
}
