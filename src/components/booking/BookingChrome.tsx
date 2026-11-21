"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { Icon } from "@/components/ui/Icon";
import { formatDayTimeCompact } from "@/lib/itinerary";
import { formatEuroCents, SECURITY_DEPOSIT } from "@/lib/pricing";

export const steps = [
  { n: "01", key: "car", label: "CAR" },
  { n: "02", key: "trip", label: "TRIP" },
  { n: "03", key: "extras", label: "EXTRAS" },
  { n: "04", key: "details", label: "DETAILS" },
  { n: "05", key: "review", label: "REVIEW" },
  { n: "06", key: "confirmed", label: "CONFIRMED" },
] as const;

export type StepKey = (typeof steps)[number]["key"];

export function stepHref(slug: string, key: StepKey) {
  return key === "car" ? `/fleet/${slug}` : `/book/${slug}/${key}`;
}

/** Fixed booking header + six-step index — identical on Stitch screens 20–24. */
export function BookingHeader({ slug }: { slug: string }) {
  const pathname = usePathname();
  const current = steps.findIndex((s) => pathname.endsWith(`/${s.key}`));
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/95 backdrop-blur-md border-b border-outline-variant print:hidden">
      <div className="h-16 max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-action text-action tracking-[0.25em] font-semibold text-on-surface uppercase">
            HALDEN
          </Link>
          <span className="hidden sm:inline-block w-px h-4 bg-outline-variant" />
          <span className="hidden sm:inline-block font-label-mono text-label-mono uppercase text-outline tracking-widest">
            EXHIBITION ARCHIVE
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded-none border border-outline-variant">
          <Icon name="lock" className="text-[14px] text-primary" />
          <span className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface">SECURE RESERVATION</span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            className="font-action text-action uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5"
            href={`/fleet/${slug}`}
          >
            <span className="hidden sm:inline">Exit reservation</span>
            <Icon name="close" className="text-[16px]" label="Exit reservation" />
          </Link>
          <Link href="/sign-in" aria-label="Sign in" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Icon name="person" className="text-on-primary text-[18px]" />
          </Link>
        </div>
      </div>
      <nav aria-label="Reservation steps" className="border-t border-outline-variant bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-stretch justify-between overflow-x-auto no-scrollbar">
          {steps.map((s, i) => {
            const active = i === current;
            const done = i < current;
            const locked = s.key === "confirmed" && !active;
            const cls = active
              ? "flex items-center gap-2 py-3 px-4 tracking-wider whitespace-nowrap transition-colors border-b-2 border-primary text-on-surface font-semibold font-action text-action"
              : "flex items-center gap-2 py-3 px-4 text-on-surface-variant hover:text-on-surface font-action text-action tracking-wider whitespace-nowrap transition-colors";
            const inner = (
              <>
                {done && <span className="text-primary font-bold">✓</span>}
                <span className="font-label-mono text-label-mono text-outline">{s.n}</span>
                {s.label}
              </>
            );
            return (
              <Fragment key={s.key}>
                {i > 0 && <span className="self-center h-4 w-px bg-outline-variant shrink-0" aria-hidden />}
                {locked ? (
                  <span className={`${cls} opacity-60 cursor-default`} aria-disabled="true">
                    {inner}
                  </span>
                ) : (
                  <Link className={cls} href={stepHref(slug, s.key)} aria-current={active ? "step" : undefined}>
                    {inner}
                  </Link>
                )}
              </Fragment>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

/** "Reservation dossier" sidebar — identical on Stitch screens 20–24, with live totals. */
export function BookingSummary() {
  const { vehicle: v, state, pickup, dropoff, days, quote } = useBooking();
  const extrasCount = quote.extras.length;
  return (
    <aside
      aria-label="Reservation dossier"
      className="hidden md:block lg:col-span-4 lg:sticky lg:top-36 bg-surface-container-low border border-outline-variant p-6 rounded-none space-y-6"
    >
      <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
        <span className="font-label-mono text-label-mono uppercase tracking-widest text-outline">RESERVATION DOSSIER</span>
        <span className="font-label-mono text-label-mono uppercase text-primary bg-primary-fixed px-2 py-0.5">
          {state.confirmation ? "CONFIRMED" : "ACTIVE"}
        </span>
      </div>
      <div className="space-y-3">
        <div className="relative w-full h-44 bg-surface-container-high overflow-hidden border border-outline-variant">
          <Image alt={v.imageAlt} src={v.image} fill sizes="(min-width: 1024px) 360px, 100vw" className="w-full h-full object-cover" />
          <div className="absolute bottom-2 left-2 bg-surface/90 px-2 py-0.5 border border-outline-variant">
            <span className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface">
              {v.brand.toUpperCase()} · EXHIBIT {v.exhibit}
            </span>
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">{v.model}</h2>
            <Link
              className="font-label-mono text-label-mono uppercase text-primary underline underline-offset-4 hover:text-primary-container"
              href={`/fleet?loc=${state.loc}&from=${state.from}&to=${state.to}`}
            >
              EDIT
            </Link>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">{v.colour ?? v.categoryLabel}</p>
        </div>
      </div>
      <div className="py-4 border-y border-outline-variant space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="font-label-mono text-label-mono uppercase tracking-widest text-outline block">PICKUP &amp; RETURN</span>
            <p className="font-spec-numeral text-spec-numeral text-on-surface">
              {pickup.label}
              {dropoff.id !== pickup.id && <> → {dropoff.label}</>}
            </p>
            <p className="font-label-mono text-label-mono text-on-surface-variant uppercase">
              {formatDayTimeCompact(state.from)} → {formatDayTimeCompact(state.to)} · {days} {days === 1 ? "DAY" : "DAYS"}
            </p>
          </div>
          <Link
            className="font-label-mono text-label-mono uppercase text-primary underline underline-offset-4 hover:text-primary-container"
            href={`/book/${v.slug}/trip`}
          >
            EDIT
          </Link>
        </div>
      </div>
      <div className="space-y-3">
        <span className="font-label-mono text-label-mono uppercase tracking-widest text-outline block">PRICE BREAKDOWN</span>
        <div className="space-y-2 font-spec-numeral text-spec-numeral" aria-live="polite">
          <div className="flex justify-between text-on-surface-variant">
            <span>
              Daily rate (€{v.pricePerDay} × {days})
            </span>
            <span>{formatEuroCents(quote.rental)}</span>
          </div>
          <div className="flex justify-between text-on-surface-variant">
            <span>Curated extras{extrasCount ? ` (${extrasCount} ${extrasCount === 1 ? "item" : "items"})` : ""}</span>
            <span>{formatEuroCents(quote.extrasTotal)}</span>
          </div>
          <div className="flex justify-between text-on-surface-variant">
            <span>Surcharges &amp; 19% VAT</span>
            <span>{formatEuroCents(quote.vat)}</span>
          </div>
          <div className="pt-2 border-t border-outline-variant flex justify-between items-baseline font-bold text-on-surface">
            <span className="font-action text-action uppercase tracking-wider">Total Reservation</span>
            <span className="font-headline-sm text-headline-sm text-primary">{formatEuroCents(quote.total)}</span>
          </div>
        </div>
        <div className="p-3 bg-surface-container-high border border-outline-variant">
          <span className="font-label-mono text-label-mono text-outline block">
            * REFUNDABLE SECURITY DEPOSIT ({formatEuroCents(SECURITY_DEPOSIT)}) PRE-AUTHORIZED AT KEY HANDOVER.
          </span>
        </div>
      </div>
    </aside>
  );
}

export function BookingFooter() {
  return (
    <footer className="w-full border-t border-outline-variant bg-surface py-10 mt-16 print:hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-action text-action uppercase tracking-widest font-semibold text-on-surface">HALDEN</span>
          <span className="w-px h-3 bg-outline-variant" />
          <span className="font-label-mono text-label-mono text-on-surface-variant">ARCHITECTURAL FLEET CURATION</span>
        </div>
        <p className="font-label-mono text-label-mono text-outline uppercase tracking-wider">
          © 2025 HALDEN AUTOMOTIVE ARCHIVE. MUNICH · ZURICH · MILAN.
        </p>
      </div>
    </footer>
  );
}
