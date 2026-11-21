import type { Metadata } from "next";
import { JourneyDetailMobile } from "@/components/content/JourneyDetailMobile";
import { JourneyDetailDesktop } from "@/components/content/JourneyDetailDesktop";

export const metadata: Metadata = { title: "The High Alpine Transversal", description: "Three days from Zurich over the Furka, Grimsel and Susten passes to Lucerne." };

/** Stitch "Journey Detail: The High Alpine Transversal" (desktop + mobile). */
export default function Page() {
  return (
    <>
      <JourneyDetailMobile />
      <JourneyDetailDesktop />
    </>
  );
}
