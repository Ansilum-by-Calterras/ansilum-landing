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
  /** Founder-confirmed on 9 October 2026. */
  started: { iso: '2024-03', en: 'March 2024', id: 'Maret 2024' },
  productDomain: 'ansilum.com',
  url: publicUrl(configuredUrl)?.origin,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || undefined,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, '') || undefined,
  /** Founder-confirmed on 9 October 2026. */
  founder: process.env.NEXT_PUBLIC_FOUNDER_NAME || 'Saifulloh Fadli',
  founderProfile: publicUrl(process.env.NEXT_PUBLIC_FOUNDER_PROFILE)?.href,
  companyProfile: publicUrl(process.env.NEXT_PUBLIC_COMPANY_PROFILE)?.href,
  city: process.env.NEXT_PUBLIC_COMPANY_CITY || undefined,
  appUrl: publicUrl(process.env.NEXT_PUBLIC_APP_URL)?.href,
  analytics: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true',
}
