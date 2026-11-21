# HALDEN

A premium European car-rental platform — "The Gallery". Cars are presented like exhibits in an architectural
gallery: warm ivory and stone, deep ink, forest green, Bodoni Moda headlines, Manrope UI and mono specifications.

The visual design is a faithful implementation of the Google Stitch project **"Halden Luxury Car Rental"**
(exports in `design/stitch-export/`). See `docs/IMPLEMENTATION_PLAN.md` for the screen → route map.

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
- **Sign in** (`/sign-in`): validated sign-in / request-access forms. Accounts are not live yet; the page says so
  instead of pretending to sign in. `?next=` only accepts same-site paths.
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

## Not designed in Stitch yet

Customer dashboard / reservations / favourites page, registration flow, admin dashboard, About and Journeys pages,
mobile booking and mobile sign-in layouts (the desktop layouts are responsive in the meantime), and dialogs such as
the itinerary editor and photo lightbox (built from existing tokens).

## Project layout

```
design/            Stitch exports (source of truth), token dump, image originals backup
docs/              Implementation plan
public/images/     Photography (Stitch exports + Stitch originals at full size)
src/app/           Routes
src/components/    home/, fleet/, vehicle/, booking/, auth/, site/, ui/
src/data/          vehicles, locations, extras, media (single place for every image)
src/lib/           itinerary, pricing, fleet filters, favourites, booking validation (+ *.test.ts)
```
