import Link from "next/link";

/** Stitch screen "" — generated from design/stitch-export-round2/halden_staff_console_customers/code.html */
export function StaffCustomers() {
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased">
      <aside className="fixed left-0 top-0 h-screen w-60 bg-tertiary z-50 flex flex-col justify-between select-none">
        <div className="flex flex-col">
          <div className="h-16 px-6 flex items-center justify-between">
            <Link className="font-headline-md text-headline-sm tracking-wider text-surface-container-lowest uppercase hover:opacity-90 transition-opacity" href="/staff">HALDEN</Link>
            <span className="font-label-mono text-[9px] uppercase px-1.5 py-0.5 tracking-widest text-on-tertiary-container bg-tertiary-container">OPS</span>
          </div>
          <div className="px-4 py-3 mx-4 my-2 bg-inverse-surface">
            <label className="block font-label-mono text-[9px] uppercase tracking-widest text-on-tertiary-container mb-1">OPERATIONAL HUB</label>
            <div className="relative flex items-center justify-between cursor-pointer">
              <span className="font-label-mono text-label-mono text-surface-container-lowest tracking-wider uppercase truncate">ALL HUBS (5 REGIONS)</span>
              <span className="material-symbols-outlined text-on-tertiary-container text-[16px]">expand_more</span>
            </div>
          </div>
          <nav className="flex flex-col mt-4 px-2">
            <Link className="flex items-center px-4 py-2.5 font-label-mono text-label-mono text-on-tertiary-container hover:bg-tertiary-container hover:text-surface-container-lowest transition-colors" href="/staff">OVERVIEW</Link>
            <Link className="flex items-center px-4 py-2.5 font-label-mono text-label-mono text-on-tertiary-container hover:bg-tertiary-container hover:text-surface-container-lowest transition-colors" href="/staff/bookings">BOOKINGS</Link>
            <Link className="flex items-center px-4 py-2.5 font-label-mono text-label-mono text-on-tertiary-container hover:bg-tertiary-container hover:text-surface-container-lowest transition-colors" href="/staff/fleet">FLEET</Link>
            <Link className="flex items-center px-4 py-2.5 font-label-mono text-label-mono text-on-tertiary-container hover:bg-tertiary-container hover:text-surface-container-lowest transition-colors" href="/staff/availability">AVAILABILITY</Link>
            <Link aria-current="page" className="flex items-center px-4 py-2.5 font-label-mono transition-colors bg-primary-container text-surface-container-lowest border-l-2 border-primary-fixed" href="/staff/customers">CUSTOMERS</Link>
            <Link className="flex items-center px-4 py-2.5 font-label-mono text-label-mono text-on-tertiary-container hover:bg-tertiary-container hover:text-surface-container-lowest transition-colors" href="/staff/fleet">PRICING</Link>
            <Link className="flex items-center px-4 py-2.5 font-label-mono text-label-mono text-on-tertiary-container hover:bg-tertiary-container hover:text-surface-container-lowest transition-colors" href="/staff">SETTINGS</Link>
          </nav>
        </div>
        <div className="p-6 flex flex-col gap-1">
          <div className="font-label-mono text-[10px] text-on-tertiary-container tracking-widest uppercase">CONSOLE V2.4</div>
          <div className="font-label-mono text-[9px] text-outline tracking-wider uppercase">{"ARCHIVE RUNNER // SECURE"}</div>
        </div>
      </aside>
      <div className="pl-60">
        <header className="fixed top-0 left-60 right-0 h-16 bg-surface/90 backdrop-blur-md z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 w-1/2 max-w-lg bg-surface-container-low px-3 py-2">
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">search</span>
            <input className="w-full bg-transparent border-0 focus:outline-hidden font-body-sm text-body-sm text-on-surface placeholder:text-outline placeholder:font-body-sm" placeholder="Search customer name, email, booking ref, licence..." type="text" />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-outline text-[16px]">calendar_today</span>
              <span className="font-label-mono text-label-mono text-on-surface uppercase tracking-wider">THU 24 OCT 2024</span>
            </div>
            <div className="h-4 w-px bg-outline-variant" />
            <button className="relative p-1.5 text-on-surface-variant hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error ring-2 ring-surface" />
            </button>
            <div className="h-4 w-px bg-outline-variant" />
            <div className="flex items-center gap-3 pl-1">
              <div className="text-right hidden sm:block">
                <div className="font-action text-action text-on-surface leading-tight">M. Weber</div>
                <div className="font-label-mono text-[10px] text-outline uppercase tracking-wider">CONCIERGE LEAD</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div>
            </div>
          </div>
        </header>
        <main className="w-full pt-16 bg-surface">
          <div className="flex flex-col w-full">
            {/* Top Archival Navigation & Header Bar */}
            <div className="w-full px-8 pt-8 pb-6 bg-surface border-b border-outline-variant">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="font-label-mono text-label-mono text-outline uppercase tracking-widest flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 bg-primary" />
                    <span>{"ARCHIVAL REGISTRY // PATRON CIRCLE [864 PATRONS LOGGED // 142 ACTIVE RESERVATIONS]"}</span>
                  </div>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Customers</h1>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-5 py-2.5 bg-transparent border border-on-surface text-on-surface font-action text-action hover:bg-surface-container transition-colors rounded-[2px] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">file_download</span>
                    {" "}
                    <span>EXPORT CSV DIRECTORY</span>
                  </button>
                  <button className="px-6 py-2.5 bg-primary text-surface font-action text-action hover:bg-primary-container transition-colors rounded-[2px] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">add</span>
                    {" "}
                    <span>ENROLL PATRON</span>
                  </button>
                </div>
              </div>
              {/* 4 KPI Metrics Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 mt-8 border border-outline-variant bg-surface-container-low">
                {/* Metric 1 */}
                <div className="p-5 border-b sm:border-b-0 sm:border-r border-outline-variant flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-mono text-label-mono text-outline uppercase tracking-wider">REGISTERED PATRONS</span>
                    <span className="font-label-mono text-[10px] text-primary bg-secondary-fixed px-1.5 py-0.5 rounded-[1px]">+18 THIS MO</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-md text-headline-md text-on-surface">864</span>
                    <span className="font-body-sm text-body-sm text-outline">verified files</span>
                  </div>
                </div>
                {/* Metric 2 */}
                <div className="p-5 border-b sm:border-b-0 lg:border-r border-outline-variant flex flex-col justify-between bg-surface-container">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-mono text-label-mono text-outline uppercase tracking-wider">LICENCES PENDING REVIEW</span>
                    <span className="font-label-mono text-[10px] text-on-error-container bg-error-container px-1.5 py-0.5 rounded-[1px] font-semibold">ACTION REQ</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-md text-headline-md text-error">7</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">dossiers queued</span>
                  </div>
                </div>
                {/* Metric 3 */}
                <div className="p-5 border-b sm:border-b-0 sm:border-r border-outline-variant flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-mono text-label-mono text-outline uppercase tracking-wider">ACTIVE EXPEDITIONS</span>
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-md text-headline-md text-on-surface">31</span>
                    <span className="font-body-sm text-body-sm text-outline">Diurnal Journeys</span>
                  </div>
                </div>
                {/* Metric 4 */}
                <div className="p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-mono text-label-mono text-outline uppercase tracking-wider">AVG LIFETIME VALUE</span>
                    <span className="font-label-mono text-[10px] text-outline">TIER I–III</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-md text-headline-md text-on-surface">€8,420</span>
                    <span className="font-body-sm text-body-sm text-outline">Weighted Mean</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Filtration & Search Strip */}
            <div className="w-full px-8 py-4 bg-surface-container-low border-b border-outline-variant flex flex-wrap items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 min-w-[320px] max-w-lg">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
                <input className="w-full pl-9 pr-14 py-2 bg-surface border border-outline-variant font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-hidden focus:border-primary rounded-[2px]" placeholder="Filter by patron name, email, phone, passport or licence..." type="text" />
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 font-label-mono text-[10px] text-outline bg-surface-container px-1.5 py-0.5 border border-outline-variant rounded-[1px]">⌘K</div>
              </div>
              {/* Filter Selectors & Chips */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Licence Status Dropdown Indicator */}
                <div className="relative">
                  <button className="px-3 py-1.5 bg-surface border border-outline-variant text-on-surface font-label-mono text-label-mono uppercase flex items-center gap-2 hover:bg-surface-container transition-colors rounded-[2px]">
                    <span>Licence: All Statuses (782/7/3)</span>
                    {" "}
                    <span className="material-symbols-outlined text-[14px] text-outline">arrow_drop_down</span>
                  </button>
                </div>
                {/* Home Hub */}
                <div className="relative">
                  <button className="px-3 py-1.5 bg-surface border border-outline-variant text-on-surface font-label-mono text-label-mono uppercase flex items-center gap-2 hover:bg-surface-container transition-colors rounded-[2px]">
                    <span>Hub: All (MUC, ZRH, GVA...)</span>
                    {" "}
                    <span className="material-symbols-outlined text-[14px] text-outline">arrow_drop_down</span>
                  </button>
                </div>
                {/* Upcoming Booking Active Filter */}
                <button className="px-3 py-1.5 bg-primary text-surface border border-primary font-label-mono text-label-mono uppercase flex items-center gap-1.5 rounded-[2px]">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                  {" "}
                  <span>HAS UPCOMING BOOKING</span>
                </button>
                {/* Tier */}
                <div className="relative">
                  <button className="px-3 py-1.5 bg-surface border border-outline-variant text-on-surface font-label-mono text-label-mono uppercase flex items-center gap-2 hover:bg-surface-container transition-colors rounded-[2px]">
                    <span>Tier: All (I–III)</span>
                    {" "}
                    <span className="material-symbols-outlined text-[14px] text-outline">arrow_drop_down</span>
                  </button>
                </div>
                {/* Reset */}
                <button className="px-2 py-1.5 text-outline hover:text-on-surface font-label-mono text-label-mono uppercase underline underline-offset-4 ml-1 transition-colors">Reset</button>
              </div>
            </div>
            {/* Table Directory Matrix */}
            <div className="w-full px-8 py-6 bg-surface overflow-x-auto">
              <table className="w-full text-left border-collapse border border-outline-variant">
                <thead>
                  <tr className="bg-surface-container font-label-mono text-label-mono text-outline uppercase border-b border-outline-variant tracking-wider">
                    <th className="py-3 px-4 font-normal border-r border-outline-variant w-[24%]">{"Patron Name & Tier"}</th>
                    <th className="py-3 px-4 font-normal border-r border-outline-variant w-[22%]">Contact Details</th>
                    <th className="py-3 px-4 font-normal border-r border-outline-variant w-[18%]">{"Accreditation & Status"}</th>
                    <th className="py-3 px-4 font-normal border-r border-outline-variant w-[12%] text-center">Expeditions</th>
                    <th className="py-3 px-4 font-normal border-r border-outline-variant w-[10%] text-right">LTV (EUR/CHF)</th>
                    <th className="py-3 px-4 font-normal border-r border-outline-variant w-[10%]">Last / Next Date</th>
                    <th className="py-3 px-4 font-normal text-right w-[4%]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant font-body-sm text-body-sm">
                  {/* Row 1: Clara von Bergmann */}
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="font-action text-action text-on-surface font-semibold tracking-wide">Clara von Bergmann</div>
                      <div className="font-label-mono text-[10px] text-secondary flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 bg-primary" />
                        <span>PATRON TIER II · MEMBER SINCE 2022</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="text-on-surface font-body-sm">c.vonbergmann@munich-atelier.de</div>
                      <div className="font-spec-numeral text-spec-numeral text-outline mt-0.5">+49 89 2109 4432</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary text-surface font-label-mono text-[9px] uppercase tracking-wider rounded-[1px]">
                          <span className="material-symbols-outlined text-[10px]">check</span>
                          {" "}VERIFIED
                        </span>
                      </div>
                      <div className="font-label-mono text-[10px] text-outline mt-1 uppercase">DE KBA Verified</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant text-center">
                      <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">4 Bookings</span>
                      {" "}
                      <div className="font-label-mono text-[10px] text-primary mt-0.5 uppercase tracking-tight">HLD-0612 (UPCOMING)</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant text-right">
                      <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">€6,925.80</span>
                      {" "}
                      <div className="font-label-mono text-[10px] text-outline mt-0.5">CHF 6,710.00</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="font-spec-numeral text-spec-numeral text-primary font-medium">12 Jun 2025</div>
                      <div className="font-label-mono text-[9px] text-primary uppercase">Upcoming Stage</div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link className="font-label-mono text-[11px] text-primary hover:text-primary-container uppercase tracking-wider font-semibold inline-flex items-center gap-1 whitespace-nowrap" href="/staff/customers/clara-von-bergmann">
                        Dossier{" "}
                        <span className="text-xs">→</span>
                      </Link>
                    </td>
                  </tr>
                  {/* Row 2: Henrik Lindqvist (Pending) */}
                  <tr className="hover:bg-surface-container-low transition-colors bg-surface-container-lowest/50 group">
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="font-action text-action text-on-surface font-semibold tracking-wide">Henrik Lindqvist</div>
                      <div className="font-label-mono text-[10px] text-outline flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 bg-outline" />
                        <span>PATRON TIER I · ENROLLED 2024</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="text-on-surface font-body-sm">h.lindqvist@nordic-capital.se</div>
                      <div className="font-spec-numeral text-spec-numeral text-outline mt-0.5">+46 8 505 1200</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-error-container text-on-error-container font-label-mono text-[9px] uppercase tracking-wider font-semibold rounded-[1px]">
                          <span className="material-symbols-outlined text-[10px]">schedule</span>
                          {" "}PENDING
                        </span>
                      </div>
                      <div className="font-label-mono text-[10px] text-outline mt-1 uppercase">{"SE Driver's Lic."}</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant text-center">
                      <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">1 Booking</span>
                      {" "}
                      <div className="font-label-mono text-[10px] text-primary mt-0.5 uppercase tracking-tight">HLD-0841 (UPCOMING)</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant text-right">
                      <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">€1,840.00</span>
                      {" "}
                      <div className="font-label-mono text-[10px] text-outline mt-0.5">CHF 1,780.00</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="font-spec-numeral text-spec-numeral text-on-surface font-medium">14 Jun 2025</div>
                      <div className="font-label-mono text-[9px] text-outline uppercase">Upcoming Stage</div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link className="font-label-mono text-[11px] text-error hover:text-on-error-container uppercase tracking-wider font-semibold inline-flex items-center gap-1 whitespace-nowrap" href="/staff/customers/clara-von-bergmann">
                        Review{" "}
                        <span className="text-xs">→</span>
                      </Link>
                    </td>
                  </tr>
                  {/* Row 3: Dr. Isabella Moreau */}
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="font-action text-action text-on-surface font-semibold tracking-wide flex items-center gap-2">
                        <span>Dr. Isabella Moreau</span>
                        <span className="font-label-mono text-[8px] bg-secondary-fixed text-on-secondary-fixed px-1 py-0.2 tracking-widest uppercase">FOUNDER</span>
                      </div>
                      <div className="font-label-mono text-[10px] text-primary flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 bg-primary" />
                        <span>PATRON TIER III · FOUNDING PATRON</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="text-on-surface font-body-sm">i.moreau@ch-sorbonne.fr</div>
                      <div className="font-spec-numeral text-spec-numeral text-outline mt-0.5">+33 1 42 68 55 00</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary text-surface font-label-mono text-[9px] uppercase tracking-wider rounded-[1px]">
                          <span className="material-symbols-outlined text-[10px]">check</span>
                          {" "}VERIFIED
                        </span>
                      </div>
                      <div className="font-label-mono text-[10px] text-outline mt-1 uppercase">FR Permis de Conduire</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant text-center">
                      <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">8 Bookings</span>
                      {" "}
                      <div className="font-label-mono text-[10px] text-primary mt-0.5 uppercase tracking-tight">HLD-0789 (UPCOMING)</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant text-right">
                      <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">€14,350.00</span>
                      {" "}
                      <div className="font-label-mono text-[10px] text-outline mt-0.5">CHF 13,910.00</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="font-spec-numeral text-spec-numeral text-primary font-medium">15 Jun 2025</div>
                      <div className="font-label-mono text-[9px] text-primary uppercase">Upcoming Stage</div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link className="font-label-mono text-[11px] text-primary hover:text-primary-container uppercase tracking-wider font-semibold inline-flex items-center gap-1 whitespace-nowrap" href="/staff/customers/clara-von-bergmann">
                        Dossier{" "}
                        <span className="text-xs">→</span>
                      </Link>
                    </td>
                  </tr>
                  {/* Row 4: Marcus Sterling (Rejected) */}
                  <tr className="hover:bg-surface-container-low transition-colors bg-error-container/10 group">
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="font-action text-action text-on-surface font-semibold tracking-wide">Marcus Sterling</div>
                      <div className="font-label-mono text-[10px] text-outline flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 bg-outline-variant" />
                        <span>NEW PATRON · PROVISIONAL ACCOUNT</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="text-on-surface font-body-sm">m.sterling@mayfair-advisory.co.uk</div>
                      <div className="font-spec-numeral text-spec-numeral text-outline mt-0.5">+44 20 7946 0912</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-error text-on-error font-label-mono text-[9px] uppercase tracking-wider font-semibold rounded-[1px]">
                          <span className="material-symbols-outlined text-[10px]">close</span>
                          {" "}REJECTED
                        </span>
                      </div>
                      <div className="font-label-mono text-[10px] text-error mt-1 uppercase">UK DVLA Expired Photo</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant text-center">
                      <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">0 Bookings</span>
                      {" "}
                      <div className="font-label-mono text-[10px] text-error mt-0.5 uppercase tracking-tight">HLD-0922 (ON HOLD)</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant text-right">
                      <span className="font-spec-numeral text-spec-numeral text-outline font-medium">€0.00</span>
                      {" "}
                      <div className="font-label-mono text-[10px] text-outline mt-0.5">CHF 0.00</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="font-spec-numeral text-spec-numeral text-outline">None</div>
                      <div className="font-label-mono text-[9px] text-outline uppercase">—</div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link className="font-label-mono text-[11px] text-error hover:text-on-error-container uppercase tracking-wider font-semibold inline-flex items-center gap-1 whitespace-nowrap" href="/staff/customers/clara-von-bergmann">
                        Resolve{" "}
                        <span className="text-xs">→</span>
                      </Link>
                    </td>
                  </tr>
                  {/* Row 5: Baronesse Sophie von Thurn */}
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="font-action text-action text-on-surface font-semibold tracking-wide">Baronesse Sophie von Thurn</div>
                      <div className="font-label-mono text-[10px] text-secondary flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 bg-primary" />
                        <span>PATRON TIER II · MEMBER SINCE 2023</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="text-on-surface font-body-sm">s.vonthurn@thurn-holding.ch</div>
                      <div className="font-spec-numeral text-spec-numeral text-outline mt-0.5">+41 22 819 3300</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary text-surface font-label-mono text-[9px] uppercase tracking-wider rounded-[1px]">
                          <span className="material-symbols-outlined text-[10px]">check</span>
                          {" "}VERIFIED
                        </span>
                      </div>
                      <div className="font-label-mono text-[10px] text-outline mt-1 uppercase">CH Führerausweis</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant text-center">
                      <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">3 Bookings</span>
                      {" "}
                      <div className="font-label-mono text-[10px] text-primary mt-0.5 uppercase tracking-tight">HLD-0551 (UPCOMING)</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant text-right">
                      <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">€5,210.00</span>
                      {" "}
                      <div className="font-label-mono text-[10px] text-outline mt-0.5">CHF 5,060.00</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="font-spec-numeral text-spec-numeral text-primary font-medium">18 Jun 2025</div>
                      <div className="font-label-mono text-[9px] text-primary uppercase">Upcoming Stage</div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link className="font-label-mono text-[11px] text-primary hover:text-primary-container uppercase tracking-wider font-semibold inline-flex items-center gap-1 whitespace-nowrap" href="/staff/customers/clara-von-bergmann">
                        Dossier{" "}
                        <span className="text-xs">→</span>
                      </Link>
                    </td>
                  </tr>
                  {/* Row 6: Julian Croft (Expired) */}
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="font-action text-action text-on-surface font-semibold tracking-wide">Julian Croft</div>
                      <div className="font-label-mono text-[10px] text-outline flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 bg-outline" />
                        <span>PATRON TIER I · ENROLLED 2023</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="text-on-surface font-body-sm">j.croft@geneva-wealth.ch</div>
                      <div className="font-spec-numeral text-spec-numeral text-outline mt-0.5">+41 22 730 4411</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-surface-container-highest text-on-surface-variant font-label-mono text-[9px] uppercase tracking-wider rounded-[1px]">
                          <span className="material-symbols-outlined text-[10px]">warning</span>
                          {" "}EXPIRED
                        </span>
                      </div>
                      <div className="font-label-mono text-[10px] text-outline mt-1 uppercase">UK Licence Exp. 14 Oct 24</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant text-center">
                      <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">2 Bookings</span>
                      {" "}
                      <div className="font-label-mono text-[10px] text-outline mt-0.5 uppercase tracking-tight">0 ACTIVE BOOKINGS</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant text-right">
                      <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">€3,120.00</span>
                      {" "}
                      <div className="font-label-mono text-[10px] text-outline mt-0.5">CHF 3,025.00</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="font-spec-numeral text-spec-numeral text-on-surface">20 Oct 2024</div>
                      <div className="font-label-mono text-[9px] text-outline uppercase">Concluded</div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link className="font-label-mono text-[11px] text-on-surface hover:text-primary uppercase tracking-wider font-semibold inline-flex items-center gap-1 whitespace-nowrap" href="/staff/customers/clara-von-bergmann">
                        Renewal{" "}
                        <span className="text-xs">→</span>
                      </Link>
                    </td>
                  </tr>
                  {/* Row 7: Arthur Pendelton */}
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="font-action text-action text-on-surface font-semibold tracking-wide">Arthur Pendelton</div>
                      <div className="font-label-mono text-[10px] text-outline flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 bg-outline" />
                        <span>PATRON TIER I · ENROLLED 2022</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="text-on-surface font-body-sm">a.pendelton@oxford-consortium.org</div>
                      <div className="font-spec-numeral text-spec-numeral text-outline mt-0.5">+44 1865 270000</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary text-surface font-label-mono text-[9px] uppercase tracking-wider rounded-[1px]">
                          <span className="material-symbols-outlined text-[10px]">check</span>
                          {" "}VERIFIED
                        </span>
                      </div>
                      <div className="font-label-mono text-[10px] text-outline mt-1 uppercase">UK Full Licence</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant text-center">
                      <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">5 Bookings</span>
                      {" "}
                      <div className="font-label-mono text-[10px] text-outline mt-0.5 uppercase tracking-tight">INERT SCHEDULE</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant text-right">
                      <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">€8,900.00</span>
                      {" "}
                      <div className="font-label-mono text-[10px] text-outline mt-0.5">CHF 8,635.00</div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-outline-variant">
                      <div className="font-spec-numeral text-spec-numeral text-on-surface">04 Sep 2024</div>
                      <div className="font-label-mono text-[9px] text-outline uppercase">Concluded</div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link className="font-label-mono text-[11px] text-primary hover:text-primary-container uppercase tracking-wider font-semibold inline-flex items-center gap-1 whitespace-nowrap" href="/staff/customers/clara-von-bergmann">
                        Dossier{" "}
                        <span className="text-xs">→</span>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Pagination & Archival Compliance Footer */}
            <div className="w-full px-8 py-5 bg-surface border-t border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Pagination Controls */}
              <div className="flex items-center gap-4">
                <span className="font-label-mono text-label-mono text-outline uppercase tracking-wider">Showing 1–7 of 864 Patrons</span>
                <div className="flex items-center gap-1 font-label-mono text-label-mono">
                  <button className="px-2.5 py-1 bg-surface-container-low text-outline hover:text-on-surface border border-outline-variant rounded-[1px] disabled:opacity-40 transition-colors" disabled>PREV</button>
                  <button className="px-2.5 py-1 bg-primary text-surface border border-primary font-bold rounded-[1px]">1</button>
                  <button className="px-2.5 py-1 bg-surface text-on-surface hover:bg-surface-container border border-outline-variant rounded-[1px] transition-colors">2</button>
                  <button className="px-2.5 py-1 bg-surface text-on-surface hover:bg-surface-container border border-outline-variant rounded-[1px] transition-colors">3</button>
                  <span className="px-1 text-outline">...</span>
                  <button className="px-2.5 py-1 bg-surface text-on-surface hover:bg-surface-container border border-outline-variant rounded-[1px] transition-colors">124</button>
                  <button className="px-2.5 py-1 bg-surface-container-low text-on-surface hover:bg-surface-container border border-outline-variant rounded-[1px] transition-colors">NEXT</button>
                </div>
              </div>
              {/* Data Privacy Notice */}
              <div className="flex items-center gap-2 text-outline">
                <span className="material-symbols-outlined text-[16px] text-primary">verified_user</span>
                <span className="font-label-mono text-[10px] tracking-wider uppercase">{"Canton of Zurich Data Protection Act & GDPR Art. 30 Regulated Ledger // Encrypted under ISO-27001 Protocol"}</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
