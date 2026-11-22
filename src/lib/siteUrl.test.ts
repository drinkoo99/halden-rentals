import { describe, expect, it } from "vitest";
import { resolveSiteUrl } from "./siteUrl";

describe("resolveSiteUrl", () => {
  it("uses NEXT_PUBLIC_SITE_URL without a trailing slash", () => {
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "https://halden.example/" })).toBe("https://halden.example");
  });

  it("rejects a value that is not an absolute http(s) URL", () => {
    expect(() => resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "halden.example" })).toThrow(/absolute URL/);
    expect(() => resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "ftp://halden.example" })).toThrow(/http or https/);
  });

  it("never falls back to localhost in a production deployment", () => {
    expect(() => resolveSiteUrl({ VERCEL_ENV: "production", VERCEL_URL: "halden-abc.vercel.app" })).toThrow(/required for production/);
  });

  it("uses the deployment URL for previews, localhost elsewhere", () => {
    expect(resolveSiteUrl({ VERCEL_ENV: "preview", VERCEL_URL: "halden-git-x.vercel.app" })).toBe("https://halden-git-x.vercel.app");
    expect(resolveSiteUrl({})).toBe("http://localhost:3000");
  });
});
