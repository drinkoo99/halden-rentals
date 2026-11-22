import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ensureCollections } from "../db/collections";
import { isTestDatabase } from "../db/targets";
import { openIntegrationDatabase, type IntegrationDatabase } from "../testing/integrationDb";
import { AUTH_COLLECTION_SPECS, AUTH_COLLECTIONS, type AuthCollectionNames } from "./collections";
import { hashToken } from "./crypto";
import {
  assertAuthReady,
  authenticate,
  changePassword,
  consumeAuthToken,
  createAuthToken,
  createSession,
  deleteSession,
  LIMITS,
  registerUser,
  requestPasswordReset,
  resetPassword,
  sessionUser,
  toPublicUser,
  verifyEmail,
  type AuthContext,
  type Mailer,
  type UserDoc,
} from "./store";

/**
 * Authentication against the real test database (halden_test): every test file run gets its own
 * run-scoped copies of users / sessions / authTokens / rateLimits with the real validators and indexes
 * (unique email, TTL). The application database is never touched; afterAll drops this run's collections.
 */
const FAST = { N: 2 ** 10, r: 8, p: 1 }; // test-only scrypt cost
const KEYS = Object.keys(AUTH_COLLECTIONS) as (keyof typeof AUTH_COLLECTIONS)[];
let tdb: IntegrationDatabase;
let names: AuthCollectionNames;
let clock = new Date("2026-11-22T10:00:00Z");
let ctx: AuthContext;
let n = 0;
const email = () => `patron${++n}@example.com`;
const register = (address = email(), password = "gallery-pass-1") => registerUser(ctx, { name: "Clara Bergmann", email: address, password }, `10.0.0.${n}`);

beforeAll(async () => {
  tdb = await openIntegrationDatabase();
  expect(isTestDatabase(tdb.db.databaseName)).toBe(true);
  names = Object.fromEntries(KEYS.map((k) => [k, tdb.scoped(k)])) as AuthCollectionNames;
  const specs = AUTH_COLLECTION_SPECS.map((s) => ({ ...s, name: names[s.name as keyof AuthCollectionNames] }));
  expect((await ensureCollections(tdb.db, specs, { apply: true })).conflicts).toEqual([]);
  ctx = { db: tdb.db, names, now: () => clock, passwordParams: FAST };
});
afterAll(async () => {
  if (!tdb) return;
  try {
    await tdb.cleanup();
  } finally {
    await tdb.close();
  }
});

describe("registration", () => {
  it("creates an active, unverified customer with a hashed passcode", async () => {
    const user = await register();
    const stored = await tdb.db.collection<UserDoc>(names.users).findOne({ _id: user._id });
    expect(stored).toMatchObject({ role: "customer", status: "active", emailVerifiedAt: null });
    expect(stored!.passwordHash).toMatch(/^scrypt\$/);
    expect(stored!.passwordHash).not.toContain("gallery-pass-1");
    expect(toPublicUser(stored!)).not.toHaveProperty("passwordHash");
  });

  it("rejects a duplicate email, regardless of how it was typed (normalised before storage)", async () => {
    const address = email();
    await register(address);
    await expect(register(address)).rejects.toMatchObject({ code: "CONFLICT" });
  });

  it("the database itself refuses privileged or malformed accounts (validator)", async () => {
    const base = { email: email(), name: "X Y", passwordHash: "scrypt$x", status: "active", emailVerifiedAt: null, createdAt: clock, updatedAt: clock };
    await expect(tdb.db.collection(names.users).insertOne({ ...base, role: "superuser" })).rejects.toMatchObject({ code: 121 });
    await expect(tdb.db.collection(names.users).insertOne({ ...base, role: "customer", email: "Upper@Example.com" })).rejects.toMatchObject({ code: 121 });
    await expect(tdb.db.collection(names.users).insertOne({ ...base, role: "customer", passwordHash: "plaintext" })).rejects.toMatchObject({ code: 121 });
  });

  it("rate-limits registrations per IP address", async () => {
    const ip = "198.51.100.7";
    for (let i = 0; i < LIMITS.registerPerIp.max; i++) await registerUser(ctx, { name: "Rate Test", email: email(), password: "gallery-pass-1" }, ip);
    await expect(registerUser(ctx, { name: "Rate Test", email: email(), password: "gallery-pass-1" }, ip)).rejects.toMatchObject({ code: "RATE_LIMITED" });
  });
});

describe("sign-in", () => {
  it("accepts the right passcode and gives one generic error for a wrong passcode or unknown email", async () => {
    const address = email();
    const user = await register(address);
    expect((await authenticate(ctx, address, "gallery-pass-1", "1.1.1.1"))._id).toEqual(user._id);
    const wrong = await authenticate(ctx, address, "wrong-pass-123", "1.1.1.1").catch((e) => e);
    const unknown = await authenticate(ctx, email(), "gallery-pass-1", "1.1.1.1").catch((e) => e);
    expect(wrong).toMatchObject({ code: "UNAUTHENTICATED", message: "The email or passcode is incorrect." });
    expect(unknown).toMatchObject({ code: "UNAUTHENTICATED", message: wrong.message });
  });

  it("locks an email after 5 failures — even the right passcode — until the window passes", async () => {
    const address = email();
    await register(address);
    for (let i = 0; i < LIMITS.loginPerEmail.max; i++) await expect(authenticate(ctx, address, "wrong-pass-123", `2.2.2.${i}`)).rejects.toMatchObject({ code: "UNAUTHENTICATED" });
    const locked = await authenticate(ctx, address, "gallery-pass-1", "2.2.2.9").catch((e) => e);
    expect(locked).toMatchObject({ code: "RATE_LIMITED", details: { retryAfterSeconds: 900 } });
    const stored = await tdb.db.collection(names.rateLimits).find({}).toArray();
    expect(JSON.stringify(stored)).not.toContain(address); // keys hold a hash, never the address
    clock = new Date(clock.getTime() + LIMITS.loginPerEmail.windowMs + 1000);
    expect((await authenticate(ctx, address, "gallery-pass-1", "2.2.2.9")).email).toBe(address);
  });

  it("refuses a disabled account with the same generic error", async () => {
    const address = email();
    const user = await register(address);
    await tdb.db.collection(names.users).updateOne({ _id: user._id }, { $set: { status: "disabled" } });
    await expect(authenticate(ctx, address, "gallery-pass-1", "3.3.3.3")).rejects.toMatchObject({ code: "UNAUTHENTICATED" });
  });
});

describe("sessions", () => {
  it("persist, expire and end on sign-out; only the token hash is stored", async () => {
    const user = await register();
    const { token, expiresAt } = await createSession(ctx, user._id, false);
    expect(expiresAt.getTime() - clock.getTime()).toBe(12 * 3600_000);
    expect((await sessionUser(ctx, token))?._id).toEqual(user._id);
    expect(await tdb.db.collection(names.sessions).findOne({ _id: token as never })).toBeNull();
    expect(await tdb.db.collection(names.sessions).findOne({ _id: hashToken(token) as never })).not.toBeNull();

    const later = clock;
    clock = new Date(expiresAt.getTime() + 1);
    expect(await sessionUser(ctx, token)).toBeNull(); // expired (and removed)
    clock = later;

    const second = await createSession(ctx, user._id, true);
    expect(second.expiresAt.getTime() - clock.getTime()).toBe(30 * 24 * 3600_000);
    await deleteSession(ctx, second.token);
    expect(await sessionUser(ctx, second.token)).toBeNull();
  });

  it("stop working when the account is disabled; unknown tokens resolve to nobody", async () => {
    const user = await register();
    const { token } = await createSession(ctx, user._id, true);
    await tdb.db.collection(names.users).updateOne({ _id: user._id }, { $set: { status: "disabled" } });
    expect(await sessionUser(ctx, token)).toBeNull();
    expect(await sessionUser(ctx, "not-a-real-token")).toBeNull();
  });
});

describe("password reset and email verification", () => {
  const sent: { to: string; text: string }[] = [];
  const mailer: Mailer = { send: async (m) => void sent.push(m) };

  it("does nothing and says so when email delivery is not configured", async () => {
    const address = email();
    await register(address);
    expect(await requestPasswordReset(ctx, address, "4.4.4.4", null, (t) => t)).toBe("unavailable");
  });

  it("answers the same for unknown emails (no enumeration) and sends nothing", async () => {
    sent.length = 0;
    expect(await requestPasswordReset(ctx, email(), "4.4.4.5", mailer, (t) => t)).toBe("sent");
    expect(sent).toEqual([]);
  });

  it("resets once with the emailed token, signs out every session and keeps the old passcode invalid", async () => {
    sent.length = 0;
    const address = email();
    const user = await register(address);
    const { token: session } = await createSession(ctx, user._id, true);
    expect(await requestPasswordReset(ctx, address, "4.4.4.6", mailer, (t) => `https://halden.test/reset-passcode?token=${t}`)).toBe("sent");
    const token = decodeURIComponent(sent[0].text.match(/token=([\w%-]+)/)![1]);
    expect(sent[0].to).toBe(address);

    expect(await resetPassword(ctx, token, "brand-new-pass-2")).toBe(true);
    expect(await resetPassword(ctx, token, "another-pass-3")).toBe(false); // single use
    expect(await sessionUser(ctx, session)).toBeNull(); // signed out everywhere
    await expect(authenticate(ctx, address, "gallery-pass-1", "4.4.4.7")).rejects.toMatchObject({ code: "UNAUTHENTICATED" });
    expect((await authenticate(ctx, address, "brand-new-pass-2", "4.4.4.7")).email).toBe(address);
  });

  it("rejects expired, wrong-purpose and unknown tokens", async () => {
    const user = await register();
    const reset = await createAuthToken(ctx, user._id, "password_reset");
    expect(await consumeAuthToken(ctx, reset, "email_verification")).toBeNull();
    clock = new Date(clock.getTime() + 61 * 60_000);
    expect(await resetPassword(ctx, reset, "brand-new-pass-2")).toBe(false);
    expect(await resetPassword(ctx, "x".repeat(43), "brand-new-pass-2")).toBe(false);
  });

  it("verifies an email address with its single-use token", async () => {
    const user = await register();
    const token = await createAuthToken(ctx, user._id, "email_verification");
    expect(await verifyEmail(ctx, token)).toBe(true);
    expect(await verifyEmail(ctx, token)).toBe(false);
    expect((await tdb.db.collection<UserDoc>(names.users).findOne({ _id: user._id }))!.emailVerifiedAt).toEqual(clock);
  });
});

describe("changing the passcode", () => {
  it("requires the current passcode and signs out every other session", async () => {
    const address = email();
    const user = await register(address);
    const mine = await createSession(ctx, user._id, true);
    const other = await createSession(ctx, user._id, true);
    await expect(changePassword(ctx, user._id, "wrong-current-1", "brand-new-pass-2", mine.token)).rejects.toMatchObject({ code: "UNAUTHENTICATED" });
    await changePassword(ctx, user._id, "gallery-pass-1", "brand-new-pass-2", mine.token);
    expect(await sessionUser(ctx, mine.token)).not.toBeNull();
    expect(await sessionUser(ctx, other.token)).toBeNull();
    expect((await authenticate(ctx, address, "brand-new-pass-2", "5.5.5.5")).email).toBe(address);
  });
});

describe("setup guard", () => {
  it("refuses to write before the auth collections exist (no implicitly created, unindexed collections)", async () => {
    const missing = Object.fromEntries(KEYS.map((k) => [k, tdb.scoped(`missing${k}`)])) as AuthCollectionNames;
    await expect(assertAuthReady({ db: tdb.db, names: missing })).rejects.toMatchObject({ code: "SERVICE_UNAVAILABLE" });
    await expect(registerUser({ db: tdb.db, names: missing, passwordParams: FAST }, { name: "A B", email: email(), password: "gallery-pass-1" }, "6.6.6.6")).rejects.toMatchObject({ code: "SERVICE_UNAVAILABLE" });
    const all = (await tdb.db.listCollections({}, { nameOnly: true }).toArray()).map((c) => c.name);
    expect(all.filter((c) => c.includes("missing"))).toEqual([]);
  });
});
