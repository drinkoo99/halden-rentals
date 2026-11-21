import Link from "next/link";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

/** Stitch screen "" — generated from design/stitch-export-round2/halden_patron_circle_account_overview_empty_state/code.html */
export function AccountOverviewEmptyDesktop() {
  return (
    <div className="hidden md:block bg-surface font-body-md text-body-md text-on-surface antialiased">
      <SiteHeader patron />
      <main className="w-full pt-20 bg-surface">
        <div className="flex flex-col w-full">
          <div className="max-w-7xl w-full mx-auto px-margin-mobile lg:px-margin py-space-xl">
            <div className="flex flex-col lg:flex-row gap-space-xl items-start">
              {/* Left Column: Sticky Account Navigation (280px) */}
              <aside className="w-full lg:w-[280px] shrink-0 lg:sticky lg:top-28">
                <nav aria-label="Account sections" className="flex flex-col">
                  <Link className="pl-space-md py-space-sm border-l-2 border-primary-container font-label-mono text-label-mono uppercase text-primary font-semibold tracking-widest" href="/account">01 OVERVIEW</Link>
                  <Link className="pl-space-md py-space-sm border-l-2 border-transparent font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-on-surface hover:border-outline-variant transition-colors tracking-widest" href="/account#reservations">02 RESERVATIONS</Link>
                  <Link className="pl-space-md py-space-sm border-l-2 border-transparent font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-on-surface hover:border-outline-variant transition-colors tracking-widest" href="/account#saved">03 SAVED CARS</Link>
                  <Link className="pl-space-md py-space-sm border-l-2 border-transparent font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-on-surface hover:border-outline-variant transition-colors tracking-widest" href="/account/settings">04 SETTINGS</Link>
                </nav>
                <div className="mt-space-lg bg-surface-container p-space-md border border-outline-variant"><p className="font-label-mono text-label-mono uppercase text-on-surface-variant">Patron since 2025 · 0 journeys</p></div>
              </aside>
              {/* Main Column */}
              <div className="flex-1 min-w-0 w-full flex flex-col gap-space-xl">
                {/* Greeting Header */}
                <section className="pb-space-lg border-b border-outline-variant">
                  <p className="font-label-mono text-label-mono uppercase text-outline mb-space-sm">{"PATRON CIRCLE // ACCOUNT ARCHIVE"}</p>
                  <h1 className="font-display text-display text-on-surface">Good evening, Clara.</h1>
                </section>
                {/* Upcoming Reservation Empty State */}
                <section className="flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <h2 className="font-label-mono text-label-mono uppercase text-on-surface-variant">UPCOMING RESERVATION</h2>
                    <span className="font-label-mono text-label-mono uppercase text-outline">00 ACTIVE</span>
                  </div>
                  <div className="bg-surface-container-low border border-outline-variant p-space-xl">
                    <div className="max-w-lg">
                      <h3 className="font-headline-md text-headline-md text-on-surface">No journeys planned yet.</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm">Your confirmed itineraries and curbside handover dossiers will appear here.</p>
                      <div className="mt-space-lg">
                        <Link className="inline-flex items-center gap-space-sm bg-primary-container text-on-primary font-action text-action uppercase px-7 py-3.5 rounded-[2px] hover:bg-primary transition-colors" href="/fleet">
                          <span>Explore the collection</span>
                          {" "}
                          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Past Journeys Empty State */}
                <section className="flex flex-col gap-space-md pt-space-lg border-t border-outline-variant">
                  <div className="flex items-center justify-between">
                    <h2 className="font-label-mono text-label-mono uppercase text-on-surface-variant">PAST JOURNEYS</h2>
                    <span className="font-label-mono text-label-mono uppercase text-outline">ARCHIVE</span>
                  </div>
                  <div className="py-space-lg border-y border-outline-variant flex items-center justify-between">
                    <p className="font-body-md text-body-md text-on-surface-variant">No completed journeys on record.</p>
                    <span className="font-label-mono text-label-mono uppercase text-outline">—</span>
                  </div>
                </section>
                {/* Saved Cars Empty State */}
                <section className="flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <h2 className="font-label-mono text-label-mono uppercase text-on-surface-variant">SAVED CARS</h2>
                    <span className="font-label-mono text-label-mono uppercase text-outline">00 EXHIBITS</span>
                  </div>
                  <div className="bg-surface border border-outline-variant p-space-xl flex flex-col md:flex-row md:items-center md:justify-between gap-space-lg">
                    <div className="max-w-md">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">No saved cars yet.</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">Bookmark exhibits from the collection to compare specifications and reserve.</p>
                    </div>
                    <div className="shrink-0"><Link className="inline-flex items-center justify-center border border-on-surface text-on-surface font-action text-action uppercase px-7 py-3.5 rounded-[2px] hover:bg-surface-container transition-colors" href="/fleet">Browse fleet</Link></div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
