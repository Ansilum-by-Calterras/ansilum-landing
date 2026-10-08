/** Only confirmed public facts belong here. Missing facts are omitted from the UI. */
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL
function publicUrl(value: string | undefined) {
  if (!value) return undefined
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
      ? url
      : undefined
  } catch {
    return undefined
  }
}
export const siteConfig = {
  name: 'Ansilum',
  company: 'Calterras',
  description:
    'POS Early Beta untuk kafe dan restoran Indonesia, dengan pendekatan offline-first dan fokus pada visibilitas operasional.',
  url: publicUrl(configuredUrl)?.origin,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || undefined,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, '') || undefined,
  founder: process.env.NEXT_PUBLIC_FOUNDER_NAME || undefined,
  founderProfile: publicUrl(process.env.NEXT_PUBLIC_FOUNDER_PROFILE)?.href,
  companyProfile: publicUrl(process.env.NEXT_PUBLIC_COMPANY_PROFILE)?.href,
  city: process.env.NEXT_PUBLIC_COMPANY_CITY || undefined,
  since: process.env.NEXT_PUBLIC_COMPANY_SINCE || undefined,
  appUrl: publicUrl(process.env.NEXT_PUBLIC_APP_URL)?.href,
  analytics: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true',
}
export const contactConfig = { email: siteConfig.email }
export const navigation = [
  { name: 'Produk', href: '/products/ansilum' },
  { name: 'Cara kerja', href: '/#cara-kerja' },
  { name: 'Status produk', href: '/#status-produk' },
  { name: 'Tentang Calterras', href: '/about' },
]
