import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BookingFooter, BookingHeader, BookingSummary } from "@/components/booking/BookingChrome";
import { BookingProvider } from "@/components/booking/BookingProvider";
import { getVehicle, vehicles } from "@/data/vehicles";

/**
 * The booking UI renders only in the browser (its state lives in sessionStorage), so its prerendered
 * shell intentionally contains just the skeleton. That cannot pass instant-navigation validation,
 * so the segment opts out of it; step-to-step navigation is still client-side.
 */
export const instant = false;

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

function Skeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" aria-busy="true">
      <div className="lg:col-span-8 space-y-6">
        <div className="h-4 w-64 bg-surface-container-high" />
        <div className="h-12 w-3/4 bg-surface-container-high" />
        <div className="h-64 w-full bg-surface-container-low border border-outline-variant" />
      </div>
      <div className="lg:col-span-4 h-96 bg-surface-container-low border border-outline-variant" />
    </div>
  );
}

/**
 * Booking flow shell. Desktop (Stitch screens 20–24): fixed header + step index, content column, dossier
 * sidebar. Phones: the Stitch mobile booking screens bring their own header and bottom bar, so the desktop
 * chrome is hidden below the md breakpoint.
 */
export default function BookingLayout({ params, children }: LayoutProps<"/book/[slug]">) {
  // params are resolved inside the boundary so navigation can render instantly
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen">
      <Suspense
        fallback={
          <main className="w-full pt-[112px] bg-surface">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
              <Skeleton />
            </div>
          </main>
        }
      >
        <Shell params={params}>{children}</Shell>
      </Suspense>
      <div className="hidden md:block">
        <BookingFooter />
      </div>
    </div>
  );
}

async function Shell({ params, children }: { params: LayoutProps<"/book/[slug]">["params"]; children: React.ReactNode }) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) notFound();
  return (
    <>
      <div className="hidden md:block">
        <BookingHeader slug={vehicle.slug} />
      </div>
      <main className="w-full md:pt-[112px] print:pt-0 bg-surface">
        <div className="md:max-w-7xl md:mx-auto md:px-6 lg:px-8 md:py-10">
          <BookingProvider vehicle={vehicle} fallback={<Skeleton />}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8">{children}</div>
              <BookingSummary />
            </div>
          </BookingProvider>
        </div>
      </main>
    </>
  );
}
