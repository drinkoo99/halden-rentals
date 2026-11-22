import type { Metadata } from "next";
import { Suspense } from "react";
import { SignInLockoutScreen } from "@/components/auth/SignInLockoutScreen";

export const metadata: Metadata = { title: "Sign in — Patron Circle", robots: { index: false } };

/** Stitch "Sign In: Error States & Security Lockout", shown after too many failed sign-ins (reads ?retry=). */
export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" role="status" aria-label="Loading" />}>
      <SignInLockoutScreen />
    </Suspense>
  );
}
