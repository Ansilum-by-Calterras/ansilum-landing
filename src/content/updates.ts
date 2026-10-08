import type { Locale } from '@/i18n/config'

/**
 * Dated build history. Add entries only with a real date and evidence; never invent release dates.
 * `href` values are locale-neutral paths; `source` names evidence that is not a public page.
 */
export type UpdateStatus = 'origin' | 'released' | 'in-development'
export type UpdateEntry = {
  date?: string
  status: UpdateStatus
  title: Record<Locale, string>
  body: Record<Locale, string>
  evidence?: { href?: string; label: Record<Locale, string> }
}

export const updates: UpdateEntry[] = [
  {
    status: 'in-development',
    title: {
      en: 'The Ansilum AI assistant',
      id: 'Asisten AI Ansilum',
    },
    body: {
      en: 'Owners ask about their sales in everyday words and get answers with the numbers behind them. Ansilum does the maths; Claude explains the result. We are building it now.',
      id: 'Pemilik usaha bertanya soal penjualan dengan bahasa sehari-hari dan mendapat jawaban lengkap dengan angkanya. Ansilum menghitung angkanya; Claude menjelaskan hasilnya. Sedang kami bangun sekarang.',
    },
    evidence: { href: '/product#claude', label: { en: 'How it works', id: 'Cara kerjanya' } },
  },
  {
    date: '2026-10-09',
    status: 'released',
    title: {
      en: 'New website in English and Indonesian, with a live example of the assistant',
      id: 'Website baru dalam bahasa Indonesia dan Inggris, dengan contoh asisten yang bisa dicoba',
    },
    body: {
      en: 'Every page is now in both languages. The homepage lets you try the assistant on a sample coffee shop, with charts, numbers, and a checklist.',
      id: 'Semua halaman kini tersedia dalam dua bahasa. Di beranda, Anda bisa mencoba asisten dengan data kedai kopi contoh, lengkap dengan grafik, angka, dan daftar cek.',
    },
    evidence: { href: '/#demo', label: { en: 'Try the example', id: 'Coba contohnya' } },
  },
  {
    date: '2026-10-08',
    status: 'released',
    title: {
      en: 'Sales summary screens published from the cashier app',
      id: 'Layar ringkasan penjualan dari aplikasi kasir dipublikasikan',
    },
    body: {
      en: 'We captured the cashier app’s sales summary, running with sample data, and published the screens without retouching. The same day, the website gained a demo request form.',
      id: 'Kami mengambil tangkapan layar ringkasan penjualan aplikasi kasir yang berjalan dengan data contoh, lalu menampilkannya tanpa diedit. Pada hari yang sama, website mendapatkan formulir permintaan demo.',
    },
    evidence: { href: '/product#foundation', label: { en: 'See the screens', id: 'Lihat layarnya' } },
  },
  {
    date: '2024-12-20',
    status: 'released',
    title: { en: 'First Ansilum website', id: 'Website Ansilum pertama' },
    body: {
      en: 'Work on the public Ansilum website began.',
      id: 'Pengerjaan website publik Ansilum dimulai.',
    },
    evidence: {
      label: {
        en: 'Source: first commit in the website repository, 20 December 2024',
        id: 'Sumber: commit pertama di repositori website, 20 Desember 2024',
      },
    },
  },
  {
    date: '2024-03',
    status: 'origin',
    title: { en: 'Ansilum starts', id: 'Ansilum dimulai' },
    body: {
      en: 'Ansilum begins as a cashier app for Indonesian businesses, built by Calterras.',
      id: 'Ansilum dimulai sebagai aplikasi kasir untuk usaha di Indonesia, dikembangkan oleh Calterras.',
    },
    evidence: { href: '/about', label: { en: 'Read our story', id: 'Baca cerita kami' } },
  },
]

const months: Record<Locale, string[]> = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  id: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
}
/** `2026-10-09` → `9 October 2026`; `2024-03` → `March 2024`. */
export function formatUpdateDate(date: string, locale: Locale) {
  const [year, month, day] = date.split('-')
  const name = months[locale][Number(month) - 1]
  return day ? `${Number(day)} ${name} ${year}` : `${name} ${year}`
}
