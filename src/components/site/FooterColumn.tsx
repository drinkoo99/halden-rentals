import Link from "next/link";

const link = "text-inverse-on-surface hover:text-primary-fixed transition-colors";

/** One link column of the site footer (shared by SiteFooter and FooterHubs). */
export function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-label-mono text-label-mono uppercase text-on-tertiary-container mb-space-md">{title}</h2>
      <ul className="space-y-space-sm font-body-sm text-body-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link className={link} href={l.href}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
