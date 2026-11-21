"use client";

import { useCallback, useEffect, useState } from "react";

/** Seconds-remaining countdown (e.g. "Resend link in 0:45"). `start()` restarts it; 0 means ready. */
export function useCountdown(seconds: number) {
  const [left, setLeft] = useState(0);
  useEffect(() => {
    if (left <= 0) return;
    const t = window.setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [left]);
  const start = useCallback(() => setLeft(seconds), [seconds]);
  const label = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`;
  return { left, label, start, progress: left / seconds };
}

/** "clara.bergmann@atelier-v.ch" -> "c••••••••••n@atelier-v.ch" */
export function maskEmail(email: string) {
  const [user, domain] = email.split("@");
  if (!domain || user.length < 2) return email;
  return `${user[0]}${"•".repeat(Math.max(3, user.length - 2))}${user[user.length - 1]}@${domain}`;
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
