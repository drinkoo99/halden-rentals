import type { MetadataRoute } from "next";
import { getSiteCatalogue } from "@/server/catalogue/service";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { vehicles } = await getSiteCatalogue();
  return [
    { url: `${SITE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/fleet`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE}/journeys`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/journeys/high-alpine-transversal`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/about`, changeFrequency: "monthly", priority: 0.6 },
    ...["terms", "privacy", "imprint"].map((p) => ({ url: `${SITE}/${p}`, changeFrequency: "yearly" as const, priority: 0.2 })),
    ...vehicles.map((v) => ({ url: `${SITE}/fleet/${v.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}
