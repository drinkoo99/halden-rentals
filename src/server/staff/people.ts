import { ObjectId, type ClientSession, type Db, type TransactionOptions } from "mongodb";
import { recordAudit, type AuditActor, type AuditContext } from "../audit/audit";
import { AUTH_COLLECTIONS, type AuthCollectionNames } from "../auth/collections";
import type { Role, UserStatus } from "../auth/schemas";
import { attempts, deleteUserSessions, recordAttempt, type UserDoc } from "../auth/store";
import { BOOKING_COLLECTIONS, type BookingCollectionNames } from "../bookings/collections";
import type { BookingDoc } from "../bookings/store";
import { AppError } from "../http/errors";

/**
 * Customer and team management (M8). Server-side rules:
 * - staff may suspend/reactivate CUSTOMER accounts; only admins may touch staff or admin accounts;
 * - only admins change roles; nobody changes their own role or suspends themselves;
 * - the last active admin can be neither demoted nor suspended — checked inside a transaction that first
 *   writes a fixed "admin roster" lock document, so two admins acting at once cannot remove each other;
 * - suspending ends every session of the account at once; role changes apply on the next request
 *   (the role is read from the database on every request);
 * - every change is written to the audit log with its reason. Nothing here deletes an account: bookings
 *   and audit records refer to it, so deactivation (suspension) is the supported alternative.
 */

export type PeopleContext = AuditContext & {
  db: Pick<Db, "collection" | "listCollections">;
  startSession: () => ClientSession;
  authNames?: AuthCollectionNames;
  bookingNames?: BookingCollectionNames;
  now?: () => Date;
};

const TX: TransactionOptions = { readConcern: { level: "snapshot" }, writeConcern: { w: "majority" }, readPreference: "primary" };
/** Fixed document in `bookingLocks` that serialises every change to the set of active admins. */
export const ADMIN_ROSTER_LOCK = new ObjectId("000000000000000000000001");

const users = (ctx: PeopleContext) => ctx.db.collection<UserDoc>((ctx.authNames ?? AUTH_COLLECTIONS).users);
const bookings = (ctx: PeopleContext) => ctx.db.collection<BookingDoc>((ctx.bookingNames ?? BOOKING_COLLECTIONS).bookings);
const locks = (ctx: PeopleContext) => ctx.db.collection<{ _id: ObjectId; seq: number; at: Date }>((ctx.bookingNames ?? BOOKING_COLLECTIONS).bookingLocks);
const now = (ctx: PeopleContext) => (ctx.now ? ctx.now() : new Date());
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** What staff see of an account: never the password hash or any token. */
export type StaffUserView = { id: string; name: string; email: string; role: Role; status: UserStatus; emailVerified: boolean; createdAt: string };
export const toStaffUserView = (u: UserDoc): StaffUserView => ({
  id: u._id.toHexString(),
  name: u.name,
  email: u.email,
  role: u.role,
  status: u.status,
  emailVerified: u.emailVerifiedAt !== null,
  createdAt: u.createdAt.toISOString(),
});

export type BookingCounts = { upcoming: number; active: number; completed: number; cancelled: number; total: number };
const emptyCounts = (): BookingCounts => ({ upcoming: 0, active: 0, completed: 0, cancelled: 0, total: 0 });

async function countsFor(ctx: PeopleContext, ids: ObjectId[]): Promise<Map<string, BookingCounts>> {
  const out = new Map<string, BookingCounts>();
  if (!ids.length) return out;
  const rows = await bookings(ctx)
    .aggregate<{ _id: { c: ObjectId; s: string }; n: number }>([{ $match: { customerId: { $in: ids } } }, { $group: { _id: { c: "$customerId", s: "$status" }, n: { $sum: 1 } } }])
    .toArray();
  for (const r of rows) {
    const key = r._id.c.toHexString();
    const c = out.get(key) ?? emptyCounts();
    c.total += r.n;
    if (r._id.s === "held" || r._id.s === "confirmed") c.upcoming += r.n;
    else if (r._id.s === "checked_out") c.active += r.n;
    else if (r._id.s === "completed") c.completed += r.n;
    else c.cancelled += r.n; // cancelled and expired
    out.set(key, c);
  }
  return out;
}

export async function listPeople(ctx: PeopleContext, q: { roles: Role[]; status?: UserStatus; q?: string }): Promise<{ user: StaffUserView; counts: BookingCounts }[]> {
  const filter: Record<string, unknown> = { role: { $in: q.roles } };
  if (q.status) filter.status = q.status;
  if (q.q) {
    const rx = new RegExp(escape(q.q), "i");
    filter.$or = [{ name: rx }, { email: rx }];
  }
  const docs = await users(ctx).find(filter, { projection: { passwordHash: 0 } }).sort({ createdAt: -1 }).limit(500).toArray();
  const counts = await countsFor(ctx, docs.map((d) => d._id));
  return docs.map((d) => ({ user: toStaffUserView(d), counts: counts.get(d._id.toHexString()) ?? emptyCounts() }));
}

export async function getPerson(ctx: PeopleContext, id: ObjectId): Promise<{ user: StaffUserView; bookings: BookingDoc[] }> {
  const user = await users(ctx).findOne({ _id: id }, { projection: { passwordHash: 0 } });
  if (!user) throw new AppError("NOT_FOUND", "No such account.");
  const list = await bookings(ctx).find({ customerId: id }).sort({ pickupAt: -1 }).limit(500).toArray();
  return { user: toStaffUserView(user), bookings: list };
}

async function guardRate(ctx: PeopleContext, actor: AuditActor) {
  const auth = { db: ctx.db, names: ctx.authNames, now: ctx.now };
  const key = `people:actor:${actor.id.toHexString()}`;
  if ((await attempts(auth, key, 3600_000)) >= 60) throw new AppError("RATE_LIMITED", "Too many account changes in the last hour. Try again later.");
  await recordAttempt(auth, key, 3600_000);
}

async function inTransaction<T>(ctx: PeopleContext, fn: (session: ClientSession) => Promise<T>): Promise<T> {
  const session = ctx.startSession();
  try {
    return await session.withTransaction(fn, TX);
  } finally {
    await session.endSession();
  }
}

async function lockRoster(ctx: PeopleContext, session: ClientSession) {
  try {
    await locks(ctx).updateOne({ _id: ADMIN_ROSTER_LOCK }, { $inc: { seq: 1 }, $set: { at: now(ctx) } }, { upsert: true, session });
  } catch (err) {
    const e = err as { code?: number; addErrorLabel?: (l: string) => void };
    if (e.code === 11000 && e.addErrorLabel) e.addErrorLabel("TransientTransactionError");
    throw err;
  }
}

async function otherActiveAdmins(ctx: PeopleContext, except: ObjectId, session: ClientSession): Promise<number> {
  return users(ctx).countDocuments({ role: "admin", status: "active", _id: { $ne: except } }, { session });
}

/** Suspend or reactivate an account (named actions only). */
export async function setAccountStatus(ctx: PeopleContext, actor: AuditActor, targetId: ObjectId, action: "suspend" | "reactivate", reason?: string): Promise<StaffUserView> {
  if (targetId.equals(actor.id)) throw new AppError("FORBIDDEN", "You cannot change the status of your own account.");
  await guardRate(ctx, actor);
  const to: UserStatus = action === "suspend" ? "disabled" : "active";
  const updated = await inTransaction(ctx, async (session) => {
    await lockRoster(ctx, session);
    const target = await users(ctx).findOne({ _id: targetId }, { session });
    if (!target) throw new AppError("NOT_FOUND", "No such account.");
    if (target.role !== "customer" && actor.role !== "admin") throw new AppError("FORBIDDEN", "Only an admin can change the status of a staff or admin account.");
    if (target.status === to) throw new AppError("CONFLICT", `This account is already ${to === "active" ? "active" : "suspended"}.`);
    if (to === "disabled" && target.role === "admin" && (await otherActiveAdmins(ctx, target._id, session)) === 0)
      throw new AppError("CONFLICT", "This is the last active admin; it cannot be suspended.", { details: { reason: "last_admin" } });
    const res = await users(ctx).findOneAndUpdate({ _id: targetId, status: target.status }, { $set: { status: to, updatedAt: now(ctx) } }, { returnDocument: "after", session });
    if (!res) throw new AppError("CONFLICT", "This account was changed meanwhile; reload and try again.");
    await recordAudit(ctx, { actor, action: action === "suspend" ? "account_suspended" : "account_reactivated", entity: { type: "user", id: target._id.toHexString(), label: target.email }, before: { status: target.status }, after: { status: to }, reason }, session);
    return res;
  });
  if (to === "disabled") await deleteUserSessions({ db: ctx.db, names: ctx.authNames }, targetId); // signed out everywhere, now
  return toStaffUserView(updated);
}

/** Admins only: change an account's role. Public registration can only ever create customers. */
export async function setRole(ctx: PeopleContext, actor: AuditActor, targetId: ObjectId, role: Role, reason?: string): Promise<StaffUserView> {
  if (actor.role !== "admin") throw new AppError("FORBIDDEN", "Only an admin can change roles.");
  if (targetId.equals(actor.id)) throw new AppError("FORBIDDEN", "You cannot change your own role.");
  await guardRate(ctx, actor);
  const updated = await inTransaction(ctx, async (session) => {
    await lockRoster(ctx, session);
    const target = await users(ctx).findOne({ _id: targetId }, { session });
    if (!target) throw new AppError("NOT_FOUND", "No such account.");
    if (target.role === role) throw new AppError("CONFLICT", `This account already has the ${role} role.`);
    if (target.status !== "active") throw new AppError("CONFLICT", "Reactivate the account before changing its role.");
    if (target.role === "admin" && (await otherActiveAdmins(ctx, target._id, session)) === 0)
      throw new AppError("CONFLICT", "This is the last active admin; promote another admin first.", { details: { reason: "last_admin" } });
    const res = await users(ctx).findOneAndUpdate({ _id: targetId, role: target.role }, { $set: { role, updatedAt: now(ctx) } }, { returnDocument: "after", session });
    if (!res) throw new AppError("CONFLICT", "This account was changed meanwhile; reload and try again.");
    await recordAudit(ctx, { actor, action: "role_changed", entity: { type: "user", id: target._id.toHexString(), label: target.email }, before: { role: target.role }, after: { role }, reason }, session);
    return res;
  });
  return toStaffUserView(updated);
}
