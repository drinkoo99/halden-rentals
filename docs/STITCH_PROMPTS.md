# HALDEN — Stitch prompts to complete the design

Generate in the existing Stitch project **"Halden Luxury Car Rental"** so the theme and DESIGN.md carry over.

**How to use each prompt**
1. On the canvas, select the screen named in "Continue from" (it becomes the visual reference).
2. Paste the prompt (everything inside the code block).
3. Generate one prompt at a time; if the result drifts, reply: *"Match the selected screen exactly: same
   palette, Bodoni Moda / Manrope / Space Mono, 0–2 px radii, hairline dividers, no shadows or rounded cards."*
4. Export each finished screen as a ZIP into `Downloads` (as before) and tell me which prompt it belongs to.

Order = priority. Tier 1 is the customer MVP; Tier 3 (admin) can wait until the backend schema is agreed.

## Image quality — read before generating (priority)

Stitch cannot output images larger than about 1,400 px, whatever the prompt says (verified on this project: its
originals top out at 1,264–1,408 px). Everything Stitch generates is therefore finished with the local HD pipeline
(Real-ESRGAN + grain blend, `docs/IMAGE_QUALITY.md`). That pipeline can sharpen; it cannot invent detail. So every
prompt below asks Stitch for photography that survives upscaling:

1. **Generate each important photo in the exact shape of its slot** (16:9 hero, 3:2 car card, 4:5 or 3:4 portrait
   card, 21:9 banner). Never let a landscape photo be cropped into a portrait card — crops are the main source of blur.
2. **One clear subject, filling most of the frame.** No tiny cars far away in a landscape; for scenery shots the car
   still occupies at least a third of the frame width.
3. **No text in images:** no readable number plates, badges, logos, signage or lettering (AI renders them as fake
   text). Plates blank or out of view.
4. **Clean, low-noise light:** soft daylight or studio light, sharp focus on the car, no heavy grain, motion blur,
   fog over the subject or extreme low light.
5. **Consistent studio language for fleet shots:** warm stone backdrop, polished limestone floor, front three-quarter
   view facing left, same camera height — so they upscale identically and sit together in grids.
6. After generating, **export the screen ZIP and, for any new photo, tell me its screen** — I download the original
   at full size (`=s0`) and run it through the HD pipeline before it goes into the site.

If a photo still isn't good enough after the pipeline, regenerate just that image in Stitch with the same rules, or
replace it with real/licensed photography.

---

## Tier 1 — Customer MVP

### 1 · S6b-1 Account overview (desktop)
Continue from: **31 Sign in** (and 23 Confirmed for the dossier style)

**Status: already sent.** It was generated before the photography rules existed, so send this follow-up in the
same Stitch chat to upgrade its images:

```
Regenerate the photography on this screen at the highest quality you can produce: photorealistic, sharp focus on the car, soft natural or studio light, low noise, the car filling most of the frame. Generate the reservation photo as a 16:9 image and the saved-car thumbnails as 3:2 studio shots on the warm stone backdrop (front three-quarter view, facing left, same camera height). No readable number plates, logos, badges or text anywhere in the images. Keep the layout and design system exactly as they are.
```

Reusable follow-up for any later screen whose images come out weak:

```
Improve only the photography on this screen: highest quality, photorealistic, sharp focus, clean low-noise light, one clear subject filling most of the frame, each image generated in the exact aspect ratio of its slot, no text, plates or logos in the images. Do not change the layout, typography or colours.
```

Original prompt (for reference):

```
Design the HALDEN "Patron Circle" account overview page, desktop 1280px wide, in the exact "The Gallery" design system of this project: warm ivory background #F5F3EE, soft stone panels #EAE8E1, deep ink text #171A18, forest green #344A3D for primary actions and active states, muted sage #738273 accents, 1px hairline dividers #D8D6CE, Bodoni Moda for headlines, Manrope for UI, Space Mono uppercase tracked labels for metadata, prices and dates. Sharp 0px corners on images and panels, 2px on buttons and inputs. No shadows, no pills, no rounded cards, no gradients.

Layout:
- Top: the same light HALDEN header as the fleet page, with an account avatar menu on the right (Overview, Reservations, Saved cars, Settings, Sign out).
- Left column (280px) sticky account navigation as a vertical list of Space Mono labels with a forest-green 2px left bar on the active item: 01 OVERVIEW, 02 RESERVATIONS, 03 SAVED CARS, 04 SETTINGS. Below it a small stone placard "Patron since 2025 · 3 journeys".
- Main column: greeting in Bodoni Moda "Good evening, Clara." with a Space Mono line "NEXT HANDOVER IN 6 DAYS".
- "Upcoming reservation" exhibit placard spanning the main column: large 16:9 studio photo of the Range Rover Autobiography on the left, right side shows reference HLD-0612-4821, status tag CONFIRMED (forest dot + text), pick-up and return blocks (Munich Airport T2 · 12 Jun 10:00 → 15 Jun 10:00), total €1,731.45, and actions: primary "View reservation", secondary "Modify", text link "Add to calendar".
- "Past journeys" as a hairline-separated table: car thumbnail, car name, dates, hub, total, status (COMPLETED / CANCELLED in muted text with icon), link "Receipt".
- "Saved cars" horizontal row of 3 compact exhibit placards (photo, brand · exhibit no., model, €/day, filled heart to remove, "Reserve").
- Empty-state variants shown as a second artboard: no upcoming reservation (Bodoni line "No journeys planned yet.", forest button "Explore the collection") and no saved cars.
Footer: the dark #171B19 HALDEN footer.
Photography (high-resolution priority): photorealistic, sharp focus on the car, soft natural or studio light, low noise, the car filling most of the frame, no readable number plates, logos, badges or text anywhere in the image; generate the reservation photo as a 16:9 image and the saved-car thumbnails as 3:2 studio shots on the warm stone backdrop (front three-quarter, facing left).
```

### 2 · S6b-2 Reservation detail (desktop)
Continue from: **24 Review** (dossier sections) and **23 Confirmed**

```
Design the HALDEN reservation detail page for a signed-in patron, desktop 1280px, same "The Gallery" system (ivory #F5F3EE, stone #EAE8E1, ink #171A18, forest #344A3D, sage #738273, hairlines #D8D6CE, Bodoni Moda headlines, Manrope UI, Space Mono labels/prices/dates, 0–2px radii, no shadows, no rounded cards).

Content for reservation HLD-0612-4821, Range Rover Autobiography, Munich Airport T2, 12–15 Jun, status CONFIRMED:
- Breadcrumb in Space Mono: ACCOUNT / RESERVATIONS / HLD-0612-4821.
- Title block: Bodoni "Range Rover Autobiography", reference and status tag, right-aligned actions: "Modify reservation" (secondary), "Cancel" (text link in error red), "Download dossier PDF" (text link with icon).
- Horizontal status timeline with 5 stops and Space Mono labels: RESERVED · DOCUMENTS VERIFIED · VEHICLE PREPARED · HANDED OVER · RETURNED. Completed stops filled forest, current stop outlined, future stops hairline.
- Two-column body. Left (8/12): numbered dossier sections like the Review screen — 01 Vehicle (photo + key specs), 02 Itinerary (pick-up / return cards with times and coordinates), 03 Provisions (extras rows with prices), 04 Principal driver (name, contact, licence country, "Licence check: pending at handover"), 05 Handover instructions (concierge meeting point, phone, what to bring).
- Right (4/12) sticky stone panel "Payment summary": daily rate × days, extras, 19% VAT, total, "Due at handover", refundable €2,500 deposit note, "Need help? Call the concierge desk".
- Show a second artboard of the same page in status CANCELLED: muted photo, timeline replaced by a stone notice "Cancelled on 2 Jun · refund of €1,731.45 issued", actions reduced to "Book again".
Photography (high-resolution priority): photorealistic, sharp focus on the car, soft natural or studio light, low noise, the car filling most of the frame, no readable number plates, logos, badges or text anywhere in the image; reuse the Range Rover studio shot as a 16:9 image.
```

### 3 · S6b-3 Modify & cancel reservation (desktop)
Continue from: **the reservation detail generated in prompt 2** and **20 Trip**

```
Design two overlay states for the HALDEN reservation detail page (desktop 1280px), same "The Gallery" system (ivory, stone, ink, forest #344A3D, sage, hairlines, Bodoni Moda / Manrope / Space Mono, 0–2px radii, no shadows except a subtle ink/40 page dim behind overlays).

A) "Modify reservation" right-side panel (560px wide, full height, ivory, hairline left border):
- Space Mono header MODIFY · HLD-0612-4821 with close icon.
- Sections: Dates (compact two-month calendar like the Trip step, selected range in forest), Handover times (two selects), Return location (toggle "same as pick-up"), Provisions (toggle rows with prices).
- Live availability line: forest check "Available for your new dates" or warning amber "Only available until 14 Jun — choose earlier return".
- Price difference block: original total, new total, difference "+€390.00" (or "−€130.00 refunded"), 19% VAT included.
- Footer buttons: text "Discard changes", primary "Confirm changes".

B) "Cancel reservation" centered dialog (520px, ivory, 2px radius):
- Bodoni title "Cancel this reservation?"
- Policy summary in Space Mono rows: free cancellation until 48h before handover (shown as a short timeline with "You are here"), fee after that.
- Refund calculation: total paid, cancellation fee €0.00, refund €1,731.45.
- Required reason select (Change of plans / Found another car / Travel cancelled / Other) and optional note.
- Buttons: secondary "Keep reservation", destructive solid "Cancel reservation" in #B94A48.
- Also show the success toast that follows: "Reservation cancelled · refund on its way".
Image quality: any photography on this screen (thumbnails, crops, previews) must be photorealistic, sharp, low-noise and generated in the exact aspect ratio of its slot, with no readable number plates, logos or text.
```

### 4 · S6b-4 Account settings (desktop)
Continue from: **the account overview generated in prompt 1** and **22 Details** (form style)

```
Design the HALDEN account settings page, desktop 1280px, same account layout as the overview (left Space Mono navigation, 04 SETTINGS active) and same "The Gallery" system (ivory, stone, ink, forest #344A3D, sage, hairlines, Bodoni Moda / Manrope / Space Mono, 0–2px radii, no shadows).

Form style exactly like the Details booking step: Space Mono uppercase labels with a right-aligned hint tag, white input wells, error state with red label, REQUIRED tag and red message row.

Sections, each separated by a hairline and a Bodoni section title:
1. Personal details — first name, last name, email (with "Verified" forest tag), mobile phone with country code, date of birth.
2. Driving licence — licence country select, licence number, expiry date, upload area for front/back photo (dashed hairline drop zone, file chip after upload), status tag "VERIFIED" / "PENDING REVIEW".
3. Preferences — preferred pick-up hub select, communication toggles (booking updates by email, SMS handover reminders, The Dispatch newsletter).
4. Security — change passcode (current, new, confirm with strength meter in four sage/forest segments), active sessions list with "Sign out" links.
5. Danger zone — stone panel with "Delete account" text button in #B94A48 and a one-line explanation.
Sticky save bar at the bottom of the main column: "Unsaved changes" Space Mono label, secondary "Discard", primary "Save changes". Show one field in error state and the success toast "Settings saved".
Image quality: any photography on this screen (thumbnails, crops, previews) must be photorealistic, sharp, low-noise and generated in the exact aspect ratio of its slot, with no readable number plates, logos or text.
```

### 5 · S7-1 Mobile booking — Trip & Extras (390px)
Continue from: **20 Trip**, **21 Extras** and **30 Vehicle detail (mobile)**

```
Design the first two steps of the HALDEN booking flow for mobile (390px wide), translating the desktop Trip and Extras steps of this project into a phone-first layout in the same "The Gallery" system (surface #f8faf6, primary #1e3327, primary-container #344a3d, outline-variant hairlines, Bodoni Moda headlines, Manrope UI, Space Mono labels and numbers, 0–2px radii, no shadows, no rounded cards).

Shared mobile booking chrome:
- Compact header: close "×" left, "SECURE RESERVATION" Space Mono centered with lock icon, step counter "02 / 06" right.
- Thin 6-segment progress bar under the header (completed segments forest).
- Collapsible summary bar pinned under the progress: car thumbnail, "Range Rover Autobiography", total "€1,392.30" and a chevron to expand the full price breakdown sheet.
- Sticky bottom action bar: price on the left, full-width-ish primary button "Continue" on the right, safe-area padding.

Screen A · Trip: pick-up hub selector as a tappable row opening a bottom sheet list of hubs (show the sheet open on a second artboard); "Return to same location" toggle; dates as one row "12 Jun → 15 Jun · 3 days" that opens a full-screen calendar sheet with vertically scrolling months and the selected range in forest (show it); handover time selectors as two half-width rows; availability notice in a secondary-container band.

Screen B · Extras: each provision as a full-width row with title (Bodoni 18px), one-line description, price in Space Mono and a square 48×24 toggle; child seat row with a −/+ stepper (max 2); included winter protocol row with an INCLUDED tag; running "Extras: €285.00" line above the sticky bar.
Photography (high-resolution priority): photorealistic, sharp focus on the car, soft natural or studio light, low noise, the car filling most of the frame, no readable number plates, logos, badges or text anywhere in the image; the car thumbnail is the existing Range Rover studio shot.
```

### 6 · S7-2 Mobile booking — Details, Review & Confirmed (390px)
Continue from: **the mobile Trip/Extras screens from prompt 5**, **22 Details**, **24 Review**, **23 Confirmed**

```
Design the last three HALDEN booking steps for mobile (390px), continuing the mobile booking chrome from the previous screens (close ×, step counter, 6-segment progress bar, collapsible price summary, sticky bottom action bar) in the same "The Gallery" system.

Screen C · Details: "Continue as guest / Sign in" segmented control; single-column form with Space Mono labels and right-side hint tags, 52px tall white input wells, numeric keyboard for date of birth, country picker opening a bottom sheet; show the phone field in the error state (red label, REQUIRED tag, red message row) and the age line "AGE: 36" in forest. Sticky "Continue to review".

Screen D · Review: dossier sections as collapsible cards with Space Mono numbers 01–04 (Vehicle, Itinerary, Provisions, Driver), each with an "Edit" link; concept payment notice band "Concept — no payment is processed"; terms checkbox; sticky primary "Confirm reservation" disabled until the checkbox is ticked (show both states).

Screen E · Confirmed: forest check in a secondary-container circle, Bodoni "You're all set, Clara.", reference chip "HLD-0612-4821", compact handover manifest (pick-up, return, provisions, total due at handover), three-step "What happens next" list, buttons "View my reservations" and "Back to home", text link "Add to calendar".
Photography (high-resolution priority): photorealistic, sharp focus on the car, soft natural or studio light, low noise, the car filling most of the frame, no readable number plates, logos, badges or text anywhere in the image; the confirmation photo is a 4:3 studio shot of the same Range Rover.
```

### 7 · S6a-2 Authentication completion (desktop + mobile)
Continue from: **31 Sign in**

```
Using the selected HALDEN sign-in screen as the exact layout (left gallery photo stage with exhibit placard, right authentication chamber) and the same "The Gallery" system, design these additional authentication states. Desktop 1280px; also produce a 390px mobile version of A and B where the photo stage becomes a 200px-tall top band.

A) Request access (register): full name, email, passcode with 4-segment strength meter and rule checklist (12+ characters, a letter, a number), confirm passcode, consent checkbox for Exhibition Terms, primary "Request patron access".
B) Forgot passcode: email field, primary "Send reset link"; then the success state "Check your inbox" with the masked email, a "Resend in 0:45" countdown and "Back to sign in".
C) Reset passcode: new passcode + confirm with strength meter, success state "Passcode updated" with "Sign in".
D) Email verification: "Verify your email" with 6-digit code input (six 2px-radius boxes in Space Mono), resend link; success state; and "Link expired" state with "Send a new link".
E) Error states on the sign-in form: wrong credentials banner (red left border, error icon, message), account temporarily locked after 5 attempts with a countdown, and a neutral "Too many attempts — try again in 15 minutes" notice.
Photography (high-resolution priority): photorealistic, sharp focus on the car, soft natural or studio light, low noise, the car filling most of the frame, no readable number plates, logos, badges or text anywhere in the image; the gallery stage photo is a portrait 4:5 image composed for the left half of the screen (car in the lower half, architecture above), and the mobile band uses a separate 16:9 crop-safe version.
```

### 8 · S6b-5 Mobile account (390px)
Continue from: **the desktop account screens (prompts 1, 2, 4)** and **27 Mobile menu**

```
Design the HALDEN Patron Circle account for mobile (390px) in the same "The Gallery" system (surface #f8faf6, primary #1e3327 / #344a3d, Bodoni Moda / Manrope / Space Mono, hairlines, 0–2px radii, no shadows or rounded cards).

Screen A · Overview: header with HALDEN wordmark and menu icon; greeting in Bodoni; horizontal Space Mono tab strip OVERVIEW · RESERVATIONS · SAVED · SETTINGS with a forest underline on the active tab; upcoming reservation as a full-width exhibit card (4:3 photo, reference, status tag, dates, total, "View" and "Modify"); past journeys as compact rows; saved cars as a horizontal swipe row.
Screen B · Reservation detail: back link "← Reservations"; vertical status timeline; collapsible dossier sections; sticky bottom bar with "Modify" (secondary) and "Directions to handover" (primary); "Cancel reservation" as a red text link at the end of the page.
Screen C · Settings: sections as an accordion list (Personal details, Driving licence, Preferences, Security, Delete account) with one section expanded showing the form fields and a sticky "Save changes" bar.
Photography (high-resolution priority): photorealistic, sharp focus on the car, soft natural or studio light, low noise, the car filling most of the frame, no readable number plates, logos, badges or text anywhere in the image; reservation card photo 4:3, saved cars 3:2 studio shots.
```

---

## Tier 2 — Content & system

### 9 · S6c-1 Journeys index & journey detail (desktop + mobile)
Continue from: **04 Homepage** ("Designed for the open road") and **28 Mobile homepage** ("Architectural journeys")

```
Design two HALDEN content pages in the "The Gallery" system (ivory, stone, ink, forest, sage, hairlines, Bodoni Moda / Manrope / mono labels, 0–2px radii, editorial magazine composition, no rounded cards), desktop 1280px plus a 390px mobile version of each.

A) Journeys index "Designed for the open road.": Space Mono kicker 03 / CURATED ROUTES; filter row (Region: Switzerland, Italy, France, Austria · Duration: 1–2 days, 3–4 days, 5+ · Season); asymmetric editorial grid of 6 routes with tall portrait photography of real Alpine and coastal roads, country tag, Bodoni route name, "3 days · 640 km · 4 passes" metadata; one full-width featured route band.

B) Journey detail "The High Alpine Transversal": full-bleed cinematic hero of a mountain pass with Bodoni title overlay; key facts strip (distance, days, highest point 2,436 m, best season, recommended class); a minimal monochrome route map with numbered stops; day-by-day itinerary as numbered sections (01 Zurich → Andermatt, 02 Furka & Grimsel, 03 Susten → Lucerne) each with a landscape photo, drive time and a boutique hotel stop; "Recommended exhibits" row of 3 car placards with "Reserve for this route"; closing dark #171B19 CTA band "Plan this journey".
Photography (high-resolution priority): photorealistic, sharp focus on the car, soft natural or studio light, low noise, the car filling most of the frame, no readable number plates, logos, badges or text anywhere in the image; generate every route photo in the exact shape it is shown (portrait 3:4 for grid cards, 21:9 for the featured band and the detail hero), with a premium car clearly visible on the road occupying at least a third of the frame width, golden-hour or soft overcast light, no haze over the subject.
```

### 10 · S6c-2 About / The Standard (desktop + mobile)
Continue from: **04 Homepage** (dark "Arrive the way you meant to." section)

```
Design the HALDEN "About — The Standard" page, desktop 1280px plus a 390px mobile version, in the "The Gallery" system (ivory, stone, ink, forest, sage, dark room #171B19 with panels #252A27, hairlines, Bodoni Moda / Manrope / mono labels, 0–2px radii, no shadows).

Sections: 1) Manifesto hero — Bodoni statement "A rental house built like a gallery." over a quiet architectural photo; 2) Three principles as large numbered editorial blocks (01 Chosen, not stocked · 02 Ready where you land · 03 One clear price) with short paragraphs; 3) The 48-point inspection shown as a dark room section with a 4×4 grid of mono-labelled checks (acoustic, mechanical, detailing, documentation) — no icons in circles, just hairline cells; 4) Hubs — five airport/city hubs as a hairline table (code, city, terminal, handover window, concierge phone) with a small monochrome map; 5) Concierge team — three portrait photos with name and role; 6) Contact band with phone, email and a short enquiry form (name, email, message) including its success state.
Photography (high-resolution priority): photorealistic, sharp focus on the car, soft natural or studio light, low noise, the car filling most of the frame, no readable number plates, logos, badges or text anywhere in the image; architectural photos in 16:9, concierge portraits in 4:5 with natural light and no text on clothing or walls.
```

### 11 · S8 States & dialogs sheet (desktop + mobile)
Continue from: **12 Fleet**, **19 Vehicle detail**, **20 Trip**

```
Create a single HALDEN "system states" reference board in the "The Gallery" system (ivory, stone, ink, forest #344A3D, sage, error #B94A48, warning amber, hairlines, Bodoni Moda / Manrope / Space Mono, 0–2px radii, no shadows), showing desktop and 390px mobile examples side by side:
1) Loading skeletons for the fleet grid (3-column placards), vehicle detail gallery wall and account overview — flat stone blocks with a subtle shimmer, no rounded corners.
2) Empty states: no cars match filters, no upcoming journeys, no saved cars — each with a quiet line illustration or architectural photo crop, a Bodoni line and one action.
3) Error pages: 500 "Something in the gallery went dark.", offline banner, permission denied; plus the existing 404 style for consistency.
4) Booking conflicts: "This exhibit was just reserved for your dates" with 3 alternative cars and nearby dates; "Your reservation session expired" with "Restore my selection".
5) Toasts (success forest, info ink, error red) top-right on desktop / bottom on mobile, and inline success/error banners.
6) Dialogs: itinerary editor (location + pick-up/return), photo lightbox on the dark room colour with counter and thumbnails, and the cookie consent banner (Accept necessary / Accept all / Preferences) pinned to the bottom.
Photography (high-resolution priority): empty-state and error-page photos are 16:9 architectural crops (concrete gallery interiors, empty roads) with clean light and no text; lightbox example uses a sharp 16:9 car photo; conflict alternatives use 3:2 studio car shots on the warm stone backdrop.
```

---

## Tier 3 — Admin (generate once the backend schema is agreed)

### 12 · S6d-1 Admin shell & operations overview (desktop)
Continue from: **24 Review** (dossier style) and **12 Fleet** (tables, chips)

```
Design the HALDEN staff console "Operations overview", desktop 1440px, in a denser, work-focused variant of "The Gallery" system: ivory #F5F3EE canvas, stone #EAE8E1 panels, ink text, forest #344A3D for primary actions and positive status, amber for warnings, #B94A48 for problems, 1px hairlines, Manrope 14px UI, Space Mono for IDs, plates, times and money, Bodoni Moda only for page titles. 0–2px radii, no shadows, no rounded cards, no colourful charts — charts in ink/sage/forest only.

Shell: left sidebar 240px on dark #171B19 with HALDEN wordmark, hub switcher (All hubs / MUC / ZRH / GVA / MXP / VIE) and nav in Space Mono: OVERVIEW, BOOKINGS, FLEET, AVAILABILITY, CUSTOMERS, PRICING, SETTINGS; top bar with global search (booking ref, plate, customer), date, notifications, staff avatar.

Overview content: KPI strip of 5 hairline-separated figures (handovers today 8, returns today 5, cars on the road 31, fleet utilisation 74%, revenue this week €48,210) each with a small trend; "Today" timeline split into Handovers and Returns as time-ordered rows (time, car + plate, customer, hub, status chip: READY / PREPARING / LATE / DONE); "Needs attention" list (licence pending, car overdue for service, payment pre-authorisation failed); utilisation bar chart for the next 14 days in sage/forest.
Photography: car thumbnails in the Today timeline are small 3:2 studio shots on the warm stone backdrop, identical angle for every car, no readable plates (show plates as Space Mono text next to the photo instead).
```

### 13 · S6d-2 Fleet management & vehicle editor (desktop)
Continue from: **the admin overview from prompt 12**

```
Using the HALDEN staff console shell from the selected screen, design two admin screens (desktop 1440px, same dense "The Gallery" variant).

A) Fleet list: Bodoni title "Fleet" with count; toolbar with search, filters (hub, category, status, brand) as forest chips, "Add vehicle" primary button, table/grid view toggle. Table rows: studio thumbnail, exhibit no., brand + model, plate (Space Mono), hub, category, status chip (AVAILABLE / ON RENT / IN SERVICE / RETIRED), day rate, next booking date, utilisation mini-bar, row menu. Bulk-select with a bottom action bar (Change status, Move hub). Show an empty filter result state.

B) Add / edit vehicle as a full page with a sticky right summary: sections Identity (brand, model, year, exhibit no., plate, VIN, colour), Specifications (seats, transmission, power, drivetrain, fuel, luggage — as a two-column spec table form), Pricing (day rate, weekend rate, deposit, included km/day), Location & status (home hub, status, featured toggle), Features (checkbox grid), Photography (drag-and-drop gallery manager with reorderable thumbnails, "cover" badge, alt text field per photo, upload progress). Validation states on two fields, "Unsaved changes" sticky bar with "Discard" / "Save vehicle", and a "Retire vehicle" destructive action.
Photography (high-resolution priority): photorealistic, sharp focus on the car, soft natural or studio light, low noise, the car filling most of the frame, no readable number plates, logos, badges or text anywhere in the image; vehicle thumbnails are 3:2 studio shots on the warm stone backdrop, identical camera angle for every car.
```

### 14 · S6d-3 Bookings & booking detail (desktop)
Continue from: **the admin overview from prompt 12**

```
Using the HALDEN staff console shell, design (desktop 1440px, dense "The Gallery" variant):

A) Bookings list: tabs UPCOMING · ON THE ROAD · COMPLETED · CANCELLED with counts; filters (hub, date range, status, car category) and search; table with reference (Space Mono), customer, car, pick-up → return dates/times, hub, total, payment status (PRE-AUTH OK / FAILED / REFUNDED), booking status chip; row click opens detail. Export CSV text button.

B) Booking detail: header with reference, status chip and primary next action that changes by status ("Mark documents verified", "Hand over vehicle", "Complete return"); left column with customer card (name, contact, licence country + number with verify buttons, past bookings count), itinerary, provisions, price breakdown with VAT and deposit; right column with status timeline, internal notes (add note field, staff initials + timestamp) and an immutable audit log in Space Mono ("21 Nov 14:02 · M. Weber · status CONFIRMED → PREPARED"). Handover checklist panel (fuel level, mileage, damage photos upload, signature captured) and a "Cancel booking" destructive action with reason.
Photography: car thumbnails are 3:2 studio shots on the warm stone backdrop with identical camera angle; damage-photo examples in the handover checklist are sharp close-ups of panels and wheels with no plates or text.
```

### 15 · S6d-4 Availability calendar (desktop)
Continue from: **the admin screens from prompts 12–14**

```
Using the HALDEN staff console shell, design the "Availability" planner (desktop 1440px, dense "The Gallery" variant): a horizontal timeline grid with one row per car (thumbnail, model, plate, hub) and one column per day for 4 weeks, sticky left column and sticky date header with weekend columns in stone. Booking blocks span days as flat forest bars with the customer surname and reference in Space Mono; maintenance blocks as hatched sage bars; holds as outlined bars; conflicts outlined in #B94A48 with a warning icon. Toolbar: hub filter, category filter, week/month zoom, "Today" button, legend. Interactions to show: hovering a block reveals a small detail card; dragging empty cells creates a "Block dates" popover (reason: maintenance / transfer / private use, dates, note, save). Include an empty-hub state and a loading state.
Photography: row thumbnails are tiny 3:2 studio shots of each car on the warm stone backdrop, identical angle, no plates.
```

### 16 · S6d-5 Customers (desktop)
Continue from: **the admin screens from prompts 12–14**

```
Using the HALDEN staff console shell, design (desktop 1440px, dense "The Gallery" variant):
A) Customers list: search, filters (licence status, hub, has upcoming booking), table with name, email, phone, licence status chip (VERIFIED / PENDING / REJECTED / EXPIRED), bookings count, lifetime value, last booking date.
B) Customer detail: profile header with initials avatar on stone, contact details, licence panel showing uploaded front/back images with "Approve" / "Reject with reason" actions and expiry date, booking history table, internal notes, consent and marketing preferences, and a GDPR actions panel ("Export data", "Delete customer" destructive with confirmation).
Image quality: any photography on this screen (thumbnails, crops, previews) must be photorealistic, sharp, low-noise and generated in the exact aspect ratio of its slot, with no readable number plates, logos or text.
```

### 17 · S6d-6 Mobile console for curbside staff (390px)
Continue from: **the admin overview from prompt 12** and **27 Mobile menu**

```
Design the HALDEN staff console for phones (390px) used by concierge staff at the curb, same dense "The Gallery" variant (dark #171B19 header bar, ivory content, forest/amber/red status, Space Mono for times, plates and references).
Screen A · Today: hub selector, segmented HANDOVERS / RETURNS, time-ordered cards (time, car photo thumb, plate, customer name, status chip) with a large "Start handover" button on the next one.
Screen B · Handover checklist: step list (verify licence — camera capture of licence, fuel level slider, mileage input, walk-around damage photos grid with add button, customer signature pad, keys handed over), progress at top, sticky "Complete handover" primary button disabled until all steps are done.
Screen C · Booking lookup: search by reference or plate with recent searches and a result card.
Photography: car thumbnails are 3:2 studio shots on the warm stone backdrop; damage-photo grid examples are sharp close-ups of body panels and wheels; no readable plates, logos or text in any image.
```
