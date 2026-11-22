"use client";

import Link from "next/link";
import { StaffChrome } from "@/components/staff/StaffChrome";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { FLEET_STATUSES, STATUS_TRANSITIONS, type FleetStatus } from "@/server/fleet/statuses";

export type FleetRow = {
  id: string;
  unitCode: string;
  modelSlug: string;
  registration: string;
  vin?: string;
  locationCode: string;
  status: FleetStatus;
  mileageKm: number;
  year: number;
  notes?: string;
  /** next held/confirmed booking of this car (reference and hub-local pick-up) */
  next?: { reference: string; label: string };
  /** share of the last 14 days the car was booked or on rent, 0–100 (null when bookings are not set up) */
  utilisation?: number | null;
};
export type FleetModel = { slug: string; name: string; image: string; specLine: string; categoryLabel: string; pricePerDay: number };
export type FleetHub = { code: string; iata: string; city: string };
export type FleetFilters = { location?: string; status?: FleetStatus; model?: string };

const STATUS_LABEL: Record<FleetStatus, string> = { available: "AVAILABLE", rented: "ON RENT", maintenance: "IN SERVICE", inactive: "RETIRED" };
const STATUS_BADGE: Record<FleetStatus, { badge: string; dot: string }> = {
  available: { badge: "bg-primary text-on-primary", dot: "bg-primary-fixed" },
  rented: { badge: "bg-tertiary text-inverse-on-surface", dot: "bg-[#34A853] animate-pulse" },
  maintenance: { badge: "bg-[#F9F5EC] border border-[#C98A2C] text-[#956621]", dot: "bg-[#C98A2C]" },
  inactive: { badge: "bg-surface-container border border-outline-variant text-on-surface-variant", dot: "bg-outline" },
};
const NEEDS_RESERVATIONS = "Booking data is not available on this database yet";
const selectCls =
  "appearance-none bg-surface-container-low text-on-surface border border-outline-variant pl-3 pr-8 py-1.5 rounded-none font-label-mono text-label-mono uppercase focus:outline-hidden focus:border-primary cursor-pointer";
const fieldCls = "w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm px-3 py-2 border border-outline-variant rounded-none focus:outline-hidden focus:border-primary";

async function call(url: string, method: string, body?: unknown): Promise<string | null> {
  const res = await fetch(url, { method, headers: body ? { "content-type": "application/json" } : {}, body: body ? JSON.stringify(body) : undefined, credentials: "same-origin" });
  if (res.ok) return null;
  const err = (await res.json().catch(() => null)) as { error?: { message?: string; details?: { path: string; message: string }[] } } | null;
  const detail = err?.error?.details?.map((d) => `${d.path}: ${d.message}`).join("; ");
  return [err?.error?.message ?? "The request failed.", detail].filter(Boolean).join(" — ");
}

/** Stitch screen "HALDEN — Operations Console" — generated from design/stitch-export-round2/halden_staff_console_fleet_management/code.html */
/**
 * Staff Console: Fleet Management (Stitch "HALDEN — Operations Console") over the real fleet register (M6).
 * Units come from the fleetUnits collection (server-rendered, filtered by the URL); adding a car, changing
 * its status and reassigning its hub go through /api/v1/staff/fleet. Allocation and utilisation need
 * reservations and are shown as pending until the booking engine (M7).
 */
export function StaffFleet({ units, models, hubs, filters, staffName, today, setupError }: { units: FleetRow[]; models: FleetModel[]; hubs: FleetHub[]; filters: FleetFilters; staffName: string; today: string; setupError?: string }) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const modelOf = (slug: string) => models.find((m) => m.slug === slug);
  const hubOf = (code: string) => hubs.find((h) => h.code === code);
  const counts = { total: units.length, available: units.filter((u) => u.status === "available").length, service: units.filter((u) => u.status === "maintenance").length };
  const filtered = Boolean(filters.location || filters.status || filters.model);
  const measured = units.filter((u) => typeof u.utilisation === "number");
  const allocated = measured.length ? Math.round(measured.reduce((s, u) => s + (u.utilisation ?? 0), 0) / measured.length) : null;

  function setFilter(key: keyof FleetFilters, value: string) {
    const next = new URLSearchParams(Object.entries({ ...filters, [key]: value }).filter(([, v]) => v) as [string, string][]);
    router.push(next.size ? `/staff/fleet?${next}` : "/staff/fleet");
  }

  async function act(id: string, url: string, method: string, body: unknown): Promise<boolean> {
    setBusy(id);
    setError(null);
    const problem = await call(url, method, body);
    setBusy(null);
    if (problem) {
      setError(problem);
      return false;
    }
    router.refresh();
    return true;
  }

  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const text = (k: string) => String(form.get(k) ?? "").trim();
    const body = {
      modelSlug: text("modelSlug"),
      registration: text("registration"),
      ...(text("vin") ? { vin: text("vin") } : {}),
      locationCode: text("locationCode"),
      mileageKm: Number(text("mileageKm")),
      year: Number(text("year")),
      status: text("status"),
      ...(text("notes") ? { notes: text("notes") } : {}),
    };
    if (await act("new", "/api/v1/staff/fleet", "POST", body)) setAdding(false);
  }

  return (
    <StaffChrome section="fleet" staffName={staffName} today={today}>
          <div className="flex flex-col w-full pb-32">
            {/* Page Header & Exhibition Ledger Banner */}
            <section className="w-full pt-8 pb-6 border-b border-outline-variant flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-label-mono text-label-mono text-primary font-bold uppercase tracking-widest">ARCHIVE LEDGER</span>
                  <span className="text-outline-variant">/</span>
                  <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">{`[${counts.total} CHASSIS LOGGED // ${counts.available} AVAILABLE]`}</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface font-normal tracking-tight">Fleet</h1>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">Curatorial ledger, mechanical allocation, and chassis custody matrix across European alpine stations.</p>
              </div>
              {/* Quick Stats Metric Ticker */}
              <div className="flex items-stretch gap-px bg-outline-variant">
                <div className="bg-surface-container-low px-5 py-3 flex flex-col">
                  <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">AVAILABLE</span>
                  <span className="font-spec-numeral text-spec-numeral text-on-surface font-bold mt-1">
                    {String(counts.available).padStart(2, "0")}{" "}
                    <span className="font-normal text-on-surface-variant text-[11px]">OF {counts.total}</span>
                  </span>
                </div>
                <div className="bg-surface-container-low px-5 py-3 flex flex-col">
                  <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">ALLOCATED</span>
                  <span className="font-spec-numeral text-spec-numeral text-primary font-bold mt-1" title={allocated === null ? NEEDS_RESERVATIONS : "Average share of the last 14 days booked or on rent"}>{allocated === null ? "—" : `${allocated}%`}</span>
                </div>
                <div className="bg-surface-container-low px-5 py-3 flex flex-col">
                  <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">SCHEDULED SRV</span>
                  <span className="font-spec-numeral text-spec-numeral text-[#956621] font-bold mt-1">{String(counts.service).padStart(2, "0")} CHASSIS</span>
                </div>
              </div>
            </section>
            {/* Curatorial Filter Toolbar */}
            <section className="w-full py-5 border-b border-outline-variant flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2 pt-1 font-label-mono text-label-mono">
                <span className="text-on-surface-variant uppercase mr-1">CRITERIA:</span>
                <div className="relative inline-block">
                  <select aria-label="Filter by hub" className={selectCls} value={filters.location ?? ""} onChange={(e) => setFilter("location", e.target.value)}>
                    <option value="">Hub: All Hubs ({hubs.length})</option>
                    {hubs.map((h) => (
                      <option key={h.code} value={h.code}>{`Hub: ${h.iata} — ${h.city}`}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[16px] text-on-surface-variant">expand_more</span>
                </div>
                <div className="relative inline-block">
                  <select aria-label="Filter by status" className={filters.status ? selectCls.replace("bg-surface-container-low text-on-surface border-outline-variant", "bg-primary text-on-primary border-primary") : selectCls} value={filters.status ?? ""} onChange={(e) => setFilter("status", e.target.value)}>
                    <option value="">Status: All Statuses</option>
                    {FLEET_STATUSES.map((s) => (
                      <option key={s} value={s}>{`Status: ${STATUS_LABEL[s]}`}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[16px] text-on-surface-variant">expand_more</span>
                </div>
                <div className="relative inline-block">
                  <select aria-label="Filter by model" className={selectCls} value={filters.model ?? ""} onChange={(e) => setFilter("model", e.target.value)}>
                    <option value="">Model: All Models</option>
                    {models.map((m) => (
                      <option key={m.slug} value={m.slug}>{`Model: ${m.name}`}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[16px] text-on-surface-variant">expand_more</span>
                </div>
                {filtered && (
                  <button className="text-on-surface-variant hover:text-on-surface underline underline-offset-4 ml-auto text-label-mono uppercase transition-colors" type="button" onClick={() => router.push("/staff/fleet")}>
                    Clear filters
                  </button>
                )}
                <button className="flex items-center gap-2 px-5 py-2.5 bg-primary-container text-surface-bright hover:bg-primary font-action text-action uppercase tracking-wider transition-colors duration-150 ml-auto disabled:opacity-60" type="button" onClick={() => setAdding((a) => !a)} disabled={Boolean(setupError)} aria-expanded={adding}>
                  <span className="material-symbols-outlined text-[18px]">{adding ? "close" : "add"}</span>
                  <span>{adding ? "Close" : "Add Vehicle"}</span>
                </button>
              </div>
              {adding && (
                <form className="grid grid-cols-2 lg:grid-cols-4 gap-3 bg-surface-container-lowest border border-outline-variant p-4" onSubmit={add}>
                  <label className="flex flex-col gap-1 font-label-mono text-label-mono uppercase text-on-surface-variant">Model
                    <select name="modelSlug" required className={fieldCls} defaultValue={filters.model ?? models[0]?.slug}>
                      {models.map((m) => <option key={m.slug} value={m.slug}>{m.name}</option>)}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1 font-label-mono text-label-mono uppercase text-on-surface-variant">Plate
                    <input name="registration" required maxLength={15} className={fieldCls} placeholder="ZH 91104" />
                  </label>
                  <label className="flex flex-col gap-1 font-label-mono text-label-mono uppercase text-on-surface-variant">VIN (optional)
                    <input name="vin" maxLength={17} className={fieldCls} placeholder="17 characters" />
                  </label>
                  <label className="flex flex-col gap-1 font-label-mono text-label-mono uppercase text-on-surface-variant">Hub
                    <select name="locationCode" required className={fieldCls} defaultValue={filters.location ?? hubs[0]?.code}>
                      {hubs.map((h) => <option key={h.code} value={h.code}>{`${h.iata} — ${h.city}`}</option>)}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1 font-label-mono text-label-mono uppercase text-on-surface-variant">Odometer (km)
                    <input name="mileageKm" type="number" min={0} step={1} required className={fieldCls} defaultValue={0} />
                  </label>
                  <label className="flex flex-col gap-1 font-label-mono text-label-mono uppercase text-on-surface-variant">Year
                    <input name="year" type="number" min={1950} max={2100} required className={fieldCls} defaultValue={new Date().getFullYear()} />
                  </label>
                  <label className="flex flex-col gap-1 font-label-mono text-label-mono uppercase text-on-surface-variant">Initial status
                    <select name="status" className={fieldCls} defaultValue="available">
                      {(["available", "maintenance", "inactive"] as const).map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1 font-label-mono text-label-mono uppercase text-on-surface-variant">Notes
                    <input name="notes" maxLength={1000} className={fieldCls} />
                  </label>
                  <div className="col-span-2 lg:col-span-4 flex justify-end">
                    <button className="px-5 py-2.5 bg-primary text-on-primary font-action text-action uppercase tracking-wider disabled:opacity-60" type="submit" disabled={busy === "new"} aria-busy={busy === "new"}>
                      {busy === "new" ? "Registering…" : "Register vehicle"}
                    </button>
                  </div>
                </form>
              )}
              {(error || setupError) && (
                <p role="alert" className="font-body-sm text-body-sm text-error">
                  {setupError ?? error}
                </p>
              )}
            </section>
            {units.length === 0 ? (
              <section className="w-full mt-8">
                <div className="w-full bg-surface-container-low border border-outline-variant p-8 md:p-12 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-surface flex items-center justify-center border border-outline-variant mb-4"><span className="material-symbols-outlined text-outline text-[24px]">{filtered ? "filter_alt_off" : "garage"}</span></div>
                  <h2 className="font-headline-md text-headline-md text-on-surface max-w-xl mb-3">{filtered ? "No fleet units match these filters." : "No fleet units registered yet."}</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-6">
                    {filtered ? "Adjust the hub, status or model filter, or clear them." : "Register each physical car with Add Vehicle: model, plate, hub and odometer reading."}
                  </p>
                  {filtered && (
                    <button className="px-5 py-2.5 bg-surface text-on-surface border border-outline hover:border-primary font-action text-action uppercase tracking-wider transition-colors inline-flex items-center gap-2" type="button" onClick={() => router.push("/staff/fleet")}>
                      <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                      <span>Clear Filters</span>
                    </button>
                  )}
                </div>
              </section>
            ) : (
              <section className="w-full mt-4 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant bg-surface-container-low font-label-mono text-label-mono uppercase text-on-surface-variant">
                      <th className="py-3 px-4 font-normal tracking-wider w-28">UNIT №</th>
                      <th className="py-3 px-4 font-normal tracking-wider min-w-[300px]">{"CHASSIS & SPECIFICATION"}</th>
                      <th className="py-3 px-4 font-normal tracking-wider w-28">PLATE</th>
                      <th className="py-3 px-4 font-normal tracking-wider w-32">HUB</th>
                      <th className="py-3 px-4 font-normal tracking-wider w-32">CATEGORY</th>
                      <th className="py-3 px-4 font-normal tracking-wider w-40">STATUS</th>
                      <th className="py-3 px-4 font-normal tracking-wider text-right w-24">DAY RATE</th>
                      <th className="py-3 px-4 font-normal tracking-wider w-28">ODOMETER</th>
                      <th className="py-3 px-4 font-normal tracking-wider min-w-[160px]">NEXT ALLOCATION</th>
                      <th className="py-3 px-4 font-normal tracking-wider w-36">14D UTILISATION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant font-body-sm text-body-sm">
                    {units.map((u) => {
                      const m = modelOf(u.modelSlug);
                      const hub = hubOf(u.locationCode);
                      const badge = STATUS_BADGE[u.status];
                      return (
                        <tr key={u.id} className="bg-surface-container-lowest hover:bg-surface-container-low transition-colors group" aria-busy={busy === u.id}>
                          <td className="py-4 px-4 font-spec-numeral text-spec-numeral text-on-surface-variant">{u.unitCode}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-4">
                              {m && <div className="w-20 h-13 shrink-0 overflow-hidden bg-surface-container border border-outline-variant"><Photo src={m.image} alt="" className="w-full h-full object-cover object-center" sizes="80px" /></div>}
                              <div className="min-w-0 flex flex-col">
                                <span className="font-headline-sm text-[17px] leading-tight text-on-surface font-normal">{m?.name ?? u.modelSlug}</span>
                                <span className="font-label-mono text-label-mono text-on-surface-variant uppercase mt-1">{[u.year, m?.specLine].filter(Boolean).join(" · ")}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-spec-numeral text-spec-numeral text-on-surface">{u.registration}</td>
                          <td className="py-4 px-4">
                            <select aria-label={`Hub of ${u.registration}`} className="bg-surface-container border border-outline-variant text-on-surface font-label-mono text-label-mono px-2 py-0.5 disabled:opacity-60" value={u.locationCode} disabled={u.status === "rented" || busy === u.id} title={u.status === "rented" ? "A rented car is reassigned when it is returned" : "Reassign to another hub"} onChange={(e) => act(u.id, `/api/v1/staff/fleet/${u.id}`, "PATCH", { locationCode: e.target.value })}>
                              {(hub ? hubs : [...hubs, { code: u.locationCode, iata: u.locationCode.toUpperCase(), city: "" }]).map((h) => <option key={h.code} value={h.code}>{h.iata}</option>)}
                            </select>
                          </td>
                          <td className="py-4 px-4 text-on-surface-variant">{m?.categoryLabel ?? "—"}</td>
                          <td className="py-4 px-4">
                            <label className={`relative inline-flex items-center gap-1.5 px-2.5 py-1 font-label-mono text-[10px] uppercase tracking-wider ${badge.badge}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                              <span className="sr-only">Status of {u.registration}</span>
                              <select className="appearance-none bg-transparent uppercase cursor-pointer focus:outline-hidden pr-1" value={u.status} disabled={busy === u.id} onChange={(e) => act(u.id, `/api/v1/staff/fleet/${u.id}/status`, "POST", { status: e.target.value })}>
                                {[u.status, ...STATUS_TRANSITIONS[u.status]].map((s) => <option key={s} value={s} className="text-on-surface bg-surface">{STATUS_LABEL[s]}</option>)}
                              </select>
                            </label>
                          </td>
                          <td className="py-4 px-4 text-right font-spec-numeral text-spec-numeral text-on-surface font-bold">{m ? `€${m.pricePerDay}` : "—"}</td>
                          <td className="py-4 px-4 font-spec-numeral text-spec-numeral text-on-surface-variant">{u.mileageKm.toLocaleString("de-CH")} km</td>
                          <td className="py-4 px-4">
                            {u.next ? (
                              <Link className="flex flex-col hover:underline" href={`/staff/bookings/${u.next.reference}`}>
                                <span className="font-spec-numeral text-spec-numeral text-primary">{u.next.reference}</span>
                                <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">{u.next.label}</span>
                              </Link>
                            ) : (
                              <span className="text-on-surface-variant" title={u.utilisation === null ? NEEDS_RESERVATIONS : "No upcoming booking"}>—</span>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            {typeof u.utilisation === "number" ? (
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-1.5 bg-surface-container overflow-hidden"><div className="h-full bg-primary" style={{ width: `${u.utilisation}%` }} /></div>
                                <span className="font-label-mono text-[11px] text-on-surface-variant">{u.utilisation}%</span>
                              </div>
                            ) : (
                              <span className="text-on-surface-variant" title={NEEDS_RESERVATIONS}>—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>
            )}
            <section className="w-full py-4 border-t border-outline-variant mt-2">
              <div className="font-label-mono text-label-mono text-on-surface-variant uppercase">{`SHOWING ${units.length} FLEET UNIT${units.length === 1 ? "" : "S"}`}</div>
            </section>
          </div>
    </StaffChrome>
  );
}
