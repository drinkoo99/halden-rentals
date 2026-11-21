# HALDEN — Backend

Phase 2 adds a backend to the existing Next.js app: a **modular monolith** (no separate server), with
MongoDB Atlas through the official driver and Zod for validation. The architecture and the milestone plan
were approved before implementation; this file documents what exists so far.

**Status: M1 — Foundation.** Infrastructure only: environment validation, the database client, API
conventions, a health endpoint, collection-setup tooling and tests. No collections, authentication, bookings
or pricing yet, and no page reads from the database — the frontend behaves exactly as in Phase 1.

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
| `MONGODB_DB` | no | `halden_dev` | Database name. Names containing `prod` count as production for `db:setup` |
| `LOG_LEVEL` | no | `info` | `debug` \| `info` \| `warn` \| `error` |

- Validated by `src/server/config/env.ts` the first time server code needs them. An invalid value fails
  with the variable name and the problem — never the value.
- Secrets live only in `.env.local` (git-ignored) and in Vercel's environment settings. Nothing secret uses
  the `NEXT_PUBLIC_` prefix, which would ship it to the browser.
- Use a development or staging database locally. Production credentials belong only in Vercel's
  Production environment.

### MongoDB Atlas (when you are ready to connect)

1. Create a project per environment (e.g. `halden-staging`, later `halden-prod`) and a free M0 cluster.
2. Database Access → add a user with **readWrite on the app database only** (not Atlas admin).
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
src/app/api/v1/…            Route Handlers (thin: parse → service → respond)
scripts/db-setup.mjs        applies the collection registry to a database
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

Collections are declared in `src/server/db/collections.ts` (`COLLECTIONS`: name, indexes, optional
`$jsonSchema` validator) by the milestone that introduces them. **M1 registers none.** They are applied
by a script, never at request time:

```bash
npm run db:setup                      # dry run: prints the target (no credentials) and the planned changes
npm run db:setup -- --apply           # apply to MONGODB_URI / MONGODB_DB
npm run db:setup -- --apply --allow-production   # needed when MONGODB_DB contains "prod" or VERCEL_ENV=production
```

The script reads `.env.local` if present and imports the TypeScript registry directly (Node 24 type
stripping). Setup is idempotent: existing collections are kept and existing indexes are left as they are.

## Tests

`npm test` runs every Vitest suite, frontend and backend. Backend tests live next to the code
(`src/server/**/*.test.ts`) and need no database:

- environment parsing, including that invalid values are never echoed;
- error mapping, request IDs, and the route wrapper (including log redaction);
- `pingDatabase`: success, timeout, authentication failure and synchronous throws with a fake client, plus
  the **real driver** against a closed local port (unreachable);
- collection setup, dry run and apply, against a fake `Db`;
- the health route for up / not configured / down / unexpected errors.

An in-memory MongoDB replica set for integration tests (`mongodb-memory-server`, dev dependency) is
deferred to the milestone that first needs real queries and transactions.
