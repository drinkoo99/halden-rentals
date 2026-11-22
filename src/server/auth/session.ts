import "server-only";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import { getDb, isDatabaseConfigured } from "../db/client";
import { serverEnv } from "../env";
import { AppError } from "../http/errors";
import { SESSION_COOKIE, sessionCookieOptions } from "./cookie";
import { createMailer } from "./mailer";
import type { PublicUser, Role } from "./schemas";
import { sessionUser, toPublicUser, type AuthContext, type UserDoc } from "./store";

/**
 * Request-level authentication for Server Components, Server Actions and Route Handlers.
 * The session token lives only in the HttpOnly cookie; every check looks it up in the database, so
 * signing out, a passcode reset or disabling an account takes effect immediately.
 */

export async function authContext(): Promise<AuthContext> {
  if (!isDatabaseConfigured()) throw new AppError("SERVICE_UNAVAILABLE", "MONGODB_URI is not set");
  return { db: await getDb() };
}

export const mailer = () => createMailer(serverEnv());

/** The signed-in user's account document, or null. Cached for the duration of one request. */
export const currentUserDoc = cache(async (): Promise<UserDoc | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token || !isDatabaseConfigured()) return null;
  return sessionUser(await authContext(), token);
});

export async function currentUser(): Promise<PublicUser | null> {
  const doc = await currentUserDoc();
  return doc ? toPublicUser(doc) : null;
}

/** Only same-site paths are accepted as a return target (no open redirects). */
export function safeNext(next: string | null | undefined, fallback = "/account"): string {
  return next && next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/\\") ? next : fallback;
}

/** Server-side gate: signed-in user or a redirect to sign-in that returns to `next`. */
export async function requireUser(next: string): Promise<PublicUser> {
  const user = await currentUser();
  if (!user) redirect(`/sign-in?next=${encodeURIComponent(safeNext(next))}`);
  return user;
}

/** Server-side gate for staff/admin areas. Signed-out → sign in; wrong role → 404 (the area is not revealed). */
export async function requireRole(roles: readonly Role[], next: string): Promise<PublicUser> {
  const user = await requireUser(next);
  if (!roles.includes(user.role)) notFound();
  return user;
}

export async function setSessionCookie(token: string, expiresAt: Date, remember: boolean): Promise<void> {
  (await cookies()).set(SESSION_COOKIE, token, sessionCookieOptions(remember ? expiresAt : null));
}

export async function readSessionCookie(): Promise<string | undefined> {
  return (await cookies()).get(SESSION_COOKIE)?.value;
}

export async function clearSessionCookie(): Promise<void> {
  (await cookies()).set(SESSION_COOKIE, "", { ...sessionCookieOptions(new Date(0)) });
}
