"use client";

import { useEffect, useState } from "react";
import type { Quote } from "@/lib/pricing";
import type { BookingState } from "./BookingProvider";

/**
 * The booking flow's connection to the booking engine (M7). The browser never decides price or
 * availability: it asks POST /api/v1/quote, then reserves with POST /api/v1/bookings (a hold with the
 * server's price) and confirms it. Trip times are sent as hub-local wall-clock times.
 */

type ServerPrice = {
  currency: string;
  dailyRateCents: number;
  days: number;
  rentalCents: number;
  extras: { code: string; label: string; amountCents: number; included: boolean }[];
  fees: { code: string; label: string; amountCents: number }[];
  subtotalCents: number;
  vatCents: number;
  totalCents: number;
};
type ApiError = { error?: { code?: string; message?: string; details?: unknown } };

export const tripOf = (slug: string, s: BookingState) => ({
  model: slug,
  pickup: s.loc,
  return: s.returnSame ? s.loc : s.returnLoc,
  from: s.from,
  to: s.to,
  extras: Object.fromEntries(Object.entries(s.extras).filter(([, q]) => (q ?? 0) > 0)) as Record<string, number>,
});

/** Server price in the shape the booking screens render (euros). */
export function toQuote(p: ServerPrice): Quote {
  const lines = [...p.extras.filter((e) => !e.included).map((e) => ({ label: e.label, amount: e.amountCents / 100 })), ...p.fees.map((f) => ({ label: f.label, amount: f.amountCents / 100 }))];
  return {
    days: p.days,
    dailyRate: p.dailyRateCents / 100,
    rental: p.rentalCents / 100,
    extras: lines,
    extrasTotal: lines.reduce((s, l) => s + l.amount, 0),
    subtotal: p.subtotalCents / 100,
    vat: p.vatCents / 100,
    total: p.totalCents / 100,
  };
}

async function post<T>(url: string, body: unknown): Promise<{ ok: true; data: T; status: number; meta?: Record<string, unknown> } | { ok: false; status: number; error: ApiError["error"] }> {
  try {
    const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, credentials: "same-origin", body: JSON.stringify(body) });
    const json = (await res.json().catch(() => ({}))) as { data?: T; meta?: Record<string, unknown> } & ApiError;
    return res.ok ? { ok: true, data: json.data as T, status: res.status, meta: json.meta } : { ok: false, status: res.status, error: json.error };
  } catch {
    return { ok: false, status: 0, error: { message: "Network error — check your connection and try again." } };
  }
}

const messageOf = (e: ApiError["error"], fallback: string) => {
  const details = Array.isArray(e?.details) ? (e.details as { message?: string }[]).map((d) => d.message).filter(Boolean).join("; ") : "";
  return [e?.message ?? fallback, details].filter(Boolean).join(" — ");
};

/** Is the car available for this trip? (Trip step: before moving on to extras.) */
export async function checkTrip(slug: string, s: BookingState): Promise<string | null> {
  const res = await post<{ available: boolean }>("/api/v1/quote", tripOf(slug, s));
  if (!res.ok) return messageOf(res.error, "Availability could not be checked. Please try again.");
  return res.data.available ? null : "This car is not available at this hub for these dates. Try other dates, another hub or another car.";
}

/** The authoritative quote for the current trip and extras (review step). */
export function useServerQuote(slug: string, s: BookingState) {
  const [version, setVersion] = useState(0);
  const key = JSON.stringify({ ...tripOf(slug, s), version });
  const [result, setResult] = useState<{ key: string; quote?: Quote; totalCents?: number; available?: boolean; error?: string } | null>(null);
  useEffect(() => {
    let live = true;
    const trip = JSON.parse(key) as ReturnType<typeof tripOf> & { version?: number };
    delete trip.version; // only used to force a refresh
    void post<{ available: boolean; price: ServerPrice }>("/api/v1/quote", trip).then((res) => {
      if (!live) return;
      setResult(
        res.ok
          ? { key, quote: toQuote(res.data.price), totalCents: res.data.price.totalCents, available: res.data.available }
          : { key, error: messageOf(res.error, "The price could not be calculated. Please try again.") },
      );
    });
    return () => {
      live = false;
    };
  }, [key]);
  return { result: result?.key === key ? result : null, refresh: () => setVersion((n) => n + 1) };
}

/** `restart`: start a fresh attempt (new idempotency key, fresh quote) — the price changed or an earlier hold lapsed. */
export type ReserveResult = { ok: true; reference: string; totalCents: number; email: string } | { ok: false; error: string; needsSignIn?: boolean; restart?: boolean };

/** Hold the car at the reviewed price, then confirm the hold. Nothing is charged (payments: M10). */
export async function reserve(slug: string, s: BookingState, idempotencyKey: string, expectedTotalCents: number): Promise<ReserveResult> {
  const { notes, ...driver } = s.driver ?? ({} as NonNullable<BookingState["driver"]>);
  const held = await post<{ reference: string; status: string; price: ServerPrice }>("/api/v1/bookings", {
    ...tripOf(slug, s),
    driver: { ...driver, notes: notes ?? "" },
    idempotencyKey,
    expectedTotalCents,
  });
  if (!held.ok) {
    if (held.status === 401) return { ok: false, needsSignIn: true, error: "Sign in to your HALDEN account to confirm the reservation." };
    const reason = (held.error?.details as { reason?: string } | undefined)?.reason;
    return { ok: false, restart: reason === "price_changed", error: messageOf(held.error, "The reservation could not be created. Please try again.") };
  }
  if (held.data.status === "confirmed") return { ok: true, reference: held.data.reference, totalCents: held.data.price.totalCents, email: "unknown" };
  // a retried request returned an earlier attempt whose hold already lapsed or was cancelled
  if (held.data.status !== "held") return { ok: false, restart: true, error: "Your earlier hold on this car lapsed. Please confirm again." };
  const confirmed = await post<{ reference: string; price: ServerPrice }>(`/api/v1/bookings/${encodeURIComponent(held.data.reference)}/confirm`, {});
  if (!confirmed.ok) {
    const reason = (confirmed.error?.details as { reason?: string } | undefined)?.reason;
    return { ok: false, restart: reason === "hold_expired", error: messageOf(confirmed.error, "The reservation could not be confirmed. Please try again.") };
  }
  return { ok: true, reference: confirmed.data.reference, totalCents: confirmed.data.price.totalCents, email: String(confirmed.meta?.email ?? "unknown") };
}
