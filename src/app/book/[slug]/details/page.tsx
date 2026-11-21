import type { Metadata } from "next";
import { DetailsStep } from "@/components/booking/DetailsStep";
import { MobileDetailsStep } from "@/components/booking/mobile/MobileDetailsStep";

/** Client-only booking state (sessionStorage): opted out of instant-navigation validation, like the layout. */
export const instant = false;

export const metadata: Metadata = { title: "Reservation · Driver details", robots: { index: false } };

/** Phones get the Stitch mobile booking screen; tablets and desktops the desktop step (Stitch screens 20–24). */
export default function Page() {
  return (
    <>
      <MobileDetailsStep />
      <div className="hidden md:block">
        <DetailsStep />
      </div>
    </>
  );
}
