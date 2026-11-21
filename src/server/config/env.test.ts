import { describe, expect, it } from "vitest";
import { describeMongoTarget, EnvValidationError, parseServerEnv } from "./env";

describe("server environment", () => {
  it("applies defaults when nothing is set (database optional in M1)", () => {
    expect(parseServerEnv({})).toEqual({ MONGODB_URI: undefined, MONGODB_DB: "halden_dev", LOG_LEVEL: "info" });
  });

  it("treats empty strings as unset", () => {
    expect(parseServerEnv({ MONGODB_URI: "  ", MONGODB_DB: "", LOG_LEVEL: "" })).toEqual({
      MONGODB_URI: undefined,
      MONGODB_DB: "halden_dev",
      LOG_LEVEL: "info",
    });
  });

  it("accepts standard and SRV connection strings", () => {
    expect(parseServerEnv({ MONGODB_URI: "mongodb://localhost:27017" }).MONGODB_URI).toBe("mongodb://localhost:27017");
    expect(parseServerEnv({ MONGODB_URI: "mongodb+srv://u:p@c0.x.mongodb.net/?retryWrites=true" }).MONGODB_URI).toMatch(/^mongodb\+srv/);
  });

  it("rejects malformed values and names the variable without echoing its value", () => {
    const secret = "postgres://admin:hunter2@db.example.com";
    let error: unknown;
    try {
      parseServerEnv({ MONGODB_URI: secret, MONGODB_DB: "has spaces", LOG_LEVEL: "loud" });
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(EnvValidationError);
    const err = error as EnvValidationError;
    expect(err.issues.map((i) => i.variable).sort()).toEqual(["LOG_LEVEL", "MONGODB_DB", "MONGODB_URI"]);
    expect(err.message).not.toContain("hunter2");
    expect(err.message).not.toContain("db.example.com");
  });

  it("describes a connection target without credentials, path or options", () => {
    expect(describeMongoTarget("mongodb+srv://user:pa%40ss@cluster0.abc.mongodb.net/halden?retryWrites=true")).toBe(
      "mongodb+srv://cluster0.abc.mongodb.net",
    );
    expect(describeMongoTarget("mongodb://localhost:27017")).toBe("mongodb://localhost:27017");
  });

  it("keeps useful descriptions for valid connection strings", () => {
    expect(describeMongoTarget("mongodb://u:p@h1.example:27017,h2.example:27017/halden?replicaSet=rs0")).toBe(
      "mongodb://h1.example:27017,h2.example:27017",
    );
    expect(describeMongoTarget("mongodb://onlyuser@db.example")).toBe("mongodb://db.example");
    expect(describeMongoTarget("mongodb://[::1]:27017/?directConnection=true")).toBe("mongodb://[::1]:27017");
    expect(describeMongoTarget("postgres://u:p@h/db")).toBe("mongodb://(unparseable)");
  });

  // Passwords that were not URL-encoded used to leak fragments ("mongodb://u:pa/ss@h" → "mongodb://u:pa").
  it.each([
    ["unencoded '/'", "mongodb://usr:S3CR/ET@h.example:27017/db", "mongodb://h.example:27017"],
    ["unencoded '@'", "mongodb://usr:S3CR@ET@h.example/db", "mongodb://h.example"],
    ["several '/' and '@'", "mongodb+srv://usr:S3/CR@E/T@c0.x.mongodb.net/?retryWrites=true", "mongodb+srv://c0.x.mongodb.net"],
    ["unencoded '?'", "mongodb://usr:S3CR?ET@h.example/db", "mongodb://h.example"],
    ["unencoded '#'", "mongodb://usr:S3CR#ET@h.example", "mongodb://h.example"],
    ["'/' in the username", "mongodb://us/r:S3CRET@h.example", "mongodb://h.example"],
  ])("never exposes credentials with %s", (_label, uri, expected) => {
    const out = describeMongoTarget(uri);
    expect(out).toBe(expected);
    for (const fragment of ["usr", "us/r", "S3", "CR", "ET"]) expect(out).not.toContain(fragment);
  });

  it("returns a placeholder rather than anything that is not a plain host list", () => {
    expect(describeMongoTarget("mongodb://usr:S3CRET@")).toBe("mongodb://(unparseable host)");
    expect(describeMongoTarget("mongodb://usr:S3CRET@ h.example")).toBe("mongodb://(unparseable host)");
    expect(describeMongoTarget("mongodb://usr:S3CRET@h.example\\x")).toBe("mongodb://(unparseable host)");
  });
});
