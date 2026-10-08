import type { Locale } from '@/i18n/config'
const numberLocale: Record<Locale, string> = { en: 'en-US', id: 'id-ID' }
/** Rupiah without a space, as merchants write it: Rp12.000.000 / Rp12,000,000. */
export function rupiah(value: number, locale: Locale) {
  const sign = value < 0 ? '−' : ''
  return `${sign}Rp${Math.abs(value).toLocaleString(numberLocale[locale])}`
}
export function signedRupiah(value: number, locale: Locale) {
  return value > 0 ? `+${rupiah(value, locale)}` : rupiah(value, locale)
}
/** Compact chart label: Rp12,0 jt / Rp12.0M. */
export function shortRupiah(value: number, locale: Locale) {
  const millions = value / 1_000_000
  if (Math.abs(millions) >= 1)
    return locale === 'id'
      ? `Rp${millions.toLocaleString('id-ID', { maximumFractionDigits: 1 })} jt`
      : `Rp${millions.toLocaleString('en-US', { maximumFractionDigits: 1 })}M`
  const thousands = value / 1000
  return locale === 'id'
    ? `Rp${thousands.toLocaleString('id-ID')} rb`
    : `Rp${thousands.toLocaleString('en-US')}K`
}
export function formatNumber(value: number, locale: Locale) {
  return value.toLocaleString(numberLocale[locale])
}
