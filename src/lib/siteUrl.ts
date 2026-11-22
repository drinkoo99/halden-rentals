/**
 * The public base URL (canonical links, sitemap, robots, social previews), without a trailing slash.
 *
 * - `NEXT_PUBLIC_SITE_URL` when set (must be an absolute http(s) URL);
 * - a Vercel PREVIEW deployment falls back to its own deployment URL;
 * - a Vercel PRODUCTION deployment must set it explicitly: the localhost fallback is never used there;
 * - everywhere else (local development, CI) it falls back to http://localhost:3000.
 */
export class SiteUrlError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SiteUrlError";
  }
}

export function resolveSiteUrl(env: Record<string, string | undefined> = process.env): string {
  const explicit = env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    let url: URL;
    try {
      url = new URL(explicit);
    } catch {
      throw new SiteUrlError("NEXT_PUBLIC_SITE_URL must be an absolute URL, e.g. https://halden.example");
    }
    if (url.protocol !== "https:" && url.protocol !== "http:") throw new SiteUrlError("NEXT_PUBLIC_SITE_URL must use http or https");
    return explicit.replace(/\/+$/, "");
  }
  if (env.VERCEL_ENV === "production")
    throw new SiteUrlError("NEXT_PUBLIC_SITE_URL is required for production deployments (Vercel → Settings → Environment Variables → Production).");
  if (env.VERCEL_ENV === "preview" && env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  return "http://localhost:3000";
}
