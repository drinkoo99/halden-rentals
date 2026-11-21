import Link from "next/link";
import { LEGAL_LINKS, SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export type LegalSection = { id: string; title: string; body: React.ReactNode };

/**
 * Long-form legal page in the HALDEN editorial system (Bodoni headline, mono kicker, hairline-ruled
 * numbered sections, a sticky index on desktop). Built from existing tokens; no Stitch screen exists.
 * Every page carries a visible notice that the text is placeholder content awaiting legal review.
 */
export function LegalPage({
  kicker,
  title,
  intro,
  updated,
  current,
  sections,
}: {
  kicker: string;
  title: string;
  intro: string;
  updated: string;
  current: string;
  sections: LegalSection[];
}) {
  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md antialiased min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 w-full pt-20">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin py-space-xl">
          <div className="flex flex-col gap-space-sm pb-space-lg border-b border-outline-variant">
            <span className="font-label-mono text-label-mono uppercase tracking-[0.18em] text-secondary">{kicker}</span>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-display md:text-display text-on-surface">{title}</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">{intro}</p>
            <span className="font-label-mono text-label-mono uppercase text-outline">Last updated {updated}</span>
          </div>

          <div role="note" className="mt-space-lg bg-amber-soft border-l-2 border-amber p-space-md flex items-start gap-space-sm max-w-3xl">
            <span className="material-symbols-outlined text-amber text-[20px] shrink-0" aria-hidden>
              gavel
            </span>
            <div className="flex flex-col gap-1">
              <span className="font-label-mono text-label-mono uppercase tracking-wider text-on-surface font-bold">Placeholder legal text</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                HALDEN is a concept prototype. This page shows the intended structure only. It is not legal advice and has not been
                reviewed by a lawyer; it must be replaced with reviewed text before any real launch. Bracketed items are placeholders.
              </p>
            </div>
          </div>

          <div className="mt-space-xl grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
            <nav aria-label="On this page" className="lg:col-span-3 lg:sticky lg:top-28 self-start flex flex-col border-t border-outline-variant">
              {sections.map((s, i) => (
                <a
                  key={s.id}
                  className="py-space-sm border-b border-outline-variant font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-on-surface transition-colors"
                  href={`#${s.id}`}
                >
                  {String(i + 1).padStart(2, "0")} {"//"} {s.title}
                </a>
              ))}
              <div className="pt-space-md flex flex-col gap-space-xs">
                {LEGAL_LINKS.filter((l) => l.href !== current).map((l) => (
                  <Link key={l.href} className="font-action text-action uppercase text-primary hover:text-on-surface transition-colors" href={l.href}>
                    {l.label} →
                  </Link>
                ))}
              </div>
            </nav>
            <div className="lg:col-span-9 max-w-3xl flex flex-col">
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-28 py-space-lg border-t border-outline-variant first:border-t-0 first:pt-0">
                  <span className="font-label-mono text-label-mono uppercase tracking-[0.18em] text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface mt-space-xs mb-space-sm">{s.title}</h2>
                  <div className="flex flex-col gap-space-sm font-body-md text-body-md text-on-surface-variant [&_strong]:text-on-surface [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1">
                    {s.body}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
