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

## 4. Performance (Phase 1, task 11) — 21 Nov 2026

**How:** Lighthouse 12.2.1 via `npx` (npm cache only, no project dependency), headless Chrome, against the production
build on `localhost:3000`. Mobile = Lighthouse default (simulated slow 4G, 4× CPU throttling); desktop =
`--preset=desktop`. Scores are performance / accessibility / best practices / SEO.

**Measurement noise:** on this 6 GB, 4-core laptop a single mobile run can swing by 10+ points depending on what else
the machine is doing (one sign-in run scored 59 with a Lighthouse CPU benchmark of 1,125; repeats scored 76–77 at
~1,700). Final mobile figures are therefore the **median of 3 runs**, and each run's benchmark index was recorded;
runs taken while the benchmark was depressed were repeated.

### Fixes

1. **Lazy LCP images** — the largest above-the-fold image on 13 round-2 screens (journeys, about, account,
   reservation, auth art, curbside) and the first row of fleet cards loaded `lazy`. Now `eager` +
   `fetchpriority="high"` (the LCP element was measured on each screen, not guessed).
2. **Booking layout shift** — on desktop the client-only booking UI replaced a shorter skeleton and pushed the footer
   down (CLS 0.80–0.90). The booking main area now has a full-viewport minimum height: CLS 0.
3. **Icon font** — the Material Symbols stylesheet loaded the *entire* icon set: a 4.0 MB font, ~87 % of every page's
   transfer size. It now requests only the 132 icons the app uses (`icon_names=`), with the same axes, so every
   filled/weight variant looks the same: **134 KB (−97 %)**. Page weight on home/fleet: **4.6 MB → 0.8 MB (−82 %)**;
   the icon font finishes ~400 ms earlier. `src/lib/icons.ts` holds the list; `icons.test.ts` fails if an icon used in
   the source is missing from it. Verified in the browser: 673 visible icons on 37 routes × 2 widths, none broken.

### Final scores (after all three fixes)

| Page | Mobile (median of 3) | Mobile before | Desktop | Desktop before |
| --- | --- | --- | --- | --- |
| Home | 84 / 100 / 100 / 100 | 84 | 99 / 100 / 100 / 100 | 99 |
| Fleet | 71 / 100 / 100 / 100 | 61 | 96 / 100 / 100 / 100 | 97 |
| Vehicle | 67 / 100 / 100 / 100 | 73 | 97 / 100 / 100 / 100 | 98 |
| Journeys | 83 / 100 / 100 / 100 | 72 | 95 / 100 / 100 / 100 | 99 |
| About | 77 / 100 / 100 / 100 | 73 | 99 / 100 / 100 / 100 | 97 |
| Booking trip | 86 / 100 / 100 / 66* | 85 | 94 / 96† / 100 / 66* | 75 |
| Sign in | 71 / 100 / 100 / 66* | 77 | 98 / 100 / 100 / 66* | 99 |
| Account | 77 / 100 / 96‡ / 66* | 71 | 96 / 100 / 100 / 66* | 99 |

"Before" = the Phase 1 baseline, single run. \* SEO 66 = intentionally `noindex`. † decorative calendar dates
(see Accessibility). ‡ "legible font sizes": the Stitch 9–11 px mono labels.

**Reading the table honestly**

- **Desktop meets the 90+ target on every page** (94–99).
- **Mobile does not reach 90** (67–86). Biggest gains: fleet +10, journeys +11, account +6, booking-trip desktop +19.
- Several mobile scores ended 3–6 points *below* an intermediate run taken before the icon-font fix (e.g. account 84,
  about 85, vehicle 73). This is a property of Lighthouse's *simulated* throttling, not a slowdown: the old 4 MB font
  finished after the page's observed LCP, so the simulation left it out of the LCP estimate; the 134 KB font now
  finishes before it, so the simulation adds its slow-4G download time (~0.4–0.6 s) to LCP. In the actual browser the
  font arrives ~400 ms *sooner*, observed LCP/FCP are unchanged (e.g. vehicle 997 → 1,063 ms, 597 → 613 ms, within
  noise) and every page is ~3.8 MB lighter — the change is kept.
- **What still costs mobile time:** script evaluation of ~1.1 s under 4× throttling, mostly the React / Next.js
  runtime (~570 ms in the framework chunk on every page) plus hydrating both the desktop and the mobile Stitch
  compositions that each page renders. Fleet's own code is ~60 ms. Rendering only one composition per device would be
  an architectural change and was out of scope for Phase 1.

## 5. Browser compatibility (Phase 1, task 13) — 21 Nov 2026

**How:** one Playwright script (library from npm's cache; no project dependency) run unchanged in each browser,
against the production build.

- **Page checks** — 14 key routes (home, fleet, vehicle, journeys, about, terms, booking trip, sign-in, request access,
  account, reservation, staff, curbside, 404) at **1440 × 900 and 390 × 844**: expected status, no JS / console
  errors, no horizontal overflow, icon font loaded with no missing glyphs, no broken images.
- **Interactions** — cookie banner (shows, "Accept necessary only" stores the choice, preferences reopen from the
  footer and close with Escape); fleet category filter updates the URL and count; vehicle lightbox opens / closes
  with Escape; booking trip → extras; sign-in validation; phone menu; phone fleet filter sheet; staff console frame on
  a phone (note shown, frame scrolls, page does not).

| Browser | Engine / version | Pages | Interactions |
| --- | --- | --- | --- |
| Google Chrome (installed) | Chromium 157 | 28 / 28 | 9 / 9 |
| Microsoft Edge (installed) | Chromium 157 | 28 / 28 | 9 / 9 |
| Firefox (Playwright build) | Gecko 159 | 28 / 28 | 9 / 9 |
| WebKit (Playwright build) | WebKit 27.2 — Safari's engine | 28 / 28 | 9 / 9 |

**Limits:** Firefox and WebKit are Playwright's builds (installed into Playwright's user cache, 354 MB and 177 MB), not
retail Firefox / Safari. WebKit on Windows approximates Safari's engine but not Safari itself; real iOS / macOS Safari
(including iOS safe-area and toolbar behaviour) was not tested and should be checked on a device before launch. All
runs were headless.
