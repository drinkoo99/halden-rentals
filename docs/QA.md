# HALDEN — QA record

Front-end only (no backend yet). This file records the Phase 1 quality checks: what was run, how, and what came out.
Sections are added as each Phase 1 check is completed.

## 1. Responsive sweep (Phase 1, task 9) — 21 Nov 2026

**How:** Playwright (Chromium) against `next dev` on `localhost:3000`, scripted. Every route below loaded at
**390, 768, 1280, 1440 and 1920 px** wide (900 px tall). For each load the script checks:

| Check | Pass condition |
| --- | --- |
| HTTP status | 200 (404 for the deliberate not-found probe) |
| Horizontal page overflow | `scrollWidth − clientWidth = 0` (no sideways page scroll) |
| Duplicate `id`s | none (desktop and mobile variants render together; mobile ids use an `m-` prefix) |
| Broken images | no visible `<img>` with `naturalWidth = 0` after load |
| Console / page errors | none, ignoring dev-only tooling messages (HMR, React DevTools hint, instant-navigation validation) |

**Routes (37):** `/`, `/fleet`, `/fleet/porsche-911-gt3-touring`, `/journeys`, `/journeys/high-alpine-transversal`, `/about`,
`/terms`, `/privacy`, `/imprint`, booking `trip → extras → details → review → confirmed`, `/sign-in`, `/sign-in/error`,
`/request-access`, `/forgot-passcode`, `/reset-passcode`, `/account`, `/account/settings`, reservation detail / modify / cancel,
the 8 desktop staff-console screens, the 3 curbside screens, `/states`, and `/does-not-exist`.

**Result: 185 / 185 loads pass.** The only flagged entries were the five `/does-not-exist` loads, which log the browser's
expected "404 (Not Found)" for the document itself — that is the not-found page working as intended.

### Issues found and fixed in this pass

| Issue | Widths | Fix |
| --- | --- | --- |
| 8 desktop staff-console screens scrolled the whole page sideways (+220 to +747 px) | 390, 768 (and 1024) | `StaffConsoleFrame`: below 1280 px the screen keeps its 1280 px Stitch layout inside a sideways-scrolling frame, with a "Desktop console" note linking to the curbside console. Desktop unchanged. |
| `/states` reference board: header and index rows did not wrap (+145 px) | 390 | Rows wrap (`flex-wrap`, gap instead of `space-x`). |
| Cookie-banner specimen on `/states` too wide in a row (+14 px) | 768 | Stacks below `lg`. The live cookie banner had the same row layout (fixed, so it clipped rather than overflowed) and got the same fix. |
| Account "Past journeys" table scrolled inside its frame (+39 px at 1280, +24 px at 1440/1920) | 1280–1920 | Vehicle and hub cells may wrap; the "· Planned" suffix on planned controls now drops to its own line as a unit instead of forcing one long line. Fits at 1280+. At 1024 it scrolls inside its own frame, by design. |
| `/book/[slug]` (redirect to the trip step) produced a dev instant-navigation validation error | all | `export const instant = false`, like its sibling booking routes. |
| Earlier report of HTTP 500 on vehicle/booking pages at ≥1280 | — | Not a code fault: the dev server had run out of memory. Re-checked after a clean restart: all pass. |

### Known, accepted

- **Staff console below 1280 px** is a scroll frame, not a responsive redesign — Stitch designed those 8 screens for laptops,
  and the 3 curbside screens are the handheld staff UI.
- **Staff bookings / fleet tables** scroll horizontally inside their own table frame even on desktop. That is the Stitch layout
  (wide columns with fixed minimums); the page itself never overflows.
- **Staff demo banner** is fixed bottom-right and covers part of the screen on phones; it is a demo-only notice.
- Checks ran in Chromium only here; other browsers are covered in the browser-compatibility section.

## 2. Accessibility (Phase 1, task 10) — 21 Nov 2026

**How:** axe-core 4.10.2, injected into the page from cdnjs at test time (no project dependency), tags
`wcag2a, wcag2aa, wcag21a, wcag21aa, best-practice`. 33 routes (all customer, auth, account, booking, staff and
curbside screens plus the 404) at **1440 px and 390 px**, against the production build (`next build && next start`).

| Run | Critical | Serious | Moderate | Minor |
| --- | --- | --- | --- | --- |
| Before | 3 rules / 38 nodes (calendar ARIA roles, 8 unlabelled inputs, 28 unnamed selects) | colour contrast 621 nodes on 49 page-scans; 1 prohibited `aria-label` | heading order (10), duplicate / nested `<main>` (7+7), landmark names (9), content outside landmarks (26), missing `h1` (4) | redundant alt text (3) |
| After | **0** | colour contrast: **32 nodes, all decorative** (see below) | **0** | **0** |

### What changed

- **Contrast (the bulk):** text tokens tuned just enough for 4.5:1 on every background they sit on —
  `outline` #737973 → #616661, `muted`/`text-muted` #666B65 → #616660, `sage` #738273 → #5E6A5E. Dark sections
  (home/fleet footer bands, cookie bar) get lighter shades through a scoped `.on-dark` class instead, so the same
  tokens also pass on #171B19. Hard-coded greys on the vehicle page, reservation screens, staff fleet amber text,
  curbside crimson label and dimmed timeline/table rows were lifted the same way. The visual change is a slight
  darkening of small grey labels.
- **Forms:** every `<label>` is tied to its control (sign-in error, settings on phones, modify itinerary); every staff
  `<select>` has an accessible name from its visible context (hub, brand, category, status…).
- **Structure:** booking calendar months are `role="group"` (not an incomplete `grid`); mobile booking steps and the
  reset-passcode form no longer nest a second `<main>`; staff sidebars, demo banner and the console-frame notice are
  named landmarks; curbside screens have a (visually hidden) `h1`; heading levels no longer skip (fleet cards,
  booking summary, extras, review, sign-in error, staff availability, reservation detail); the dimmed page behind the
  cancel dialog is `inert`; the passcode-strength meter is `role="img"`; table thumbnails next to the car name use
  empty alt text.

### Remaining, by decision

- **32 decorative nodes:** greyed adjacent-month dates in the trip and modify calendars, and the visual-only card
  fields on the review step (`aria-hidden`, payment is taken at handover). WCAG 1.4.3 exempts text that is pure
  decoration or part of an inactive component; axe still counts it.
- **Lighthouse "legible font sizes"** (best-practices, account page on phones): the Stitch design uses 9–11 px mono
  labels throughout. Kept as designed; they now meet contrast AA.

### Gotcha found on the way

Tailwind v4's `@theme` parser read a value out of a trailing comment (`--color-outline: #616661; /* was #737973 */`
compiled to `#737973`). Theme token lines must not carry trailing comments.

## 3. SEO (Phase 1, task 12) — 21 Nov 2026

- `src/lib/seo.ts` `publicMeta()` gives every public page (home, fleet, each vehicle, journeys, journey detail, about,
  terms, privacy, imprint) a title, description, **canonical URL**, and matching **Open Graph** and **Twitter**
  (`summary_large_image`) tags. Vehicles use their own photo; the journey uses its hero; everything else the home hero.
- Private and transactional pages (`/account`, `/book/…`, `/staff`, `/states`, sign-in, request-access,
  forgot/reset passcode) are `noindex` in their metadata **and** disallowed in `robots.txt`.
- Staff titles no longer read "… — HALDEN Operations | HALDEN".
- `sitemap.xml` lists the public pages and all 10 vehicles.
- Canonical / `og:url` resolve against `NEXT_PUBLIC_SITE_URL` (falls back to `http://localhost:3000`) — set it on deploy.
- Lighthouse SEO is 100 on every public page; the 66 on account, sign-in and booking is the intended `noindex`.
