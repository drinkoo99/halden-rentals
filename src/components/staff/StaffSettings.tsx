import { StaffChrome } from "@/components/staff/StaffChrome";
import type { SettingRow } from "@/server/staff/settings";

const SOURCE: Record<SettingRow["source"], string> = { code: "Release", environment: "Deployment", catalogue: "Catalogue" };

/**
 * Staff: operational settings (M8), read-only. Shows the rules and services actually in force and where
 * each comes from. Pricing and booking rules change through a reviewed release or deployment variable —
 * never from a web form — so quotes cannot change between review and confirmation. No secrets are shown.
 */
export function StaffSettings({ rows, staffName, today }: { rows: SettingRow[]; staffName: string; today: string }) {
  const groups = [...new Set(rows.map((r) => r.group))];
  return (
    <StaffChrome section="settings" staffName={staffName} today={today}>
      <div className="flex flex-col w-full pb-24 max-w-5xl">
        <div className="pt-6 pb-5 border-b border-outline-variant">
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Settings</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-2xl">
            The configuration in force, read-only. Pricing and booking rules change with a reviewed release or a deployment variable, so a customer&apos;s quote can never change between review and confirmation.
          </p>
        </div>
        {groups.map((g) => (
          <section key={g} className="mt-6">
            <h2 className="font-label-mono text-label-mono uppercase text-on-surface-variant mb-2">{g}</h2>
            <dl className="divide-y divide-outline-variant border-y border-outline-variant">
              {rows
                .filter((r) => r.group === g)
                .map((r) => (
                  <div key={r.label} className="grid grid-cols-[1fr_auto_7rem] gap-4 py-2.5 font-body-sm text-body-sm items-baseline">
                    <dt>
                      <span className="text-on-surface">{r.label}</span>
                      {r.note && <span className="block text-on-surface-variant">{r.note}</span>}
                    </dt>
                    <dd className="font-spec-numeral text-on-surface text-right">{r.value}</dd>
                    <dd className="font-label-mono text-[10px] uppercase text-outline text-right">{SOURCE[r.source]}</dd>
                  </div>
                ))}
            </dl>
          </section>
        ))}
      </div>
    </StaffChrome>
  );
}
