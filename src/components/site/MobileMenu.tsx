"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { media } from "@/data/media";
import { vehicles } from "@/data/vehicles";
import { useMounted } from "@/lib/useMounted";

type TriggerVariant = "bars" | "icon";

const links = [
  { n: "01", label: "Fleet", href: "/fleet", tag: `${vehicles.length} EXHIBITS`, sub: "Sculptural Automotive Archive" },
  // Anchors point at the mobile homepage sections (screen 28), since this menu only shows below md.
  { n: "02", label: "Journeys", href: "/#routes", tag: "CURATED ROUTES", sub: "Alpine Passes & St. Moritz" },
  { n: "03", label: "The Standard", href: "/#standard-mobile", tag: "MANIFESTO", sub: "Purity & Mechanical Protocol" },
  { n: "04", label: "Patron Circle", href: "/sign-in", tag: "PRIVILEGES", sub: "Private Key Access & Garaging" },
  { n: "05", label: "About HALDEN", href: "/#dispatch", tag: null, sub: "Design Architecture & Team" },
];

function useCetClock(enabled: boolean) {
  const [time, setTime] = useState("");
  useEffect(() => {
    if (!enabled) return;
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Zurich",
      }).format(new Date());
    const tick = () => setTime(fmt());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [enabled]);
  return time;
}

/**
 * Mobile navigation overlay — Stitch screen 27 ("Archive & Salon").
 * Renders its own trigger: `bars` (homepage, screen 28) or `icon` (fleet, screen 26).
 */
export function MobileMenu({
  variant = "bars",
  triggerClassName = "",
}: {
  variant?: TriggerVariant;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const mounted = useMounted();
  const time = useCetClock(open && mounted);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Reset when the page is hidden by client navigation (Cache Components keeps pages mounted)
  useLayoutEffect(() => () => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      {variant === "bars" ? (
        <button
          ref={triggerRef}
          type="button"
          aria-label="Open Navigation Menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className={`w-11 h-11 flex flex-col justify-center items-end gap-1.5 ${triggerClassName}`}
          onClick={() => setOpen(true)}
        >
          <span className="w-6 h-[1.5px] bg-on-surface block" />
          <span className="w-4 h-[1.5px] bg-on-surface block" />
        </button>
      ) : (
        <button
          ref={triggerRef}
          type="button"
          aria-label="Open Navigation Menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className={`w-11 h-11 flex items-center justify-center text-on-surface active:bg-surface-container transition-colors ${triggerClassName}`}
          onClick={() => setOpen(true)}
        >
          <Icon name="menu" className="text-[24px]" />
        </button>
      )}

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[100] overflow-y-auto bg-tertiary"
        >
          <div className="flex flex-col w-full min-h-full text-inverse-on-surface select-none relative bg-tertiary">
            {/* Top Navigation Header */}
            <header className="flex items-center justify-between px-6 py-5 bg-tertiary">
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm tracking-[0.25em] text-surface-container-lowest font-light">
                  HALDEN
                </span>
                <span className="font-label-mono text-label-mono text-secondary-fixed-dim tracking-[0.2em] -mt-1">
                  ARCHIVE &amp; SALON
                </span>
              </div>
              <button
                ref={closeRef}
                aria-label="Close navigation overlay"
                className="w-12 h-12 flex items-center justify-center text-surface-container-lowest active:scale-95 transition-transform duration-150"
                type="button"
                onClick={close}
              >
                <Icon name="close" className="text-[26px] font-extralight text-surface-container-lowest" />
              </button>
            </header>

            {/* Live Status Monolith */}
            <div className="px-6 pb-2">
              <div className="flex items-center justify-between py-2 px-3 bg-tertiary-container rounded">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-pulse" />
                  <span className="font-label-mono text-label-mono text-secondary-fixed tracking-widest uppercase">
                    CONCIERGE ACTIVE
                  </span>
                </div>
                <span className="font-label-mono text-label-mono text-tertiary-fixed-dim">
                  {time ? `${time} CET` : "— CET"} {"// MUC · ZRH"}
                </span>
              </div>
            </div>

            {/* Primary Index Links */}
            <nav className="flex flex-col px-6 pt-5 pb-6">
              {links.map((l) => (
                <Link
                  key={l.n}
                  href={l.href}
                  onNavigate={() => setOpen(false)}
                  className="group flex flex-col py-3.5 transition-all duration-200"
                >
                  <div className="flex items-baseline justify-between w-full">
                    <span className="font-display-mobile text-display-mobile text-surface-container-lowest tracking-tight group-hover:translate-x-1.5 transition-transform duration-300">
                      {l.n}{" "}
                      <span className="font-headline-lg-mobile text-headline-lg-mobile text-secondary-fixed-dim mx-1.5 font-light">
                        /
                      </span>{" "}
                      {l.label}
                    </span>
                    {l.tag ? (
                      <span className="font-label-mono text-label-mono text-secondary-fixed px-2 py-0.5 bg-tertiary-container rounded tracking-wider">
                        {l.tag}
                      </span>
                    ) : (
                      <Icon
                        name="north_east"
                        className="text-[20px] text-tertiary-fixed-dim opacity-70 group-hover:translate-x-1 transition-transform"
                      />
                    )}
                  </div>
                  <span className="font-label-mono text-label-mono text-on-tertiary-container tracking-widest uppercase mt-0.5 opacity-60">
                    {l.sub}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Curated Vehicle Peek */}
            <div className="px-6 mb-5">
              <Link
                href="/fleet"
                onNavigate={() => setOpen(false)}
                className="relative bg-tertiary-container p-3 rounded flex items-center gap-4"
              >
                <div className="relative w-16 h-16 shrink-0 bg-inverse-surface rounded overflow-hidden">
                  <Image
                    src={media.menuVintagePorsche}
                    alt="Vintage Porsche 911 under architectural spotlights"
                    fill
                    sizes="64px"
                    className="object-cover grayscale contrast-125"
                  />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-label-mono text-label-mono text-secondary-fixed tracking-wider uppercase">
                    FEATURED RESERVE
                  </span>
                  <span className="font-headline-sm text-headline-sm text-surface-container-lowest truncate">
                    1973 Porsche Carrera 2.7 RS
                  </span>
                  <span className="font-spec-numeral text-spec-numeral text-tertiary-fixed-dim mt-0.5">
                    Alpine Spec · Swiss Plate
                  </span>
                </div>
                <Icon name="arrow_forward" className="text-secondary-fixed-dim text-lg shrink-0" />
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-3 px-6 pb-6">
              <Link
                href="/fleet"
                onNavigate={() => setOpen(false)}
                className="w-full h-[50px] bg-surface-container-lowest text-on-surface font-action text-action uppercase tracking-widest rounded flex items-center justify-center gap-2 active:bg-surface-container transition-colors"
              >
                <span>Book a car</span>
                <Icon name="calendar_today" className="text-[18px]" />
              </Link>
              <Link
                href="/sign-in"
                onNavigate={() => setOpen(false)}
                className="h-12 flex items-center justify-between px-3 bg-tertiary-container text-secondary-fixed rounded group"
              >
                <span className="font-label-mono text-label-mono tracking-widest uppercase text-secondary-fixed">
                  Patron Sign In
                </span>
                <span className="font-label-mono text-label-mono text-secondary-fixed group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </Link>
            </div>

            {/* Exhibition Footer & Concierge Terminal */}
            <footer className="mt-auto px-6 pt-5 pb-8 bg-inverse-surface flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <span className="font-label-mono text-label-mono text-on-tertiary-container uppercase tracking-wider">
                  CONCIERGE DISPATCH NETWORK
                </span>
                <p className="font-label-mono text-label-mono text-surface-container-high leading-relaxed">
                  Curbside concierge dispatch across Munich (MUC), Zurich (ZRH), Geneva (GVA), and Milan (MXP).
                </p>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-col">
                  <span className="font-label-mono text-label-mono text-on-tertiary-container uppercase tracking-wider">
                    DIRECT HOTLINE
                  </span>
                  <a
                    className="font-spec-numeral text-spec-numeral text-surface-container-lowest tracking-wider pt-0.5 inline-block active:text-secondary-fixed"
                    href="tel:+41448002400"
                  >
                    +41 44 800 2400
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-surface-tint" />
                  <span className="font-label-mono text-label-mono text-on-tertiary-container">24/7 CALL DESK</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-tertiary-container/30">
                <div className="flex items-center gap-4">
                  <a className="font-label-mono text-label-mono text-surface-container-high hover:text-surface-container-lowest transition-colors py-2" href="#">
                    Instagram
                  </a>
                  <span className="text-tertiary-fixed-dim font-label-mono text-[10px]">·</span>
                  <a className="font-label-mono text-label-mono text-surface-container-high hover:text-surface-container-lowest transition-colors py-2" href="#">
                    Substack
                  </a>
                  <span className="text-tertiary-fixed-dim font-label-mono text-[10px]">·</span>
                  <a className="font-label-mono text-label-mono text-surface-container-high hover:text-surface-container-lowest transition-colors py-2" href="#">
                    LinkedIn
                  </a>
                </div>
                <span className="font-label-mono text-label-mono text-on-tertiary-container">© 2025</span>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
