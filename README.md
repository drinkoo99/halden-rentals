# HALDEN

A premium European car-rental platform — "The Gallery". Cars are presented like exhibits in an architectural
gallery: warm ivory and stone, deep ink, forest green, Bodoni Moda headlines, Manrope UI and mono specifications.

The visual design is a faithful implementation of the Google Stitch project **"Halden Luxury Car Rental"**
(round 1 exports in `design/stitch-export/`, round 2 in `design/stitch-export-round2/`). See
`docs/IMPLEMENTATION_PLAN.md` for the screen → route map.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.4 (App Router, Cache Components + Partial Prerendering) |
| UI | React 19.3, TypeScript, Tailwind CSS 4.3 |
| Forms & validation | react-hook-form + Zod 4 |
| Fonts / icons | `next/font` (Bodoni Moda, Manrope, DM Mono, Space Mono), Material Symbols |
| Tests | Vitest |
| Planned | MongoDB Atlas, authentication, payments (not built yet) |

## Scripts

```bash
npm run dev        # http://localhost:3000
npm run build      # production build (prerenders every route)
npm run start      # serve the production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm test           # Vitest unit tests
```

## What works

- **Homepage** (desktop + separate mobile composition): hero, search bar → fleet with the chosen trip, collection,
  "The Standard", curated routes, testimonial, newsletter (validated, demo only).
- **Fleet** (`/fleet`): category, brand, price, transmission, seats, powertrain, feature and availability filters with
  live counts, removable chips, sorting, pagination (desktop) / load-more (mobile), mobile filter sheet, curator's pick,
  favourites (stored in this browser), editable itinerary. All filter state lives in the URL.
- **Vehicle detail** (`/fleet/[slug]`): gallery wall + lightbox, technical dossier, amenities, handover logistics,
  live price panel (19 % VAT), similar cars, share / save on mobile.
- **Booking** (`/book/[slug]/trip → extras → details → review → confirmed`): range calendar with past dates disabled,
  handover times, one-way returns, opt-in extras with live totals, validated driver form (age 28+, international phone,
  licence), review with consent, demo confirmation with printable dossier. State is kept in `sessionStorage`.
- **Mobile booking**: phones get the Stitch mobile booking screens (trip with hub and calendar sheets, extras,
  details with licence-country sheet, review with the disabled → active confirm state, confirmation with .ics
  download), sharing the same state and validation as desktop.
- **Patron account** (`/account`, `/account/settings`, `/account/reservations/hld-0612-4821` + `/modify`, `/cancel`):
  overview (empty state after cancelling), saved cars, settings with save confirmation, reservation dossier on desktop
  and mobile, modify drawer, cancel dialog → cancelled dossier. Demo data for one patron and one reservation.
- **Sign in & access** (`/sign-in`, `/request-access`, `/forgot-passcode`, `/reset-passcode`, `/sign-in/error`):
  validated forms, live passcode strength, resend countdowns, error/lockout state. Accounts are not live yet; the pages
  say so instead of pretending. `?next=` only accepts same-site paths.
- **Content** (`/about`, `/journeys`, `/journeys/high-alpine-transversal`): The Standard, enquiry form, route index with
  region/duration/season filters, journey detail with "Reserve for this route" into booking.
- **Staff console** (`/staff`, `/staff/fleet`, `/staff/bookings`, `/staff/availability`, `/staff/customers` and their
  detail pages) and the **curbside mobile console** (`/staff/curbside`, `/handover`, `/lookup`): Stitch designs with
  demo data and their micro-interactions; not protected and not connected to data until the backend phase.
- **System states** (`/states`): the Stitch reference board for loading, empty, error and dialog states.
- 404 page, sitemap, robots, per-vehicle metadata.

## Honest limits (demo)

- No backend: fleet, locations and extras are typed data in `src/data/`. No real availability, bookings, accounts,
  emails or payments. Every place that would normally confirm a real action is labelled as a demo.
- Copy for vehicles other than the Range Rover (which Stitch designed in full) follows the same structure but was
  written for this build; specs marked in `src/data/vehicles.ts` should be verified before launch.

## Deliberate deviations from the Stitch mockups

| Mockup | Implementation | Why |
|---|---|---|
| Paid extras pre-selected (screen 21) | Start switched off | Pre-ticked paid add-ons are a dark pattern |
| Terms checkbox pre-ticked (screen 24) | Unticked | Consent must be opt-in |
| "Total settled" on confirmation (23) | "Total reserved · due at handover" | No payment is taken |
| Card number pre-filled (24) | Illustrative placeholders, no card fields | No card data is collected online |
| Counts like "24 cars", "Showing 6 of 24" | Derived from the data | The UI never claims numbers it can't back up |
| "View my bookings" (23) | "Browse the fleet" | No account dashboard exists yet |

## Round 2 notes

- The round 2 screens were converted from the Stitch HTML with a markup-preserving converter (React attribute names,
  Tailwind v3 → v4 class renames, local images through `next/image`), then wired by hand. Layout and copy are Stitch's.
- 23 Stitch photos are only viewable inside Stitch (private `/aida/` URLs, not even in its own previews); they were
  matched to the same cars/scenes already in `public/images` (HD versions from round 1).
- Booking data uses the app's real hubs, extras and prices in euros where the mockups showed other hubs or dollars.
- Staff and account pages are demo screens: a real launch needs authentication and the database first.

## Project layout

```
design/            Stitch exports (source of truth), token dump, image originals backup
docs/              Implementation plan
public/images/     Photography (Stitch exports + Stitch originals at full size)
src/app/           Routes
src/components/    home/, fleet/, vehicle/, booking/ (+ mobile/), account/, auth/, content/, staff/, states/, site/, ui/
src/data/          vehicles, locations, extras, media (single place for every image)
src/lib/           itinerary, pricing, fleet filters, favourites, booking validation, ics, countdown (+ *.test.ts)
scripts/           image finalize (Real-ESRGAN blend), photo-sizes generator
```
