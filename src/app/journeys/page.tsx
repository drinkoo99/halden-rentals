import type { Metadata } from "next";
import { JourneysIndexMobile } from "@/components/content/JourneysIndexMobile";
import { JourneysIndexDesktop } from "@/components/content/JourneysIndexDesktop";

export const metadata: Metadata = { title: "Curated journeys", description: "Architectural driving routes across Switzerland, Italy, France and Austria." };

/** Stitch "Curated Journeys Index" (desktop + mobile). */
export default function Page() {
  return (
    <>
      <JourneysIndexMobile />
      <JourneysIndexDesktop />
    </>
  );
}
