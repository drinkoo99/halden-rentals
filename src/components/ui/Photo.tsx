import { getImageProps } from "next/image";
import { photoSizes } from "@/data/photoSizes";

/**
 * A Stitch `<img>` served through the Next.js image optimiser (AVIF/WebP, responsive srcset).
 * Keeps the exact classes from the Stitch markup; width/height are the file's intrinsic size, so the
 * browser reserves the right aspect ratio wherever the Stitch classes don't fix the box themselves.
 */
export function Photo({
  src,
  alt,
  className,
  sizes = "(max-width: 767px) 100vw, 50vw",
  priority = false,
  quality = 90,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  style?: React.CSSProperties;
}) {
  const [width, height] = photoSizes[src] ?? [1600, 1000];
  const { props } = getImageProps({
    src,
    alt,
    width,
    height,
    sizes,
    quality,
    loading: priority ? "eager" : "lazy",
    fetchPriority: priority ? "high" : undefined,
  });
  // getImageProps already gives this <img> the optimised srcset (same pattern as ResponsiveHero)
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} alt={alt} className={className} style={style} />;
}
