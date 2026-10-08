# Ansilum design language

The landing page's design decisions, written so the Ansilum mobile app (Flutter) can share the same look, voice, and motion. Values are taken from the website code as of 9 October 2026; when they change, update this file in the same commit.

Source of truth in this repo:

| What | Where |
| --- | --- |
| Colour tokens and fonts | `tailwind.config.js` |
| Component styles and every animation | `src/styles/marketing.css` |
| AI chat example | `src/components/site/consultation-preview.tsx`, copy in `src/content/consultation.ts` |
| Line art | `src/components/site/line-art.tsx` |
| Plans and prices | `src/content/pricing.ts` |
| Money formatting | `src/lib/format.ts` |
| What we may and may not claim | `docs/CLAIMS.md` |

## 1. Principles

1. **Made for UMKM owners, not tech people.** Every screen should make sense to a warung owner on a busy afternoon. Plain words, real numbers, one clear next action.
2. **Confident, not hedging.** Say what the product does. No "may", "might", "in beta preview" labels scattered over the interface, and no small-print disclaimers under examples. Status belongs in one clear place (for example a "Segera hadir" badge), not repeated everywhere.
3. **Numbers first.** An answer always quotes the amount and the period: "Penjualan minggu ini Rp10.800.000, turun 10% dari Rp12.000.000." Never just "penjualan turun".
4. **Clean and modern, not "AI-looking".** White surfaces, one strong orange, near-black text. Avoid the usual AI-design habits: serif display fonts, cream backgrounds, purple gradients, glowing blobs, sparkle icons everywhere, pill-shaped everything, dot-separated captions ("A · B · C"), and walls of cards.
5. **Motion that explains.** Animation shows sales flowing into an answer: a receipt prints, dots light up, a pulse travels along a line, the answer types in. It never moves the layout under the user's finger.
6. **UMKM in general, not three examples.** Coffee shops, barbershops, and food stalls are examples. The product is for every everyday business: warung makan, toko kelontong, laundry, salon, bengkel, katering, toko baju, toko roti.

## 2. Voice and copy

- **Indonesian first** (default locale `id`), English second. Write each language natively; do not translate word for word.
- Address the owner as **Anda**. Short sentences. Everyday words: "catat penjualan", "laporan penjualan", "tanya", "yang perlu dicek".
- Prefer the owner's words over system words:

| Use | Avoid |
| --- | --- |
| penjualan, pesanan, menu, produk | transaksi data, record, entitas |
| rata-rata belanja per pesanan | average order value, AOV |
| Tanya Ansilum | prompt, query |
| Yang perlu dicek | rekomendasi tindakan, action items |
| Segera hadir | dalam pengembangan, beta preview |
| Tersimpan | sinkronisasi berhasil |

- The assistant is called **Ansilum** in the chat. The owner's side is **Anda / You**.
- Questions in examples sound like a real owner: "Menu apa yang paling laku?", "Hari apa penjualannya turun?", "Kenapa hari Selasa sepi?"
- Headings may use the two-tone pattern: a statement in ink followed by a quieter line in `soft`. Example: "Semudah mencatat penjualan. *Tidak perlu paham AI.*"

### Numbers and money

| | Indonesian | English |
| --- | --- | --- |
| Full amount | Rp12.000.000 | Rp12,000,000 |
| Compact (charts) | Rp7 jt, Rp450 rb | Rp7M, Rp450K |
| Change | −Rp800.000 / +Rp100.000 | −Rp800,000 / +Rp100,000 |
| Unchanged | Tetap | Same |

No space after "Rp". Use a true minus sign (−) for decreases. Product names stay in Indonesian in both languages, as they appear on the menu (Es kopi susu, Pisang goreng).

## 3. Colour

| Token | Hex | Use |
| --- | --- | --- |
| `canvas` | `#FFFFFF` | Page and card background |
| `mist` | `#F4F5F7` | Tinted sections, chart panels, illustration backgrounds |
| `line` | `#E3E6EB` | Borders and dividers (dotted art tracks use `#D5DAE1`) |
| `steel` | `#9AA4B2` | Secondary data series, "other" category, last week |
| `ink` | `#111418` | Text, primary buttons, owner chat bubble |
| `soft` | `#545D6A` | Secondary text (6:1 on white) |
| `night` | `#0D1117` | Dark sections, footer, AI credits panel |
| `brand` | `#FF5B1F` | The Ansilum orange: highlights, chart focus series, nodes, icons. Not for small text on white |
| `brand-ink` | `#C23D0C` | Orange text and links on white (passes AA) |
| `brand-soft` | `#FFEEE6` | Highlight background, assistant avatar |
| `leaf` | `#12805A` | Saved, included, success, checked items |
| `leaf-soft` | `#E2F5EC` | Success background ("Tersimpan" badge) |
| `sun` | `#FFC53D` | Accent on dark backgrounds, "Segera hadir" badge, illustrations |

**Brand gradient** (hero band, final call to action, share image): `linear-gradient(100deg, #FF5B1F 0%, #FF7A2E 45%, #FFC53D 100%)`. Put ink text on it, not white.

Rules:

- One orange accent per view. The data series the answer talks about is orange; everything else is `steel`.
- White text never sits on plain orange (it fails contrast); use ink.
- Dark sections use white text at 70–85% opacity for body copy and `sun` for accents.

## 4. Typography

One family: **Plus Jakarta Sans** (designed in Jakarta), for headings and body. No serif and no second display font.

| Style | Size (mobile → desktop) | Weight | Line height | Letter spacing |
| --- | --- | --- | --- | --- |
| Display XL (hero) | 40 → 60 → 72 px | 700 | 1.05 | −0.04 em |
| Display L (section) | 32 → 44 → 52 px | 700 | 1.1 | −0.035 em |
| Display M | 26 → 32 px | 700 | 1.15 | −0.03 em |
| Title (card, step) | 20 px | 700 | 1.3 | −0.02 em |
| Lead | 18 → 20 px | 400 | 32 → 36 px | 0 |
| Body | 15–17 px | 400 | 1.6–1.75 | 0 |
| Label / caption | 12–14 px | 600 | 1.5 | 0 |

For a mobile app, use Display M as the largest in-app heading and keep the tight negative tracking on anything 20 px or bigger. Use tabular figures (`FontFeature.tabularFigures()` in Flutter) for money columns.

## 5. Shape, spacing, depth

| Element | Radius | Notes |
| --- | --- | --- |
| Buttons, chips, inputs, small badges | 8 px | Not pills |
| Status badge | 6 px | |
| Cards, chat window, plan grid | 16 px | 1 px `line` border |
| Large panels (screenshot frame, call to action) | 24 px | |
| Chat bubbles | 16 px, with the corner nearest the speaker at 6 px | |

- Buttons are at least 48 px tall (44 px for text links); chips at least 40 px. Touch targets never go below 44 px.
- Shadow, used only on the app window and phone frames: `0 24px 64px -28px rgba(17,20,24,0.35)`. Everything else is flat with a border.
- Prefer one bordered grid with 1 px dividers over several floating cards (see the plan cards and the customer list).
- Section rhythm on web: 80–112 px vertical padding. In the app, use 16/24/32 px steps.

## 6. Components

**Buttons**

- Primary: ink background, white text, 8 px radius, semibold 15 px. Hover/pressed: `brand-ink`.
- Secondary: white, 1 px `line` border, ink text; the border turns ink on hover.
- Text link: `brand-ink`, semibold, with an arrow that nudges 3 px right on hover.
- One primary action per screen.

**Chips (question suggestions):** white, 1 px `line` border, 8 px radius. The selected chip is filled ink with white text.

**Segmented control (Grafik / Angka):** white track with a 1 px border; the selected segment is filled ink.

**Status badges:** `leaf-soft` with leaf text for available, `brand-soft` with `brand-ink` for "Segera hadir", `mist` with `soft` for later.

**Checklist:** 20 px rounded-square checkbox; when checked it fills `leaf` with a white tick and the text gets a leaf strike-through.

**Numbered steps:** a 2 px rule on top (with a travelling glow; see Motion), "01" in `brand-ink` bold 14 px, a bold title, then a short line of body text.

**Icons:** Heroicons outline, 20 px, stroke 1.5 (2.5 for ticks). Orange (`brand`) when marking a feature, `leaf` for included or success.

## 7. The AI chat pattern

This is the heart of the product and should look the same in the app as in the website demo.

- **Header:** the Ansilum mark (an orange 32 px rounded square with a white "a"), the business name, and the period ("28 Sep – 4 Okt 2026").
- **Owner bubble:** right-aligned, ink background, white text, at most 88% width.
- **Assistant:** a 28 px `brand-soft` circle with an orange "a" on the left, then plain text with no bubble.
- **Answer structure:**
  1. Facts with numbers, in short sentences.
  2. One plain-language takeaway.
  3. "Yang perlu dicek" with two or three checkable items.
- **Linked numbers:** phrases tied to chart data get a 2 px orange underline at 50% opacity. Tapping one highlights its series; the other series fade to 25–30% opacity, and tapping again clears it.
- **Data panel:** chart title, comparison period ("Dibanding 21–27 Sep"), a Grafik / Angka toggle, and the chart or a table with Minggu lalu / Minggu ini / Selisih columns. Decreases are shown in `brand-ink`.
- **Suggestions:** "Tanya Ansilum" with question chips, then the composer ("Tanya soal penjualan Anda…") with an ink send button.
- **Mobile layout:** suggestion chips sit above the conversation, so they don't move when an answer changes length. Keep the answer area at a stable minimum height.
- **Charts:**
  - Weekly bars are 36 px tall and stacked, with a 6 px radius. Product-change bars are 10 px tall and fully rounded.
  - Daily columns are paired: last week in `steel` at 40% opacity, this week in `steel`, and notable days in `brand`.
  - A legend sits under every chart.

## 8. Motion

Animate only transform, opacity, blur (filter), and stroke offsets, so nothing changes layout. This fixed the jitter the earlier version had. Loops pause while off screen. Respect the system's reduce-motion setting: show final states instantly and hide moving pulses.

**Easing**

| Name | Curve | Flutter |
| --- | --- | --- |
| Out (default) | `cubic-bezier(0.2, 0.7, 0.2, 1)` | `Cubic(0.2, 0.7, 0.2, 1)` |
| In-out (pulses) | `cubic-bezier(0.45, 0, 0.55, 1)` | `Cubic(0.45, 0, 0.55, 1)` |
| Draw | `cubic-bezier(0.65, 0, 0.35, 1)` | `Cubic(0.65, 0, 0.35, 1)` |

**Entrances**

| Motion | Spec |
| --- | --- |
| Reveal on scroll | From opacity 0, 18 px down, blur 6 px, over 700 ms out; siblings stagger 90–150 ms |
| Headline words | Each word rises 0.4 em from blur 10 px, over 800 ms; 60 ms between words |
| Owner bubble | From 10 px down, scale 0.96, blur 6 px, over 450 ms |

**AI typing sequence** (replays every time a question is asked)

1. Thinking dots: three 6 px orange dots bouncing 3 px, 150 ms apart, for about 900 ms.
2. Answer words appear **one by one, left to right**: each goes from opacity 0 and blur 8 px to sharp over 450 ms, starting 32 ms after the previous word.
3. Each linked phrase's underline draws left to right over 700 ms once its last word has appeared.
4. "Yang perlu dicek" and each checklist item rise in after the text, 120 ms apart.
5. Chart bars grow from zero (scale on x or y) over 900 ms, staggered 60–90 ms, starting about 300 ms after the question.

**Loops** (line art and status)

| Motion | Spec |
| --- | --- |
| Pulse | An 8% long orange dash travels along a dotted track, every 2.6–3.4 s |
| Ping | A node scales to 2.6× while fading out, every 2.4 s |
| Twinkle | Halftone dots fade between 25% and 100% opacity in a diagonal wave, every 2.6–3.2 s |
| Float | Chat bubbles in illustrations move 6 px up and down, every 5 s |
| Rule glow | A soft orange highlight sweeps along step dividers, every 3.6 s |

**Small touches:** arrow nudge on hover (200 ms); colour changes on buttons (150 ms); content swaps fade over 240 ms.

## 9. Line art and illustration

The visual signature is **sales travelling along a line into an answer**.

- **Strokes:** 2.25 px ink outline with round caps and joins. Fills are white, `mist`, or `sun`, and orange is reserved for the meaningful part (the cashier screen dot, a node, the data that matters).
- **Tracks:** dotted (2 px dash, 7 px gap) in `#D5DAE1`, with orange pulses running along them.
- **Nodes:** solid orange (or `sun` on dark) circles with a ping ring. The Ansilum mark is the main node: an orange rounded square (30% radius) with a white "a".
- **Scenes:** everyday counters (warung cart with awning, espresso bar, barber mirror and pole, grocery shelves), each with a cashier tablet whose orange screen dot sends a pulse up to the Ansilum mark.
- **Halftone:** small dot grids, a nod to Cloudflare's dot-matrix style, used as twinkling patches, dot-matrix bar charts, and a dot field behind dark sections.
- **Step art:**
  1. A receipt printing ("Catat penjualan").
  2. Dot-matrix bars ("Ansilum merapikan angkanya").
  3. A question bubble with typing dots ("Tanya").
- **Placement:** use it in empty states, onboarding, and loading screens in the app. Keep it decorative: hidden from screen readers, and never the only place information appears.

## 10. Pricing (as shown on the site)

| Plan | Monthly | Outlets | Features |
| --- | --- | --- | --- |
| Basic | Rp50.000 | 1 | Aplikasi kasir (POS) |
| Standard (Rekomendasi) | Rp200.000 | 3 | + Manajemen stok, Laporan penjualan |
| Full | Rp500.000 | Tanpa batas | + Laporan & analitik lanjutan, Sinkron multi-outlet, Stok opname, Purchase order (PO) |

AI assistant: **Segera hadir**, paid with pay-as-you-go credits ("Bayar sesuai pemakaian"), with credit prices announced at launch. Yearly prices are not published yet. Keep the in-app subscription screen and the website in step; the prices live in `src/content/pricing.ts`.

## 11. Do and don't

| Do | Don't |
| --- | --- |
| Quote amounts and periods in every answer | Say "sales dropped" without numbers |
| One orange focus per view | Orange text on white for body copy (use `brand-ink`) |
| One bordered grid, flat surfaces | Stacks of floating shadowed cards |
| Plain status badge ("Segera hadir") | Dot-separated captions or repeated disclaimers |
| Plus Jakarta Sans everywhere | Serif display fonts |
| Transform / opacity / blur animations | Animating width, height, or position in ways that shift layout |
| Keep tap targets still while content changes | Move chips or buttons when an answer loads |
| Name real customers only as facts (business, type, owner) | Invent testimonials, logos, or customer numbers (see `docs/CLAIMS.md`) |
