import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/book/", "/account", "/staff", "/states", "/sign-in", "/request-access", "/forgot-passcode", "/reset-passcode"] },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
