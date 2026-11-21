# HALDEN — Design coverage audit

Audit date: 21 Nov 2026. **Update:** all 17 prompts were generated in Stitch and the 42 resulting screens are now implemented (see README, "Round 2 notes"). Basis: every screen exported from the Stitch project "Halden Luxury Car Rental"
(`design/stitch-export/`), the Stitch conversation history visible in the project, DESIGN.md ("The Gallery"),
and the implemented application. Prompts to close the gaps are in `docs/STITCH_PROMPTS.md`.

## 1. What exists

| Area | Stitch screens | Desktop | Mobile | Built |
|---|---|---|---|---|
| Homepage | 04, 28 | ✅ | ✅ | ✅ |
| Navigation menu | 27 | — | ✅ | ✅ |
| Fleet discovery + filters | 12, 26, 29 | ✅ | ✅ | ✅ |
| Vehicle detail | 19, 30 | ✅ | ✅ | ✅ |
| Booking: trip, extras, details, review, confirmed | 20–24 | ✅ | ❌ | ✅ (desktop layout stacks on mobile) |
| Sign in | 31 | ✅ | ❌ | ✅ (responsive fallback) |
| Image assets | 00–03, 06–11, 13–18, 25 | | | ✅ |

## 2. Gap analysis by area

Legend — **Need**: *Design* = needs a Stitch reference · *Derive* = can be built from existing patterns without a
new design · *Later* = not needed for MVP.

### Customer account
| Item | Need | Notes |
|---|---|---|
| Account overview (upcoming trip, past trips, saved cars) | **Design** | Destination of "View my bookings", "Patron Circle", avatar menu. Core MVP screen. |
| Reservation detail (status timeline, documents, handover info) | **Design** | Most-visited page after booking. |
| Modify reservation (dates/extras/location) | **Design** | Price-difference presentation and availability feedback need a reference. |
| Cancel reservation (policy, refund/fee, confirmation) | **Design** | High-stakes dialog; must be honest and calm. |
| Saved cars / favourites page | **Design** (in overview prompt) | Hearts already work locally; needs a home. |
| Profile, driving licence, contact, notifications, security, delete account | **Design** | One settings screen with sections + validation states. |
| Payment methods / receipts | Later | No payments in MVP; receipts can live in reservation detail. |
| Mobile versions of the above | **Design** | Tab-based account on phones. |

### Authentication
| Item | Need | Notes |
|---|---|---|
| Register / request access | **Design** | Today: sign-in layout + name field. |
| Forgot password → email sent | **Design** (states sheet) | |
| Reset password (new passcode, strength) | **Design** (states sheet) | |
| Email verification (sent / success / expired link) | **Design** (states sheet) | |
| Auth errors (wrong credentials, locked, rate-limited) | **Design** (states sheet) | |
| Mobile sign-in / register | **Design** (same prompt, mobile variant) | |

### Booking
| Item | Need | Notes |
|---|---|---|
| Mobile booking flow (5 steps) | **Design** | Highest-traffic gap; desktop sidebars don't translate to phones. |
| Unavailable / conflict state (car taken while booking) | **Design** (states prompt) | |
| Booking session expired / server error on confirm | **Design** (states prompt) | |
| Guest → account conversion after confirmation | Derive | Banner on confirmation, reuse sign-in tokens. |

### Content
| Item | Need | Notes |
|---|---|---|
| Journeys index + journey detail | **Design** | Homepage "Curated routes" and menu link point nowhere real. |
| About / The Standard | **Design** | Menu + footer links. |
| Locations (hub pages) | Later | Can be a section of About for MVP. |
| Terms, Privacy, Imprint, cookie notice | Derive | Long-form text in the existing editorial typography; cookie banner in states prompt. |

### Admin (staff)
| Item | Need | Notes |
|---|---|---|
| Overview (today's handovers/returns, utilisation, alerts) | **Design** | |
| Fleet list + add/edit vehicle (photos, specs, pricing, status) | **Design** | |
| Bookings list + booking detail (status changes, notes, audit log) | **Design** | |
| Availability calendar (cars × days, blocks, maintenance) | **Design** | Hardest admin UI; must have a reference. |
| Customers list + customer detail (licence check, history) | **Design** | |
| Pricing/extras/locations settings | Derive | Tables/forms reuse the admin patterns. |
| Staff roles & permissions | Later | |
| Admin on tablet/phone (on-the-go handover view) | **Design** | Concierge staff work curbside on phones. |

### Cross-cutting states
| Item | Need |
|---|---|
| Loading skeletons (fleet grid, detail, account) | **Design** (states sheet) |
| Empty states (no results, no trips, no saved cars, no bookings in admin) | **Design** (states sheet) |
| Errors (404 exists; 500, offline, permission denied) | **Design** (states sheet) |
| Toasts / inline success, form validation patterns | **Design** (states sheet) |
| Tablet 768–1023 px art direction | Later (current compositions work) |

## 3. Recommendation

More Stitch work **is** needed for a credible full-stack MVP — 17 prompts (`docs/STITCH_PROMPTS.md`), generated in three tiers:

1. **Customer MVP (generate first):** account overview, reservation detail, modify/cancel, settings, mobile booking
   (2), auth completion, mobile account.
2. **Content & system:** journeys, about, states & dialogs sheet.
3. **Admin (generate when the backend schema is agreed):** overview, fleet + vehicle editor, bookings + detail,
   availability calendar, customers, mobile admin.

Not recommended for Stitch: legal pages, pricing/extras settings, staff roles, payment-method management — they are
either plain content or straightforward reuse of patterns the new admin screens will establish.
