import { getImageProps } from "next/image";

/** 1×1 transparent GIF: the source used where this hero is hidden, so that breakpoint never downloads it. */
const BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

/**
 * Above-the-fold hero image for pages that render separate mobile and desktop compositions.
 * `next/image` `preload` would make every device fetch both heroes, so instead each hero is a
 * <picture> whose source is a blank pixel at the breakpoint where it is hidden, and the real image
 * is requested with fetchPriority="high" where it is visible (Next.js docs: art direction / LCP).
 */
export function ResponsiveHero({
  src,
  alt,
  sizes,
  hiddenMedia,
  quality = 90,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  /** Media query where this hero is NOT shown, e.g. "(max-width: 767px)" for the desktop hero */
  hiddenMedia: string;
  quality?: number;
  className?: string;
}) {
  const { props } = getImageProps({ src, alt, fill: true, sizes, quality, fetchPriority: "high", loading: "eager" });
  return (
    <picture>
      <source media={hiddenMedia} srcSet={BLANK} />
      <img {...props} alt={alt} className={className} />
    </picture>
  );
}
