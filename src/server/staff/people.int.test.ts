import { ObjectId } from "mongodb";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { AUDIT_COLLECTION_SPECS, listAudit } from "../audit/audit";
import { AUTH_COLLECTION_SPECS } from "../auth/collections";
import { authenticate, createSession, registerUser, sessionUser, type UserDoc } from "../auth/store";
import { BOOKING_COLLECTION_SPECS } from "../bookings/collections";
import { ensureCollections } from "../db/collections";
import { isTestDatabase } from "../db/targets";
import { openIntegrationDatabase, type IntegrationDatabase } from "../testing/integrationDb";
import { getPerson, listPeople, setAccountStatus, setRole, type PeopleContext } from "./people";

/**
 * Customer/team management against halden_test: run-scoped users, sessions, rate limits, bookings, locks and
 * audit collections with the real validators and indexes, real transactions. afterAll drops them.
 */
const FAST = { N: 2 ** 10, r: 8, p: 1 };
let tdb: IntegrationDatabase;
let ctx: PeopleContext;
let auth: { db: IntegrationDatabase["db"]; names: Record<"users" | "sessions" | "authTokens" | "rateLimits", string>; passwordParams: typeof FAST };
let n = 0;

async function account(role: "customer" | "staff" | "admin", name = "Clara Bergmann") {
  const user = await registerUser(auth, { name, email: `person${++n}@example.com`, password: "gallery-pass-1" }, `10.1.0.${n}`);
  if (role !== "customer") await tdb.db.collection<UserDoc>(auth.names.users).updateOne({ _id: user._id }, { $set: { role } });
  return { ...user, role };
}
const actorOf = (u: { _id: ObjectId; role: "customer" | "staff" | "admin"; name: string }) => ({ id: u._id, role: u.role, name: u.name });

beforeAll(async () => {
  tdb = await openIntegrationDatabase();
  expect(isTestDatabase(tdb.db.databaseName)).toBe(true);
  const authNames = { users: tdb.scoped("pusers"), sessions: tdb.scoped("psessions"), authTokens: tdb.scoped("pauthTokens"), rateLimits: tdb.scoped("prateLimits") };
  const bookingNames = { bookings: tdb.scoped("pbookings"), bookingLocks: tdb.scoped("pbookingLocks") };
  const auditNames = { auditEvents: tdb.scoped("pauditEvents") };
  const scoped: Record<string, string> = { ...authNames, ...bookingNames, ...auditNames };
  const specs = [...AUTH_COLLECTION_SPECS, ...BOOKING_COLLECTION_SPECS, ...AUDIT_COLLECTION_SPECS].map((s) => ({ ...s, name: scoped[s.name] }));
  expect((await ensureCollections(tdb.db, specs, { apply: true })).conflicts).toEqual([]);
  auth = { db: tdb.db, names: authNames, passwordParams: FAST };
  ctx = { db: tdb.db, startSession: tdb.startSession, authNames, bookingNames, auditNames };
});
afterAll(async () => {
  if (!tdb) return;
  try {
    await tdb.cleanup();
  } finally {
    await tdb.close();
  }
});

describe("customer management", () => {
  it("lists and searches customers without exposing password hashes", async () => {
    const c = await account("customer", "Henrik Lindqvist");
    await account("staff", "Staff Person");
    const found = await listPeople(ctx, { roles: ["customer"], q: "lindqvist" });
    expect(found.map((p) => p.user.email)).toEqual([c.email]);
    expect(JSON.stringify(found)).not.toMatch(/scrypt|passwordHash/);
    expect((await listPeople(ctx, { roles: ["customer"], q: "staff person" })).length).toBe(0); // staff are not customers
    expect((await listPeople(ctx, { roles: ["customer"], q: ".*" })).length).toBe(0); // the search is literal, not a regex
    const { user, bookings } = await getPerson(ctx, c._id);
    expect(user).toMatchObject({ email: c.email, role: "customer", status: "active" });
    expect(user).not.toHaveProperty("passwordHash");
    expect(bookings).toEqual([]);
  });

  it("staff suspend a customer: every session ends and sign-in stops; reactivation restores access; both audited", async () => {
    const staff = await account("staff");
    const c = await account("customer");
    const { token } = await createSession(auth, c._id, true);
    const suspended = await setAccountStatus(ctx, actorOf(staff), c._id, "suspend", "Chargeback investigation");
    expect(suspended.status).toBe("disabled");
    expect(await sessionUser(auth, token)).toBeNull();
    await expect(authenticate(auth, c.email, "gallery-pass-1", "10.9.9.9")).rejects.toMatchObject({ code: "UNAUTHENTICATED" });
    await expect(setAccountStatus(ctx, actorOf(staff), c._id, "suspend")).rejects.toMatchObject({ code: "CONFLICT" });
    await setAccountStatus(ctx, actorOf(staff), c._id, "reactivate");
    expect((await authenticate(auth, c.email, "gallery-pass-1", "10.9.9.8")).email).toBe(c.email);
    const log = await listAudit(ctx, { entity: "user", id: c._id.toHexString() });
    expect(log.map((e) => [e.action, e.actor.id.toHexString(), e.reason ?? null])).toEqual([
      ["account_reactivated", staff._id.toHexString(), null],
      ["account_suspended", staff._id.toHexString(), "Chargeback investigation"],
    ]);
    expect(JSON.stringify(log)).not.toMatch(/scrypt|gallery-pass/);
  });

  it("staff cannot suspend staff or admins, and nobody can suspend themselves", async () => {
    const staff = await account("staff");
    const other = await account("staff");
    await expect(setAccountStatus(ctx, actorOf(staff), other._id, "suspend")).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(setAccountStatus(ctx, actorOf(staff), staff._id, "suspend")).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(setAccountStatus(ctx, actorOf(staff), new ObjectId(), "suspend")).rejects.toMatchObject({ code: "NOT_FOUND" });
  });
});

describe("team and roles", () => {
  it("only admins change roles; nobody changes their own role", async () => {
    const admin = await account("admin");
    const staff = await account("staff");
    const c = await account("customer");
    await expect(setRole(ctx, actorOf(staff), c._id, "staff")).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(setRole(ctx, actorOf(staff), staff._id, "admin")).rejects.toMatchObject({ code: "FORBIDDEN" }); // no self-escalation
    await expect(setRole(ctx, actorOf(admin), admin._id, "customer")).rejects.toMatchObject({ code: "FORBIDDEN" });
    expect((await setRole(ctx, actorOf(admin), c._id, "staff", "New hire")).role).toBe("staff");
    const [event] = await listAudit(ctx, { entity: "user", id: c._id.toHexString() });
    expect(event).toMatchObject({ action: "role_changed", before: { role: "customer" }, after: { role: "staff" }, reason: "New hire" });
  });

  it("protects the last active admin from demotion and suspension", async () => {
    // a fresh, isolated admin roster for this test
    const names = { users: tdb.scoped("lusers"), sessions: tdb.scoped("lsessions"), authTokens: tdb.scoped("lauthTokens"), rateLimits: tdb.scoped("lrateLimits") };
    const scoped: Record<string, string> = names;
    expect((await ensureCollections(tdb.db, AUTH_COLLECTION_SPECS.map((s) => ({ ...s, name: scoped[s.name] })), { apply: true })).conflicts).toEqual([]);
    const local = { ...ctx, authNames: names };
    const localAuth = { ...auth, names };
    const mk = async (role: "admin" | "staff") => {
      const u = await registerUser(localAuth, { name: "A Admin", email: `roster${++n}@example.com`, password: "gallery-pass-1" }, `10.2.0.${n}`);
      await tdb.db.collection<UserDoc>(names.users).updateOne({ _id: u._id }, { $set: { role } });
      return { ...u, role };
    };
    const a1 = await mk("admin");
    const a2 = await mk("admin");
    expect((await setRole(local, actorOf(a1), a2._id, "staff")).role).toBe("staff"); // a1 is now the only admin
    const promoted = await mk("staff");
    await expect(setAccountStatus(local, actorOf({ ...a2, role: "admin" }), a1._id, "suspend")).rejects.toMatchObject({ details: { reason: "last_admin" } });
    // a staff member can never demote anyone; a second admin can demote a1 only while another admin remains
    await setRole(local, actorOf(a1), promoted._id, "admin");
    expect((await setRole(local, actorOf({ ...promoted, role: "admin" }), a1._id, "staff")).role).toBe("staff");
    await expect(setRole(local, actorOf({ ...a1, role: "admin" }), promoted._id, "staff")).rejects.toMatchObject({ details: { reason: "last_admin" } });
  });

  it("two admins demoting each other at the same time cannot leave the system without an admin", async () => {
    const names = { users: tdb.scoped("rusers"), sessions: tdb.scoped("rsessions"), authTokens: tdb.scoped("rauthTokens"), rateLimits: tdb.scoped("rrateLimits") };
    const scoped: Record<string, string> = names;
    expect((await ensureCollections(tdb.db, AUTH_COLLECTION_SPECS.map((s) => ({ ...s, name: scoped[s.name] })), { apply: true })).conflicts).toEqual([]);
    const local = { ...ctx, authNames: names };
    const localAuth = { ...auth, names };
    const mk = async () => {
      const u = await registerUser(localAuth, { name: "Race Admin", email: `race${++n}@example.com`, password: "gallery-pass-1" }, `10.3.0.${n}`);
      await tdb.db.collection<UserDoc>(names.users).updateOne({ _id: u._id }, { $set: { role: "admin" } });
      return { ...u, role: "admin" as const };
    };
    const [x, y] = [await mk(), await mk()];
    const results = await Promise.allSettled([setRole(local, actorOf(x), y._id, "staff"), setRole(local, actorOf(y), x._id, "staff")]);
    expect(results.filter((r) => r.status === "fulfilled")).toHaveLength(1);
    expect(await tdb.db.collection(names.users).countDocuments({ role: "admin", status: "active" })).toBe(1);
  });
});

describe("audit log storage", () => {
  it("keeps entries newest first, scrubs secret fields, and its validator refuses malformed entries", async () => {
    const { recordAudit } = await import("../audit/audit");
    const actor = { id: new ObjectId(), role: "admin" as const, name: "Auditor" };
    await recordAudit(ctx, { actor, action: "fleet_status_changed", entity: { type: "fleet_unit", id: "u1", label: "FU-AAAAAA" }, before: { status: "available", passwordHash: "scrypt$leak" }, after: { status: "maintenance" } });
    const [latest] = await listAudit(ctx, { entity: "fleet_unit", id: "u1" });
    expect(latest).toMatchObject({ action: "fleet_status_changed", before: { status: "available" }, after: { status: "maintenance" } });
    expect(JSON.stringify(latest)).not.toContain("scrypt$leak");
    const events = tdb.db.collection(ctx.auditNames!.auditEvents);
    await expect(events.insertOne({ at: new Date(), actor: { ...actor }, action: "x", entity: { type: "payment_card", id: "1", label: "x" } })).rejects.toMatchObject({ code: 121 });
    await expect(events.insertOne({ at: new Date(), actor: { ...actor }, action: "x", entity: { type: "user", id: "1", label: "x" }, sessionToken: "abc" })).rejects.toMatchObject({ code: 121 });
  });
});
