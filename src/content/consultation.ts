import type { Locale } from '@/i18n/config'

/**
 * Invented demo data for a fictional coffee shop (brief §7). Never attach these figures to a named
 * customer. Weekly totals are derived from the daily and product rows; tests/consultation.test.cjs
 * checks them against the figures quoted in the scripted answers.
 */
export const periods = {
  previous: { start: '2026-09-21', end: '2026-09-27' },
  current: { start: '2026-09-28', end: '2026-10-04' },
}

export type DayRecord = {
  date: string
  orders: number
  sales: number
  coffee: number
}

/** Monday to Sunday. `other` sales are `sales - coffee`. */
export const daily: { previous: DayRecord; current: DayRecord }[] = [
  {
    previous: { date: '2026-09-21', orders: 52, sales: 1_550_000, coffee: 900_000 },
    current: { date: '2026-09-28', orders: 51, sales: 1_520_000, coffee: 880_000 },
  },
  {
    previous: { date: '2026-09-22', orders: 55, sales: 1_650_000, coffee: 950_000 },
    current: { date: '2026-09-29', orders: 40, sales: 1_200_000, coffee: 520_000 },
  },
  {
    previous: { date: '2026-09-23', orders: 55, sales: 1_650_000, coffee: 950_000 },
    current: { date: '2026-09-30', orders: 39, sales: 1_160_000, coffee: 480_000 },
  },
  {
    previous: { date: '2026-09-24', orders: 57, sales: 1_700_000, coffee: 1_000_000 },
    current: { date: '2026-10-01', orders: 56, sales: 1_670_000, coffee: 980_000 },
  },
  {
    previous: { date: '2026-09-25', orders: 60, sales: 1_800_000, coffee: 1_050_000 },
    current: { date: '2026-10-02', orders: 59, sales: 1_770_000, coffee: 1_050_000 },
  },
  {
    previous: { date: '2026-09-26', orders: 62, sales: 1_850_000, coffee: 1_100_000 },
    current: { date: '2026-10-03', orders: 60, sales: 1_780_000, coffee: 1_080_000 },
  },
  {
    previous: { date: '2026-09-27', orders: 59, sales: 1_800_000, coffee: 1_050_000 },
    current: { date: '2026-10-04', orders: 55, sales: 1_700_000, coffee: 1_010_000 },
  },
]

export type ProductRecord = {
  key: string
  name: string
  category: 'coffee' | 'other'
  previous: number
  current: number
}

/** Product names stay in Indonesian in both languages, as they appear on the menu. */
export const products: ProductRecord[] = [
  { key: 'es-kopi-susu', name: 'Es kopi susu', category: 'coffee', previous: 3_600_000, current: 2_800_000 },
  { key: 'americano', name: 'Americano', category: 'coffee', previous: 1_400_000, current: 1_300_000 },
  { key: 'cappuccino', name: 'Cappuccino', category: 'coffee', previous: 1_200_000, current: 1_150_000 },
  { key: 'kopi-tubruk', name: 'Kopi tubruk', category: 'coffee', previous: 800_000, current: 750_000 },
  { key: 'roti-bakar', name: 'Roti bakar', category: 'other', previous: 1_800_000, current: 1_750_000 },
  { key: 'es-teh', name: 'Es teh', category: 'other', previous: 1_200_000, current: 1_100_000 },
  { key: 'pisang-goreng', name: 'Pisang goreng', category: 'other', previous: 1_000_000, current: 950_000 },
  { key: 'air-mineral', name: 'Air mineral', category: 'other', previous: 1_000_000, current: 1_000_000 },
]

const sum = (values: number[]) => values.reduce((total, value) => total + value, 0)
function weekTotals(week: 'previous' | 'current') {
  const rows = daily.map((day) => day[week])
  const sales = sum(rows.map((row) => row.sales))
  const orders = sum(rows.map((row) => row.orders))
  const coffee = sum(rows.map((row) => row.coffee))
  return { sales, orders, coffee, other: sales - coffee, average: sales / orders }
}
export const totals = {
  previous: weekTotals('previous'),
  current: weekTotals('current'),
}

/** A sentence fragment that highlights a chart series when selected. */
export type Segment = string | { text: string; series: string }
export type QuestionKey = 'weekly' | 'products' | 'daily'

const en = {
  business: 'Ansilum Cafe',
  period: '28 Sep – 4 Oct 2026',
  compared: 'Compared with 21–27 Sep',
  assistant: 'Ansilum',
  you: 'You',
  suggestionsLabel: 'Ask Ansilum',
  composerPlaceholder: 'Ask about your sales…',
  viewLabel: 'Show as',
  chart: 'Chart',
  table: 'Numbers',
  nextLabel: 'What to check next',
  lastWeek: 'Last week',
  thisWeek: 'This week',
  coffee: 'Coffee',
  other: 'Other',
  total: 'Total',
  orders: 'Orders',
  average: 'Average spend per order',
  change: 'Change',
  item: 'Item',
  unchanged: 'Same',
  dayShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  dayLong: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  month: { '09': 'Sep', '10': 'Oct' } as Record<string, string>,
  questions: {
    weekly: {
      label: 'What changed in my sales this week?',
      chartTitle: 'Sales this week vs last week',
      answer: [
        [
          { text: 'Sales this week were Rp10,800,000, down 10% from Rp12,000,000.', series: 'total' },
          ' ',
          {
            text: 'You had 40 fewer orders, but the average spend per order stayed at Rp30,000.',
            series: 'orders',
          },
          ' ',
          { text: 'Coffee made up most of the drop: Rp1,000,000 of Rp1,200,000.', series: 'coffee' },
        ],
        ['Customers spent the same each visit; there were just fewer orders. Start with coffee, day by day.'],
      ] as Segment[][],
      next: ['Check coffee sales on Tuesday and Wednesday', 'Make sure every coffee drink was available each day'],
    },
    products: {
      label: 'Which product dropped the most?',
      chartTitle: 'Change in sales by product',
      answer: [
        [
          {
            text: 'Es kopi susu dropped the most: from Rp3,600,000 to Rp2,800,000.',
            series: 'es-kopi-susu',
          },
          ' That is Rp800,000 of the Rp1,000,000 coffee drop. ',
          { text: 'Americano and es teh each fell Rp100,000.', series: 'americano es-teh' },
          ' ',
          { text: 'Air mineral stayed at Rp1,000,000.', series: 'air-mineral' },
        ],
        ['Es kopi susu is still your best seller, so it matters most. Look at it first.'],
      ] as Segment[][],
      next: ['Check that es kopi susu ingredients were in stock every day', 'Compare es kopi susu orders day by day'],
    },
    daily: {
      label: 'Which days were slower?',
      chartTitle: 'Sales by day',
      answer: [
        [
          'Tuesday and Wednesday were the slow days. ',
          {
            text: 'Tuesday fell from Rp1,650,000 to Rp1,200,000, and Wednesday from Rp1,650,000 to Rp1,160,000.',
            series: 'tue wed',
          },
          ' Those two days make up Rp940,000 of the Rp1,200,000 drop. ',
          {
            text: 'Every other day stayed close to last week, within Rp100,000.',
            series: 'mon thu fri sat sun',
          },
        ],
        ['Coffee sales on those two days fell Rp900,000. That is the place to look.'],
      ] as Segment[][],
      next: [
        'Ask your cashier what was different on Tuesday 29 and Wednesday 30 September',
        'Check whether any coffee drink sold out on those days',
      ],
    },
  },
}

export type ConsultationContent = typeof en

const id: ConsultationContent = {
  business: 'Cafe Ansilum',
  period: '28 Sep – 4 Okt 2026',
  compared: 'Dibanding 21–27 Sep',
  assistant: 'Ansilum',
  you: 'Anda',
  suggestionsLabel: 'Tanya Ansilum',
  composerPlaceholder: 'Tanya soal penjualan Anda…',
  viewLabel: 'Tampilkan',
  chart: 'Grafik',
  table: 'Angka',
  nextLabel: 'Yang perlu dicek',
  lastWeek: 'Minggu lalu',
  thisWeek: 'Minggu ini',
  coffee: 'Kopi',
  other: 'Lainnya',
  total: 'Total',
  orders: 'Pesanan',
  average: 'Rata-rata belanja per pesanan',
  change: 'Selisih',
  item: 'Menu',
  unchanged: 'Tetap',
  dayShort: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
  dayLong: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
  month: { '09': 'Sep', '10': 'Okt' },
  questions: {
    weekly: {
      label: 'Apa yang berubah dari penjualan minggu ini?',
      chartTitle: 'Penjualan minggu ini vs minggu lalu',
      answer: [
        [
          { text: 'Penjualan minggu ini Rp10.800.000, turun 10% dari Rp12.000.000.', series: 'total' },
          ' ',
          {
            text: 'Ada 40 pesanan lebih sedikit, tapi rata-rata belanja per pesanan tetap Rp30.000.',
            series: 'orders',
          },
          ' ',
          { text: 'Penurunan terbesar dari kopi: Rp1.000.000 dari total Rp1.200.000.', series: 'coffee' },
        ],
        ['Pelanggan belanja dengan nominal yang sama, hanya jumlah pesanannya yang berkurang. Mulai dari kopi, hari per hari.'],
      ],
      next: ['Cek penjualan kopi hari Selasa dan Rabu', 'Pastikan semua menu kopi tersedia setiap hari'],
    },
    products: {
      label: 'Menu apa yang paling turun?',
      chartTitle: 'Selisih penjualan per menu',
      answer: [
        [
          {
            text: 'Es kopi susu turun paling banyak: dari Rp3.600.000 menjadi Rp2.800.000.',
            series: 'es-kopi-susu',
          },
          ' Itu Rp800.000 dari penurunan kopi sebesar Rp1.000.000. ',
          { text: 'Americano dan es teh masing-masing turun Rp100.000.', series: 'americano es-teh' },
          ' ',
          { text: 'Air mineral tetap Rp1.000.000.', series: 'air-mineral' },
        ],
        ['Es kopi susu masih menu terlaris Anda, jadi ini yang paling penting. Cek ini dulu.'],
      ],
      next: ['Cek apakah bahan es kopi susu selalu tersedia', 'Bandingkan pesanan es kopi susu per hari'],
    },
    daily: {
      label: 'Hari apa penjualannya turun?',
      chartTitle: 'Penjualan per hari',
      answer: [
        [
          'Selasa dan Rabu paling sepi. ',
          {
            text: 'Selasa turun dari Rp1.650.000 ke Rp1.200.000, dan Rabu dari Rp1.650.000 ke Rp1.160.000.',
            series: 'tue wed',
          },
          ' Dua hari itu menyumbang Rp940.000 dari penurunan Rp1.200.000. ',
          {
            text: 'Hari lainnya mirip minggu lalu, selisihnya tidak lebih dari Rp100.000.',
            series: 'mon thu fri sat sun',
          },
        ],
        ['Penjualan kopi di dua hari itu turun Rp900.000. Di situ yang perlu dicek.'],
      ],
      next: [
        'Tanyakan ke kasir apa yang berbeda pada Selasa 29 dan Rabu 30 September',
        'Cek apakah ada menu kopi yang habis di dua hari itu',
      ],
    },
  },
}

export const consultationContent: Record<Locale, ConsultationContent> = { en, id }

/** `2026-09-29` → `Tue 29 Sep` / `Sel 29 Sep`. */
export function dayLabel(date: string, index: number, locale: Locale, long = false) {
  const copy = consultationContent[locale]
  const [, month, day] = date.split('-')
  const name = long ? copy.dayLong[index] : copy.dayShort[index]
  return `${name} ${Number(day)} ${copy.month[month]}`
}
export const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
