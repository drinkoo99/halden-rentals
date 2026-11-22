import { Suspense } from "react";
import { AuthGate } from "@/server/auth/gate";

/** Patron account area: signed-in users only (checked on the server for every request). */
export default function AccountLayout({ children }: LayoutProps<"/account">) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" role="status" aria-label="Loading your account" />}>
      <AuthGate area="/account">{children}</AuthGate>
    </Suspense>
  );
}
