# Ansilum website

Bilingual marketing website for **Ansilum**, a cashier app with an AI assistant for Indonesian UMKM, built by **Calterras**. Indonesian lives at `/id` (the default) and English at `/en`. The primary conversion is **Minta demo / Request a demo**. The AI assistant is being built with Claude; the site shows it as a scripted example over sample data and does not call a model.

## Local development

Use the existing pnpm lockfile and Node 20 or later:

```bash
pnpm install --frozen-lockfile
cp .env.example .env.local # only if you do not already have local configuration
pnpm dev
```

Open http://localhost:3000; the root redirects to `/id` (or the language remembered in the `ansilum-locale` cookie). Missing contact/company fields are omitted. Without `NEXT_PUBLIC_SITE_URL`, pages are marked `noindex`, robots disallows crawling, and the sitemap is empty. Keep previews unset; rebuild after changing public environment variables.

```bash
pnpm test
pnpm lint
pnpm build
pnpm start
node scripts/check-launch.mjs
```

The launch check intentionally fails until contact, canonical domain, and durable intake are configured. Configuration alone does not establish ownership or product readiness. Do not publish before the remaining confirmations in [the claims register](docs/CLAIMS.md).

## Pages and editing

Every public page exists under both `/id/...` and `/en/...`. `src/middleware.ts` redirects unprefixed paths, and the language switch keeps the visitor on the equivalent page.

- `/`: hero, the interactive assistant example (`#demo`), how it works, examples for every kind of UMKM, the cashier app, businesses using Ansilum, mission, FAQ.
- `/product`: the assistant, how Claude fits in, the cashier app, offline behaviour, what is available today, and how to start.
- `/about`: a letter from the founder, Saifulloh Fadli, plus Calterras and the timeline. `/updates`: dated milestones with evidence.
- `/demo`: validated request form. `/pricing`: Basic, Standard, and Full plans (`src/content/pricing.ts`), AI credits coming soon, and a comparison table.
- `/privacy`, `/terms`, `/security`: website data flows, demo terms, and bounded product information.
- The blog is retired. Legacy `/company`, `/our-products`, `/products/ansilum`, `/intelligence`, `/contactus`, `/term-of-service`, `/blog/*`, and `/feed.xml` redirect to their replacements in `next.config.mjs`.
- `/login` links through only when a real app URL is configured. Sanity Studio remains at `/studio` for the existing project but is not a public route.

Copy lives in typed per-locale objects: `src/content/*.ts` for shared, homepage, assistant and updates copy, and inside each page file for the other pages. Components live in `src/components/site`. The sample-shop numbers in `src/content/consultation.ts` are checked by `tests/consultation.test.cjs`; update both together. The design uses one font (Plus Jakarta Sans), white surfaces, and the brand orange in `tailwind.config.js`. [docs/DESIGN.md](docs/DESIGN.md) records the design language (voice, tokens, components, the AI chat pattern, motion specs, line art) for the mobile app to share.

Motion lives in `src/styles/marketing.css` and animates only transform, opacity, filter, and SVG stroke offsets, so nothing shifts layout. `src/components/site/motion-observer.tsx` is one site-wide observer: add `data-reveal` to fade an element in when it scrolls into view, and `data-anim` to pause its looping animations while it is off screen. Animated line art (pulses along dotted tracks, the UMKM counters, the step illustrations) is in `src/components/site/line-art.tsx`. The demo answer types in word by word through `data-typing`. All of it is switched off for visitors who prefer reduced motion, and hidden start states only apply when scripts run.

## Demo intake and follow-up

The form posts to the Node route `/api/demo`. It validates every field on both sides, requires consent, limits request bytes, checks origin, and uses an in-memory request throttle plus a honeypot. These are basic controls; a public deployment should enforce its own edge limits. Set `DEMO_TRUST_PROXY=true` only behind a trusted proxy that overwrites the forwarded IP. Without it, the application uses a shared limit of 10 attempts per 10 minutes; the in-memory limit is per process and resets on restart.

Development writes atomically to private `.data/demo-requests/<UUID>.json` files with restrictive permissions. Success follows durable file acknowledgement. Repeated identical IDs return the same result; changed data under an accepted ID returns 409. A failed transport retains the same payload for a safe retry. No lead contents are logged or sent to analytics.

For production choose one:

1. **Persistent Node host:** set `DEMO_STORAGE_DIR` to an absolute directory on a persistent volume, outside public assets. The operator must monitor incoming files, limit access, arrange backups/retention, and follow up using the supplied contact. No notification delivery is implied.
2. **External intake:** set `DEMO_INTAKE_URL` to an HTTPS receiver and optionally `DEMO_INTAKE_TOKEN`. The receiver must durably store the request, enforce idempotency on the `Idempotency-Key`, and return JSON `{ "accepted": true, "requestId": "same UUID" }`. Return 409 if the ID already belongs to different data. Timeouts and malformed acknowledgements are treated as unconfirmed and safely retried. The receiver owns routing/notification and retention. Never put its token in a `NEXT_PUBLIC_` variable.

Production without either option returns 503. Local file storage is refused on Vercel because it is ephemeral. This prevents the interface from accepting requests it cannot retain. The current local implementation has no confirmed recipient or automated email/WhatsApp delivery. Assign a follow-up owner and test the real destination with a synthetic request before publication.

## Analytics

Every CTA and form start/accepted/failure dispatches a browser `ansilum:analytics` custom event. Payloads contain event name, page, content version, placement/reason or random request reference; never form values. Subscribe with `window.addEventListener('ansilum:analytics', handler)` for debugging. External Vercel analytics is disabled by default. Enable `NEXT_PUBLIC_ANALYTICS_ENABLED=true` only after confirming the account and disclosure. Old Google Ads conversion tags are not mounted. An accepted request event follows acknowledgement, not a button click.

## Product evidence

Two PNGs under `public/product` were captured from the existing Flutter `tool/analytics_preview.dart` harness on 8 October 2026. They render the real `SalesDashboard` with its sample repository; they are development previews, not customer data or release verification. See [provenance and claim boundaries](docs/CLAIMS.md). No interface was generated or retouched.

## Publication prerequisites

Confirm the canonical HTTPS domain (`https://ansilum.com`), company email, intake ownership, and deployed product/device scope. The founder profile and city are optional. Optional unknown facts are deliberately absent from public pages. Confirm any Early Merchant pricing/support promises separately. Do not add traction counts, testimonials, customer logos, release guarantees, certifications, or claims that the AI assistant is available without evidence.

The original template remains subject to its [Tailwind UI license](https://tailwindui.com/license).
