/**
 * Session cookie settings, shared by the server (sets/reads it) and the proxy (checks it is present).
 * Production uses the `__Host-` prefix: the browser then only accepts it over HTTPS, for this exact host,
 * on path `/` — it cannot be set by a subdomain or scoped elsewhere. HttpOnly keeps it away from scripts;
 * SameSite=Lax stops it being sent on cross-site form posts (Server Actions additionally check the Origin).
 */
export const SESSION_COOKIE = process.env.NODE_ENV === "production" ? "__Host-halden_session" : "halden_session";

export function sessionCookieOptions(expiresAt: Date | null) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    // without "remember me" the cookie ends with the browser session (the server-side session still expires)
    ...(expiresAt ? { expires: expiresAt } : {}),
  };
}
