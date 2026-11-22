import { Suspense } from "react";
import { AuthGate } from "@/server/auth/gate";

/** Staff console: staff and admin roles only, enforced on the server for every request. */
export default function StaffLayout({ children }: LayoutProps<"/staff">) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" role="status" aria-label="Loading the staff console" />}>
      <AuthGate area="/staff" roles={["staff", "admin"]}>
        {children}
      </AuthGate>
    </Suspense>
  );
}
