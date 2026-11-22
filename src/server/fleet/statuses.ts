/** Fleet operational statuses and allowed transitions (M6). Pure and client-safe (used by the staff UI). */

export const FLEET_STATUSES = ["available", "rented", "maintenance", "inactive"] as const;
export type FleetStatus = (typeof FLEET_STATUSES)[number];

/**
 * Allowed operational status changes. `rented` is entered at check-out and left at return (back to
 * available, or straight into maintenance); a retired (`inactive`) car must be reactivated before renting.
 */
export const STATUS_TRANSITIONS: Record<FleetStatus, readonly FleetStatus[]> = {
  available: ["rented", "maintenance", "inactive"],
  rented: ["available", "maintenance"],
  maintenance: ["available", "inactive"],
  inactive: ["available", "maintenance"],
};
export const canTransition = (from: FleetStatus, to: FleetStatus) => STATUS_TRANSITIONS[from].includes(to);
