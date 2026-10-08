import { LegalPage, type LegalSection } from '@/components/site/legal-page'
import { siteConfig } from '@/config/site'
import { isLocale, type Locale } from '@/i18n/config'
import { pageMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'

function content(locale: Locale): { title: string; intro: string; description: string; sections: LegalSection[] } {
  if (locale === 'en')
    return {
      title: 'Privacy.',
      description: 'How Calterras handles information sent through the Ansilum website, and what business data the planned AI consultation uses.',
      intro: 'How Calterras handles information you send through the Ansilum website, and how business data will be handled in the AI consultation.',
      sections: [
        {
          heading: 'What you give us',
          paragraphs: [
            'The demo form asks for your name, business name, type of business, number of outlets, city, one contact (WhatsApp or email), and what you want help with. Notes are optional. We also store your consent to be contacted, the time we received the request, its reference number, and the language you used.',
            'Please do not put customer details, passwords, payment information, or transaction records in the notes.',
          ],
        },
        {
          heading: 'How we use it',
          paragraphs: [
            'Calterras uses this information to understand your business, contact you about your request, and discuss the demo and whether Ansilum fits. Sending the form does not create an account or a paid subscription.',
          ],
        },
        {
          heading: 'Storage and access',
          paragraphs: [
            'Requests are stored by the website service or the request system Calterras configures. Access is limited to the people handling requests. Form data is never shown on public pages.',
            'To ask how your information is used, correct it, or have it deleted, contact us below. We may need your name or reference number to find the right request.',
          ],
        },
        {
          heading: 'Website measurement and language choice',
          paragraphs: [
            siteConfig.analytics
              ? 'The website uses Vercel Analytics to measure page use and the demo request journey. Events contain the page, the button position, and the step reached. They do not include your name, email, WhatsApp number, or notes.'
              : 'Third-party analytics are not turned on for this website. The hosting service still processes technical request information to serve the website.',
            'When you choose English or Bahasa Indonesia, the website stores a small cookie called ansilum-locale for one year to remember your choice.',
          ],
        },
        {
          heading: 'AI and your business data',
          paragraphs: [
            'The AI consultation on this website is a scripted preview with sample data. It does not call an AI service. The demo form is not sent to Claude or any other AI model.',
            'The AI consultation in the Ansilum app is in development. Before it is turned on for a business, we will publish exactly what is sent to the AI service. The planned design sends: your question; the totals and comparisons Ansilum calculates to answer it, such as sales by day and product for the period you chose; and the business, outlet, and period names. The planned design does not send customer contact details, passwords, or payment card data.',
          ],
        },
        {
          heading: 'What this page covers',
          paragraphs: [
            'This page covers the website and demo requests. Use of the Ansilum app for your sales, and the related data handling, is described in the terms agreed during setup.',
          ],
        },
      ],
    }
  return {
    title: 'Privasi.',
    description: 'Cara Calterras menangani informasi yang dikirim melalui website Ansilum, serta data usaha yang dipakai dalam rancangan konsultasi AI.',
    intro: 'Cara Calterras menangani informasi yang Anda kirim melalui website Ansilum, dan cara data usaha akan ditangani dalam konsultasi AI.',
    sections: [
      {
        heading: 'Informasi yang Anda berikan',
        paragraphs: [
          'Formulir demo meminta nama, nama usaha, jenis usaha, jumlah outlet, kota, satu kontak (WhatsApp atau email), dan hal yang ingin Anda bahas. Catatan bersifat opsional. Kami juga menyimpan persetujuan dihubungi, waktu permintaan diterima, nomor referensi, dan bahasa yang Anda pakai.',
          'Jangan memasukkan data pelanggan, kata sandi, informasi pembayaran, atau catatan transaksi ke kolom catatan.',
        ],
      },
      {
        heading: 'Tujuan penggunaan',
        paragraphs: [
          'Calterras memakai informasi ini untuk memahami usaha Anda, menghubungi Anda terkait permintaan, serta membahas demo dan kecocokan Ansilum. Mengirim formulir tidak membuat akun atau langganan berbayar.',
        ],
      },
      {
        heading: 'Penyimpanan dan akses',
        paragraphs: [
          'Permintaan disimpan oleh layanan website atau sistem penerimaan permintaan yang dikonfigurasi Calterras. Akses dibatasi pada orang yang menangani permintaan. Data formulir tidak pernah ditampilkan di halaman publik.',
          'Untuk menanyakan penggunaan, memperbaiki, atau meminta penghapusan informasi Anda, hubungi kami di bawah. Nama atau nomor referensi mungkin diperlukan untuk menemukan permintaan yang tepat.',
        ],
      },
      {
        heading: 'Pengukuran website dan pilihan bahasa',
        paragraphs: [
          siteConfig.analytics
            ? 'Website memakai Vercel Analytics untuk mengukur penggunaan halaman dan alur permintaan demo. Peristiwa memuat halaman, posisi tombol, dan tahap yang dicapai. Peristiwa tidak memuat nama, email, nomor WhatsApp, atau catatan Anda.'
            : 'Analitik pihak ketiga tidak diaktifkan pada website ini. Layanan hosting tetap memproses informasi teknis permintaan untuk menyajikan website.',
          'Saat Anda memilih Bahasa Indonesia atau English, website menyimpan cookie kecil bernama ansilum-locale selama satu tahun untuk mengingat pilihan Anda.',
        ],
      },
      {
        heading: 'AI dan data usaha Anda',
        paragraphs: [
          'Konsultasi AI di website ini adalah pratinjau dengan skrip dan data contoh. Pratinjau ini tidak memanggil layanan AI. Formulir demo tidak dikirim ke Claude atau model AI lainnya.',
          'Konsultasi AI di aplikasi Ansilum sedang dalam pengembangan. Sebelum diaktifkan untuk sebuah usaha, kami akan mempublikasikan data apa saja yang dikirim ke layanan AI. Rancangannya mengirim: pertanyaan Anda; total dan perbandingan yang dihitung Ansilum untuk menjawabnya, misalnya penjualan per hari dan produk untuk periode yang Anda pilih; serta nama usaha, outlet, dan periode. Rancangan ini tidak mengirim kontak pelanggan, kata sandi, atau data kartu pembayaran.',
        ],
      },
      {
        heading: 'Cakupan halaman ini',
        paragraphs: [
          'Halaman ini mencakup website dan permintaan demo. Penggunaan aplikasi Ansilum untuk penjualan Anda, beserta penanganan datanya, dijelaskan dalam ketentuan yang disepakati saat penyiapan.',
        ],
      },
    ],
  }
}

type Props = { params: { locale: string } }

export function generateMetadata({ params }: Props) {
  if (!isLocale(params.locale)) return {}
  const copy = content(params.locale)
  return pageMetadata({ locale: params.locale, path: '/privacy', title: copy.title.replace(/\.$/, ''), description: copy.description })
}

export default function PrivacyPage({ params }: Props) {
  if (!isLocale(params.locale)) notFound()
  const copy = content(params.locale)
  return <LegalPage locale={params.locale} title={copy.title} intro={copy.intro} sections={copy.sections} />
}
