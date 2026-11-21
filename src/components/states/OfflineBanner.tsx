"use client";

import { useSyncExternalStore } from "react";

const subscribe = (cb: () => void) => {
  window.addEventListener("online", cb);
  window.addEventListener("offline", cb);
  return () => {
    window.removeEventListener("online", cb);
    window.removeEventListener("offline", cb);
  };
};

/**
 * Offline banner from the Stitch states sheet (S8): amber hairline bar pinned to the bottom while the
 * browser reports no connection. Disappears by itself when the connection returns.
 */
export function OfflineBanner() {
  const online = useSyncExternalStore(subscribe, () => navigator.onLine, () => true);
  if (online) return null;
  return (
    <div role="status" className="fixed bottom-4 inset-x-4 md:left-auto md:right-6 md:max-w-lg z-80 bg-amber-soft border-l-4 border-amber border border-outline-variant p-4 flex items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <span className="mt-1 w-2.5 h-2.5 rounded-full bg-amber animate-pulse shrink-0" aria-hidden />
        <div className="flex flex-col">
          <span className="font-label-mono text-label-mono font-bold text-amber uppercase tracking-wider">You are offline</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">Pages you have opened stay available. Your booking draft is kept in this browser.</span>
        </div>
      </div>
      <button
        className="font-label-mono text-[11px] uppercase tracking-wider px-3 py-1 bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-container shrink-0"
        onClick={() => window.location.reload()}
        type="button"
      >
        Retry
      </button>
    </div>
  );
}
