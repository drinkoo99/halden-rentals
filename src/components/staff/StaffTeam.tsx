"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { StaffChrome } from "@/components/staff/StaffChrome";
import { ACCOUNT_STATUS_LABEL } from "@/components/staff/StaffCustomers";
import { useStaffAction } from "@/components/staff/useStaffAction";
import type { StaffUserView } from "@/server/staff/people";

const ROLE_OPTIONS = ["customer", "staff", "admin"] as const;
const input = "bg-surface-container-low text-on-surface border border-outline-variant px-3 py-1.5 font-body-sm text-body-sm focus:outline-hidden focus:border-primary";

/**
 * Admin: team management (M8). Lists staff and admin accounts; finds any account by exact email to promote
 * it; changes roles and suspends/reactivates staff accounts. The server enforces every rule (admins only,
 * never your own account, never the last active admin) and audits each change with its reason.
 */
export function StaffTeam({ team, lookup, lookupEmail, selfId, staffName, today, setupError }: { team: StaffUserView[]; lookup: StaffUserView | null | undefined; lookupEmail?: string; selfId: string; staffName: string; today: string; setupError?: string }) {
  const router = useRouter();
  const { busy, error, run } = useStaffAction();
  const [reason, setReason] = useState("");
  const body = (extra: Record<string, unknown>) => ({ ...extra, ...(reason.trim() ? { reason: reason.trim() } : {}) });

  const row = (u: StaffUserView) => {
    const self = u.id === selfId;
    return (
      <tr key={u.id} className="bg-surface-container-lowest">
        <td className="py-3 px-4">
          <div className="font-action text-action text-on-surface">
            {u.name}
            {self ? " (you)" : ""}
          </div>
          <div className="font-label-mono text-label-mono text-on-surface-variant break-all">{u.email}</div>
        </td>
        <td className="py-3 px-4 font-spec-numeral text-on-surface-variant">{new Date(u.createdAt).toLocaleDateString("en-GB")}</td>
        <td className={`py-3 px-4 font-label-mono text-label-mono uppercase ${u.status === "active" ? "text-primary" : "text-error"}`}>{ACCOUNT_STATUS_LABEL[u.status]}</td>
        <td className="py-3 px-4">
          <select
            aria-label={`Role of ${u.email}`}
            className={input}
            value={u.role}
            disabled={self || busy !== null || u.status !== "active"}
            title={self ? "You cannot change your own role" : u.status !== "active" ? "Reactivate the account first" : undefined}
            onChange={(e) => void run(`role-${u.id}`, `/api/v1/admin/accounts/${u.id}/role`, body({ role: e.target.value }))}
          >
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </td>
        <td className="py-3 px-4 text-right">
          <button
            type="button"
            disabled={self || busy !== null}
            title={self ? "You cannot suspend your own account" : undefined}
            className={`px-3 py-1.5 font-action text-action uppercase disabled:opacity-40 ${u.status === "active" ? "border border-error text-error" : "bg-primary text-on-primary"}`}
            onClick={() => void run(`status-${u.id}`, `/api/v1/staff/accounts/${u.id}/${u.status === "active" ? "suspend" : "reactivate"}`, body({}))}
          >
            {u.status === "active" ? "Suspend" : "Reactivate"}
          </button>
        </td>
      </tr>
    );
  };

  return (
    <StaffChrome section="team" staffName={staffName} today={today}>
      <div className="flex flex-col w-full pb-24">
        <div className="pt-6 pb-5 border-b border-outline-variant flex items-baseline gap-4">
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Team</h1>
          <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">{`[${team.length} STAFF & ADMIN ACCOUNTS]`}</span>
        </div>
        {setupError && <p role="alert" className="font-body-sm text-body-sm text-error mt-4">{setupError}</p>}
        <div className="flex flex-wrap items-end gap-4 py-4 border-b border-outline-variant">
          <form
            className="flex items-end gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
              router.push(email ? `/staff/team?email=${encodeURIComponent(email)}` : "/staff/team");
            }}
          >
            <label className="flex flex-col gap-1 font-label-mono text-label-mono uppercase text-on-surface-variant">
              Find an account to promote
              <input name="email" type="email" defaultValue={lookupEmail} placeholder="exact email address" className={`${input} min-w-[280px]`} />
            </label>
            <button type="submit" className="px-4 py-1.5 bg-primary text-on-primary font-action text-action uppercase">Find</button>
          </form>
          <label className="flex flex-col gap-1 font-label-mono text-label-mono uppercase text-on-surface-variant flex-1 min-w-[260px]">
            Reason for the next change (audit log)
            <input value={reason} onChange={(e) => setReason(e.target.value)} maxLength={500} className={input} placeholder="e.g. new hire, left the company" />
          </label>
        </div>
        {error && <p role="alert" className="font-body-sm text-body-sm text-error mt-3">{error}</p>}
        {lookupEmail && (
          <div className="mt-4">
            <h2 className="font-label-mono text-label-mono uppercase text-on-surface-variant mb-2">Lookup</h2>
            {lookup ? (
              <table className="w-full text-left border-collapse font-body-sm text-body-sm border-y border-outline-variant">
                <tbody>{row(lookup)}</tbody>
              </table>
            ) : (
              <p className="font-body-sm text-body-sm text-on-surface-variant">No account with this email. The person must register first.</p>
            )}
          </div>
        )}
        <table className="w-full text-left border-collapse mt-6 font-body-sm text-body-sm">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-container-low font-label-mono text-label-mono uppercase text-on-surface-variant">
              <th className="py-3 px-4 font-normal">Account</th>
              <th className="py-3 px-4 font-normal">Since</th>
              <th className="py-3 px-4 font-normal">Status</th>
              <th className="py-3 px-4 font-normal">Role</th>
              <th className="py-3 px-4 font-normal text-right">Access</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">{team.map(row)}</tbody>
        </table>
        <p className="font-label-mono text-[10px] uppercase text-outline mt-4">
          Roles change on the account&apos;s next request. The last active admin can be neither demoted nor suspended; the first admin is set with npm run user:role.
        </p>
      </div>
    </StaffChrome>
  );
}
