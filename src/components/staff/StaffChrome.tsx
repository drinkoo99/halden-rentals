"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOutAction } from "@/app/actions/auth";
import { setSessionUser, useSession } from "@/lib/session";

export type StaffSection = "overview" | "bookings" | "curbside" | "fleet" | "availability" | "customers" | "team" | "audit" | "settings";

const NAV: { id: StaffSection; label: string; href: string; admin?: boolean }[] = [
  { id: "overview", label: "OVERVIEW", href: "/staff" },
  { id: "bookings", label: "BOOKINGS", href: "/staff/bookings" },
  { id: "curbside", label: "CURBSIDE", href: "/staff/curbside" },
  { id: "fleet", label: "FLEET", href: "/staff/fleet" },
  { id: "availability", label: "AVAILABILITY", href: "/staff/availability" },
  { id: "customers", label: "CUSTOMERS", href: "/staff/customers" },
  { id: "team", label: "TEAM", href: "/staff/team", admin: true },
  { id: "audit", label: "AUDIT LOG", href: "/staff/audit", admin: true },
  { id: "settings", label: "SETTINGS", href: "/staff/settings" },
];

/**
 * The staff console frame (Stitch "Operations Console" sidebar and header), shared by every staff screen.
 * Admin-only entries are hidden from staff here, but that is only navigation: the pages and APIs enforce
 * the role on the server. The header search looks up bookings by reference, name or email.
 */
export function StaffChrome({ section, staffName, today, children }: { section: StaffSection; staffName: string; today: string; children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useSession();
  const isAdmin = user?.role === "admin";
  return (
    <div className="bg-surface font-body-md text-on-surface">
      <aside aria-label="Console navigation" className="fixed left-0 top-0 h-full w-60 bg-on-tertiary-fixed text-inverse-on-surface z-50 flex flex-col border-r border-tertiary">
        <div className="h-14 px-6 flex items-center border-b border-tertiary">
          <Link className="font-headline-sm text-headline-sm tracking-widest uppercase text-inverse-on-surface" href="/">
            HALDEN
          </Link>
        </div>
        <nav className="flex-1 py-4 flex flex-col gap-1">
          {NAV.filter((n) => !n.admin || isAdmin).map((n) =>
            n.id === section ? (
              <Link key={n.id} aria-current="page" className="px-6 py-2.5 font-label-mono text-label-mono uppercase bg-primary text-on-primary font-bold transition-colors" href={n.href}>
                {n.label}
              </Link>
            ) : (
              <Link key={n.id} className="px-6 py-2.5 font-label-mono text-label-mono uppercase text-on-tertiary-container hover:bg-tertiary hover:text-on-tertiary transition-colors" href={n.href}>
                {n.label}
              </Link>
            ),
          )}
        </nav>
        <div className="px-6 py-4 border-t border-tertiary">
          <span className="font-label-mono text-label-mono uppercase text-on-tertiary-container">{user ? `SIGNED IN AS ${user.role.toUpperCase()}` : "OPERATIONS CONSOLE"}</span>
        </div>
      </aside>
      <div className="pl-60">
        <header className="fixed top-0 left-60 right-0 h-14 bg-surface border-b border-outline-variant z-40 px-8 flex items-center justify-between">
          <form
            className="flex items-center w-96"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();
              if (q.length >= 2) router.push(`/staff/bookings?q=${encodeURIComponent(q)}`);
            }}
          >
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
              <input
                name="q"
                aria-label="Search bookings"
                className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm pl-9 pr-3 py-1.5 rounded-none border border-outline-variant focus:outline-hidden focus:border-primary placeholder:text-on-surface-variant"
                placeholder="Search booking ref, name or email..."
                type="search"
              />
            </div>
          </form>
          <div className="flex items-center gap-6">
            <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">{today}</span>
            <div className="flex items-center gap-3 pl-4 border-l border-outline-variant">
              <span className="font-body-sm text-body-sm text-on-surface">{staffName}</span>
              <form action={signOutAction} onSubmit={() => setSessionUser(null)}>
                <button type="submit" className="font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-on-surface underline underline-offset-4">
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </header>
        <main className="relative pt-14 w-full px-8 bg-surface">{children}</main>
      </div>
    </div>
  );
}
