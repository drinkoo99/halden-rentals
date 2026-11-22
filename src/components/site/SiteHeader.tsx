"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signOutAction } from "@/app/actions/auth";
import { MobileMenu } from "@/components/site/MobileMenu";
import { shortName } from "@/lib/names";
import { setSessionUser, useSession } from "@/lib/session";

type Section = "fleet" | "journeys" | "about";

const NAV: { id: Section; label: string; href: string }[] = [
  { id: "fleet", label: "Fleet", href: "/fleet" },
  { id: "journeys", label: "Journeys", href: "/journeys" },
  { id: "about", label: "About", href: "/about" },
];

const ACCOUNT_LINKS = [
  { label: "Overview", href: "/account" },
  { label: "Reservations", href: "/account#reservations" },
  { label: "Saved cars", href: "/account#saved" },
  { label: "Settings", href: "/account/settings" },
];

/**
 * Shared header for the round-2 desktop pages (About, Journeys, patron account), consolidated from the
 * Stitch variants: 80px bar, HALDEN wordmark, Fleet / Journeys / About. Signed-out visitors see "Patron
 * sign in"; a signed-in patron (or an account page, which passes `patron`) gets the Stitch patron menu with
 * their name and a real sign-out.
 * Below md the nav collapses into the shared mobile menu.
 */
export function SiteHeader({ active, patron = false }: { active?: Section; patron?: boolean }) {
  const session = useSession();
  const signedIn = patron || session.status === "signed-in";
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant">
      <div className="h-20 max-w-7xl mx-auto px-margin-mobile lg:px-margin flex items-center justify-between gap-space-md">
        <Link className="font-headline-sm text-headline-sm tracking-widest uppercase text-on-surface hover:text-primary transition-colors" href="/">
          HALDEN
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-space-sm">
          {NAV.map((n) =>
            n.id === active ? (
              <Link key={n.id} aria-current="page" className="font-action text-action uppercase tracking-[0.14em] px-space-md py-space-sm bg-primary-container text-on-primary rounded-[2px]" href={n.href}>
                {n.label}
              </Link>
            ) : (
              <Link key={n.id} className="font-action text-action uppercase tracking-[0.14em] px-space-md py-space-sm text-on-surface-variant hover:text-on-surface transition-colors" href={n.href}>
                {n.label}
              </Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-space-sm">
          {signedIn ? (
            <PatronMenu />
          ) : (
            <Link className="hidden md:inline-block font-label-mono text-label-mono uppercase tracking-[0.14em] text-on-surface-variant hover:text-on-surface transition-colors" href="/sign-in">
              Patron sign in
            </Link>
          )}
          <div className="md:hidden">
            <MobileMenu variant="icon" />
          </div>
        </div>
      </div>
    </header>
  );
}

/** Patron menu: opens on click (works with keyboard and touch), closes on Escape / outside click. */
function PatronMenu() {
  const { user } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return (
    <div ref={ref} className="relative hidden md:flex items-center">
      <button
        aria-controls="patron-menu"
        aria-expanded={open}
        className="flex items-center gap-space-sm py-space-xs text-on-surface hover:text-primary transition-colors"
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        <span className="font-body-sm text-body-sm font-medium">{user ? shortName(user.name) : "Patron"}</span>
        <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-on-primary text-[18px]" aria-hidden>
            person
          </span>
        </span>
        <span className={`material-symbols-outlined text-[16px] text-on-surface-variant transition-transform ${open ? "rotate-180" : ""}`} aria-hidden>
          expand_more
        </span>
      </button>
      {open && (
        <div className="absolute right-0 top-full pt-space-xs w-52 z-50" id="patron-menu">
          <nav aria-label="Patron account" className="bg-surface border border-outline-variant py-space-xs flex flex-col">
            {ACCOUNT_LINKS.map((l) => (
              <Link key={l.href} className="px-space-md py-space-sm font-body-sm text-body-sm text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors" href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            {user && user.role !== "customer" && (
              <Link className="px-space-md py-space-sm font-body-sm text-body-sm text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors" href="/staff">
                Staff console
              </Link>
            )}
            <div className="my-space-xs border-t border-outline-variant" />
            <form action={signOutAction} onSubmit={() => setSessionUser(null)}>
              <button className="w-full text-left px-space-md py-space-sm font-body-sm text-body-sm text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors" type="submit">
                Sign out
              </button>
            </form>
          </nav>
        </div>
      )}
    </div>
  );
}
