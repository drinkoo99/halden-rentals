import { describe, expect, it } from "vitest";
import { assertScriptTarget, isTestDatabase, looksLikeProduction, parseTargetArgs, resolveTestDatabase, TargetGuardError } from "./targets";

const URI = "mongodb://localhost:1"; // never connected to: these are pure functions

describe("parseTargetArgs", () => {
  it("defaults to a dry run", () => {
    expect(parseTargetArgs([])).toEqual({ apply: false, allowProduction: false });
  });
  it("reads --apply, --confirm-db and --allow-production", () => {
    expect(parseTargetArgs(["--apply", "--confirm-db=halden", "--allow-production"])).toEqual({ apply: true, allowProduction: true, confirmDb: "halden" });
  });
  it.each([
    [["--aply"], /Unknown argument "--aply"/],
    [["--apply", "--confirm-db", "halden"], /Unknown argument "--confirm-db"/],
    [["--apply", "--confirm-db="], /needs a database name/],
    [["--confirm-db=halden"], /only used together with --apply/],
    [["halden"], /Unknown argument "halden"/],
  ])("rejects %j", (argv, message) => {
    expect(() => parseTargetArgs(argv)).toThrow(TargetGuardError);
    expect(() => parseTargetArgs(argv)).toThrow(message);
  });
});

describe("assertScriptTarget (db:setup / db:seed)", () => {
  const dry = { apply: false, allowProduction: false };
  const apply = (confirmDb?: string, allowProduction = false) => ({ apply: true, allowProduction, confirmDb });

  it("allows a read-only dry run against the application database", () => {
    expect(() => assertScriptTarget("halden", dry)).not.toThrow();
  });
  it("requires --confirm-db for --apply", () => {
    expect(() => assertScriptTarget("halden", apply())).toThrow("--apply requires --confirm-db=halden");
  });
  it("refuses a --confirm-db that does not match the configured database", () => {
    expect(() => assertScriptTarget("halden", apply("halden_dev"))).toThrow('does not match the configured database "halden"');
    expect(() => assertScriptTarget("halden", apply("HALDEN"))).toThrow(TargetGuardError);
  });
  it("allows --apply when confirmed", () => {
    expect(() => assertScriptTarget("halden", apply("halden"))).not.toThrow();
  });
  it("requires --allow-production for production-looking targets", () => {
    expect(() => assertScriptTarget("halden_prod", apply("halden_prod"))).toThrow("looks like production");
    expect(() => assertScriptTarget("halden", apply("halden"), "production")).toThrow("looks like production");
    expect(() => assertScriptTarget("halden_prod", apply("halden_prod", true))).not.toThrow();
  });
  it("refuses halden_test* databases even for a dry run (reserved for integration tests)", () => {
    for (const db of ["halden_test", "halden_test_ci"]) {
      expect(() => assertScriptTarget(db, dry)).toThrow("reserved for integration tests");
      expect(() => assertScriptTarget(db, apply(db))).toThrow("reserved for integration tests");
    }
  });
});

describe("resolveTestDatabase (integration tests)", () => {
  const env = (overrides: Record<string, string | undefined> = {}) => ({ MONGODB_URI: URI, MONGODB_DB: "halden", ...overrides });

  it("defaults to halden_test", () => {
    expect(resolveTestDatabase(env())).toBe("halden_test");
  });
  it("accepts a suffixed test database", () => {
    expect(resolveTestDatabase(env({ MONGODB_TEST_DB: "halden_test_ci" }))).toBe("halden_test_ci");
  });
  it("fails loudly without a connection string", () => {
    expect(() => resolveTestDatabase(env({ MONGODB_URI: undefined }))).toThrow("need MONGODB_URI");
    expect(() => resolveTestDatabase(env({ MONGODB_URI: "  " }))).toThrow("need MONGODB_URI");
  });
  it('explicitly rejects "halden"', () => {
    expect(() => resolveTestDatabase(env({ MONGODB_TEST_DB: "halden" }))).toThrow('never use the "halden" application database');
  });
  it.each(["halden_dev", "halden_testx", "halden_test-ci", "HALDEN_TEST", "test", "admin", "halden_test_", "halden_test_CI"])(
    "rejects %s (outside the halden_test naming convention)",
    (name) => {
      expect(() => resolveTestDatabase(env({ MONGODB_TEST_DB: name }))).toThrow("outside the permitted naming");
    },
  );
  it("rejects a test database equal to MONGODB_DB", () => {
    expect(() => resolveTestDatabase(env({ MONGODB_DB: "halden_test" }))).toThrow("must differ from the application database");
    expect(() => resolveTestDatabase({ MONGODB_URI: URI, MONGODB_TEST_DB: "halden_test_x", MONGODB_DB: "halden_test_x" })).toThrow("must differ");
  });
  it("rejects production databases and production deployments", () => {
    expect(() => resolveTestDatabase(env({ MONGODB_TEST_DB: "halden_test_prod" }))).toThrow("never run against production");
    expect(() => resolveTestDatabase(env({ VERCEL_ENV: "production" }))).toThrow("never run against production");
  });
});

describe("helpers", () => {
  it("classifies test databases strictly", () => {
    expect(["halden_test", "halden_test_1", "halden_test_ci2"].every(isTestDatabase)).toBe(true);
    expect(["halden", "halden_test_", "xhalden_test", "halden_test.prod"].some(isTestDatabase)).toBe(false);
  });
  it("detects production by name or Vercel environment", () => {
    expect(looksLikeProduction("halden_prod")).toBe(true);
    expect(looksLikeProduction("halden", "production")).toBe(true);
    expect(looksLikeProduction("halden", "preview")).toBe(false);
  });
});
