import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";

/** Stitch screen "HALDEN — Operations Console" — generated from design/stitch-export-round2/halden_staff_console_fleet_management/code.html */
export function StaffFleet() {
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
          <div className="flex flex-col w-full pb-32">
            {/* Page Header & Exhibition Ledger Banner */}
            <section className="w-full pt-8 pb-6 border-b border-outline-variant flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-label-mono text-label-mono text-primary font-bold uppercase tracking-widest">ARCHIVE LEDGER</span>
                  <span className="text-outline-variant">/</span>
                  <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">{"[42 CHASSIS LOGGED // 34 ACTIVE]"}</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface font-normal tracking-tight">Fleet</h1>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">Curatorial ledger, mechanical allocation, and chassis custody matrix across European alpine stations.</p>
              </div>
              {/* Quick Stats Metric Ticker */}
              <div className="flex items-stretch gap-px bg-outline-variant">
                <div className="bg-surface-container-low px-5 py-3 flex flex-col">
                  <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">IN CUSTODY</span>
                  <span className="font-spec-numeral text-spec-numeral text-on-surface font-bold mt-1">
                    34{" "}
                    <span className="font-normal text-on-surface-variant text-[11px]">RUNNING</span>
                  </span>
                </div>
                <div className="bg-surface-container-low px-5 py-3 flex flex-col">
                  <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">ALLOCATED</span>
                  <span className="font-spec-numeral text-spec-numeral text-primary font-bold mt-1">81.0%</span>
                </div>
                <div className="bg-surface-container-low px-5 py-3 flex flex-col">
                  <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">SCHEDULED SRV</span>
                  <span className="font-spec-numeral text-spec-numeral text-[#C98A2C] font-bold mt-1">04 CHASSIS</span>
                </div>
              </div>
            </section>
            {/* Curatorial Filter Toolbar */}
            <section className="w-full py-5 border-b border-outline-variant flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Search Input (Curatorial Style) */}
                <div className="relative flex-1 max-w-lg">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
                  <input className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm pl-10 pr-4 py-2 border border-outline-variant rounded-none focus:outline-hidden focus:border-primary placeholder:text-on-surface-variant transition-colors" placeholder="Filter by exhibit no., VIN, chassis model, plate..." type="text" />
                  <kbd className="absolute right-3 top-1/2 -translate-y-1/2 font-label-mono text-[10px] text-on-surface-variant px-1.5 py-0.5 bg-surface-container border border-outline-variant">⌘K</kbd>
                </div>
                {/* Toolbar Actions & View Mode */}
                <div className="flex items-center gap-3 self-end lg:self-auto">
                  {/* View Switcher */}
                  <div className="flex border border-outline-variant p-0.5 bg-surface-container-low">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-on-primary font-label-mono text-label-mono uppercase transition-colors" title="Table View">
                      <span className="material-symbols-outlined text-[16px]">view_list</span>
                      {" "}
                      <span>Ledger</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-on-surface-variant hover:text-on-surface font-label-mono text-label-mono uppercase transition-colors" title="Gallery Grid">
                      <span className="material-symbols-outlined text-[16px]">grid_view</span>
                      {" "}
                      <span>Gallery</span>
                    </button>
                  </div>
                  {/* Add Vehicle Primary Button */}
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-primary-container text-surface-bright hover:bg-primary font-action text-action uppercase tracking-wider transition-colors duration-150">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    {" "}
                    <span>+ Add Vehicle</span>
                  </button>
                </div>
              </div>
              {/* Filter Chips Row */}
              <div className="flex flex-wrap items-center gap-2 pt-1 font-label-mono text-label-mono">
                <span className="text-on-surface-variant uppercase mr-1">CRITERIA:</span>
                {/* Hub Dropdown Filter */}
                <div className="relative inline-block">
                  <select className="appearance-none bg-surface-container-low text-on-surface border border-outline-variant pl-3 pr-8 py-1.5 rounded-none font-label-mono text-label-mono uppercase focus:outline-hidden focus:border-primary cursor-pointer">
                    <option>Hub: All Hubs (5)</option>
                    <option>Hub: MUC — Munich</option>
                    <option>Hub: ZRH — Zurich</option>
                    <option>Hub: GVA — Geneva</option>
                    <option>Hub: MXP — Milan</option>
                    <option>Hub: VIE — Vienna</option>
                  </select>
                  <span className="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[16px] text-on-surface-variant">expand_more</span>
                </div>
                {/* Category Filter */}
                <div className="relative inline-block">
                  <select className="appearance-none bg-surface-container-low text-on-surface border border-outline-variant pl-3 pr-8 py-1.5 rounded-none font-label-mono text-label-mono uppercase focus:outline-hidden focus:border-primary cursor-pointer">
                    <option>Category: All Categories</option>
                    <option>Category: Grand Tourer</option>
                    <option>Category: All-Terrain SUV</option>
                    <option>Category: Sports Coupe</option>
                    <option>Category: Executive</option>
                  </select>
                  <span className="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[16px] text-on-surface-variant">expand_more</span>
                </div>
                {/* Status Filter */}
                <div className="relative inline-block">
                  <select className="appearance-none bg-primary text-on-primary border border-primary pl-3 pr-8 py-1.5 rounded-none font-label-mono text-label-mono uppercase focus:outline-hidden cursor-pointer">
                    <option>Status: All Statuses (Active)</option>
                    <option>Status: Available</option>
                    <option>Status: On Rent</option>
                    <option>Status: In Service</option>
                    <option>Status: Retired</option>
                  </select>
                  <span className="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[16px] text-on-primary">expand_more</span>
                </div>
                {/* Brand Filter */}
                <div className="relative inline-block">
                  <select className="appearance-none bg-surface-container-low text-on-surface border border-outline-variant pl-3 pr-8 py-1.5 rounded-none font-label-mono text-label-mono uppercase focus:outline-hidden focus:border-primary cursor-pointer">
                    <option>Brand: All Marques</option>
                    <option>Brand: Porsche</option>
                    <option>Brand: Land Rover</option>
                    <option>Brand: Lexus</option>
                    <option>Brand: Audi</option>
                    <option>Brand: Mercedes-Benz</option>
                    <option>Brand: BMW</option>
                  </select>
                  <span className="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[16px] text-on-surface-variant">expand_more</span>
                </div>
                <button className="text-on-surface-variant hover:text-on-surface underline underline-offset-4 ml-auto text-label-mono uppercase transition-colors">Reset Ledger</button>
              </div>
            </section>
            {/* Fleet Master Table (Architectural Ledger) */}
            <section className="w-full mt-4 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container-low font-label-mono text-label-mono uppercase text-on-surface-variant">
                    <th className="py-3 px-3 w-10 text-center"><input aria-label="Select all exhibits" defaultChecked className="w-3.5 h-3.5 accent-primary rounded-none border border-on-surface cursor-pointer" type="checkbox" /></th>
                    <th className="py-3 px-4 font-normal tracking-wider w-24">EXHIBIT №</th>
                    <th className="py-3 px-4 font-normal tracking-wider min-w-[320px]">{"CHASSIS & SPECIFICATION"}</th>
                    <th className="py-3 px-4 font-normal tracking-wider w-28">PLATE</th>
                    <th className="py-3 px-4 font-normal tracking-wider w-20">HUB</th>
                    <th className="py-3 px-4 font-normal tracking-wider w-32">CATEGORY</th>
                    <th className="py-3 px-4 font-normal tracking-wider w-36">STATUS</th>
                    <th className="py-3 px-4 font-normal tracking-wider text-right w-28">DAY RATE</th>
                    <th className="py-3 px-4 font-normal tracking-wider min-w-[160px]">NEXT ALLOCATION</th>
                    <th className="py-3 px-4 font-normal tracking-wider w-40">14D UTILISATION</th>
                    <th className="py-3 px-3 text-center w-12 font-normal">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant font-body-sm text-body-sm">
                  {/* Row 1: Porsche 911 GT3 (Checked) */}
                  <tr className="bg-surface-container-lowest hover:bg-surface-container-low transition-colors group">
                    <td className="py-4 px-3 text-center"><input aria-label="Select exhibit 01" defaultChecked className="w-3.5 h-3.5 accent-primary rounded-none border border-on-surface cursor-pointer" type="checkbox" /></td>
                    <td className="py-4 px-4 font-spec-numeral text-spec-numeral text-on-surface-variant"># 01</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-13 shrink-0 overflow-hidden bg-surface-container border border-outline-variant"><Photo src={media.fleetGt3Profile} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" data-alt="Side profile studio photography of a gloss black Porsche 911 GT3 Touring parked against a minimalist warm stone wall in a curated luxury automotive showroom, neutral warm lighting, sharp silhouette" sizes="(max-width: 767px) 100vw, 4vw" alt="" /></div>
                        <div className="min-w-0 flex flex-col">
                          <span className="font-headline-sm text-[17px] leading-tight text-on-surface font-normal">Porsche 911 GT3 Touring</span>
                          <span className="font-label-mono text-label-mono text-on-surface-variant uppercase mt-1">Obsidian Black · 4.0L Flat-6 · PDK</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-spec-numeral text-spec-numeral text-on-surface">ZH-91104</td>
                    <td className="py-4 px-4"><span className="font-label-mono text-label-mono px-2 py-0.5 bg-surface-container border border-outline-variant text-on-surface">ZRH</span></td>
                    <td className="py-4 px-4 text-on-surface-variant">Sports Coupe</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary text-on-primary font-label-mono text-[10px] uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed" />
                        {" "}AVAILABLE
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-spec-numeral text-spec-numeral text-on-surface font-bold">€540</td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-body-sm text-body-sm text-on-surface">18 Oct 2024</span>
                        <span className="font-label-mono text-[10px] text-primary uppercase">4d staging window</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-surface-container overflow-hidden"><div className="h-full bg-primary" style={{ width: "85%" }} /></div>
                        <span className="font-label-mono text-[11px] text-on-surface-variant">85%</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-center"><button className="w-7 h-7 inline-flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"><span className="material-symbols-outlined text-[18px]">more_vert</span></button></td>
                  </tr>
                  {/* Row 2: Range Rover Autobiography (Checked) */}
                  <tr className="bg-surface-container-lowest hover:bg-surface-container-low transition-colors group">
                    <td className="py-4 px-3 text-center"><input aria-label="Select exhibit 02" defaultChecked className="w-3.5 h-3.5 accent-primary rounded-none border border-on-surface cursor-pointer" type="checkbox" /></td>
                    <td className="py-4 px-4 font-spec-numeral text-spec-numeral text-on-surface-variant"># 02</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-13 shrink-0 overflow-hidden bg-surface-container border border-outline-variant"><Photo src={media.fleetRangeRover} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" data-alt="Studio exhibition photo of a modern silver metallic Range Rover Autobiography on polished architectural stone tiles, soft shadow lines, pristine showroom lighting" sizes="(max-width: 767px) 100vw, 4vw" alt="" /></div>
                        <div className="min-w-0 flex flex-col">
                          <span className="font-headline-sm text-[17px] leading-tight text-on-surface font-normal">Range Rover Autobiography</span>
                          <span className="font-label-mono text-label-mono text-on-surface-variant uppercase mt-1">Meteorite Silver · 4.4L V8 Twin-Turbo</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-spec-numeral text-spec-numeral text-on-surface">M-HL 4821</td>
                    <td className="py-4 px-4"><span className="font-label-mono text-label-mono px-2 py-0.5 bg-surface-container border border-outline-variant text-on-surface">MUC</span></td>
                    <td className="py-4 px-4 text-on-surface-variant">All-Terrain SUV</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-tertiary text-inverse-on-surface font-label-mono text-[10px] uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse" />
                        {" "}ON RENT
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-spec-numeral text-spec-numeral text-on-surface font-bold">€390</td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-body-sm text-body-sm text-on-surface">Due 15 Jun</span>
                        <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">Custody: Dr. H. Brandt</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-surface-container overflow-hidden"><div className="h-full bg-primary" style={{ width: "92%" }} /></div>
                        <span className="font-label-mono text-[11px] text-on-surface-variant">92%</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-center"><button className="w-7 h-7 inline-flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"><span className="material-symbols-outlined text-[18px]">more_vert</span></button></td>
                  </tr>
                  {/* Row 3: Audi RS6 Avant */}
                  <tr className="bg-surface hover:bg-surface-container-low transition-colors group">
                    <td className="py-4 px-3 text-center"><input aria-label="Select exhibit 03" className="w-3.5 h-3.5 accent-primary rounded-none border border-on-surface cursor-pointer" type="checkbox" /></td>
                    <td className="py-4 px-4 font-spec-numeral text-spec-numeral text-on-surface-variant"># 03</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-13 shrink-0 overflow-hidden bg-surface-container border border-outline-variant"><Photo src={media.fleetAudiRs6} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" data-alt="Studio catalog shot of a deep midnight blue Audi RS6 Avant luxury performance wagon, neutral concrete architectural space, soft clean studio highlights on sculpted bodywork" sizes="(max-width: 767px) 100vw, 4vw" alt="" /></div>
                        <div className="min-w-0 flex flex-col">
                          <span className="font-headline-sm text-[17px] leading-tight text-on-surface font-normal">Audi RS6 Avant</span>
                          <span className="font-label-mono text-label-mono text-on-surface-variant uppercase mt-1">Midnight Blue · 4.0L Twin-Turbo · Quattro</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-spec-numeral text-spec-numeral text-on-surface">W-8821H</td>
                    <td className="py-4 px-4"><span className="font-label-mono text-label-mono px-2 py-0.5 bg-surface-container border border-outline-variant text-on-surface">VIE</span></td>
                    <td className="py-4 px-4 text-on-surface-variant">Grand Tourer</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F9F5EC] border border-[#C98A2C] text-[#C98A2C] font-label-mono text-[10px] uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C98A2C]" />
                        {" "}IN SERVICE
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-spec-numeral text-spec-numeral text-on-surface font-bold">€420</td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-body-sm text-body-sm text-[#C98A2C]">Hold until 14 Oct</span>
                        <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">48-pt diagnostic check</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-surface-container overflow-hidden"><div className="h-full bg-[#C98A2C]" style={{ width: "40%" }} /></div>
                        <span className="font-label-mono text-[11px] text-on-surface-variant">40%</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-center"><button className="w-7 h-7 inline-flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"><span className="material-symbols-outlined text-[18px]">more_vert</span></button></td>
                  </tr>
                  {/* Row 4: Lexus LC 500 */}
                  <tr className="bg-surface hover:bg-surface-container-low transition-colors group">
                    <td className="py-4 px-3 text-center"><input aria-label="Select exhibit 04" className="w-3.5 h-3.5 accent-primary rounded-none border border-on-surface cursor-pointer" type="checkbox" /></td>
                    <td className="py-4 px-4 font-spec-numeral text-spec-numeral text-on-surface-variant"># 04</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-13 shrink-0 overflow-hidden bg-surface-container border border-outline-variant"><Photo src={media.fleetLexusTerrace} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" data-alt="A champagne bronze metallic Lexus LC 500 coupe parked in a contemporary architectural terrace overlooking a serene dusk lake setting, editorial luxury mood" sizes="(max-width: 767px) 100vw, 4vw" alt="" /></div>
                        <div className="min-w-0 flex flex-col">
                          <span className="font-headline-sm text-[17px] leading-tight text-on-surface font-normal">Lexus LC 500 Coupe</span>
                          <span className="font-label-mono text-label-mono text-on-surface-variant uppercase mt-1">Champagne Bronze · 5.0L Naturally Aspirated V8</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-spec-numeral text-spec-numeral text-on-surface">MI-77210</td>
                    <td className="py-4 px-4"><span className="font-label-mono text-label-mono px-2 py-0.5 bg-surface-container border border-outline-variant text-on-surface">MXP</span></td>
                    <td className="py-4 px-4 text-on-surface-variant">Grand Tourer</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary text-on-primary font-label-mono text-[10px] uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed" />
                        {" "}AVAILABLE
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-spec-numeral text-spec-numeral text-on-surface font-bold">€380</td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-body-sm text-body-sm text-on-surface">22 Oct 2024</span>
                        <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">Pre-check certified</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-surface-container overflow-hidden"><div className="h-full bg-primary" style={{ width: "68%" }} /></div>
                        <span className="font-label-mono text-[11px] text-on-surface-variant">68%</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-center"><button className="w-7 h-7 inline-flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"><span className="material-symbols-outlined text-[18px]">more_vert</span></button></td>
                  </tr>
                  {/* Row 5: Mercedes-Benz S 580 (Using Image 113) */}
                  <tr className="bg-surface hover:bg-surface-container-low transition-colors group">
                    <td className="py-4 px-3 text-center"><input aria-label="Select exhibit 05" className="w-3.5 h-3.5 accent-primary rounded-none border border-on-surface cursor-pointer" type="checkbox" /></td>
                    <td className="py-4 px-4 font-spec-numeral text-spec-numeral text-on-surface-variant"># 05</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-13 shrink-0 overflow-hidden bg-surface-container border border-outline-variant"><Photo src={media.mercedesS500Studio} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 767px) 100vw, 10vw" alt="" /></div>
                        <div className="min-w-0 flex flex-col">
                          <span className="font-headline-sm text-[17px] leading-tight text-on-surface font-normal">Mercedes-Benz S 580 4MATIC</span>
                          <span className="font-label-mono text-label-mono text-on-surface-variant uppercase mt-1">Graphite Grey · 4.0L V8 Biturbo EQ</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-spec-numeral text-spec-numeral text-on-surface">GE-40219</td>
                    <td className="py-4 px-4"><span className="font-label-mono text-label-mono px-2 py-0.5 bg-surface-container border border-outline-variant text-on-surface">GVA</span></td>
                    <td className="py-4 px-4 text-on-surface-variant">Executive</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-tertiary text-inverse-on-surface font-label-mono text-[10px] uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                        {" "}ON RENT
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-spec-numeral text-spec-numeral text-on-surface font-bold">€410</td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-body-sm text-body-sm text-on-surface">Due 16 Oct</span>
                        <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">Custody: V. Lindqvist</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-surface-container overflow-hidden"><div className="h-full bg-primary" style={{ width: "78%" }} /></div>
                        <span className="font-label-mono text-[11px] text-on-surface-variant">78%</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-center"><button className="w-7 h-7 inline-flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"><span className="material-symbols-outlined text-[18px]">more_vert</span></button></td>
                  </tr>
                  {/* Row 6: BMW 540i xDrive (Using Image 119 - Retired) */}
                  <tr className="bg-surface-container-low/40 hover:bg-surface-container-low transition-colors opacity-75 group">
                    <td className="py-4 px-3 text-center"><input aria-label="Select exhibit 06" className="w-3.5 h-3.5 accent-primary rounded-none border border-on-surface cursor-pointer" type="checkbox" /></td>
                    <td className="py-4 px-4 font-spec-numeral text-spec-numeral text-on-surface-variant"># 06</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-13 shrink-0 overflow-hidden bg-surface-container border border-outline-variant grayscale"><Photo src={media.bmw530eStudio} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 767px) 100vw, 6vw" alt="" /></div>
                        <div className="min-w-0 flex flex-col">
                          <span className="font-headline-sm text-[17px] leading-tight text-on-surface font-normal">BMW 540i xDrive</span>
                          <span className="font-label-mono text-label-mono text-on-surface-variant uppercase mt-1">Dark Slate Grey · 3.0L B58 Turbo</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-spec-numeral text-spec-numeral text-on-surface-variant">M-HL 3390</td>
                    <td className="py-4 px-4"><span className="font-label-mono text-label-mono px-2 py-0.5 bg-surface-container border border-outline-variant text-on-surface-variant">MUC</span></td>
                    <td className="py-4 px-4 text-on-surface-variant">Executive</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-container border border-outline-variant text-on-surface-variant font-label-mono text-[10px] uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-outline" />
                        {" "}RETIRED
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-spec-numeral text-spec-numeral text-on-surface-variant line-through">€290</td>
                    <td className="py-4 px-4 font-label-mono text-[11px] text-on-surface-variant">Decommissioned</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-surface-container overflow-hidden"><div className="h-full bg-outline-variant" style={{ width: "0%" }} /></div>
                        <span className="font-label-mono text-[11px] text-on-surface-variant">0%</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-center"><button className="w-7 h-7 inline-flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"><span className="material-symbols-outlined text-[18px]">more_vert</span></button></td>
                  </tr>
                </tbody>
              </table>
            </section>
            {/* Ledger Pagination & Registry Summary */}
            <section className="w-full py-4 border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
              <div className="font-label-mono text-label-mono text-on-surface-variant uppercase">SHOWING 1–6 OF 42 CHASSIS SPECIFICATIONS</div>
              <div className="flex items-center gap-1 font-label-mono text-label-mono">
                <button className="px-3 py-1 text-on-surface-variant hover:text-on-surface border border-outline-variant bg-surface-container-low transition-colors disabled:opacity-40" disabled>PREV</button>
                <button className="px-3 py-1 bg-primary text-on-primary border border-primary">1</button>
                <button className="px-3 py-1 text-on-surface hover:bg-surface-container-low border border-outline-variant bg-surface transition-colors">2</button>
                <button className="px-3 py-1 text-on-surface hover:bg-surface-container-low border border-outline-variant bg-surface transition-colors">3</button>
                <span className="px-2 text-on-surface-variant">...</span>
                <button className="px-3 py-1 text-on-surface hover:bg-surface-container-low border border-outline-variant bg-surface transition-colors">7</button>
                <button className="px-3 py-1 text-on-surface hover:bg-surface-container-low border border-outline-variant bg-surface-container-low transition-colors">NEXT</button>
              </div>
            </section>
            {/* Curatorial Filtering Empty State Demonstration Matrix (Secondary Context) */}
            <section className="w-full mt-12 pt-8 border-t border-outline-variant">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2"><span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest">{"QUERY INSPECTOR // EDGE CONDITION TEST"}</span></div>
                <span className="font-label-mono text-[10px] text-on-surface-variant bg-surface-container px-2 py-0.5 border border-outline-variant uppercase">Filtered Scope Mock</span>
              </div>
              <div className="w-full bg-surface-container-low border border-outline-variant p-8 md:p-12 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-surface flex items-center justify-center border border-outline-variant mb-4"><span className="material-symbols-outlined text-outline text-[24px]">filter_alt_off</span></div>
                <div className="font-label-mono text-label-mono uppercase tracking-widest text-[#C98A2C] mb-2">{"ACTIVE QUERY: HUB: VIENNA (VIE) // STATUS: IN SERVICE"}</div>
                <h2 className="font-headline-md text-headline-md text-on-surface max-w-xl mb-3">No matching chassis records found in current ledger query.</h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-6">No vehicles within the Scandinavia logistics zone currently match diagnostic custody states. Adjust station filters or clear active criteria.</p>
                <button className="px-5 py-2.5 bg-surface text-on-surface border border-outline hover:border-primary font-action text-action uppercase tracking-wider transition-colors inline-flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                  {" "}
                  <span>Clear Filters</span>
                </button>
              </div>
            </section>
            {/* Floating Bulk Action Drawer (Active Custody Ledger) */}
            <aside className="fixed bottom-6 left-60 right-0 z-40 px-8 flex justify-center pointer-events-none">
              <div className="pointer-events-auto bg-tertiary text-on-tertiary border border-tertiary-container shadow-2xl px-6 py-3.5 flex flex-wrap items-center gap-6 max-w-4xl w-full justify-between">
                {/* Selection Counter Indicator */}
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-primary-fixed" />
                  <div className="flex flex-col">
                    <span className="font-spec-numeral text-spec-numeral font-bold text-on-tertiary leading-none">02 VEHICLES SELECTED</span>
                    <span className="font-label-mono text-[10px] text-tertiary-fixed-dim uppercase tracking-wider mt-1">ZH-91104, M-HL 4821</span>
                  </div>
                </div>
                {/* Action Operations */}
                <div className="flex items-center gap-3 flex-wrap">
                  {/* Status Changer */}
                  <div className="relative">
                    <select className="appearance-none bg-tertiary-container text-on-tertiary text-action font-action uppercase pl-3 pr-8 py-2 border border-tertiary cursor-pointer focus:outline-hidden focus:border-primary-fixed">
                      <option>Change Status</option>
                      <option>Mark: Available</option>
                      <option>Mark: In Service</option>
                      <option>Stage for Delivery</option>
                    </select>
                    <span className="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[16px] text-tertiary-fixed-dim">expand_more</span>
                  </div>
                  {/* Relocation / Hub Transfer */}
                  <div className="relative">
                    <select className="appearance-none bg-tertiary-container text-on-tertiary text-action font-action uppercase pl-3 pr-8 py-2 border border-tertiary cursor-pointer focus:outline-hidden focus:border-primary-fixed">
                      <option>Transfer Station</option>
                      <option>Relocate → ZRH (Zurich)</option>
                      <option>Relocate → MUC (Munich)</option>
                      <option>Relocate → GVA (Geneva)</option>
                      <option>Relocate → VIE (Vienna)</option>
                    </select>
                    <span className="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[16px] text-tertiary-fixed-dim">local_shipping</span>
                  </div>
                  {/* Export Telemetry */}
                  <button className="px-4 py-2 border border-tertiary-container hover:bg-tertiary-container text-on-tertiary font-action text-action uppercase tracking-wider flex items-center gap-2 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    {" "}
                    <span>Export Manifest</span>
                  </button>
                  <div className="h-6 w-px bg-tertiary-container mx-1" />
                  {/* Deselect Button */}
                  <button className="text-tertiary-fixed-dim hover:text-on-tertiary font-label-mono text-label-mono uppercase tracking-wider underline underline-offset-4 transition-colors">Deselect All</button>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
