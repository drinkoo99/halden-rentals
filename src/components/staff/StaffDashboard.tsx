"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { StaffChrome } from "@/components/staff/StaffChrome";
import { STATE_TONE, type DashboardView, type OpsView } from "@/lib/staffViews";

/**
 * Staff Console: Operations Overview (Stitch) over live data (M8): today's pick-ups and returns (each hub's
 * own calendar day), rentals out, overdue returns, exceptions, the next 48 hours and the fleet by hub.
 * Every row opens its booking; every count comes from the database — nothing here is illustrative.
 */
export function StaffDashboard({ view, hubs, hub, staffName, today, setupError }: { view: DashboardView | null; hubs: { code: string; iata: string; city: string }[]; hub?: string; staffName: string; today: string; setupError?: string }) {
  const router = useRouter();
  const kpi = (label: string, value: number, tone = "text-on-surface", href?: string) => {
    const body = (
      <>
        <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">{label}</span>
        <span className={`font-spec-numeral text-[28px] leading-none font-bold mt-2 ${tone}`}>{String(value).padStart(2, "0")}</span>
      </>
    );
    return href ? (
      <Link href={href} className="bg-surface-container-low px-5 py-4 flex flex-col hover:bg-surface-container transition-colors">
        {body}
      </Link>
    ) : (
      <div className="bg-surface-container-low px-5 py-4 flex flex-col">{body}</div>
    );
  };
  return (
    <StaffChrome section="overview" staffName={staffName} today={today}>
      <div className="flex flex-col w-full pb-24">
        <div className="pt-6 pb-5 border-b border-outline-variant flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="font-label-mono text-label-mono uppercase text-primary font-bold tracking-widest">OPERATIONS</p>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Today at HALDEN</h1>
          </div>
          <select aria-label="Hub" className="bg-surface-container-low text-on-surface border border-outline-variant px-3 py-1.5 font-label-mono text-label-mono uppercase" value={hub ?? ""} onChange={(e) => router.push(e.target.value ? `/staff?hub=${e.target.value}` : "/staff")}>
            <option value="">All hubs</option>
            {hubs.map((h) => (
              <option key={h.code} value={h.code}>{`${h.iata} — ${h.city}`}</option>
            ))}
          </select>
        </div>
        {setupError && (
          <p role="alert" className="font-body-sm text-body-sm text-error mt-4">
            {setupError}
          </p>
        )}
        {view && (
          <>
            <section aria-label="Today" className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-px bg-outline-variant border border-outline-variant mt-6">
              {kpi("Pick-ups today", view.pickupsToday.length, "text-on-surface", "/staff/curbside")}
              {kpi("Returns today", view.returnsToday.length, "text-on-surface", "/staff/curbside")}
              {kpi("On rent", view.activeRentals, "text-on-surface", "/staff/bookings?status=checked_out")}
              {kpi("Overdue", view.overdue.length, view.overdue.length ? "text-error" : "text-on-surface")}
              {kpi("Needs attention", view.attention.length, view.attention.length ? "text-[#956621]" : "text-on-surface")}
              {kpi("Cars available", view.fleet.available, "text-primary", "/staff/fleet?status=available")}
              {kpi("Cars rented", view.fleet.rented, "text-on-surface", "/staff/fleet?status=rented")}
              {kpi("In maintenance", view.fleet.maintenance, view.fleet.maintenance ? "text-[#956621]" : "text-on-surface", "/staff/fleet?status=maintenance")}
            </section>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
              <OpsList title="Needs attention" rows={view.attention} empty="Nothing needs attention in the next 48 hours." showIssues />
              <OpsList title="Overdue returns" rows={view.overdue} empty="No rental is overdue." when="return" />
              <OpsList title="Pick-ups today" rows={view.pickupsToday} empty="No pick-ups today." />
              <OpsList title="Returns today" rows={view.returnsToday} empty="No returns today." when="return" />
              <OpsList title="Upcoming pick-ups · 48 h" rows={view.upcomingPickups} empty="No pick-ups in the next 48 hours." />
              <OpsList title="Upcoming returns · 48 h" rows={view.upcomingReturns} empty="No returns in the next 48 hours." when="return" />
              <OpsList title="Recently booked · 48 h" rows={view.recent} empty="No new bookings in the last 48 hours." />
              <section>
                <h2 className="font-label-mono text-label-mono uppercase text-on-surface-variant mb-2">Fleet by hub</h2>
                {Object.keys(view.fleetByHub).length === 0 ? (
                  <p className="font-body-sm text-body-sm text-on-surface-variant border-y border-outline-variant py-4">No cars registered{hub ? " at this hub" : ""}.</p>
                ) : (
                  <table className="w-full text-left border-collapse font-body-sm text-body-sm">
                    <thead>
                      <tr className="border-b border-outline-variant font-label-mono text-label-mono uppercase text-on-surface-variant">
                        <th className="py-2 font-normal">Hub</th>
                        <th className="py-2 font-normal text-right">Available</th>
                        <th className="py-2 font-normal text-right">Rented</th>
                        <th className="py-2 font-normal text-right">Maintenance</th>
                        <th className="py-2 font-normal text-right">Retired</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                      {Object.entries(view.fleetByHub).map(([code, c]) => (
                        <tr key={code}>
                          <td className="py-2">
                            <Link className="hover:underline" href={`/staff/fleet?location=${code}`}>{code.toUpperCase()}</Link>
                          </td>
                          <td className="py-2 text-right font-spec-numeral text-primary">{c.available}</td>
                          <td className="py-2 text-right font-spec-numeral">{c.rented}</td>
                          <td className="py-2 text-right font-spec-numeral">{c.maintenance}</td>
                          <td className="py-2 text-right font-spec-numeral text-on-surface-variant">{c.inactive}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {view.maintenance.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-label-mono text-label-mono uppercase text-on-surface-variant mb-1">In maintenance</h3>
                    <ul className="font-body-sm text-body-sm divide-y divide-outline-variant border-y border-outline-variant">
                      {view.maintenance.map((m) => (
                        <li key={m.id} className="py-2 flex justify-between gap-4">
                          <span>{m.label}</span>
                          <span className="font-label-mono text-label-mono text-on-surface-variant">{m.hub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            </div>
          </>
        )}
      </div>
    </StaffChrome>
  );
}

function OpsList({ title, rows, empty, when = "pickup", showIssues = false }: { title: string; rows: OpsView[]; empty: string; when?: "pickup" | "return"; showIssues?: boolean }) {
  return (
    <section>
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="font-label-mono text-label-mono uppercase text-on-surface-variant">{title}</h2>
        <span className="font-label-mono text-label-mono text-outline">{String(rows.length).padStart(2, "0")}</span>
      </div>
      {rows.length === 0 ? (
        <p className="font-body-sm text-body-sm text-on-surface-variant border-y border-outline-variant py-4">{empty}</p>
      ) : (
        <ul className="divide-y divide-outline-variant border-y border-outline-variant">
          {rows.map((r) => (
            <li key={`${title}-${r.reference}`}>
              <Link href={`/staff/bookings/${r.reference}`} className="grid grid-cols-[8.5rem_1fr_auto] gap-3 py-2.5 px-1 hover:bg-surface-container-low transition-colors font-body-sm text-body-sm">
                <span className="font-spec-numeral text-primary font-bold">{r.reference}</span>
                <span className="min-w-0">
                  <span className="block text-on-surface truncate">
                    {r.customer} · {r.vehicleName}
                  </span>
                  <span className="block font-label-mono text-[10px] uppercase text-on-surface-variant">
                    {when === "pickup" ? `${r.pickupHub} · ${r.pickupLocal}` : `${r.returnHub} · ${r.returnLocal}`}
                    {r.unit ? ` · ${r.unit}` : ""}
                  </span>
                  {showIssues && r.issues.length > 0 && <span className="block text-[#956621]">{r.issues.join(" · ")}</span>}
                </span>
                <span className={`font-label-mono text-[10px] uppercase ${STATE_TONE[r.state]}`}>{r.stateLabel}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
