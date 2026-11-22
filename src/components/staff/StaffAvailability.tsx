"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export type PlannerCell = { kind: "free" | "booked" | "rented" | "held" | "blocked" | "out"; reference?: string; title?: string };
export type PlannerRow = { unitId: string; unitCode: string; registration: string; model: string; hub: string; cells: PlannerCell[] };

const CELL: Record<PlannerCell["kind"], string> = {
  free: "bg-surface-container-lowest",
  held: "bg-[#F9F5EC] border-[#C98A2C]",
  booked: "bg-primary",
  rented: "bg-tertiary",
  blocked: "bg-[repeating-linear-gradient(45deg,#E8E4DA,#E8E4DA_4px,#F5F3EE_4px,#F5F3EE_8px)]",
  out: "bg-surface-container",
};
const LEGEND: [PlannerCell["kind"], string][] = [
  ["free", "Free"],
  ["held", "On hold"],
  ["booked", "Confirmed"],
  ["rented", "On rent"],
  ["blocked", "Maintenance / blocked"],
  ["out", "Out of service"],
];

/**
 * Staff Console: Availability Planner (Stitch) over real data (M7): every car for the next 14 days, each day
 * coloured by what occupies it — bookings (held, confirmed, on rent), maintenance blocks, or the car being out
 * of service. A cell links to its booking. Hub filter in the URL (?location=).
 */
export function StaffAvailability({ rows, days, hubs, location, staffName, today, setupError }: { rows: PlannerRow[]; days: string[]; hubs: { code: string; iata: string; city: string }[]; location?: string; staffName: string; today: string; setupError?: string }) {
  const router = useRouter();
  const busy = rows.reduce((n, r) => n + r.cells.filter((c) => c.kind === "booked" || c.kind === "rented" || c.kind === "held").length, 0);
  const total = rows.length * days.length;
  return (
    <div className="bg-surface font-body-md text-on-surface">
      <aside aria-label="Console navigation" className="fixed left-0 top-0 h-full w-60 bg-on-tertiary-fixed text-inverse-on-surface z-50 flex flex-col border-r border-tertiary">
        <div className="h-14 px-6 flex items-center border-b border-tertiary"><span className="font-headline-sm text-headline-sm tracking-widest uppercase text-inverse-on-surface">HALDEN</span></div>
        <div className="px-4 py-4 border-b border-tertiary">
          <label className="block font-label-mono text-label-mono uppercase text-on-tertiary-container mb-2">ACTIVE HUB</label>
          <select aria-label="Active hub" className="w-full bg-tertiary text-on-tertiary font-label-mono text-label-mono uppercase px-3 py-2 rounded-none border border-tertiary-container focus:outline-hidden focus:border-primary-fixed">
            <option value="all">ALL HUBS</option>
            <option value="muc">MUC — MUNICH</option>
            <option value="zrh">ZRH — ZURICH</option>
            <option value="gva">GVA — GENEVA</option>
            <option value="mxp">MXP — MILAN</option>
            <option value="vie">VIE — VIENNA</option>
          </select>
        </div>
        <nav className="flex-1 py-4 flex flex-col gap-1">
          <Link className="px-6 py-2.5 font-label-mono text-label-mono uppercase text-on-tertiary-container hover:bg-tertiary hover:text-on-tertiary transition-colors" href="/staff">OVERVIEW</Link>
          <Link className="px-6 py-2.5 font-label-mono text-label-mono uppercase bg-primary text-on-primary font-bold transition-colors" href="/staff/bookings">BOOKINGS</Link>
          <Link className="px-6 py-2.5 font-label-mono text-label-mono uppercase text-on-tertiary-container hover:bg-tertiary hover:text-on-tertiary transition-colors" href="/staff/fleet">FLEET</Link>
          <Link className="px-6 py-2.5 font-label-mono text-label-mono uppercase text-on-tertiary-container hover:bg-tertiary hover:text-on-tertiary transition-colors" href="/staff/availability">AVAILABILITY</Link>
          <Link className="px-6 py-2.5 font-label-mono text-label-mono uppercase text-on-tertiary-container hover:bg-tertiary hover:text-on-tertiary transition-colors" href="/staff/customers">CUSTOMERS</Link>
          <Link className="px-6 py-2.5 font-label-mono text-label-mono uppercase text-on-tertiary-container hover:bg-tertiary hover:text-on-tertiary transition-colors" href="/staff/fleet">PRICING</Link>
          <Link className="px-6 py-2.5 font-label-mono text-label-mono uppercase text-on-tertiary-container hover:bg-tertiary hover:text-on-tertiary transition-colors" href="/staff">SETTINGS</Link>
        </nav>
        <div className="px-6 py-4 border-t border-tertiary"><span className="font-label-mono text-label-mono uppercase text-on-tertiary-container">CONSOLE V2.4</span></div>
      </aside>
      <div className="pl-60">
        <header className="fixed top-0 left-60 right-0 h-14 bg-surface border-b border-outline-variant z-40 px-8 flex items-center justify-between">
          <div className="flex items-center w-96">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
              <input className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm pl-9 pr-3 py-1.5 rounded-none border border-outline-variant focus:outline-hidden focus:border-primary placeholder:text-on-surface-variant" placeholder="Search booking ref, plate, customer..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">{today}</span>
            <button aria-label="Notifications" className="relative flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-error rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-outline-variant">
              <span className="font-body-sm text-body-sm text-on-surface">{staffName}</span>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div>
            </div>
          </div>
        </header>
        <main className="relative pt-14 w-full px-8 bg-surface">
          <div className="flex flex-col w-full pb-16">
            <div className="pt-6 pb-5 border-b border-outline-variant flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Availability</h1>
                <p className="font-label-mono text-label-mono uppercase text-on-surface-variant mt-1">{`NEXT 14 DAYS // ${rows.length} CARS // ${total ? Math.round((busy / total) * 100) : 0}% BOOKED`}</p>
              </div>
              <select aria-label="Filter by hub" className="bg-surface-container-low text-on-surface border border-outline-variant px-3 py-1.5 font-label-mono text-label-mono uppercase" value={location ?? ""} onChange={(e) => router.push(e.target.value ? `/staff/availability?location=${e.target.value}` : "/staff/availability")}>
                <option value="">All hubs</option>
                {hubs.map((h) => (
                  <option key={h.code} value={h.code}>{`${h.iata} — ${h.city}`}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap gap-4 py-4 font-label-mono text-label-mono uppercase text-on-surface-variant">
              {LEGEND.map(([k, label]) => (
                <span key={k} className="flex items-center gap-2"><span className={`w-4 h-3 border border-outline-variant ${CELL[k]}`} />{label}</span>
              ))}
            </div>
            {setupError && <p role="alert" className="font-body-sm text-body-sm text-error">{setupError}</p>}
            {rows.length === 0 ? (
              <div className="w-full mt-4 bg-surface-container-low border border-outline-variant p-10 text-center">
                <h2 className="font-headline-md text-headline-md text-on-surface mb-2">No cars to plan.</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">Register cars in the fleet register to see their availability here.</p>
              </div>
            ) : (
              <section className="w-full overflow-x-auto pb-16">
                <table className="border-collapse text-left">
                  <thead>
                    <tr className="font-label-mono text-[10px] uppercase text-on-surface-variant">
                      <th className="py-2 pr-4 font-normal min-w-[240px] sticky left-0 bg-surface">CAR</th>
                      {days.map((d) => (
                        <th key={d} className="py-2 px-0.5 font-normal text-center w-12">{d}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.unitId} className="border-t border-outline-variant">
                        <td className="py-2 pr-4 sticky left-0 bg-surface">
                          <div className="font-body-sm text-body-sm text-on-surface">{r.model}</div>
                          <div className="font-label-mono text-[10px] text-on-surface-variant uppercase">{r.unitCode} · {r.registration} · {r.hub}</div>
                        </td>
                        {r.cells.map((c, i) => (
                          <td key={i} className="p-0.5">
                            {c.reference ? (
                              <Link href={`/staff/bookings/${c.reference}`} title={c.title} className={`block h-8 border border-outline-variant ${CELL[c.kind]}`}>
                                <span className="sr-only">{c.title}</span>
                              </Link>
                            ) : (
                              <span title={c.title} className={`block h-8 border border-outline-variant ${CELL[c.kind]}`} />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
