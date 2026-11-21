# HALDEN — Design coverage audit (Stitch)

Status after implementing every exported Stitch screen (20 Nov 2026).

## Designed in Stitch and implemented

| Stitch prompt | Screens | Status |
|---|---|---|
| S1 Desktop homepage | 04 | Built (`/`, ≥ md) |
| S2 Desktop fleet discovery | 12 | Built (`/fleet`, ≥ lg) |
| S3 Desktop vehicle detail | 19 | Built (`/fleet/[slug]`, ≥ md) |
| S4 Desktop booking | 20 Trip · 21 Extras · 22 Details · 24 Review · 23 Confirmed | Built (`/book/[slug]/…`) |
| S5 Mobile | 28 Home · 26 Fleet · 29 Filters · 30 Detail · 27 Menu | Built (< md / < lg) |
| S6a Sign in | 31 | Built (`/sign-in`) |

## Missing for a complete MVP

Ordered by how much the current product needs them.

| # | Screen / state | Why it matters | Currently |
|---|---|---|---|
| 1 | **Customer dashboard** — upcoming & past reservations, booking detail, cancel / modify | Destination of "View my bookings" and "Patron Circle"; core to a rental product | Not designed; confirmation links to the fleet instead |
| 2 | **Mobile booking flow** (trip calendar, extras, details, review, confirmation) | Most rentals start on phones; desktop layouts are only responsive fallbacks today | Desktop layout stacks on mobile |
| 3 | **Registration + passcode recovery** | "Request Access" / "Forgot passcode?" | Same sign-in layout with a name field |
| 4 | **Favourites / saved exhibits page** | Hearts already work (local) but there's nowhere to see the list | Not designed |
| 5 | **Journeys index + journey detail** (route, map, suggested cars) | Homepage "Curated routes" cards and "Plan a journey" CTAs | Link to filtered fleet |
| 6 | **About / The Standard** | Footer & menu links (manifesto, inspection protocol, delivery) | Anchor to homepage sections |
| 7 | **Admin dashboard** — fleet, availability calendar, bookings, customers | Needed once MongoDB + auth exist | Not designed |
| 8 | **States**: fleet empty state, booking unavailable / conflict, form-level server error, 404, loading skeletons, offline | Every real workflow hits these | Built from tokens, not reviewed in Stitch |
| 9 | **Dialogs**: itinerary editor (fleet "Edit"), photo lightbox, mobile itinerary sheet ("Where and when?") | Present in the UI but undesigned | Built from tokens |
| 10 | **Legal pages**: Terms, Privacy, Imprint, cookie notice | Required before any public launch in the EU | Not present |
| 11 | **Mobile sign-in** | Sign-in is responsive but was only designed desktop-first | Responsive fallback |
| 12 | **Tablet (768–1023 px) review** | Desktop compositions start at 768 px; worth one Stitch pass at 834 px | Works, not art-directed |

## Recommendation

Yes — more Stitch work is needed for a genuine MVP. Suggested order of prompts:

1. Customer dashboard + booking detail/cancel (desktop and mobile in one prompt, reuse the booking "dossier" components).
2. Mobile booking flow (5 screens) — highest user impact.
3. Journeys index + journey detail, About/The Standard.
4. Registration, passcode recovery, favourites page.
5. Admin dashboard (overview, fleet table, availability calendar, booking detail) — after the backend schema is agreed.
6. A "states & dialogs" sheet: empty/error/unavailable states, itinerary editor, lightbox, cookie banner.

Each prompt should restate the DESIGN.md system (palette, Bodoni Moda / Manrope / Space Mono, 0–2 px radii, hairlines,
no shadows) and attach a screenshot of an existing screen so Stitch keeps the same language.
