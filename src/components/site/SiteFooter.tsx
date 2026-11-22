import Link from "next/link";
import { FooterColumn } from "./FooterColumn";
import { FooterHubs } from "./FooterHubs";

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

/**
 * Shared footer for the round-2 pages, consolidated from the Stitch footers (dark room, four columns).
 * Every link goes somewhere real; hub names come from the catalogue (FooterHubs).
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
          <FooterHubs />
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
