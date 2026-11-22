/** Shown on the staff screens that are still Stitch designs with demo data (the vehicle editor). */
export function StaffDemoBanner() {
  return (
    <aside aria-label="Demo console notice" className="fixed bottom-4 right-4 z-60 max-w-sm bg-amber-soft border-l-2 border-amber border border-outline-variant px-4 py-3 shadow-sm">
      <span className="block font-label-mono text-label-mono uppercase tracking-wider text-on-surface font-bold">Demo console</span>
      <span className="block font-body-sm text-body-sm text-on-surface-variant">
        This screen is a design preview with demo data. Manage real cars in the fleet register.
      </span>
    </aside>
  );
}
