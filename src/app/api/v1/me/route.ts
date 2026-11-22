import { currentUser } from "@/server/auth/session";
import { AppError } from "@/server/http/errors";
import { json, route } from "@/server/http/handler";

/** GET /api/v1/me — the signed-in user's public profile (never the password hash), or 401. Never cached. */
export const GET = route("me", async () => {
  const user = await currentUser();
  if (!user) throw new AppError("UNAUTHENTICATED", "Not signed in.");
  return json({ data: user });
});
