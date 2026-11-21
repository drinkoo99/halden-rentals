/**
 * Loading skeletons from the Stitch states sheet (S8): flat stone blocks with the slow shimmer
 * (`.skeleton-shimmer`, which respects prefers-reduced-motion via the global reduced-motion rule),
 * hairline frames, no rounded corners. Screen readers get a single "Loading" status.
 */
function Block({ className }: { className: string }) {
  return <div className={`skeleton-shimmer ${className}`} />;
}

function Placard() {
  return (
    <div className="border border-outline-variant p-4 bg-surface space-y-4">
      <Block className="w-full aspect-[4/3]" />
      <div className="space-y-2 pt-2">
        <Block className="w-16 h-2" />
        <Block className="w-3/4 h-5" />
        <Block className="w-full h-3" />
      </div>
      <div className="pt-4 border-t border-outline-variant flex justify-between items-center">
        <Block className="w-20 h-4" />
        <Block className="w-24 h-8" />
      </div>
    </div>
  );
}

/** Fleet discovery: page heading and a 3-column (1 on phones) placard grid. */
export function FleetSkeleton() {
  return (
    <div role="status" aria-label="Loading the collection" className="min-h-screen bg-ivory">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 pt-28 pb-16 space-y-8">
        <div className="space-y-3">
          <Block className="w-32 h-3" />
          <Block className="w-2/3 md:w-1/3 h-10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Placard />
          <Placard />
          <Placard />
        </div>
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}

/** Vehicle detail: gallery wall on the left, specification column on the right. */
export function VehicleSkeleton() {
  return (
    <div role="status" aria-label="Loading the vehicle" className="min-h-screen bg-ivory">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-3">
          <Block className="w-full aspect-video" />
          <div className="grid grid-cols-3 gap-3">
            <Block className="aspect-[4/3]" />
            <Block className="aspect-[4/3]" />
            <Block className="aspect-[4/3]" />
          </div>
        </div>
        <div className="lg:col-span-5 space-y-5 lg:border-l border-outline-variant lg:pl-6">
          <Block className="w-24 h-3" />
          <Block className="w-4/5 h-8" />
          <Block className="w-full h-16" />
          <div className="grid grid-cols-2 gap-4 py-4 border-y border-outline-variant">
            <Block className="h-10" />
            <Block className="h-10" />
            <Block className="h-10" />
            <Block className="h-10" />
          </div>
          <Block className="w-full h-12" />
        </div>
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}

/** Booking steps: content column and the dossier sidebar (desktop), stacked on phones. */
export function BookingSkeleton() {
  return (
    <div role="status" aria-label="Loading your reservation" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start px-6 pt-32 md:p-0">
      <div className="lg:col-span-8 space-y-6">
        <Block className="h-4 w-64" />
        <Block className="h-12 w-3/4" />
        <Block className="h-64 w-full" />
      </div>
      <Block className="hidden md:block lg:col-span-4 h-96" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
