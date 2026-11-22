import Link from "next/link";
import { euro, statusLabel, STATUS_BADGE, type BookingRow } from "@/lib/bookingDisplay";

/** The patron's reservations as ledger rows (account overview, desktop and mobile). Real bookings only. */
export function AccountBookings({ title, bookings, empty, compact = false }: { title: string; bookings: BookingRow[]; empty: string; compact?: boolean }) {
  return (
    <section className="flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <h2 className="font-label-mono text-label-mono uppercase text-on-surface-variant">{title}</h2>
        <span className="font-label-mono text-label-mono uppercase text-outline">{String(bookings.length).padStart(2, "0")} {bookings.length === 1 ? "RESERVATION" : "RESERVATIONS"}</span>
      </div>
      {bookings.length === 0 ? (
        <div className="py-space-lg border-y border-outline-variant flex items-center justify-between">
          <p className="font-body-md text-body-md text-on-surface-variant">{empty}</p>
          <span className="font-label-mono text-label-mono uppercase text-outline">—</span>
        </div>
      ) : (
        <ul className="divide-y divide-outline-variant border-y border-outline-variant">
          {bookings.map((b) => (
            <li key={b.reference}>
              <Link href={`/account/reservations/${b.reference}`} className={`flex ${compact ? "flex-col gap-2" : "flex-col md:flex-row md:items-center gap-3 md:gap-6"} py-space-md hover:bg-surface-container-low transition-colors px-2`}>
                <span className="font-spec-numeral text-spec-numeral text-primary font-bold tracking-wider w-36 shrink-0">{b.reference}</span>
                <span className="flex-1 min-w-0">
                  <span className="block font-headline-sm text-[17px] text-on-surface">{b.vehicleName}</span>
                  <span className="block font-label-mono text-label-mono text-on-surface-variant uppercase mt-1">
                    {b.pickupHub} · {b.pickupLocal}
                    {b.returnHub !== b.pickupHub ? ` → ${b.returnHub}` : ""}
                  </span>
                </span>
                <span className="flex items-center gap-4 shrink-0">
                  <span className={`inline-flex px-2.5 py-1 font-label-mono text-[10px] uppercase tracking-wider ${STATUS_BADGE[b.status]}`}>{statusLabel(b.status)}</span>
                  <span className="font-spec-numeral text-spec-numeral text-on-surface font-bold">{euro(b.totalCents)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
