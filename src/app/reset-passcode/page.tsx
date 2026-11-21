import type { Metadata } from "next";
import { ResetPasscodeScreen } from "@/components/auth/ResetPasscodeScreen";

export const metadata: Metadata = { title: "Reset passcode — Patron Circle", robots: { index: false } };

/** Stitch "Reset Passcode & Verification (Desktop)": new passcode and email verification. */
export default function Page() {
  return <ResetPasscodeScreen />;
}
