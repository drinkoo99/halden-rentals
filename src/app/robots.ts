import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/lib/siteUrl";

export default function robots(): MetadataRoute.Robots {
  const SITE = resolveSiteUrl();
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/book/", "/account", "/staff", "/states", "/sign-in", "/request-access", "/forgot-passcode", "/reset-passcode"] },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
