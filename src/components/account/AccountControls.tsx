"use client";

import { useState } from "react";
import { downloadIcs, reservationIcs } from "@/lib/ics";
import { DEMO_REFERENCE } from "@/lib/reservations";

/** "Add to calendar →" on the patron overview: downloads an .ics for the demo reservation HLD-0612-4821. */
export function AddToCalendarButton({ className }: { className?: string }) {
  const [added, setAdded] = useState(false);
  return (
    <button
      className={className}
      onClick={() => {
        downloadIcs(
          `${DEMO_REFERENCE}.ics`,
          reservationIcs({
            ref: DEMO_REFERENCE,
            title: "HALDEN handover — Range Rover Autobiography",
            start: "2025-06-12T10:00",
            end: "2025-06-15T10:00",
            location: "Munich Airport (MUC), Terminal 2",
            description: `Reservation ${DEMO_REFERENCE}.`,
          }),
        );
        setAdded(true);
      }}
      type="button"
    >
      {added ? "Added to calendar ✓" : "Add to calendar →"}
    </button>
  );
}

/** Saved-car heart from the Stitch overview: filled when saved, outline when removed. */
export function SavedHeart({ className, name }: { className?: string; name: string }) {
  const [saved, setSaved] = useState(true);
  return (
    <button
      aria-label={saved ? `Remove ${name} from saved cars` : `Save ${name}`}
      aria-pressed={saved}
      className={className}
      onClick={() => setSaved((s) => !s)}
      type="button"
    >
      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: saved ? "'FILL' 1" : "'FILL' 0" }} aria-hidden>
        favorite
      </span>
    </button>
  );
}
