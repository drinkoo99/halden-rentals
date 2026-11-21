import type { Metadata } from "next";
import { publicMeta } from "@/lib/seo";
import { HomeDesktop } from "@/components/home/HomeDesktop";
import { HomeMobile } from "@/components/home/HomeMobile";

const home = publicMeta({ title: "HALDEN — The Gallery", description: "A curated fleet of premium cars, ready in Europe’s best cities and airports.", path: "/" });
export const metadata: Metadata = {
  ...home,
  title: { absolute: "HALDEN — The Gallery" },
  openGraph: { ...home.openGraph, title: "HALDEN — The Gallery" },
  twitter: { ...home.twitter, title: "HALDEN — The Gallery" },
};

/**
 * Homepage. Stitch designed separate desktop (screen 04) and mobile (screen 28) compositions,
 * so both are rendered and the breakpoint decides which one is visible.
 */
export default function HomePage() {
  return (
    <>
      <HomeMobile />
      <HomeDesktop />
    </>
  );
}
