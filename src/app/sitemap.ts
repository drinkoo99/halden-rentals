import type { MetadataRoute } from "next";
import { vehicles } from "@/data/vehicles";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/fleet`, changeFrequency: "daily", priority: 0.9 },
    ...vehicles.map((v) => ({ url: `${SITE}/fleet/${v.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}
