import { authContext } from "@/server/auth/session";
import { verifyEmail } from "@/server/auth/store";
import { route } from "@/server/http/handler";

/**
 * GET /api/v1/auth/verify-email?token=… — the link in the verification email. The single-use token is the
 * credential; the outcome is shown on the account page without saying why a token failed.
 */
export const GET = route("verify-email", async (request) => {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  const ok = await verifyEmail(await authContext(), token);
  return new Response(null, { status: 303, headers: { location: `/account?verified=${ok ? 1 : 0}`, "cache-control": "no-store" } });
});
