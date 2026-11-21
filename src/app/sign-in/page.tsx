import type { Metadata } from "next";
import { Suspense } from "react";
import { SignInScreen } from "@/components/auth/SignInScreen";

export const metadata: Metadata = {
  title: "Sign in — Patron Circle",
  description: "Access your HALDEN patron reservations, itineraries and saved exhibits.",
  robots: { index: false },
};

/** Stitch screen 31. Reads ?next= (return target), so it renders inside Suspense. */
export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" aria-busy="true" />}>
      <SignInScreen />
    </Suspense>
  );
}
