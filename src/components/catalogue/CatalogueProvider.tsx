"use client";

import { createContext, useContext } from "react";
import type { SiteCatalogue } from "@/lib/catalogue";

/**
 * The catalogue (vehicles, hubs, extras) loaded on the server by the root layout from MongoDB (see
 * src/server/catalogue/service.ts), made available to Client Components.
 */
const CatalogueContext = createContext<SiteCatalogue | null>(null);

export function CatalogueProvider({ catalogue, children }: { catalogue: SiteCatalogue; children: React.ReactNode }) {
  return <CatalogueContext.Provider value={catalogue}>{children}</CatalogueContext.Provider>;
}

export function useCatalogue(): SiteCatalogue {
  const catalogue = useContext(CatalogueContext);
  if (!catalogue) throw new Error("useCatalogue() must be used inside <CatalogueProvider>");
  return catalogue;
}
