import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";
import { AddToCalendarButton, SavedHeart } from "@/components/account/AccountControls";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

/** Stitch screen "" — generated from design/stitch-export-round2/halden_patron_circle_account_overview/code.html */
const SAVED = ["Porsche 911 GT3 Touring", "Audi RS6 Avant Performance", "Lexus LC 500 V8 Coupe"];

export function AccountOverviewDesktop() {
  return (
    <div className="hidden md:block bg-surface font-body-md text-body-md text-on-surface antialiased">
      <SiteHeader patron />
      <main className="w-full pt-20 bg-surface">
        <div className="flex flex-col w-full">
          <div className="max-w-7xl mx-auto w-full px-margin-mobile lg:px-margin py-space-xl">
            <div className="flex flex-col lg:flex-row gap-space-xl items-start">
              {/* Left Column: Sticky Account Navigation (280px) */}
              <aside className="w-full lg:w-[280px] shrink-0 lg:sticky lg:top-28 flex flex-col gap-space-lg">
                <nav aria-label="Patron Account Navigation" className="flex flex-col border-t border-outline-variant">
                  <Link className="flex items-center justify-between py-space-md pl-space-md pr-space-sm border-b border-outline-variant border-l-2 border-l-primary-container bg-surface-container-low text-primary font-label-mono text-label-mono uppercase font-semibold transition-colors" href="/account">
                    <span>01 OVERVIEW</span>
                    {" "}
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                  <Link className="flex items-center justify-between py-space-md pl-space-md pr-space-sm border-b border-outline-variant border-l-2 border-l-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low font-label-mono text-label-mono uppercase transition-colors" href="/account#reservations"><span>02 RESERVATIONS</span></Link>
                  <Link className="flex items-center justify-between py-space-md pl-space-md pr-space-sm border-b border-outline-variant border-l-2 border-l-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low font-label-mono text-label-mono uppercase transition-colors" href="/account#saved"><span>03 SAVED CARS</span></Link>
                  <Link className="flex items-center justify-between py-space-md pl-space-md pr-space-sm border-b border-outline-variant border-l-2 border-l-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low font-label-mono text-label-mono uppercase transition-colors" href="/account/settings"><span>04 SETTINGS</span></Link>
                </nav>
                {/* Patron Stone Placard */}
                <div className="bg-surface-container border border-outline-variant p-space-md flex flex-col gap-space-xs">
                  <span className="font-label-mono text-label-mono uppercase text-secondary">{"PATRON CIRCLE // № 0418"}</span>
                  <p className="font-body-sm text-body-sm text-on-surface font-medium">Patron since 2025 · 3 journeys</p>
                </div>
              </aside>
              {/* Main Column */}
              <div className="flex-1 min-w-0 w-full flex flex-col gap-space-xl">
                {/* Greeting Header */}
                <section className="flex flex-col gap-space-sm pb-space-lg border-b border-outline-variant">
                  <span className="font-label-mono text-label-mono uppercase text-secondary">NEXT HANDOVER IN 6 DAYS</span>
                  <h1 className="font-display text-display text-on-surface">Good evening, Clara.</h1>
                </section>
                {/* Upcoming Reservation Section */}
                <section className="flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <h2 className="font-label-mono text-label-mono uppercase text-on-surface-variant">UPCOMING RESERVATION</h2>
                    <span className="font-label-mono text-label-mono uppercase text-secondary">{"EXHIBIT 04 // MUNICH"}</span>
                  </div>
                  <div className="border border-outline-variant bg-surface grid grid-cols-1 xl:grid-cols-12">
                    {/* Left: 16:9 Studio Photo */}
                    <div className="xl:col-span-7 border-b xl:border-b-0 xl:border-r border-outline-variant bg-surface-container-low"><Photo src={media.rangeRoverCinematicStudio} alt="Range Rover Autobiography" className="w-full h-full aspect-video object-cover block" sizes="(max-width: 767px) 100vw, 24vw" /></div>
                    {/* Right: Reservation Details */}
                    <div className="xl:col-span-5 p-space-lg flex flex-col justify-between gap-space-lg">
                      <div className="flex flex-col gap-space-md">
                        <div className="flex items-center justify-between gap-space-sm">
                          <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">HLD-0612-4821</span>
                          <span className="inline-flex items-center gap-1.5 font-label-mono text-label-mono uppercase text-primary-container">
                            <span className="w-2 h-2 bg-primary-container inline-block" />
                            {" "}CONFIRMED
                          </span>
                        </div>
                        <div className="pt-space-sm border-t border-outline-variant"><h3 className="font-headline-md text-headline-md text-on-surface">Range Rover Autobiography</h3></div>
                        <div className="grid grid-cols-1 gap-space-sm pt-space-sm border-t border-outline-variant">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-label-mono text-label-mono uppercase text-secondary">{"PICK-UP & RETURN"}</span>
                            <span className="font-body-sm text-body-sm text-on-surface">Munich Airport T2 · 12 Jun 10:00 → 15 Jun 10:00</span>
                          </div>
                          <div className="flex items-baseline justify-between pt-space-sm border-t border-outline-variant">
                            <span className="font-label-mono text-label-mono uppercase text-secondary">TOTAL</span>
                            <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">€1,731.45</span>
                          </div>
                        </div>
                      </div>
                      {/* Actions */}
                      <div className="flex flex-col gap-space-md pt-space-sm">
                        <div className="flex flex-wrap items-center gap-space-sm">
                          <Link className="bg-primary-container text-on-primary font-action text-action uppercase px-7 py-3.5 rounded-[2px] hover:bg-primary transition-colors text-center" href="/account/reservations/hld-0612-4821">View reservation</Link>
                          <Link className="border border-on-surface text-on-surface font-action text-action uppercase px-7 py-3.5 rounded-[2px] hover:bg-surface-container transition-colors" href="/account/reservations/hld-0612-4821/modify">Modify</Link>
                        </div>
                        <div><AddToCalendarButton className="font-label-mono text-label-mono uppercase text-on-surface underline underline-offset-4 hover:text-primary-container transition-colors" /></div>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Past Journeys Section */}
                <section id="reservations" className="flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <h2 className="font-label-mono text-label-mono uppercase text-on-surface-variant">PAST JOURNEYS</h2>
                    <Link className="font-label-mono text-label-mono uppercase text-on-surface underline underline-offset-4 hover:text-primary-container transition-colors" href="/account#reservations">View all →</Link>
                  </div>
                  <div className="overflow-x-auto border-t border-outline-variant">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-outline-variant">
                          <th className="py-space-sm pr-space-md font-label-mono text-label-mono uppercase text-secondary font-normal">Vehicle</th>
                          <th className="py-space-sm px-space-md font-label-mono text-label-mono uppercase text-secondary font-normal">Dates</th>
                          <th className="py-space-sm px-space-md font-label-mono text-label-mono uppercase text-secondary font-normal">Hub</th>
                          <th className="py-space-sm px-space-md font-label-mono text-label-mono uppercase text-secondary font-normal">Total</th>
                          <th className="py-space-sm px-space-md font-label-mono text-label-mono uppercase text-secondary font-normal">Status</th>
                          <th className="py-space-sm pl-space-md font-label-mono text-label-mono uppercase text-secondary font-normal text-right">Archive</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Row 1 */}
                        <tr className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                          <td className="py-space-md pr-space-md">
                            <div className="flex items-center gap-space-md">
                              <Photo src={media.porscheGt3Editorial} alt="Porsche 911 GT3 Touring" className="w-20 h-12 object-cover shrink-0 bg-surface-container" sizes="(max-width: 767px) 100vw, 13vw" />
                              <span className="font-body-md text-body-md text-on-surface font-medium">Porsche 911 GT3 Touring</span>
                            </div>
                          </td>
                          <td className="py-space-md px-space-md font-spec-numeral text-spec-numeral text-on-surface-variant whitespace-nowrap">14 – 17 May 2025</td>
                          <td className="py-space-md px-space-md font-body-sm text-body-sm text-on-surface-variant">Zurich Kloten</td>
                          <td className="py-space-md px-space-md font-spec-numeral text-spec-numeral text-on-surface whitespace-nowrap">€1,320.00</td>
                          <td className="py-space-md px-space-md whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 font-label-mono text-label-mono uppercase text-secondary">
                              <span className="material-symbols-outlined text-[14px]">check</span>
                              {" "}COMPLETED
                            </span>
                          </td>
                          <td className="py-space-md pl-space-md text-right"><button className="font-label-mono text-label-mono uppercase text-on-surface underline underline-offset-4 hover:text-primary-container transition-colors" type="button" disabled data-planned="" title="Planned: available once the HALDEN backend is live" aria-disabled="true">Receipt</button></td>
                        </tr>
                        {/* Row 2 */}
                        <tr className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                          <td className="py-space-md pr-space-md">
                            <div className="flex items-center gap-space-md">
                              <Photo src={media.mercedesS500Studio} alt="Mercedes-Benz S 500 4MATIC" className="w-20 h-12 object-cover shrink-0 bg-surface-container" sizes="(max-width: 767px) 100vw, 10vw" />
                              <span className="font-body-md text-body-md text-on-surface font-medium">Mercedes-Benz S 500 4MATIC</span>
                            </div>
                          </td>
                          <td className="py-space-md px-space-md font-spec-numeral text-spec-numeral text-on-surface-variant whitespace-nowrap">02 – 05 Apr 2025</td>
                          <td className="py-space-md px-space-md font-body-sm text-body-sm text-on-surface-variant">Munich Airport</td>
                          <td className="py-space-md px-space-md font-spec-numeral text-spec-numeral text-on-surface whitespace-nowrap">€930.00</td>
                          <td className="py-space-md px-space-md whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 font-label-mono text-label-mono uppercase text-secondary">
                              <span className="material-symbols-outlined text-[14px]">check</span>
                              {" "}COMPLETED
                            </span>
                          </td>
                          <td className="py-space-md pl-space-md text-right"><button className="font-label-mono text-label-mono uppercase text-on-surface underline underline-offset-4 hover:text-primary-container transition-colors" type="button" disabled data-planned="" title="Planned: available once the HALDEN backend is live" aria-disabled="true">Receipt</button></td>
                        </tr>
                        {/* Row 3 */}
                        <tr className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                          <td className="py-space-md pr-space-md">
                            <div className="flex items-center gap-space-md">
                              <Photo src={media.bmw530eStudio} alt="BMW 530e xDrive" className="w-20 h-12 object-cover shrink-0 bg-surface-container" sizes="(max-width: 767px) 100vw, 6vw" />
                              <span className="font-body-md text-body-md text-on-surface font-medium">BMW 530e xDrive</span>
                            </div>
                          </td>
                          <td className="py-space-md px-space-md font-spec-numeral text-spec-numeral text-on-surface-variant whitespace-nowrap">18 – 20 Feb 2025</td>
                          <td className="py-space-md px-space-md font-body-sm text-body-sm text-on-surface-variant">Geneva Cointrin</td>
                          <td className="py-space-md px-space-md font-spec-numeral text-spec-numeral text-on-surface-variant whitespace-nowrap">€530.00</td>
                          <td className="py-space-md px-space-md whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 font-label-mono text-label-mono uppercase text-secondary">
                              <span className="material-symbols-outlined text-[14px]">close</span>
                              {" "}CANCELLED
                            </span>
                          </td>
                          <td className="py-space-md pl-space-md text-right"><button className="font-label-mono text-label-mono uppercase text-on-surface underline underline-offset-4 hover:text-primary-container transition-colors" type="button" disabled data-planned="" title="Planned: available once the HALDEN backend is live" aria-disabled="true">Receipt</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                {/* Saved Cars Section */}
                <section id="saved" className="flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <h2 className="font-label-mono text-label-mono uppercase text-on-surface-variant">SAVED CARS</h2>
                    <Link className="font-label-mono text-label-mono uppercase text-on-surface underline underline-offset-4 hover:text-primary-container transition-colors" href="/account#saved">Manage saved →</Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                    {/* Saved Car 1 */}
                    <article className="border border-outline-variant bg-surface flex flex-col justify-between">
                      <div>
                        <div className="px-space-md py-space-sm border-b border-outline-variant flex items-center justify-between">
                          <span className="font-label-mono text-label-mono uppercase text-secondary">PORSCHE · EXHIBIT 09</span>
                          <SavedHeart className="text-primary-container hover:text-on-surface transition-colors" name={SAVED[0]} />
                        </div>
                        <div className="border-b border-outline-variant bg-surface-container-low"><Photo src={media.porscheGt3Editorial} alt="Porsche 911 GT3 Touring" className="w-full aspect-[16/10] object-cover block" sizes="(max-width: 767px) 100vw, 13vw" /></div>
                        <div className="p-space-md flex flex-col gap-space-xs">
                          <h3 className="font-headline-sm text-headline-sm text-on-surface">911 GT3 Touring</h3>
                          <span className="font-spec-numeral text-spec-numeral text-on-surface-variant">€440 / day</span>
                        </div>
                      </div>
                      <div className="p-space-md pt-0"><Link className="block w-full text-center bg-primary-container text-on-primary font-action text-action uppercase px-6 py-3 rounded-[2px] hover:bg-primary transition-colors" href="/fleet">Reserve</Link></div>
                    </article>
                    {/* Saved Car 2 */}
                    <article className="border border-outline-variant bg-surface flex flex-col justify-between">
                      <div>
                        <div className="px-space-md py-space-sm border-b border-outline-variant flex items-center justify-between">
                          <span className="font-label-mono text-label-mono uppercase text-secondary">AUDI · EXHIBIT 06</span>
                          <SavedHeart className="text-primary-container hover:text-on-surface transition-colors" name={SAVED[1]} />
                        </div>
                        <div className="border-b border-outline-variant bg-surface-container-low"><Photo src={media.audiRs6Editorial} alt="Audi RS6 Avant Performance" className="w-full aspect-[16/10] object-cover block" sizes="(max-width: 767px) 100vw, 13vw" /></div>
                        <div className="p-space-md flex flex-col gap-space-xs">
                          <h3 className="font-headline-sm text-headline-sm text-on-surface">RS6 Avant Performance</h3>
                          <span className="font-spec-numeral text-spec-numeral text-on-surface-variant">€360 / day</span>
                        </div>
                      </div>
                      <div className="p-space-md pt-0"><Link className="block w-full text-center bg-primary-container text-on-primary font-action text-action uppercase px-6 py-3 rounded-[2px] hover:bg-primary transition-colors" href="/fleet">Reserve</Link></div>
                    </article>
                    {/* Saved Car 3 */}
                    <article className="border border-outline-variant bg-surface flex flex-col justify-between">
                      <div>
                        <div className="px-space-md py-space-sm border-b border-outline-variant flex items-center justify-between">
                          <span className="font-label-mono text-label-mono uppercase text-secondary">LEXUS · EXHIBIT 05</span>
                          <SavedHeart className="text-primary-container hover:text-on-surface transition-colors" name={SAVED[2]} />
                        </div>
                        <div className="border-b border-outline-variant bg-surface-container-low"><Photo src={media.lexusLc500Editorial} alt="Lexus LC 500 V8 Coupe" className="w-full aspect-[16/10] object-cover block" sizes="(max-width: 767px) 100vw, 13vw" /></div>
                        <div className="p-space-md flex flex-col gap-space-xs">
                          <h3 className="font-headline-sm text-headline-sm text-on-surface">LC 500 V8 Coupe</h3>
                          <span className="font-spec-numeral text-spec-numeral text-on-surface-variant">€375 / day</span>
                        </div>
                      </div>
                      <div className="p-space-md pt-0"><Link className="block w-full text-center bg-primary-container text-on-primary font-action text-action uppercase px-6 py-3 rounded-[2px] hover:bg-primary transition-colors" href="/fleet">Reserve</Link></div>
                    </article>
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
