/**
 * Demo reservation state for the patron account screens (no backend yet).
 * The Stitch account screens are designed around one reservation, HLD-0612-4821; cancelling it is
 * remembered in localStorage so the detail page shows the cancelled design afterwards.
 */
export const DEMO_REFERENCE = "HLD-0612-4821";

const key = (ref: string) => `halden:reservation:${ref}:cancelled`;

export function isCancelled(ref: string = DEMO_REFERENCE) {
  try {
    return window.localStorage.getItem(key(ref)) === "1";
  } catch {
    return false;
  }
}

export function markCancelled(ref: string = DEMO_REFERENCE) {
  try {
    window.localStorage.setItem(key(ref), "1");
  } catch {
    /* storage unavailable: the confirmation screen still shows */
  }
}

export function restoreReservation(ref: string = DEMO_REFERENCE) {
  try {
    window.localStorage.removeItem(key(ref));
  } catch {
    /* ignore */
  }
}
