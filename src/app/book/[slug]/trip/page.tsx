import type { Metadata } from "next";
import { TripStep } from "@/components/booking/TripStep";
import { MobileTripStep } from "@/components/booking/mobile/MobileTripStep";

/** Client-only booking state (sessionStorage): opted out of instant-navigation validation, like the layout. */
export const instant = false;

export const metadata: Metadata = { title: "Reservation · Trip", robots: { index: false } };

/** Phones get the Stitch mobile booking screen; tablets and desktops the desktop step (Stitch screens 20–24). */
export default function Page() {
  return (
    <>
      <MobileTripStep />
      <div className="hidden md:block">
        <TripStep />
      </div>
    </>
  );
}
