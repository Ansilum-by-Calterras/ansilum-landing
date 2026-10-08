'use client'
import { siteConfig } from '@/config/site'
import { track } from '@vercel/analytics'
import { Analytics } from '@vercel/analytics/next'
type EventName =
  | 'demo_cta_click'
  | 'demo_form_start'
  | 'demo_request_accepted'
  | 'demo_request_failed'
  | 'preview_question'
  | 'preview_action'
  | 'business_example'
  | 'language_switch'
export function trackEvent(
  name: EventName,
  properties: Record<string, string> = {},
) {
  const detail = {
    name,
    properties: {
      ...properties,
      page: window.location.pathname,
      content_version: 'ansilum-2026-10-ai',
    },
  }
  window.dispatchEvent(new CustomEvent('ansilum:analytics', { detail }))
  if (siteConfig.analytics) {
    try {
      track(name, detail.properties)
    } catch {
      /* Analytics never blocks the user journey. */
    }
  }
}
export function SiteAnalytics() {
  return siteConfig.analytics ? <Analytics /> : null
}
