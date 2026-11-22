"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/** POST a staff/admin action as same-origin JSON; on success refresh the server-rendered page. */
export function useStaffAction() {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  async function run(key: string, url: string, body: Record<string, unknown> = {}): Promise<boolean> {
    setBusy(key);
    setError(null);
    const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, credentials: "same-origin", body: JSON.stringify(body) }).catch(() => null);
    setBusy(null);
    if (!res?.ok) {
      const json = (await res?.json().catch(() => null)) as { error?: { message?: string; details?: unknown } } | null;
      const details = Array.isArray(json?.error?.details) ? (json.error.details as { path?: string; message?: string }[]).map((d) => [d.path, d.message].filter(Boolean).join(": ")).join("; ") : "";
      setError([json?.error?.message ?? "The action failed. Please try again.", details].filter(Boolean).join(" — "));
      return false;
    }
    router.refresh();
    return true;
  }
  return { busy, error, run };
}
