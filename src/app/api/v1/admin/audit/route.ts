import { queryOf, requireApiRole } from "@/server/auth/api";
import { listAudit } from "@/server/audit/audit";
import { json, route } from "@/server/http/handler";
import { peopleContext } from "@/server/staff/context";
import { auditQuery } from "@/server/staff/schemas";

/** GET /api/v1/admin/audit?entity=&id= — the operational audit log, newest first (admins only). */
export const GET = route("admin-audit", async (request) => {
  await requireApiRole(request, ["admin"]);
  const q = auditQuery.parse(queryOf(request));
  const events = await listAudit(await peopleContext(), q);
  return json({
    data: events.map((e) => ({ id: e._id.toHexString(), at: e.at.toISOString(), actor: { id: e.actor.id.toHexString(), role: e.actor.role, name: e.actor.name }, action: e.action, entity: e.entity, before: e.before, after: e.after, reason: e.reason })),
  });
});
