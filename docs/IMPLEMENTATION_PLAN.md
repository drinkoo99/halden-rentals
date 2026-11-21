# HALDEN — Implementation plan (Stitch → Next.js)

Source of truth: the Google Stitch project "Halden Luxury Car Rental", exported as ZIPs
(`design/stitch-export/NN/` — `code.html` + `screen.png`, plus `DESIGN.md` on later screens).
`design/stitch-clipboard/` holds earlier "Copy as Code" copies of the same screens (identical markup).

## Stack (as created)
- Next.js 16.4 (App Router, `cacheComponents` + `partialPrefetching` on), React 19.3, TypeScript
- Tailwind CSS 4.3 — one theme in `src/app/globals.css` that contains every token used by the Stitch screens
- Fonts via `next/font/google`: Bodoni Moda, Manrope, DM Mono, Space Mono; icons: Material Symbols Outlined
- No backend yet. Fleet, locations and extras are typed mock data in `src/data/`. Booking state lives on the client.
  MongoDB / auth / payments come later and are out of scope here.

## Screen → route map
| Stitch export | Screen | Route / component |
|---|---|---|
| 04 (=05) | Homepage, desktop | `/` (≥ md) |
| 28 | Homepage, mobile | `/` (< md) |
| 27 | Mobile navigation menu | `MobileMenu` (all pages, < md) |
| 12 | Fleet discovery, desktop | `/fleet` (≥ lg) |
| 26 | Fleet discovery, mobile | `/fleet` (< lg) |
| 29 | Mobile filter sheet | `FilterSheet` on `/fleet` (< lg) |
| 19 | Vehicle detail, desktop | `/fleet/[slug]` (≥ md) |
| 30 | Vehicle detail, mobile | `/fleet/[slug]` (< md) |
| 20 | Booking — Trip (step 02) | `/book/[slug]/trip` |
| 21 | Booking — Extras (step 03) | `/book/[slug]/extras` |
| 22 | Booking — Details (step 04) | `/book/[slug]/details` |
| 24 | Booking — Review (step 05) | `/book/[slug]/review` |
| 23 | Booking — Confirmed (step 06) | `/book/[slug]/confirmed` |
| 31 | Sign in | `/sign-in` |
| 00–03, 06–11, 13–18, 25 | Standalone image assets | `public/images/stitch/` (reference) |

## Translation rules
- Keep the exported markup and class names, converted to JSX. Tailwind v3 → v4 renames only
  (`flex-shrink-0`→`shrink-0`, `flex-grow`→`grow`, `bg-gradient-to-*`→`bg-linear-to-*`) plus a small
  v3-compat base layer (default border colour, placeholder colour, button cursor, v3 shadow/blur scale).
- Desktop and mobile screens are separate compositions in Stitch, so each section renders the
  matching composition per breakpoint instead of forcing one layout to stretch.
- Each screen keeps its own palette exactly (desktop screens use the brand hexes; mobile/booking screens
  use Stitch's generated Material-style tokens). Both token sets are in the theme.
- Mono font: desktop home/fleet/detail screens use DM Mono (`font-mono`); all other screens and DESIGN.md
  use Space Mono (`font-label-mono`, `font-spec-numeral`). Kept per screen as designed.
- Images: the screens reference Google-hosted Stitch images (lh3.googleusercontent.com). All URLs are
  centralised in `src/data/media.ts` so they can be swapped for local files in one place.
- Copy, prices and counts that the design shows as live data (e.g. "24 cars for your dates") are derived
  from the data so the UI never claims numbers it can't back up.

## Interactivity
- Navigation, mobile menu (Esc/close, closes on navigation), sticky headers
- Homepage search bar → `/fleet?location=&from=&to=`
- Fleet: filters (category, brand, price, transmission, seats, powertrain, features, availability),
  removable chips, sort, results count; mobile filter sheet with "Show N cars"
- Vehicle detail: gallery, booking panel → booking flow
- Booking: step navigation, return-location toggle, date/time, extras with live price summary,
  validated driver details form, review, confirmation (clearly a demo — no real payment/booking)
- Sign in: validated form (demo only — no real authentication)
- Favourites: toggled locally

## Missing / ambiguous in the Stitch project (not invented)
- Customer dashboard, reservations, favourites page, registration, admin dashboard, About and
  Journeys pages, booking step 01 "Car" screen, mobile versions of booking and sign-in.
  Links to these point to the nearest existing screen or stay inert, and are listed in the README.
