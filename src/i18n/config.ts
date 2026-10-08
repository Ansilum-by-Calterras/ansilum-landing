export const locales = ['id', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'id'
/** Remembers an explicit EN / ID choice; read by the middleware for unprefixed URLs. */
export const localeCookie = 'ansilum-locale'
export function isLocale(value: unknown): value is Locale {
  return locales.some((locale) => locale === value)
}
/** Builds a locale-prefixed path; `path` is the locale-neutral route such as `/about#team`. */
export function localePath(locale: Locale, path = '/') {
  if (path === '/' || path === '') return `/${locale}`
  return path.startsWith('/#') ? `/${locale}${path.slice(1)}` : `/${locale}${path}`
}
/** The same page in another language. Every public page exists in both locales. */
export function switchLocalePath(pathname: string, target: Locale) {
  const [, first, ...rest] = pathname.split('/')
  const remainder = isLocale(first) ? rest : [first, ...rest]
  const tail = remainder.filter(Boolean).join('/')
  return tail ? `/${target}/${tail}` : `/${target}`
}
export const localeNames: Record<Locale, { short: string; long: string }> = {
  id: { short: 'ID', long: 'Bahasa Indonesia' },
  en: { short: 'EN', long: 'English' },
}
export const htmlLang: Record<Locale, string> = { id: 'id', en: 'en' }
export const ogLocale: Record<Locale, string> = { id: 'id_ID', en: 'en_US' }
