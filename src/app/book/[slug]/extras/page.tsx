import type { Metadata } from "next";
import { ExtrasStep } from "@/components/booking/ExtrasStep";
import { MobileExtrasStep } from "@/components/booking/mobile/MobileExtrasStep";

/** Client-only booking state (sessionStorage): opted out of instant-navigation validation, like the layout. */
export const instant = false;

export const metadata: Metadata = { title: "Reservation · Extras", robots: { index: false } };

/** Phones get the Stitch mobile booking screen; tablets and desktops the desktop step (Stitch screens 20–24). */
export default function Page() {
  return (
    <>
      <MobileExtrasStep />
      <div className="hidden md:block">
        <ExtrasStep />
      </div>
    </>
  );
}
