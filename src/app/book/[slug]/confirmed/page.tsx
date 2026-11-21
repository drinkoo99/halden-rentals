import type { Metadata } from "next";
import { ConfirmedStep } from "@/components/booking/ConfirmedStep";
import { MobileConfirmedStep } from "@/components/booking/mobile/MobileConfirmedStep";

/** Client-only booking state (sessionStorage): opted out of instant-navigation validation, like the layout. */
export const instant = false;

export const metadata: Metadata = { title: "Reservation · Confirmed", robots: { index: false } };

/** Phones get the Stitch mobile booking screen; tablets and desktops the desktop step (Stitch screens 20–24). */
export default function Page() {
  return (
    <>
      <MobileConfirmedStep />
      <div className="hidden md:block">
        <ConfirmedStep />
      </div>
    </>
  );
}
