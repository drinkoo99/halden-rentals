/**
 * Booking lifecycle (M7). Pure and client-safe.
 *
 *   held ──confirm──▶ confirmed ──check-out──▶ checked_out ──check-in──▶ completed
 *    │                   │
 *    ├─(hold lapses)─▶ expired
 *    └──cancel──▶ cancelled ◀──cancel──┘
 *
 * - held: the car is reserved for HOLD minutes with a fixed price; nothing is charged (payments: M10).
 * - confirmed: the reservation stands; pay at handover until M10.
 * - checked_out: the car is with the customer (fleet unit status `rented`).
 * - completed: the car was returned (unit back in service at the return hub).
 * - cancelled / expired: terminal; the car is released.
 */
export const BOOKING_STATUSES = ["held", "confirmed", "checked_out", "completed", "cancelled", "expired"] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export const BOOKING_TRANSITIONS: Record<BookingStatus, readonly BookingStatus[]> = {
  held: ["confirmed", "cancelled", "expired"],
  confirmed: ["checked_out", "cancelled"],
  checked_out: ["completed"],
  completed: [],
  cancelled: [],
  expired: [],
};
export const canMove = (from: BookingStatus, to: BookingStatus) => BOOKING_TRANSITIONS[from].includes(to);

/** Statuses that occupy a car (a held booking only until its hold expires). */
export const BLOCKING_STATUSES = ["held", "confirmed", "checked_out"] as const satisfies readonly BookingStatus[];

export const STATUS_LABELS: Record<BookingStatus, string> = {
  held: "On hold",
  confirmed: "Confirmed",
  checked_out: "On rent",
  completed: "Completed",
  cancelled: "Cancelled",
  expired: "Hold expired",
};
