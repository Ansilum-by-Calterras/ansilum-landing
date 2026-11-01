import type { Locale } from '@/i18n/config'

/**
 * Plans as the Ansilum backend enforces them on 31 October 2026: prices from the plan table
 * (ansilum-be prisma/seed.ts), features and limits from TIER_FEATURES and TIER_LIMITS. The wording
 * follows the "Ansilum plans: what each tier includes" claims document; see docs/CLAIMS.md.
 * Business and outlet limits count everything one owner account owns. Yearly billing is 10% off
 * twelve months on Standard and Full (founder's decision, 31 October 2026; the plan table still has
 * to be updated to match); Basic is monthly only. The AI assistant is not live, so no plan claims it.
 */
export type PlanKey = 'basic' | 'standard' | 'full'
export type FeatureKey =
  | 'cashier'
  | 'bills'
  | 'pricing'
  | 'offline'
  | 'printing'
  | 'staff'
  | 'loyalty'
  | 'storefront'
  | 'queue'
  | 'dashboard'
  | 'liveOutlets'
  | 'catalog'
  | 'stock'
  | 'stockMovements'
  | 'cogs'
  | 'webOperations'
  | 'advancedReports'
  | 'outletCompare'
  | 'stockAnalytics'
  | 'appReports'

const basicFeatures: FeatureKey[] = [
  'cashier',
  'bills',
  'pricing',
  'offline',
  'printing',
  'staff',
  'loyalty',
  'storefront',
  'queue',
  'dashboard',
  'liveOutlets',
  'catalog',
]
const standardFeatures: FeatureKey[] = [...basicFeatures, 'stock', 'stockMovements', 'cogs', 'webOperations']
const fullFeatures: FeatureKey[] = [...standardFeatures, 'advancedReports', 'outletCompare', 'stockAnalytics', 'appReports']

export type Plan = {
  key: PlanKey
  price: number
  /** Price for a year paid at once; null when the plan is billed monthly only. */
  yearly: number | null
  businesses: number
  outlets: number
  features: FeatureKey[]
}

export const plans: Plan[] = [
  { key: 'basic', price: 50_000, yearly: null, businesses: 1, outlets: 1, features: basicFeatures },
  { key: 'standard', price: 99_000, yearly: 1_069_200, businesses: 2, outlets: 2, features: standardFeatures },
  { key: 'full', price: 199_000, yearly: 2_149_200, businesses: 5, outlets: 5, features: fullFeatures },
]

/** Whole-percent saving of the yearly price against twelve monthly payments. */
export function yearlyDiscount(plan: Plan) {
  return plan.yearly === null ? 0 : Math.round(100 - (plan.yearly * 100) / (plan.price * 12))
}
export const featureOrder: FeatureKey[] = fullFeatures

const en = {
  perMonth: '/month',
  perYear: '/year',
  from: 'From',
  recommended: 'Recommended',
  billing: { label: 'Billing period', monthly: 'Monthly', yearly: 'Yearly' },
  save: (percent: number) => `Save ${percent}%`,
  yearlyHint: (percent: number) => `Save ${percent}% when you pay yearly`,
  normally: 'Normally',
  monthlyOnly: 'Billed monthly',
  yearlyUnavailable: 'Monthly billing only',
  limits: (businesses: number, outlets: number) =>
    businesses === 1 && outlets === 1
      ? '1 business, 1 outlet'
      : `Up to ${businesses} businesses and ${outlets} outlets in total`,
  noLimit: 'No limit on staff, products or cashier devices',
  everythingIn: (plan: string) => `Everything in ${plan}`,
  plans: {
    basic: { name: 'Basic', tagline: 'A complete cashier for one business with one outlet.', cta: 'Start with Basic' },
    standard: { name: 'Standard', tagline: 'Adds stock, recipes and cost of goods, for up to 2 outlets.', cta: 'Choose Standard' },
    full: { name: 'Full', tagline: 'Adds profit, margin and stock analytics, for up to 5 outlets.', cta: 'Choose Full' },
  } as Record<PlanKey, { name: string; tagline: string; cta: string }>,
  features: {
    cashier: 'Cashier app with variants, modifiers, notes and custom items',
    bills: 'Open bills: pay later or in parts',
    pricing: 'Discounts, promotions, taxes and service charge',
    offline: 'Keep selling offline with cash or a confirmed transfer',
    printing: 'Receipts and kitchen tickets on Bluetooth, network or USB thermal printers (58 or 80 mm)',
    staff: 'Staff PIN sign-in, cashier shifts and cash drawer',
    loyalty: 'Customers, loyalty points and rewards',
    storefront: 'Online store: customers order ahead and pay at the cashier',
    queue: 'Order queue board on the cashier device',
    dashboard: 'Web sales dashboard for any date range',
    liveOutlets: 'Today’s cash in and out for each outlet, live',
    catalog: 'Manage products, categories, promotions and taxes on the web',
    stock: 'Ingredients and stock per outlet, deducted from recipes as you sell',
    stockMovements: 'Stock movement history and stock spending report',
    cogs: 'Cost of goods (HPP) per product',
    webOperations: 'Modifier groups, tables, reservations and transaction history on the web',
    advancedReports: 'Advanced sales reports: gross profit, margin and top products',
    outletCompare: 'Compare sales across outlets',
    stockAnalytics: 'Stock analytics: stock value, cost of goods per period, most-used ingredients',
    appReports: 'Reports tab in the cashier app',
  } as Record<FeatureKey, string>,
  notes: [
    'Limits count every business and outlet one owner account owns. Going over a limit deletes nothing; you just cannot add more until it fits.',
    'Profit and margin need product costs. Stock deducts only for products with a recipe.',
    'Pay for your plan by bank virtual account, GoPay, QRIS or credit card. Move up a plan at any time.',
  ],
  ai: {
    badge: 'In development',
    heading: 'The AI assistant is not available yet.',
    body: 'We are building an assistant that answers questions about your sales from your own cashier records. It is not part of any plan today. We will announce which plans include it, and what it costs, before it launches.',
    points: ['Answers from your own records', 'Ansilum does the maths', 'Plans and price announced at launch'],
    meter: 'In development',
  },
  compare: 'Compare plans',
  feature: 'Feature',
  rows: {
    monthly: 'Price per month',
    yearly: 'Price per year',
    businesses: 'Businesses per owner account',
    outlets: 'Outlets, in total',
    people: 'Staff, products and cashier devices',
  },
  notOffered: 'Monthly only',
  noLimitShort: 'No limit',
  included: 'Included',
  notIncluded: 'Not included',
}

export type PricingContent = typeof en

const id: PricingContent = {
  perMonth: '/bulan',
  perYear: '/tahun',
  from: 'Mulai',
  recommended: 'Rekomendasi',
  billing: { label: 'Periode tagihan', monthly: 'Bulanan', yearly: 'Tahunan' },
  save: (percent) => `Hemat ${percent}%`,
  yearlyHint: (percent) => `Hemat ${percent}% dengan bayar tahunan`,
  normally: 'Normalnya',
  monthlyOnly: 'Ditagih bulanan',
  yearlyUnavailable: 'Hanya tersedia bulanan',
  limits: (businesses, outlets) =>
    businesses === 1 && outlets === 1 ? '1 usaha, 1 outlet' : `Hingga ${businesses} usaha dan total ${outlets} outlet`,
  noLimit: 'Karyawan, produk dan perangkat kasir tidak dibatasi',
  everythingIn: (plan) => `Semua fitur ${plan}`,
  plans: {
    basic: { name: 'Basic', tagline: 'Kasir lengkap untuk satu usaha dengan satu outlet.', cta: 'Mulai dengan Basic' },
    standard: { name: 'Standard', tagline: 'Tambah stok, resep dan HPP, untuk hingga 2 outlet.', cta: 'Pilih Standard' },
    full: { name: 'Full', tagline: 'Tambah analitik laba, margin dan stok, untuk hingga 5 outlet.', cta: 'Pilih Full' },
  },
  features: {
    cashier: 'Aplikasi kasir dengan varian, modifier, catatan dan item custom',
    bills: 'Tagihan terbuka: bayar nanti atau bayar sebagian',
    pricing: 'Diskon, promo, pajak dan biaya layanan',
    offline: 'Tetap jualan saat internet mati, dengan tunai atau transfer terkonfirmasi',
    printing: 'Struk dan tiket dapur ke printer thermal Bluetooth, jaringan atau USB (58 atau 80 mm)',
    staff: 'Login karyawan dengan PIN, shift kasir dan laci kas',
    loyalty: 'Pelanggan, poin loyalitas dan hadiah',
    storefront: 'Toko online: pelanggan pesan dulu, bayar di kasir',
    queue: 'Papan antrean pesanan di perangkat kasir',
    dashboard: 'Dasbor penjualan web per periode',
    liveOutlets: 'Kas masuk dan keluar tiap outlet hari ini, langsung',
    catalog: 'Kelola produk, kategori, promo dan pajak dari web',
    stock: 'Bahan baku dan stok per outlet, berkurang otomatis dari resep saat terjual',
    stockMovements: 'Riwayat keluar-masuk stok dan laporan pengeluaran stok',
    cogs: 'HPP (harga pokok) per produk',
    webOperations: 'Kelompok modifier, meja, reservasi dan riwayat transaksi di web',
    advancedReports: 'Laporan penjualan lanjutan: laba kotor, margin dan produk terlaris',
    outletCompare: 'Bandingkan penjualan antar outlet',
    stockAnalytics: 'Analitik stok: nilai stok, HPP per periode, bahan paling terpakai',
    appReports: 'Tab Laporan di aplikasi kasir',
  },
  notes: [
    'Batas dihitung dari semua usaha dan outlet milik satu akun pemilik. Melewati batas tidak menghapus apa pun; Anda hanya belum bisa menambah sampai jumlahnya sesuai paket.',
    'Laba dan margin membutuhkan harga pokok produk. Stok berkurang otomatis hanya untuk produk yang punya resep.',
    'Bayar paket lewat virtual account bank, GoPay, QRIS atau kartu kredit. Naik paket kapan saja.',
  ],
  ai: {
    badge: 'Dalam pengembangan',
    heading: 'Asisten AI belum tersedia.',
    body: 'Kami sedang membangun asisten yang menjawab pertanyaan soal penjualan dari catatan kasir Anda sendiri. Saat ini asisten belum termasuk dalam paket mana pun. Paket yang mendapatkannya dan harganya kami umumkan sebelum diluncurkan.',
    points: ['Menjawab dari catatan Anda sendiri', 'Ansilum yang menghitung', 'Paket dan harga diumumkan saat peluncuran'],
    meter: 'Dalam pengembangan',
  },
  compare: 'Bandingkan paket',
  feature: 'Fitur',
  rows: {
    monthly: 'Harga per bulan',
    yearly: 'Harga per tahun',
    businesses: 'Usaha per akun pemilik',
    outlets: 'Total outlet',
    people: 'Karyawan, produk dan perangkat kasir',
  },
  notOffered: 'Hanya bulanan',
  noLimitShort: 'Tidak dibatasi',
  included: 'Termasuk',
  notIncluded: 'Tidak termasuk',
}

export const pricingContent: Record<Locale, PricingContent> = { en, id }
