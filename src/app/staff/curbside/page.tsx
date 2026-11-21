import type { Metadata } from "next";
import { CurbsideToday } from "@/components/staff/curbside/CurbsideToday";

export const metadata: Metadata = { title: "Curbside — Today — HALDEN Operations", robots: { index: false } };

/** Stitch "Curbside Staff: Today". Staff console with demo data until the backend phase. */
export default function Page() {
  return <CurbsideToday />;
}
