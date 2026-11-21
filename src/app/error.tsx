"use client";

import { useEffect } from "react";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { StatusPage } from "@/components/states/StatusPage";
import { media } from "@/data/media";

/** Route error boundary — the "Something in the gallery went dark" card from the Stitch states sheet (S8). */
export default function RouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 pt-20 flex">
        <StatusPage
          code="500"
          tone="error"
          protocol="PROTOCOL 500 // UNEXPECTED ERROR"
          meta={error.digest ? `REF ${error.digest}` : "REF —"}
          title="Something in the gallery went dark."
          body="This page could not be shown. Your booking draft and saved cars are kept in this browser, so trying again is safe."
          photo={media.heroPorscheGallery}
          primary={{ label: "Try again →", onClick: reset }}
          secondary={{ label: "Contact the concierge", href: "/about#contact" }}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
