import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/**
 * Integration tests (`npm run test:integration`): only `src/**\/*.int.test.ts`, against the dedicated
 * test database. `npm test` never runs them.
 *
 * .env.local is loaded with Node's built-in loader (no dependency); variables already set in the shell
 * take precedence. The global setup then resolves the test database through the code guard before any
 * test runs, so a missing or unsafe configuration fails the whole run loudly (halden, production, wrong
 * naming, or a test database equal to MONGODB_DB are all refused). Tests reach MongoDB only through
 * src/server/testing/integrationDb.ts.
 */
const envFile = fileURLToPath(new URL("./.env.local", import.meta.url));
if (existsSync(envFile)) process.loadEnvFile(envFile);

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "server-only": fileURLToPath(new URL("./node_modules/next/dist/compiled/server-only/empty.js", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.int.test.ts"],
    globalSetup: ["./src/server/testing/integrationGlobalSetup.ts"],
    fileParallelism: false, // one file at a time against the shared test database
    testTimeout: 30_000,
    hookTimeout: 30_000,
  },
});
