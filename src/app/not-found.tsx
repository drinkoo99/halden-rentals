import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { StatusPage } from "@/components/states/StatusPage";
import { media } from "@/data/media";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

/** 404 — the "Vacant exhibit" card from the Stitch states sheet (S8). */
export default function NotFound() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 pt-20 flex">
        <StatusPage
          code="404"
          protocol="PROTOCOL 404 // VACANT EXHIBIT"
          meta="STATUS: NOT IN THE COLLECTION"
          title="The pedestal is empty."
          body="The page you were looking for has moved or never existed. The collection is still on display."
          photo={media.porscheVintageGallery}
          primary={{ label: "Return to the collection →", href: "/fleet" }}
          secondary={{ label: "Back to the homepage", href: "/" }}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
