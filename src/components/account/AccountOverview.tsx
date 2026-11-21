"use client";

import { useSyncExternalStore } from "react";
import { AccountOverviewDesktop } from "@/components/account/AccountOverviewDesktop";
import { AccountOverviewEmptyDesktop } from "@/components/account/AccountOverviewEmptyDesktop";
import { AccountOverviewMobile } from "@/components/account/AccountOverviewMobile";
import { isCancelled } from "@/lib/reservations";

const subscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};

/**
 * Patron overview. Shows the upcoming reservation; once it has been cancelled there is nothing
 * upcoming, so the desktop switches to the Stitch empty state ("Account Overview (Empty State)").
 */
export function AccountOverview() {
  const empty = useSyncExternalStore(subscribe, () => isCancelled(), () => false);
  return (
    <>
      <AccountOverviewMobile />
      {empty ? <AccountOverviewEmptyDesktop /> : <AccountOverviewDesktop />}
    </>
  );
}
