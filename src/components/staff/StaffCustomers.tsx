"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { StaffChrome } from "@/components/staff/StaffChrome";
import type { BookingCounts, StaffUserView } from "@/server/staff/people";

const field = "bg-surface-container-low text-on-surface border border-outline-variant px-3 py-1.5 rounded-none font-label-mono text-label-mono uppercase focus:outline-hidden focus:border-primary";
export const ACCOUNT_STATUS_LABEL = { active: "Active", disabled: "Suspended" } as const;

/** Staff Console: Customers (Stitch) over the registered customer accounts (M8). Search and status filter in the URL. */
export function StaffCustomers({ people, filters, staffName, today, setupError }: { people: { user: StaffUserView; counts: BookingCounts }[]; filters: { q?: string; status?: string }; staffName: string; today: string; setupError?: string }) {
  const router = useRouter();
  const go = (patch: Partial<typeof filters>) => {
    const next = new URLSearchParams(Object.entries({ ...filters, ...patch }).filter(([, v]) => v) as [string, string][]);
    router.push(next.size ? `/staff/customers?${next}` : "/staff/customers");
  };
  return (
    <StaffChrome section="customers" staffName={staffName} today={today}>
      <div className="flex flex-col w-full pb-24">
        <div className="pt-6 pb-5 border-b border-outline-variant flex items-baseline gap-4">
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Customers</h1>
          <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">{`[${people.length} ACCOUNTS]`}</span>
        </div>
        <form
          className="flex flex-wrap items-center gap-2 py-4 border-b border-outline-variant"
          onSubmit={(e) => {
            e.preventDefault();
            const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();
            go({ q: q.length >= 2 ? q : undefined });
          }}
        >
          <input name="q" defaultValue={filters.q} aria-label="Search by name or email" placeholder="Name or email" className={`${field} normal-case min-w-[260px]`} />
          <select aria-label="Filter by account status" className={field} value={filters.status ?? ""} onChange={(e) => go({ status: e.target.value || undefined })}>
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="disabled">Suspended</option>
          </select>
          <button type="submit" className="px-4 py-1.5 bg-primary text-on-primary font-action text-action uppercase">Search</button>
        </form>
        {setupError && <p role="alert" className="font-body-sm text-body-sm text-error mt-4">{setupError}</p>}
        {people.length === 0 ? (
          <p className="font-body-md text-body-md text-on-surface-variant py-10">{filters.q || filters.status ? "No customers match these filters." : "No customer accounts yet."}</p>
        ) : (
          <table className="w-full text-left border-collapse mt-4 font-body-sm text-body-sm">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low font-label-mono text-label-mono uppercase text-on-surface-variant">
                <th className="py-3 px-4 font-normal">Customer</th>
                <th className="py-3 px-4 font-normal">Registered</th>
                <th className="py-3 px-4 font-normal">Account</th>
                <th className="py-3 px-4 font-normal text-right">Upcoming</th>
                <th className="py-3 px-4 font-normal text-right">On rent</th>
                <th className="py-3 px-4 font-normal text-right">Completed</th>
                <th className="py-3 px-4 font-normal text-right">Cancelled</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {people.map(({ user, counts }) => (
                <tr key={user.id} className="bg-surface-container-lowest hover:bg-surface-container-low transition-colors">
                  <td className="py-3 px-4">
                    <Link className="font-action text-action text-on-surface hover:underline" href={`/staff/customers/${user.id}`}>{user.name}</Link>
                    <div className="font-label-mono text-label-mono text-on-surface-variant break-all">{user.email}</div>
                  </td>
                  <td className="py-3 px-4 font-spec-numeral text-on-surface-variant">{new Date(user.createdAt).toLocaleDateString("en-GB")}</td>
                  <td className={`py-3 px-4 font-label-mono text-label-mono uppercase ${user.status === "active" ? "text-primary" : "text-error"}`}>{ACCOUNT_STATUS_LABEL[user.status]}</td>
                  <td className="py-3 px-4 text-right font-spec-numeral">{counts.upcoming}</td>
                  <td className="py-3 px-4 text-right font-spec-numeral">{counts.active}</td>
                  <td className="py-3 px-4 text-right font-spec-numeral">{counts.completed}</td>
                  <td className="py-3 px-4 text-right font-spec-numeral text-on-surface-variant">{counts.cancelled}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </StaffChrome>
  );
}
