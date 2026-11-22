import "server-only";
import { headers } from "next/headers";
import { SessionSeed } from "@/components/auth/SessionSeed";
import type { Role } from "./schemas";
import { requireRole, requireUser } from "./session";

/** The path the proxy recorded for this request (so sign-in can return to it), else the area's root. */
async function requestedPath(fallback: string): Promise<string> {
  return (await headers()).get("x-halden-path") ?? fallback;
}

/**
 * Server-side gate for a protected area. Renders its children only for a valid session (and, with
 * `roles`, an allowed role); otherwise redirects to sign-in or answers 404. Used by the account and staff
 * layouts inside a Suspense boundary (it reads the request's cookies).
 */
export async function AuthGate({ area, roles, children }: { area: string; roles?: readonly Role[]; children: React.ReactNode }) {
  const next = await requestedPath(area);
  const user = roles ? await requireRole(roles, next) : await requireUser(next);
  return (
    <>
      <SessionSeed user={user} />
      {children}
    </>
  );
}
