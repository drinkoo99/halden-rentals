"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Lightbox } from "@/components/vehicle/Lightbox";
import { useTrip } from "@/components/vehicle/useTrip";
import type { Vehicle } from "@/data/vehicles";
import { useFavourites } from "@/lib/favourites";
import { formatEuro } from "@/lib/itinerary";

const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const longDay = (v: string) => {
  const d = new Date(v);
  return `${d.getDate()} ${MONTHS_LONG[d.getMonth()]}`;
};

/** Mobile vehicle detail — Stitch screen 30. Shown below md. */
export function VehicleMobile({ vehicle: v, similar }: { vehicle: Vehicle; similar: Vehicle[] }) {
  const { itinerary, days, quote, query } = useTrip(v);
  const { isFavourite, toggle } = useFavourites();
  const saved = isFavourite(v.slug);
  const [active, setActive] = useState(0);
  const [viewer, setViewer] = useState<number | null>(null);
  const [shareMsg, setShareMsg] = useState<string | null>(null);
  const photos = v.mobileGallery ?? (v.gallery.length ? v.gallery : [{ src: v.image, alt: v.imageAlt }]);
  const thumbs = photos.map((p, i) => ({ ...p, i })).filter((p) => p.i !== active).slice(0, 2);
  const more = photos.length - 1 - thumbs.length;
  const loc = itinerary.location;

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: `HALDEN — ${v.name}`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareMsg("Link copied");
    } catch {
      setShareMsg(null);
    }
    window.setTimeout(() => setShareMsg(null), 2000);
  }

  const mobileSpecs = v.specs.slice(0, 6);

  return (
    <div className="md:hidden bg-surface font-body-md text-on-surface min-h-screen pb-24">
      {/* Architectural Top Bar */}
      <header className="w-full flex items-center justify-between px-6 py-4 bg-surface-bright sticky top-0 z-30">
        <Link
          href={`/fleet?${query}`}
          aria-label="Return to fleet catalogue"
          className="flex items-center space-x-1.5 min-h-[44px] min-w-[44px] text-on-surface hover:text-primary transition-colors"
        >
          <span className="font-label-mono text-label-mono tracking-widest uppercase">← Fleet</span>
        </Link>
        <Link href="/" className="font-headline-sm text-headline-sm tracking-wider uppercase font-medium">
          Halden
        </Link>
        <div className="flex items-center space-x-3">
          <button
            aria-label="Share vehicle archive"
            onClick={share}
            className="relative min-h-[44px] min-w-[44px] flex items-center justify-center text-on-surface hover:text-primary transition-colors"
            type="button"
          >
            <Icon name="ios_share" className="text-[20px]" />
            {shareMsg && (
              <span role="status" className="absolute top-full right-0 mt-1 whitespace-nowrap bg-tertiary text-on-tertiary px-2 py-1 font-label-mono text-[10px] uppercase">
                {shareMsg}
              </span>
            )}
          </button>
          <button
            aria-label={saved ? "Remove bookmark" : "Bookmark vehicle"}
            aria-pressed={saved}
            onClick={() => toggle(v.slug)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-on-surface hover:text-primary transition-colors"
            type="button"
          >
            <span
              className={`material-symbols-outlined text-[22px] ${saved ? "text-primary" : ""}`}
              aria-hidden
              style={saved ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" } : undefined}
            >
              {saved ? "favorite" : "favorite_border"}
            </span>
          </button>
        </div>
      </header>
      <div className="w-full h-px bg-surface-variant" />

      <main>
        {/* Primary Exhibition Stage & Carousel */}
        <section className="relative w-full bg-surface-container" aria-label="Gallery">
          <button
            type="button"
            onClick={() => setViewer(active)}
            aria-label={`Open photo: ${photos[active].alt}`}
            className="relative block w-full aspect-[4/3] overflow-hidden bg-surface-dim"
          >
            <Image
              key={photos[active].src}
              alt={photos[active].alt}
              src={photos[active].src}
              fill
              preload={active === 0}
              quality={90}
              sizes="100vw"
              className="w-full h-full object-cover transition-opacity duration-500 ease-out"
            />
            <span className="absolute bottom-4 right-4 bg-tertiary/80 text-on-tertiary px-3 py-1 font-label-mono text-label-mono tracking-widest rounded-none">
              {String(active + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
            </span>
            {v.galleryBadge && (
              <span className="absolute top-4 left-4 bg-surface-bright/90 px-3 py-1 font-label-mono text-label-mono text-on-surface tracking-widest uppercase">
                {v.galleryBadge}
              </span>
            )}
          </button>
          {photos.length > 1 && (
            <div className="grid grid-cols-3 gap-0.5 bg-surface-variant p-0.5">
              {thumbs.map((t) => (
                <button
                  key={t.src}
                  className="relative aspect-[16/10] overflow-hidden group"
                  onClick={() => setActive(t.i)}
                  aria-label={`Show photo: ${t.alt}`}
                  type="button"
                >
                  <Image alt="" src={t.src} fill sizes="33vw" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
              <button
                className="relative aspect-[16/10] overflow-hidden bg-surface-container-high flex flex-col items-center justify-center text-on-surface group"
                onClick={() => setViewer(0)}
                type="button"
              >
                <span className="font-label-mono text-label-mono tracking-wider uppercase">
                  {more > 0 ? `+ ${more} Plates` : "All Plates"}
                </span>
                <span className="font-spec-numeral text-[11px] text-secondary mt-0.5">Full Folio →</span>
              </button>
            </div>
          )}
        </section>

        {/* Title & Acquisition Block */}
        <section className="px-6 pt-8 pb-6 flex flex-col space-y-4">
          <div className="flex items-center justify-between gap-3">
            <span className="font-label-mono text-label-mono uppercase tracking-[0.16em] text-secondary">
              Catalogue № {v.exhibit} {"//"} {v.brand} Archive
            </span>
            <span className="flex items-center space-x-1.5 bg-secondary-container text-on-secondary-fixed px-2.5 py-0.5 font-label-mono text-[10px] tracking-wider uppercase shrink-0">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Reserved Status: {v.available ? "Open" : "Closed"}</span>
            </span>
          </div>
          <div className="space-y-1.5">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight font-normal">{v.model}</h1>
            <p className="font-body-md text-body-md text-on-surface-variant font-light">
              {v.mobileSubtitle ?? `${v.categoryLabel} · ${v.year} Specification · ${v.seatsLabel}`}
            </p>
          </div>
          <div className="p-3 bg-surface-container flex items-start space-x-3">
            <Icon name="verified" className="text-primary text-[18px] mt-0.5" />
            <div className="flex flex-col">
              <span className="font-action text-action text-on-surface">
                {v.available ? "Available for selected itinerary" : "Unavailable for selected itinerary"}
              </span>
              <span className="font-spec-numeral text-spec-numeral text-secondary">
                {longDay(itinerary.from)} – {longDay(itinerary.to)} ({days} diurnal {days === 1 ? "cycle" : "cycles"})
              </span>
            </div>
          </div>
          <div className="pt-2 flex items-baseline justify-between">
            <div className="flex items-baseline space-x-1.5">
              <span className="font-spec-numeral text-[28px] font-medium tracking-tight text-on-surface">€{v.pricePerDay}</span>
              <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest">/ day</span>
            </div>
            <span className="font-label-mono text-[11px] text-outline text-right uppercase tracking-wider">
              VAT &amp; Trans-Alpine Permit Included
            </span>
          </div>
        </section>
        <div className="w-full h-px bg-surface-variant" />

        {/* Curatorial Note */}
        <section className="px-6 py-8 bg-surface-bright">
          <span className="font-label-mono text-label-mono uppercase tracking-widest text-secondary block mb-3">Curatorial Narrative</span>
          <p className="font-body-lg text-body-lg text-on-surface leading-relaxed font-light">{v.mobileNarrative ?? v.narrative[0]}</p>
        </section>
        <div className="w-full h-px bg-surface-variant" />

        {/* Specification Matrix */}
        <section className="px-6 py-8">
          <div className="flex items-center justify-between mb-5">
            <span className="font-label-mono text-label-mono uppercase tracking-widest text-secondary">Mechanical Matrix</span>
            <span className="font-label-mono text-[10px] text-outline uppercase tracking-widest">DIN 70020 Spec</span>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
            {mobileSpecs.map((s) => (
              <div key={s.label} className="flex flex-col space-y-1">
                <dt className="font-label-mono text-label-mono uppercase text-secondary">{s.label}</dt>
                <dd className="font-spec-numeral text-spec-numeral text-on-surface">{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>
        <div className="w-full h-px bg-surface-variant" />

        {/* Amenities */}
        <section className="px-6 py-8 bg-surface-container-low">
          <span className="font-label-mono text-label-mono uppercase tracking-widest text-secondary block mb-4">
            Provisioning &amp; Amenities
          </span>
          <ul className="flex flex-col space-y-3.5">
            {(v.mobileAmenities ?? v.amenities.map((a) => ({ title: a, detail: "" }))).map((a) => (
              <li key={a.title} className="flex items-center space-x-3">
                <span className="w-4 h-4 bg-primary text-on-primary flex items-center justify-center text-[10px] shrink-0" aria-hidden>
                  ✓
                </span>
                <div className="flex flex-col">
                  <span className="font-body-md text-body-md text-on-surface font-medium">{a.title}</span>
                  {a.detail && <span className="font-body-sm text-body-sm text-secondary">{a.detail}</span>}
                </div>
              </li>
            ))}
          </ul>
        </section>
        <div className="w-full h-px bg-surface-variant" />

        {/* Logistics */}
        <section className="px-6 py-8">
          <span className="font-label-mono text-label-mono uppercase tracking-widest text-secondary block mb-3">Dispatch &amp; Logistics</span>
          <div className="bg-surface-container p-5 flex flex-col space-y-3">
            <div className="flex items-center space-x-2 text-on-surface">
              <Icon name="flight_land" className="text-[20px] text-primary" />
              <span className="font-headline-sm text-headline-sm">{loc.label}</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              {loc.handoverTitle}. {loc.handoverNote}
            </p>
            <div className="pt-2 flex items-center justify-between text-secondary">
              <span className="font-label-mono text-label-mono uppercase">Handover Window</span>
              <span className="font-spec-numeral text-spec-numeral text-on-surface">{loc.handoverWindow}</span>
            </div>
          </div>
        </section>
        <div className="w-full h-px bg-surface-variant" />

        {/* Related */}
        <section className="px-6 py-8">
          <div className="flex items-center justify-between mb-4">
            <span className="font-label-mono text-label-mono uppercase tracking-widest text-secondary">Parallel Exhibits</span>
            <Link className="font-label-mono text-[11px] text-primary uppercase underline underline-offset-4" href={`/fleet?${query}`}>
              Full Register
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {similar.slice(0, 2).map((s) => (
              <Link key={s.slug} href={`/fleet/${s.slug}?${query}`} className="flex flex-col bg-surface-container-low p-3 space-y-2.5">
                <div className="relative w-full aspect-[4/3] bg-surface-dim overflow-hidden">
                  <Image alt={s.imageAlt} src={s.image} fill sizes="45vw" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="font-label-mono text-[10px] text-secondary uppercase tracking-widest">Exhibit {s.exhibit}</span>
                  <span className="font-headline-sm text-[16px] text-on-surface leading-tight">{s.model}</span>
                  <span className="font-spec-numeral text-[13px] text-on-surface-variant mt-1">€{s.pricePerDay} / day</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Fixed Reservation Bar */}
      <aside className="fixed bottom-0 left-0 right-0 z-40 bg-surface-bright/95 backdrop-blur-sm px-6 py-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] flex items-center justify-between border-t border-surface-variant shadow-sm max-w-md mx-auto">
        <div className="flex flex-col">
          <div className="flex items-baseline space-x-1">
            <span className="font-spec-numeral text-[22px] font-bold tracking-tight text-on-surface">€{v.pricePerDay}</span>
            <span className="font-label-mono text-[11px] text-secondary uppercase">/ day</span>
          </div>
          <span className="font-spec-numeral text-[11px] text-secondary tracking-wide">
            {formatEuro(quote.rental)} total · {days} diurnal {days === 1 ? "cycle" : "cycles"}
          </span>
        </div>
        <Link
          href={`/book/${v.slug}/trip?${query}`}
          className="min-h-[48px] px-8 bg-primary hover:bg-primary-container text-on-primary font-action text-action uppercase tracking-widest transition-colors flex items-center justify-center space-x-2"
        >
          <span>Reserve Exhibit</span>
          <Icon name="arrow_forward" className="text-[16px]" />
        </Link>
      </aside>

      {viewer != null && <Lightbox photos={photos} index={viewer} onIndex={setViewer} onClose={() => setViewer(null)} />}
    </div>
  );
}
