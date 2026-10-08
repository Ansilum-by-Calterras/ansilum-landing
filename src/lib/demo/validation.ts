/** Option values are stable keys; labels live in `demoOptionLabels` so both languages store the same data. */
export const businessTypes = ['coffee', 'barber', 'food', 'other'] as const
export const outletCounts = ['1', '2-5', '6+'] as const
export const challenges = ['understand-sales', 'checkout', 'ai', 'other'] as const
export const demoLocales = ['id', 'en'] as const
type DemoLocale = (typeof demoLocales)[number]

export const demoOptionLabels: Record<
  DemoLocale,
  {
    businessType: Record<(typeof businessTypes)[number], string>
    outlets: Record<(typeof outletCounts)[number], string>
    challenge: Record<(typeof challenges)[number], string>
  }
> = {
  en: {
    businessType: { coffee: 'Coffee shop', barber: 'Barbershop', food: 'Food business', other: 'Another everyday business' },
    outlets: { '1': '1', '2-5': '2–5', '6+': 'More than 5' },
    challenge: {
      'understand-sales': 'Understanding my sales',
      checkout: 'Recording sales at the counter',
      ai: 'Using AI for my business',
      other: 'Something else',
    },
  },
  id: {
    businessType: { coffee: 'Kedai kopi', barber: 'Barbershop', food: 'Usaha makanan', other: 'Usaha sehari-hari lainnya' },
    outlets: { '1': '1', '2-5': '2–5', '6+': 'Lebih dari 5' },
    challenge: {
      'understand-sales': 'Memahami penjualan',
      checkout: 'Mencatat penjualan di kasir',
      ai: 'Memakai AI untuk usaha',
      other: 'Hal lain',
    },
  },
}

const messages: Record<DemoLocale, Record<string, string>> = {
  en: {
    form: 'Please check the form and try again.',
    reload: 'Reload the page, then try again.',
    name: 'Enter your name using 2–120 characters.',
    business: 'Enter your business name using 2–120 characters.',
    city: 'Enter your city using 2–120 characters.',
    businessType: 'Choose your type of business.',
    outlets: 'Choose the number of outlets.',
    challenge: 'Choose what you want help with.',
    contactMethod: 'Choose how we should contact you.',
    email: 'Enter an email address we can reach.',
    whatsapp: 'Enter a WhatsApp number with its country code, for example +6281234567890.',
    notes: 'Keep notes under 1,200 characters.',
    consent: 'Please agree to be contacted so we can send your request.',
  },
  id: {
    form: 'Periksa kembali data formulir.',
    reload: 'Muat ulang halaman, lalu coba lagi.',
    name: 'Isi nama Anda dengan 2–120 karakter.',
    business: 'Isi nama usaha dengan 2–120 karakter.',
    city: 'Isi kota dengan 2–120 karakter.',
    businessType: 'Pilih jenis usaha Anda.',
    outlets: 'Pilih jumlah outlet.',
    challenge: 'Pilih kebutuhan utama Anda.',
    contactMethod: 'Pilih cara dihubungi.',
    email: 'Masukkan alamat email yang dapat dihubungi.',
    whatsapp: 'Masukkan nomor WhatsApp dengan kode negara, misalnya +6281234567890.',
    notes: 'Batasi catatan hingga 1.200 karakter.',
    consent: 'Persetujuan dihubungi diperlukan untuk mengirim permintaan.',
  },
}

export type DemoRequest = {
  requestId: string
  locale: DemoLocale
  name: string
  business: string
  businessType: string
  outlets: string
  city: string
  contactMethod: 'email' | 'whatsapp'
  contact: string
  challenge: string
  notes: string
  consent: true
}
export type FieldErrors = Record<string, string>

export function validateDemo(input: unknown): {
  data?: DemoRequest
  errors: FieldErrors
} {
  if (!input || typeof input !== 'object' || Array.isArray(input))
    return { errors: { form: messages.id.form } }
  const raw = input as Record<string, unknown>
  const clean = (key: string) => (typeof raw[key] === 'string' ? (raw[key] as string).trim() : '')
  const locale: DemoLocale = clean('locale') === 'en' ? 'en' : 'id'
  const text = messages[locale]
  const errors: FieldErrors = {}
  const name = clean('name'),
    business = clean('business'),
    city = clean('city'),
    notes = clean('notes')
  for (const [key, value] of [
    ['name', name],
    ['business', business],
    ['city', city],
  ]) {
    if (value.length < 2 || value.length > 120) errors[key] = text[key]
  }
  const businessType = clean('businessType'),
    outlets = clean('outlets'),
    challenge = clean('challenge'),
    contactMethod = clean('contactMethod')
  if (!businessTypes.some((value) => value === businessType)) errors.businessType = text.businessType
  if (!outletCounts.some((value) => value === outlets)) errors.outlets = text.outlets
  if (!challenges.some((value) => value === challenge)) errors.challenge = text.challenge
  if (!['email', 'whatsapp'].includes(contactMethod)) errors.contactMethod = text.contactMethod
  let contact = clean('contact')
  if (contactMethod === 'email') {
    if (contact.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) errors.contact = text.email
  } else if (contactMethod === 'whatsapp') {
    contact = contact.replace(/[\s()-]/g, '')
    if (contact.startsWith('08')) contact = '+62' + contact.slice(1)
    else if (contact.startsWith('62')) contact = '+' + contact
    if (!/^\+[1-9]\d{7,14}$/.test(contact)) errors.contact = text.whatsapp
  }
  if (notes.length > 1200) errors.notes = text.notes
  if (raw.consent !== true) errors.consent = text.consent
  const requestId = clean('requestId')
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId))
    errors.form = text.reload
  if (Object.keys(errors).length) return { errors }
  return {
    errors,
    data: {
      requestId,
      locale,
      name,
      business,
      businessType,
      outlets,
      city,
      contactMethod: contactMethod as 'email' | 'whatsapp',
      contact,
      challenge,
      notes,
      consent: true,
    },
  }
}
