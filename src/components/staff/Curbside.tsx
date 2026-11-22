"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOutAction } from "@/app/actions/auth";
import { useStaffAction } from "@/components/staff/useStaffAction";
import { setSessionUser } from "@/lib/session";
import { STATE_TONE, type OpsView } from "@/lib/staffViews";

const input = "bg-surface text-on-surface border border-outline-variant px-3 py-2 font-body-sm text-body-sm w-full focus:outline-hidden focus:border-primary";

/**
 * Curbside console (Stitch "Curbside Staff", handheld) over live operations (M8): today's pick-ups and
 * returns at one hub, overdue cars, readiness and exceptions. Check-out and check-in are the M7 booking
 * actions, so the server re-checks everything (right booking, car in service at the hub, odometer never
 * lower) and records them in the booking history and the audit log.
 */
export function Curbside({ pickups, returns, overdue, hubs, hub, staffName, today, setupError }: { pickups: OpsView[]; returns: OpsView[]; overdue: OpsView[]; hubs: { code: string; iata: string; city: string }[]; hub?: string; staffName: string; today: string; setupError?: string }) {
  const router = useRouter();
  const { busy, error, run } = useStaffAction();
  const act = (ref: string, action: "check-out" | "check-in", body: Record<string, unknown>) => run(`${ref}-${action}`, `/api/v1/staff/bookings/${encodeURIComponent(ref)}/${action}`, body);
  const num = (f: HTMLFormElement, name: string) => {
    const v = String(new FormData(f).get(name) ?? "").trim();
    return v === "" ? undefined : Number(v);
  };

  const card = (r: OpsView, mode: "pickup" | "return") => (
    <li key={`${mode}-${r.reference}`} className="bg-surface-container-lowest border border-outline-variant p-4 flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <Link className="font-spec-numeral text-primary font-bold" href={`/staff/bookings/${r.reference}`}>{r.reference}</Link>
        <span className={`font-label-mono text-[10px] uppercase ${STATE_TONE[r.state]}`}>{r.stateLabel}</span>
      </div>
      <p className="font-body-md text-body-md text-on-surface">{r.customer}</p>
      <p className="font-body-sm text-body-sm text-on-surface-variant">
        {r.vehicleName} · {r.unit ?? "no car assigned"}
      </p>
      <p className="font-label-mono text-label-mono uppercase text-on-surface-variant">
        {mode === "pickup" ? `Pick-up ${r.pickupLocal} · ${r.pickupHub}` : `Return ${r.returnLocal} · ${r.returnHub}`}
      </p>
      {r.issues.length > 0 && <p className="font-body-sm text-body-sm text-[#956621]">{r.issues.join(" · ")}</p>}
      {mode === "pickup" && r.state === "ready" && (
        <form className="flex gap-2 items-end" onSubmit={(e) => { e.preventDefault(); void act(r.reference, "check-out", { mileageKm: num(e.currentTarget, "km") }); }}>
          <label className="flex-1 font-label-mono text-[10px] uppercase text-on-surface-variant">Odometer (km, optional)<input name="km" type="number" min={0} step={1} inputMode="numeric" className={input} /></label>
          <button type="submit" disabled={busy !== null} className="h-10 px-4 bg-primary text-on-primary font-action text-action uppercase disabled:opacity-50">Hand over</button>
        </form>
      )}
      {mode === "return" && (r.state === "return_expected" || r.state === "overdue") && (
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const f = e.currentTarget;
            const fd = new FormData(f);
            const note = String(fd.get("note") ?? "").trim();
            void act(r.reference, "check-in", { mileageKm: num(f, "km"), needsService: fd.get("service") === "on", ...(note ? { note } : {}) });
          }}
        >
          <label className="font-label-mono text-[10px] uppercase text-on-surface-variant">Odometer (km)<input name="km" type="number" min={0} step={1} required inputMode="numeric" className={input} /></label>
          <input name="note" maxLength={500} placeholder="Condition / damage notes" className={input} />
          <label className="flex items-center gap-2 font-body-sm text-body-sm"><input name="service" type="checkbox" className="accent-primary" /> Send to maintenance</label>
          <button type="submit" disabled={busy !== null} className="h-10 px-4 bg-primary text-on-primary font-action text-action uppercase disabled:opacity-50 self-start">Take car back</button>
        </form>
      )}
    </li>
  );

  const section = (title: string, rows: OpsView[], mode: "pickup" | "return", empty: string) => (
    <section className="flex flex-col gap-3">
      <h2 className="font-label-mono text-label-mono uppercase text-on-surface-variant">{`${title} (${rows.length})`}</h2>
      {rows.length === 0 ? <p className="font-body-sm text-body-sm text-on-surface-variant border-y border-outline-variant py-3">{empty}</p> : <ul className="flex flex-col gap-3">{rows.map((r) => card(r, mode))}</ul>}
    </section>
  );

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md">
      <header className="sticky top-0 z-30 bg-on-tertiary-fixed text-inverse-on-surface px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="font-headline-sm text-headline-sm tracking-widest uppercase">HALDEN</span>
          <span className="block font-label-mono text-[10px] uppercase text-on-tertiary-container">Curbside · {today}</span>
        </div>
        <div className="flex items-center gap-3 font-label-mono text-label-mono uppercase">
          <Link className="underline underline-offset-4" href="/staff">Console</Link>
          <form action={signOutAction} onSubmit={() => setSessionUser(null)}>
            <button type="submit" className="underline underline-offset-4">Sign out ({staffName})</button>
          </form>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-5 flex flex-col gap-6 pb-24">
        <div className="flex flex-wrap gap-2">
          <select aria-label="Hub" className="flex-1 min-w-[180px] bg-surface-container-low border border-outline-variant px-3 py-2 font-label-mono text-label-mono uppercase" value={hub ?? ""} onChange={(e) => router.push(e.target.value ? `/staff/curbside?hub=${e.target.value}` : "/staff/curbside")}>
            <option value="">All hubs</option>
            {hubs.map((h) => (
              <option key={h.code} value={h.code}>{`${h.iata} — ${h.city}`}</option>
            ))}
          </select>
          <form
            className="flex gap-2 flex-1 min-w-[220px]"
            onSubmit={(e) => {
              e.preventDefault();
              const ref = String(new FormData(e.currentTarget).get("ref") ?? "").trim().toUpperCase();
              if (ref) router.push(`/staff/bookings/${encodeURIComponent(ref)}`);
            }}
          >
            <input name="ref" aria-label="Booking reference" placeholder="HLD-0000-XXXX" className="flex-1 bg-surface-container-low border border-outline-variant px-3 py-2 font-spec-numeral uppercase" />
            <button type="submit" className="px-4 bg-primary text-on-primary font-action text-action uppercase">Open</button>
          </form>
        </div>
        {setupError && <p role="alert" className="font-body-sm text-body-sm text-error">{setupError}</p>}
        {error && <p role="alert" className="font-body-sm text-body-sm text-error">{error}</p>}
        {section("Overdue", overdue, "return", "No car is overdue.")}
        {section("Pick-ups today", pickups, "pickup", "No pick-ups today.")}
        {section("Returns today", returns, "return", "No returns today.")}
      </main>
    </div>
  );
}
