import "server-only";
import type { z } from "zod";
import { AppError } from "../http/errors";
import type { PublicUser, Role } from "./schemas";
import { currentUser } from "./session";

/**
 * Authorization for Route Handlers (M6). The session is looked up in the database on every call.
 * - no session → 401 UNAUTHENTICATED; a role not in `roles` → 403 FORBIDDEN;
 * - state-changing methods must come from this origin (the Origin header, when present, must match the
 *   host) — defence in depth on top of the SameSite=Lax session cookie.
 */
export async function requireApiRole(request: Request, roles: readonly Role[]): Promise<PublicUser> {
  if (request.method !== "GET" && request.method !== "HEAD") {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host") ?? new URL(request.url).host;
    let sameOrigin = true;
    try {
      sameOrigin = !origin || new URL(origin).host === host;
    } catch {
      sameOrigin = false;
    }
    if (!sameOrigin) throw new AppError("FORBIDDEN", "Cross-origin requests are not allowed.");
  }
  const user = await currentUser();
  if (!user) throw new AppError("UNAUTHENTICATED", "Sign in to continue.");
  if (!roles.includes(user.role)) throw new AppError("FORBIDDEN", "You do not have access to this resource.");
  return user;
}

export const STAFF_ROLES = ["staff", "admin"] as const satisfies readonly Role[];

/** Parse a JSON request body with a schema; only `application/json` bodies are accepted. */
export async function readJson<T extends z.ZodType>(request: Request, schema: T): Promise<z.infer<T>> {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json"))
    throw new AppError("BAD_REQUEST", "Send the request body as application/json.");
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    throw new AppError("BAD_REQUEST", "The request body is not valid JSON.");
  }
  return schema.parse(body); // a ZodError becomes 400 VALIDATION_FAILED in the route wrapper
}

/** Query parameters as a plain object (a repeated parameter keeps its last value). */
export const queryOf = (request: Request) => Object.fromEntries(new URL(request.url).searchParams);
