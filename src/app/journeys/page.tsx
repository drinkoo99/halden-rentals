import type { Metadata } from "next";
import { publicMeta } from "@/lib/seo";
import { JourneysIndexMobile } from "@/components/content/JourneysIndexMobile";
import { JourneysIndexDesktop } from "@/components/content/JourneysIndexDesktop";

export const metadata: Metadata = publicMeta({ title: "Curated journeys", description: "Architectural driving routes across Switzerland, Italy, France and Austria.", path: "/journeys" });

/** Stitch "Curated Journeys Index" (desktop + mobile). */
export default function Page() {
  return (
    <>
      <JourneysIndexMobile />
      <JourneysIndexDesktop />
    </>
  );
}
