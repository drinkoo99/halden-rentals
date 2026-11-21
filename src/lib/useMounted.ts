"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * True only after hydration. Used for values that depend on the visitor's clock
 * (default rental dates), so server-prerendered HTML and the first client render match.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
