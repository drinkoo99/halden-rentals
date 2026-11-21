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
