import { describe, expect, it } from "vitest";
import { contentSecurityPolicy, securityHeaders } from "./securityHeaders";

const header = (dev: boolean, key: string) => securityHeaders({ dev }).find((h) => h.key === key)?.value;

describe("security headers", () => {
  it("sends the baseline headers in production", () => {
    expect(header(false, "X-Content-Type-Options")).toBe("nosniff");
    expect(header(false, "X-Frame-Options")).toBe("DENY");
    expect(header(false, "Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(header(false, "Permissions-Policy")).toContain("camera=()");
    expect(header(false, "Strict-Transport-Security")).toBe("max-age=63072000; includeSubDomains");
  });

  it("production CSP: no eval, framing refused, only this origin plus Google Fonts", () => {
    const csp = contentSecurityPolicy({ dev: false });
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).not.toContain("unsafe-eval");
    expect(csp).toContain("style-src 'self' 'unsafe-inline' https://fonts.googleapis.com");
    expect(csp).toContain("font-src 'self' https://fonts.gstatic.com");
    expect(csp).toContain("upgrade-insecure-requests");
  });

  it("development relaxes only what the dev server needs, and skips HSTS", () => {
    expect(contentSecurityPolicy({ dev: true })).toContain("'unsafe-eval'");
    expect(contentSecurityPolicy({ dev: true })).toContain("connect-src 'self' ws: wss:");
    expect(header(true, "Strict-Transport-Security")).toBeUndefined();
  });
});
