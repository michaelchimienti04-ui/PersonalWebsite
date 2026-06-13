# Design Spec: Realtor Site Visual Redesign ("Detroit Dusk")

Date: 2026-06-13
Owner: Michael Chimienti (realtor & investor, Southeast Michigan)
Status: Approved direction, ready for implementation planning

## Context

The site was rebuilt in a prior session as a single-scroll React landing page
(Hero, Trust, Buyers/Sellers, Home Value, Recent Sales, Listings, Reels,
Testimonials, Contact, Footer) with a pine-green and sun-gold "social-native"
look. The user then asked for better designs and colorways, more market research,
and references to popular sites in this market.

After research and a guided visual exploration, the user selected a new colorway
direction and asked to flip it so the light cream is dominant and teal is the
complementary accent. The structure, sections, copy, and features from the prior
build stay. This spec covers only the visual system (color, type, polish) plus a
small content correction to the trust-band stats. No layout or feature changes.

Intended outcome: a lighter, calmer, "quiet luxury" feel that still reads as a
distinctive personal brand, speaks to young first-time and move-up buyers without
alienating move-up sellers, and is honest about a first-year agent's track record.

## Market basis (confirmed by research)

- Highest-volume buyers are millennials and Gen Z in walkable inner-ring metro
  Detroit suburbs (Ferndale, Royal Oak, Dearborn) and Detroit's Midtown, with
  starter homes around $200K to $300K. They value walkability, affordability,
  community, lifestyle, and a hyper-local guide.
- Boomers paying cash are winning a lot of listings, so young buyers want an agent
  who helps them actually compete. That is the emotional hook.
- 2026 design lanes that win: "quiet luxury" (warm light, restrained palette,
  oversized editorial type, lots of air) and "authentic earthy." Blue-green is a
  called color of 2026. The chosen direction sits at the intersection: a cool
  teal-led palette delivered in a light, airy, quiet-luxury layout.

## Audience and positioning

- Balanced: lead with the young first-time and move-up buyer, keep enough polish
  for move-up and near-luxury sellers.
- First-year agent framed as a strength in copy: hungry, fully available, an
  investor's eye for value, outsized attention per client. Never imply more
  experience or production than is real.

## Visual system: Detroit Dusk (light / cream dominant)

Cream is the dominant color across the whole page. Teal is the main complementary
accent doing the structural work (headlines, buttons, logo, key elements). Seafoam
is reserved for small pops. There is exactly one deep-teal full-bleed moment, the
footer, as a grounding anchor.

### Palette (CSS variables)

- `--cream: #F3EEE2` (dominant background)
- `--cream-2: #EAE3D2` (tonal alternate sections)
- `--paper: #FBF8EF` (cards, raised surfaces)
- `--teal: #0E3A38` (primary accent: headlines, buttons, logo)
- `--teal-deep: #0A2C2B` (footer, deepest)
- `--teal-mid: #1C7A70` (brighter teal-green for italic accent words and small marks on light)
- `--seafoam: #7ECEC1` (small accents: eyebrow tick, marquee dots, chip, hovers)
- `--seafoam-soft: #CFE9E2` (optional tinted panel background)
- `--ink: #17211F` (body text on cream)
- `--ink-soft: #54635F`
- `--ink-faint: #8C968F`
- `--line: #DCD4C1` (hairlines on cream)
- `--line-dark: rgba(237,233,219,.14)` (hairlines on teal)

### Typography

- Display: Playfair Display (700, and italic 500/600 for accent words). Oversized
  headlines used as a design element.
- Body: Hanken Grotesk (400 to 600).
- Labels, eyebrows, stats suffixes, buttons: Space Mono.
- Replace the prior Bricolage Grotesque import with Playfair Display. Keep Hanken
  Grotesk and Space Mono.

### Components and treatments

- Buttons: 8px radius (softer, more refined than the prior full pills), Space Mono
  uppercase label.
  - `btn-teal`: teal background, cream text (primary on light sections).
  - `btn-line`: transparent, teal text, teal border (secondary on light).
  - `btn-accent`: seafoam background, deep-teal text (used sparingly, e.g. the
    sticky mobile primary and the nav CTA).
- Eyebrow: Space Mono, teal-mid, with a short seafoam tick before it.
- Headlines: deep teal Playfair. Accent words italic in teal-mid.

### Section-by-section treatment (cream dominant)

- Nav: translucent cream with blur, hairline bottom border. Logo is a teal tile
  with a seafoam monogram.
- Hero: cream background, soft seafoam radial glow top-right, teal Playfair
  headline with teal-mid italic accent, teal primary button, seafoam floating
  "24 hr" chip, portrait placeholder on `--paper`.
- Areas marquee: slim italic strip on `--cream-2` between hairlines, teal italic
  city names, seafoam dots. Replaces the prior heavy black band.
- Trust band: cream, white (`--paper`) stat cards with teal numbers.
- Buyers / Sellers value props: cream, white cards, teal headings, teal buttons.
- Home Value CTA: tonal block on `--seafoam-soft` to differentiate it from the
  plain cream and cream-2 sections, white form card with a teal top accent. Not a
  dark band.
- Recent Sales: cream.
- Listings: `--cream-2` tonal. Empty "between listings" state becomes a light card
  with a teal top accent and seafoam diamond mark (not a dark teal panel).
- Reels: cream, reel cards with teal/seafoam overlays.
- Testimonials: `--cream-2`. The first featured quote is a contained teal card
  (the one deliberate teal pop in the content), the rest are white cards.
- Contact: cream, white form card, teal headings, direct-contact info in teal.
- Footer: `--teal-deep` full-bleed, the single dark anchor. Seafoam accents.
- Sticky mobile bar: teal background, seafoam primary action. Small fixed element.

## Content correction: trust-band stats

Replace the placeholder stats with three honest, defensible numbers:

1. `$1M+` — In Closed Sales (real first-year volume; reads as real activity)
2. `24hr` — Typical Response (a promise a hungry new agent can keep)
3. `5.0★` — Client Rating (backed by real clients via the review feature)

Remove "serving 3 counties" and "100% Client-First". County coverage still appears
in the areas marquee and copy.

## Honesty and content guardrails (carry over)

- Testimonials must be real. The agent has at most two real clients so far, so seed
  with real quotes or reduce the count, and never present sample names as real.
- Stats are real as specified above. Do not inflate.
- `FORM_ENDPOINT` stays a clearly marked placeholder until the agent supplies one.
- Photo slots remain labeled placeholders mapped to `/pictures`.

## Writing style constraint

No em dashes anywhere, in site copy, metadata, comments, or docs. Use commas,
periods, parentheses, or colons. Copy should sound human, not AI.

## Files affected

- `styles.css`: replace color and type variables, swap font import to Playfair
  Display, retune every section from the dark-band scheme to the cream-dominant
  scheme described above, adjust button radius and accents. This is the bulk.
- `content.jsx`: update `STATS` to the new trio. No other data changes required.
- `tabs.jsx`: minor class or wrapper tweaks only where a section changes between
  dark and light (Trust, Home Value, Listings empty state, Testimonials featured
  card, Contact). No copy or structural changes.
- `app.jsx`: no logic change. Sticky mobile bar and nav inherit new colors via CSS.
- `index.html`: regenerate with `build-index.sh` after edits. Update the favicon
  monogram colors to teal/seafoam and `theme-color` to `#0E3A38`.

## Out of scope

- No layout, section order, or feature changes (sticky mobile bar, home-value form,
  reels, forms all stay).
- No new sections, no IDX, no neighborhood guides this round.
- No real photos or real testimonials authored here (the agent supplies those).

## Verification

1. Run `bash build-index.sh`, then render `index.html` headless (Edge
   `--dump-dom --virtual-time-budget`) and confirm React mounts, all sections
   render, and there are no console errors.
2. Confirm the page reads cream-dominant: only the footer is a full dark teal band,
   teal is used as accent elsewhere.
3. Confirm the trust band shows `$1M+`, `24hr`, `5.0★` and not the old stats.
4. Responsive pass at ~390px, ~768px, ~1280px. Sticky Call/Text/Browse bar appears
   on mobile only.
5. Grep the built `index.html` for em dashes and confirm zero.
6. Forms validate then show success; tel, sms, mailto links work.
