# Public claim and evidence register

Reviewed 9 October 2026 for the bilingual AI-native redesign. Source existence establishes implementation work, not deployment, release availability, or customer use.

| Public statement | Evidence | Publication boundary |
| --- | --- | --- |
| Ansilum is a cashier app with an AI assistant for Indonesian UMKM | Founder brief (`docs/ant-startup.md`) | The assistant is described as being built. No page says it is available, connected to merchant data, or accurate to a stated level. |
| Ansilum started in March 2024 | Founder-confirmed 9 October 2026 | Refers to Ansilum. The website repository's first commit is 20 December 2024. |
| Calterras builds Ansilum; founder-led, bootstrapped, Indonesia | User brief | Called a "software venture" / "usaha software". Do not imply legal incorporation. |
| Founder: Saifulloh Fadli, Founder of Calterras | Named by the user on 9 October 2026 as the author of the About letter | The About page is written in his voice, with the title as his quote and a "— Saifulloh Fadli, Calterras founder" byline. Get his sign-off on the wording before launch. |
| Calterras built commercial software for business clients | User brief | No client names or numbers. Does not establish paying Ansilum merchants. |
| Toko Kopi Kartika and The Art Barber (owner Ibu Noer Qomariah) and Giafoodies (owner Anggita Natalia) use the Ansilum cashier app | Founder-reported 9 October 2026 | Shown as plain facts: business name, type, and owner. No quotes, testimonials, logos, or numbers. Written permission from each owner to be named is still needed. |
| More than 60 million UMKM in Indonesia | Kementerian Koperasi dan UKM data (about 64–65 million UMKM, 2018–2019), widely cited by Kemenko Perekonomian | Used as "60 juta+ / 60M+" on the homepage and in the About letter. Keep it rounded down. |
| Plans: Basic Rp50,000, Standard Rp200,000, Full Rp500,000 per month, with the listed outlets and features | Ansilum app subscription screen, shared by the team on 9 October 2026 | Monthly prices only; yearly prices are not published. Feature names are translated from the app. |
| AI assistant will be billed with pay-as-you-go credits; coming soon | Team direction, 9 October 2026 | Credit prices are not published. "No extra monthly fee" follows from pay-as-you-go; confirm before launch. |
| Product domain is ansilum.com | User brief | Set `NEXT_PUBLIC_SITE_URL=https://ansilum.com` in production. |
| Claude explains results; Ansilum calculates the numbers | Planned architecture in the brief; inspected source has no Claude runtime | Phrased as "we are building the assistant with Claude". No partnership, endorsement, or live integration is implied. |
| Cash sales can be recorded offline on a prepared device and sync later | Flutter local transaction/outbox code; backend reconciliation | QRIS, card, the sales report, and the assistant need internet. No guarantee of instant sync; some sales may need a manual check. |
| Sales report by period and outlet | Flutter `SalesDashboard`, captured with sample data | Screenshots are labelled as sample data. |
| Website demo request validation and durable acknowledgement | Implemented route, tests, and storage module | Production needs a persistent store or an acknowledging receiver. |

## The assistant example

The homepage and Product page show a scripted conversation for a fictional "Kedai Kopi Contoh / Sample Coffee Shop". All figures are invented sample data (brief §7) and are checked for internal consistency by `tests/consultation.test.cjs`. No model is called. At the team's request (9 October 2026) there is no caption under the example or the screenshots; the business name "Kedai Kopi Contoh" and the "sample data" label inside the screenshots are what mark them as samples. Never attach these numbers to a named customer.

## Screenshot provenance

- Source: sibling `ansilum-flutter`, `tool/analytics_preview.dart`, using the existing `SalesDashboard` and sample fixture repository.
- Build: `flutter build web --target tool/analytics_preview.dart --output /tmp/ansilum-phase2/product-preview --no-pub`.
- Capture: Chromium via Playwright, 440 × 860 CSS pixels, device scale 1, top and scrolled views, not retouched.
- Assets: `public/product/sales-report.png` and `public/product/sales-report-chart.png`.
- Scope: real reporting UI with sample data. Not an authenticated merchant session, live backend, or customer result.

## Deliberately absent from live pages

Testimonials and customer quotes, funding amounts, investors, customer/outlet/transaction counts, partner logos, improvement percentages, guaranteed 24/7 support, certifications, legal incorporation, yearly or AI credit prices, and any claim that the AI assistant is live.

## Outstanding confirmations

- Saifulloh Fadli's approval of the About letter; optional public profile URL and city.
- Permission from Ibu Noer Qomariah and Anggita Natalia to name them and their businesses.
- Monitored company contact email; app URL if wanted.
- Whether device and setup costs are charged on top of the monthly plans.
- Production intake destination, follow-up owner, and retention process.
- Deployed version, supported devices and printers, and end-to-end offline proof.
- Analytics account ownership before enabling external collection.
