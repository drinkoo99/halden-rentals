import { describe, expect, it } from "vitest";
import { EnvValidationError, parseServerEnv } from "./env";

const URI = "mongodb+srv://user:s3cret@cluster0.example.mongodb.net/?retryWrites=true";

describe("server environment in production (VERCEL_ENV=production)", () => {
  it("requires MONGODB_URI and MONGODB_DB explicitly — no halden_dev default, no demo fallback", () => {
    const err = (() => {
      try {
        parseServerEnv({ VERCEL_ENV: "production" });
      } catch (e) {
        return e as EnvValidationError;
      }
    })();
    expect(err).toBeInstanceOf(EnvValidationError);
    expect(err!.issues.map((i) => i.variable)).toEqual(["MONGODB_URI", "MONGODB_DB"]);
    expect(err!.message).toContain("required in production");
  });

  it("treats blank values as missing", () => {
    expect(() => parseServerEnv({ VERCEL_ENV: "production", MONGODB_URI: URI, MONGODB_DB: "  " })).toThrow(/MONGODB_DB is required in production/);
  });

  it("accepts a complete production configuration", () => {
    expect(parseServerEnv({ VERCEL_ENV: "production", MONGODB_URI: URI, MONGODB_DB: "halden" })).toMatchObject({ MONGODB_DB: "halden" });
  });

  it("reports a malformed value once, without echoing it", () => {
    const err = (() => {
      try {
        parseServerEnv({ VERCEL_ENV: "production", MONGODB_URI: "postgres://user:s3cret@db", MONGODB_DB: "halden" });
      } catch (e) {
        return e as EnvValidationError;
      }
    })();
    expect(err!.issues).toHaveLength(1);
    expect(err!.message).not.toContain("s3cret");
  });

  it("keeps the development defaults outside production (previews, CI, local)", () => {
    expect(parseServerEnv({ VERCEL_ENV: "preview" }).MONGODB_DB).toBe("halden_dev");
    expect(parseServerEnv({}).MONGODB_URI).toBeUndefined();
  });
});
