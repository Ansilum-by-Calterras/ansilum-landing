# Ansilum website

Indonesian marketing website for **Ansilum**, an Early Beta F&B POS built by **Calterras**. The primary conversion is **Minta Demo**. Claude Intelligence is explicitly planned; this site does not claim a released AI integration.

## Local development

Use the existing pnpm lockfile and Node 20 or later:

```bash
pnpm install --frozen-lockfile
cp .env.example .env.local # only if you do not already have local configuration
pnpm dev
```

Open http://localhost:3000. Missing founder/contact/company fields are omitted. Without `NEXT_PUBLIC_SITE_URL`, pages are marked `noindex`, robots disallows crawling, and the sitemap is empty. Keep previews unset; rebuild after changing public environment variables.

```bash
pnpm test
pnpm lint
pnpm build
pnpm start
node scripts/check-launch.mjs
```

The launch check intentionally fails until company identity, contact, canonical domain, and durable intake are configured. Configuration alone does not establish ownership or product readiness. Do not publish before the remaining confirmations in [the claims register](docs/CLAIMS.md).

## Pages and editing

- `/`: merchant narrative, reporting previews, offline scope, planned intelligence, product status, early merchant conversation.
- `/products/ansilum`, `/intelligence`, `/about`: independently understandable product, roadmap, and company pages.
- `/demo`: validated request form. `/pricing`: discuss scope and terms before onboarding; no invented prices.
- `/privacy`, `/terms`, `/security`: website data flows, demo terms, and clearly bounded product information.
- `/blog`: three repository-owned articles in `src/data/articles.ts`, with RSS at `/blog/feed.xml`.
- Legacy `/company`, `/our-products`, `/contactus`, `/term-of-service`, and `/feed.xml` redirect to relevant replacements. The old terms route contained privacy content and redirects to `/privacy`; the new terms are `/terms`.
- `/login` links through only when a real app URL is configured; otherwise it explains Beta access. Sanity Studio remains available for the existing project but is not a public acquisition route. The public blog no longer reads seed content from Sanity. No remote CMS data was changed.

Shared copy/layout components live in `src/components/marketing`. Existing coffee colors and spacing foundations are retained; `src/styles/marketing.css` adds accessible marketing controls and typography. Old unmounted template components and assets remain to preserve existing work; they are not evidence for current marketing claims.

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

Two PNGs under `public/product` were captured from the existing Flutter `tool/analytics_preview.dart` harness on 8 October 2026. They render the real `SalesDashboard` with its sample repository; they are development previews, not customer data or release verification. See [provenance and claim boundaries](docs/CLAIMS.md). No interface was generated or retouched. The offline diagram explains the architecture; it is not a transaction recording.

## Publication prerequisites

Confirm the public founder identity/profile, city/start year, canonical HTTPS domain, company email, intake ownership, and deployed product/device scope. Optional unknown facts are deliberately absent from public pages. Confirm any Early Merchant pricing/support promises separately. Do not add traction counts, customer logos, release guarantees, certifications, or available Claude claims without evidence.

The original template remains subject to its [Tailwind UI license](https://tailwindui.com/license).
