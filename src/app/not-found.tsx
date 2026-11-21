import Link from "next/link";

/** 404 — not designed in Stitch; composed from the desktop gallery tokens (screen 04/12). */
export default function NotFound() {
  return (
    <main className="min-h-screen bg-ivory text-ink flex flex-col">
      <header className="w-full border-b border-stone-dim">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 h-20 flex items-center">
          <Link href="/" className="text-xl font-semibold tracking-[0.28em] font-sans text-ink uppercase">
            HALDEN
          </Link>
        </div>
      </header>
      <section className="grow flex items-center">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-sage mb-4">404 / EXHIBIT NOT FOUND</p>
          <h1 className="font-serif text-5xl md:text-6xl font-normal tracking-tight mb-6">This room of the gallery is empty.</h1>
          <p className="font-sans text-base text-muted leading-relaxed max-w-xl mb-10">
            The page you were looking for has moved or never existed. The collection is still on display.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/fleet"
              className="bg-forest text-ivory px-8 py-3.5 rounded-[2px] font-sans text-sm tracking-wider uppercase font-medium hover:bg-forest-hover transition-colors"
            >
              View the collection
            </Link>
            <Link href="/" className="font-mono text-xs uppercase tracking-widest text-ink border-b border-ink/40 pb-0.5 hover:text-forest">
              Back to the gallery →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
