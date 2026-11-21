import type { Metadata } from "next";
import { publicMeta } from "@/lib/seo";
import { JourneyDetailMobile } from "@/components/content/JourneyDetailMobile";
import { JourneyDetailDesktop } from "@/components/content/JourneyDetailDesktop";

export const metadata: Metadata = publicMeta({ title: "The High Alpine Transversal", description: "Three days from Zurich over the Furka, Grimsel and Susten passes to Lucerne.", path: "/journeys/high-alpine-transversal", image: { url: "/images/journey-high-alpine-hero.jpg", alt: "The High Alpine Transversal mountain pass road in the Swiss Alps" } });

/** Stitch "Journey Detail: The High Alpine Transversal" (desktop + mobile). */
export default function Page() {
  return (
    <>
      <JourneyDetailMobile />
      <JourneyDetailDesktop />
    </>
  );
}
