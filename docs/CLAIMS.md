# Public claim and evidence register

Reviewed 9 October 2026 for the bilingual AI-native redesign, and again on 31 October 2026 against the code of `ansilum-be`, `ansilum-web`, `ansilum-flutter` and `ansilum-ai`. The plan, feature and payment wording follows the claims document "Ansilum plans: what each tier includes" (31 October 2026). Source existence establishes implementation work, not deployment, release availability, or customer use.

| Public statement | Evidence | Publication boundary |
| --- | --- | --- |
| Ansilum is a cashier app for Indonesian UMKM, with an AI assistant in development | Founder brief (`docs/ant-startup.md`); production backend has no `AI_AGENT_BASE_URL`, so the assistant is not live | Titles, metadata, the OG image and taglines say "cashier app" and call the assistant "in development" or "next". No page says it is available, connected to merchant data, part of a plan, or accurate to a stated level. |
| Ansilum started in March 2024 | Founder-confirmed 9 October 2026 | Refers to Ansilum. The website repository's first commit is 20 December 2024. |
| Calterras builds Ansilum; founder-led, bootstrapped, Indonesia | User brief | Called a "software venture" / "usaha software". Do not imply legal incorporation. |
| Founder: Saifulloh Fadli, Founder of Calterras | Named by the user on 9 October 2026 as the author of the About letter | The About page is written in his voice, with the title as his quote and a "— Saifulloh Fadli, Calterras founder" byline. Get his sign-off on the wording before launch. |
| Calterras built commercial software for business clients | User brief | No client names or numbers. Does not establish paying Ansilum merchants. |
| Toko Kopi Kartika and The Art Barber (owner Ibu Noer Qomariah) and Giafoodies (owner Anggita Natalia) use the Ansilum cashier app | Founder-reported 9 October 2026 | Shown as plain facts: business name, type, and owner. No quotes, testimonials, logos, or numbers. Written permission from each owner to be named is still needed. |
| More than 60 million UMKM in Indonesia | Kementerian Koperasi dan UKM data (about 64–65 million UMKM, 2018–2019), widely cited by Kemenko Perekonomian | Used as "60 juta+ / 60M+" on the homepage and in the About letter. Keep it rounded down. |
| Plans: Basic Rp50,000, Standard Rp99,000, Full Rp199,000 per month; Standard Rp1,069,200 and Full Rp2,149,200 per year (10% off twelve months) | Monthly prices: plan table in `ansilum-be/prisma/seed.ts` (same values in the dev database). Basic as a paid Rp50,000 plan, and yearly billing at 10% off on Standard and Full only, are the founder's decisions (31 October 2026) | The plan table still charges Rp990,000 and Rp1,990,000 a year (and lists Basic yearly at Rp600,000); update it to these prices before launch. Basic is monthly only. The yearly switch on the plan cards computes the saving from the prices. Basic cannot be bought at checkout yet, and accounts without a plan still get Basic free in the code; both must be fixed before launch. The earlier Rp200,000 / Rp500,000 figures came from an app screen that checkout does not use. |
| Limits: Basic 1 business and 1 outlet, Standard up to 2 and 2, Full up to 5 and 5; no limit on staff, products or cashier devices | `TIER_LIMITS` in `features.constants.ts`; checked in `outlet.service.ts` and `tenant.service.ts` | Limits count everything one owner account owns. "Unlimited outlets" is never claimed. Going over a limit deletes nothing; it blocks adding more. |
| Basic features: cashier with variants, modifiers, notes and custom items; open bills and partial payments; discounts, promotions, taxes and service charge; offline selling; receipts and kitchen tickets; staff PIN, shifts and cash drawer; customers, points and rewards; online store (pay at the cashier); order queue board; web sales dashboard for any date range; live outlet monitor; products, categories, promotions and taxes on the web | `TIER_FEATURES` (BASIC_POS), web `subscription-access.ts`, cashier app | The queue board is "on the cashier device": sharing it across devices needs the unapplied fulfillment migration. The web dashboard shows totals and trend; profit and margin are Full. |
| Standard adds: ingredients and stock per outlet with recipe deduction; stock movements and stock spending; cost of goods (HPP) per product; modifier groups, tables, reservations and transaction history on the web | `TIER_FEATURES` (INVENTORY, BASIC_REPORTS); web `subscription-access.ts`; app inventory tab | Stock deducts only for products with a recipe; HPP needs ingredient costs. The web-only locks are claimed as "on the web". |
| Full adds: gross profit, margin and top products; outlet comparison; stock analytics; Reports tab in the cashier app | `@RequireTier(FULL)` analytics endpoints; app Reports tab | Profit and margin need product costs. Purchase orders, stock opname, stock transfers and "multi-outlet sync" are not claimed: the first is not built, the next two have no screen, and every plan syncs its outlets. |
| Plan payment: bank virtual account, GoPay, QRIS or credit card; move up a plan at any time | `midtrans.service.ts`, `ACCOUNT_SUBSCRIPTIONS.md` | Downgrades are cancel-then-subscribe, so only "move up" is claimed. |
| AI assistant: in development, not part of any plan | Production config has no AI service address; plan units exist only in `ai-units.config.ts` | No price, credits, units, plan list or "works with any plan" claim until it launches and the plans are decided. |
| Product domain is ansilum.com | User brief | Set `NEXT_PUBLIC_SITE_URL=https://ansilum.com` in production. |
| Ansilum calculates the numbers; an AI language model explains them; the assistant only reads | `ansilum-ai` architecture (write tools cannot be registered) and `ai-permissions.ts` | The model is not named. `ansilum-ai` runs Qwen as the primary provider in every environment, with Anthropic only as an optional fallback, so "built with Claude" was removed on 31 October 2026. Restore it only if production routes answers to Claude. |
| Cash and confirmed transfer sales can be recorded offline on a prepared device and sync later | Flutter `LocalCheckoutRepository` (refuses methods that need a provider; transfers need a manual confirmation tick); outbox and backend reconciliation | Recording QRIS, the web dashboard and reports, and the assistant need internet. No guarantee of instant sync; some sales may need a manual check. |
| QRIS is recorded, not processed | The cashier app offers Tunai, Transfer and QRIS; QRIS goes through the online bill payment; no QR code is generated | Copy says Ansilum records QRIS payments with the merchant's own QRIS code while online. Cards are not claimed at the cashier. |
| Printers: Bluetooth, network or USB thermal printers, 58 or 80 mm, for receipts and kitchen tickets | Flutter printing hub and printer profiles | No printer models, counts, or speeds are claimed. |
| Sales report by period and outlet | Flutter `SalesDashboard`, captured with sample data | Screenshots are labelled as sample data. |
| Product preview: the cashier app rings up an order with menu options and takes cash, transfer, or QRIS; the owner dashboard shows all outlets today, the sales report, best sellers and busy hours, and customers with points | Captures of `ansilum-flutter` and `ansilum-web` with the sample business, 25 October 2026 (see provenance below) | The window is labelled "Data contoh / Sample data" and every screen shows the fictional "Kedai Kopi Contoh". The checkout copy says cash and confirmed transfers are saved on the tablet first and QRIS is recorded while online, following the offline and QRIS rows above. The best-sellers view is labelled as a Full-plan feature. The customer and points screens need the customer-management backend release of 25 October 2026 in production before this section goes live. |
| What's inside: cashier options and open bills, offline selling, receipts and kitchen tickets, sales reports, several outlets, stock and HPP, customers and points, staff with their own PIN and shifts | The rows above | Each plan-dependent item names its plan (Standard and Full for stock, Full for profit and top products, outlet counts per plan). The grid still ends with "Features follow the plan you choose". |
| Website demo request validation and durable acknowledgement | Implemented route, tests, and storage module | Production needs a persistent store or an acknowledging receiver. |

## The assistant example

The homepage and Product page show a scripted conversation for a fictional "Kedai Kopi Contoh / Sample Coffee Shop". All figures are invented sample data (brief §7) and are checked for internal consistency by `tests/consultation.test.cjs`. No model is called. At the team's request (9 October 2026) there is no caption under the example or the screenshots; the business name "Kedai Kopi Contoh" and the "sample data" label inside the screenshots are what mark them as samples. Never attach these numbers to a named customer.

## Screenshot provenance

- Source: sibling `ansilum-flutter`, `tool/analytics_preview.dart`, using the existing `SalesDashboard` and sample fixture repository.
- Build: `flutter build web --target tool/analytics_preview.dart --output /tmp/ansilum-phase2/product-preview --no-pub`.
- Capture: Chromium via Playwright, 440 × 860 CSS pixels, device scale 1, top and scrolled views, not retouched.
- Assets: `public/product/sales-report.png` and `public/product/sales-report-chart.png`.
- Scope: real reporting UI with sample data. Not an authenticated merchant session, live backend, or customer result.

### Product preview (25 October 2026)

- Data: a throwaway PostgreSQL database. The fictional "Kedai Kopi Contoh" (two outlets, sixteen menu items with recipes and options, three staff, 24 members, three rewards) was created through the real API. Ten weeks of synthetic sales were generated in SQL from fixed hashes, so the numbers are invented but consistent. No customer data.
- Owner dashboard: `ansilum-web` (Vite dev server) against a local `ansilum-be`, signed in as the sample owner. Chrome via Playwright at 1440 × 1000 CSS pixels, device scale 2, time zone Asia/Jakarta, Indonesian and English. Cropped to the content area (sidebar and top bar removed) at 16:10 and scaled to 1800 × 1125 WebP.
- Cashier app: an `ansilum-flutter` profile build (Android arm64) on the Medium Tablet emulator (2560 × 1600), registered to Cabang Menteng and signed in as the sample cashier. One real takeaway sale per language (Es kopi susu with options plus Pisang goreng, paid Rp50.000 cash), captured with `adb screencap` at each step and scaled to 1800 × 1125 WebP. The status bar is the emulator's. Each sale synced to the local backend.
- Build-only settings, not in any repository: a demo-only offline signing key, and a cleartext exception so the profile build could reach the local HTTP backend.
- Assets: `public/product/preview/*.webp`. Nothing was generated or retouched.

## Deliberately absent from live pages

Testimonials and customer quotes, funding amounts, investors, customer/outlet/transaction counts, partner logos, improvement percentages, guaranteed 24/7 support, certifications, legal incorporation, AI prices, credits or plan allowances, any claim that the AI assistant is live, the AI model's vendor, unlimited outlets, purchase orders, stock opname, stock transfers, multi-outlet sync as a feature, GoFood and GrabFood orders (switched off in production), card payments at the cashier, and online payment in the online store.

## Outstanding confirmations

- Deploy the 25 October 2026 backend (customer management and the report date fixes) before publishing the product preview, so the customer and points screens match production.

- Saifulloh Fadli's approval of the About letter; optional public profile URL and city.
- Permission from Ibu Noer Qomariah and Anggita Natalia to name them and their businesses.
- Monitored company contact email; app URL if wanted.
- Whether device and setup costs are charged on top of the monthly plans.
- Make Basic purchasable at Rp50,000 a month and end the free Basic fallback for accounts without a plan, so the pricing page matches checkout.
- Change the yearly plan rows to Standard Rp1,069,200 and Full Rp2,149,200 and stop offering Basic yearly, so checkout matches the yearly switch.
- Apply the fulfillment migration before claiming an order queue shared across cashier and kitchen devices.
- `ansilum-web/src/content/pricing.ts` still lists the old prices, unlimited outlets and the four unbuilt Full features; align it with this register.
- Production intake destination, follow-up owner, and retention process.
- Deployed version, supported devices and printers, and end-to-end offline proof.
- Analytics account ownership before enabling external collection.
