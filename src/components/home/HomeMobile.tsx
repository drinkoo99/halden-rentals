import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "@/components/site/MobileMenu";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { Icon } from "@/components/ui/Icon";
import { ResponsiveHero } from "@/components/ui/ResponsiveHero";
import { media } from "@/data/media";

/** Mobile homepage — Stitch screen 28. Shown below the md breakpoint. */

const collection = [
  {
    slug: "volvo-xc90-ultimate-b6",
    image: media.mobileVolvoCourtyard,
    alt: "Volvo XC90 Ultimate AWD",
    kicker: "VOLVO · EXHIBIT 02",
    status: "available" as const,
    title: "XC90 Ultimate B6 AWD",
    spec: "7 seats · Auto · 300 hp",
    price: "€210",
  },
  {
    slug: "mercedes-benz-s-500-4matic",
    image: media.mercedesS500Studio,
    alt: "Mercedes-Benz S 500 4MATIC Sedan",
    kicker: "MERCEDES-BENZ · EXHIBIT 04",
    status: "Geneva / Zurich",
    title: "S 500 4MATIC Sedan",
    spec: "5 seats · 9G-TRONIC · 435 hp",
    price: "€310",
  },
  {
    slug: "porsche-911-gt3-touring",
    image: media.mobileGt3Touring,
    alt: "Porsche 911 GT3 Touring",
    kicker: "PORSCHE · EXHIBIT 07",
    status: "Munich",
    title: "911 GT3 Touring",
    spec: "2 seats · 6-Speed / PDK · 502 hp",
    price: "€490",
  },
];

const principles = [
  {
    kicker: "01 / DISPATCH",
    icon: "flight_land",
    title: "Ready where you land",
    body: "Curbside handoff and retrieval across 18 major European private aviation terminals and international hubs.",
  },
  {
    kicker: "02 / TRANSPARENCY",
    icon: "verified",
    title: "One clear price",
    body: "Full comprehensive zero-excess insurance, unlimited alpine passes, and local motorway vignettes included seamlessly.",
  },
  {
    kicker: "03 / CURATION",
    icon: "precision_manufacturing",
    title: "Kept to a gallery standard",
    body: "48-point diagnostic, mechanical balancing, and surgical detailing prior to every single client release.",
  },
];

const routes = [
  {
    image: media.alpinePass,
    alt: "High Alpine Transversal Route",
    meta: "SWITZERLAND · 3 DAYS",
    km: "640 km",
    title: "The High Alpine Transversal",
    body: "Through the Furka, Susten, and Grimsel mountain corridors, designed specifically around sports chassis dynamics.",
    href: "/fleet?category=sports",
  },
  {
    image: media.rivieraCoastRoad,
    alt: "The Grand Corniche & Riviera Route",
    meta: "FRANCE & ITALY · 4 DAYS",
    km: "520 km",
    title: "The Grand Corniche & Riviera",
    body: "From Nice to Portofino via the historic upper coastal balustrades and tranquil olive terraces.",
    href: "/fleet?category=sports",
  },
];

export function HomeMobile({ vehicleCount }: { vehicleCount: number }) {
  return (
    <div className="md:hidden bg-surface font-body-md text-on-surface flex flex-col min-h-screen pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]">
      <div className="flex flex-col relative w-full bg-surface min-h-screen">
        <div className="flex flex-col w-full text-on-surface">
          {/* TOP HEADER / BRAND BAR */}
          <header className="w-full flex items-center justify-between px-6 py-5 bg-surface sticky top-0 z-40 transition-colors duration-200">
            <Link
              className="font-display tracking-[0.25em] text-on-surface uppercase font-normal text-headline-sm select-none"
              href="/"
            >
              HALDEN
            </Link>
            <MobileMenu variant="bars" />
          </header>

          <main>
            {/* HERO SECTION */}
            <section className="flex flex-col w-full px-6 pt-2 pb-8">
              <div className="flex flex-col gap-3 pb-6">
                <span className="font-label-mono text-secondary uppercase tracking-[0.18em]">
                  EXHIBIT 01 — PORSCHE 911 CARRERA
                </span>
                <h1 className="font-headline-lg-mobile text-on-surface leading-tight font-normal">
                  Drive something worth remembering.
                </h1>
                <p className="font-body-md text-secondary leading-relaxed">
                  A curated fleet of premium cars, ready in Europe&apos;s best cities and airports.
                </p>
              </div>
              <div className="w-full relative overflow-hidden bg-surface-container aspect-[3/4]">
                <ResponsiveHero
                  alt="Porsche 911 Carrera in Gallery"
                  src={media.mobileHeroPorsche}
                  sizes="calc(100vw - 48px)"
                  hiddenMedia="(min-width: 768px)"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <Link
                href="/fleet/porsche-911-carrera"
                className="w-full bg-surface-container-low p-4 mt-3 flex flex-col gap-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-label-mono uppercase text-on-surface tracking-wider font-semibold">
                    PORSCHE 911 CARRERA
                  </span>
                  <span className="font-spec-numeral text-primary font-bold">
                    €340 <span className="font-body-sm font-normal text-secondary">/ day</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 font-spec-numeral text-secondary text-body-sm">
                  <span>2+2 seats</span>
                  <span className="text-outline-variant">/</span>
                  <span>PDK</span>
                  <span className="text-outline-variant">/</span>
                  <span>385 hp</span>
                  <span className="text-outline-variant">/</span>
                  <span className="text-primary font-medium">Zurich</span>
                </div>
              </Link>
              <div className="flex flex-col gap-3 mt-6">
                <Link
                  className="w-full min-h-[48px] bg-primary text-on-primary font-action flex items-center justify-center rounded-[2px] transition-colors active:bg-primary-container"
                  href="/fleet"
                >
                  Explore the fleet
                </Link>
                <a
                  className="w-full min-h-[44px] flex items-center justify-center font-action text-on-surface hover:text-secondary gap-1 transition-colors"
                  href="#routes"
                >
                  Plan a journey <span className="text-base font-normal">→</span>
                </a>
              </div>
            </section>

            {/* SEARCH BAR TRIGGER */}
            <section className="w-full px-6 py-4">
              <Link
                href="/fleet"
                className="w-full min-h-[56px] bg-surface-container-lowest p-4 flex items-center justify-between rounded-[2px] shadow-sm active:bg-surface-container-low cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <Icon name="search" className="text-secondary text-headline-sm select-none" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-action text-on-surface truncate">Where and when?</span>
                    <span className="font-body-sm text-secondary truncate">Select airport or city · Add dates</span>
                  </div>
                </div>
                <Icon name="calendar_today" className="text-secondary select-none" />
              </Link>
            </section>

            {/* 01 / THE COLLECTION */}
            <section className="flex flex-col w-full pt-10 pb-8" id="collection">
              <div className="px-6 flex flex-col gap-1 mb-6">
                <span className="font-label-mono text-secondary tracking-[0.2em] uppercase">01 / THE COLLECTION</span>
                <h2 className="font-headline-lg-mobile text-on-surface font-normal">Chosen, not stocked.</h2>
              </div>
              <div className="flex overflow-x-auto gap-4 px-6 no-scrollbar snap-x snap-mandatory">
                {collection.map((c) => (
                  <article
                    key={c.slug}
                    className="shrink-0 w-[82vw] max-w-[320px] snap-center flex flex-col bg-surface-container-lowest shadow-sm rounded-[2px] overflow-hidden"
                  >
                    <Link href={`/fleet/${c.slug}`} className="relative block w-full aspect-[4/3] bg-surface-container overflow-hidden">
                      <Image alt={c.alt} src={c.image} fill sizes="82vw" className="w-full h-full object-cover" />
                    </Link>
                    <div className="p-4 flex flex-col gap-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-label-mono text-secondary tracking-widest uppercase">{c.kicker}</span>
                        {c.status === "available" ? (
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                            <span className="font-label-mono text-primary font-medium uppercase">Available</span>
                          </div>
                        ) : (
                          <span className="font-label-mono text-secondary uppercase">{c.status}</span>
                        )}
                      </div>
                      <h3 className="font-headline-sm text-on-surface">
                        <Link href={`/fleet/${c.slug}`}>{c.title}</Link>
                      </h3>
                      <div className="font-spec-numeral text-secondary text-body-sm">{c.spec}</div>
                      <div className="pt-2 flex items-center justify-between mt-1">
                        <span className="font-spec-numeral text-on-surface font-bold">
                          {c.price} <span className="font-body-sm font-normal text-secondary">/ day</span>
                        </span>
                        <Link
                          href={`/book/${c.slug}/trip`}
                          className="font-action text-primary flex items-center gap-1 active:opacity-75"
                        >
                          Reserve <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="px-6 mt-6">
                <Link className="font-action text-on-surface flex items-center gap-1.5 py-2" href="/fleet">
                  <span>View all {vehicleCount} models in catalogue</span>
                  <span className="text-base font-normal">→</span>
                </Link>
              </div>
            </section>

            {/* 02 / THE STANDARD */}
            <section className="w-full bg-inverse-surface text-inverse-on-surface py-12 px-6 flex flex-col gap-8" id="standard-mobile">
              <div className="flex flex-col gap-2">
                <span className="font-label-mono text-inverse-primary tracking-[0.2em] uppercase">02 / THE STANDARD</span>
                <h2 className="font-headline-lg-mobile text-inverse-on-surface font-normal">Arrive the way you meant to.</h2>
              </div>
              <div className="relative w-full aspect-video overflow-hidden rounded-[2px] bg-tertiary-container shadow-md">
                <Image
                  alt="Mercedes-Benz arrival at hotel"
                  src={media.mobileMercedesHotel}
                  fill
                  sizes="100vw"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-5 pt-2">
                {principles.map((p) => (
                  <div key={p.kicker} className="bg-surface-container-highest/10 p-5 rounded-[2px] flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-label-mono text-inverse-primary">{p.kicker}</span>
                      <Icon name={p.icon} className="text-inverse-primary text-body-lg" />
                    </div>
                    <h3 className="font-headline-sm text-inverse-on-surface">{p.title}</h3>
                    <p className="font-body-md text-on-tertiary-container">{p.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 03 / CURATED ROUTES */}
            <section className="flex flex-col w-full px-6 py-12 gap-6" id="routes">
              <div className="flex flex-col gap-1">
                <span className="font-label-mono text-secondary tracking-[0.2em] uppercase">03 / CURATED ROUTES</span>
                <h2 className="font-headline-lg-mobile text-on-surface font-normal">Architectural journeys.</h2>
              </div>
              {routes.map((r) => (
                <article key={r.title} className="w-full flex flex-col bg-surface-container-low rounded-[2px] overflow-hidden shadow-sm">
                  <div className="relative w-full aspect-[4/5] bg-surface-container overflow-hidden">
                    <Image alt={r.alt} src={r.image} fill sizes="100vw" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-label-mono text-secondary uppercase">{r.meta}</span>
                      <span className="font-spec-numeral text-secondary">{r.km}</span>
                    </div>
                    <h3 className="font-headline-sm text-on-surface">{r.title}</h3>
                    <p className="font-body-md text-secondary">{r.body}</p>
                    <Link href={r.href} className="mt-2 font-action text-primary flex items-center gap-1.5 self-start active:opacity-75">
                      View road itinerary <span>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </section>

            {/* TESTIMONIAL */}
            <section className="w-full px-6 py-6">
              <div className="w-full bg-surface-container p-6 rounded-[2px] flex flex-col gap-4">
                <span className="font-label-mono text-secondary uppercase tracking-widest">PATRON VERIFICATION</span>
                <blockquote className="font-headline-sm italic text-on-surface font-normal leading-snug">
                  “The 911 was delivered to our hotel in Lucerne in immaculate, exhibition condition. Not a speck of dust,
                  fuel brimmed, passes pre-loaded. HALDEN has redefined automotive travel.”
                </blockquote>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-action text-on-surface">Julian V. D. B.</span>
                  <span className="font-label-mono text-secondary">ZURICH · OCT 2024</span>
                </div>
              </div>
            </section>
          </main>

          {/* FOOTER */}
          <footer
            className="w-full bg-inverse-surface text-inverse-on-surface px-6 pt-12 pb-8 flex flex-col gap-10 mt-6"
            id="dispatch"
          >
            <div className="flex flex-col gap-3">
              <span className="font-display tracking-[0.25em] text-headline-sm uppercase text-inverse-on-surface">HALDEN</span>
              <p className="font-body-md text-on-tertiary-container max-w-sm">
                An architectural fleet reserved for those who experience the European continent from the asphalt up.
              </p>
            </div>
            <NewsletterForm variant="mobile" />
            <div className="grid grid-cols-2 gap-6 pt-2 font-body-sm text-on-tertiary-container">
              <div className="flex flex-col gap-2.5">
                <span className="font-label-mono uppercase text-inverse-on-surface tracking-wider">LOCATIONS</span>
                <Link className="hover:text-inverse-on-surface transition-colors" href="/fleet?loc=zrh">Zurich Kloten</Link>
                <Link className="hover:text-inverse-on-surface transition-colors" href="/fleet?loc=gva">Geneva Cointrin</Link>
                <Link className="hover:text-inverse-on-surface transition-colors" href="/fleet?loc=muc">Munich Airport</Link>
                <Link className="hover:text-inverse-on-surface transition-colors" href="/fleet?loc=mxp">Milan Malpensa</Link>
              </div>
              <div className="flex flex-col gap-2.5">
                <span className="font-label-mono uppercase text-inverse-on-surface tracking-wider">PROTOCOL</span>
                <a className="hover:text-inverse-on-surface transition-colors" href="#standard-mobile">Curbside Delivery</a>
                <a className="hover:text-inverse-on-surface transition-colors" href="#standard-mobile">Insurance Matrix</a>
                <a className="hover:text-inverse-on-surface transition-colors" href="tel:+41448002400">Concierge Line</a>
                <a className="hover:text-inverse-on-surface transition-colors" href="#dispatch">Corporate Accounts</a>
              </div>
            </div>
            <div className="pt-6 flex flex-col gap-1 font-label-mono text-on-tertiary-container">
              <span>HALDEN AUTOMOTIVE ARCHIVE AG</span>
              <span>© 2025 ALL RIGHTS RESERVED · BASEL / MUNICH</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
