import Link from "next/link";
import { StaffDemoBanner } from "./StaffDemoBanner";

/**
 * Wraps the desktop staff-console screens (Stitch designed them for laptop widths only).
 * From `xl` up nothing changes. Below that the screen keeps its 1280px desktop layout inside a
 * sideways-scrolling frame, and a note points phone/tablet staff to the curbside console, which
 * Stitch designed for handheld use. The transform makes the frame the containing block for the
 * screens' fixed sidebar and header, so they scroll with the frame instead of floating over it.
 */
export function StaffConsoleFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <aside aria-label="Desktop console notice" className="xl:hidden sticky top-0 left-0 z-70 bg-on-tertiary-fixed text-inverse-on-surface border-b border-tertiary px-4 py-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="font-body-sm text-body-sm">
          <span className="font-label-mono text-label-mono uppercase tracking-wider text-primary-fixed mr-2">Desktop console</span>
          Built for laptop screens. Scroll sideways to see all of it.
        </p>
        <Link
          className="font-label-mono text-label-mono uppercase tracking-wider underline underline-offset-4 hover:text-primary-fixed whitespace-nowrap"
          href="/staff/curbside"
        >
          On a phone? Open the curbside console →
        </Link>
      </aside>
      <div className="max-xl:overflow-x-auto">
        <div className="max-xl:w-[1280px] max-xl:relative max-xl:[transform:translateZ(0)]">{children}</div>
      </div>
      <StaffDemoBanner />
    </>
  );
}
