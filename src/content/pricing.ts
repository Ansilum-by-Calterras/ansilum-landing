import type { Locale } from '@/i18n/config'

/**
 * Monthly plan prices from the Ansilum app's subscription screen (shared by the team on
 * 9 October 2026). Yearly prices are not published yet. The AI assistant will be billed separately
 * with pay-as-you-go credits; credit prices are announced at launch.
 */
export type PlanKey = 'basic' | 'standard' | 'full'
export type FeatureKey = 'pos' | 'inventory' | 'reports' | 'analytics' | 'sync' | 'opname' | 'po'

export const plans: { key: PlanKey; price: number; outlets: number | null; features: FeatureKey[] }[] = [
  { key: 'basic', price: 50_000, outlets: 1, features: ['pos'] },
  { key: 'standard', price: 200_000, outlets: 3, features: ['pos', 'inventory', 'reports'] },
  { key: 'full', price: 500_000, outlets: null, features: ['pos', 'inventory', 'reports', 'analytics', 'sync', 'opname', 'po'] },
]
export const featureOrder: FeatureKey[] = ['pos', 'inventory', 'reports', 'analytics', 'sync', 'opname', 'po']

const en = {
  perMonth: '/month',
  from: 'From',
  recommended: 'Recommended',
  outlets: (count: number | null) => (count === null ? 'Unlimited outlets' : count === 1 ? '1 outlet' : `${count} outlets`),
  unlimited: 'Unlimited',
  maxOutlets: 'Outlets',
  plans: {
    basic: { name: 'Basic', tagline: 'The cashier essentials to get started.', cta: 'Start with Basic' },
    standard: { name: 'Standard', tagline: 'For growing businesses that track stock and sales.', cta: 'Choose Standard' },
    full: { name: 'Full', tagline: 'Everything, for businesses with many outlets.', cta: 'Choose Full' },
  } as Record<PlanKey, { name: string; tagline: string; cta: string }>,
  features: {
    pos: 'Cashier app (POS)',
    inventory: 'Stock management',
    reports: 'Sales reports',
    analytics: 'Advanced reports & analytics',
    sync: 'Multi-outlet sync',
    opname: 'Stock taking (opname)',
    po: 'Purchase orders',
  } as Record<FeatureKey, string>,
  ai: {
    badge: 'Coming soon',
    heading: 'AI assistant: pay only for what you ask.',
    body: 'The AI assistant works with any plan. Top up credits and use them when you ask a question. No extra monthly fee, no commitment. We will announce credit prices when the assistant launches.',
    points: ['Works with Basic, Standard, and Full', 'Top up credits whenever you like', 'Only pay when you ask'],
    meter: 'Credits',
  },
  compare: 'Compare plans',
  feature: 'Feature',
  included: 'Included',
  notIncluded: 'Not included',
}

export type PricingContent = typeof en

const id: PricingContent = {
  perMonth: '/bulan',
  from: 'Mulai',
  recommended: 'Rekomendasi',
  outlets: (count) => (count === null ? 'Outlet tanpa batas' : `${count} outlet`),
  unlimited: 'Tanpa batas',
  maxOutlets: 'Jumlah outlet',
  plans: {
    basic: { name: 'Basic', tagline: 'Fitur kasir dasar untuk mulai berjualan.', cta: 'Mulai dengan Basic' },
    standard: { name: 'Standard', tagline: 'Untuk usaha yang berkembang, lengkap dengan stok dan laporan.', cta: 'Pilih Standard' },
    full: { name: 'Full', tagline: 'Semua fitur, untuk usaha dengan banyak outlet.', cta: 'Pilih Full' },
  },
  features: {
    pos: 'Aplikasi kasir (POS)',
    inventory: 'Manajemen stok',
    reports: 'Laporan penjualan',
    analytics: 'Laporan & analitik lanjutan',
    sync: 'Sinkron multi-outlet',
    opname: 'Stok opname',
    po: 'Purchase order (PO)',
  },
  ai: {
    badge: 'Segera hadir',
    heading: 'Asisten AI: bayar sesuai pemakaian.',
    body: 'Asisten AI bisa dipakai di paket mana pun. Isi kredit, lalu pakai saat Anda bertanya. Tanpa biaya bulanan tambahan, tanpa ikatan. Harga kredit kami umumkan saat asisten diluncurkan.',
    points: ['Bisa untuk Basic, Standard, dan Full', 'Isi ulang kredit kapan saja', 'Bayar hanya saat bertanya'],
    meter: 'Kredit',
  },
  compare: 'Bandingkan paket',
  feature: 'Fitur',
  included: 'Termasuk',
  notIncluded: 'Tidak termasuk',
}

export const pricingContent: Record<Locale, PricingContent> = { en, id }
