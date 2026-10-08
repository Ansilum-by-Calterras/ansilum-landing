# Phase 2 handoff — 8 October 2026

Implemented the approved Indonesian merchant-first website, retaining the coffee color system and using **Minta Demo** consistently. Public routes include the homepage, About, Ansilum product, planned Intelligence, demo request, Early Merchant/pricing, privacy, terms, security, three original articles and RSS. Mobile navigation works; legacy links redirect; unknown routes have a custom 404.

Added actual reporting screenshots captured from the current Flutter development preview with labelled sample data. Removed unsupported evidence from mounted pages: funding, investor/customer logos, counts, testimonials, invented prices, and current AI capabilities. Claude remains explicitly planned.

Added route metadata, Open Graph image, icon, factual company structured data, sitemap and robots. Unconfigured previews are non-indexable. CTA/form analytics events are available locally; external collection is off by default.

Demo intake includes client/server validation, consent, accessible feedback, durable storage adapters, immutable safe retry and request deduplication. Production refuses unconfigured or known ephemeral file storage. No real messages or notifications were sent.

## Verified

- `pnpm build`: passed, all 23 generated pages completed.
- `pnpm exec tsc --noEmit`: passed.
- `pnpm lint`: passed, no warnings or errors.
- `pnpm test`: five tests passed, covering validation, concurrent durable retries, conflict prevention, production storage restrictions, and external receiver acknowledgement.
- Fourteen public pages checked at 360, 390, 768, and 1440 pixels without horizontal overflow. All 31 unique internal destinations and fragment targets resolve; redirects, 404s, RSS, robots, sitemap, OG, and icon respond correctly. Two landmark best-practice findings were corrected, as was keyboard focus on the skip-link target.
- Local production server responds on port 3000. Browser evidence and detailed results, when available, are under `/tmp/ansilum-phase2/browser`.
- Build reports approximately 103 kB first-load JavaScript for the homepage. Two product PNGs total approximately 86 kB. These are bundle/asset measurements, not field performance scores.

## Remaining before public launch

1. Supply confirmed founder identity/profile, city/start year, company email and canonical domain through `.env.local`; rebuild. Missing values are omitted rather than guessed.
2. Configure and verify a production intake destination or persistent volume, assign a follow-up owner, and decide notifications/retention. Local demo storage is implemented; email/WhatsApp notification is not configured.
3. Confirm deployed product/device/printer scope and record an end-to-end offline cash/receipt/reconnection demonstration. Current screenshots establish reporting UI only.
4. Confirm any Early Merchant commercial/support terms; the site currently promises a discussion, not specific prices or support levels.
5. Deploy to the chosen host, verify HTTPS/domain/contact ownership, and test delivery there. No deployment was requested or performed.

Claude runtime integration and merchant AI features are not implemented by this website task. A full production performance/field accessibility audit and deployed integration validation remain outside the completed local checks. The detailed claim boundaries are in [CLAIMS.md](CLAIMS.md); setup and intake contracts are in [README.md](../README.md).

Existing unrelated working-tree changes were preserved. Phase 2 edits were not committed.
