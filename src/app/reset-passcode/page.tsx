import type { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasscodeScreen } from "@/components/auth/ResetPasscodeScreen";

export const metadata: Metadata = { title: "Reset passcode — Patron Circle", robots: { index: false } };

/** Stitch "Reset Passcode & Verification (Desktop)": new passcode and email verification. */
export default function Page() {
  // reads ?token= from the reset email, so it renders inside Suspense
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" role="status" aria-label="Loading" />}>
      <ResetPasscodeScreen />
    </Suspense>
  );
}
