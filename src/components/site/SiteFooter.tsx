import Link from "next/link";
import { locations } from "@/data/locations";

const FLEET = [
  { label: "Sports & Grand Touring", href: "/fleet?category=sports" },
  { label: "SUVs & Overlanding", href: "/fleet?category=suv" },
  { label: "Executive Sedans", href: "/fleet?category=sedan" },
  { label: "Hybrid & Electric", href: "/fleet?power=hybrid,electric" },
];

const SUPPORT = [
  { label: "Patron Concierge", href: "/about#contact" },
  { label: "Curated Journeys", href: "/journeys" },
  { label: "Patron Account", href: "/account" },
];

export const LEGAL_LINKS = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Imprint", href: "/imprint" },
];

/** Reopens the cookie preferences (handled by CookieConsent). */
export const COOKIE_PREFERENCES_HREF = "#cookie-preferences";

const link = "text-inverse-on-surface hover:text-primary-fixed transition-colors";

/**
 * Shared footer for the round-2 pages, consolidated from the Stitch footers (dark room, four columns).
 * Every link goes somewhere real; hub names come from the location data.
 */
export function SiteFooter() {
  return (
    <footer className="w-full bg-inverse-surface text-inverse-on-surface py-space-xl border-t border-outline-variant">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-space-lg pb-space-lg border-b border-outline/30">
          <div>
            <Link className="font-headline-sm text-headline-sm tracking-widest uppercase text-inverse-on-surface" href="/">
              HALDEN
            </Link>
            <p className="mt-space-sm font-body-sm text-body-sm text-on-tertiary-container">
              A rental house built like a gallery: chosen cars, handed over where you land, at one clear price.
            </p>
          </div>
          <FooterColumn title="Fleet" links={FLEET} />
          <FooterColumn title="Hubs" links={locations.map((l) => ({ label: l.label, href: "/about#hubs" }))} />
          <FooterColumn title="Support" links={SUPPORT} />
        </div>
        <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md font-label-mono text-label-mono uppercase text-on-tertiary-container">
          <span>© 2026 HALDEN. Concept prototype.</span>
          <nav aria-label="Legal" className="flex items-center gap-space-md">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} className="hover:text-inverse-on-surface transition-colors" href={l.href}>
                {l.label}
              </Link>
            ))}
            <a className="hover:text-inverse-on-surface transition-colors" href={COOKIE_PREFERENCES_HREF}>
              Cookie preferences
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-label-mono text-label-mono uppercase text-on-tertiary-container mb-space-md">{title}</h2>
      <ul className="space-y-space-sm font-body-sm text-body-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link className={link} href={l.href}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
