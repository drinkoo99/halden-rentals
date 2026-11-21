import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";

/** Stitch screen "HALDEN — Operations Console" — generated from design/stitch-export-round2/halden_staff_console_bookings/code.html */
export function StaffBookings() {
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
            <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">THU 24 OCT 2024</span>
            <button aria-label="Notifications" className="relative flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors">
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
            {/* Top Utility Ribbon / Ledger Status Bar */}
            <div className="flex items-center justify-between pb-6 pt-2">
              <div className="flex items-baseline gap-4">
                <h1 className="font-headline-lg text-headline-lg tracking-tight text-on-surface">Bookings</h1>
                <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest px-2.5 py-1 bg-surface-container rounded-none">{"[142 ARCHIVE DOSSIERS // 18 ACTIVE CYCLES]"}</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="group flex items-center gap-2 px-4 py-2 bg-surface-container-low hover:bg-surface-container text-on-surface font-action text-action uppercase transition-colors rounded-none" type="button">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:text-on-surface">download</span>
                  {" "}
                  <span>Export CSV Manifest</span>
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary hover:bg-primary-container font-action text-action uppercase transition-colors rounded-none" type="button">
                  <span className="material-symbols-outlined text-[17px]">add</span>
                  {" "}
                  <span>New Reservation Dossier</span>
                </button>
              </div>
            </div>
            {/* Segmented Tab Navigation */}
            <div className="w-full flex items-center gap-1 bg-surface-container-low p-1 mb-6">
              <button className="relative flex items-center gap-2 px-5 py-2.5 bg-surface text-primary font-label-mono text-label-mono font-bold uppercase transition-all">
                <span>UPCOMING</span>
                {" "}
                <span className="px-1.5 py-0.2 bg-primary-fixed text-on-primary-fixed text-[10px] leading-tight font-spec-numeral">18</span>
                {" "}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-mono text-label-mono uppercase transition-colors">
                <span>ON THE ROAD</span>
                {" "}
                <span className="px-1.5 py-0.2 bg-surface-container-high text-on-surface-variant text-[10px] leading-tight font-spec-numeral">31</span>
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-mono text-label-mono uppercase transition-colors">
                <span>COMPLETED</span>
                {" "}
                <span className="px-1.5 py-0.2 bg-surface-container-high text-on-surface-variant text-[10px] leading-tight font-spec-numeral">84</span>
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-mono text-label-mono uppercase transition-colors">
                <span>CANCELLED</span>
                {" "}
                <span className="px-1.5 py-0.2 bg-surface-container-high text-on-surface-variant text-[10px] leading-tight font-spec-numeral">09</span>
              </button>
              <div className="ml-auto pr-3 flex items-center gap-2 text-on-surface-variant font-label-mono text-label-mono">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-surface-tint" />
                <span>AUTOMATED AUDIT RUN: 04 MIN AGO</span>
              </div>
            </div>
            {/* Filter & Operational Toolbar */}
            <div className="w-full bg-surface-container-low p-3 mb-4 flex items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-xl">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">manage_search</span>
                <input className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-body-sm pl-10 pr-12 py-2 rounded-none placeholder:text-on-surface-variant focus:outline-hidden focus:ring-1 focus:ring-primary" placeholder="Search dossier ref, customer, chassis, or plate..." type="text" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none"><kbd className="font-label-mono text-[10px] tracking-widest bg-surface-container px-1.5 py-0.5 text-on-surface-variant">⌘K</kbd></div>
              </div>
              {/* Filter Dropdown Modules */}
              <div className="flex items-center gap-2">
                {/* Hub Selector */}
                <div className="relative">
                  <button className="flex items-center gap-2 px-3 py-2 bg-surface hover:bg-surface-container text-on-surface font-label-mono text-label-mono uppercase transition-colors">
                    <span className="text-on-surface-variant">HUB:</span>
                    {" "}
                    <span className="font-bold">ALL HUBS (5)</span>
                    {" "}
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">arrow_drop_down</span>
                  </button>
                </div>
                {/* Date Range */}
                <div className="relative">
                  <button className="flex items-center gap-2 px-3 py-2 bg-surface hover:bg-surface-container text-on-surface font-label-mono text-label-mono uppercase transition-colors">
                    <span className="text-on-surface-variant">RANGE:</span>
                    {" "}
                    <span className="font-bold">NEXT 14 DAYS</span>
                    {" "}
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">calendar_today</span>
                  </button>
                </div>
                {/* Status Filter */}
                <div className="relative">
                  <button className="flex items-center gap-2 px-3 py-2 bg-surface hover:bg-surface-container text-on-surface font-label-mono text-label-mono uppercase transition-colors">
                    <span className="text-on-surface-variant">STATUS:</span>
                    {" "}
                    <span className="font-bold">ALL ACTIVE</span>
                    {" "}
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">arrow_drop_down</span>
                  </button>
                </div>
                {/* Vehicle Category */}
                <div className="relative">
                  <button className="flex items-center gap-2 px-3 py-2 bg-surface hover:bg-surface-container text-on-surface font-label-mono text-label-mono uppercase transition-colors">
                    <span className="text-on-surface-variant">CLASS:</span>
                    {" "}
                    <span className="font-bold">ALL CATEGORIES</span>
                    {" "}
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">tune</span>
                  </button>
                </div>
                {/* Reset Filter Button */}
                <button className="px-3 py-2 text-on-surface-variant hover:text-on-surface font-label-mono text-label-mono uppercase underline underline-offset-4 ml-1 transition-colors">RESET</button>
              </div>
            </div>
            {/* Primary Archival Bookings Ledger Table */}
            <div className="w-full overflow-x-auto bg-surface-container-lowest">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant font-label-mono text-label-mono tracking-wider uppercase select-none">
                    <th className="py-3.5 px-4 font-normal">DOSSIER REF</th>
                    <th className="py-3.5 px-4 font-normal">CUSTOMER / PATRONAGE</th>
                    <th className="py-3.5 px-4 font-normal min-w-[260px]">{"CHASSIS & SPECIFICATION"}</th>
                    <th className="py-3.5 px-4 font-normal min-w-[210px]">SCHEDULE (CEST)</th>
                    <th className="py-3.5 px-4 font-normal">DISPATCH HUB</th>
                    <th className="py-3.5 px-4 font-normal text-right">TOTAL TARIFF</th>
                    <th className="py-3.5 px-4 font-normal">PAYMENT</th>
                    <th className="py-3.5 px-4 font-normal">DISPATCH STATUS</th>
                    <th className="py-3.5 px-4 font-normal text-right">MANIFEST</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container font-body-sm text-body-sm text-on-surface">
                  {/* ROW 1: Clara von Bergmann */}
                  <tr className="hover:bg-surface-container-low/60 transition-colors group">
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <span className="font-label-mono text-spec-numeral text-primary font-bold">HLD-0612-4821</span>
                      {" "}
                      <div className="font-label-mono text-[10px] text-on-surface-variant">{"V-RES // MUC"}</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle">
                      <div className="font-action text-action text-on-surface leading-tight">Clara von Bergmann</div>
                      <div className="font-label-mono text-[10px] text-on-surface-variant tracking-wider uppercase">Patron Tier II · 4 prior bookings</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-11 bg-surface-container shrink-0 overflow-hidden relative"><Photo src={media.rangeRoverStudio} alt="Range Rover Autobiography" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 767px) 100vw, 30vw" /></div>
                        <div className="min-w-0">
                          <div className="font-body-sm font-semibold truncate text-on-surface">Range Rover Autobiography</div>
                          <div className="font-label-mono text-[10px] text-on-surface-variant">
                            PLATE:{" "}
                            <span className="text-on-surface font-spec-numeral">M-HL 4821</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <div className="font-label-mono text-[12px] text-on-surface font-medium">12 JUN 10:00 → 15 JUN 10:00</div>
                      <div className="font-label-mono text-[10px] text-on-surface-variant tracking-wide uppercase">3 Diurnal Cycles</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <div className="font-action text-action text-on-surface">MUC</div>
                      <div className="font-label-mono text-[10px] text-on-surface-variant uppercase">Munich VIP Bay 04</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle text-right whitespace-nowrap">
                      <div className="font-spec-numeral text-spec-numeral font-bold text-on-surface">€1,731.45</div>
                      <div className="font-label-mono text-[10px] text-on-surface-variant">INCL. €285 PROV.</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap"><span className="inline-flex items-center px-2 py-0.5 text-[10px] font-label-mono uppercase tracking-wider bg-primary-container text-on-primary">PRE-AUTH OK</span></td>
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-label-mono uppercase tracking-wide bg-primary/10 text-primary">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        {" "}CONFIRMED
                      </span>
                    </td>
                    <td className="py-3.5 px-4 align-middle text-right whitespace-nowrap">
                      <Link className="font-action text-action text-primary hover:text-primary-container inline-flex items-center gap-1 transition-colors" href="/staff/bookings/hld-0612-4821">
                        <span>View Dossier</span>
                        {" "}
                        <span className="font-label-mono text-[12px]">→</span>
                      </Link>
                    </td>
                  </tr>
                  {/* ROW 2: Henrik Lindqvist */}
                  <tr className="hover:bg-surface-container-low/60 transition-colors group">
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <span className="font-label-mono text-spec-numeral text-primary font-bold">HLD-0841-3920</span>
                      {" "}
                      <div className="font-label-mono text-[10px] text-on-surface-variant">{"V-RES // ZRH"}</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle">
                      <div className="font-action text-action text-on-surface leading-tight">Henrik Lindqvist</div>
                      <div className="font-label-mono text-[10px] text-on-surface-variant tracking-wider uppercase">Patron Tier I · 1 prior booking</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-11 bg-surface-container shrink-0 overflow-hidden relative"><Photo src={media.porscheGt3Studio} alt="Porsche 911 GT3 Touring" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 767px) 100vw, 30vw" /></div>
                        <div className="min-w-0">
                          <div className="font-body-sm font-semibold truncate text-on-surface">Porsche 911 GT3 Touring</div>
                          <div className="font-label-mono text-[10px] text-on-surface-variant">
                            PLATE:{" "}
                            <span className="text-on-surface font-spec-numeral">ZH-91104</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <div className="font-label-mono text-[12px] text-on-surface font-medium">14 JUN 09:30 → 18 JUN 18:00</div>
                      <div className="font-label-mono text-[10px] text-on-surface-variant tracking-wide uppercase">4 Diurnal Cycles</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <div className="font-action text-action text-on-surface">ZRH</div>
                      <div className="font-label-mono text-[10px] text-on-surface-variant uppercase">Zurich Kloten Bay 02</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle text-right whitespace-nowrap">
                      <div className="font-spec-numeral text-spec-numeral font-bold text-on-surface">€2,480.00</div>
                      <div className="font-label-mono text-[10px] text-on-surface-variant">STANDARD RATE</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap"><span className="inline-flex items-center px-2 py-0.5 text-[10px] font-label-mono uppercase tracking-wider bg-primary-container text-on-primary">PRE-AUTH OK</span></td>
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-label-mono uppercase tracking-wide bg-secondary-container text-on-secondary-container">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        {" "}PREPARING
                      </span>
                    </td>
                    <td className="py-3.5 px-4 align-middle text-right whitespace-nowrap">
                      <Link className="font-action text-action text-primary hover:text-primary-container inline-flex items-center gap-1 transition-colors" href="/staff/bookings/hld-0612-4821">
                        <span>View Dossier</span>
                        {" "}
                        <span className="font-label-mono text-[12px]">→</span>
                      </Link>
                    </td>
                  </tr>
                  {/* ROW 3: Dr. Isabella Moreau */}
                  <tr className="hover:bg-surface-container-low/60 transition-colors group">
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <span className="font-label-mono text-spec-numeral text-primary font-bold">HLD-0789-1142</span>
                      {" "}
                      <div className="font-label-mono text-[10px] text-on-surface-variant">{"V-RES // VIE"}</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle">
                      <div className="font-action text-action text-on-surface leading-tight">Dr. Isabella Moreau</div>
                      <div className="font-label-mono text-[10px] text-on-surface-variant tracking-wider uppercase">Patron Tier III · 8 prior bookings</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-11 bg-surface-container shrink-0 overflow-hidden relative"><Photo src={media.audiRs6Studio} alt="Audi RS6 Avant" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 767px) 100vw, 3vw" /></div>
                        <div className="min-w-0">
                          <div className="font-body-sm font-semibold truncate text-on-surface">Audi RS6 Avant</div>
                          <div className="font-label-mono text-[10px] text-on-surface-variant">
                            PLATE:{" "}
                            <span className="text-on-surface font-spec-numeral">W-8821H</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <div className="font-label-mono text-[12px] text-on-surface font-medium">15 JUN 14:00 → 20 JUN 11:00</div>
                      <div className="font-label-mono text-[10px] text-on-surface-variant tracking-wide uppercase">5 Diurnal Cycles</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <div className="font-action text-action text-on-surface">VIE</div>
                      <div className="font-label-mono text-[10px] text-on-surface-variant uppercase">Vienna Schwechat Bay 01</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle text-right whitespace-nowrap">
                      <div className="font-spec-numeral text-spec-numeral font-bold text-on-surface">€2,390.00</div>
                      <div className="font-label-mono text-[10px] text-on-surface-variant">PATRON DISC. APPLIED</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap"><span className="inline-flex items-center px-2 py-0.5 text-[10px] font-label-mono uppercase tracking-wider bg-primary-container text-on-primary">PRE-AUTH OK</span></td>
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-label-mono uppercase tracking-wide bg-primary/10 text-primary">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {" "}CONFIRMED
                      </span>
                    </td>
                    <td className="py-3.5 px-4 align-middle text-right whitespace-nowrap">
                      <Link className="font-action text-action text-primary hover:text-primary-container inline-flex items-center gap-1 transition-colors" href="/staff/bookings/hld-0612-4821">
                        <span>View Dossier</span>
                        {" "}
                        <span className="font-label-mono text-[12px]">→</span>
                      </Link>
                    </td>
                  </tr>
                  {/* ROW 4: Marcus Sterling (Payment Issue / Alert) */}
                  <tr className="bg-error-container/15 hover:bg-error-container/25 transition-colors group">
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <span className="font-label-mono text-spec-numeral text-error font-bold">HLD-0922-8814</span>
                      {" "}
                      <div className="font-label-mono text-[10px] text-error">{"V-RES // MXP [HOLD]"}</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle">
                      <div className="font-action text-action text-on-surface leading-tight">Marcus Sterling</div>
                      <div className="font-label-mono text-[10px] text-on-surface-variant tracking-wider uppercase">New Patron · 0 prior bookings</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-11 bg-surface-container shrink-0 overflow-hidden relative"><Photo src={media.lexusLakeComo} alt="Lexus LC 500 Coupe" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 767px) 100vw, 29vw" /></div>
                        <div className="min-w-0">
                          <div className="font-body-sm font-semibold truncate text-on-surface">Lexus LC 500 Coupe</div>
                          <div className="font-label-mono text-[10px] text-on-surface-variant">
                            PLATE:{" "}
                            <span className="text-on-surface font-spec-numeral">MI-77210</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <div className="font-label-mono text-[12px] text-on-surface font-medium">16 JUN 11:15 → 18 JUN 16:00</div>
                      <div className="font-label-mono text-[10px] text-on-surface-variant tracking-wide uppercase">2 Diurnal Cycles</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <div className="font-action text-action text-on-surface">MXP</div>
                      <div className="font-label-mono text-[10px] text-on-surface-variant uppercase">Milan Malpensa Bay 05</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle text-right whitespace-nowrap">
                      <div className="font-spec-numeral text-spec-numeral font-bold text-on-surface">€1,120.00</div>
                      <div className="font-label-mono text-[10px] text-error">SETTLEMENT PENDING</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap"><span className="inline-flex items-center px-2 py-0.5 text-[10px] font-label-mono uppercase tracking-wider bg-error text-on-error font-bold">FAILED: DECLINED</span></td>
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-label-mono uppercase tracking-wide bg-tertiary-container text-on-tertiary">
                        <span className="material-symbols-outlined text-[13px] text-amber-500">warning</span>
                        {" "}ACTION REQUIRED
                      </span>
                    </td>
                    <td className="py-3.5 px-4 align-middle text-right whitespace-nowrap">
                      <Link className="font-action text-action text-error hover:underline inline-flex items-center gap-1 transition-colors" href="/staff/bookings/hld-0612-4821">
                        <span>View Dossier</span>
                        {" "}
                        <span className="font-label-mono text-[12px]">→</span>
                      </Link>
                    </td>
                  </tr>
                  {/* ROW 5: Baronesse Sophie von Thurn */}
                  <tr className="hover:bg-surface-container-low/60 transition-colors group">
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <span className="font-label-mono text-spec-numeral text-primary font-bold">HLD-0551-6029</span>
                      {" "}
                      <div className="font-label-mono text-[10px] text-on-surface-variant">{"V-RES // GVA"}</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle">
                      <div className="font-action text-action text-on-surface leading-tight">Baronesse Sophie von Thurn</div>
                      <div className="font-label-mono text-[10px] text-on-surface-variant tracking-wider uppercase">Patron Tier II · 3 prior bookings</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-11 bg-surface-container shrink-0 overflow-hidden relative"><Photo src={media.mercedesS500Studio} alt="Mercedes-Benz S 580 4MATIC" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 767px) 100vw, 10vw" /></div>
                        <div className="min-w-0">
                          <div className="font-body-sm font-semibold truncate text-on-surface">Mercedes-Benz S 580 4MATIC</div>
                          <div className="font-label-mono text-[10px] text-on-surface-variant">
                            PLATE:{" "}
                            <span className="text-on-surface font-spec-numeral">GE-40219</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <div className="font-label-mono text-[12px] text-on-surface font-medium">18 JUN 08:30 → 22 JUN 12:00</div>
                      <div className="font-label-mono text-[10px] text-on-surface-variant tracking-wide uppercase">4 Diurnal Cycles</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <div className="font-action text-action text-on-surface">GVA</div>
                      <div className="font-label-mono text-[10px] text-on-surface-variant uppercase">Geneva Cointrin Bay 03</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle text-right whitespace-nowrap">
                      <div className="font-spec-numeral text-spec-numeral font-bold text-on-surface">€1,980.00</div>
                      <div className="font-label-mono text-[10px] text-on-surface-variant">CHAUFFEUR TRANSF. INCL</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap"><span className="inline-flex items-center px-2 py-0.5 text-[10px] font-label-mono uppercase tracking-wider bg-primary-container text-on-primary">PRE-AUTH OK</span></td>
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-label-mono uppercase tracking-wide bg-primary/10 text-primary">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {" "}CONFIRMED
                      </span>
                    </td>
                    <td className="py-3.5 px-4 align-middle text-right whitespace-nowrap">
                      <Link className="font-action text-action text-primary hover:text-primary-container inline-flex items-center gap-1 transition-colors" href="/staff/bookings/hld-0612-4821">
                        <span>View Dossier</span>
                        {" "}
                        <span className="font-label-mono text-[12px]">→</span>
                      </Link>
                    </td>
                  </tr>
                  {/* ROW 6: Julian Croft (Cancelled/Refunded) */}
                  <tr className="opacity-60 hover:opacity-90 transition-opacity bg-surface-container-low/30 group">
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <span className="font-label-mono text-spec-numeral text-on-surface-variant font-bold line-through">HLD-0419-7201</span>
                      {" "}
                      <div className="font-label-mono text-[10px] text-on-surface-variant">{"V-RES // MUC [REVOKED]"}</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle">
                      <div className="font-action text-action text-on-surface leading-tight">Julian Croft</div>
                      <div className="font-label-mono text-[10px] text-on-surface-variant tracking-wider uppercase">Patron Tier I · 2 prior bookings</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-11 bg-surface-container shrink-0 overflow-hidden relative grayscale"><Photo src={media.bmw530eStudio} alt="BMW 540i xDrive" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 6vw" /></div>
                        <div className="min-w-0">
                          <div className="font-body-sm font-semibold truncate text-on-surface">BMW 540i xDrive</div>
                          <div className="font-label-mono text-[10px] text-on-surface-variant">
                            PLATE:{" "}
                            <span className="text-on-surface font-spec-numeral">M-HL 3390</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <div className="font-label-mono text-[12px] text-on-surface-variant">20 JUN 10:00 → 23 JUN 10:00</div>
                      <div className="font-label-mono text-[10px] text-on-surface-variant tracking-wide uppercase">3 Diurnal Cycles</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <div className="font-action text-action text-on-surface-variant">MUC</div>
                      <div className="font-label-mono text-[10px] text-on-surface-variant uppercase">Munich VIP Bay 04</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle text-right whitespace-nowrap">
                      <div className="font-spec-numeral text-spec-numeral font-normal text-on-surface-variant line-through">€1,240.00</div>
                      <div className="font-label-mono text-[10px] text-on-surface-variant">REMITTED</div>
                    </td>
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap"><span className="inline-flex items-center px-2 py-0.5 text-[10px] font-label-mono uppercase tracking-wider bg-surface-container text-on-surface-variant">REFUNDED</span></td>
                    <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-label-mono uppercase tracking-wide bg-surface-container text-on-surface-variant">
                        <span className="w-1.5 h-1.5 rounded-full bg-outline" />
                        {" "}CANCELLED
                      </span>
                    </td>
                    <td className="py-3.5 px-4 align-middle text-right whitespace-nowrap">
                      <Link className="font-action text-action text-on-surface-variant hover:text-on-surface inline-flex items-center gap-1 transition-colors" href="/staff/bookings/hld-0612-4821">
                        <span>View Dossier</span>
                        {" "}
                        <span className="font-label-mono text-[12px]">→</span>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Footer Pagination & Ledger Summary */}
            <div className="mt-4 pt-4 pb-12 flex items-center justify-between">
              {/* Total Range Status */}
              <div className="flex items-center gap-6">
                <span className="font-label-mono text-label-mono text-on-surface-variant tracking-wider uppercase">SHOWING 1–6 OF 18 ACTIVE UPCOMING RESERVATIONS</span>
                <span className="font-label-mono text-[11px] text-on-surface-variant/80 tracking-tight">(All fiscal figures in EUR)</span>
              </div>
              {/* Archival Pagination Bar */}
              <div className="flex items-center gap-1 font-label-mono text-label-mono select-none">
                <button className="px-3 py-1.5 bg-surface-container text-on-surface-variant/50 cursor-not-allowed uppercase" disabled>PREV</button>
                <button className="px-3 py-1.5 bg-primary text-on-primary font-bold">1</button>
                <button className="px-3 py-1.5 bg-surface hover:bg-surface-container text-on-surface transition-colors">2</button>
                <button className="px-3 py-1.5 bg-surface hover:bg-surface-container text-on-surface transition-colors">3</button>
                <button className="px-3 py-1.5 bg-surface hover:bg-surface-container text-on-surface uppercase transition-colors">NEXT</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
