'use client'
import { siteConfig } from '@/config/site'
import { localePath, type Locale } from '@/i18n/config'
import {
  businessTypes,
  challenges,
  demoOptionLabels,
  outletCounts,
  validateDemo,
  type FieldErrors,
} from '@/lib/demo/validation'
import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { trackEvent } from './analytics'

const copy = {
  en: {
    legend: 'Your business and contact details',
    name: 'Your name',
    business: 'Business name',
    businessType: 'Type of business',
    businessTypePlaceholder: 'Choose a type',
    outlets: 'Number of outlets',
    outletsPlaceholder: 'Choose a number',
    city: 'City',
    challenge: 'What do you want help with?',
    challengePlaceholder: 'Choose one',
    contactMethod: 'How should we contact you?',
    email: 'Email address',
    whatsapp: 'WhatsApp number',
    contactHelp: 'One way to reach you is enough.',
    notes: 'Tell us more',
    optional: '(optional)',
    notesHelp: 'Please do not include customer details or transaction records.',
    consent: 'I agree to be contacted by Calterras about this demo request.',
    privacy: 'Privacy',
    submit: 'Request a demo',
    sending: 'Sending your request…',
    waiting: 'Waiting for confirmation that your request is saved.',
    retryNote: 'Sending again checks the same request. Your details are kept to prevent duplicates.',
    idle: 'This does not create an account or start a subscription.',
    checkFields: 'Please check the highlighted fields before sending.',
    notSent: 'Your request was not sent. Please try again.',
    unconfirmed: 'We have not received confirmation yet. Press send again to check the same request without creating a duplicate.',
    acceptedTitle: 'Your demo request is in.',
    acceptedBody: 'Thank you. Your request is saved. Calterras will use the contact you gave us to talk about your business and arrange the demo.',
    reference: 'Reference number',
    acceptedNote: 'This is not yet a confirmed appointment or a subscription.',
    fix: 'Need to correct something?',
    contactUs: 'Email',
    back: 'Back to the product',
  },
  id: {
    legend: 'Informasi usaha dan kontak',
    name: 'Nama Anda',
    business: 'Nama usaha',
    businessType: 'Jenis usaha',
    businessTypePlaceholder: 'Pilih jenis usaha',
    outlets: 'Jumlah outlet',
    outletsPlaceholder: 'Pilih jumlah outlet',
    city: 'Kota',
    challenge: 'Apa yang ingin Anda bahas?',
    challengePlaceholder: 'Pilih salah satu',
    contactMethod: 'Cara dihubungi',
    email: 'Alamat email',
    whatsapp: 'Nomor WhatsApp',
    contactHelp: 'Cukup satu kontak yang dapat dihubungi.',
    notes: 'Ceritakan lebih lanjut',
    optional: '(opsional)',
    notesHelp: 'Tidak perlu mengirim data pelanggan atau catatan transaksi.',
    consent: 'Saya bersedia dihubungi Calterras terkait permintaan demo ini.',
    privacy: 'Privasi',
    submit: 'Minta demo',
    sending: 'Mengirim permintaan…',
    waiting: 'Menunggu konfirmasi penyimpanan.',
    retryNote: 'Kirim ulang memeriksa permintaan yang sama. Data dipertahankan untuk mencegah duplikat.',
    idle: 'Tidak membuat akun atau memulai langganan.',
    checkFields: 'Periksa kolom yang ditandai sebelum mengirim.',
    notSent: 'Permintaan belum terkirim. Coba lagi.',
    unconfirmed: 'Konfirmasi belum diterima. Tekan kirim lagi untuk memeriksa permintaan yang sama tanpa membuat duplikat.',
    acceptedTitle: 'Permintaan demo diterima.',
    acceptedBody: 'Terima kasih. Permintaan Anda sudah tersimpan. Calterras akan memakai kontak yang Anda berikan untuk membahas usaha Anda dan mengatur jadwal demo.',
    reference: 'Nomor referensi',
    acceptedNote: 'Permintaan ini belum merupakan konfirmasi jadwal atau langganan.',
    fix: 'Perlu memperbaiki informasi?',
    contactUs: 'Hubungi',
    back: 'Kembali ke halaman produk',
  },
}

export function DemoForm({ locale }: { locale: Locale }) {
  const text = copy[locale]
  const labels = demoOptionLabels[locale]
  const [contactMethod, setContactMethod] = useState('whatsapp')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [message, setMessage] = useState('')
  const [pending, setPending] = useState(false)
  const [accepted, setAccepted] = useState<string>()
  const requestId = useRef<string>()
  const started = useRef(false)
  const busy = useRef(false)
  const retryPayload = useRef<Record<string, unknown>>()
  const errorSummary = useRef<HTMLDivElement>(null)
  const successHeading = useRef<HTMLHeadingElement>(null)
  function showErrors(fields: FieldErrors, value: string) {
    setErrors(fields)
    setMessage(value)
    window.setTimeout(() => errorSummary.current?.focus(), 0)
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy.current) return
    const form = new FormData(event.currentTarget)
    requestId.current ||= crypto.randomUUID()
    const candidate = {
      ...Object.fromEntries(form),
      locale,
      requestId: requestId.current,
      consent: form.get('consent') === 'on',
    }
    // A failed transport may have committed: retry the same immutable request before allowing a new submission.
    const payload = retryPayload.current || candidate
    const result = validateDemo(payload)
    if (!result.data) {
      showErrors(result.errors, text.checkFields)
      return
    }
    busy.current = true
    setPending(true)
    setMessage('')
    setErrors({})
    retryPayload.current = payload
    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Ansilum-Locale': locale },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      })
      const body = await res.json()
      if (!res.ok || body.accepted !== true || body.requestId !== requestId.current) {
        if (res.status === 422) retryPayload.current = undefined
        showErrors(body.errors || {}, body.error || text.notSent)
        trackEvent('demo_request_failed', { reason: `http_${res.status}` })
        return
      }
      setAccepted(body.requestId)
      trackEvent('demo_request_accepted', { request_id: body.requestId })
      window.setTimeout(() => successHeading.current?.focus(), 0)
    } catch {
      showErrors({}, text.unconfirmed)
      trackEvent('demo_request_failed', { reason: 'network' })
    } finally {
      setPending(false)
      busy.current = false
    }
  }
  const error = (name: string) =>
    errors[name] ? (
      <p id={`${name}-error`} className="mt-2 text-sm leading-6 text-brand-ink">
        {errors[name]}
      </p>
    ) : null
  const attrs = (name: string) => ({
    id: name,
    name,
    'aria-invalid': !!errors[name] as boolean,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })
  if (accepted)
    return (
      <div className="rounded-2xl border border-line bg-mist p-7 sm:p-10">
        <CheckCircleIcon className="size-10 text-leaf" aria-hidden="true" />
        <h2 ref={successHeading} tabIndex={-1} className="mt-6 text-3xl">
          {text.acceptedTitle}
        </h2>
        <p className="mt-4 text-lg leading-8 text-soft">{text.acceptedBody}</p>
        <p className="mt-5 break-all rounded-xl bg-canvas p-4 text-sm leading-6">
          {text.reference}: {accepted}
        </p>
        <p className="mt-4 leading-7 text-soft">{text.acceptedNote}</p>
        {siteConfig.email && (
          <p className="mt-4">
            {text.fix}{' '}
            <a className="font-semibold underline decoration-brand underline-offset-4" href={`mailto:${siteConfig.email}`}>
              {text.contactUs} {siteConfig.email}
            </a>
            .
          </p>
        )}
        <Link className="btn-secondary mt-7" href={localePath(locale, '/product')}>
          {text.back}
        </Link>
      </div>
    )
  return (
    <form
      noValidate
      onSubmit={submit}
      onFocus={() => {
        if (!started.current) {
          started.current = true
          trackEvent('demo_form_start')
        }
      }}
      className="rounded-2xl border border-line bg-mist p-6 sm:p-9"
    >
      <div
        ref={errorSummary}
        tabIndex={-1}
        role={message ? 'alert' : undefined}
        className={
          message ? 'mb-6 rounded-xl border border-brand/50 bg-brand-soft/60 p-4 text-sm leading-6 text-brand-ink' : 'sr-only'
        }
      >
        {message}
        {Object.keys(errors).length > 0 && (
          <ul className="mt-2 list-disc pl-5">
            {Object.entries(errors).map(([field, value]) => (
              <li key={field}>
                {field === 'form' ? (
                  value
                ) : (
                  <a href={`#${field}`} className="underline">
                    {value}
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <fieldset disabled={pending || !!retryPayload.current} className="min-w-0">
        <legend className="sr-only">{text.legend}</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="field-label" htmlFor="name">{text.name}</label>
            <input {...attrs('name')} autoComplete="name" maxLength={120} required className="form-input" />
            {error('name')}
          </div>
          <div>
            <label className="field-label" htmlFor="business">{text.business}</label>
            <input {...attrs('business')} autoComplete="organization" maxLength={120} required className="form-input" />
            {error('business')}
          </div>
          <div>
            <label className="field-label" htmlFor="businessType">{text.businessType}</label>
            <select {...attrs('businessType')} defaultValue="" required className="form-input">
              <option value="" disabled>{text.businessTypePlaceholder}</option>
              {businessTypes.map((value) => (
                <option key={value} value={value}>{labels.businessType[value]}</option>
              ))}
            </select>
            {error('businessType')}
          </div>
          <div>
            <label className="field-label" htmlFor="outlets">{text.outlets}</label>
            <select {...attrs('outlets')} defaultValue="" required className="form-input">
              <option value="" disabled>{text.outletsPlaceholder}</option>
              {outletCounts.map((value) => (
                <option key={value} value={value}>{labels.outlets[value]}</option>
              ))}
            </select>
            {error('outlets')}
          </div>
          <div>
            <label className="field-label" htmlFor="city">{text.city}</label>
            <input {...attrs('city')} autoComplete="address-level2" maxLength={120} required className="form-input" />
            {error('city')}
          </div>
          <div>
            <label className="field-label" htmlFor="challenge">{text.challenge}</label>
            <select {...attrs('challenge')} defaultValue="" required className="form-input">
              <option value="" disabled>{text.challengePlaceholder}</option>
              {challenges.map((value) => (
                <option key={value} value={value}>{labels.challenge[value]}</option>
              ))}
            </select>
            {error('challenge')}
          </div>
          <div>
            <label className="field-label" htmlFor="contactMethod">{text.contactMethod}</label>
            <select
              {...attrs('contactMethod')}
              value={contactMethod}
              onChange={(event) => setContactMethod(event.target.value)}
              className="form-input"
            >
              <option value="whatsapp">WhatsApp</option>
              <option value="email">Email</option>
            </select>
            {error('contactMethod')}
          </div>
          <div>
            <label className="field-label" htmlFor="contact">
              {contactMethod === 'email' ? text.email : text.whatsapp}
            </label>
            <input
              {...attrs('contact')}
              type={contactMethod === 'email' ? 'email' : 'tel'}
              autoComplete={contactMethod === 'email' ? 'email' : 'tel'}
              maxLength={254}
              required
              className="form-input"
              placeholder={contactMethod === 'email' ? 'nama@usaha.id' : '+6281234567890'}
              aria-describedby={errors.contact ? 'contact-error' : 'contact-help'}
            />
            {error('contact')}
            <p id="contact-help" className="mt-2 text-xs leading-5 text-soft">{text.contactHelp}</p>
          </div>
          <div className="sm:col-span-2">
            <label className="field-label" htmlFor="notes">
              {text.notes} <span className="font-normal text-soft">{text.optional}</span>
            </label>
            <textarea {...attrs('notes')} maxLength={1200} rows={4} className="form-input resize-y" />
            {error('notes')}
            <p className="mt-2 text-xs leading-5 text-soft">{text.notesHelp}</p>
          </div>
        </div>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="mt-6">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-6">
            <input
              {...attrs('consent')}
              type="checkbox"
              required
              className="mt-1 size-5 shrink-0 rounded border-ink/40 text-night focus:ring-night"
            />
            <span>
              {text.consent}{' '}
              <Link href={localePath(locale, '/privacy')} className="font-semibold underline decoration-brand underline-offset-4">
                {text.privacy}
              </Link>
              .
            </span>
          </label>
          {error('consent')}
        </div>
      </fieldset>
      <button type="submit" disabled={pending} className="btn-primary mt-7 w-full">
        {pending ? text.sending : text.submit}
        {!pending && <ArrowRightIcon className="size-4" aria-hidden="true" />}
      </button>
      <p role="status" className="mt-3 text-center text-xs leading-6 text-soft">
        {pending ? text.waiting : retryPayload.current ? text.retryNote : text.idle}
      </p>
    </form>
  )
}
