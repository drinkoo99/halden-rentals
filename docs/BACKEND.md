# HALDEN — Backend

Phase 2 adds a backend to the existing Next.js app: a **modular monolith** (no separate server), with
MongoDB Atlas through the official driver and Zod for validation. The architecture and the milestone plan
were approved before implementation; this file documents what exists so far.

**Status: M3 — Catalogue API.** M1 provides environment validation, the database client, API
conventions, a health endpoint and collection-setup tooling. M2 adds the catalogue (`locations`,
`vehicleModels`, `extras`): schemas, collection validators and indexes, the demo seed and an
integration-test harness. M3 serves the catalogue from MongoDB: three read-only endpoints, and the pages
(fleet, vehicle detail, booking, search, menus) render the database catalogue. M5 adds patron accounts:
registration, sign-in, sessions, roles and protected account/staff areas. M6 adds the physical fleet
(units per vehicle model) and the availability engine. M7 adds the booking engine: server-side quotes,
holds, confirmation, cancellation, check-out/check-in, the booking flow, the patron's reservations and
the staff booking console. Payments arrive with M10 — nothing is charged yet.

## Setup

1. `npm install`
2. `cp .env.example .env.local` and set the variables below (all optional in M1).
3. `npm run dev`, then open <http://localhost:3000/api/v1/health>.

Without `MONGODB_URI` the app runs normally and the health endpoint answers **503** with the database
`not_configured`. With a reachable database it answers **200**.

### Environment variables

| Variable | Required | Default | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | production | previews: deployment URL; else `http://localhost:3000` | Canonical URLs, sitemap, robots, social previews |
| `MONGODB_URI` | production | — | MongoDB connection string (`mongodb://` or `mongodb+srv://`) |
| `MONGODB_DB` | production | `halden_dev` (never in production) | Database name. Names containing `prod` count as production for `db:setup` and `db:seed` |
| `MONGODB_TEST_DB` | no | `halden_test` | Integration-test database (see [Integration tests](#integration-tests)) |
| `LOG_LEVEL` | no | `info` | `debug` \| `info` \| `warn` \| `error` |
| `RESEND_API_KEY`, `EMAIL_FROM` | for email | — | Password-reset and verification emails (Resend); both or neither |

- Validated by `src/server/config/env.ts` the first time server code needs them. An invalid value fails
  with the variable name and the problem — never the value.
- In a production deployment (`VERCEL_ENV=production`) `MONGODB_URI`, `MONGODB_DB` and
  `NEXT_PUBLIC_SITE_URL` must be set explicitly: the build fails with the missing variable's name instead of
  falling back to `halden_dev`, the static demo catalogue or localhost.
- Secrets live only in `.env.local` (git-ignored) and in Vercel's environment settings. Nothing secret uses
  the `NEXT_PUBLIC_` prefix, which would ship it to the browser.
- Use a development or staging database locally. Production credentials belong only in Vercel's
  Production environment.

### MongoDB Atlas (when you are ready to connect)

1. Create a project per environment (e.g. `halden-staging`, later `halden-prod`) and a free M0 cluster.
2. Database Access → add a user with **readWrite on the app database and the test database only**
   (not Atlas admin, not `dbAdmin`).
3. Network Access → your IP for local development. Vercel functions have no fixed IPs; that choice
   (0.0.0.0/0 with strong credentials, or the Atlas–Vercel integration) is made at deployment.
4. Connect → Drivers → copy the `mongodb+srv://…` string into `MONGODB_URI`, and set `MONGODB_DB`.
5. Check: `curl -i http://localhost:3000/api/v1/health` → `200` with `"database":{"status":"up",…}`.

## Deployment (Vercel)

No `vercel.json` is needed: Vercel detects Next.js and runs `npm run build`. Nothing has been deployed yet;
these are the manual steps when a project is created.

1. **Environment variables** (Settings → Environment Variables), per environment:
   - *Production*: `MONGODB_URI`, `MONGODB_DB`, `NEXT_PUBLIC_SITE_URL` (all required), optional `LOG_LEVEL`.
   - *Preview*: point `MONGODB_URI`/`MONGODB_DB` at a non-production database (or leave them unset to
     render the static demo catalogue). Never give previews production credentials.
2. **The build reads the database.** Pages are prerendered with the catalogue, so a build with
   `MONGODB_URI` set connects to MongoDB at build time. Vercel builds and functions have no fixed IPs:
   Atlas network access must allow them (the Atlas–Vercel integration or an explicit decision on the
   access list). The database user needs `readWrite` on that database only.
3. **Catalogue changes** (`db:seed`) appear after the server cache expires (hours) or a redeploy.

**CI.** `.github/workflows/ci.yml` runs on pull requests to `main` and pushes to `main`: `npm ci`, typecheck,
lint, unit tests and the production build, with a read-only token and **no secrets or database** (the
build renders the static demo catalogue). Integration tests need the Atlas test database and run locally.

**Security headers** (`src/lib/securityHeaders.ts`, applied to every response by `next.config.ts`): CSP
(same-origin, plus Google Fonts for the icon font; inline scripts allowed because prerendered pages cannot
carry nonces; framing refused), `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
`Permissions-Policy`, `Cross-Origin-Opener-Policy` and HSTS (not in development). `X-Powered-By` is off.

## Code layout

```
src/server/                 server-only code (never imported by Client Components)
  config/env.ts             environment schema (pure; shared with scripts)
  env.ts                    serverEnv(): validated, cached environment
  db/mongo.ts               driver helpers: client options, pingDatabase() (pure; testable)
  db/client.ts              the shared MongoClient: lazy, pooled, cached on globalThis; getDb(), checkDatabase()
  db/collections.ts         collection / validator / index registry + ensureCollections() (pure; shared with scripts)
  http/errors.ts            AppError, error codes → HTTP status, toErrorResponse()
  http/requestId.ts         request-ID resolution
  http/handler.ts           route() wrapper and json() helper for Route Handlers
  log.ts                    structured JSON logging with redaction
  db/targets.ts             database target guards: script flags, test-database resolution
  catalogue/                schemas (Zod), types, taxonomy, collection validators and indexes;
                            public.ts / read.ts / service.ts / routes.ts — the public catalogue (M3)
  catalogue/seed/           demo seed: mapping from src/data, validation, planning, apply
  testing/integrationDb.ts  integration-test harness: guarded halden_test access, run-scoped collections
src/app/api/v1/…            Route Handlers (thin: parse → service → respond)
scripts/db-setup.ts         applies the collection registry to a database (run with tsx)
scripts/db-seed.ts          writes the demo catalogue to a database (run with tsx)
```

Modules that import `server-only` fail the build if a Client Component imports them, so database code
and secrets cannot leak into the browser bundle. Later milestones add `domain/`, `repositories/` and
`services/` under `src/server/`, as in the approved plan.

## API conventions

- Base path `/api/v1`. JSON in and out, camelCase fields. Responses are `cache-control: no-store` unless a
  route opts in to caching.
- Every Route Handler is wrapped in `route(name, fn)` (`src/server/http/handler.ts`), which:
  - resolves a **request ID** — a safe incoming `x-request-id`, else Vercel's `x-vercel-id`, else a new
    UUID — and returns it as `x-request-id` on every response;
  - turns thrown errors into the standard error body (below);
  - writes one structured log line per request (route, method, path without the query string, status,
    duration, request ID; for 5xx the error name and code, never the message).
- Services throw `AppError(code, message, { details })`. Zod validation errors become `VALIDATION_FAILED`.
  Anything unknown becomes a generic `INTERNAL`. Messages and details of 5xx errors are never sent to the client.

```json
{ "error": { "code": "VALIDATION_FAILED", "message": "The request is invalid.", "details": [{ "path": "email", "message": "…" }], "requestId": "…" } }
```

| Code | HTTP |
| --- | --- |
| `BAD_REQUEST`, `VALIDATION_FAILED` | 400 |
| `UNAUTHENTICATED` | 401 |
| `FORBIDDEN` | 403 |
| `NOT_FOUND` | 404 |
| `METHOD_NOT_ALLOWED` | 405 |
| `CONFLICT` | 409 |
| `POLICY_VIOLATION` | 422 |
| `RATE_LIMITED` | 429 |
| `INTERNAL` | 500 |
| `SERVICE_UNAVAILABLE` | 503 |

## Health endpoint

`GET /api/v1/health` — evaluated on every request (never prerendered), never cached.

| Database state | HTTP | Body |
| --- | --- | --- |
| answers `ping` | 200 | `{"status":"ok","time":"…","checks":{"database":{"status":"up","latencyMs":12}}}` |
| `MONGODB_URI` not set | 503 | `{"status":"degraded",…,"database":{"status":"not_configured"}}` |
| unreachable / too slow (2.5 s) / bad credentials / other | 503 | `…"database":{"status":"down","reason":"unreachable" \| "timeout" \| "auth_failed" \| "error","latencyMs":…}` |

Only a coarse reason is returned; hosts and driver messages stay out of the response.

Unknown paths under `/api` answer `404 NOT_FOUND` with the standard JSON error body and a request ID
(`src/app/api/[...path]/route.ts`), not the HTML not-found page.

## Authentication (M5)

Email + passcode accounts with server-side sessions, built on Node's `crypto` (no auth framework, no new
dependency) in `src/server/auth/`.

- **Passcodes** are hashed with scrypt (N=2^17, r=8, p=1, random salt; stored as `scrypt$N$r$p$salt$hash`) and
  compared in constant time. Policy: 12–128 characters, a letter, a number or symbol. Never logged or returned.
- **Sessions:** a 256-bit random token in an HttpOnly, SameSite=Lax cookie (`__Host-halden_session`, Secure,
  in production); the database stores only its SHA-256 hash. 30 days with "remember me", otherwise 12 hours
  (and the cookie ends with the browser). Every request looks the session up, so sign-out, a passcode reset
  or disabling an account takes effect immediately. A TTL index removes expired sessions.
- **Server Actions** (`src/app/actions/auth.ts`) handle sign-in, registration, sign-out, password reset and
  profile changes. Next.js only accepts them from this origin, which with SameSite=Lax is the CSRF protection.
- **Roles:** `customer` (every registration — the role is never read from input), `staff`, `admin`. There is
  no public way to change a role; an operator sets it in the database (see below).
- **Brute force:** failed sign-ins are limited to 5 per email and 50 per IP address per 15 minutes
  (`rateLimits`, TTL-expired; email keys are hashed). Registrations: 10 per IP per hour. Passcode changes
  share the sign-in budget. Errors never say whether an email exists or the passcode was wrong.
- **Protected areas:** `/account/**` (signed in) and `/staff/**` (staff or admin) are enforced on the server
  by the layouts' `AuthGate`; a customer asking for the staff console gets a 404. `src/proxy.ts` only adds an
  early redirect to `/sign-in?next=…` when there is no session cookie. `GET /api/v1/me` returns the public
  profile or 401. Return targets are same-site paths only.
- **Email:** with `RESEND_API_KEY` and `EMAIL_FROM` set, "forgot passcode" emails a single-use link (1 hour)
  and registration sends a verification link (48 hours, `/api/v1/auth/verify-email`); tokens are stored hashed.
  Without them nothing is sent and the forgot-passcode page says email is unavailable.
- **Setup:** `users` (unique email), `sessions`, `authTokens` and `rateLimits` are registered with `db:setup`.
  Until they exist, auth refuses to write (it never lets MongoDB create them without their indexes).

**Granting staff or admin.** Admins change roles in the staff console (Team). The FIRST admin — and any
operator fix — uses the guarded command line (dry run by default; the account must have registered):
`npm run user:role -- --email=person@example.com --role=admin --apply --confirm-db=<database>`. It goes
through the same service (audited, last-admin protection). There is no web endpoint for bootstrapping.

## Fleet and availability (M6)

**Fleet units** (`fleetUnits`) are the physical cars: `unitCode` (generated, `FU-XXXXXX`), `modelSlug` →
`vehicleModels.slug`, `registration` (normalised, unique), optional `vin` (unique when present), `locationCode`
→ an active hub, `status`, `mileageKm` (never decreases), `year`, optional `notes`, timestamps. Status changes
follow `STATUS_TRANSITIONS` (`src/server/fleet/statuses.ts`): available → rented / maintenance / inactive;
rented → available / maintenance; maintenance → available / inactive; inactive → available / maintenance.
A rented car cannot be reassigned to another hub. **Blocks** (`availabilityBlocks`) take a car out of
service for `[startsAt, endsAt)` (maintenance or unavailable); blocks of one car never overlap.

Staff API (staff/admin only; signed out → 401, customers → 403; writes must be same-origin JSON):

| Method & path | Purpose |
| --- | --- |
| `GET /api/v1/staff/fleet?model=&location=&status=` | list units |
| `POST /api/v1/staff/fleet` | register a car (201) |
| `GET` / `PATCH /api/v1/staff/fleet/:id` | details with upcoming blocks / update details or hub |
| `POST /api/v1/staff/fleet/:id/status` | `{ status }`, following the transitions |
| `GET` / `POST /api/v1/staff/fleet/:id/blocks`, `DELETE …/blocks/:blockId` | maintenance/unavailability blocks |
| `GET /api/v1/staff/availability?model=&pickup=&return=&from=&to=` | availability with per-unit reasons |

`GET /api/v1/availability?model=&pickup=&return=&from=&to=` is public and answers only `available: true|false`
(no units, plates or counts). Times are ISO 8601 with seconds and a zone (`2030-06-10T10:00:00Z` or `+02:00`).

**Availability engine** (`src/server/availability/engine.ts`, pure): periods are half-open, so back-to-back
periods do not overlap. A unit is available when its status is `available`, it is at the pick-up hub (its
own hub, or the return hub of its last reservation), no block overlaps the rental, and no reservation
overlaps it once widened by a 2-hour turnaround. Rentals last 1 hour to 90 days and cannot start in the past;
one-way returns to another active hub are allowed; a model that is not `bookable` is never available.
Reservations come from a `ReservationSource`, implemented over the bookings since M7 (see Bookings). A car
marked rented by hand, without an active rental, counts as unavailable (its return time is unknown).

The staff fleet register (`/staff/fleet`) lists the real units with hub/status/model filters, registers cars
and changes status and hub through this API; next allocation and 14-day utilisation come from the bookings.
The vehicle editor page is still a Stitch demo screen.

## Bookings (M7)

**Model.** A booking reserves a specific fleet unit (`bookings.unitId`) for `[pickupAt, returnAt)` between
two hubs, with an immutable price snapshot (cents), a driver snapshot, timestamps and an append-only
`history`. Reference: `HLD-MMDD-XXXX` (unique). Staff can move a booking to another free car of the model.

**Lifecycle** (`src/server/bookings/statuses.ts`): `held` → `confirmed` → `checked_out` → `completed`;
`held` → `expired` (hold lapsed, 15 min) or `cancelled`; `confirmed` → `cancelled`. Customers cancel their own
bookings until pick-up; staff until check-out. Check-out (from 6 h before pick-up) needs the assigned car
`available` at the pick-up hub and sets it `rented`; check-in moves the car to the return hub, back into
service or to maintenance, with the odometer reading. There is no in-place modification: change = cancel
and book again (or staff reassign the car). No refunds exist because nothing is charged before M10.

**Availability** reuses the M6 engine through the bookings' `ReservationSource`: unexpired holds,
confirmed bookings, active rentals (an overdue rental counts until now, never forever) and rentals
completed within the turnaround all occupy the car; one-way returns move it, and a trip may not strand
the car before its next booking. Cars with upcoming bookings cannot be moved to another hub or retired.

**No overselling.** Creating a hold, reassigning, check-out and check-in run in a MongoDB transaction that
first writes a per-car document in `bookingLocks` for every car involved, then re-checks availability and
writes. Two requests for the same car conflict on that write; MongoDB aborts one, `withTransaction` retries
it and the retry sees the first booking (`409` "no longer available"). Requires a replica set (Atlas is
one). Repeating a booking request with the same `idempotencyKey` returns the same booking.

**Pricing** (`src/server/bookings/pricing.ts`, integer cents): day rate × started 24-hour days; extras per
day × days × quantity or per rental × quantity (included extras free, quantities ≤ the extra's maximum);
optional one-way fee `ONE_WAY_FEE_EUR` (default 0 — not defined by the business yet); VAT 19 % (the
booking screens' rate) on the whole subtotal, rounded to the cent. Trip times are hub-local wall-clock
times converted with each hub's IANA time zone (times skipped by a DST change are rejected). The client
sends the total it showed; if the server's total differs the hold is refused (`409 price_changed`).

**Emails.** With Resend configured, confirmation and cancellation emails are sent; otherwise nothing is
sent. Either way the outcome is recorded in the booking history and shown on the confirmation page —
email never decides whether a booking succeeds.

| Method & path | Who | Purpose |
| --- | --- | --- |
| `POST /api/v1/quote` | public, rate-limited | price + availability for a trip (nothing reserved) |
| `GET /api/v1/availability` | public, rate-limited | yes/no, now including bookings |
| `GET` / `POST /api/v1/bookings` | signed in | own bookings / create a hold (201; 200 on idempotent replay) |
| `GET /api/v1/bookings/:ref` | owner | one booking (404 for anyone else's) |
| `POST /api/v1/bookings/:ref/confirm`, `…/cancel` | owner | confirm the hold / cancel until pick-up |
| `GET /api/v1/staff/bookings?status=&location=&from=&to=&q=` | staff | search bookings |
| `GET /api/v1/staff/bookings/:ref` | staff | operational view (car, driver, history, notes) |
| `POST /api/v1/staff/bookings/:ref/{confirm,cancel,assign,check-out,check-in,notes}` | staff | lifecycle actions |

Customers never see the car assignment, staff notes or audit trail; there is no generic status update.
**Pages:** the booking flow checks availability on the trip step, shows the server's price on review and
reserves on confirm (sign-in required; the trip is kept through sign-in); `/account` lists the patron's
reservations and `/account/reservations/:ref` shows one with cancel; `/staff/bookings`, its detail page,
`/staff/availability` (14-day planner) and the fleet register's allocation/utilisation use real data.
Since M8 the staff overview, customers and curbside screens are real as well (see below).

## Staff and admin operations (M8)

Every staff screen shares one console frame (`StaffChrome`): navigation, a header search into bookings,
sign-out. Admin-only entries are hidden from staff, but pages and APIs enforce roles on the server.

- **Overview** (`/staff`): today's pick-ups and returns (each hub's own calendar day), rentals out, overdue
  returns, bookings needing attention in the next 48 h, upcoming pick-ups/returns, recent bookings, fleet
  counts by hub and cars in maintenance — derived from the bookings and fleet (`src/server/staff/operations.ts`).
- **Curbside** (`/staff/curbside`, handheld): today's pick-ups, returns and overdue cars at a hub with a
  readiness state DERIVED from the booking lifecycle (upcoming, ready, needs attention, return expected,
  overdue, returned). Hand-over and take-back are the M7 check-out/check-in actions (odometer, condition
  note, maintenance), so the server re-checks car, hub and booking.
- **Customers** (`/staff/customers`, detail `/staff/customers/:id`): search by name/email, filter by status,
  booking history grouped by state. Staff can suspend/reactivate customer accounts (reason audited; all
  sessions end at once; sign-in refused). Accounts are never deleted: bookings and the audit log refer to them.
- **Team** (`/staff/team`, admins only): staff/admin accounts, exact-email lookup to promote any account,
  role changes and staff suspension. Nobody changes their own role or status; the last active admin can be
  neither demoted nor suspended — enforced in a transaction on a fixed roster lock, so two admins acting at
  once cannot remove each other.
- **Audit log** (`/staff/audit`, admins only): `auditEvents` — actor, action, entity, before/after and reason
  for staff booking actions, fleet changes, blocks, account status and role changes. Insert-only; secret
  fields are scrubbed; bookings additionally keep their own history.
- **Settings** (`/staff/settings`): the configuration in force, read-only, with its source (release,
  deployment variable, catalogue). Pricing and booking rules are not editable from the web on purpose:
  a quote must not change between review and confirmation. No secrets are shown.

| Method & path | Who |
| --- | --- |
| `GET /api/v1/staff/operations?hub=` | staff |
| `GET /api/v1/staff/customers?q=&status=`, `GET …/:id` | staff |
| `POST /api/v1/staff/accounts/:id/{suspend,reactivate}` | staff (customers) · admin (staff/admin accounts) |
| `GET /api/v1/admin/team?q=` or `?email=` | admin |
| `POST /api/v1/admin/accounts/:id/role` | admin |
| `GET /api/v1/admin/audit?entity=&id=` | admin |
| `GET /api/v1/staff/settings` | staff |

The vehicle editor page remains a labelled Stitch design preview; cars are managed in the fleet register.

## Catalogue API

`GET /api/v1/locations`, `GET /api/v1/vehicles`, `GET /api/v1/extras` — the public catalogue, read-only.

- **Response:** `200 { "data": [ … ] }`, in catalogue order (`sortOrder`). Only public items: locations and
  extras with status `active`, vehicles with status `published`. An empty collection returns `{ "data": [] }`.
- **Fields:** the stored document without `_id`, `createdAt`, `updatedAt`, `dataOrigin`, `schemaVersion`,
  `status` and `sortOrder` (`src/server/catalogue/public.ts`). Money is in cents (`displayRate`, `charge`).
- **Query parameters:** none. The catalogue is small and the frontend filters and sorts it itself, so any
  parameter is rejected with `400 VALIDATION_FAILED` rather than silently ignored.
- **Errors:** `503 SERVICE_UNAVAILABLE` when the database is not configured or unreachable; `500 INTERNAL`
  if a stored document fails schema validation (logged with field paths only, never values).
- **Caching:** each list is cached on the server (`"use cache"`, `cacheLife("hours")`, tag `catalogue` — call
  `revalidateTag("catalogue")` after a catalogue change). Successful responses also carry
  `cache-control: public, max-age=60, s-maxage=300, stale-while-revalidate=3600`; errors are `no-store`.

**Pages.** Server Components read the same cached service (`src/server/catalogue/service.ts`) directly —
they do not call the HTTP endpoints. The root layout loads the catalogue once and hands it to Client
Components through `CatalogueProvider` / `useCatalogue()`; `src/lib/catalogue.ts` maps public items to the
view types the components were built on, so the UI is unchanged. Hub time-zone labels (CET/CEST) are
derived from each hub's IANA zone. `src/data/*.ts` is now only the seed source.

**Without a database.** If `MONGODB_URI` is not set at all, pages render the static demo catalogue
(mapped through the seed, so it is identical to the seeded data) and log a warning; the API answers 503.
A configured database that fails is an error, never a silent fallback. Builds read the catalogue at build
time, so a build with `MONGODB_URI` set needs database access.

## Database setup

Collections are declared in `src/server/db/collections.ts` (`COLLECTIONS`: name, named indexes,
optional `$jsonSchema` validator) by the milestone that introduces them — M2 registers the catalogue
collections (`locations`, `vehicleModels`, `extras`). They are applied by a script, never at request time:

```bash
npm run db:setup                                        # dry run: read-only, prints the target (no credentials) and planned changes
npm run db:setup -- --apply --confirm-db=<database>     # apply; --confirm-db must equal MONGODB_DB exactly
npm run db:setup -- --apply --confirm-db=<db> --allow-production   # also needed when the target looks like production
```

The script runs with `tsx` and reads `.env.local` if present. Setup is diff-based and idempotent: it
creates missing collections and indexes and re-applies a validator only when it differs; conflicting
indexes stop the whole run, nothing is ever dropped, and unregistered collections or indexes are reported
and left alone. `halden_test*` databases are reserved for integration tests and refused by the script.

**Permissions.** Routine setup — creating the catalogue collections with their validators, creating
missing indexes, and every later run that finds nothing to change — works with a least-privileged
database user that has `readWrite` on the target database. *Changing an existing validator* uses the
`collMod` command, which `readWrite` does not grant. When a validator changes, setup reports
`update-validator` and fails with an "Unauthorized" hint under such a user; apply that change separately
with explicitly authorised, temporarily elevated permissions. Do not widen the application user's role to
make it pass.

**If setup fails partway.** Changes are applied in order (collections, validators, then indexes) and are
not rolled back, so a failure — e.g. a lost connection, a missing privilege, or existing duplicates under
a new unique index — can leave part of the plan applied. Fix the underlying cause and run the same command
again: setup is diff-based, plans only what is still missing, and never drops anything, so it converges.
A dry run first shows what remains.

## Demo catalogue seed

The demo catalogue (5 locations, 10 vehicle models, 5 extras) is generated from the frontend's static
data by `catalogueSeedFromStatic()` and written by a script. Run `db:setup` first — the seed never
creates collections or indexes and refuses to run until setup is complete.

```bash
npm run db:seed                                        # dry run: read-only, prints the plan per collection
npm run db:seed -- --apply --confirm-db=<database>     # apply; --confirm-db must equal MONGODB_DB exactly
npm run db:seed -- --apply --confirm-db=<db> --allow-production   # also needed when the target looks like production
```

The same target guards as `db:setup` apply (unknown arguments rejected, `halden_test*` refused,
everything checked before connecting).

- **Validation before any write.** The whole seed is validated, every stored catalogue document is read
  and validated against the stored schemas, and the complete plan is built — all before the first
  write. Any validation error or conflict in *any* collection aborts the run with nothing written.
  Problems are reported as field paths, never stored values.
- **Ownership.** The seed manages only documents with `dataOrigin: "demo"`, matched by natural key
  (`locations.code`, `vehicleModels.slug`, `extras.code`). Missing → inserted; demo-owned and different
  → only the changed fields are updated (plus `updatedAt`; `createdAt` is kept); demo-owned and equal →
  untouched. A non-demo document holding a seed key — or holding a uniquely indexed value a seed document
  needs (IATA code, exhibit number) — is a conflict and aborts the run; it is never overwritten.
  Documents the seed does not mention (unmanaged, or demo documents no longer seeded) are reported and
  left alone. Nothing is ever deleted.
- **Idempotent.** `_id` and timestamps are not compared, so a second run plans 0 changes.
- **Not transactional.** Writes are applied one document at a time in the order locations →
  vehicleModels → extras. An insert that hits a duplicate key (another writer got there first) and an
  update whose document is no longer demo-owned are skipped and reported, never forced. An unexpected
  error stops the run; the report lists what was written and what was not attempted. Fix the cause and
  run again — the seed re-plans from the stored state and converges.

## Catalogue collections

Defined in `src/server/catalogue/collections.ts` and applied by `db:setup`:

| Collection | Natural key | Unique indexes | List index |
| --- | --- | --- | --- |
| `locations` | `code` | `locations_code_unique` `{ code: 1 }`, `locations_iata_unique` `{ iataCode: 1 }` | `locations_status_sort` `{ status: 1, sortOrder: 1 }` |
| `vehicleModels` | `slug` | `vehicleModels_slug_unique` `{ slug: 1 }`, `vehicleModels_exhibit_unique` `{ exhibit: 1 }` (across all statuses) | `vehicleModels_status_sort` `{ status: 1, sortOrder: 1 }` |
| `extras` | `code` | `extras_code_unique` `{ code: 1 }` | `extras_status_sort` `{ status: 1, sortOrder: 1 }` |

Each collection has a `$jsonSchema` validator (required fields, types, enums and patterns; unknown
top-level fields rejected) with `validationLevel: "moderate"` and `validationAction: "error"`. The Zod
schemas in `src/server/catalogue/schemas.ts` are the stricter check (cross-field rules such as "published
models have a rate"); the seed applies them to every stored document before writing. Every document
carries `dataOrigin` (`demo` or `managed`), `schemaVersion`, `createdAt` and `updatedAt`.

**Current state.** The application database has the three collections, their validators and all eight
indexes, and holds the demo catalogue: 5 locations, 10 vehicle models and 5 extras, all
`dataOrigin: "demo"`. `db:setup` and `db:seed` dry runs against it both report 0 changes. The test
database has the same three collections (setup only, no documents), which the integration tests leave
untouched.

## Tests

`npm test` runs every Vitest suite, frontend and backend. Backend tests live next to the code
(`src/server/**/*.test.ts`) and need no database:

- environment parsing, including that invalid values are never echoed;
- error mapping, request IDs, and the route wrapper (including log redaction);
- `pingDatabase`: success, timeout, authentication failure and synchronous throws with a fake client, plus
  the **real driver** against a closed local port (unreachable);
- collection setup, dry run and apply, against a fake `Db`;
- seed planning (ownership, conflicts, idempotency, validation), the write step against a fake `Db`, and
  the `db:seed` command's guards (spawned with a closed local port; every case stops before connecting);
- the health route for up / not configured / down / unexpected errors.

### Integration tests

`npm run test:integration` runs `src/**/*.int.test.ts` against the dedicated **`halden_test`** database
(the same Atlas cluster, configured through `.env.local`; `npm test` never runs them). They need a
database user with `readWrite` on `halden_test` — no administrative rights.

Safety is enforced in code:

- the test database comes only from `resolveTestDatabase` (`src/server/db/targets.ts`): it must be
  `halden_test` or `halden_test_<suffix>` (override with `MONGODB_TEST_DB`), must differ from
  `MONGODB_DB`, and is never `halden` or production. A missing or unsafe configuration aborts the run
  before any test starts (global setup). There is no fallback to the application database;
- tests reach MongoDB only through `src/server/testing/integrationDb.ts`, which re-checks the database
  name on the connected handle and again before cleanup;
- every collection a run creates is named `it_<runId>_<name>` (UTC timestamp + 48 random bits). Cleanup
  drops only that run's collections — concurrent runs and anything else in the database are untouched —
  and never uses `dropDatabase`;
- `withIntegrationDatabase(fn)` cleans up in a `finally` block; if both the test and its cleanup fail,
  the test's own error is reported first (an `AggregateError`), and a cleanup failure fails an otherwise
  passing test.

If a run is killed before cleanup, its `it_<runId>_*` collections stay behind; they are inert and can be
dropped by hand in `halden_test`.

The seed's integration tests (`src/server/catalogue/seed/seed.int.test.ts`) share one guarded connection
per file and give every test its own run-scoped copies of the catalogue collections, created with the real
validators and indexes; `afterAll` drops them. The `locations`, `vehicleModels` and `extras` collections in
`halden_test` are never written by tests. Integration timeouts are generous (20 s to connect, 120 s per
test) because fresh TLS handshakes to Atlas can take several seconds.
