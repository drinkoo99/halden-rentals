import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/server/auth/cookie";

/**
 * Optimistic redirect for protected areas: without a session cookie, go straight to sign-in and come back
 * afterwards. This is only a convenience — the authoritative checks run on the server in the account and
 * staff layouts (session looked up in the database, role enforced) and in every protected API route.
 */
export function proxy(request: NextRequest) {
  if (request.cookies.has(SESSION_COOKIE)) {
    // pass the requested path on, so the server-side gate can return here after a fresh sign-in
    const headers = new Headers(request.headers);
    headers.set("x-halden-path", request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.next({ request: { headers } });
  }
  const url = request.nextUrl.clone();
  url.pathname = "/sign-in";
  url.search = `?next=${encodeURIComponent(request.nextUrl.pathname + request.nextUrl.search)}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/account/:path*", "/staff/:path*"] };
