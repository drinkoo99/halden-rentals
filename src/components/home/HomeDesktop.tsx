import Image from "next/image";
import Link from "next/link";
import { HomeSearchBar } from "@/components/home/HomeSearchBar";
import { ResponsiveHero } from "@/components/ui/ResponsiveHero";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { media } from "@/data/media";
import { vehicles } from "@/data/vehicles";

/** Desktop homepage — Stitch screen 04 ("HALDEN — The Gallery"). Shown from the md breakpoint up. */

const categoryLinks = [
  { label: "All", href: "/fleet", active: true },
  { label: "SUVs", href: "/fleet?category=suv" },
  { label: "Sedans", href: "/fleet?category=sedan" },
  { label: "Sports", href: "/fleet?category=sports" },
  { label: "Electric", href: "/fleet?power=hybrid,electric" },
  { label: "Exotic", href: "/fleet?sort=price-desc" },
];

const footerFleet = [
  { label: "Sports Tier (911, M5)", href: "/fleet?category=sports" },
  { label: "SUVs & Overlanding", href: "/fleet?category=suv" },
  { label: "Executive Sedans", href: "/fleet?category=sedan" },
  { label: "Pure Electric", href: "/fleet?power=electric" },
  { label: "Heritage Reserve", href: "/fleet" },
];

const footerLocations = [
  { label: "Zurich Flughafen (ZRH)", loc: "zrh" },
  { label: "Geneva Cointrin (GVA)", loc: "gva" },
  { label: "Munich Airport (MUC)", loc: "muc" },
  { label: "Milan Malpensa (MXP)", loc: "mxp" },
  { label: "Vienna Schwechat (VIE)", loc: "vie" },
];

export function HomeDesktop() {
  return (
    <div className="hidden md:block bg-ivory text-ink selection:bg-forest selection:text-ivory">
      {/* 1. HEADER (Transparent overlay on hero with ivory text) */}
      <header className="absolute top-0 left-0 w-full z-50 px-8 lg:px-16 py-8 flex items-center justify-between border-b border-white/10 bg-linear-to-b from-black/50 via-black/20 to-transparent">
        <Link href="/" className="font-sans font-semibold text-xl tracking-[0.35em] text-ivory uppercase">
          HALDEN
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center space-x-12">
          <Link href="/fleet" className="text-sm tracking-wider uppercase text-ivory/90 hover:text-ivory transition-colors">
            Fleet
          </Link>
          <Link href="/journeys" className="text-sm tracking-wider uppercase text-ivory/90 hover:text-ivory transition-colors">
            Journeys
          </Link>
          <Link href="/about" className="text-sm tracking-wider uppercase text-ivory/90 hover:text-ivory transition-colors">
            About
          </Link>
        </nav>
        <div className="flex items-center space-x-8">
          <Link
            href="/sign-in"
            className="text-sm tracking-wider uppercase text-ivory/90 hover:text-ivory transition-colors hidden sm:inline-block"
          >
            Sign in
          </Link>
          <a
            href="#booking"
            className="text-sm tracking-wider uppercase px-5 py-2.5 rounded-[2px] border border-ivory text-ivory hover:bg-ivory hover:text-ink transition-all"
          >
            Book a car
          </a>
        </div>
      </header>

      <main>
        {/* 2. HERO (Full screen height, 100vh) */}
        <section className="relative w-full h-screen min-h-[750px] overflow-hidden flex flex-col justify-between">
          <ResponsiveHero
            src={media.heroPorscheGallery}
            alt="HALDEN Exhibit 01 — Porsche 911 Carrera in modernist gallery"
            sizes="100vw"
            hiddenMedia="(max-width: 767px)"
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
          />
          <div className="absolute inset-0 bg-linear-to-r from-ink/75 via-ink/35 to-transparent z-10 w-full md:w-3/5 pointer-events-none" />
          <div className="h-28" />

          <div className="relative z-20 px-8 lg:px-16 max-w-2xl my-auto">
            <div className="font-mono text-xs tracking-[0.25em] text-ivory/80 uppercase mb-5">
              EXHIBIT 01 — PORSCHE 911 CARRERA
            </div>
            <h1 className="font-serif text-5xl lg:text-[84px] leading-[1.05] text-ivory mb-6 font-normal tracking-tight">
              Drive something
              <br />
              worth remembering.
            </h1>
            <p className="font-sans text-lg text-ivory/85 mb-10 max-w-lg font-light leading-relaxed">
              A curated fleet of premium cars, ready in Europe’s best cities and airports.
            </p>
            <div className="flex items-center space-x-6">
              <Link
                href="/fleet"
                className="bg-forest text-ivory px-8 py-3.5 rounded-[2px] font-sans text-sm tracking-wider uppercase font-medium hover:bg-forest-hover transition-colors"
              >
                Explore the fleet
              </Link>
              <Link
                href="/journeys"
                className="text-ivory font-sans text-sm tracking-wider hover:text-stone-bg transition-colors flex items-center group"
              >
                Plan a journey{" "}
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Hero Bottom Right Exhibit Placard */}
          <div className="relative z-20 self-end px-8 lg:px-16 pb-12 w-full flex justify-end">
            <Link
              href="/fleet/porsche-911-carrera"
              className="block bg-ivory border border-border-stone p-5 w-80 shadow-sm rounded-[2px] hover:bg-[#efede7] transition-colors"
            >
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-sans font-semibold text-sm text-ink tracking-tight">Porsche 911 Carrera</span>
                <span className="font-mono text-[10px] text-sage uppercase tracking-wider">No. 01</span>
              </div>
              <div className="w-full h-px bg-border-stone mb-2.5" />
              <div className="flex items-center justify-between font-mono text-xs text-text-muted">
                <span>2+2 seats · PDK · 385 hp</span>
              </div>
              <div className="mt-3 pt-2 border-t border-border-stone/60 flex items-baseline justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Day rate</span>
                <span className="font-mono font-medium text-sm text-ink">€340 / day</span>
              </div>
            </Link>
          </div>
        </section>

        {/* 3. SEARCH BAR DIRECTLY BELOW HERO */}
        <HomeSearchBar />

        {/* 4. "THE COLLECTION" — ASYMMETRIC GALLERY WALL */}
        <section id="fleet" className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-border-stone">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-border-stone">
            <div>
              <div className="font-mono text-xs tracking-[0.25em] text-sage uppercase mb-3">01 / THE COLLECTION</div>
              <h2 className="font-serif text-4xl lg:text-5xl text-ink font-normal">Chosen, not stocked.</h2>
            </div>
            <nav aria-label="Fleet categories" className="flex flex-wrap items-center gap-6 mt-6 md:mt-0 font-sans text-xs tracking-wider uppercase">
              {categoryLinks.map((c) =>
                c.active ? (
                  <span key={c.label} aria-current="true" className="text-ink font-semibold border-b border-ink pb-0.5">
                    {c.label}
                  </span>
                ) : (
                  <Link key={c.label} href={c.href} className="text-text-muted hover:text-ink transition-colors">
                    {c.label}
                  </Link>
                ),
              )}
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 2/3: Volvo XC90 */}
            <Link href="/fleet/volvo-xc90-ultimate-b6" className="lg:col-span-8 flex flex-col group">
              <div className="relative bg-stone-bg border border-border-stone overflow-hidden aspect-[16/10]">
                <Image
                  src={media.volvoCourtyard}
                  alt="Exhibit 02 — Volvo XC90 Ultimate"
                  fill
                  sizes="(min-width: 1280px) 800px, (min-width: 1024px) 64vw, 100vw"
                  quality={90}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-ivory border-x border-b border-border-stone p-6">
                <div className="flex items-baseline justify-between mb-2">
                  <div>
                    <span className="font-sans font-semibold text-lg text-ink group-hover:text-forest transition-colors">
                      Volvo XC90 Ultimate B6 AWD
                    </span>
                    <span className="font-sans text-xs text-text-muted ml-3">Pine Grey Metallic</span>
                  </div>
                  <span className="font-mono text-xs text-sage uppercase tracking-wider">Exhibit 02</span>
                </div>
                <div className="w-full h-px bg-border-stone mb-3" />
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="font-mono text-xs text-text-muted">7 seats · Automatic · 300 hp · All-Wheel Drive</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="font-mono text-xs text-text-muted uppercase">Rate</span>
                    <span className="font-mono font-medium text-base text-ink">€210 / day</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Right 1/3: Two stacked items */}
            <div className="lg:col-span-4 flex flex-col space-y-8">
              <Link href="/fleet/porsche-911-carrera-4s" className="flex flex-col border border-border-stone bg-ivory group">
                <div className="bg-stone-bg aspect-[16/9] overflow-hidden border-b border-border-stone relative">
                  <Image
                    src={media.heroPorscheGallery}
                    alt="Exhibit 03 — Porsche 911 Carrera GTS"
                    fill
                    sizes="(min-width: 1280px) 400px, (min-width: 1024px) 32vw, 100vw"
                    className="w-full h-full object-cover object-right"
                  />
                  <span className="absolute top-3 right-3 font-mono text-[10px] bg-ivory/90 px-2 py-0.5 border border-border-stone">
                    Sports
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="font-sans font-semibold text-sm text-ink group-hover:text-forest transition-colors">
                      Porsche 911 Carrera 4S
                    </span>
                    <span className="font-mono text-[10px] text-sage uppercase">Exhibit 03</span>
                  </div>
                  <div className="w-full h-px bg-border-stone mb-2" />
                  <div className="font-mono text-xs text-text-muted mb-2">2+2 seats · PDK · 450 hp</div>
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="font-mono text-[11px] text-text-muted uppercase">From</span>
                    <span className="font-mono font-medium text-xs text-ink">€390 / day</span>
                  </div>
                </div>
              </Link>

              <Link href="/fleet/mercedes-benz-s-500-4matic" className="flex flex-col border border-border-stone bg-ivory group">
                <div className="bg-dark-bg aspect-[16/9] overflow-hidden border-b border-border-stone relative">
                  <Image
                    src={media.mercedesHotelNight}
                    alt="Exhibit 04 — Mercedes-Benz S 500"
                    fill
                    sizes="(min-width: 1280px) 400px, (min-width: 1024px) 32vw, 100vw"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 right-3 font-mono text-[10px] bg-ivory/90 px-2 py-0.5 border border-border-stone">
                    Luxury
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="font-sans font-semibold text-sm text-ink group-hover:text-forest transition-colors">
                      Mercedes-Benz S 500 4MATIC
                    </span>
                    <span className="font-mono text-[10px] text-sage uppercase">Exhibit 04</span>
                  </div>
                  <div className="w-full h-px bg-border-stone mb-2" />
                  <div className="font-mono text-xs text-text-muted mb-2">5 seats · 9G-TRONIC · 435 hp</div>
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="font-mono text-[11px] text-text-muted uppercase">From</span>
                    <span className="font-mono font-medium text-xs text-ink">€310 / day</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/fleet"
              className="inline-flex items-center font-mono text-xs uppercase tracking-widest text-ink hover:text-forest transition-colors py-2 border-b border-ink/40"
            >
              View the complete catalogue ({vehicles.length} models) →
            </Link>
          </div>
        </section>

        {/* 5. DARK SECTION — MERCEDES S-CLASS NIGHT ARRIVAL */}
        <section id="standard" className="bg-dark-bg text-ivory py-24 border-b border-dark-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="relative w-full aspect-[21/9] min-h-[380px] overflow-hidden rounded-[2px] border border-dark-border">
              <Image
                src={media.mercedesHotelNight}
                alt="Mercedes-Benz S-Class arrival at boutique hotel at night"
                fill
                sizes="(min-width: 1280px) 1184px, 100vw"
                quality={90}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-dark-bg via-dark-bg/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="font-mono text-xs text-sage uppercase tracking-[0.25em] mb-3">02 / THE STANDARD</div>
                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-ivory font-normal leading-tight">
                  Arrive the way you meant to.
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-12 border-t border-b border-dark-border divide-y md:divide-y-0 md:divide-x divide-dark-border">
              <div className="p-8">
                <div className="font-mono text-xs text-sage uppercase tracking-wider mb-2">01 — Logistical ease</div>
                <h3 className="font-sans font-semibold text-base text-ivory mb-2">Ready where you land</h3>
                <p className="font-sans text-sm text-text-muted leading-relaxed">
                  Curbside delivery at 18 European executive and private terminals. No queues, no rental desk transfers.
                </p>
              </div>
              <div className="p-8">
                <div className="font-mono text-xs text-sage uppercase tracking-wider mb-2">02 — Pure transparency</div>
                <h3 className="font-sans font-semibold text-base text-ivory mb-2">One clear price</h3>
                <p className="font-sans text-sm text-text-muted leading-relaxed">
                  Comprehensive insurance, border crossing clearance, and Swiss motorway vignettes included on delivery.
                </p>
              </div>
              <div className="p-8">
                <div className="font-mono text-xs text-sage uppercase tracking-wider mb-2">03 — Exhibition condition</div>
                <h3 className="font-sans font-semibold text-base text-ivory mb-2">Kept to a gallery standard</h3>
                <p className="font-sans text-sm text-text-muted leading-relaxed">
                  Every vehicle undergoes a 48-point acoustic, mechanical, and detailing inspection before departure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. "JOURNEYS" — HORIZONTAL ROW OF THREE TALL PORTRAIT PHOTOS */}
        <section id="journeys" className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-border-stone">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-border-stone">
            <div>
              <div className="font-mono text-xs tracking-[0.25em] text-sage uppercase mb-3">03 / CURATED ROUTES</div>
              <h2 className="font-serif text-4xl lg:text-5xl text-ink font-normal">Designed for the open road.</h2>
            </div>
            <p className="font-sans text-sm text-text-muted max-w-sm mt-4 md:mt-0 leading-relaxed">
              Pre-configured routes curated by European road navigators, with GPS waypoints and boutique accommodation stops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            <JourneyCard
              span="md:col-span-5"
              image={media.alpinePass}
              alt="Furka & Susten Passes in the Swiss Alps"
              objectClass="object-cover"
              tag="Switzerland"
              title="The High Alpine Transversal"
              meta="3 days · 640 km · 4 mountain passes"
              href="/fleet?category=sports"
            />
            <JourneyCard
              span="md:col-span-4"
              image={media.rivieraCoastRoad}
              alt="Côte d'Azur coastal corniche route"
              objectClass="object-cover object-bottom"
              tag="France & Italy"
              title="The Grand Corniche & Riviera"
              meta="4 days · 520 km · Nice to Portofino"
              href="/fleet?category=sports"
            />
            <JourneyCard
              span="md:col-span-3"
              image={media.volvoCourtyard}
              alt="Vienna to Wachau Valley route"
              objectClass="object-cover object-top"
              tag="Austria"
              title="Wachau to Salzburg"
              meta="2 days · 380 km · Danube valley"
              href="/fleet?category=sedan"
            />
          </div>
        </section>

        {/* 7. TESTIMONIAL ON STONE BACKGROUND */}
        <section className="bg-stone-bg py-24 border-b border-border-stone">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="font-mono text-xs text-sage uppercase tracking-[0.25em] block mb-8">PATRON RECORD</span>
            <blockquote className="font-serif text-2xl md:text-4xl text-ink font-normal leading-relaxed mb-8 italic">
              “The 911 was delivered to our hotel in Lucerne in immaculate, exhibition condition. No paperwork ordeal, no
              corporate counters — just the keys, a spotless machine, and the Gotthard Pass ahead of us.”
            </blockquote>
            <div className="font-mono text-xs text-text-muted uppercase tracking-widest mb-2">
              JULIAN V. D. B. · ZURICH · PORSCHE 911 CARRERA (OCTOBER 2024)
            </div>
            <div className="font-mono text-[10px] text-sage/70 uppercase">Placeholder testimonial</div>
          </div>
        </section>
      </main>

      {/* 8. FOOTER */}
      <footer id="about" className="bg-dark-bg text-ivory pt-20 pb-12 border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-dark-border">
            <div className="lg:col-span-6">
              <div className="font-sans font-semibold text-2xl tracking-[0.35em] text-ivory uppercase mb-6">HALDEN</div>
              <p className="font-sans text-sm text-text-muted max-w-md leading-relaxed font-light">
                European automobile atelier and rental gallery. Providing impeccably prepared vehicles for meaningful
                journeys across Switzerland, Germany, France, and Northern Italy.
              </p>
            </div>
            <div className="lg:col-span-6 flex flex-col justify-end">
              <span className="font-mono text-xs text-sage uppercase tracking-wider mb-3">The Dispatch</span>
              <p className="font-sans text-xs text-text-muted mb-4">Quarterly seasonal route guides and new fleet additions.</p>
              <NewsletterForm variant="desktop" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-dark-border text-xs">
            <FooterColumn title="Fleet" links={footerFleet} />
            <FooterColumn
              title="Locations"
              links={footerLocations.map((l) => ({ label: l.label, href: `/fleet?loc=${l.loc}` }))}
            />
            <FooterColumn
              title="Company"
              links={[
                { label: "The Gallery Manifesto", href: "#standard" },
                { label: "Inspection Protocols", href: "#standard" },
                { label: "Private Aviation Delivery", href: "#standard" },
                { label: "Press & Editorial", href: "#about" },
              ]}
            />
            <FooterColumn
              title="Support & Legal"
              links={[
                { label: "Concierge Desk (24/7)", href: "tel:+41448002400" },
                { label: "Insurance & Excess Terms", href: "/terms#liability" },
                { label: "Cross-border Protocols", href: "/terms#prices" },
                { label: "Privacy Notice", href: "/privacy" },
                { label: "Cookie Preferences", href: "#cookie-preferences" },
              ]}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-[11px] font-mono text-text-muted">
            <div>© 2025 HALDEN AUTOMOBILE AG. ALL RIGHTS RESERVED.</div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              
              
              
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function JourneyCard({
  span,
  image,
  alt,
  objectClass,
  tag,
  title,
  meta,
  href,
}: {
  span: string;
  image: string;
  alt: string;
  objectClass: string;
  tag: string;
  title: string;
  meta: string;
  href: string;
}) {
  return (
    <Link href={href} className={`${span} flex flex-col group`}>
      <div className="relative bg-stone-bg aspect-[3/4] overflow-hidden border border-border-stone mb-4">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1280px) 500px, (min-width: 768px) 42vw, 100vw"
          className={`w-full h-full ${objectClass} transition-transform duration-700 group-hover:scale-105`}
        />
        <div className="absolute top-4 left-4 bg-ivory/95 px-3 py-1 font-mono text-[10px] text-ink uppercase tracking-wider border border-border-stone">
          {tag}
        </div>
      </div>
      <h3 className="font-serif text-2xl text-ink mb-1 group-hover:text-forest transition-colors">{title}</h3>
      <div className="font-mono text-xs text-text-muted mb-3">{meta}</div>
      <span className="font-sans text-xs uppercase tracking-wider text-ink border-b border-ink/40 w-fit pb-0.5 group-hover:border-forest transition-colors">
        Explore route itinerary →
      </span>
    </Link>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <span className="font-mono text-[11px] text-sage uppercase tracking-widest block mb-4">{title}</span>
      <ul className="space-y-2.5 font-sans text-text-muted">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="hover:text-ivory transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
