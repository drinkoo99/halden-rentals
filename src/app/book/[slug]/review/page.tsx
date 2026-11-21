import type { Metadata } from "next";
import { ReviewStep } from "@/components/booking/ReviewStep";
import { MobileReviewStep } from "@/components/booking/mobile/MobileReviewStep";

/** Client-only booking state (sessionStorage): opted out of instant-navigation validation, like the layout. */
export const instant = false;

export const metadata: Metadata = { title: "Reservation · Review", robots: { index: false } };

/** Phones get the Stitch mobile booking screen; tablets and desktops the desktop step (Stitch screens 20–24). */
export default function Page() {
  return (
    <>
      <MobileReviewStep />
      <div className="hidden md:block">
        <ReviewStep />
      </div>
    </>
  );
}
