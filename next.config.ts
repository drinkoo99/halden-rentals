import type { NextConfig } from "next";
import { securityHeaders } from "./src/lib/securityHeaders";

const nextConfig: NextConfig = {
  cacheComponents: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders({ dev: process.env.NODE_ENV === "development" }) }];
  },
  images: {
    // All photography is local (public/images, see src/data/media.ts).
    // AVIF first, WebP fallback. 90 is used for full-bleed and gallery images, 75 for the rest.
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    // Include 2560/3840 so large and retina screens receive the biggest variant available.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
