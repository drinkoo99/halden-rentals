"use client";

import { useSyncExternalStore } from "react";
import { ReservationCancelledDesktop } from "@/components/account/ReservationCancelledDesktop";
import { ReservationDetailDesktop } from "@/components/account/ReservationDetailDesktop";
import { ReservationDetailMobile } from "@/components/account/ReservationDetailMobile";
import { isCancelled } from "@/lib/reservations";

const subscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};

/** Reservation HLD-0612-4821: confirmed design until the patron cancels it, then the cancelled design. */
export function ReservationDetail() {
  const cancelled = useSyncExternalStore(subscribe, () => isCancelled(), () => false);
  return (
    <>
      <ReservationDetailMobile cancelled={cancelled} />
      {cancelled ? <ReservationCancelledDesktop /> : <ReservationDetailDesktop />}
    </>
  );
}
