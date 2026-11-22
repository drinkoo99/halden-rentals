import { queryOf, readJson, requireApiRole, STAFF_ROLES } from "@/server/auth/api";
import { fleetContext } from "@/server/fleet/context";
import { createUnitInput, fleetQuery } from "@/server/fleet/schemas";
import { createUnit, listUnits, toStaffUnit } from "@/server/fleet/store";
import { json, route } from "@/server/http/handler";

/** GET /api/v1/staff/fleet?model=&location=&status= — fleet units (staff/admin). */
export const GET = route("staff-fleet-list", async (request) => {
  await requireApiRole(request, STAFF_ROLES);
  const filter = fleetQuery.parse(queryOf(request));
  const units = await listUnits(await fleetContext(), filter);
  return json({ data: units.map(toStaffUnit) });
});

/** POST /api/v1/staff/fleet — register a physical car (staff/admin). */
export const POST = route("staff-fleet-create", async (request) => {
  await requireApiRole(request, STAFF_ROLES);
  const input = await readJson(request, createUnitInput);
  const unit = await createUnit(await fleetContext(), input);
  return json({ data: toStaffUnit(unit) }, { status: 201 });
});
