"use client";

import "./globals.css";

/**
 * Last-resort error boundary (the root layout itself failed), so it renders its own <html>/<body>
 * with system fonts. Same message and structure as the S8 "went dark" card, without images.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="bg-surface text-on-surface min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-xl bg-surface-container-lowest border border-outline-variant p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-outline-variant pb-2 font-mono text-xs uppercase tracking-wider">
            <span className="text-crimson">PROTOCOL 500 // UNEXPECTED ERROR</span>
            <span className="text-outline">{error.digest ? `REF ${error.digest}` : "REF —"}</span>
          </div>
          <h1 className="font-serif text-3xl">Something in the gallery went dark.</h1>
          <p className="text-on-surface-variant">HALDEN could not load. Your booking draft and saved cars are kept in this browser, so trying again is safe.</p>
          <button className="w-full py-3 px-4 bg-primary-container hover:bg-primary text-on-primary font-mono text-xs uppercase tracking-wider" onClick={reset} type="button">
            Try again →
          </button>
        </div>
      </body>
    </html>
  );
}
