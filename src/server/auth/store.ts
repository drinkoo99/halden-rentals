import { ObjectId, type Db } from "mongodb";
import { AppError } from "../http/errors";
import { AUTH_COLLECTIONS, type AuthCollectionNames } from "./collections";
import { dummyPasswordHash, hashPassword, hashToken, newToken, PASSWORD_PARAMS, verifyPassword, type ScryptParams } from "./crypto";
import type { PublicUser, RegisterInput, Role, UserStatus } from "./schemas";

/**
 * Account, session, token and rate-limit persistence (M5). No Next.js imports: the server actions and
 * session helpers wrap it, and the integration tests run it against run-scoped collections.
 *
 * Rules enforced here (not in the UI):
 * - registration always creates a `customer`; there is no code path that accepts a role from input;
 * - a disabled account cannot sign in and its sessions stop working;
 * - failed sign-ins are rate-limited per email and per IP address; error messages never say whether
 *   the email exists or the passcode was wrong;
 * - resetting a passcode signs the account out everywhere.
 */

export type UserDoc = {
  _id: ObjectId;
  email: string;
  name: string;
  passwordHash: string;
  role: Role;
  status: UserStatus;
  emailVerifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};
type SessionDoc = { _id: string; userId: ObjectId; createdAt: Date; expiresAt: Date };
export type TokenPurpose = "password_reset" | "email_verification";
type TokenDoc = { _id: string; userId: ObjectId; purpose: TokenPurpose; createdAt: Date; expiresAt: Date };
type RateDoc = { key: string; at: Date; expiresAt: Date };

export type AuthContext = {
  db: Pick<Db, "collection" | "listCollections">;
  names?: AuthCollectionNames;
  now?: () => Date;
  /** Only tests lower the scrypt cost. */
  passwordParams?: ScryptParams;
};

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
export const SESSION_TTL = { remember: 30 * 24 * HOUR, browser: 12 * HOUR };
export const TOKEN_TTL: Record<TokenPurpose, number> = { password_reset: HOUR, email_verification: 48 * HOUR };
export const LIMITS = {
  loginPerEmail: { max: 5, windowMs: 15 * MINUTE },
  loginPerIp: { max: 50, windowMs: 15 * MINUTE },
  registerPerIp: { max: 10, windowMs: HOUR },
  resetPerEmail: { max: 3, windowMs: HOUR },
  resetPerIp: { max: 10, windowMs: HOUR },
};

const names = (ctx: AuthContext) => ctx.names ?? AUTH_COLLECTIONS;
const now = (ctx: AuthContext) => (ctx.now ? ctx.now() : new Date());
const users = (ctx: AuthContext) => ctx.db.collection<UserDoc>(names(ctx).users);
const sessions = (ctx: AuthContext) => ctx.db.collection<SessionDoc>(names(ctx).sessions);
const tokens = (ctx: AuthContext) => ctx.db.collection<TokenDoc>(names(ctx).authTokens);
const rates = (ctx: AuthContext) => ctx.db.collection<RateDoc>(names(ctx).rateLimits);

export function toPublicUser(u: UserDoc): PublicUser {
  return { id: u._id.toHexString(), name: u.name, email: u.email, role: u.role, emailVerified: u.emailVerifiedAt !== null };
}

// ---- setup guard --------------------------------------------------------------------------------
const ready = new WeakMap<object, Map<string, Promise<void>>>();
/**
 * The auth collections must exist (with validators and indexes) before anything is written: MongoDB would
 * otherwise create them implicitly, without the unique email index. Checked once per database handle.
 */
export function assertAuthReady(ctx: AuthContext): Promise<void> {
  const wanted = Object.values(names(ctx));
  const key = wanted.join(","); // per database handle AND per set of collection names
  let perDb = ready.get(ctx.db as object);
  if (!perDb) ready.set(ctx.db as object, (perDb = new Map()));
  let check = perDb.get(key);
  if (!check) {
    check = (async () => {
      const existing = new Set((await ctx.db.listCollections({}, { nameOnly: true }).toArray()).map((c) => c.name));
      const missing = wanted.filter((n) => !existing.has(n));
      if (missing.length) throw new AppError("SERVICE_UNAVAILABLE", `Authentication collections are not set up (${missing.join(", ")}); run db:setup`);
    })();
    const cache = perDb;
    check.catch(() => cache.delete(key)); // retry after a failure
    perDb.set(key, check);
  }
  return check;
}

// ---- rate limiting ------------------------------------------------------------------------------
export async function attempts(ctx: AuthContext, key: string, windowMs: number): Promise<number> {
  return rates(ctx).countDocuments({ key, at: { $gt: new Date(now(ctx).getTime() - windowMs) } });
}
export async function recordAttempt(ctx: AuthContext, key: string, windowMs: number): Promise<void> {
  const at = now(ctx);
  await rates(ctx).insertOne({ key, at, expiresAt: new Date(at.getTime() + windowMs) });
}
/** Rate-limit keys never contain the raw email address. */
const emailKey = (scope: string, email: string) => `${scope}:email:${hashToken(email)}`;
const ipKey = (scope: string, ip: string) => `${scope}:ip:${ip.slice(0, 64)}`;

function rateLimited(retryAfterMs: number): AppError {
  const minutes = Math.max(1, Math.ceil(retryAfterMs / MINUTE));
  return new AppError("RATE_LIMITED", `Too many attempts. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`, {
    details: { retryAfterSeconds: Math.ceil(retryAfterMs / 1000) },
  });
}

// ---- accounts -----------------------------------------------------------------------------------
export async function registerUser(ctx: AuthContext, input: RegisterInput, ip: string): Promise<UserDoc> {
  await assertAuthReady(ctx);
  const limit = LIMITS.registerPerIp;
  if ((await attempts(ctx, ipKey("register", ip), limit.windowMs)) >= limit.max) throw rateLimited(limit.windowMs);
  await recordAttempt(ctx, ipKey("register", ip), limit.windowMs);

  const at = now(ctx);
  const doc: UserDoc = {
    _id: new ObjectId(),
    email: input.email,
    name: input.name,
    passwordHash: await hashPassword(input.password, ctx.passwordParams ?? PASSWORD_PARAMS),
    role: "customer", // never taken from input: staff/admin roles are granted by an operator
    status: "active",
    emailVerifiedAt: null,
    createdAt: at,
    updatedAt: at,
  };
  try {
    await users(ctx).insertOne(doc);
  } catch (err) {
    if ((err as { code?: number }).code === 11000)
      throw new AppError("CONFLICT", "An account with this email already exists. Sign in, or reset your passcode.");
    throw err;
  }
  return doc;
}

/** Verify credentials. Every failure is the same UNAUTHENTICATED error (no account enumeration). */
export async function authenticate(ctx: AuthContext, email: string, password: string, ip: string): Promise<UserDoc> {
  await assertAuthReady(ctx);
  const { loginPerEmail, loginPerIp } = LIMITS;
  if ((await attempts(ctx, emailKey("login", email), loginPerEmail.windowMs)) >= loginPerEmail.max) throw rateLimited(loginPerEmail.windowMs);
  if ((await attempts(ctx, ipKey("login", ip), loginPerIp.windowMs)) >= loginPerIp.max) throw rateLimited(loginPerIp.windowMs);

  const user = await users(ctx).findOne({ email });
  // compare against a dummy hash when the account does not exist, so both cases take the same time
  const ok = await verifyPassword(password, user?.passwordHash ?? (await dummyPasswordHash(ctx.passwordParams ?? PASSWORD_PARAMS)));
  if (!user || !ok || user.status !== "active") {
    await recordAttempt(ctx, emailKey("login", email), loginPerEmail.windowMs);
    await recordAttempt(ctx, ipKey("login", ip), loginPerIp.windowMs);
    throw new AppError("UNAUTHENTICATED", "The email or passcode is incorrect.");
  }
  await rates(ctx).deleteMany({ key: emailKey("login", email) }); // a successful sign-in clears that email's failures
  return user;
}

export async function updateName(ctx: AuthContext, userId: ObjectId, name: string): Promise<void> {
  await users(ctx).updateOne({ _id: userId }, { $set: { name, updatedAt: now(ctx) } });
}

// ---- sessions -----------------------------------------------------------------------------------
export async function createSession(ctx: AuthContext, userId: ObjectId, remember: boolean): Promise<{ token: string; expiresAt: Date }> {
  const token = newToken();
  const createdAt = now(ctx);
  const expiresAt = new Date(createdAt.getTime() + (remember ? SESSION_TTL.remember : SESSION_TTL.browser));
  await sessions(ctx).insertOne({ _id: hashToken(token), userId, createdAt, expiresAt });
  return { token, expiresAt };
}

/** The signed-in user for a session token, or null (unknown, expired, or the account is disabled). */
export async function sessionUser(ctx: AuthContext, token: string): Promise<UserDoc | null> {
  if (!token || token.length > 100) return null;
  const session = await sessions(ctx).findOne({ _id: hashToken(token) });
  if (!session) return null;
  if (session.expiresAt <= now(ctx)) {
    await sessions(ctx).deleteOne({ _id: session._id });
    return null;
  }
  const user = await users(ctx).findOne({ _id: session.userId });
  return user && user.status === "active" ? user : null;
}

export async function deleteSession(ctx: AuthContext, token: string): Promise<void> {
  if (token) await sessions(ctx).deleteOne({ _id: hashToken(token) });
}

export async function deleteUserSessions(ctx: AuthContext, userId: ObjectId): Promise<void> {
  await sessions(ctx).deleteMany({ userId });
}

// ---- single-use tokens (password reset, email verification) ---------------------------------------
export async function createAuthToken(ctx: AuthContext, userId: ObjectId, purpose: TokenPurpose): Promise<string> {
  await tokens(ctx).deleteMany({ userId, purpose }); // only the newest link works
  const token = newToken();
  const createdAt = now(ctx);
  await tokens(ctx).insertOne({ _id: hashToken(token), userId, purpose, createdAt, expiresAt: new Date(createdAt.getTime() + TOKEN_TTL[purpose]) });
  return token;
}

/** Atomically use a token: returns its user id once, or null if it is unknown, expired or for another purpose. */
export async function consumeAuthToken(ctx: AuthContext, token: string, purpose: TokenPurpose): Promise<ObjectId | null> {
  if (!token || token.length > 100) return null;
  const doc = await tokens(ctx).findOneAndDelete({ _id: hashToken(token), purpose, expiresAt: { $gt: now(ctx) } });
  return doc?.userId ?? null;
}

export type Mailer = { send(message: { to: string; subject: string; text: string }): Promise<void> };

/**
 * Start a password reset. Without a configured mailer nothing is created and the caller says so plainly.
 * With one, the answer is the same whether or not the account exists ("sent"), so it cannot be used to
 * probe for accounts.
 */
export async function requestPasswordReset(
  ctx: AuthContext,
  email: string,
  ip: string,
  mailer: Mailer | null,
  resetUrl: (token: string) => string,
): Promise<"sent" | "unavailable"> {
  if (!mailer) return "unavailable";
  await assertAuthReady(ctx);
  const { resetPerEmail, resetPerIp } = LIMITS;
  if ((await attempts(ctx, ipKey("reset", ip), resetPerIp.windowMs)) >= resetPerIp.max) throw rateLimited(resetPerIp.windowMs);
  await recordAttempt(ctx, ipKey("reset", ip), resetPerIp.windowMs);
  if ((await attempts(ctx, emailKey("reset", email), resetPerEmail.windowMs)) >= resetPerEmail.max) return "sent";
  await recordAttempt(ctx, emailKey("reset", email), resetPerEmail.windowMs);

  const user = await users(ctx).findOne({ email, status: "active" });
  if (!user) return "sent";
  const token = await createAuthToken(ctx, user._id, "password_reset");
  await mailer.send({
    to: user.email,
    subject: "Reset your HALDEN passcode",
    text: `Use this link within one hour to choose a new passcode:\n\n${resetUrl(token)}\n\nIf you did not ask for this, ignore this email; your passcode stays the same.`,
  });
  return "sent";
}

/** Set a new passcode with a reset token. Signs the account out everywhere. */
export async function resetPassword(ctx: AuthContext, token: string, password: string): Promise<boolean> {
  await assertAuthReady(ctx);
  const userId = await consumeAuthToken(ctx, token, "password_reset");
  if (!userId) return false;
  const passwordHash = await hashPassword(password, ctx.passwordParams ?? PASSWORD_PARAMS);
  const res = await users(ctx).updateOne({ _id: userId, status: "active" }, { $set: { passwordHash, updatedAt: now(ctx) } });
  await deleteUserSessions(ctx, userId);
  return res.matchedCount === 1;
}

export async function verifyEmail(ctx: AuthContext, token: string): Promise<boolean> {
  await assertAuthReady(ctx);
  const userId = await consumeAuthToken(ctx, token, "email_verification");
  if (!userId) return false;
  const at = now(ctx);
  const res = await users(ctx).updateOne({ _id: userId, emailVerifiedAt: null }, { $set: { emailVerifiedAt: at, updatedAt: at } });
  return res.matchedCount === 1 || (await users(ctx).countDocuments({ _id: userId, emailVerifiedAt: { $ne: null } })) === 1;
}

/** Send the verification email after registration (only when a mailer is configured). */
export async function sendVerificationEmail(ctx: AuthContext, user: UserDoc, mailer: Mailer, verifyUrl: (token: string) => string): Promise<void> {
  const token = await createAuthToken(ctx, user._id, "email_verification");
  await mailer.send({
    to: user.email,
    subject: "Confirm your HALDEN email address",
    text: `Welcome to HALDEN, ${user.name}.\n\nConfirm your email address within 48 hours:\n\n${verifyUrl(token)}`,
  });
}

/**
 * Change the passcode of a signed-in account. Requires the current passcode, then signs out every
 * other session (the session making the change stays valid).
 */
export async function changePassword(ctx: AuthContext, userId: ObjectId, currentPassword: string, newPassword: string, keepToken: string): Promise<void> {
  await assertAuthReady(ctx);
  const limit = LIMITS.loginPerEmail; // same budget as sign-in, so a stolen session cannot be used to guess the passcode
  const key = `change:user:${userId.toHexString()}`;
  if ((await attempts(ctx, key, limit.windowMs)) >= limit.max) throw rateLimited(limit.windowMs);
  const user = await users(ctx).findOne({ _id: userId, status: "active" });
  if (!user || !(await verifyPassword(currentPassword, user.passwordHash))) {
    await recordAttempt(ctx, key, limit.windowMs);
    throw new AppError("UNAUTHENTICATED", "Your current passcode is incorrect.");
  }
  const passwordHash = await hashPassword(newPassword, ctx.passwordParams ?? PASSWORD_PARAMS);
  await users(ctx).updateOne({ _id: userId }, { $set: { passwordHash, updatedAt: now(ctx) } });
  await sessions(ctx).deleteMany({ userId, _id: { $ne: hashToken(keepToken) } });
}
