"use client";

import Link from "next/link";
import { useState } from "react";
import { StaffChrome } from "@/components/staff/StaffChrome";
import { ACCOUNT_STATUS_LABEL } from "@/components/staff/StaffCustomers";
import { useStaffAction } from "@/components/staff/useStaffAction";
import { euro, statusLabel, STATUS_BADGE, type BookingRow } from "@/lib/bookingDisplay";
import type { StaffUserView } from "@/server/staff/people";

/**
 * Staff Console: Customer detail (Stitch) for a real account (M8): contact details, registration date,
 * account status with suspend/reactivate (reason recorded in the audit log), and the booking history split
 * into upcoming, on rent and past. Passwords, hashes and tokens are never loaded into this view.
 */
export function StaffCustomerDetail({ user, groups, staffName, today }: { user: StaffUserView; groups: { title: string; rows: BookingRow[] }[]; staffName: string; today: string }) {
  const { busy, error, run } = useStaffAction();
  const [reason, setReason] = useState("");
  const suspended = user.status === "disabled";
  return (
    <StaffChrome section="customers" staffName={staffName} today={today}>
      <div className="flex flex-col w-full pb-24">
        <div className="pt-6 pb-5 border-b border-outline-variant">
          <Link className="font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-on-surface" href="/staff/customers">
            ← Customers
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">{user.name}</h1>
              <p className="font-label-mono text-label-mono text-on-surface-variant break-all">
                {user.email} · {user.emailVerified ? "email verified" : "email not verified"} · registered {new Date(user.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
            <span className={`font-label-mono text-label-mono uppercase ${suspended ? "text-error" : "text-primary"}`}>{ACCOUNT_STATUS_LABEL[user.status]}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-6">
          <section className="xl:col-span-8 flex flex-col gap-6">
            {groups.map((g) => (
              <div key={g.title}>
                <h2 className="font-label-mono text-label-mono uppercase text-on-surface-variant mb-2">{`${g.title} (${g.rows.length})`}</h2>
                {g.rows.length === 0 ? (
                  <p className="font-body-sm text-body-sm text-on-surface-variant border-y border-outline-variant py-3">None.</p>
                ) : (
                  <ul className="divide-y divide-outline-variant border-y border-outline-variant">
                    {g.rows.map((b) => (
                      <li key={b.reference}>
                        <Link href={`/staff/bookings/${b.reference}`} className="grid grid-cols-[8.5rem_1fr_auto_auto] items-center gap-4 py-2.5 px-1 hover:bg-surface-container-low font-body-sm text-body-sm">
                          <span className="font-spec-numeral text-primary font-bold">{b.reference}</span>
                          <span className="min-w-0">
                            <span className="block truncate">{b.vehicleName}</span>
                            <span className="block font-label-mono text-[10px] uppercase text-on-surface-variant">{`${b.pickupHub} · ${b.pickupLocal}`}</span>
                          </span>
                          <span className={`inline-flex px-2 py-0.5 font-label-mono text-[10px] uppercase ${STATUS_BADGE[b.status]}`}>{statusLabel(b.status)}</span>
                          <span className="font-spec-numeral">{euro(b.totalCents)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
          <aside className="xl:col-span-4">
            <form
              className="border border-outline-variant bg-surface-container-low p-5 flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                void run("status", `/api/v1/staff/accounts/${user.id}/${suspended ? "reactivate" : "suspend"}`, reason.trim() ? { reason: reason.trim() } : {}).then((ok) => ok && setReason(""));
              }}
            >
              <h2 className="font-label-mono text-label-mono uppercase text-on-surface-variant">ACCOUNT</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {suspended ? "Suspended: the customer cannot sign in. Reactivating restores access." : "Suspending signs the customer out everywhere and blocks sign-in. Bookings are kept; cancel them separately if needed."}
              </p>
              <input value={reason} onChange={(e) => setReason(e.target.value)} maxLength={500} placeholder="Reason (recorded in the audit log)" className="bg-surface text-on-surface border border-outline-variant px-3 py-2 font-body-sm text-body-sm" />
              {error && <p role="alert" className="font-body-sm text-body-sm text-error">{error}</p>}
              <button type="submit" disabled={busy !== null} className={`self-start px-4 py-2 font-action text-action uppercase disabled:opacity-50 ${suspended ? "bg-primary text-on-primary" : "border border-error text-error"}`}>
                {busy ? "Saving…" : suspended ? "Reactivate account" : "Suspend account"}
              </button>
              <p className="font-label-mono text-[10px] uppercase text-outline">Accounts are never deleted here: bookings and the audit log refer to them.</p>
            </form>
          </aside>
        </div>
      </div>
    </StaffChrome>
  );
}
