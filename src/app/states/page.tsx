import type { Metadata } from "next";
import { SystemStatesSheet } from "@/components/states/SystemStatesSheet";

export const metadata: Metadata = { title: "System states & dialogs", robots: { index: false } };

/** Stitch "System States & Dialogs Sheet (S8)": reference board for loading, empty, error and dialog states. */
export default function Page() {
  return <SystemStatesSheet />;
}
