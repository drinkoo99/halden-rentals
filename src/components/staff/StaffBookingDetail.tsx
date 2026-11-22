"use client";

import Link from "next/link";
import { StaffChrome } from "@/components/staff/StaffChrome";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { euro, statusLabel, STATUS_BADGE, type BookingRow } from "@/lib/bookingDisplay";
import type { StaffBooking } from "@/server/bookings/views";

export type CandidateUnit = { id: string; label: string; available: boolean; reason?: string };

const btn = "px-4 py-2 font-action text-action uppercase tracking-wider transition-colors disabled:opacity-50";
const input = "bg-surface-container-low text-on-surface border border-outline-variant px-3 py-2 rounded-none font-body-sm text-body-sm focus:outline-hidden focus:border-primary";

/**
 * Staff Console: Booking Detail (Stitch) for a real reservation (M7). Every change is a named lifecycle
 * action on /api/v1/staff/bookings/:reference/:action, checked on the server: confirm, assign a car,
 * check out, check in, cancel, add a note.
 */
export function StaffBookingDetail({ booking, row, candidates, staffName, today }: { booking: StaffBooking; row: BookingRow; candidates: CandidateUnit[]; staffName: string; today: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const p = booking.price;
  const open = booking.status === "held" || booking.status === "confirmed";

  async function act(action: string, body: Record<string, unknown> = {}) {
    setBusy(action);
    setError(null);
    const res = await fetch(`/api/v1/staff/bookings/${encodeURIComponent(booking.reference)}/${action}`, { method: "POST", headers: { "content-type": "application/json" }, credentials: "same-origin", body: JSON.stringify(body) }).catch(() => null);
    setBusy(null);
    if (!res?.ok) {
      const json = (await res?.json().catch(() => null)) as { error?: { message?: string; details?: unknown } } | null;
      const reasons = (json?.error?.details as { reasons?: { code: string }[] } | undefined)?.reasons?.map((r) => r.code).join(", ");
      return setError([json?.error?.message ?? "The action failed.", reasons].filter(Boolean).join(" — "));
    }
    router.refresh();
  }
  const num = (form: HTMLFormElement, name: string) => {
    const v = String(new FormData(form).get(name) ?? "").trim();
    return v === "" ? undefined : Number(v);
  };

  return (
    <StaffChrome section="bookings" staffName={staffName} today={today}>
          <div className="flex flex-col w-full pb-16">
            <div className="pt-6 pb-5 border-b border-outline-variant flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <Link className="font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-on-surface" href="/staff/bookings">
                  ← Bookings
                </Link>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-2">{booking.reference}</h1>
                <p className="font-label-mono text-label-mono uppercase text-on-surface-variant mt-1">{booking.vehicleName}</p>
              </div>
              <span className={`self-start md:self-auto inline-flex px-3 py-1.5 font-label-mono text-label-mono uppercase tracking-wider ${STATUS_BADGE[booking.status]}`}>{statusLabel(booking.status)}</span>
            </div>
            {error && (
              <p role="alert" className="font-body-sm text-body-sm text-error mt-4">
                {error}
              </p>
            )}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-6 pb-16">
              <section className="xl:col-span-7 flex flex-col gap-6">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-outline-variant bg-surface-container-lowest p-5">
                  <div>
                    <dt className="font-label-mono text-label-mono uppercase text-outline">PICK-UP</dt>
                    <dd className="text-on-surface mt-1">{row.pickupHub}</dd>
                    <dd className="font-spec-numeral text-spec-numeral text-on-surface-variant">{row.pickupLocal}</dd>
                  </div>
                  <div>
                    <dt className="font-label-mono text-label-mono uppercase text-outline">RETURN</dt>
                    <dd className="text-on-surface mt-1">{row.returnHub}</dd>
                    <dd className="font-spec-numeral text-spec-numeral text-on-surface-variant">{row.returnLocal}</dd>
                  </div>
                  <div>
                    <dt className="font-label-mono text-label-mono uppercase text-outline">ASSIGNED CAR</dt>
                    <dd className="text-on-surface mt-1">{booking.unit ? `${booking.unit.unitCode} · ${booking.unit.registration}` : "None"}</dd>
                    {booking.unit && <dd className="font-label-mono text-label-mono text-on-surface-variant uppercase">{booking.unit.status} at {booking.unit.locationCode}</dd>}
                  </div>
                  <div>
                    <dt className="font-label-mono text-label-mono uppercase text-outline">ODOMETER</dt>
                    <dd className="text-on-surface mt-1">
                      {booking.mileageOutKm !== undefined ? `out ${booking.mileageOutKm} km` : "—"}
                      {booking.mileageInKm !== undefined ? ` · in ${booking.mileageInKm} km` : ""}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="font-label-mono text-label-mono uppercase text-outline">PRINCIPAL DRIVER</dt>
                    <dd className="text-on-surface mt-1">
                      {booking.driver.firstName} {booking.driver.lastName} · <span className="break-all">{booking.driver.email}</span> · {booking.driver.phone}
                    </dd>
                    <dd className="font-label-mono text-label-mono text-on-surface-variant uppercase">
                      Born {booking.driver.dob} · Licence {booking.driver.licenceCountry} {booking.driver.licenceNumber}
                    </dd>
                    {booking.driver.notes && <dd className="font-body-sm text-body-sm text-on-surface-variant mt-1">Notes: {booking.driver.notes}</dd>}
                  </div>
                </dl>

                <div className="border border-outline-variant bg-surface-container-lowest p-5">
                  <h2 className="font-label-mono text-label-mono uppercase text-on-surface-variant mb-3">PRICE SNAPSHOT (NOTHING CHARGED — DUE AT HANDOVER)</h2>
                  <dl className="divide-y divide-outline-variant font-body-sm text-body-sm">
                    <div className="flex justify-between py-1.5"><dt>Day rate {euro(p.dailyRateCents)} × {p.days}</dt><dd className="font-spec-numeral">{euro(p.rentalCents)}</dd></div>
                    {p.extras.map((e) => (
                      <div key={e.code} className="flex justify-between py-1.5"><dt>{e.label}{e.quantity > 1 ? ` × ${e.quantity}` : ""}{e.included ? " (included)" : ""}</dt><dd className="font-spec-numeral">{euro(e.amountCents)}</dd></div>
                    ))}
                    {p.fees.map((fee) => (
                      <div key={fee.code} className="flex justify-between py-1.5"><dt>{fee.label}</dt><dd className="font-spec-numeral">{euro(fee.amountCents)}</dd></div>
                    ))}
                    <div className="flex justify-between py-1.5 text-on-surface-variant"><dt>VAT {Math.round(p.vatRate * 100)} %</dt><dd className="font-spec-numeral">{euro(p.vatCents)}</dd></div>
                    <div className="flex justify-between py-2 font-bold"><dt>Total</dt><dd className="font-spec-numeral text-primary">{euro(p.totalCents)}</dd></div>
                  </dl>
                </div>

                <div className="border border-outline-variant bg-surface-container-lowest p-5">
                  <h2 className="font-label-mono text-label-mono uppercase text-on-surface-variant mb-3">HISTORY</h2>
                  <ol className="flex flex-col gap-1.5 font-body-sm text-body-sm">
                    {booking.history.map((h, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="font-spec-numeral text-on-surface-variant w-40 shrink-0">{new Date(h.at).toLocaleString("en-GB")}</span>
                        <span className="text-on-surface">{h.action.replaceAll("_", " ")}</span>
                        <span className="text-on-surface-variant uppercase font-label-mono text-label-mono">{h.byRole}</span>
                        {h.note && <span className="text-on-surface-variant">“{h.note}”</span>}
                      </li>
                    ))}
                  </ol>
                </div>
              </section>

              <aside className="xl:col-span-5 flex flex-col gap-5">
                {booking.status === "held" && (
                  <div className="border border-outline-variant bg-surface-container-low p-5">
                    <h2 className="font-label-mono text-label-mono uppercase text-on-surface-variant mb-2">HOLD</h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">Held until {booking.holdExpiresAt ? new Date(booking.holdExpiresAt).toLocaleTimeString("en-GB") : "—"}; it lapses automatically.</p>
                    <button type="button" className={`${btn} bg-primary text-on-primary`} disabled={busy !== null} onClick={() => void act("confirm")}>Confirm</button>
                  </div>
                )}
                {open && (
                  <form className="border border-outline-variant bg-surface-container-low p-5 flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); const unitId = String(new FormData(e.currentTarget).get("unitId") ?? ""); if (unitId) void act("assign", { unitId }); }}>
                    <h2 className="font-label-mono text-label-mono uppercase text-on-surface-variant">ASSIGN CAR</h2>
                    <select name="unitId" className={input} defaultValue={booking.unit?.id ?? ""}>
                      {candidates.map((c) => (
                        <option key={c.id} value={c.id} disabled={!c.available && c.id !== booking.unit?.id}>{c.label}{c.available ? "" : ` — ${c.reason ?? "unavailable"}`}</option>
                      ))}
                    </select>
                    <button type="submit" className={`${btn} border border-outline text-on-surface self-start`} disabled={busy !== null}>Assign</button>
                  </form>
                )}
                {booking.status === "confirmed" && (
                  <form className="border border-outline-variant bg-surface-container-low p-5 flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); void act("check-out", { mileageKm: num(e.currentTarget, "mileageKm") }); }}>
                    <h2 className="font-label-mono text-label-mono uppercase text-on-surface-variant">CHECK-OUT (HANDOVER)</h2>
                    <label className="font-label-mono text-label-mono uppercase text-on-surface-variant flex flex-col gap-1">Odometer (km, optional)<input name="mileageKm" type="number" min={0} step={1} className={input} /></label>
                    <button type="submit" className={`${btn} bg-primary text-on-primary self-start`} disabled={busy !== null}>Hand over car</button>
                  </form>
                )}
                {booking.status === "checked_out" && (
                  <form className="border border-outline-variant bg-surface-container-low p-5 flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); void act("check-in", { mileageKm: num(e.currentTarget, "mileageKm"), needsService: fd.get("needsService") === "on", ...(String(fd.get("note") ?? "").trim() ? { note: String(fd.get("note")).trim() } : {}) }); }}>
                    <h2 className="font-label-mono text-label-mono uppercase text-on-surface-variant">CHECK-IN (RETURN)</h2>
                    <label className="font-label-mono text-label-mono uppercase text-on-surface-variant flex flex-col gap-1">Odometer (km)<input name="mileageKm" type="number" min={0} step={1} required className={input} /></label>
                    <label className="flex items-center gap-2 font-body-sm text-body-sm"><input name="needsService" type="checkbox" className="accent-primary" /> Send the car to maintenance</label>
                    <input name="note" maxLength={500} placeholder="Return note (optional)" className={input} />
                    <button type="submit" className={`${btn} bg-primary text-on-primary self-start`} disabled={busy !== null}>Take car back</button>
                  </form>
                )}
                {open && (
                  <form className="border border-outline-variant bg-surface-container-low p-5 flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); const reason = String(new FormData(e.currentTarget).get("reason") ?? "").trim(); void act("cancel", reason ? { reason } : {}); }}>
                    <h2 className="font-label-mono text-label-mono uppercase text-on-surface-variant">CANCEL</h2>
                    <input name="reason" maxLength={500} placeholder="Reason (shown to the patron)" className={input} />
                    <button type="submit" className={`${btn} border border-error text-error self-start`} disabled={busy !== null}>Cancel booking</button>
                  </form>
                )}
                <form className="border border-outline-variant bg-surface-container-low p-5 flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); const form = e.currentTarget; const note = String(new FormData(form).get("note") ?? "").trim(); if (note) void act("notes", { note }).then(() => form.reset()); }}>
                  <h2 className="font-label-mono text-label-mono uppercase text-on-surface-variant">STAFF NOTES</h2>
                  {booking.staffNotes.map((n, i) => (
                    <p key={i} className="font-body-sm text-body-sm text-on-surface"><span className="font-spec-numeral text-on-surface-variant">{new Date(n.at).toLocaleString("en-GB")}</span> — {n.note}</p>
                  ))}
                  <textarea name="note" maxLength={1000} rows={2} placeholder="Internal note (never shown to the patron)" className={input} />
                  <button type="submit" className={`${btn} border border-outline text-on-surface self-start`} disabled={busy !== null}>Add note</button>
                </form>
              </aside>
            </div>
          </div>
    </StaffChrome>
  );
}
