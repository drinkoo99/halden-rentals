import { HomeDesktop } from "@/components/home/HomeDesktop";
import { HomeMobile } from "@/components/home/HomeMobile";

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
