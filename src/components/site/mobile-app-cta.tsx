'use client'

import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useState } from 'react'

type Platform = 'android' | 'ios'

type BetaCopy = {
  badge: string
  heading: string
  body: string
  stores: { android: string; ios: string } // used as alt text
  storeHint: string
  form: {
    platformLabel: string
    emailLabel: string
    emailPlaceholder: string
    submit: string
    submitting: string
    success: string
    error: string
    note: string
  }
}

/**
 * Intrinsic size of each badge file (from `sips -g pixelWidth -g pixelHeight`).
 * `displayHeight` is the height it renders at; width follows the aspect ratio.
 * Tune displayHeight so both badges look the same size side by side.
 */
const BADGES = {
  android: {
    src: { en: '/badges/ic_playstore_en.png', id: '/badges/ic_playstore_id.png' },
    width: 270, // TODO: replace with real pixel width
    height: 80, // TODO: replace with real pixel height
    displayHeight: 64,
  },
  ios: {
    src: { en: '/badges/ic_appstore_en.svg', id: '/badges/ic_appstore_id.svg' },
    width: 120.660, // TODO: replace with real SVG width
    height: 41.000, // TODO: replace with real SVG height
    displayHeight: 65,
  },
} as const

export function BetaAccess({ copy, locale }: { copy: BetaCopy; locale: string }) {
  const [platform, setPlatform] = useState<Platform>('android')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const lang = locale === 'id' ? 'id' : 'en'

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/beta-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, platform }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const stores: Platform[] = ['android', 'ios']

  return (
    <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-20">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full bg-sun/20 px-3 py-1 text-sm font-semibold text-sun">
          <span className="size-2 rounded-full bg-sun" aria-hidden="true" />
          {copy.badge}
        </span>
        <h2 className="display-lg mt-5 text-balance" data-reveal>
          {copy.heading}
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-8 text-white/70" data-reveal>
          {copy.body}
        </p>

        {/* Official store badges act as the platform selector */}
        <div
          className="mt-8 flex flex-wrap items-center gap-4"
          role="radiogroup"
          aria-label={copy.form.platformLabel}
        >
          {stores.map((id) => {
            const badge = BADGES[id]
            const selected = platform === id
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setPlatform(id)}
                className={`rounded-xl p-1 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun ${
                  selected ? 'opacity-100 ring-2 ring-sun' : 'opacity-60 hover:opacity-90'
                }`}
              >
                <Image
                  src={badge.src[lang]}
                  alt={copy.stores[id]}
                  width={badge.width}
                  height={badge.height}
                  style={{ height: badge.displayHeight, width: 'auto' }}
                  priority={false}
                />
              </button>
            )
          })}
        </div>
        <p className="mt-3 text-sm text-white/60">{copy.storeHint}</p>
      </div>

      <div className="rounded-3xl bg-white p-6 text-ink sm:p-8" data-reveal>
        {status === 'success' ? (
          <div className="flex flex-col items-start gap-3" role="status">
            <CheckCircleIcon className="size-10 text-leaf" aria-hidden="true" />
            <p className="text-lg font-semibold">{copy.form.success}</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <label htmlFor="beta-email" className="font-semibold">
              {copy.form.emailLabel}
            </label>
            <input
              id="beta-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={copy.form.emailPlaceholder}
              className="rounded-xl border border-line px-4 py-3 outline-none focus:border-brand"
              autoComplete="email"
            />
            <button type="submit" className="btn-primary" disabled={status === 'loading'}>
              {status === 'loading' ? copy.form.submitting : copy.form.submit}
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </button>
            {status === 'error' && (
              <p className="text-sm text-red-600" role="alert">
                {copy.form.error}
              </p>
            )}
            <p className="text-sm text-soft">{copy.form.note}</p>
          </form>
        )}
      </div>
    </div>
  )
}