import { createHash, randomBytes, scrypt, timingSafeEqual, type ScryptOptions } from "node:crypto";

/**
 * Password hashing and token primitives — Node's built-in crypto only (no custom cryptography).
 *
 * Passwords: scrypt with the OWASP-recommended cost (N=2^17, r=8, p=1), a 16-byte random salt and a 32-byte
 * key, stored self-describing as `scrypt$N$r$p$salt$hash` (base64url) so the cost can be raised later
 * without invalidating existing hashes. Comparison is constant-time.
 *
 * Tokens (sessions, password reset, email verification): 32 random bytes, base64url. Only their SHA-256
 * hash is ever stored, so a database leak does not yield usable tokens.
 */

export type ScryptParams = { N: number; r: number; p: number };
export const PASSWORD_PARAMS: ScryptParams = { N: 2 ** 17, r: 8, p: 1 };
const KEY_LENGTH = 32;

function derive(password: string, salt: Buffer, { N, r, p }: ScryptParams): Promise<Buffer> {
  const options: ScryptOptions = { N, r, p, maxmem: 256 * N * r }; // 2× the 128·N·r scrypt needs
  return new Promise((resolve, reject) => scrypt(password.normalize("NFKC"), salt, KEY_LENGTH, options, (err, key) => (err ? reject(err) : resolve(key))));
}

export async function hashPassword(password: string, params: ScryptParams = PASSWORD_PARAMS): Promise<string> {
  const salt = randomBytes(16);
  const key = await derive(password, salt, params);
  return ["scrypt", params.N, params.r, params.p, salt.toString("base64url"), key.toString("base64url")].join("$");
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split("$");
  if (parts.length !== 6 || parts[0] !== "scrypt") return false;
  const [N, r, p] = parts.slice(1, 4).map(Number);
  if (![N, r, p].every((n) => Number.isInteger(n) && n > 0) || N > 2 ** 20) return false;
  const expected = Buffer.from(parts[5], "base64url");
  if (expected.length !== KEY_LENGTH) return false;
  const actual = await derive(password, Buffer.from(parts[4], "base64url"), { N, r, p });
  return timingSafeEqual(actual, expected);
}

/** A hash of a random password with the current cost: verified against when the email is unknown, so a
 *  login for a non-existent account takes as long as one with a wrong password. */
let dummy: Promise<string> | undefined;
export function dummyPasswordHash(params: ScryptParams = PASSWORD_PARAMS): Promise<string> {
  if (params !== PASSWORD_PARAMS) return hashPassword(randomBytes(16).toString("hex"), params);
  dummy ??= hashPassword(randomBytes(16).toString("hex"), params);
  return dummy;
}

export const newToken = (): string => randomBytes(32).toString("base64url");
export const hashToken = (token: string): string => createHash("sha256").update(token).digest("base64url");
