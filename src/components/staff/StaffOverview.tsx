import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";

/** Stitch screen "HALDEN — Operations Console" — generated from design/stitch-export-round2/halden_staff_console_operations_overview/code.html */
export function StaffOverview() {
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
          <Link aria-current="page" className="px-6 py-2.5 uppercase transition-colors bg-primary text-on-primary font-bold" href="/staff">OVERVIEW</Link>
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
            {/* Page Header */}
            <div className="flex items-end justify-between py-6 border-b border-outline-variant">
              <div className="flex flex-col gap-1">
                <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">{"CONSOLIDATED DISPATCH // ALL HUBS"}</span>
                <h1 className="font-headline-lg text-headline-lg text-on-surface">Operations overview</h1>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 border border-on-surface text-on-surface font-action text-action uppercase hover:bg-surface-container transition-colors rounded-none" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">EXPORT LOG</button>
                <button className="px-5 py-2 bg-primary-container text-on-primary font-action text-action uppercase hover:bg-primary transition-colors rounded-none" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">+ NEW RESERVATION</button>
              </div>
            </div>
            {/* KPI Strip: 5 Hairline-Separated Figures */}
            <section className="grid grid-cols-5 border-b border-outline-variant bg-surface-container-low">
              <div className="p-5 border-r border-outline-variant flex flex-col justify-between gap-3">
                <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">01 / HANDOVERS TODAY</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-spec-numeral text-[28px] leading-none text-on-surface">8</span>
                  <span className="font-label-mono text-label-mono text-primary-container">+2 VS AVG</span>
                </div>
              </div>
              <div className="p-5 border-r border-outline-variant flex flex-col justify-between gap-3">
                <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">02 / RETURNS TODAY</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-spec-numeral text-[28px] leading-none text-on-surface">5</span>
                  <span className="font-label-mono text-label-mono text-on-surface-variant">ON SCHEDULE</span>
                </div>
              </div>
              <div className="p-5 border-r border-outline-variant flex flex-col justify-between gap-3">
                <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">03 / CARS ON THE ROAD</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-spec-numeral text-[28px] leading-none text-on-surface">31</span>
                  <span className="font-label-mono text-label-mono text-on-surface-variant">OF 42 TOTAL</span>
                </div>
              </div>
              <div className="p-5 border-r border-outline-variant flex flex-col justify-between gap-3">
                <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">04 / FLEET UTILISATION</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-spec-numeral text-[28px] leading-none text-on-surface">74%</span>
                  <span className="font-label-mono text-label-mono text-primary-container">+4.2% WK</span>
                </div>
              </div>
              <div className="p-5 flex flex-col justify-between gap-3">
                <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">05 / REVENUE THIS WEEK</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-spec-numeral text-[28px] leading-none text-on-surface">€48,210</span>
                  <span className="font-label-mono text-label-mono text-primary-container">+11.4%</span>
                </div>
              </div>
            </section>
            {/* Today Timeline: Side-by-Side Handovers & Returns */}
            <section className="grid grid-cols-12 border-b border-outline-variant">
              {/* Handovers Column */}
              <div className="col-span-6 border-r border-outline-variant flex flex-col">
                <div className="px-5 py-3.5 bg-surface-container border-b border-outline-variant flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-label-mono text-label-mono uppercase text-on-surface font-bold">TODAY — HANDOVERS</span>
                    <span className="font-label-mono text-label-mono text-on-surface-variant">08 SCHEDULED</span>
                  </div>
                  <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">CHRONOLOGICAL</span>
                </div>
                <div className="flex flex-col divide-y divide-outline-variant">
                  {/* Row 1 */}
                  <div className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-surface-container-low transition-colors">
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="font-spec-numeral text-spec-numeral text-on-surface w-12 shrink-0">09:00</span>
                      <div className="w-18 h-12 bg-surface-container shrink-0 overflow-hidden border border-outline-variant"><Photo src={media.rangeRoverStudio} alt="Range Rover Autobiography" className="w-full h-full object-cover" sizes="208px" /></div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-body-sm text-body-sm font-medium text-on-surface truncate">Range Rover Autobiography</span>
                          <span className="font-label-mono text-label-mono text-on-surface-variant shrink-0">M-HL 4821</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-body-sm text-body-sm text-on-surface-variant truncate">H. Lindqvist</span>
                          <span className="font-label-mono text-label-mono text-on-surface-variant">• HLD-88412</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-label-mono text-label-mono text-on-surface px-2 py-0.5 border border-outline-variant">MUC</span>
                      <span className="font-label-mono text-label-mono uppercase px-2.5 py-1 bg-primary-container text-on-primary">READY</span>
                    </div>
                  </div>
                  {/* Row 2 */}
                  <div className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-surface-container-low transition-colors">
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="font-spec-numeral text-spec-numeral text-on-surface w-12 shrink-0">10:30</span>
                      <div className="w-18 h-12 bg-surface-container shrink-0 overflow-hidden border border-outline-variant"><Photo src={media.porscheGt3Studio} alt="Porsche 911 GT3 Touring" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 10vw" /></div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-body-sm text-body-sm font-medium text-on-surface truncate">Porsche 911 GT3 Touring</span>
                          <span className="font-label-mono text-label-mono text-on-surface-variant shrink-0">ZH-91104</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-body-sm text-body-sm text-on-surface-variant truncate">C. Vance</span>
                          <span className="font-label-mono text-label-mono text-on-surface-variant">• HLD-88419</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-label-mono text-label-mono text-on-surface px-2 py-0.5 border border-outline-variant">ZRH</span>
                      <span className="font-label-mono text-label-mono uppercase px-2.5 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant border border-outline-variant">PREPARING</span>
                    </div>
                  </div>
                  {/* Row 3 */}
                  <div className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-surface-container-low transition-colors">
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="font-spec-numeral text-spec-numeral text-on-surface w-12 shrink-0">11:15</span>
                      <div className="w-18 h-12 bg-surface-container shrink-0 overflow-hidden border border-outline-variant"><Photo src={media.mercedesS500Studio} alt="Mercedes-Benz S-Class" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 10vw" /></div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-body-sm text-body-sm font-medium text-on-surface truncate">Mercedes-Benz S 580</span>
                          <span className="font-label-mono text-label-mono text-on-surface-variant shrink-0">GE-40219</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-body-sm text-body-sm text-on-surface-variant truncate">E. Moreau</span>
                          <span className="font-label-mono text-label-mono text-on-surface-variant">• HLD-88425</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-label-mono text-label-mono text-on-surface px-2 py-0.5 border border-outline-variant">GVA</span>
                      <span className="font-label-mono text-label-mono uppercase px-2.5 py-1 bg-primary-container text-on-primary">READY</span>
                    </div>
                  </div>
                  {/* Row 4 */}
                  <div className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-surface-container-low transition-colors">
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="font-spec-numeral text-spec-numeral text-on-surface w-12 shrink-0">14:00</span>
                      <div className="w-18 h-12 bg-surface-container shrink-0 overflow-hidden border border-outline-variant"><Photo src={media.lexusLc500Editorial} alt="Lexus LC 500" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 30vw" /></div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-body-sm text-body-sm font-medium text-on-surface truncate">Lexus LC 500 Coupe</span>
                          <span className="font-label-mono text-label-mono text-on-surface-variant shrink-0">MI-77210</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-body-sm text-body-sm text-on-surface-variant truncate">L. Conti</span>
                          <span className="font-label-mono text-label-mono text-on-surface-variant">• HLD-88431</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-label-mono text-label-mono text-on-surface px-2 py-0.5 border border-outline-variant">MXP</span>
                      <span className="font-label-mono text-label-mono uppercase px-2.5 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant border border-outline-variant">PREPARING</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Returns Column */}
              <div className="col-span-6 flex flex-col">
                <div className="px-5 py-3.5 bg-surface-container border-b border-outline-variant flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-label-mono text-label-mono uppercase text-on-surface font-bold">TODAY — RETURNS</span>
                    <span className="font-label-mono text-label-mono text-on-surface-variant">05 SCHEDULED</span>
                  </div>
                  <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">INSPECTION QUEUE</span>
                </div>
                <div className="flex flex-col divide-y divide-outline-variant">
                  {/* Row 1 */}
                  <div className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-surface-container-low transition-colors">
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="font-spec-numeral text-spec-numeral text-on-surface w-12 shrink-0">08:45</span>
                      <div className="w-18 h-12 bg-surface-container shrink-0 overflow-hidden border border-outline-variant"><Photo src={media.bmw530eStudio} alt="BMW 5 Series" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 6vw" /></div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-body-sm text-body-sm font-medium text-on-surface truncate">BMW 540i xDrive</span>
                          <span className="font-label-mono text-label-mono text-on-surface-variant shrink-0">M-HL 3390</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-body-sm text-body-sm text-on-surface-variant truncate">K. Richter</span>
                          <span className="font-label-mono text-label-mono text-on-surface-variant">• HLD-88104</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-label-mono text-label-mono text-on-surface px-2 py-0.5 border border-outline-variant">MUC</span>
                      <span className="font-label-mono text-label-mono uppercase px-2.5 py-1 bg-surface-container-highest text-on-surface-variant">DONE</span>
                    </div>
                  </div>
                  {/* Row 2 */}
                  <div className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-surface-container-low transition-colors">
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="font-spec-numeral text-spec-numeral text-on-surface w-12 shrink-0">10:00</span>
                      <div className="w-18 h-12 bg-surface-container shrink-0 overflow-hidden border border-outline-variant"><Photo src={media.audiRs6Studio} alt="Audi RS6 Avant" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 16vw" /></div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-body-sm text-body-sm font-medium text-on-surface truncate">Audi RS6 Avant</span>
                          <span className="font-label-mono text-label-mono text-on-surface-variant shrink-0">W-8821H</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-body-sm text-body-sm text-on-surface-variant truncate">F. Gruber</span>
                          <span className="font-label-mono text-label-mono text-on-surface-variant">• HLD-88118</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-label-mono text-label-mono text-on-surface px-2 py-0.5 border border-outline-variant">VIE</span>
                      <span className="font-label-mono text-label-mono uppercase px-2.5 py-1 bg-error text-on-error">LATE</span>
                    </div>
                  </div>
                  {/* Row 3 */}
                  <div className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-surface-container-low transition-colors">
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="font-spec-numeral text-spec-numeral text-on-surface w-12 shrink-0">13:30</span>
                      <div className="w-18 h-12 bg-surface-container shrink-0 overflow-hidden border border-outline-variant"><Photo src={media.rangeRoverStudio} alt="Range Rover Autobiography" className="w-full h-full object-cover" sizes="208px" /></div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-body-sm text-body-sm font-medium text-on-surface truncate">Range Rover Autobiography</span>
                          <span className="font-label-mono text-label-mono text-on-surface-variant shrink-0">ZH-44902</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-body-sm text-body-sm text-on-surface-variant truncate">S. Keller</span>
                          <span className="font-label-mono text-label-mono text-on-surface-variant">• HLD-88140</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-label-mono text-label-mono text-on-surface px-2 py-0.5 border border-outline-variant">ZRH</span>
                      <span className="font-label-mono text-label-mono uppercase px-2.5 py-1 bg-primary-container text-on-primary">READY</span>
                    </div>
                  </div>
                  {/* Row 4 */}
                  <div className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-surface-container-low transition-colors">
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="font-spec-numeral text-spec-numeral text-on-surface w-12 shrink-0">16:15</span>
                      <div className="w-18 h-12 bg-surface-container shrink-0 overflow-hidden border border-outline-variant"><Photo src={media.mercedesS500Studio} alt="Mercedes-Benz S-Class" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 10vw" /></div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-body-sm text-body-sm font-medium text-on-surface truncate">Mercedes-Benz S 580</span>
                          <span className="font-label-mono text-label-mono text-on-surface-variant shrink-0">M-HL 1094</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-body-sm text-body-sm text-on-surface-variant truncate">A. Sterling</span>
                          <span className="font-label-mono text-label-mono text-on-surface-variant">• HLD-88152</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-label-mono text-label-mono text-on-surface px-2 py-0.5 border border-outline-variant">MUC</span>
                      <span className="font-label-mono text-label-mono uppercase px-2.5 py-1 bg-surface-container-highest text-on-surface-variant">DONE</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Bottom Split: Needs Attention & 14-Day Forward Utilisation */}
            <section className="grid grid-cols-12">
              {/* Needs Attention List */}
              <div className="col-span-5 border-r border-outline-variant flex flex-col">
                <div className="px-5 py-3.5 bg-surface-container border-b border-outline-variant flex items-center justify-between">
                  <span className="font-label-mono text-label-mono uppercase text-on-surface font-bold">NEEDS ATTENTION</span>
                  <span className="font-label-mono text-label-mono uppercase text-error">3 ACTION ITEMS</span>
                </div>
                <div className="flex flex-col divide-y divide-outline-variant">
                  {/* Item 1: Warning */}
                  <div className="p-5 flex items-start justify-between gap-4 hover:bg-surface-container-low transition-colors">
                    <div className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-1.5 bg-tertiary-fixed-dim border border-on-surface shrink-0" />
                      <div className="flex flex-col gap-1">
                        <span className="font-body-sm text-body-sm font-semibold text-on-surface">Licence pending verification</span>
                        <span className="font-label-mono text-label-mono text-on-surface-variant">PATRON DOSSIER • C. VANCE (HLD-88419)</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">International driving permit scan requires manual review before 10:30 ZRH handover.</span>
                      </div>
                    </div>
                    <button className="font-label-mono text-label-mono uppercase text-on-surface border border-outline-variant px-2.5 py-1 hover:bg-surface-container shrink-0" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">REVIEW →</button>
                  </div>
                  {/* Item 2: Problem */}
                  <div className="p-5 flex items-start justify-between gap-4 hover:bg-surface-container-low transition-colors">
                    <div className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-1.5 bg-error shrink-0" />
                      <div className="flex flex-col gap-1">
                        <span className="font-body-sm text-body-sm font-semibold text-on-surface">Car overdue for 48-point service</span>
                        <span className="font-label-mono text-label-mono text-on-surface-variant">CHASSIS WBA730291 • M-HL 3390</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">BMW 540i xDrive exceeded 15,000 km interval by 340 km. Hold from MUC dispatch.</span>
                      </div>
                    </div>
                    <button className="font-label-mono text-label-mono uppercase text-error border border-error px-2.5 py-1 hover:bg-error-container shrink-0" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">HOLD →</button>
                  </div>
                  {/* Item 3: Problem */}
                  <div className="p-5 flex items-start justify-between gap-4 hover:bg-surface-container-low transition-colors">
                    <div className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-1.5 bg-error shrink-0" />
                      <div className="flex flex-col gap-1">
                        <span className="font-body-sm text-body-sm font-semibold text-on-surface">Payment pre-authorisation failed</span>
                        <span className="font-label-mono text-label-mono text-on-surface-variant">REF HLD-88431 • €3,500.00 DEPOSIT</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">Card issuer declined security hold for L. Conti (MXP). Retry link dispatched.</span>
                      </div>
                    </div>
                    <button className="font-label-mono text-label-mono uppercase text-on-surface border border-outline-variant px-2.5 py-1 hover:bg-surface-container shrink-0" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">RETRY →</button>
                  </div>
                </div>
              </div>
              {/* 14-Day Forward Fleet Utilisation Bar Chart */}
              <div className="col-span-7 flex flex-col">
                <div className="px-5 py-3.5 bg-surface-container border-b border-outline-variant flex items-center justify-between">
                  <span className="font-label-mono text-label-mono uppercase text-on-surface font-bold">14-DAY FORWARD FLEET UTILISATION</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-primary-container inline-block" />
                      <span className="font-label-mono text-label-mono text-on-surface-variant">≥75%</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-secondary inline-block" />
                      <span className="font-label-mono text-label-mono text-on-surface-variant">50–74%</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-on-surface inline-block" />
                      <span className="font-label-mono text-label-mono text-on-surface-variant">{"<50%"}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between bg-surface">
                  {/* Chart Area */}
                  <div className="relative h-56 flex items-end gap-2 pl-10 pr-2 pb-6 border-b border-outline-variant">
                    {/* Y-Axis Labels */}
                    <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col justify-between items-end pr-2 font-label-mono text-label-mono text-on-surface-variant">
                      <span>100%</span>
                      <span>75%</span>
                      <span>50%</span>
                      <span>25%</span>
                      <span>0%</span>
                    </div>
                    {/* Horizontal Hairline Grid */}
                    <div className="absolute left-10 right-2 top-0 h-px bg-outline-variant/40" />
                    <div className="absolute left-10 right-2 top-1/4 h-px bg-outline-variant/40" />
                    <div className="absolute left-10 right-2 top-2/4 h-px bg-outline-variant/40" />
                    <div className="absolute left-10 right-2 top-3/4 h-px bg-outline-variant/40" />
                    {/* 14 Bars */}
                    <div className="flex-1 h-full flex items-end justify-between gap-2 z-10" id="utilisation-bars">
                      {/* Day 1 */}
                      <div className="flex-1 h-full flex flex-col justify-end items-center group">
                        <div className="w-full bg-secondary transition-opacity group-hover:opacity-80" style={{ height: "74%" }} title="24 OCT: 74%" />
                        <span className="font-label-mono text-label-mono text-on-surface-variant mt-2 -mb-6">24</span>
                      </div>
                      {/* Day 2 */}
                      <div className="flex-1 h-full flex flex-col justify-end items-center group">
                        <div className="w-full bg-primary-container transition-opacity group-hover:opacity-80" style={{ height: "82%" }} title="25 OCT: 82%" />
                        <span className="font-label-mono text-label-mono text-on-surface-variant mt-2 -mb-6">25</span>
                      </div>
                      {/* Day 3 */}
                      <div className="flex-1 h-full flex flex-col justify-end items-center group">
                        <div className="w-full bg-primary-container transition-opacity group-hover:opacity-80" style={{ height: "88%" }} title="26 OCT: 88%" />
                        <span className="font-label-mono text-label-mono text-on-surface-variant mt-2 -mb-6">26</span>
                      </div>
                      {/* Day 4 */}
                      <div className="flex-1 h-full flex flex-col justify-end items-center group">
                        <div className="w-full bg-primary-container transition-opacity group-hover:opacity-80" style={{ height: "79%" }} title="27 OCT: 79%" />
                        <span className="font-label-mono text-label-mono text-on-surface-variant mt-2 -mb-6">27</span>
                      </div>
                      {/* Day 5 */}
                      <div className="flex-1 h-full flex flex-col justify-end items-center group">
                        <div className="w-full bg-secondary transition-opacity group-hover:opacity-80" style={{ height: "68%" }} title="28 OCT: 68%" />
                        <span className="font-label-mono text-label-mono text-on-surface-variant mt-2 -mb-6">28</span>
                      </div>
                      {/* Day 6 */}
                      <div className="flex-1 h-full flex flex-col justify-end items-center group">
                        <div className="w-full bg-secondary transition-opacity group-hover:opacity-80" style={{ height: "64%" }} title="29 OCT: 64%" />
                        <span className="font-label-mono text-label-mono text-on-surface-variant mt-2 -mb-6">29</span>
                      </div>
                      {/* Day 7 */}
                      <div className="flex-1 h-full flex flex-col justify-end items-center group">
                        <div className="w-full bg-secondary transition-opacity group-hover:opacity-80" style={{ height: "71%" }} title="30 OCT: 71%" />
                        <span className="font-label-mono text-label-mono text-on-surface-variant mt-2 -mb-6">30</span>
                      </div>
                      {/* Day 8 */}
                      <div className="flex-1 h-full flex flex-col justify-end items-center group">
                        <div className="w-full bg-primary-container transition-opacity group-hover:opacity-80" style={{ height: "76%" }} title="31 OCT: 76%" />
                        <span className="font-label-mono text-label-mono text-on-surface-variant mt-2 -mb-6">31</span>
                      </div>
                      {/* Day 9 */}
                      <div className="flex-1 h-full flex flex-col justify-end items-center group">
                        <div className="w-full bg-primary-container transition-opacity group-hover:opacity-80" style={{ height: "85%" }} title="01 NOV: 85%" />
                        <span className="font-label-mono text-label-mono text-on-surface-variant mt-2 -mb-6">01</span>
                      </div>
                      {/* Day 10 */}
                      <div className="flex-1 h-full flex flex-col justify-end items-center group">
                        <div className="w-full bg-primary-container transition-opacity group-hover:opacity-80" style={{ height: "90%" }} title="02 NOV: 90%" />
                        <span className="font-label-mono text-label-mono text-on-surface-variant mt-2 -mb-6">02</span>
                      </div>
                      {/* Day 11 */}
                      <div className="flex-1 h-full flex flex-col justify-end items-center group">
                        <div className="w-full bg-secondary transition-opacity group-hover:opacity-80" style={{ height: "62%" }} title="03 NOV: 62%" />
                        <span className="font-label-mono text-label-mono text-on-surface-variant mt-2 -mb-6">03</span>
                      </div>
                      {/* Day 12 */}
                      <div className="flex-1 h-full flex flex-col justify-end items-center group">
                        <div className="w-full bg-on-surface transition-opacity group-hover:opacity-80" style={{ height: "45%" }} title="04 NOV: 45%" />
                        <span className="font-label-mono text-label-mono text-on-surface-variant mt-2 -mb-6">04</span>
                      </div>
                      {/* Day 13 */}
                      <div className="flex-1 h-full flex flex-col justify-end items-center group">
                        <div className="w-full bg-on-surface transition-opacity group-hover:opacity-80" style={{ height: "48%" }} title="05 NOV: 48%" />
                        <span className="font-label-mono text-label-mono text-on-surface-variant mt-2 -mb-6">05</span>
                      </div>
                      {/* Day 14 */}
                      <div className="flex-1 h-full flex flex-col justify-end items-center group">
                        <div className="w-full bg-secondary transition-opacity group-hover:opacity-80" style={{ height: "55%" }} title="06 NOV: 55%" />
                        <span className="font-label-mono text-label-mono text-on-surface-variant mt-2 -mb-6">06</span>
                      </div>
                    </div>
                  </div>
                  {/* Chart Footer Summary */}
                  <div className="pt-4 flex items-center justify-between">
                    <span className="font-label-mono text-label-mono text-on-surface-variant">OCT 24 — NOV 06, 2024 (ALL HUBS)</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface">PEAK: 90% (38/42 UNITS) ON 02 NOV</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
