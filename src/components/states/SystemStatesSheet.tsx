import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";

/** Stitch screen "HALDEN — System States & Dialogs Sheet" — generated from design/stitch-export-round2/halden_system_states_dialogs_sheet_s8/code.html */
export function SystemStatesSheet() {
  return (
    <div className="states-board bg-surface text-ink font-sans antialiased selection:bg-forest selection:text-white min-h-screen">
      {/* TOP HEADER / DOSSIER SPECIFICATION */}
      <header className="border-b hairline-border bg-white sticky top-0 z-40">
        <div className="max-w-[1720px] mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-6">
            <span className="font-serif text-2xl tracking-[0.2em] font-normal uppercase text-ink">H A L D E N</span>
            <div className="h-4 w-[1px] bg-stone" />
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-500">{"SYSTEM SPECIFICATION № 08 · COMPONENT & STATE MATRIX"}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-surface-dim text-forest-accent border hairline-border">
              <span className="w-1.5 h-1.5 rounded-full bg-forest mr-2" />
              {" "}THE GALLERY DESIGN SYSTEM 1.0
            </span>
            <span className="text-xs font-mono text-neutral-400">DESKTOP + MOBILE 390PX VIEWPORTS</span>
          </div>
        </div>
      </header>
      {/* SUBHEADER / INDEX */}
      <div className="bg-surface-dim/50 border-b hairline-border px-6 py-3">
        <div className="max-w-[1720px] mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-widest text-neutral-600">
          <div className="flex items-center space-x-6">
            <a href="#skeletons" className="hover:text-forest transition-colors">01 / Loading Skeletons</a>
            <a href="#empty-states" className="hover:text-forest transition-colors">02 / Empty States</a>
            <a href="#error-pages" className="hover:text-forest transition-colors">03 / Error Pages</a>
            <a href="#conflicts" className="hover:text-forest transition-colors">04 / Booking Conflicts</a>
            <a href="#feedback" className="hover:text-forest transition-colors">{"05 / Toasts & Banners"}</a>
            <a href="#dialogs" className="hover:text-forest transition-colors">{"06 / Dialogs & Lightbox"}</a>
          </div>
          <div className="text-[11px] text-neutral-500">RADII: 0–2PX · NO DROP SHADOWS · MONOCHROME HAIRLINES</div>
        </div>
      </div>
      <main className="max-w-[1720px] mx-auto px-6 py-12 space-y-20">
        <div role="note" className="bg-amber-soft border-l-2 border-amber p-4 font-mono text-xs uppercase tracking-wider text-ink">
          Design reference board: the controls below are visual specimens. The live versions are used across the site (error, 404 and offline pages, loading skeletons, cookie consent).
        </div>
        {/* ========================================== */}
        {/* 01 / LOADING SKELETONS */}
        {/* ========================================== */}
        <section id="skeletons" className="space-y-6">
          <div className="border-b hairline-border pb-3 flex items-baseline justify-between">
            <div>
              <span className="font-mono text-xs text-forest uppercase tracking-widest block">{"01 // TELEMETRY & LAZY LOADING"}</span>
              <h2 className="font-serif text-3xl text-ink font-normal">Loading Skeletons</h2>
            </div>
            <span className="font-mono text-xs text-neutral-500 uppercase">Flat stone blocks with subtle shimmer · 0px border radius</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Desktop Skeletons (Col 1-8) */}
            <div className="lg:col-span-8 space-y-8">
              {/* A: Fleet Grid 3-Column Skeleton */}
              <div className="bg-white border hairline-border p-6 space-y-4">
                <div className="flex items-center justify-between border-b hairline-border pb-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-neutral-700">A. Fleet Discovery Placard Grid (Desktop 3-Column)</span>
                  <span className="font-mono text-[10px] text-neutral-400">STATE: FETCHING ARCHIVAL REGISTRY</span>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  {/* Placard 1 */}
                  <div className="border hairline-border p-4 bg-surface space-y-4">
                    <div className="w-full aspect-[4/3] skeleton-shimmer" />
                    <div className="space-y-2 pt-2">
                      <div className="w-16 h-2 skeleton-shimmer" />
                      <div className="w-3/4 h-5 skeleton-shimmer" />
                      <div className="w-full h-3 skeleton-shimmer" />
                    </div>
                    <div className="pt-4 border-t hairline-border flex justify-between items-center">
                      <div className="w-20 h-4 skeleton-shimmer" />
                      <div className="w-24 h-8 skeleton-shimmer" />
                    </div>
                  </div>
                  {/* Placard 2 */}
                  <div className="border hairline-border p-4 bg-surface space-y-4">
                    <div className="w-full aspect-[4/3] skeleton-shimmer" />
                    <div className="space-y-2 pt-2">
                      <div className="w-20 h-2 skeleton-shimmer" />
                      <div className="w-2/3 h-5 skeleton-shimmer" />
                      <div className="w-full h-3 skeleton-shimmer" />
                    </div>
                    <div className="pt-4 border-t hairline-border flex justify-between items-center">
                      <div className="w-20 h-4 skeleton-shimmer" />
                      <div className="w-24 h-8 skeleton-shimmer" />
                    </div>
                  </div>
                  {/* Placard 3 */}
                  <div className="border hairline-border p-4 bg-surface space-y-4">
                    <div className="w-full aspect-[4/3] skeleton-shimmer" />
                    <div className="space-y-2 pt-2">
                      <div className="w-14 h-2 skeleton-shimmer" />
                      <div className="w-4/5 h-5 skeleton-shimmer" />
                      <div className="w-full h-3 skeleton-shimmer" />
                    </div>
                    <div className="pt-4 border-t hairline-border flex justify-between items-center">
                      <div className="w-20 h-4 skeleton-shimmer" />
                      <div className="w-24 h-8 skeleton-shimmer" />
                    </div>
                  </div>
                </div>
              </div>
              {/* B: Vehicle Detail Gallery Wall Skeleton */}
              <div className="bg-white border hairline-border p-6 space-y-4">
                <div className="flex items-center justify-between border-b hairline-border pb-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-neutral-700">{"B. Vehicle Detail Gallery Wall & Specification Matrix (Desktop)"}</span>
                  <span className="font-mono text-[10px] text-neutral-400">STATE: TELEMETRY STREAM INITIALIZING</span>
                </div>
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-7 space-y-3">
                    <div className="w-full aspect-[16/9] skeleton-shimmer" />
                    <div className="grid grid-cols-3 gap-3">
                      <div className="aspect-[4/3] skeleton-shimmer" />
                      <div className="aspect-[4/3] skeleton-shimmer" />
                      <div className="aspect-[4/3] skeleton-shimmer" />
                    </div>
                  </div>
                  <div className="col-span-5 space-y-5 border-l hairline-border pl-6">
                    <div className="w-24 h-3 skeleton-shimmer" />
                    <div className="w-4/5 h-8 skeleton-shimmer" />
                    <div className="w-full h-16 skeleton-shimmer" />
                    <div className="grid grid-cols-2 gap-4 py-4 border-y hairline-border">
                      <div className="h-10 skeleton-shimmer" />
                      <div className="h-10 skeleton-shimmer" />
                      <div className="h-10 skeleton-shimmer" />
                      <div className="h-10 skeleton-shimmer" />
                    </div>
                    <div className="w-full h-12 skeleton-shimmer" />
                  </div>
                </div>
              </div>
            </div>
            {/* Mobile 390px Skeletons (Col 9-12) */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white border hairline-border p-5 max-w-[390px] mx-auto space-y-6">
                <div className="flex items-center justify-between border-b hairline-border pb-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold">Mobile 390px Viewport</span>
                  <span className="font-mono text-[10px] text-neutral-400">PATRON ACCOUNT</span>
                </div>
                {/* Mobile Account Overview Skeleton */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="w-16 h-2 skeleton-shimmer" />
                      <div className="w-36 h-5 skeleton-shimmer" />
                    </div>
                    <div className="w-16 h-5 skeleton-shimmer" />
                  </div>
                  {/* Tabs Skeleton */}
                  <div className="flex border-b hairline-border pb-2 space-x-4">
                    <div className="w-14 h-3 skeleton-shimmer" />
                    <div className="w-16 h-3 skeleton-shimmer" />
                    <div className="w-12 h-3 skeleton-shimmer" />
                  </div>
                  {/* Card Skeleton */}
                  <div className="border hairline-border p-4 space-y-3 bg-surface">
                    <div className="flex justify-between">
                      <div className="w-28 h-2 skeleton-shimmer" />
                      <div className="w-14 h-2 skeleton-shimmer" />
                    </div>
                    <div className="w-full aspect-[4/3] skeleton-shimmer" />
                    <div className="w-3/4 h-5 skeleton-shimmer" />
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <div className="h-6 skeleton-shimmer" />
                      <div className="h-6 skeleton-shimmer" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t hairline-border">
                      <div className="h-9 skeleton-shimmer" />
                      <div className="h-9 skeleton-shimmer" />
                    </div>
                  </div>
                  {/* Past list skeleton */}
                  <div className="space-y-2 pt-2">
                    <div className="w-32 h-2 skeleton-shimmer" />
                    <div className="border hairline-border p-3 flex justify-between items-center">
                      <div className="w-40 h-4 skeleton-shimmer" />
                      <div className="w-12 h-3 skeleton-shimmer" />
                    </div>
                    <div className="border hairline-border p-3 flex justify-between items-center">
                      <div className="w-36 h-4 skeleton-shimmer" />
                      <div className="w-12 h-3 skeleton-shimmer" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ========================================== */}
        {/* 02 / EMPTY STATES */}
        {/* ========================================== */}
        <section id="empty-states" className="space-y-6">
          <div className="border-b hairline-border pb-3 flex items-baseline justify-between">
            <div>
              <span className="font-mono text-xs text-forest uppercase tracking-widest block">{"02 // ARCHIVAL LEDGER VACANCIES"}</span>
              <h2 className="font-serif text-3xl text-ink font-normal">Empty States</h2>
            </div>
            <span className="font-mono text-xs text-neutral-500 uppercase">Quiet architectural crops · Bodoni sentiment · Single decisive CTA</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Empty State 1: Filter Mismatch */}
            <div className="bg-white border hairline-border flex flex-col justify-between p-8 space-y-6">
              <div className="space-y-6">
                <div className="aspect-[16/9] w-full overflow-hidden border hairline-border relative group">
                  <Photo src={media.heroPorscheGallery} alt="Minimalist architectural gallery" className="w-full h-full object-cover grayscale opacity-80 contrast-125" sizes="(max-width: 767px) 100vw, 24vw" />
                  <div className="absolute inset-0 bg-stone/20" />
                  <div className="absolute bottom-2 left-2 bg-ink/90 text-white font-mono text-[9px] px-2 py-0.5 uppercase tracking-widest">LEDGER QUERY: 0 EXHIBITS</div>
                </div>
                <div className="space-y-2">
                  <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider block">{"CHASSIS REPOSITORY // 0 MATCHES"}</span>
                  <h3 className="font-serif text-2xl text-ink">No exhibits align with your criteria.</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">The current archive parameters yielded no matching machines in this station. Our curatorial roster rotates continuously across Zurich, Munich, and Milan.</p>
                </div>
              </div>
              <div className="pt-4 border-t hairline-border"><button className="w-full py-3 px-4 bg-forest hover:bg-forest-accent text-white font-mono text-xs uppercase tracking-wider transition-colors">{"Reset Filters & View All 34 Pieces →"}</button></div>
            </div>
            {/* Empty State 2: No Upcoming Journeys */}
            <div className="bg-white border hairline-border flex flex-col justify-between p-8 space-y-6">
              <div className="space-y-6">
                <div className="aspect-[16/9] w-full overflow-hidden border hairline-border relative">
                  <Photo src={media.alpinePass} alt="Empty alpine road with morning mist" className="w-full h-full object-cover opacity-85" sizes="(max-width: 767px) 100vw, 52vw" />
                  <div className="absolute inset-0 bg-stone/20" />
                  <div className="absolute bottom-2 left-2 bg-forest text-white font-mono text-[9px] px-2 py-0.5 uppercase tracking-widest">{"PATRON DIARY // DORMANT"}</div>
                </div>
                <div className="space-y-2">
                  <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider block">{"ALLOCATION CALENDAR // OPEN"}</span>
                  <h3 className="font-serif text-2xl text-ink">No upcoming expeditions logged.</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">Your custodial ledger is currently quiescent. Commission a machine for a bespoke Alpine pass or reserve transit delivery to your arrival terminal.</p>
                </div>
              </div>
              <div className="pt-4 border-t hairline-border"><button className="w-full py-3 px-4 bg-forest hover:bg-forest-accent text-white font-mono text-xs uppercase tracking-wider transition-colors">Explore Curated Transversals →</button></div>
            </div>
            {/* Empty State 3: No Saved Cars */}
            <div className="bg-white border hairline-border flex flex-col justify-between p-8 space-y-6">
              <div className="space-y-6">
                <div className="aspect-[16/9] w-full overflow-hidden border hairline-border relative">
                  <Photo src={media.porscheVintageGallery} alt="Classic Porsche in concrete gallery" className="w-full h-full object-cover opacity-80" sizes="(max-width: 767px) 100vw, 24vw" />
                  <div className="absolute inset-0 bg-stone/20" />
                  <div className="absolute bottom-2 left-2 bg-ink/90 text-white font-mono text-[9px] px-2 py-0.5 uppercase tracking-widest">{"DOSSIER PINBOARD // 0 MONITORED"}</div>
                </div>
                <div className="space-y-2">
                  <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider block">{"PATRON ARCHIVE // WATCHLIST"}</span>
                  <h3 className="font-serif text-2xl text-ink">You have not bookmarked an exhibit.</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">Preserve specific chassis telemetry, track upcoming seasonal staging windows, and monitor restoration notes by bookmarking exhibits from the fleet repository.</p>
                </div>
              </div>
              <div className="pt-4 border-t hairline-border"><button className="w-full py-3 px-4 bg-white border hairline-border hover:border-forest text-ink font-mono text-xs uppercase tracking-wider transition-colors">Browse Permanent Collection →</button></div>
            </div>
          </div>
        </section>
        {/* ========================================== */}
        {/* 03 / ERROR PAGES */}
        {/* ========================================== */}
        <section id="error-pages" className="space-y-6">
          <div className="border-b hairline-border pb-3 flex items-baseline justify-between">
            <div>
              <span className="font-mono text-xs text-forest uppercase tracking-widest block">{"03 // SYSTEM ANOMALIES & AUDIT PROTOCOLS"}</span>
              <h2 className="font-serif text-3xl text-ink font-normal">{"Error Pages & Network States"}</h2>
            </div>
            <span className="font-mono text-xs text-neutral-500 uppercase">500 Server Error · Offline Mode · 403 Permission Denied · 404 Not Found</span>
          </div>
          {/* Offline Notification Banner (Top Level) */}
          <div className="bg-amber-soft border-l-4 border-amber border-y border-r hairline-border p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber animate-pulse" />
              <div>
                <span className="font-mono text-xs font-bold text-amber uppercase tracking-wider">{"OFFLINE TELEMETRY ENGAGED // CACHED VAULT MODE"}</span>
                <span className="text-xs text-neutral-700 ml-3">{"Connecting to Swiss cantonal GPS mesh failed. Showing locally verified patron credentials & saved offline route dossiers."}</span>
              </div>
            </div>
            <button className="font-mono text-[11px] uppercase tracking-wider px-3 py-1 bg-white border hairline-border text-ink hover:bg-stone/20">Retry Ping (0:09)</button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 500 Internal Error */}
            <div className="bg-white border hairline-border p-8 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b hairline-border pb-2">
                  <span className="font-mono text-xs text-crimson uppercase tracking-wider">{"PROTOCOL 500 // TELEMETRY CORRUPTED"}</span>
                  <span className="font-mono text-[10px] text-neutral-400">LEDGER SEED: 0x992B</span>
                </div>
                <div className="aspect-[16/9] w-full overflow-hidden border hairline-border bg-ink relative">
                  <Photo src={media.heroPorscheGallery} alt="Dark architectural interior" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" sizes="(max-width: 767px) 100vw, 24vw" />
                  <div className="absolute inset-0 bg-neutral-900/60" />
                  <div className="absolute inset-0 flex items-center justify-center"><span className="font-serif text-5xl text-neutral-400 font-light tracking-widest">500</span></div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl text-ink leading-snug">Something in the gallery went dark.</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">An internal diagnostic interrupt severed communication with the custodial database. Technical custodians have been dispatched to inspect the ledger.</p>
                </div>
              </div>
              <div className="space-y-3 pt-4 border-t hairline-border">
                <button className="w-full py-3 px-4 bg-forest hover:bg-forest-accent text-white font-mono text-xs uppercase tracking-wider transition-colors">Re-engage Transmission →</button>
                <div className="text-center"><a href="#" className="font-mono text-[11px] text-neutral-500 uppercase hover:underline">Contact Dispatch Liaison (+41 44 800 2400)</a></div>
              </div>
            </div>
            {/* 403 Forbidden / Restricted Archive */}
            <div className="bg-white border hairline-border p-8 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b hairline-border pb-2">
                  <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">{"PROTOCOL 403 // ACCESS DENIED"}</span>
                  <span className="font-mono text-[10px] text-neutral-400">CLASSIFICATION: TIER 01 ONLY</span>
                </div>
                <div className="aspect-[16/9] w-full overflow-hidden border hairline-border bg-surface-dim relative">
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-2">
                    <svg className="w-8 h-8 text-neutral-400 stroke-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    <span className="font-mono text-[10px] uppercase text-neutral-500 tracking-widest">CIPHER SEAL UNBROKEN</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl text-ink leading-snug">Archival clearance restricted.</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">This dossier contains sanctioned provenance documents reserved exclusively for validated patrons with active transcontinental clearance.</p>
                </div>
              </div>
              <div className="space-y-3 pt-4 border-t hairline-border">
                <button className="w-full py-3 px-4 bg-ink hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider transition-colors">Authenticate Patron Credentials →</button>
                <div className="text-center"><a href="#" className="font-mono text-[11px] text-neutral-500 uppercase hover:underline">Request Elevated Tier Access</a></div>
              </div>
            </div>
            {/* 404 Not Found (Canonical) */}
            <div className="bg-white border hairline-border p-8 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b hairline-border pb-2">
                  <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">{"PROTOCOL 404 // VACANT EXHIBIT"}</span>
                  <span className="font-mono text-[10px] text-neutral-400">STATUS: DE-ACCESSIONED</span>
                </div>
                <div className="aspect-[16/9] w-full overflow-hidden border hairline-border bg-ink relative">
                  <Photo src={media.porscheVintageGallery} alt="Empty concrete gallery pedestal" className="w-full h-full object-cover opacity-60" sizes="(max-width: 767px) 100vw, 24vw" />
                  <div className="absolute inset-0 flex items-center justify-center"><span className="font-serif text-5xl text-white/80 font-light tracking-widest">404</span></div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl text-ink leading-snug">The pedestal is empty.</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">The specified chassis manifest or route dossier has been repatriated, re-indexed, or never existed in the permanent collection catalogue.</p>
                </div>
              </div>
              <div className="space-y-3 pt-4 border-t hairline-border">
                <button className="w-full py-3 px-4 bg-forest hover:bg-forest-accent text-white font-mono text-xs uppercase tracking-wider transition-colors">Return to Permanent Gallery →</button>
                <div className="text-center"><a href="#" className="font-mono text-[11px] text-neutral-500 uppercase hover:underline">Search Curatorial Index</a></div>
              </div>
            </div>
          </div>
        </section>
        {/* ========================================== */}
        {/* 04 / BOOKING CONFLICTS */}
        {/* ========================================== */}
        <section id="conflicts" className="space-y-6">
          <div className="border-b hairline-border pb-3 flex items-baseline justify-between">
            <div>
              <span className="font-mono text-xs text-forest uppercase tracking-widest block">{"04 // SIMULTANEOUS DISPATCH CONCURRENCY"}</span>
              <h2 className="font-serif text-3xl text-ink font-normal">{"Booking Conflicts & Session Expiry"}</h2>
            </div>
            <span className="font-mono text-xs text-neutral-500 uppercase">Immediate alternate chassis proposals · Graceful session restore</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Conflict 1: Just Reserved + 3 Alternatives (8 Cols) */}
            <div className="lg:col-span-8 bg-white border hairline-border p-8 space-y-8">
              <div className="bg-crimson-soft border-l-4 border-crimson p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-crimson uppercase tracking-wider flex items-center">
                    <span className="w-2 h-2 bg-crimson rounded-full mr-2" />
                    {" "}{"ALLOCATION CONFLICT // CHASSIS CONSIGNED"}
                  </span>
                  <span className="font-mono text-[10px] text-neutral-500">TIMESTAMP: 14:02 CEST</span>
                </div>
                <h3 className="font-serif text-2xl text-ink">This exhibit was just reserved for your dates.</h3>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  While finalizing your dossier, another patron executed custody for the{" "}
                  <strong className="font-semibold text-ink">Porsche 911 GT3 Touring</strong>
                  {" "}across{" "}
                  <span className="font-mono text-xs">12 Jun → 15 Jun</span>
                  {" "}at Zurich Salon. Our concierge team has assembled three mechanically adjacent alternatives ready for immediate assignment:
                </p>
              </div>
              {/* 3 Alternatives Grid (3:2 Studio Car Shots) */}
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 block">{"CURATORIAL RECOMMENDATIONS // IMMEDIATE DISPATCH"}</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Alt 1 */}
                  <div className="border hairline-border p-4 bg-surface hover:border-forest transition-colors space-y-3 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="aspect-[3/2] w-full overflow-hidden bg-surface-dim border hairline-border"><Photo src={media.lexusLc500Editorial} alt="Lexus LC 500 coupe in studio" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 30vw" /></div>
                      <div>
                        <span className="font-mono text-[10px] text-neutral-500 uppercase">CATALOGUE № 28</span>
                        <h4 className="font-serif text-lg text-ink font-normal">Lexus LC 500</h4>
                        <p className="font-mono text-xs text-neutral-600 mt-1">5.0L V8 · Valved · 477 PS</p>
                      </div>
                    </div>
                    <div className="pt-3 border-t hairline-border flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-ink">
                        €380{" "}
                        <span className="font-normal text-neutral-400 text-[10px]">/ DAY</span>
                      </span>
                      <button className="px-3 py-1.5 bg-forest hover:bg-forest-accent text-white font-mono text-[11px] uppercase tracking-wider">Select →</button>
                    </div>
                  </div>
                  {/* Alt 2 */}
                  <div className="border hairline-border p-4 bg-surface hover:border-forest transition-colors space-y-3 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="aspect-[3/2] w-full overflow-hidden bg-surface-dim border hairline-border"><Photo src={media.audiRs6Studio} alt="Audi RS6 Avant in studio" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 16vw" /></div>
                      <div>
                        <span className="font-mono text-[10px] text-neutral-500 uppercase">CATALOGUE № 19</span>
                        <h4 className="font-serif text-lg text-ink font-normal">Audi RS6 Avant</h4>
                        <p className="font-mono text-xs text-neutral-600 mt-1">4.0L Twin-Turbo · 600 PS</p>
                      </div>
                    </div>
                    <div className="pt-3 border-t hairline-border flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-ink">
                        €420{" "}
                        <span className="font-normal text-neutral-400 text-[10px]">/ DAY</span>
                      </span>
                      <button className="px-3 py-1.5 bg-forest hover:bg-forest-accent text-white font-mono text-[11px] uppercase tracking-wider">Select →</button>
                    </div>
                  </div>
                  {/* Alt 3 */}
                  <div className="border hairline-border p-4 bg-surface hover:border-forest transition-colors space-y-3 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="aspect-[3/2] w-full overflow-hidden bg-surface-dim border hairline-border"><Photo src={media.rangeRoverStudio} alt="Range Rover in studio" className="w-full h-full object-cover" sizes="208px" /></div>
                      <div>
                        <span className="font-mono text-[10px] text-neutral-500 uppercase">CATALOGUE № 14</span>
                        <h4 className="font-serif text-lg text-ink font-normal">Range Rover Auto.</h4>
                        <p className="font-mono text-xs text-neutral-600 mt-1">4.4L V8 · Air Susp · 530 PS</p>
                      </div>
                    </div>
                    <div className="pt-3 border-t hairline-border flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-ink">
                        €390{" "}
                        <span className="font-normal text-neutral-400 text-[10px]">/ DAY</span>
                      </span>
                      <button className="px-3 py-1.5 bg-forest hover:bg-forest-accent text-white font-mono text-[11px] uppercase tracking-wider">Select →</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Date Shift Option */}
              <div className="bg-surface-dim p-4 border hairline-border flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">Retain Porsche 911 GT3 with Shifted Itinerary:</span>
                  <p className="text-xs text-neutral-600">Available starting 18 Jun (3 days after initial request) at Zurich Salon.</p>
                </div>
                <button className="py-2 px-4 bg-white border hairline-border text-ink font-mono text-xs uppercase tracking-wider hover:border-forest">Shift Dates to 18–21 Jun →</button>
              </div>
            </div>
            {/* Conflict 2: Session Expired (4 Cols) */}
            <div className="lg:col-span-4 bg-white border hairline-border p-6 space-y-6">
              <div className="flex items-center justify-between border-b hairline-border pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-500">SECURITY PROTOCOL 4.2</span>
                <span className="font-mono text-[10px] text-amber uppercase font-bold">● EXPIRED</span>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 border hairline-border flex items-center justify-center bg-surface-dim text-neutral-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                <h3 className="font-serif text-2xl text-ink">Your reservation session expired.</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">To guarantee equal access to rare exhibits, custodial holds are restricted to a 15-minute verification window.</p>
              </div>
              {/* Summary of Cached State */}
              <div className="border hairline-border p-4 bg-surface space-y-2 text-xs font-mono">
                <div className="text-neutral-500 uppercase tracking-widest text-[10px]">PRESERVED MANIFEST SNAPSHOT</div>
                <div className="flex justify-between py-1 border-b hairline-border">
                  <span className="text-neutral-600">CHASSIS:</span>
                  <span className="font-bold text-ink">Range Rover Autobiography</span>
                </div>
                <div className="flex justify-between py-1 border-b hairline-border">
                  <span className="text-neutral-600">ITINERARY:</span>
                  <span>12 Jun → 15 Jun (Munich)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-600">PROVISIONS:</span>
                  <span>Zero-Excess + Winter Pack</span>
                </div>
              </div>
              <div className="space-y-3 pt-2">
                <button className="w-full py-3 px-4 bg-forest hover:bg-forest-accent text-white font-mono text-xs uppercase tracking-wider transition-colors">Restore My Selection (15:00) →</button>
                <button className="w-full py-2.5 px-4 bg-white border hairline-border text-neutral-600 font-mono text-xs uppercase tracking-wider hover:bg-surface-dim">{"Release Hold & Exit"}</button>
              </div>
            </div>
          </div>
        </section>
        {/* ========================================== */}
        {/* 05 / TOASTS & BANNERS */}
        {/* ========================================== */}
        <section id="feedback" className="space-y-6">
          <div className="border-b hairline-border pb-3 flex items-baseline justify-between">
            <div>
              <span className="font-mono text-xs text-forest uppercase tracking-widest block">{"05 // EPHEMERAL TELEMETRY FEEDBACK"}</span>
              <h2 className="font-serif text-3xl text-ink font-normal">{"Toasts & Inline Banners"}</h2>
            </div>
            <span className="font-mono text-xs text-neutral-500 uppercase">Top-right desktop · Pinned bottom mobile · Semantic colors</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Desktop Floating Toasts Stack (Col 1-7) */}
            <div className="lg:col-span-7 bg-white border hairline-border p-8 space-y-6">
              <div className="flex items-center justify-between border-b hairline-border pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-700">Desktop Floating Notification Stack (Top-Right Placement)</span>
                <span className="font-mono text-[10px] text-neutral-400">POSITION: FIXED TOP-6 RIGHT-6</span>
              </div>
              <div className="space-y-4 max-w-lg ml-auto">
                {/* Toast 1: Success (Forest) */}
                <div className="bg-white border-l-4 border-forest border-y border-r hairline-border p-4 shadow-sm flex items-start justify-between gap-4">
                  <div className="flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full bg-forest mt-1.5 shrink-0" />
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[11px] font-bold text-forest uppercase tracking-wider">LEDGER COMMITTED</span>
                        <span className="font-mono text-[10px] text-neutral-400">· JUST NOW</span>
                      </div>
                      <p className="text-xs text-ink">
                        Itinerary modifications for{" "}
                        <span className="font-mono text-[11px]">HLD-0612-4821</span>
                        {" "}synchronized with Munich VIP Bay 04.
                      </p>
                    </div>
                  </div>
                  <button className="text-neutral-400 hover:text-ink text-sm font-mono leading-none">✕</button>
                </div>
                {/* Toast 2: Info (Dark Ink) */}
                <div className="bg-ink text-white p-4 flex items-start justify-between gap-4">
                  <div className="flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full bg-sage mt-1.5 shrink-0" />
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[11px] font-bold text-sage uppercase tracking-wider">DISPATCH ADVISORY</span>
                        <span className="font-mono text-[10px] text-neutral-400">· 2M AGO</span>
                      </div>
                      <p className="text-xs text-neutral-200">Furka Pass seasonal weather clearance updated: nominal dry tarmac across altitude 2,436m.</p>
                    </div>
                  </div>
                  <button className="text-neutral-400 hover:text-white text-sm font-mono leading-none">✕</button>
                </div>
                {/* Toast 3: Error (Crimson) */}
                <div className="bg-white border-l-4 border-crimson border-y border-r hairline-border p-4 shadow-sm flex items-start justify-between gap-4">
                  <div className="flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full bg-crimson mt-1.5 shrink-0" />
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[11px] font-bold text-crimson uppercase tracking-wider">CIPHER REJECTED</span>
                        <span className="font-mono text-[10px] text-neutral-400">· ERROR 401</span>
                      </div>
                      <p className="text-xs text-ink">Passcode verification failed. 1 diagnostic attempt remaining before terminal lockout.</p>
                    </div>
                  </div>
                  <button className="text-neutral-400 hover:text-ink text-sm font-mono leading-none">✕</button>
                </div>
              </div>
              {/* Inline Banners Showcase */}
              <div className="pt-6 border-t hairline-border space-y-4">
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 block">Inline Container Banners (Embedded Flow Feedback)</span>
                {/* Inline Success */}
                <div className="bg-surface-dim border hairline-border p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-forest rounded-full" />
                    <span className="text-xs text-ink">
                      <strong className="font-mono uppercase text-forest mr-1">Identity Verified:</strong>
                      {" "}Swiss Category B licence validated by cantonal federation.
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">CLEARANCE: TIER 01</span>
                </div>
                {/* Inline Warning */}
                <div className="bg-amber-soft border-l-4 border-amber border-y border-r hairline-border p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-amber rounded-full" />
                    <span className="text-xs text-ink">
                      <strong className="font-mono uppercase text-amber mr-1">Limited Allocation:</strong>
                      {" "}Only 1 Range Rover remains available for the chosen weekend.
                    </span>
                  </div>
                  <a href="#" className="font-mono text-[11px] text-ink uppercase underline hover:text-forest">Lock Machine</a>
                </div>
              </div>
            </div>
            {/* Mobile Floating Toast Drawer (Col 8-12) */}
            <div className="lg:col-span-5 bg-white border hairline-border p-6 space-y-6">
              <div className="flex items-center justify-between border-b hairline-border pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold">Mobile 390px Viewport Placement</span>
                <span className="font-mono text-[10px] text-neutral-400">PINNED BOTTOM DOCK</span>
              </div>
              <div className="max-w-[340px] mx-auto bg-surface-dim border hairline-border p-4 h-[440px] relative flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b hairline-border pb-2">
                    <span className="font-serif text-sm">HALDEN</span>
                    <span className="font-mono text-[10px]">PATRON TERMINAL</span>
                  </div>
                  <div className="w-full h-24 bg-white border hairline-border flex items-center justify-center text-xs text-neutral-400 font-mono">[Background Active Screen]</div>
                </div>
                {/* Pinned Mobile Bottom Toast */}
                <div className="space-y-2">
                  <div className="bg-ink text-white p-3.5 border border-neutral-700 shadow-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-sage uppercase tracking-wider flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-forest mr-1.5" />
                        {" "}SAVED TO PATRON ARCHIVE
                      </span>
                      <span className="text-neutral-400 text-xs">✕</span>
                    </div>
                    <p className="text-xs text-neutral-200">Lexus LC 500 added to your monitored watchlist.</p>
                    <div className="flex justify-end pt-1"><a href="#" className="font-mono text-[10px] uppercase text-sage underline">View Monitored (03) →</a></div>
                  </div>
                  {/* Pinned Mobile Inline Error Bar */}
                  <div className="bg-crimson-soft border-l-2 border-crimson p-2.5 text-xs text-ink flex items-center justify-between">
                    <span>Please enter valid Swiss phone number.</span>
                    <span className="font-mono text-[10px] text-crimson uppercase font-bold">REQUIRED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ========================================== */}
        {/* 06 / DIALOGS & OVERLAYS */}
        {/* ========================================== */}
        <section id="dialogs" className="space-y-6">
          <div className="border-b hairline-border pb-3 flex items-baseline justify-between">
            <div>
              <span className="font-mono text-xs text-forest uppercase tracking-widest block">{"06 // MODAL PROTOCOLS & DARK ROOM"}</span>
              <h2 className="font-serif text-3xl text-ink font-normal">{"Dialogs, Lightbox & Cookie Directives"}</h2>
            </div>
            <span className="font-mono text-xs text-neutral-500 uppercase">Itinerary Editor · 16:9 Dark Room Lightbox · Archival Cookie Charter</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Dialog 1: Itinerary Editor (Desktop Modal) (Col 1-6) */}
            <div className="lg:col-span-6 bg-white border hairline-border p-6 space-y-4">
              <div className="flex items-center justify-between border-b hairline-border pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-700">A. Curatorial Itinerary Editor (Modal Dialog)</span>
                <span className="font-mono text-[10px] text-neutral-400">DOSSIER: HLD-0612-4821</span>
              </div>
              <div className="border hairline-border bg-surface p-6 space-y-6">
                <div className="flex justify-between items-start border-b hairline-border pb-4">
                  <div>
                    <span className="font-mono text-[10px] text-forest uppercase tracking-wider block">STAGE AMENDMENT</span>
                    <h3 className="font-serif text-2xl text-ink">Modify Reservation Manifest</h3>
                  </div>
                  <button className="w-8 h-8 border hairline-border bg-white flex items-center justify-center text-xs font-mono hover:bg-surface-dim">✕</button>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs uppercase text-neutral-600 block">{"Staging & Handover Hub"}</label>
                    <select className="w-full h-11 px-3 bg-white border hairline-border text-sm font-sans focus:outline-hidden focus:border-forest">
                      <option>Munich Airport (MUC) — Terminal 2 VIP Pavilion</option>
                      <option>Zurich Kloten (ZRH) — Private Air Bay 02</option>
                      <option>Milan Malpensa (MXP) — Executive Hangar 05</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-mono text-xs uppercase text-neutral-600 block">Pick-Up Diurnal</label>
                      <input type="text" defaultValue="12 Jun 2025 · 10:00 CEST" className="w-full h-11 px-3 bg-white border hairline-border text-sm font-mono focus:outline-hidden" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-mono text-xs uppercase text-neutral-600 block">Return Diurnal</label>
                      <input type="text" defaultValue="15 Jun 2025 · 10:00 CEST" className="w-full h-11 px-3 bg-white border hairline-border text-sm font-mono focus:outline-hidden" />
                    </div>
                  </div>
                  <div className="p-3 bg-surface-dim border hairline-border text-xs text-neutral-600 flex justify-between items-center">
                    <span>
                      Diurnal Delta:{" "}
                      <strong>3 Cycles (72h)</strong>
                    </span>
                    <span className="font-mono text-ink font-bold">Rate Adjustment: €0.00</span>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-3 pt-4 border-t hairline-border">
                  <button className="px-4 py-2.5 bg-white border hairline-border font-mono text-xs uppercase tracking-wider text-neutral-600 hover:bg-surface-dim">Cancel</button>
                  <button className="px-5 py-2.5 bg-forest hover:bg-forest-accent text-white font-mono text-xs uppercase tracking-wider">Save Modifications →</button>
                </div>
              </div>
            </div>
            {/* Dialog 2: Dark Room Photo Lightbox (Col 7-12) */}
            <div className="lg:col-span-6 bg-surface-dark text-white p-6 border hairline-border-dark space-y-4">
              <div className="flex items-center justify-between border-b hairline-border-dark pb-3 text-neutral-400">
                <span className="font-mono text-xs uppercase tracking-wider text-sage">B. Dark Room Vehicle Lightbox (#171B19)</span>
                <span className="font-mono text-[10px]">EXHIBIT VIEW 01 / 06</span>
              </div>
              <div className="space-y-4">
                {/* Top Controls */}
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span className="uppercase tracking-widest text-white">Range Rover Autobiography · Solihull Spec</span>
                  <div className="flex items-center space-x-4">
                    <span>[← PREV]</span>
                    <span className="text-white font-bold">01 / 06</span>
                    <span>[NEXT →]</span>
                    <span className="text-white ml-4 cursor-pointer">✕ CLOSE</span>
                  </div>
                </div>
                {/* Lightbox Main Frame (16:9 Sharp Vehicle Shot) */}
                <div className="aspect-[16/9] w-full overflow-hidden bg-neutral-900 border hairline-border-dark relative">
                  <Photo src={media.rangeRoverAlpineLake} alt="Range Rover Autobiography by serene alpine lake" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 52vw" />
                  <div className="absolute bottom-3 left-3 bg-surface-dark/90 px-3 py-1 font-mono text-[10px] text-neutral-300 border hairline-border-dark">LAKE URI FINAL REPOSE · LAT 46.972° N · ELEV 436 M</div>
                </div>
                {/* Thumbnails Strip */}
                <div className="grid grid-cols-6 gap-2 pt-2">
                  <div className="aspect-[4/3] border-2 border-sage overflow-hidden"><Photo src={media.rangeRoverAlpineLake} className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 52vw" alt="" /></div>
                  <div className="aspect-[4/3] border hairline-border-dark opacity-60 hover:opacity-100 overflow-hidden"><Photo src={media.rangeRoverInterior} className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 6vw" alt="" /></div>
                  <div className="aspect-[4/3] border hairline-border-dark opacity-60 hover:opacity-100 overflow-hidden"><Photo src={media.rangeRoverSeat} className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 6vw" alt="" /></div>
                  <div className="aspect-[4/3] border hairline-border-dark opacity-60 hover:opacity-100 overflow-hidden"><Photo src={media.rangeRoverRearCourtyard} className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 6vw" alt="" /></div>
                  <div className="aspect-[4/3] border hairline-border-dark opacity-60 hover:opacity-100 overflow-hidden"><Photo src={media.rangeRoverHeadlight} className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 14vw" alt="" /></div>
                  <div className="aspect-[4/3] border hairline-border-dark opacity-60 hover:opacity-100 overflow-hidden"><Photo src={media.rangeRoverWheel} className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 14vw" alt="" /></div>
                </div>
              </div>
            </div>
          </div>
          {/* Cookie Consent Directive Banner (Pinned Simulation) */}
          <div className="pt-8">
            <div className="border-t hairline-border pt-4 pb-2"><span className="font-mono text-xs uppercase tracking-wider text-neutral-500">{"C. Archival Cookie & Privacy Consent Banner (Pinned to Viewport Bottom)"}</span></div>
            <div className="bg-surface-dark text-white border hairline-border-dark p-6 shadow-2xl">
              <div className="max-w-[1720px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-sage rounded-full" />
                    <span className="font-mono text-xs uppercase tracking-widest text-sage">{"SWISS CONFEDERATION DATA GOVERNANCE // PROTOCOL nFADP"}</span>
                  </div>
                  <h4 className="font-serif text-lg text-white font-normal">Respecting your custodial privacy and telemetry telemetry.</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">HALDEN uses encrypted cryptographic cookies strictly necessary for archival authentication, offline route caching, and zero-liability indemnity verification. No third-party commercial trackers are permitted in the gallery.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button className="px-4 py-2.5 bg-transparent border hairline-border-dark text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors">Preferences</button>
                  <button className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs uppercase tracking-wider transition-colors">Accept Necessary Only</button>
                  <button className="px-5 py-2.5 bg-forest hover:bg-forest-accent text-white font-mono text-xs uppercase tracking-wider transition-colors">Accept All Protocols →</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* FOOTER */}
      <footer className="bg-surface-dark text-white border-t hairline-border-dark mt-24 py-12 px-6">
        <div className="max-w-[1720px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <span className="font-serif text-2xl tracking-[0.2em] font-normal uppercase block">H A L D E N</span>
            <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">SYSTEM STATES SPECIFICATION REPOSITORY · EST. 1928 · REVISION 2025.08</p>
          </div>
          <div className="text-xs font-mono text-neutral-400 space-x-6">
            <span>ISO 27001 COMPLIANT</span>
            <span>·</span>
            <span>SWISS FEDERAL DATA PROTOCOL</span>
            <span>·</span>
            <span>DIN EN ISO 9001 AUDITED</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
