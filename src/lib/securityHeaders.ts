/**
 * Security headers for every response (applied in next.config.ts).
 *
 * The CSP is deliberately compatible with how the app renders: Next.js injects inline bootstrap scripts
 * and the pages are prerendered (Partial Prerendering), so per-request nonces are not an option without
 * making every page dynamic — scripts therefore allow 'self' + 'unsafe-inline'. Everything else is locked
 * to this origin, except the Material Symbols stylesheet/font from Google Fonts. Framing is refused.
 */
export function contentSecurityPolicy({ dev }: { dev: boolean }): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`, // dev: React Refresh / error overlay
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob:",
    `connect-src 'self'${dev ? " ws: wss:" : ""}`, // dev: HMR websocket
    "frame-ancestors 'none'",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "manifest-src 'self'",
    "worker-src 'self' blob:",
    ...(dev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");
}

export function securityHeaders({ dev }: { dev: boolean }): { key: string; value: string }[] {
  return [
    { key: "Content-Security-Policy", value: contentSecurityPolicy({ dev }) },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" }, // for browsers without CSP frame-ancestors
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    // HSTS only outside development (browsers ignore it over plain http anyway); no preload commitment.
    ...(dev ? [] : [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }]),
  ];
}
