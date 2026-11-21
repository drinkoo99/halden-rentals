import type { Metadata } from "next";
import { CurbsideHandover } from "@/components/staff/curbside/CurbsideHandover";

export const metadata: Metadata = { title: "Curbside — Handover — HALDEN Operations", robots: { index: false } };

/** Stitch "Curbside Staff: Handover Checklist". Staff console with demo data until the backend phase. */
export default function Page() {
  return <CurbsideHandover />;
}
