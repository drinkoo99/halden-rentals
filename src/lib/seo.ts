import type { Metadata } from "next";

/** Default social preview image (the home hero), used when a page has no image of its own. */
export const DEFAULT_SOCIAL_IMAGE = {
  url: "/images/hero-porsche-911-gallery.jpg",
  width: 3840,
  height: 2143,
  alt: "Porsche 911 Carrera in a modernist gallery",
};

/**
 * Metadata for a public, indexable page: title + description, a canonical URL, and matching Open Graph /
 * Twitter tags. A page-level `openGraph` replaces the layout's (Next.js merges metadata shallowly), so
 * every field the preview needs is set here rather than inherited.
 */
export function publicMeta({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; alt: string; width?: number; height?: number };
}): Metadata {
  const img = image ?? DEFAULT_SOCIAL_IMAGE;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: "HALDEN", title: `${title} | HALDEN`, description, url: path, images: [img] },
    twitter: { card: "summary_large_image", title: `${title} | HALDEN`, description, images: [img.url] },
  };
}
