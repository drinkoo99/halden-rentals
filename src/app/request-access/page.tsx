import type { Metadata } from "next";
import { RequestAccessMobile } from "@/components/auth/RequestAccessMobile";
import { RequestAccessDesktop } from "@/components/auth/RequestAccessDesktop";

export const metadata: Metadata = { title: "Request access — Patron Circle", description: "Request a HALDEN patron account.", robots: { index: false } };

/** Stitch "Request Access (Desktop)" and "Mobile: Request Access (A)". */
export default function Page() {
  return (
    <>
      <RequestAccessMobile />
      <RequestAccessDesktop />
    </>
  );
}
