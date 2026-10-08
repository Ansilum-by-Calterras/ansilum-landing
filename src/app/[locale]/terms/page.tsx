import { LegalPage, type LegalSection } from '@/components/site/legal-page'
import { isLocale } from '@/i18n/config'
import { pageMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'

const content: Record<'en' | 'id', { title: string; intro: string; description: string; sections: LegalSection[] }> = {
  en: {
    title: 'Website and demo terms.',
    description: 'What the Ansilum website and a demo request cover, the current product status, and what is agreed before you use Ansilum.',
    intro: 'What this website and a demo request cover, and what we agree on before you use Ansilum.',
    sections: [
      { heading: 'The website and who builds Ansilum', paragraphs: ['This website introduces Ansilum, a product built by Calterras. It explains the product so you can decide whether to talk with us about your business.'] },
      { heading: 'Demo requests', paragraphs: ['Sending the form asks Calterras to review your needs and contact you. It does not confirm an appointment, open app access, start a subscription, or create a charge.'] },
      { heading: 'Product status', paragraphs: ['The Ansilum cashier app and sales summary are in Beta. The AI consultation is in development. We confirm features, access, devices, and support for the version you will use. Our plans can change and are not release-date commitments.'] },
      { heading: 'Before you use the product', paragraphs: ['Costs, scope, data setup, devices, support, and the terms for using the app are agreed before setup. This page does not replace that agreement.'] },
      { heading: 'Selling without internet, and payments', paragraphs: ['Recording sales without internet needs a prepared device whose sign-in is still valid. Payments through outside providers, such as QRIS and cards, need a connection and the provider’s confirmation. Recording a payment is not the same as a bank or provider confirming the money arrived.'] },
      { heading: 'Previews and sample data', paragraphs: ['Screens marked “Sample data” use invented figures. The AI consultation preview is scripted with sample data for a fictional business; it shows how the consultation will work and is not a released feature.'] },
    ],
  },
  id: {
    title: 'Ketentuan website dan demo.',
    description: 'Cakupan website Ansilum dan permintaan demo, status produk saat ini, dan hal yang disepakati sebelum menggunakan Ansilum.',
    intro: 'Cakupan website ini dan permintaan demo, serta hal yang kita sepakati sebelum Anda menggunakan Ansilum.',
    sections: [
      { heading: 'Website dan pengembang Ansilum', paragraphs: ['Website ini memperkenalkan Ansilum, produk yang dikembangkan oleh Calterras. Informasinya membantu Anda memutuskan apakah ingin membahas usaha Anda bersama kami.'] },
      { heading: 'Permintaan demo', paragraphs: ['Mengirim formulir berarti meminta Calterras meninjau kebutuhan Anda dan menghubungi Anda. Pengiriman tidak mengonfirmasi jadwal, membuka akses aplikasi, memulai langganan, atau menimbulkan tagihan.'] },
      { heading: 'Status produk', paragraphs: ['Aplikasi kasir dan ringkasan penjualan Ansilum berada pada tahap Beta. Konsultasi AI sedang dalam pengembangan. Kami memastikan fitur, akses, perangkat, dan dukungan untuk versi yang akan Anda gunakan. Rencana kami dapat berubah dan bukan janji tanggal rilis.'] },
      { heading: 'Sebelum menggunakan produk', paragraphs: ['Biaya, cakupan, penyiapan data, perangkat, dukungan, dan ketentuan penggunaan aplikasi disepakati sebelum penyiapan. Halaman ini tidak menggantikan kesepakatan tersebut.'] },
      { heading: 'Berjualan tanpa internet, dan pembayaran', paragraphs: ['Mencatat penjualan tanpa internet membutuhkan perangkat yang sudah disiapkan dan izin masuk yang masih berlaku. Pembayaran melalui penyedia lain, seperti QRIS dan kartu, membutuhkan internet dan konfirmasi dari penyedianya. Mencatat pembayaran tidak sama dengan konfirmasi dana diterima dari bank atau penyedia pembayaran.'] },
      { heading: 'Pratinjau dan data contoh', paragraphs: ['Layar bertanda “Data contoh” memakai angka rekaan. Pratinjau konsultasi AI memakai skrip dan data contoh untuk usaha fiktif; pratinjau ini menunjukkan cara kerja konsultasi dan bukan fitur yang sudah dirilis.'] },
    ],
  },
}

type Props = { params: { locale: string } }

export function generateMetadata({ params }: Props) {
  if (!isLocale(params.locale)) return {}
  const copy = content[params.locale]
  return pageMetadata({ locale: params.locale, path: '/terms', title: copy.title.replace(/\.$/, ''), description: copy.description })
}

export default function TermsPage({ params }: Props) {
  if (!isLocale(params.locale)) notFound()
  const copy = content[params.locale]
  return <LegalPage locale={params.locale} title={copy.title} intro={copy.intro} sections={copy.sections} />
}
