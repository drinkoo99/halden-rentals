"use client";

import { useState } from "react";

/**
 * Share control: the phone's native share sheet when available, otherwise copies the page link and
 * says so. Keeps the Stitch button classes passed in.
 */
export function ShareButton({ className, children, "aria-label": ariaLabel }: { className?: string; children: React.ReactNode; "aria-label"?: string }) {
  const [copied, setCopied] = useState(false);
  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) return await navigator.share({ title: document.title, url });
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* share sheet dismissed */
    }
  }
  return (
    <button aria-label={copied ? "Link copied" : ariaLabel} className={className} onClick={share} type="button">
      {children}
      <span role="status" className="sr-only">
        {copied ? "Link copied" : ""}
      </span>
    </button>
  );
}
