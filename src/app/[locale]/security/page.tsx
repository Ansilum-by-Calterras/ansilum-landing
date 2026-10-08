import { LegalPage, type LegalSection } from '@/components/site/legal-page'
import { isLocale } from '@/i18n/config'
import { pageMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'

const content: Record<'en' | 'id', { title: string; intro: string; description: string; sections: LegalSection[] }> = {
  en: {
    title: 'Security and your business data.',
    description: 'How Ansilum handles access, devices without internet, saved sales, and the requirements for the AI consultation.',
    intro: 'How Ansilum handles access, devices, and saved sales today, and the rules the AI consultation must follow before it is turned on.',
    sections: [
      { heading: 'Who sees what', paragraphs: ['Ansilum separates businesses, outlets, and user roles. What a person sees follows their access. We set up access and report scope with you before you start.'] },
      { heading: 'Devices without internet', paragraphs: ['Recording sales on the device needs setup first and a sign-in that is still valid. While the internet is down, the device may not learn about access changes made elsewhere. Managing devices and updating access is part of the setup we agree on.'] },
      { heading: 'Saved sales and updates', paragraphs: ['The cashier app saves a sale before showing it as complete. Updating saved sales to the sales summary is a separate step; a sale waiting for an update or needing a check must be followed up. The sales summary includes a sale once it has been updated.'] },
      {
        heading: 'Rules for the AI consultation',
        paragraphs: [
          'The AI consultation is in development and is not connected to merchant records. Before it is turned on, it must meet these requirements: answers only use the business and outlets the user can access; totals and comparisons come from Ansilum’s own calculations; the assistant reads and explains records and cannot change prices, stock, or payments; each answer shows its period and the records behind it; and we publish what is sent to the AI service.',
        ],
      },
      { heading: 'Before you start', paragraphs: ['Talk with Calterras about device management, staff access, data recovery, and support. This page does not claim security certifications, independent audits, or service-level guarantees.'] },
    ],
  },
  id: {
    title: 'Keamanan dan data usaha Anda.',
    description: 'Cara Ansilum menangani akses, perangkat tanpa internet, penjualan tersimpan, dan syarat untuk konsultasi AI.',
    intro: 'Cara Ansilum menangani akses, perangkat, dan penjualan tersimpan saat ini, serta aturan yang harus dipenuhi konsultasi AI sebelum diaktifkan.',
    sections: [
      { heading: 'Siapa melihat apa', paragraphs: ['Ansilum memisahkan usaha, outlet, dan peran pengguna. Informasi yang terlihat mengikuti akses setiap orang. Akses dan cakupan laporan kita atur bersama sebelum mulai.'] },
      { heading: 'Perangkat tanpa internet', paragraphs: ['Mencatat penjualan di perangkat membutuhkan penyiapan awal dan izin masuk yang masih berlaku. Selama internet terputus, perangkat mungkin belum mengetahui perubahan akses yang dibuat di tempat lain. Pengelolaan perangkat dan pembaruan akses menjadi bagian dari penyiapan yang kita sepakati.'] },
      { heading: 'Penjualan tersimpan dan pembaruan', paragraphs: ['Aplikasi kasir menyimpan penjualan sebelum menampilkannya sebagai selesai. Memperbarui penjualan tersimpan ke ringkasan penjualan adalah langkah terpisah; penjualan yang menunggu pembaruan atau perlu diperiksa harus ditindaklanjuti. Ringkasan penjualan mencakup penjualan setelah catatannya diperbarui.'] },
      {
        heading: 'Aturan untuk konsultasi AI',
        paragraphs: [
          'Konsultasi AI sedang dalam pengembangan dan belum terhubung dengan catatan merchant. Sebelum diaktifkan, konsultasi harus memenuhi syarat berikut: jawaban hanya memakai usaha dan outlet yang dapat diakses pengguna; total dan perbandingan berasal dari perhitungan Ansilum sendiri; asisten membaca dan menjelaskan catatan serta tidak dapat mengubah harga, stok, atau pembayaran; setiap jawaban menampilkan periode dan catatan yang menjadi dasarnya; dan kami mempublikasikan data yang dikirim ke layanan AI.',
        ],
      },
      { heading: 'Sebelum mulai', paragraphs: ['Bahas pengelolaan perangkat, akses staf, pemulihan data, dan dukungan bersama Calterras. Halaman ini tidak menyatakan sertifikasi keamanan, audit independen, atau jaminan tingkat layanan.'] },
    ],
  },
}

type Props = { params: { locale: string } }

export function generateMetadata({ params }: Props) {
  if (!isLocale(params.locale)) return {}
  const copy = content[params.locale]
  return pageMetadata({ locale: params.locale, path: '/security', title: copy.title.replace(/\.$/, ''), description: copy.description })
}

export default function SecurityPage({ params }: Props) {
  if (!isLocale(params.locale)) notFound()
  const copy = content[params.locale]
  return <LegalPage locale={params.locale} title={copy.title} intro={copy.intro} sections={copy.sections} />
}
