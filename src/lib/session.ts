"use client";

import { useSyncExternalStore } from "react";

/**
 * Client-side view of the signed-in user, for navigation and greetings only — never for access control
 * (that is enforced on the server). Loaded once from GET /api/v1/me; protected layouts seed it with the
 * user they already verified, and sign-in / sign-out refresh it.
 */
export type SessionUser = { id: string; name: string; email: string; role: "customer" | "staff" | "admin"; emailVerified: boolean };
type State = { status: "loading" | "signed-in" | "signed-out"; user: SessionUser | null };

let state: State = { status: "loading", user: null };
let inflight: Promise<void> | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function setSessionUser(user: SessionUser | null) {
  state = { status: user ? "signed-in" : "signed-out", user };
  emit();
}

export function refreshSession(): Promise<void> {
  inflight = fetch("/api/v1/me", { cache: "no-store", credentials: "same-origin" })
    .then(async (res) => setSessionUser(res.ok ? ((await res.json()).data as SessionUser) : null))
    .catch(() => setSessionUser(null));
  return inflight;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (state.status === "loading" && !inflight) void refreshSession();
  return () => listeners.delete(listener);
}

const SERVER_STATE: State = { status: "loading", user: null };
export function useSession(): State {
  return useSyncExternalStore(subscribe, () => state, () => SERVER_STATE);
}

