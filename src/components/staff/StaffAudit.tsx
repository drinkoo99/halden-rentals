"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { StaffChrome } from "@/components/staff/StaffChrome";

export type AuditRow = { id: string; at: string; actor: string; actorRole: string; action: string; entityType: string; entityId: string; entityLabel: string; change: string; reason?: string };

const ENTITIES = [
  ["", "All"],
  ["booking", "Bookings"],
  ["fleet_unit", "Fleet"],
  ["block", "Blocks"],
  ["user", "Accounts"],
] as const;

const hrefOf = (r: AuditRow) =>
  r.entityType === "booking" ? `/staff/bookings/${r.entityId}` : r.entityType === "user" ? `/staff/customers/${r.entityId}` : r.entityType === "fleet_unit" ? "/staff/fleet" : null;

/** Admin: the operational audit log (M8), newest first — who did what to which booking, car or account. Read-only. */
export function StaffAudit({ rows, entity, staffName, today, setupError }: { rows: AuditRow[]; entity?: string; staffName: string; today: string; setupError?: string }) {
  const router = useRouter();
  return (
    <StaffChrome section="audit" staffName={staffName} today={today}>
      <div className="flex flex-col w-full pb-24">
        <div className="pt-6 pb-5 border-b border-outline-variant flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex items-baseline gap-4">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Audit log</h1>
            <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">{`[LATEST ${rows.length}]`}</span>
          </div>
          <div className="flex gap-1 font-label-mono text-label-mono uppercase">
            {ENTITIES.map(([value, label]) => (
              <button key={value} type="button" onClick={() => router.push(value ? `/staff/audit?entity=${value}` : "/staff/audit")} className={`px-3 py-1.5 border ${(entity ?? "") === value ? "bg-primary text-on-primary border-primary" : "border-outline-variant text-on-surface-variant hover:text-on-surface"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
        {setupError && <p role="alert" className="font-body-sm text-body-sm text-error mt-4">{setupError}</p>}
        {rows.length === 0 ? (
          <p className="font-body-md text-body-md text-on-surface-variant py-10">No recorded actions yet.</p>
        ) : (
          <table className="w-full text-left border-collapse mt-4 font-body-sm text-body-sm">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low font-label-mono text-label-mono uppercase text-on-surface-variant">
                <th className="py-3 px-4 font-normal">When</th>
                <th className="py-3 px-4 font-normal">Who</th>
                <th className="py-3 px-4 font-normal">Action</th>
                <th className="py-3 px-4 font-normal">On</th>
                <th className="py-3 px-4 font-normal">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {rows.map((r) => {
                const href = hrefOf(r);
                return (
                  <tr key={r.id} className="bg-surface-container-lowest align-top">
                    <td className="py-3 px-4 font-spec-numeral text-on-surface-variant whitespace-nowrap">{new Date(r.at).toLocaleString("en-GB")}</td>
                    <td className="py-3 px-4">
                      {r.actor}
                      <div className="font-label-mono text-[10px] uppercase text-on-surface-variant">{r.actorRole}</div>
                    </td>
                    <td className="py-3 px-4 font-label-mono text-label-mono uppercase">{r.action.replaceAll("_", " ")}</td>
                    <td className="py-3 px-4">{href ? <Link className="hover:underline text-primary" href={href}>{r.entityLabel}</Link> : r.entityLabel}</td>
                    <td className="py-3 px-4 text-on-surface-variant">
                      {r.change}
                      {r.reason && <div className="text-on-surface">“{r.reason}”</div>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </StaffChrome>
  );
}
