"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useCatalogue } from "@/components/catalogue/CatalogueProvider";
import type { Itinerary } from "@/lib/itinerary";

/**
 * Edit pick-up hub and dates. Stitch has an "Edit itinerary" link (fleet 12/26) but no dialog design,
 * so this reuses the homepage search-bar styling (screen 04): ivory panel, hairlines, mono labels.
 */
type EditorProps = {
  itinerary: Itinerary;
  onClose: () => void;
  onApply: (next: { loc: string; from: string; to: string }) => void;
};

export function ItineraryEditor({ open, ...props }: EditorProps & { open: boolean }) {
  // Mounting only while open gives every opening a fresh draft taken from the current itinerary
  return open ? <EditorDialog {...props} /> : null;
}

function EditorDialog({ itinerary, onClose, onApply }: EditorProps) {
  const { locations } = useCatalogue();
  const id = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [loc, setLoc] = useState(itinerary.location.id);
  const [from, setFrom] = useState(itinerary.from);
  const [to, setTo] = useState(itinerary.to);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dialogRef.current?.querySelector<HTMLElement>("select")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function apply(e: React.FormEvent) {
    e.preventDefault();
    if (!from || !to) return setError("Choose pick-up and return times.");
    if (new Date(to) <= new Date(from)) return setError("Return must be after pick-up.");
    onApply({ loc, from, to });
  }

  const label = "font-mono text-[11px] text-text-muted uppercase tracking-wider mb-1 block";
  const field =
    "w-full bg-ivory border border-border-stone rounded-[2px] px-3 py-2.5 font-mono text-sm text-ink focus:outline-none focus:border-forest";

  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center bg-ink/40 p-0 sm:p-6" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        className="w-full sm:max-w-lg bg-ivory border border-border-stone rounded-[2px] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border-stone pb-4 mb-5">
          <h2 id={`${id}-title`} className="font-mono text-xs uppercase tracking-wider font-semibold text-ink">
            Edit itinerary
          </h2>
          <button type="button" onClick={onClose} className="font-mono text-xs text-text-muted hover:text-forest underline">
            Close
          </button>
        </div>
        <form onSubmit={apply} noValidate className="space-y-4">
          <div>
            <label htmlFor={`${id}-loc`} className={label}>
              Pick-up location
            </label>
            <select id={`${id}-loc`} value={loc} onChange={(e) => setLoc(e.target.value)} className={`${field} font-sans font-medium`}>
              {locations.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`${id}-from`} className={label}>
                Pick-up date and time
              </label>
              <input id={`${id}-from`} type="datetime-local" step={1800} value={from} onChange={(e) => setFrom(e.target.value)} className={field} />
            </div>
            <div>
              <label htmlFor={`${id}-to`} className={label}>
                Return date and time
              </label>
              <input
                id={`${id}-to`}
                type="datetime-local"
                step={1800}
                min={from}
                value={to}
                onChange={(e) => setTo(e.target.value)}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-err` : undefined}
                className={field}
              />
            </div>
          </div>
          {error && (
            <p id={`${id}-err`} role="alert" className="font-mono text-[11px] text-error">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full min-h-[52px] bg-forest text-ivory font-sans text-sm font-medium uppercase tracking-wider hover:bg-forest-hover transition-colors rounded-[2px]"
          >
            Apply itinerary
          </button>
        </form>
      </div>
    </div>
  );
}
