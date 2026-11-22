import { queryOf, requireApiRole } from "@/server/auth/api";
import { json, route } from "@/server/http/handler";
import { peopleContext } from "@/server/staff/context";
import { listPeople, toStaffUserView } from "@/server/staff/people";
import { teamQuery } from "@/server/staff/schemas";
import type { UserDoc } from "@/server/auth/store";
import { AUTH_COLLECTIONS } from "@/server/auth/collections";

/**
 * GET /api/v1/admin/team?q= — staff and admin accounts (admins only).
 * GET /api/v1/admin/team?email= — exact-email lookup of any account, to promote it (admins only).
 */
export const GET = route("admin-team", async (request) => {
  await requireApiRole(request, ["admin"]);
  const q = teamQuery.parse(queryOf(request));
  const ctx = await peopleContext();
  if (q.email) {
    const found = await ctx.db.collection<UserDoc>(AUTH_COLLECTIONS.users).findOne({ email: q.email }, { projection: { passwordHash: 0 } });
    return json({ data: found ? [toStaffUserView(found)] : [] });
  }
  return json({ data: (await listPeople(ctx, { roles: ["staff", "admin"], q: q.q })).map((p) => p.user) });
});
