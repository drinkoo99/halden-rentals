"use client";

import Link from "next/link";
import { StaffChrome } from "@/components/staff/StaffChrome";
import { useRouter } from "next/navigation";
import { euro, statusLabel, STATUS_BADGE, type BookingRow } from "@/lib/bookingDisplay";
import { BOOKING_STATUSES } from "@/server/bookings/statuses";

export type StaffBookingRow = BookingRow & { customer: string; email: string; unit: string | null };
export type StaffBookingFilters = { status?: string; location?: string; from?: string; to?: string; q?: string };

const field = "bg-surface-container-low text-on-surface border border-outline-variant px-3 py-1.5 rounded-none font-label-mono text-label-mono uppercase focus:outline-hidden focus:border-primary";

/**
 * Staff Console: Bookings (Stitch) over the real reservations (M7). Filters live in the URL and are applied
 * on the server; each row opens the operational dossier (assign, check-out, check-in, cancel).
 */
export function StaffBookings({ bookings, hubs, filters, staffName, today, setupError }: { bookings: StaffBookingRow[]; hubs: { code: string; iata: string; city: string }[]; filters: StaffBookingFilters; staffName: string; today: string; setupError?: string }) {
  const router = useRouter();
  const go = (patch: Partial<StaffBookingFilters>) => {
    const next = new URLSearchParams(Object.entries({ ...filters, ...patch }).filter(([, v]) => v) as [string, string][]);
    router.push(next.size ? `/staff/bookings?${next}` : "/staff/bookings");
  };
  const active = bookings.filter((b) => b.status === "held" || b.status === "confirmed" || b.status === "checked_out").length;
  const filtered = Object.values(filters).some(Boolean);
  return (
    <StaffChrome section="bookings" staffName={staffName} today={today}>
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between pb-6 pt-2">
              <div className="flex items-baseline gap-4">
                <h1 className="font-headline-lg text-headline-lg tracking-tight text-on-surface">Bookings</h1>
                <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest px-2.5 py-1 bg-surface-container rounded-none">{`[${bookings.length} DOSSIERS // ${active} ACTIVE]`}</span>
              </div>
            </div>
            <form
              className="w-full flex flex-wrap items-center gap-2 pb-5 border-b border-outline-variant"
              onSubmit={(e) => {
                e.preventDefault();
                const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();
                go({ q: q.length >= 2 ? q : undefined });
              }}
            >
              <input name="q" defaultValue={filters.q} aria-label="Search by reference, name or email" placeholder="Reference, name or email" className={`${field} normal-case min-w-[260px]`} />
              <select aria-label="Filter by hub" className={field} value={filters.location ?? ""} onChange={(e) => go({ location: e.target.value || undefined })}>
                <option value="">All hubs</option>
                {hubs.map((h) => (
                  <option key={h.code} value={h.code}>{`${h.iata} — ${h.city}`}</option>
                ))}
              </select>
              <select aria-label="Filter by status" className={field} value={filters.status ?? ""} onChange={(e) => go({ status: e.target.value || undefined })}>
                <option value="">All statuses</option>
                {BOOKING_STATUSES.map((s) => (
                  <option key={s} value={s}>{statusLabel(s)}</option>
                ))}
              </select>
              <label className="flex items-center gap-1 font-label-mono text-label-mono uppercase text-on-surface-variant">
                Pick-up from <input type="date" className={field} value={filters.from ?? ""} onChange={(e) => go({ from: e.target.value || undefined })} />
              </label>
              <label className="flex items-center gap-1 font-label-mono text-label-mono uppercase text-on-surface-variant">
                to <input type="date" className={field} value={filters.to ?? ""} onChange={(e) => go({ to: e.target.value || undefined })} />
              </label>
              <button type="submit" className="px-4 py-1.5 bg-primary text-on-primary font-action text-action uppercase">Search</button>
              {filtered && (
                <button type="button" className="ml-auto text-on-surface-variant hover:text-on-surface underline underline-offset-4 font-label-mono text-label-mono uppercase" onClick={() => router.push("/staff/bookings")}>
                  Clear filters
                </button>
              )}
            </form>
            {setupError && (
              <p role="alert" className="font-body-sm text-body-sm text-error mt-4">
                {setupError}
              </p>
            )}
            {bookings.length === 0 ? (
              <div className="w-full mt-8 bg-surface-container-low border border-outline-variant p-10 flex flex-col items-center text-center">
                <h2 className="font-headline-md text-headline-md text-on-surface mb-2">{filtered ? "No bookings match these filters." : "No bookings yet."}</h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md">{filtered ? "Adjust or clear the filters." : "Reservations made through the booking flow appear here."}</p>
              </div>
            ) : (
              <section className="w-full mt-4 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant bg-surface-container-low font-label-mono text-label-mono uppercase text-on-surface-variant">
                      <th className="py-3 px-4 font-normal tracking-wider">REFERENCE</th>
                      <th className="py-3 px-4 font-normal tracking-wider">PATRON</th>
                      <th className="py-3 px-4 font-normal tracking-wider">VEHICLE</th>
                      <th className="py-3 px-4 font-normal tracking-wider">PICK-UP</th>
                      <th className="py-3 px-4 font-normal tracking-wider">RETURN</th>
                      <th className="py-3 px-4 font-normal tracking-wider">STATUS</th>
                      <th className="py-3 px-4 font-normal tracking-wider text-right">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant font-body-sm text-body-sm">
                    {bookings.map((b) => (
                      <tr key={b.reference} className="bg-surface-container-lowest hover:bg-surface-container-low transition-colors">
                        <td className="py-4 px-4">
                          <Link className="font-spec-numeral text-spec-numeral text-primary font-bold hover:underline" href={`/staff/bookings/${b.reference}`}>
                            {b.reference}
                          </Link>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-action text-action text-on-surface">{b.customer}</div>
                          <div className="font-label-mono text-label-mono text-on-surface-variant break-all">{b.email}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-on-surface">{b.vehicleName}</div>
                          <div className="font-label-mono text-label-mono text-on-surface-variant">{b.unit ?? "No car assigned"}</div>
                        </td>
                        <td className="py-4 px-4 text-on-surface">
                          {b.pickupHub}
                          <div className="font-label-mono text-label-mono text-on-surface-variant">{b.pickupLocal}</div>
                        </td>
                        <td className="py-4 px-4 text-on-surface">
                          {b.returnHub}
                          <div className="font-label-mono text-label-mono text-on-surface-variant">{b.returnLocal}</div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex px-2.5 py-1 font-label-mono text-[10px] uppercase tracking-wider ${STATUS_BADGE[b.status]}`}>{statusLabel(b.status)}</span>
                        </td>
                        <td className="py-4 px-4 text-right font-spec-numeral text-spec-numeral text-on-surface font-bold">{euro(b.totalCents)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}
            <div className="w-full py-4 border-t border-outline-variant mt-2 font-label-mono text-label-mono text-on-surface-variant uppercase">{`SHOWING ${bookings.length} BOOKING${bookings.length === 1 ? "" : "S"}`}</div>
          </div>
    </StaffChrome>
  );
}
