import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * The db:seed command's guards, exercised on the real script. Every case must stop BEFORE connecting:
 * the connection string points at a closed local port, .env.local is not loaded, and the assertions
 * check that no database step was reached.
 */
const ROOT = join(__dirname, "..", "..", "..", "..");
const TSX = join(ROOT, "node_modules", "tsx", "dist", "cli.mjs");
const SCRIPT = join(ROOT, "scripts", "db-seed.ts");
const URI = "mongodb://user:not-a-real-secret@127.0.0.1:1/?directConnection=true";

function run(args: string[], env: Record<string, string> = {}) {
  const res = spawnSync(process.execPath, [TSX, SCRIPT, ...args], {
    cwd: ROOT,
    encoding: "utf8",
    timeout: 60_000,
    // a minimal, explicit environment: nothing from .env.local or the developer's shell reaches the script
    env: { PATH: process.env.PATH ?? "", SystemRoot: process.env.SystemRoot ?? "", MONGODB_URI: URI, MONGODB_DB: "halden", ...env } as unknown as NodeJS.ProcessEnv,
  });
  return { code: res.status, out: `${res.stdout}${res.stderr}` };
}
const reachedDatabase = (out: string) => /would |planned |Seed failed|Already up to date|Applied:/.test(out);

describe("db:seed command guards (no database)", () => {
  it.each([
    ["an unknown flag", ["--aply"], {}, 'Unknown argument "--aply"'],
    ["--confirm-db with a space", ["--apply", "--confirm-db", "halden"], {}, 'Unknown argument "--confirm-db"'],
    ["--apply without --confirm-db", ["--apply"], {}, "--apply requires --confirm-db=halden"],
    ["a mismatching --confirm-db", ["--apply", "--confirm-db=halden_dev"], {}, 'does not match the configured database "halden"'],
    ["the test database", [], { MONGODB_DB: "halden_test" }, "reserved for integration tests"],
    ["the test database with --apply", ["--apply", "--confirm-db=halden_test"], { MONGODB_DB: "halden_test" }, "reserved for integration tests"],
    ["production without --allow-production", ["--apply", "--confirm-db=halden_prod"], { MONGODB_DB: "halden_prod" }, "looks like production"],
    ["a missing connection string", [], { MONGODB_URI: "" }, "MONGODB_URI is not set"],
  ])("refuses %s before connecting", (_label, args, env, message) => {
    const { code, out } = run(args as string[], env as Record<string, string>);
    expect(code).toBe(1);
    expect(out).toContain(message);
    expect(reachedDatabase(out)).toBe(false);
    expect(out).not.toContain("not-a-real-secret");
  });
});
