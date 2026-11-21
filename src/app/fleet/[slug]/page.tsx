import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { VehicleDesktop } from "@/components/vehicle/VehicleDesktop";
import { VehicleMobile } from "@/components/vehicle/VehicleMobile";
import { getVehicle, similarVehicles, vehicles } from "@/data/vehicles";

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: PageProps<"/fleet/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const v = getVehicle(slug);
  if (!v) return { title: "Vehicle not found" };
  return {
    title: `${v.name} — €${v.pricePerDay} / day`,
    description: `${v.headline} ${v.specLine}. Curbside delivery across HALDEN’s European hubs.`,
    openGraph: { images: [{ url: v.image, alt: v.imageAlt }] },
  };
}

/** Vehicle detail. Desktop = Stitch screen 19, mobile = screen 30. */
export default function VehiclePage({ params }: PageProps<"/fleet/[slug]">) {
  // params are resolved inside the boundary so navigation can render the shell instantly
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory" aria-busy="true" />}>
      <Vehicle params={params} />
    </Suspense>
  );
}

async function Vehicle({ params }: { params: PageProps<"/fleet/[slug]">["params"] }) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) notFound();
  const similar = similarVehicles(vehicle);
  return (
    <>
      <VehicleMobile vehicle={vehicle} similar={similar} />
      <VehicleDesktop vehicle={vehicle} similar={similar} />
    </>
  );
}
