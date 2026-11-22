import { describe, expect, it } from "vitest";
import { hashPassword, hashToken, newToken, PASSWORD_PARAMS, verifyPassword } from "./crypto";

const FAST = { N: 2 ** 10, r: 8, p: 1 }; // tests only; production uses PASSWORD_PARAMS

describe("password hashing (scrypt)", () => {
  it("uses the OWASP scrypt cost in production", () => {
    expect(PASSWORD_PARAMS).toEqual({ N: 2 ** 17, r: 8, p: 1 });
  });

  it("verifies the right password and rejects a wrong one", async () => {
    const hash = await hashPassword("Correct-horse-42", FAST);
    expect(hash).toMatch(/^scrypt\$1024\$8\$1\$[\w-]{22}\$[\w-]{43}$/);
    expect(hash).not.toContain("Correct-horse-42");
    expect(await verifyPassword("Correct-horse-42", hash)).toBe(true);
    expect(await verifyPassword("correct-horse-42", hash)).toBe(false);
  });

  it("salts every hash", async () => {
    expect(await hashPassword("same password 1", FAST)).not.toBe(await hashPassword("same password 1", FAST));
  });

  it("rejects malformed or tampered hashes instead of throwing", async () => {
    const hash = await hashPassword("Correct-horse-42", FAST);
    expect(await verifyPassword("Correct-horse-42", "plain-text")).toBe(false);
    expect(await verifyPassword("Correct-horse-42", hash.replace("scrypt$", "bcrypt$"))).toBe(false);
    expect(await verifyPassword("Correct-horse-42", hash.replace("$1024$", "$99999999$"))).toBe(false); // absurd cost refused
    expect(await verifyPassword("Correct-horse-42", hash.slice(0, -4))).toBe(false);
  });

  it("verifies a full-cost production hash", async () => {
    const hash = await hashPassword("Production-cost-1");
    expect(await verifyPassword("Production-cost-1", hash)).toBe(true);
  });
});

describe("tokens", () => {
  it("are 256-bit random and stored only as a SHA-256 hash", () => {
    const t = newToken();
    expect(t).toMatch(/^[\w-]{43}$/);
    expect(newToken()).not.toBe(t);
    expect(hashToken(t)).toMatch(/^[\w-]{43}$/);
    expect(hashToken(t)).not.toBe(t);
    expect(hashToken(t)).toBe(hashToken(t));
  });
});
