# HALDEN — Backend

Phase 2 adds a backend to the existing Next.js app: a **modular monolith** (no separate server), with
MongoDB Atlas through the official driver and Zod for validation. The architecture and the milestone plan
were approved before implementation; this file documents what exists so far.

**Status: M2 — Database catalogue.** M1 provides environment validation, the database client, API
conventions, a health endpoint and collection-setup tooling. M2 adds the catalogue (`locations`,
`vehicleModels`, `extras`): schemas, collection validators and indexes, the demo seed and an
integration-test harness. The application database is set up and holds the demo catalogue. There is no
catalogue API yet, no authentication, bookings or pricing, and no page reads from the database — the
frontend behaves exactly as in Phase 1.

## Setup

1. `npm install`
2. `cp .env.example .env.local` and set the variables below (all optional in M1).
3. `npm run dev`, then open <http://localhost:3000/api/v1/health>.

Without `MONGODB_URI` the app runs normally and the health endpoint answers **503** with the database
`not_configured`. With a reachable database it answers **200**.

### Environment variables

| Variable | Required | Default | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | for deploys | `http://localhost:3000` | Canonical URLs, sitemap, social previews (Phase 1) |
| `MONGODB_URI` | from M2 | — | MongoDB connection string (`mongodb://` or `mongodb+srv://`) |
| `MONGODB_DB` | no | `halden_dev` | Database name. Names containing `prod` count as production for `db:setup` and `db:seed` |
| `MONGODB_TEST_DB` | no | `halden_test` | Integration-test database (see [Integration tests](#integration-tests)) |
| `LOG_LEVEL` | no | `info` | `debug` \| `info` \| `warn` \| `error` |

- Validated by `src/server/config/env.ts` the first time server code needs them. An invalid value fails
  with the variable name and the problem — never the value.
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
  catalogue/                schemas (Zod), types, taxonomy, collection validators and indexes
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
