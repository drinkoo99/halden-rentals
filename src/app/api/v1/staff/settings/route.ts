import { requireApiRole, STAFF_ROLES } from "@/server/auth/api";
import { getPublicLocations } from "@/server/catalogue/service";
import { json, route } from "@/server/http/handler";
import { effectiveSettings } from "@/server/staff/settings";

/** GET /api/v1/staff/settings — the operational configuration in effect, read-only, no secrets (staff/admin). */
export const GET = route("staff-settings", async (request) => {
  await requireApiRole(request, STAFF_ROLES);
  return json({ data: effectiveSettings(process.env, await getPublicLocations()) });
});
