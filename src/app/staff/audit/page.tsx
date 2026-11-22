import type { Metadata } from "next";
import { StaffAudit, type AuditRow } from "@/components/staff/StaffAudit";
import { StaffConsoleFrame } from "@/components/staff/StaffConsoleFrame";
import { listAudit } from "@/server/audit/audit";
import { requireRole } from "@/server/auth/session";
import { AppError } from "@/server/http/errors";
import { peopleContext } from "@/server/staff/context";
import { auditQuery } from "@/server/staff/schemas";
import { staffToday } from "@/server/staff/today";

export const metadata: Metadata = { title: { absolute: "Audit log — HALDEN Operations" }, robots: { index: false } };

const describe = (before?: Record<string, unknown>, after?: Record<string, unknown>) =>
  Object.keys({ ...before, ...after })
    .map((k) => `${k}: ${before && k in before ? String(before[k]) : "—"} → ${after && k in after ? String(after[k]) : "—"}`)
    .join(" · ");

/** Admin: the operational audit log (M8). ?entity=booking|fleet_unit|block|user. Staff get 404. */
export default async function Page({ searchParams }: PageProps<"/staff/audit">) {
  const user = await requireRole(["admin"], "/staff/audit");
  const raw = await searchParams;
  const parsed = auditQuery.safeParse(typeof raw.entity === "string" && raw.entity ? { entity: raw.entity } : {});
  const q = parsed.success ? parsed.data : {};
  let rows: AuditRow[] = [];
  let setupError: string | undefined;
  try {
    rows = (await listAudit(await peopleContext(), { ...q, limit: 300 })).map((e) => ({
      id: e._id.toHexString(),
      at: e.at.toISOString(),
      actor: e.actor.name,
      actorRole: e.actor.role,
      action: e.action,
      entityType: e.entity.type,
      entityId: e.entity.id,
      entityLabel: e.entity.label,
      change: describe(e.before, e.after),
      ...(e.reason ? { reason: e.reason } : {}),
    }));
  } catch (err) {
    if (!(err instanceof AppError) || err.code !== "SERVICE_UNAVAILABLE") throw err;
    setupError = "The audit log is not set up on this database yet (run db:setup).";
  }
  return (
    <StaffConsoleFrame>
      <StaffAudit rows={rows} entity={q.entity} staffName={user.name} today={staffToday()} setupError={setupError} />
    </StaffConsoleFrame>
  );
}
