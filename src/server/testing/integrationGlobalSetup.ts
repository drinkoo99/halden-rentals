import { resolveTestDatabase } from "../db/targets";

/**
 * Vitest global setup for `npm run test:integration`: runs once, before any integration test. Resolves the
 * test database through the code guard and aborts the whole run if the configuration is missing or unsafe
 * (halden, production, wrong naming, or equal to MONGODB_DB). Prints the database name only — never
 * credentials. No connection is made here.
 */
export default function setup(): void {
  const { MONGODB_URI, MONGODB_DB, MONGODB_TEST_DB, VERCEL_ENV } = process.env;
  const testDatabase = resolveTestDatabase({ MONGODB_URI, MONGODB_DB, MONGODB_TEST_DB, VERCEL_ENV });
  console.log(`[integration] test database: ${testDatabase}`);
}
