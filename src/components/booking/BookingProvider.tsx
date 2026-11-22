"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useCatalogue } from "@/components/catalogue/CatalogueProvider";
import { extraCost, type ExtraId } from "@/data/extras";
import type { Location } from "@/data/locations";
import type { Vehicle } from "@/data/vehicles";
import type { DriverDetails } from "@/lib/booking/driverSchema";
import { findLocation } from "@/lib/catalogue";
import { readItinerary, rentalDays } from "@/lib/itinerary";
import { quote, type Quote } from "@/lib/pricing";
import { useMounted } from "@/lib/useMounted";

export type Confirmation = {
  ref: string;
  issuedAt: string;
  total: number;
  extrasCount: number;
};

export type BookingState = {
  loc: string;
  returnSame: boolean;
  returnLoc: string;
  from: string;
  to: string;
  extras: Partial<Record<ExtraId, number>>;
  mode: "guest" | "signin";
  driver: DriverDetails | null;
  agreed: boolean;
  confirmation: Confirmation | null;
};

type Ctx = {
  vehicle: Vehicle;
  state: BookingState;
  update: (patch: Partial<BookingState>) => void;
  reset: () => void;
  pickup: Location;
  dropoff: Location;
  days: number;
  quote: Quote;
};

const BookingContext = createContext<Ctx | null>(null);
const storageKey = (slug: string) => `halden:booking:${slug}`;

function load(slug: string): BookingState | null {
  try {
    const raw = window.sessionStorage.getItem(storageKey(slug));
    return raw ? (JSON.parse(raw) as BookingState) : null;
  } catch {
    return null;
  }
}

/**
 * Booking state for one vehicle across the six booking steps (Stitch screens 20–24).
 * Kept in sessionStorage so a refresh or a step back never loses progress; nothing is sent to a server.
 * Rendered inside a Suspense boundary (it reads search params), so it only runs on the client.
 */
export function BookingProvider({
  vehicle,
  fallback,
  children,
}: {
  vehicle: Vehicle;
  fallback: React.ReactNode;
  children: React.ReactNode;
}) {
  // Session storage only exists in the browser: render the stateful tree after mount so the
  // server HTML (fallback) and the first client render always agree.
  const mounted = useMounted();
  if (!mounted) return <>{fallback}</>;
  return <ProviderInner vehicle={vehicle}>{children}</ProviderInner>;
}

function ProviderInner({ vehicle, children }: { vehicle: Vehicle; children: React.ReactNode }) {
  const { extras, locations } = useCatalogue();
  const params = useSearchParams();
  const pathname = usePathname();

  const [state, setState] = useState<BookingState>(() => {
    let stored = load(vehicle.slug);
    // A finished booking only lives on the confirmation page; anywhere else starts a fresh reservation
    if (stored?.confirmation && !pathname.endsWith("/confirmed")) stored = null;
    const hasTripInUrl = params.has("from") && params.has("to");
    const p = new URLSearchParams(params);
    if (!p.get("loc")) p.set("loc", stored?.loc ?? vehicle.homeLocation);
    const it = readItinerary(p, locations);
    const base: BookingState = stored ?? {
      loc: it.location.id,
      returnSame: true,
      returnLoc: it.location.id,
      from: it.from,
      to: it.to,
      extras: {},
      mode: "guest",
      driver: null,
      agreed: false,
      confirmation: null,
    };
    // A trip chosen on the fleet/detail page wins over an older stored draft
    return hasTripInUrl && !base.confirmation
      ? { ...base, loc: it.location.id, returnLoc: base.returnSame ? it.location.id : base.returnLoc, from: it.from, to: it.to }
      : base;
  });

  useEffect(() => {
    try {
      window.sessionStorage.setItem(storageKey(vehicle.slug), JSON.stringify(state));
    } catch {
      /* storage unavailable — state still lives in memory */
    }
  }, [state, vehicle.slug]);

  const update = useCallback((patch: Partial<BookingState>) => setState((s) => ({ ...s, ...patch })), []);
  const reset = useCallback(() => {
    try {
      window.sessionStorage.removeItem(storageKey(vehicle.slug));
    } catch {
      /* ignore */
    }
  }, [vehicle.slug]);

  const value = useMemo<Ctx>(() => {
    const days = rentalDays(state.from, state.to);
    const lines = extras
      .filter((e) => !e.included && (state.extras[e.id] ?? 0) > 0)
      .map((e) => ({ label: e.title, amount: extraCost(e, state.extras[e.id] ?? 0, days) }));
    return {
      vehicle,
      state,
      update,
      reset,
      pickup: findLocation(locations, state.loc),
      dropoff: findLocation(locations, state.returnSame ? state.loc : state.returnLoc),
      days,
      quote: quote(vehicle.pricePerDay, days, lines),
    };
  }, [state, update, reset, vehicle, extras, locations]);

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking(): Ctx {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}

/** Reference like "HLD-2406-8831": issue month/day + 4 random digits. */
export function newReference(d = new Date()): string {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  return `HLD-${mm}${dd}-${rand}`;
}
