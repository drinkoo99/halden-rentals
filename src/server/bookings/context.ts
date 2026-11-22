import "server-only";
import { ObjectId } from "mongodb";
import type { PublicUser } from "../auth/schemas";
import { mailer } from "../auth/session";
import { assertAuthReady, attempts, recordAttempt } from "../auth/store";
import { getMongoClient, isDatabaseConfigured } from "../db/client";
import { serverEnv } from "../env";
import { AppError } from "../http/errors";
import type { Actor, BookingContext } from "./store";

/** The booking engine on the application database, with transactions and the configured mailer. */
export async function bookingContext(): Promise<BookingContext> {
  if (!isDatabaseConfigured()) throw new AppError("SERVICE_UNAVAILABLE", "MONGODB_URI is not set");
  const client = await getMongoClient();
  return { db: client.db(serverEnv().MONGODB_DB), startSession: () => client.startSession(), mailer: mailer() };
}

export const actorOf = (user: PublicUser): Actor => ({ id: new ObjectId(user.id), role: user.role });

export function clientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

/**
 * Per-IP rate limit for public endpoints that query the database (quotes, availability), on the M5
 * `rateLimits` collection. If that collection is not set up yet the limit is skipped rather than letting
 * MongoDB create it without its TTL index.
 */
export async function limitByIp(ctx: BookingContext, request: Request, scope: string, max = 60, windowMs = 5 * 60_000): Promise<void> {
  const auth = { db: ctx.db, now: ctx.now };
  try {
    await assertAuthReady(auth);
  } catch {
    return;
  }
  const key = `${scope}:ip:${clientIp(request).slice(0, 64)}`;
  if ((await attempts(auth, key, windowMs)) >= max)
    throw new AppError("RATE_LIMITED", "Too many requests. Please wait a few minutes.", { details: { retryAfterSeconds: Math.ceil(windowMs / 1000) } });
  await recordAttempt(auth, key, windowMs);
}
