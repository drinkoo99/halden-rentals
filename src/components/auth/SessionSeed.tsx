"use client";

import { useLayoutEffect } from "react";
import { setSessionUser, type SessionUser } from "@/lib/session";

/** Hands the user a protected layout verified on the server to the client session store. */
export function SessionSeed({ user }: { user: SessionUser }) {
  useLayoutEffect(() => setSessionUser(user), [user]);
  return null;
}
