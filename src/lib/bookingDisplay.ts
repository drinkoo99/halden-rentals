import { STATUS_LABELS, type BookingStatus } from "@/server/bookings/statuses";

/** Display helpers for bookings (M7). Client-safe: no server imports beyond the pure status table. */

/** "Thu 12 Jun 2030 · 10:00" in the hub's time zone. */
export function hubDateTime(iso: string, timeZone: string): string {
  const d = new Date(iso);
  const date = new Intl.DateTimeFormat("en-GB", { timeZone, weekday: "short", day: "2-digit", month: "short", year: "numeric" }).format(d);
  const time = new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(d);
  return `${date} · ${time}`;
}

export const euro = (cents: number) => `€${(cents / 100).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const statusLabel = (s: BookingStatus) => STATUS_LABELS[s];

/** Badge colours per status, in the site palette. */
export const STATUS_BADGE: Record<BookingStatus, string> = {
  held: "bg-[#F9F5EC] border border-[#C98A2C] text-[#956621]",
  confirmed: "bg-primary text-on-primary",
  checked_out: "bg-tertiary text-inverse-on-surface",
  completed: "bg-surface-container border border-outline-variant text-on-surface-variant",
  cancelled: "bg-surface-container border border-outline-variant text-on-surface-variant line-through",
  expired: "bg-surface-container border border-outline-variant text-outline",
};

/** A booking prepared for display: hub names and local times already resolved on the server. */
export type BookingRow = {
  reference: string;
  status: BookingStatus;
  vehicleName: string;
  image?: string;
  pickupHub: string;
  returnHub: string;
  pickupLocal: string;
  returnLocal: string;
  totalCents: number;
  days: number;
};
