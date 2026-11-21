import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";

/** Stitch screen "HALDEN — Operations Console" — generated from design/stitch-export-round2/halden_staff_console_vehicle_editor/code.html */
export function StaffVehicleEditor() {
  return (
    <div className="bg-surface font-body-md text-on-surface">
      <aside className="fixed left-0 top-0 h-full w-60 bg-on-tertiary-fixed text-inverse-on-surface z-50 flex flex-col border-r border-tertiary">
        <div className="h-14 px-6 flex items-center border-b border-tertiary"><span className="font-headline-sm text-headline-sm tracking-widest uppercase text-inverse-on-surface">HALDEN</span></div>
        <div className="px-4 py-4 border-b border-tertiary">
          <label className="block font-label-mono text-label-mono uppercase text-on-tertiary-container mb-2">ACTIVE HUB</label>
          <select className="w-full bg-tertiary text-on-tertiary font-label-mono text-label-mono uppercase px-3 py-2 rounded-none border border-tertiary-container focus:outline-hidden focus:border-primary-fixed">
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
          <Link className="px-6 py-2.5 font-label-mono text-label-mono uppercase text-on-tertiary-container hover:bg-tertiary hover:text-on-tertiary transition-colors" href="/staff/bookings">BOOKINGS</Link>
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
            <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">THU 24 OCT 2024</span>
            <button aria-label="Notifications" className="relative flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-error rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-outline-variant">
              <span className="font-body-sm text-body-sm text-on-surface">M. Weber</span>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div>
            </div>
          </div>
        </header>
        <main className="relative pt-14 w-full px-8 bg-surface">
          <div className="flex flex-col w-full">
            {/* Sub-header / Breadcrumb bar (Specific to vehicle dossier) */}
            <div className="w-full bg-surface-container-low py-3 px-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">{"CONSOLE // FLEET"}</span>
                <span className="font-label-mono text-label-mono text-outline-variant">/</span>
                <span className="font-label-mono text-label-mono uppercase text-primary font-bold">EXHIBIT № 02 — RANGE ROVER AUTOBIOGRAPHY</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-secondary-container text-on-secondary-container font-label-mono text-[10px] tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {" "}ACTIVE CHASSIS
                </span>
              </div>
              <div className="flex items-center gap-6">
                <Link className="inline-flex items-center gap-1.5 font-label-mono text-label-mono uppercase text-on-surface hover:text-primary transition-colors" href="/fleet/range-rover-autobiography">
                  <span>VIEW PUBLIC EXHIBIT PLACARD</span>
                  {" "}
                  <span className="material-symbols-outlined text-[14px]">north_east</span>
                </Link>
                <span className="inline-flex items-center gap-1.5 font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-on-surface transition-colors" data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
                  <span className="material-symbols-outlined text-[14px]">history</span>
                  {" "}
                  <span>AUDIT TRAIL</span>
                </span>
              </div>
            </div>
            {/* Primary Worksurface Grid (68% Form, 32% Live Dossier Placard) */}
            <div className="w-full grid grid-cols-12 gap-8 px-8 py-8 pb-32">
              {/* LEFT: Main Form Column (8 of 12 cols = 66.6%) */}
              <div className="col-span-12 lg:col-span-8 flex flex-col gap-10">
                {/* Dossier Title Block */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 bg-tertiary text-on-tertiary font-label-mono text-label-mono tracking-widest uppercase">{"CATALOGUE № 02 // MUNICH ARCHIVE"}</span>
                    <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">SERIAL SALWR2V47PA109283</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <h1 className="font-headline-lg text-headline-lg text-on-surface">Edit Vehicle Dossier</h1>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">L460 Platform · SWB Standard Wheelbase</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant">Architectural specification, technical limits, staging custody, and photographic archival assets for curatorial distribution.</p>
                </div>
                {/* SECTION 01: Identity & Cantonal Registry */}
                <div className="bg-surface-container-low p-6 flex flex-col gap-6">
                  <div className="flex items-center justify-between pb-2 bg-surface-container-high px-4 py-2">
                    <span className="font-label-mono text-label-mono uppercase tracking-widest text-primary font-bold">{"SECTION 01 // ARCHIVAL IDENTITY"}</span>
                    <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">REGISTRY VERIFIED</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-mono text-label-mono uppercase text-on-surface">Brand / Marque</label>
                      <input className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-body-sm px-3 py-2.5 rounded-none focus:outline-hidden focus:bg-surface-bright" type="text" defaultValue="Land Rover" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-mono text-label-mono uppercase text-on-surface">Model Designation</label>
                      <input className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-body-sm px-3 py-2.5 rounded-none focus:outline-hidden focus:bg-surface-bright" type="text" defaultValue="Range Rover Autobiography" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-mono text-label-mono uppercase text-on-surface">Model Year</label>
                      <input className="w-full bg-surface-container-lowest text-on-surface font-spec-numeral text-spec-numeral px-3 py-2.5 rounded-none focus:outline-hidden focus:bg-surface-bright" type="text" defaultValue="2024" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-mono text-label-mono uppercase text-on-surface">Catalogue Exhibit №</label>
                      <input className="w-full bg-surface-container-lowest text-on-surface font-spec-numeral text-spec-numeral px-3 py-2.5 rounded-none focus:outline-hidden focus:bg-surface-bright" type="text" defaultValue="02" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-mono text-label-mono uppercase text-on-surface">Assigned Registration Plate</label>
                      <input className="w-full bg-surface-container-lowest text-on-surface font-spec-numeral text-spec-numeral tracking-wider uppercase px-3 py-2.5 rounded-none focus:outline-hidden focus:bg-surface-bright" type="text" defaultValue="M-HL 4821" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-mono text-label-mono uppercase text-on-surface">Curated Exterior Finish</label>
                      <input className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-body-sm px-3 py-2.5 rounded-none focus:outline-hidden focus:bg-surface-bright" type="text" defaultValue="Meteorite Silver (Satin Finish)" />
                    </div>
                  </div>
                  {/* VIN with Validation badge */}
                  <div className="flex flex-col gap-2 pt-2">
                    <label className="font-label-mono text-label-mono uppercase text-on-surface flex items-center justify-between">
                      <span>CHASSIS IDENTIFICATION NUMBER (VIN)</span>
                      {" "}
                      <span className="text-primary font-bold">{"GERMAN KBA & INTERPOL ACTIVE REGISTRY"}</span>
                    </label>
                    <div className="relative">
                      <input className="w-full bg-surface-container-lowest text-on-surface font-spec-numeral text-spec-numeral tracking-widest px-3 py-2.5 rounded-none focus:outline-hidden focus:bg-surface-bright" type="text" defaultValue="SALWR2V47PA109283" />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-primary"><span className="material-symbols-outlined text-[18px]">verified</span></div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-secondary-fixed text-on-secondary-fixed">
                      <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                      <span className="font-label-mono text-[10px] tracking-wide uppercase">{"VALIDATED // INTERPOL & CANTONAL REGISTRY CONFIRMED · HASH MATCH 0x992B"}</span>
                    </div>
                  </div>
                </div>
                {/* SECTION 02: Architectural & Engineering Matrix */}
                <div className="bg-surface-container-low p-6 flex flex-col gap-6">
                  <div className="flex items-center justify-between pb-2 bg-surface-container-high px-4 py-2">
                    <span className="font-label-mono text-label-mono uppercase tracking-widest text-primary font-bold">{"SECTION 02 // TECHNICAL SPECIFICATION MATRIX"}</span>
                    <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">METRIC DATA UNITS</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                    <div className="flex flex-col gap-1.5">
                      <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">Seating Architecture</span>
                      <input className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-none focus:outline-hidden" type="text" defaultValue="5 Curated Executive Positions" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">Transmission Unit</span>
                      <input className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-none focus:outline-hidden" type="text" defaultValue="8-Speed Automatic (ZF) with CommandShift" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">Powertrain / Displacement</span>
                      <input className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-none focus:outline-hidden" type="text" defaultValue="4.4L Twin-Turbocharged V8 (530 PS / 523 HP)" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">Peak Torque Delivery</span>
                      <input className="w-full bg-surface-container-lowest text-on-surface font-spec-numeral text-spec-numeral px-3 py-2 rounded-none focus:outline-hidden" type="text" defaultValue="750 Nm @ 1,800 — 4,600 RPM" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">Drivetrain Dynamics</span>
                      <input className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-none focus:outline-hidden" type="text" defaultValue="Intelligent All-Wheel Drive (iAWD) + All-Wheel Steer" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">Energy Calibration</span>
                      <input className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-none focus:outline-hidden" type="text" defaultValue="High-Octane Super Plus Petrol (98 RON)" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">Luggage Volume</span>
                      <input className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-body-sm px-3 py-2 rounded-none focus:outline-hidden" type="text" defaultValue="812 Litres (Accommodates 3 Large Rimowa Trunks)" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">Zero to 100 km/h Sprint</span>
                      <input className="w-full bg-surface-container-lowest text-on-surface font-spec-numeral text-spec-numeral px-3 py-2 rounded-none focus:outline-hidden" type="text" defaultValue="4.6 Seconds" />
                    </div>
                  </div>
                </div>
                {/* SECTION 03: Pricing & Fiscal Parameters (with deliberate validation state) */}
                <div className="bg-surface-container-low p-6 flex flex-col gap-6">
                  <div className="flex items-center justify-between pb-2 bg-surface-container-high px-4 py-2">
                    <span className="font-label-mono text-label-mono uppercase tracking-widest text-primary font-bold">{"SECTION 03 // FISCAL PARAMETERS & TARIFF STRUCTURE"}</span>
                    <span className="font-label-mono text-label-mono text-error uppercase font-bold">● AUDIT CONFLICT DETECTED</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-mono text-label-mono uppercase text-on-surface">Diurnal Reservation Base Rate (EUR)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-spec-numeral text-spec-numeral text-on-surface-variant">€</span>
                        <input className="w-full bg-surface-container-lowest text-on-surface font-spec-numeral text-spec-numeral pl-8 pr-3 py-2.5 rounded-none focus:outline-hidden focus:bg-surface-bright" type="text" defaultValue="390.00" />
                      </div>
                      <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">BASE STANDARD TIER 1 RATE</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-mono text-label-mono uppercase text-on-surface">Weekend / Peak Surcharge Rate (EUR)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-spec-numeral text-spec-numeral text-on-surface-variant">€</span>
                        <input className="w-full bg-surface-container-lowest text-on-surface font-spec-numeral text-spec-numeral pl-8 pr-3 py-2.5 rounded-none focus:outline-hidden focus:bg-surface-bright" type="text" defaultValue="440.00" />
                      </div>
                      <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">APPLIES FRI 14:00 THRU MON 10:00</span>
                    </div>
                    {/* Error demonstration field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-mono text-label-mono uppercase text-error font-bold flex items-center justify-between">
                        <span>Security Deposit Escrow (EUR)</span>
                        {" "}
                        <span>EXCEEDS PROTOCOL LIMIT</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-spec-numeral text-spec-numeral text-error">€</span>
                        <input className="w-full bg-error-container text-on-error-container font-spec-numeral text-spec-numeral pl-8 pr-10 py-2.5 rounded-none focus:outline-hidden" type="text" defaultValue="3,500.00" />
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-error text-[18px]">error</span>
                      </div>
                      <div className="p-2 bg-error text-on-error flex items-start gap-2">
                        <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">priority_high</span>
                        <span className="font-label-mono text-[10px] tracking-wide uppercase leading-tight">FIELD VALUE EXCEEDS TIER-1 MAXIMUM THRESHOLD (MAX €3,000.00 FOR STANDARD DEPOSIT ESCROW). REQUIRES CHIEF TREASURER OVERRIDE.</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-mono text-label-mono uppercase text-on-surface">Included Distance Allowance</label>
                      <input className="w-full bg-surface-container-lowest text-on-surface font-spec-numeral text-spec-numeral px-3 py-2.5 rounded-none focus:outline-hidden focus:bg-surface-bright" type="text" defaultValue="250 km / diurnal cycle (€1.85 per excess km)" />
                      <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">CENTRAL ALPINE CORRIDOR UNLIMITED EXEMPTION APPLIED</span>
                    </div>
                  </div>
                </div>
                {/* SECTION 04: Location, Staging & Status */}
                <div className="bg-surface-container-low p-6 flex flex-col gap-6">
                  <div className="flex items-center justify-between pb-2 bg-surface-container-high px-4 py-2">
                    <span className="font-label-mono text-label-mono uppercase tracking-widest text-primary font-bold">{"SECTION 04 // STAGING LOGISTICS & CUSTODY DISPOSITION"}</span>
                    <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">ACTIVE ASSIGNMENT</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-mono text-label-mono uppercase text-on-surface">Assigned Home Staging Hub</label>
                      <select className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-body-sm px-3 py-2.5 rounded-none focus:outline-hidden" defaultValue="MUC — Munich Franz Josef Strauss Airport (VIP Terminal 2 Pavilion)">
                        <option>MUC — Munich Franz Josef Strauss Airport (VIP Terminal 2 Pavilion)</option>
                        <option>ZRH — Zurich Airport Kloten (Private Aviation Center)</option>
                        <option>GVA — Geneva Cointrin (VIP Terminal Annex)</option>
                        <option>MXP — Milan Malpensa (Signature Flight Support Staging)</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-mono text-label-mono uppercase text-on-surface">Current Physical Custody Status</label>
                      <select className="w-full bg-surface-container-lowest text-primary font-label-mono text-label-mono font-bold uppercase px-3 py-2.5 rounded-none focus:outline-hidden" defaultValue="ON RENT — DISPATCHED UNDER CONTRACT">
                        <option>ON RENT — DISPATCHED UNDER CONTRACT</option>
                        <option>AVAILABLE — STAGED AT TERMINAL</option>
                        <option>{"IN SERVICE — ALPINE DETAILING & INSPECTION"}</option>
                        <option>QUARANTINED — MECHANICAL AUDIT PENDING</option>
                        <option>RETIRED ARCHIVE — PERMANENT CUSTODY</option>
                      </select>
                    </div>
                  </div>
                  {/* Active Booking Beacon Card */}
                  <div className="p-4 bg-surface-container flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 bg-secondary rounded-none flex items-center justify-center"><span className="w-1.5 h-1.5 bg-surface-container-lowest" /></span>
                      <div className="flex flex-col">
                        <span className="font-label-mono text-[11px] tracking-wider uppercase font-bold text-on-surface">ACTIVE CONTRACT ATTACHED</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">Dossier #HLD-0612-4821 · Client: Clara von Bergmann · Due return: 15 Jun 10:00 CEST</span>
                      </div>
                    </div>
                    <Link className="px-3 py-1.5 bg-surface-container-lowest text-on-surface font-label-mono text-[11px] uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-colors" href="/staff/bookings/hld-0612-4821">INSPECT ACTIVE CONTRACT →</Link>
                  </div>
                  {/* Curated Transversal Toggle */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-md text-on-surface font-semibold">{"Featured in \"Alpine Transversals\" Collection"}</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Permits prominent placement on Munich and Zurich public catalog front-doors.</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input defaultChecked className="sr-only peer" type="checkbox" />
                      {" "}
                      <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-hidden peer-checked:bg-primary transition-colors" />
                      <div className="absolute left-1 top-1 bg-surface w-4 h-4 transition-transform peer-checked:translate-x-5" />
                    </label>
                  </div>
                </div>
                {/* SECTION 05: Architectural Equipment & Tactile Amenities */}
                <div className="bg-surface-container-low p-6 flex flex-col gap-6">
                  <div className="flex items-center justify-between pb-2 bg-surface-container-high px-4 py-2">
                    <span className="font-label-mono text-label-mono uppercase tracking-widest text-primary font-bold">{"SECTION 05 // CURATED APPOINTMENTS & MECHANICAL REFINEMENTS"}</span>
                    <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">8 ITEMS CHECKED</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-start gap-3 p-3 bg-surface-container-lowest cursor-pointer hover:bg-surface-container transition-colors">
                      <input defaultChecked className="mt-1 w-4 h-4 rounded-none accent-primary text-primary" type="checkbox" />
                      {" "}
                      <div className="flex flex-col">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">Meridian™ Signature 35-Speaker Sound (1,600W)</span>
                        <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">3D SURROUND SOUNDFIELD ARCHITECTURE</span>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-3 bg-surface-container-lowest cursor-pointer hover:bg-surface-container transition-colors">
                      <input defaultChecked className="mt-1 w-4 h-4 rounded-none accent-primary text-primary" type="checkbox" />
                      {" "}
                      <div className="flex flex-col">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">Executive Class Rear Seating with Ottoman</span>
                        <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">{"HEATED STONE MASSAGE & INDIVIDUAL CLIMATE"}</span>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-3 bg-surface-container-lowest cursor-pointer hover:bg-surface-container transition-colors">
                      <input defaultChecked className="mt-1 w-4 h-4 rounded-none accent-primary text-primary" type="checkbox" />
                      {" "}
                      <div className="flex flex-col">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">Active Road Noise Cancellation Gen III</span>
                        <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">HEADREST TRANSDUCER INTEGRATION</span>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-3 bg-surface-container-lowest cursor-pointer hover:bg-surface-container transition-colors">
                      <input defaultChecked className="mt-1 w-4 h-4 rounded-none accent-primary text-primary" type="checkbox" />
                      {" "}
                      <div className="flex flex-col">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">Terrain Response 2 with Dynamic-i Program</span>
                        <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">CONFIGURABLE ALPINE DRIVING DYNAMICS</span>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-3 bg-surface-container-lowest cursor-pointer hover:bg-surface-container transition-colors">
                      <input defaultChecked className="mt-1 w-4 h-4 rounded-none accent-primary text-primary" type="checkbox" />
                      {" "}
                      <div className="flex flex-col">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">Power-Assisted Deployable Side Steps</span>
                        <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">CONCEALED UNDERBODY INTEGRATION</span>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-3 bg-surface-container-lowest cursor-pointer hover:bg-surface-container transition-colors">
                      <input defaultChecked className="mt-1 w-4 h-4 rounded-none accent-primary text-primary" type="checkbox" />
                      {" "}
                      <div className="flex flex-col">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">Refrigerated Front Center Console</span>
                        <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">RAPID CHILLING TO +5°C CAPABILITY</span>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-3 bg-surface-container-lowest cursor-pointer hover:bg-surface-container transition-colors">
                      <input defaultChecked className="mt-1 w-4 h-4 rounded-none accent-primary text-primary" type="checkbox" />
                      {" "}
                      <div className="flex flex-col">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">All-Weather Alpine Chain System Certified</span>
                        <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">KÖNIG K-SUMMIT PRO IN BOOT ENCLOSURE</span>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-3 bg-surface-container-lowest cursor-pointer hover:bg-surface-container transition-colors">
                      <input defaultChecked className="mt-1 w-4 h-4 rounded-none accent-primary text-primary" type="checkbox" />
                      {" "}
                      <div className="flex flex-col">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">Electronic Air Suspension + Dynamic Response</span>
                        <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">ACTIVE 48V ELECTRONIC ROLL CONTROL</span>
                      </div>
                    </label>
                  </div>
                </div>
                {/* SECTION 06: Photography & Curatorial Archival Assets */}
                <div className="bg-surface-container-low p-6 flex flex-col gap-6">
                  <div className="flex items-center justify-between pb-2 bg-surface-container-high px-4 py-2">
                    <span className="font-label-mono text-label-mono uppercase tracking-widest text-primary font-bold">{"SECTION 06 // EXHIBITION PHOTOGRAPHY & VISUAL ASSETS"}</span>
                    <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">4 ASSETS REGISTERED</span>
                  </div>
                  {/* Architectural Upload Dropzone */}
                  <div className="p-8 bg-surface-container-lowest flex flex-col items-center justify-center text-center gap-3">
                    <div className="w-12 h-12 bg-surface-container-high flex items-center justify-center text-primary"><span className="material-symbols-outlined text-[24px]">add_photo_alternate</span></div>
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-md text-on-surface font-semibold">Drop high-resolution 3:2 or 16:9 studio photography</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Recommended: Minimum 3200×2133px, warm stone gallery background, flat architectural lighting.</span>
                    </div>
                    {/* Upload Progress indicator */}
                    <div className="w-full max-w-md mt-2 flex flex-col gap-1.5 text-left">
                      <div className="flex justify-between font-label-mono text-[10px] uppercase text-on-surface-variant">
                        <span>MUC_RR_Exterior_Front_HighRes.raw</span>
                        <span className="text-primary font-bold">88% UPLOADED</span>
                      </div>
                      <div className="w-full h-1 bg-surface-container"><div className="h-1 bg-primary" style={{ width: "88%" }} /></div>
                    </div>
                  </div>
                  {/* 4 Registered Exhibition Assets Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Asset 1 (Primary Cover) */}
                    <div className="bg-surface-container-lowest flex flex-col">
                      <div className="relative w-full aspect-[3/2] overflow-hidden bg-surface-container-high">
                        <Photo src={media.editorRangeRoverMain} className="w-full h-full object-cover" data-alt="Meteorite silver satin finish modern luxury Range Rover Autobiography SUV parked squarely in a monolithic warm stone gallery pavilion with soft diffused ceiling lighting and neutral polished concrete floor." sizes="(max-width: 767px) 100vw, 25vw" alt="" />
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-on-primary font-label-mono text-[9px] uppercase tracking-widest">PRIMARY COVER EXHIBIT</div>
                        <div className="absolute top-2 right-2 w-7 h-7 bg-surface-container-lowest text-on-surface flex items-center justify-center cursor-move shadow-sm"><span className="material-symbols-outlined text-[16px]">drag_indicator</span></div>
                      </div>
                      <div className="p-3 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="font-label-mono text-label-mono uppercase text-on-surface font-semibold">{"ASSET 01 // EXTERIOR STAGE"}</span>
                          <span className="font-spec-numeral text-[11px] text-on-surface-variant">14.2 MB · RAW</span>
                        </div>
                        <input className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm px-2.5 py-1.5 rounded-none focus:outline-hidden" type="text" defaultValue="Silver-grey Range Rover Autobiography on warm stone floor" />
                      </div>
                    </div>
                    {/* Asset 2: Interior */}
                    <div className="bg-surface-container-lowest flex flex-col">
                      <div className="relative w-full aspect-[3/2] overflow-hidden bg-surface-container-high">
                        <Photo src={media.editorLeather} className="w-full h-full object-cover" data-alt="Macro tactile photograph of caramel tan perforated luxury leather upholstery on an executive car seat showing precise hand-stitched seams and refined hide grain." sizes="(max-width: 767px) 100vw, 25vw" alt="" />
                        <div className="absolute top-2 right-2 w-7 h-7 bg-surface-container-lowest text-on-surface flex items-center justify-center cursor-move shadow-sm"><span className="material-symbols-outlined text-[16px]">drag_indicator</span></div>
                      </div>
                      <div className="p-3 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="font-label-mono text-label-mono uppercase text-on-surface font-semibold">{"ASSET 02 // CARAMEL LEATHER"}</span>
                          <span className="font-spec-numeral text-[11px] text-on-surface-variant">18.6 MB · RAW</span>
                        </div>
                        <input className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm px-2.5 py-1.5 rounded-none focus:outline-hidden" type="text" defaultValue="Caramel tan perforated leather seat detail with twin stitching" />
                      </div>
                    </div>
                    {/* Asset 3: Headlamp */}
                    <div className="bg-surface-container-lowest flex flex-col">
                      <div className="relative w-full aspect-[3/2] overflow-hidden bg-surface-container-high">
                        <Photo src={media.editorHeadlamp} className="w-full h-full object-cover" data-alt="Close up architectural detail of sleek digital LED projector headlamp and precision matte grille of a luxury silver Range Rover." sizes="(max-width: 767px) 100vw, 25vw" alt="" />
                        <div className="absolute top-2 right-2 w-7 h-7 bg-surface-container-lowest text-on-surface flex items-center justify-center cursor-move shadow-sm"><span className="material-symbols-outlined text-[16px]">drag_indicator</span></div>
                      </div>
                      <div className="p-3 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="font-label-mono text-label-mono uppercase text-on-surface font-semibold">{"ASSET 03 // FRONT LIGHTING"}</span>
                          <span className="font-spec-numeral text-[11px] text-on-surface-variant">11.9 MB · RAW</span>
                        </div>
                        <input className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm px-2.5 py-1.5 rounded-none focus:outline-hidden" type="text" defaultValue="Macro detail LED projector headlight and gloss black grille aperture" />
                      </div>
                    </div>
                    {/* Asset 4: Wheel */}
                    <div className="bg-surface-container-lowest flex flex-col">
                      <div className="relative w-full aspect-[3/2] overflow-hidden bg-surface-container-high">
                        <Photo src={media.editorWheel} className="w-full h-full object-cover" data-alt="Close up view of multi-spoke dark gunmetal alloy wheel and massive ventilated brake caliper on a high end luxury SUV over beige travertine stone." sizes="(max-width: 767px) 100vw, 25vw" alt="" />
                        <div className="absolute top-2 right-2 w-7 h-7 bg-surface-container-lowest text-on-surface flex items-center justify-center cursor-move shadow-sm"><span className="material-symbols-outlined text-[16px]">drag_indicator</span></div>
                      </div>
                      <div className="p-3 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="font-label-mono text-label-mono uppercase text-on-surface font-semibold">{"ASSET 04 // 23-INCH WHEEL DETAIL"}</span>
                          <span className="font-spec-numeral text-[11px] text-on-surface-variant">15.0 MB · RAW</span>
                        </div>
                        <input className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm px-2.5 py-1.5 rounded-none focus:outline-hidden" type="text" defaultValue="Multi-spoke dark alloy wheel against honed limestone gallery slab" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* DANGER ZONE: Chassis Decommissioning */}
                <div className="p-6 bg-error-container text-on-error-container flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-error text-[20px]">warning</span>
                      <span className="font-label-mono text-label-mono uppercase font-bold text-error">{"DANGER ZONE // PERMANENT CHASSIS DECOMMISSIONING"}</span>
                    </div>
                    <span className="font-label-mono text-[10px] tracking-wider uppercase text-error">CHIEF CURATOR PRIVILEGE REQUIRED</span>
                  </div>
                  <p className="font-body-sm text-body-sm">Archiving or retiring this chassis permanently removes it from Munich VIP active dispatch, voids forthcoming reservation inquiries, and freezes its telemetry audit records. This action cannot be reversed without executive console clearance.</p>
                  <div className="flex justify-end pt-2"><button className="px-5 py-2.5 bg-error text-on-error font-action text-action uppercase tracking-wider hover:opacity-90 transition-opacity" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">Retire Vehicle (Archive Chassis)</button></div>
                </div>
              </div>
              {/* RIGHT: Live Dossier Placard & Custody Overview (4 of 12 cols = 33.3%, Sticky) */}
              <div className="col-span-12 lg:col-span-4">
                <div className="sticky top-20 flex flex-col gap-6">
                  {/* Architectural Placard Card */}
                  <div className="bg-surface-container-low overflow-hidden flex flex-col shadow-sm">
                    {/* Placard Index Header */}
                    <div className="p-4 bg-tertiary text-on-tertiary flex items-center justify-between">
                      <span className="font-label-mono text-[10px] tracking-widest uppercase">{"CATALOGUE № 02 // DOSSIER PREVIEW"}</span>
                      <span className="font-label-mono text-[10px] uppercase text-primary-fixed">SYNCHRONIZED LIVE</span>
                    </div>
                    {/* Vehicle Visual Frame */}
                    <div className="relative w-full aspect-[16/10] bg-surface-container-highest overflow-hidden">
                      <Photo src={media.editorRangeRoverAlt} className="w-full h-full object-cover" data-alt="Meteorite silver satin finish modern luxury Range Rover Autobiography SUV parked squarely in a monolithic warm stone gallery pavilion with soft diffused ceiling lighting and neutral polished concrete floor." sizes="(max-width: 767px) 100vw, 26vw" alt="" />
                      <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-on-tertiary-fixed text-inverse-on-surface font-label-mono text-[10px] uppercase tracking-wider">PLATE: M-HL 4821</div>
                      <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-primary text-on-primary font-label-mono text-[10px] uppercase font-bold tracking-wider">ON RENT</div>
                    </div>
                    {/* Vehicle Information Block */}
                    <div className="p-6 flex flex-col gap-4">
                      <div className="flex flex-col">
                        <span className="font-label-mono text-[10px] tracking-widest text-on-surface-variant uppercase">AUTOBIOGRAPHY EDITION · 2024</span>
                        <h2 className="font-headline-md text-headline-md text-on-surface">Range Rover L460</h2>
                      </div>
                      {/* Key Spec Badges */}
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <div className="bg-surface-container-lowest p-2.5 flex flex-col">
                          <span className="font-label-mono text-[9px] text-on-surface-variant uppercase">POWER OUTPUT</span>
                          <span className="font-spec-numeral text-spec-numeral font-bold text-on-surface">530 PS / 4.4L V8</span>
                        </div>
                        <div className="bg-surface-container-lowest p-2.5 flex flex-col">
                          <span className="font-label-mono text-[9px] text-on-surface-variant uppercase">CAPACITY</span>
                          <span className="font-spec-numeral text-spec-numeral font-bold text-on-surface">5 SEATS · AWD</span>
                        </div>
                        <div className="bg-surface-container-lowest p-2.5 flex flex-col">
                          <span className="font-label-mono text-[9px] text-on-surface-variant uppercase">BASE TARIFF</span>
                          <span className="font-spec-numeral text-spec-numeral font-bold text-primary">€390 / DIURNAL</span>
                        </div>
                        <div className="bg-surface-container-lowest p-2.5 flex flex-col">
                          <span className="font-label-mono text-[9px] text-on-surface-variant uppercase">STAGING HUB</span>
                          <span className="font-spec-numeral text-spec-numeral font-bold text-on-surface">MUC VIP T2</span>
                        </div>
                      </div>
                      {/* Operational & Utilization Telemetry */}
                      <div className="mt-2 pt-4 bg-surface-container p-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="font-label-mono text-label-mono uppercase text-on-surface font-semibold">MONTHLY UTILIZATION RATE</span>
                          <span className="font-spec-numeral text-spec-numeral font-bold text-primary">92%</span>
                        </div>
                        {/* Utilization Sparkline / Progress Bar */}
                        <div className="w-full h-1.5 bg-surface-container-highest"><div className="h-1.5 bg-primary" style={{ width: "92%" }} /></div>
                        <div className="flex items-center justify-between text-on-surface-variant font-label-mono text-[10px] uppercase">
                          <span>28 DIURNAL CYCLES BOOKED</span>
                          <span>2 CYCLES MAINTENANCE</span>
                        </div>
                      </div>
                      {/* Health & Compliance Spec Sheet */}
                      <div className="flex flex-col gap-2 pt-2">
                        <div className="flex items-center justify-between py-1 bg-surface-container px-3">
                          <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">48-POINT INSPECTION</span>
                          <span className="font-label-mono text-[10px] font-bold text-primary uppercase">VALID UNTIL 12 NOV 2025</span>
                        </div>
                        <div className="flex items-center justify-between py-1 bg-surface-container px-3">
                          <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">ODOMETER AUDIT</span>
                          <span className="font-spec-numeral text-[11px] text-on-surface">14,820 KM</span>
                        </div>
                        <div className="flex items-center justify-between py-1 bg-surface-container px-3">
                          <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">TELEMETRY LINK</span>
                          <span className="font-label-mono text-[10px] text-primary uppercase font-bold">LIVE DUAL-SIM ACTIVE</span>
                        </div>
                      </div>
                      <div className="pt-4 flex items-center justify-between text-on-surface-variant font-label-mono text-[10px] uppercase">
                        <span>LAST MODIFIED: 24 OCT 09:15</span>
                        <span>BY: M. WEBER</span>
                      </div>
                    </div>
                  </div>
                  {/* Quick Staging Custody Quick Links */}
                  <div className="p-4 bg-surface-container-low flex flex-col gap-2">
                    <span className="font-label-mono text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">RAPID PROTOCOLS</span>
                    <div className="flex flex-col gap-1">
                      <span className="px-3 py-2 bg-surface-container-lowest hover:bg-surface-container-high transition-colors flex items-center justify-between font-label-mono text-[11px] uppercase text-on-surface" data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
                        <span>DOWNLOAD CHASSIS PDF DOSSIER</span>
                        {" "}
                        <span className="material-symbols-outlined text-[16px]">file_download</span>
                      </span>
                      <span className="px-3 py-2 bg-surface-container-lowest hover:bg-surface-container-high transition-colors flex items-center justify-between font-label-mono text-[11px] uppercase text-on-surface" data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
                        <span>TRIGGER KEY FOB IMMOBILIZER TEST</span>
                        {" "}
                        <span className="material-symbols-outlined text-[16px]">key</span>
                      </span>
                      <span className="px-3 py-2 bg-surface-container-lowest hover:bg-surface-container-high transition-colors flex items-center justify-between font-label-mono text-[11px] uppercase text-on-surface" data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
                        <span>GENERATE QR PICKUP RECEIPT</span>
                        {" "}
                        <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* STICKY BOTTOM ACTION DECK (Unsaved changes beacon) */}
            <div className="fixed bottom-0 left-60 right-0 h-16 bg-surface-container-highest z-50 px-8 flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping" />
                <span className="font-label-mono text-label-mono uppercase font-bold text-on-surface tracking-wider">{"● UNSAVED CHANGES IN SECTIONS 01 & 03"}</span>
                <span className="hidden md:inline font-body-sm text-body-sm text-on-surface-variant pl-2">— Security deposit escrow validation warning requires resolution before commit.</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="px-5 py-2.5 bg-surface-container-lowest text-on-surface font-action text-action uppercase tracking-wider hover:bg-surface-container transition-colors" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">Discard Changes</button>
                <button className="px-7 py-2.5 bg-primary text-on-primary font-action text-action uppercase tracking-wider hover:opacity-95 transition-opacity" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">Save Vehicle Dossier</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
