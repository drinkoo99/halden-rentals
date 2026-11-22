"use client";

import { useCatalogue } from "@/components/catalogue/CatalogueProvider";
import { FooterColumn } from "./FooterColumn";

/** The footer's "Hubs" column: the catalogue's active hubs. */
export function FooterHubs() {
  const { locations } = useCatalogue();
  return <FooterColumn title="Hubs" links={locations.map((l) => ({ label: l.label, href: "/about#hubs" }))} />;
}
