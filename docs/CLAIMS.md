# Public claim and evidence register

Reviewed 8 October 2026 against the approved Phase 1 plan and local product repositories. Source existence establishes implementation work, not deployment, release availability, or customer use.

| Public statement                                                  | Evidence                                                                                                  | Publication boundary                                                                                                              |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Calterras builds Ansilum; founder-led, bootstrapped, Indonesia    | Explicit user brief and approved architecture                                                             | Use these facts. Do not infer incorporation, a founder identity, city, or year.                                                   |
| Calterras built commercial software for paying business clients   | Explicit user brief                                                                                       | No numbers or names supplied. This does not establish paying Ansilum merchants.                                                   |
| Ansilum is Early Beta, focused on F&B and initially 1–5 outlets   | User brief                                                                                                | Access, supported devices, and onboarding scope require confirmation in the demo.                                                 |
| Local cashier operations and later synchronization are the design | Flutter local transaction/outbox code; backend offline authorization/reconciliation code                  | Copy says “dirancang”; prepared device/catalog/cashier and valid authorization are prerequisites. No universal offline guarantee. |
| Cash local; provider payments need their own confirmation         | Product flow audit; `ansilum-be/docs/pos-offline-authorization.md` and Flutter payment paths              | QRIS/cards/gateways are not represented as confirmed offline. Manual transfer confirmation is separate.                           |
| Sync is retried when connected                                    | `ansilum-flutter/lib/src/data/services/outbox_sync_service.dart`, local outbox and backend reconciliation | No instant/guaranteed completion promise. Exceptions may require review.                                                          |
| Sales, products, stock, and cost domains exist                    | Product repositories and report implementation                                                            | Central reports depend on synced records; margins need complete cost data and access rights. Deployed scope remains unverified.   |
| Reporting interface exists                                        | Actual Flutter `SalesDashboard`, captured with sample fixture                                             | Preview labels appear on every use. No screenshot is presented as production/customer evidence.                                   |
| Claude could explain structured business data                     | User's product direction; inspected source has no Claude runtime                                          | Planned and unavailable. No merchant AI beta, accuracy claim, partnership, autonomous writes, or implied integration.             |
| Isolation, permissions, auditability, constrained tools for AI    | Planned product requirements                                                                              | Explicit future requirements, not an implemented AI security guarantee.                                                           |
| Website request validation/durable acknowledgement                | Implemented route, tests, and storage module                                                              | Production needs configured persistent storage or an acknowledging external receiver; no automated follow-up is claimed.          |

## Screenshot provenance

- Source: sibling `ansilum-flutter`, current working tree, `tool/analytics_preview.dart` using the existing `SalesDashboard` and sample fixture repository.
- Build: `flutter build web --target tool/analytics_preview.dart --output /tmp/ansilum-phase2/product-preview --no-pub`.
- Capture: local Chromium/Chrome via Playwright, 440 × 860 CSS pixels, device scale 1. Top view and a scrolled view. Original PNG captures copied without retouching.
- Assets: `public/product/sales-report.png` and `public/product/sales-report-chart.png`.
- Evidence scope: genuine implemented reporting UI with sample data. This is not an authenticated merchant session, live backend, offline payment/printer test, release validation, or real customer traction.
- The AI conversation is an explicitly labelled **concept illustration** with invented sample arithmetic. It is not an app screenshot or generated customer result.

## Deliberately absent from live pages

Funding amounts, investors, customer/outlet/transaction counts, unsupported testimonials, partner logos, improvement percentages, guaranteed 24/7 support, certifications, legal incorporation, unverified pricing, production availability, and currently working Claude claims. Legacy unmounted template files are retained to preserve earlier user work; they are not part of the rendered marketing pages.

## Outstanding confirmations

- Public founder name and profile; operating city and start year.
- Approved canonical domain and monitored company contact; company profile and app URL if wanted.
- Production intake destination, responsible follow-up person, notification/retention process.
- Actual deployed version, merchant access, supported device/printer matrix, and end-to-end offline/reconnection proof.
- Approved Early Merchant commercial/support terms.
- Any public traction figures or customer references, with disclosure permission.
- Analytics account ownership before enabling external collection.

The missing identity/contact values are configurable and omitted when blank. The site remains non-indexable without a canonical URL. Website changes alone cannot satisfy founder verification or prove a Claude integration that does not exist in the inspected source.
