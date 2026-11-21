import type { Metadata } from "next";
import { SignInLockoutScreen } from "@/components/auth/SignInLockoutScreen";

export const metadata: Metadata = { title: "Sign in — Patron Circle", robots: { index: false } };

/** Stitch "Sign In: Error States & Security Lockout", shown after a failed sign-in. */
export default function Page() {
  return <SignInLockoutScreen />;
}
