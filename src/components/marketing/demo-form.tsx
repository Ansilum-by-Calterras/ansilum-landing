'use client'
import { siteConfig } from '@/config/site'
import {
  businessTypes,
  challenges,
  outletCounts,
  validateDemo,
  type FieldErrors,
} from '@/lib/demo/validation'
import { ArrowUpRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { trackEvent } from './analytics'
export function DemoForm() {
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
  function showErrors(fields: FieldErrors, text: string) {
    setErrors(fields)
    setMessage(text)
    window.setTimeout(() => errorSummary.current?.focus(), 0)
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy.current) return
    const form = new FormData(event.currentTarget)
    requestId.current ||= crypto.randomUUID()
    const candidate = {
      ...Object.fromEntries(form),
      requestId: requestId.current,
      consent: form.get('consent') === 'on',
    }
    // A failed transport may have committed: retry the same immutable request before allowing a new submission.
    const payload = retryPayload.current || candidate
    const result = validateDemo(payload)
    if (!result.data) {
      showErrors(result.errors, 'Periksa kolom yang ditandai sebelum mengirim.')
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      })
      const body = await res.json()
      if (
        !res.ok ||
        body.accepted !== true ||
        body.requestId !== requestId.current
      ) {
        if (res.status === 422) retryPayload.current = undefined
        showErrors(
          body.errors || {},
          body.error || 'Permintaan belum terkirim. Coba lagi.',
        )
        trackEvent('demo_request_failed', { reason: `http_${res.status}` })
        return
      }
      setAccepted(body.requestId)
      trackEvent('demo_request_accepted', { request_id: body.requestId })
      window.setTimeout(() => successHeading.current?.focus(), 0)
    } catch {
      showErrors(
        {},
        'Konfirmasi belum diterima. Tekan kirim lagi untuk memeriksa permintaan yang sama tanpa membuat duplikat.',
      )
      trackEvent('demo_request_failed', { reason: 'network' })
    } finally {
      setPending(false)
      busy.current = false
    }
  }
  const error = (name: string) =>
    errors[name] ? (
      <p id={`${name}-error`} className="mt-2 text-sm leading-6 text-[#a22b22]">
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
      <div className="surface-card p-7 sm:p-10">
        <CheckCircleIcon
          className="size-10 text-[#46613a]"
          aria-hidden="true"
        />
        <h2
          ref={successHeading}
          tabIndex={-1}
          className="mt-6 text-2xl font-medium"
        >
          Permintaan demo diterima.
        </h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          Terima kasih. Permintaan Anda sudah tersimpan. Calterras dapat
          menggunakan kontak yang Anda berikan untuk membahas kebutuhan dan
          jadwal demo.
        </p>
        <p className="mt-5 break-all rounded-xl bg-[var(--marketing-paper)] p-4 text-xs leading-6">
          Nomor referensi: {accepted}
        </p>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          Permintaan ini belum merupakan konfirmasi jadwal atau langganan.
        </p>
        {siteConfig.email && (
          <p className="mt-4 text-sm">
            Perlu memperbaiki informasi?{' '}
            <a
              className="underline underline-offset-4"
              href={`mailto:${siteConfig.email}`}
            >
              Hubungi {siteConfig.email}
            </a>
            .
          </p>
        )}
        <Link className="action-secondary mt-7" href="/products/ansilum">
          Kembali mengenal Ansilum
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
      className="surface-card p-6 sm:p-9"
    >
      <div
        ref={errorSummary}
        tabIndex={-1}
        role={message ? 'alert' : undefined}
        className={
          message
            ? 'mb-6 rounded-xl border border-[#dfb1a8] bg-[#fff4f1] p-4 text-sm leading-6 text-[#87291e]'
            : 'sr-only'
        }
      >
        {message}
        {Object.keys(errors).length > 0 && (
          <ul className="mt-2 list-disc pl-5">
            {Object.entries(errors).map(([field, text]) => (
              <li key={field}>
                {field === 'form' ? (
                  text
                ) : (
                  <a href={`#${field}`} className="underline">
                    {text}
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <fieldset
        disabled={pending || !!retryPayload.current}
        className="min-w-0"
      >
        <legend className="sr-only">Informasi usaha dan kontak demo</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="field-label" htmlFor="name">
              Nama Anda
            </label>
            <input
              {...attrs('name')}
              autoComplete="name"
              maxLength={120}
              required
              className="form-input"
            />
            {error('name')}
          </div>
          <div>
            <label className="field-label" htmlFor="business">
              Nama usaha
            </label>
            <input
              {...attrs('business')}
              autoComplete="organization"
              maxLength={120}
              required
              className="form-input"
            />
            {error('business')}
          </div>
          <div>
            <label className="field-label" htmlFor="businessType">
              Jenis usaha
            </label>
            <select
              {...attrs('businessType')}
              defaultValue=""
              required
              className="form-input"
            >
              <option value="" disabled>
                Pilih jenis usaha
              </option>
              {businessTypes.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
            {error('businessType')}
          </div>
          <div>
            <label className="field-label" htmlFor="outlets">
              Jumlah outlet
            </label>
            <select
              {...attrs('outlets')}
              defaultValue=""
              required
              className="form-input"
            >
              <option value="" disabled>
                Pilih jumlah outlet
              </option>
              {outletCounts.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
            {error('outlets')}
          </div>
          <div>
            <label className="field-label" htmlFor="city">
              Kota
            </label>
            <input
              {...attrs('city')}
              autoComplete="address-level2"
              maxLength={120}
              required
              className="form-input"
            />
            {error('city')}
          </div>
          <div>
            <label className="field-label" htmlFor="challenge">
              Kendala utama
            </label>
            <select
              {...attrs('challenge')}
              defaultValue=""
              required
              className="form-input"
            >
              <option value="" disabled>
                Pilih kendala utama
              </option>
              {challenges.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
            {error('challenge')}
          </div>
          <div>
            <label className="field-label" htmlFor="contactMethod">
              Cara dihubungi
            </label>
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
              {contactMethod === 'email' ? 'Alamat email' : 'Nomor WhatsApp'}
            </label>
            <input
              {...attrs('contact')}
              type={contactMethod === 'email' ? 'email' : 'tel'}
              autoComplete={contactMethod === 'email' ? 'email' : 'tel'}
              maxLength={254}
              required
              className="form-input"
              placeholder={
                contactMethod === 'email' ? 'nama@usaha.id' : '+6281234567890'
              }
              aria-describedby={
                errors.contact ? 'contact-error' : 'contact-help'
              }
            />
            {error('contact')}
            <p
              id="contact-help"
              className="mt-2 text-xs leading-5 text-muted-foreground"
            >
              Cukup satu kontak yang dapat dihubungi.
            </p>
          </div>
          <div className="sm:col-span-2">
            <label className="field-label" htmlFor="notes">
              Ceritakan lebih lanjut{' '}
              <span className="font-normal text-muted-foreground">
                (opsional)
              </span>
            </label>
            <textarea
              {...attrs('notes')}
              maxLength={1200}
              rows={4}
              className="form-input resize-y"
            />
            {error('notes')}
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Tidak perlu mengirim data pelanggan atau catatan transaksi.
            </p>
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
              className="mt-1 size-5 shrink-0 rounded border-[#a18c75] text-[#63422f] focus:ring-[#63422f]"
            />
            <span>
              Saya bersedia dihubungi Calterras terkait permintaan demo ini.{' '}
              <Link
                href="/privacy"
                className="font-medium underline underline-offset-4"
              >
                Kebijakan Privasi
              </Link>
              .
            </span>
          </label>
          {error('consent')}
        </div>
      </fieldset>
      <button
        type="submit"
        disabled={pending}
        className="action-primary mt-7 w-full"
      >
        {pending ? 'Mengirim permintaan…' : 'Minta Demo'}
        {!pending && <ArrowUpRightIcon className="size-4" aria-hidden="true" />}
      </button>
      <p
        role="status"
        className="mt-3 text-center text-xs leading-6 text-muted-foreground"
      >
        {pending
          ? 'Menunggu konfirmasi penyimpanan.'
          : retryPayload.current
            ? 'Kirim ulang memeriksa permintaan yang sama. Data dipertahankan untuk mencegah duplikat.'
            : 'Tidak membuat akun atau memulai langganan.'}
      </p>
    </form>
  )
}
