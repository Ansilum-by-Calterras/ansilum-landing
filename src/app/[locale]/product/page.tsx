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
        'How Ansilum records sales, how the AI assistant built with Claude explains them, what works without internet, and what is available today.',
    },
    title: 'A cashier app that answers questions about your business.',
    lead: 'Ansilum records every sale. Then you ask, in your own words, what happened, and get an answer with the numbers and what to check next.',
    answers: {
      heading: 'Every answer can be checked.',
      points: [
        ['The period is always clear', 'You see exactly which days the answer is about.'],
        ['Numbers behind every sentence', '“Sales fell 10%, from Rp12,000,000 to Rp10,800,000.” Not just “sales fell”.'],
        ['The data is one tap away', 'Switch from the chart to the numbers the answer used.'],
        ['A next step you can act on', 'Something practical to check, like coffee sales on Tuesday.'],
      ] as [string, string][],
    },
    claude: {
      heading: 'Built with Claude by Anthropic.',
      body: 'We are building the Ansilum assistant with Claude, an AI model made by Anthropic. Ansilum does the maths, so the numbers always match your cashier records. Claude understands your question and explains the result in plain Indonesian or English.',
      steps: [
        ['Ansilum keeps your sales', 'Every sale from the cashier is saved with its products, amount, and time.'],
        ['Ansilum does the maths', 'Totals and comparisons, like this week against last week, are calculated by Ansilum.'],
        ['Claude explains', 'Claude reads your question and explains the result in everyday language.'],
        ['You decide', 'Check the numbers, then choose what to do.'],
      ] as [string, string][],
      note: 'The assistant only sees the outlets your account can access. It never changes prices, stock, or payments.',
    },
    foundation: {
      heading: 'The cashier app underneath.',
      body: 'Our customers already use the Ansilum cashier app every day. The assistant reads from the same records.',
      features: [
        ['Ring up sales', 'Pick products, take payment, save the sale.'],
        ['Manage your products', 'Keep products and prices up to date for your cashier.'],
        ['Read your sales report', 'Sales and orders for any period and outlet.'],
      ] as [string, string][],
    },
    offline: {
      heading: 'When the internet goes down.',
      columns: [
        ['Keeps working', 'Recording cash sales on a prepared device. Receipts print on supported printers.'],
        ['Needs internet', 'First setup, adding products, cashier sign-in, QRIS and card payments, the sales report, and the AI assistant.'],
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
        ['Cashier app: sales, products, receipts', 'beta'],
        ['Sales report by period and outlet', 'beta'],
        ['Cash sales without internet', 'beta'],
        ['AI assistant for sales and products', 'dev'],
        ['Stock, recipes, and costs in AI answers', 'later'],
      ] as [string, Status][],
    },
    access: {
      heading: 'How to get started.',
      steps: [
        ['Request a demo', 'Tell us about your business.'],
        ['Talk it through', 'We look at how you sell and show you the app.'],
        ['Pick a plan', 'Plans start at Rp50,000 a month. We help you choose.'],
        ['Start selling', 'We load your products and set up your devices.'],
      ] as [string, string][],
      link: 'More about getting started',
    },
  },
  id: {
    meta: {
      title: 'Aplikasi kasir dengan asisten AI',
      description:
        'Cara Ansilum mencatat penjualan, cara asisten AI yang dibangun dengan Claude menjelaskannya, apa yang tetap jalan tanpa internet, dan apa yang tersedia hari ini.',
    },
    title: 'Aplikasi kasir yang bisa menjawab pertanyaan soal usaha Anda.',
    lead: 'Ansilum mencatat setiap penjualan. Lalu Anda cukup bertanya dengan bahasa sendiri, dan mendapat jawaban lengkap dengan angka dan apa yang perlu dicek.',
    answers: {
      heading: 'Setiap jawaban bisa dicek.',
      points: [
        ['Periodenya selalu jelas', 'Anda tahu persis jawaban itu membahas tanggal berapa saja.'],
        ['Ada angka di setiap kalimat', '“Penjualan turun 10%, dari Rp12.000.000 menjadi Rp10.800.000.” Bukan sekadar “penjualan turun”.'],
        ['Datanya tinggal diketuk', 'Pindah dari grafik ke angka yang dipakai jawaban.'],
        ['Langkah yang bisa langsung dikerjakan', 'Hal praktis untuk dicek, misalnya penjualan kopi hari Selasa.'],
      ],
    },
    claude: {
      heading: 'Dibangun dengan Claude dari Anthropic.',
      body: 'Kami membangun asisten Ansilum dengan Claude, model AI buatan Anthropic. Ansilum yang menghitung angkanya, jadi angkanya selalu sesuai catatan kasir. Claude memahami pertanyaan Anda dan menjelaskan hasilnya dengan bahasa Indonesia atau Inggris yang mudah.',
      steps: [
        ['Ansilum menyimpan penjualan', 'Setiap penjualan di kasir disimpan beserta produk, jumlah, dan waktunya.'],
        ['Ansilum menghitung angkanya', 'Total dan perbandingan, misalnya minggu ini dengan minggu lalu, dihitung oleh Ansilum.'],
        ['Claude menjelaskan', 'Claude membaca pertanyaan Anda dan menjelaskan hasilnya dengan bahasa sehari-hari.'],
        ['Anda yang memutuskan', 'Cek angkanya, lalu tentukan langkah Anda.'],
      ],
      note: 'Asisten hanya melihat outlet yang bisa diakses akun Anda. Asisten tidak pernah mengubah harga, stok, atau pembayaran.',
    },
    foundation: {
      heading: 'Aplikasi kasir di baliknya.',
      body: 'Pelanggan kami sudah memakai aplikasi kasir Ansilum setiap hari. Asisten membaca dari catatan yang sama.',
      features: [
        ['Catat penjualan', 'Pilih produk, terima pembayaran, simpan penjualan.'],
        ['Kelola produk', 'Atur produk dan harga yang dipakai kasir.'],
        ['Baca laporan penjualan', 'Penjualan dan jumlah pesanan untuk periode dan outlet mana pun.'],
      ],
    },
    offline: {
      heading: 'Saat internet mati.',
      columns: [
        ['Tetap jalan', 'Mencatat penjualan tunai di perangkat yang sudah disiapkan. Struk tetap tercetak di printer yang didukung.'],
        ['Butuh internet', 'Penyiapan awal, menambah produk, masuk sebagai kasir, pembayaran QRIS dan kartu, laporan penjualan, dan asisten AI.'],
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
        ['Aplikasi kasir: penjualan, produk, struk', 'beta'],
        ['Laporan penjualan per periode dan outlet', 'beta'],
        ['Penjualan tunai tanpa internet', 'beta'],
        ['Asisten AI untuk penjualan dan produk', 'dev'],
        ['Stok, resep, dan biaya dalam jawaban AI', 'later'],
      ],
    },
    access: {
      heading: 'Cara mulai.',
      steps: [
        ['Minta demo', 'Ceritakan sedikit soal usaha Anda.'],
        ['Ngobrol bersama', 'Kami lihat cara Anda berjualan dan tunjukkan aplikasinya.'],
        ['Pilih paket', 'Paket mulai Rp50.000 per bulan. Kami bantu memilih.'],
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

      <section id="claude" className="scroll-mt-20">
        <Container className="py-20 sm:py-28">
          <div className="max-w-3xl">
            <h2 className="display-lg text-balance" data-reveal>{copy.claude.heading}</h2>
            <p className="lead mt-6" data-reveal>{copy.claude.body}</p>
          </div>
          <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {copy.claude.steps.map(([title, body], index) => (
              <li key={title} data-reveal style={{ '--delay': `${index * 120}ms` } as React.CSSProperties}>
                <PulseRule className={index === 2 ? '!bg-brand' : undefined} />
                <span className="mt-6 block text-sm font-bold text-brand-ink">0{index + 1}</span>
                <h3 className="mt-3 text-xl font-bold tracking-[-0.02em]">{title}</h3>
                <p className="mt-3 leading-7 text-soft">{body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-12 max-w-3xl border-l-2 border-leaf pl-5 text-lg leading-8">{copy.claude.note}</p>
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
