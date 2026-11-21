import type { Metadata } from "next";
import { publicMeta } from "@/lib/seo";
import { AboutMobile } from "@/components/content/AboutMobile";
import { AboutDesktop } from "@/components/content/AboutDesktop";

export const metadata: Metadata = publicMeta({ title: "About — The Standard", description: "A rental house built like a gallery: our principles, the 48-point inspection, hubs and concierge team.", path: "/about" });

/** Stitch "About: The Standard" (desktop + mobile). */
export default function Page() {
  return (
    <>
      <AboutMobile />
      <AboutDesktop />
    </>
  );
}
