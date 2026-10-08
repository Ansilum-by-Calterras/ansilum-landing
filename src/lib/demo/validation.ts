export const businessTypes = [
  'Kafe / kedai kopi',
  'Restoran',
  'Usaha F&B lain',
] as const
export const outletCounts = ['1', '2–5', 'Lebih dari 5'] as const
export const challenges = [
  'Koneksi / kasir',
  'Laporan',
  'Stok / biaya',
  'Lainnya',
] as const
export type DemoRequest = {
  requestId: string
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
    return { errors: { form: 'Periksa kembali data formulir.' } }
  const raw = input as Record<string, unknown>
  const clean = (key: string) =>
    typeof raw[key] === 'string' ? (raw[key] as string).trim() : ''
  const errors: FieldErrors = {}
  const name = clean('name'),
    business = clean('business'),
    city = clean('city'),
    notes = clean('notes')
  for (const [key, value, label] of [
    ['name', name, 'nama Anda'],
    ['business', business, 'nama usaha'],
    ['city', city, 'kota'],
  ]) {
    if (value.length < 2 || value.length > 120)
      errors[key] = `Isi ${label} dengan 2–120 karakter.`
  }
  const businessType = clean('businessType'),
    outlets = clean('outlets'),
    challenge = clean('challenge'),
    contactMethod = clean('contactMethod')
  if (!businessTypes.some((value) => value === businessType))
    errors.businessType = 'Pilih jenis usaha Anda.'
  if (!outletCounts.some((value) => value === outlets))
    errors.outlets = 'Pilih jumlah outlet.'
  if (!challenges.some((value) => value === challenge))
    errors.challenge = 'Pilih kendala utama.'
  if (!['email', 'whatsapp'].includes(contactMethod))
    errors.contactMethod = 'Pilih cara dihubungi.'
  let contact = clean('contact')
  if (contactMethod === 'email') {
    if (contact.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact))
      errors.contact = 'Masukkan alamat email yang dapat dihubungi.'
  } else if (contactMethod === 'whatsapp') {
    contact = contact.replace(/[\s()-]/g, '')
    if (contact.startsWith('08')) contact = '+62' + contact.slice(1)
    else if (contact.startsWith('62')) contact = '+' + contact
    if (!/^\+[1-9]\d{7,14}$/.test(contact))
      errors.contact =
        'Masukkan nomor WhatsApp dengan kode negara, misalnya +6281234567890.'
  }
  if (notes.length > 1200)
    errors.notes = 'Batasi catatan hingga 1.200 karakter.'
  if (raw.consent !== true)
    errors.consent =
      'Persetujuan dihubungi diperlukan untuk mengirim permintaan.'
  const requestId = clean('requestId')
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      requestId,
    )
  )
    errors.form = 'Muat ulang halaman, lalu coba lagi.'
  if (Object.keys(errors).length) return { errors }
  return {
    errors,
    data: {
      requestId,
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
