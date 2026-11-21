/** Material Symbols Outlined glyph, as used throughout the Stitch screens. Decorative by default. */
export function Icon({
  name,
  className = "",
  label,
}: {
  name: string;
  className?: string;
  /** Accessible label; omit for decorative icons */
  label?: string;
}) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    >
      {name}
    </span>
  );
}
