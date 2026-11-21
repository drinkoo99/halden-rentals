import Link from "next/link";
import { Photo } from "@/components/ui/Photo";

export type StatusAction = { label: string; href?: string; onClick?: () => void };

/**
 * Error / not-found card from the Stitch "System States & Dialogs Sheet (S8)": hairline panel, mono
 * protocol label, 16:9 darkened gallery photo with the status code, Bodoni headline, primary action and
 * a quiet secondary link. Used by not-found.tsx, error.tsx and global-error.tsx.
 */
export function StatusPage({
  code,
  protocol,
  meta,
  title,
  body,
  photo,
  tone = "neutral",
  primary,
  secondary,
}: {
  code: string;
  protocol: string;
  meta: string;
  title: string;
  body: string;
  photo: string;
  tone?: "neutral" | "error";
  primary: StatusAction;
  secondary?: StatusAction;
}) {
  const primaryCls =
    "w-full py-3 px-4 bg-primary-container hover:bg-primary text-on-primary font-label-mono text-label-mono uppercase tracking-wider transition-colors text-center block";
  const secondaryCls = "font-label-mono text-[11px] text-on-surface-variant uppercase hover:underline";
  return (
    <section className="w-full flex items-center justify-center px-margin-mobile py-space-xl">
      <div className="w-full max-w-xl bg-surface-container-lowest border border-outline-variant p-8 flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4 border-b border-outline-variant pb-2">
            <span className={`font-label-mono text-label-mono uppercase tracking-wider ${tone === "error" ? "text-crimson" : "text-on-surface-variant"}`}>{protocol}</span>
            <span className="font-label-mono text-[10px] uppercase text-outline">{meta}</span>
          </div>
          <div className="aspect-video w-full overflow-hidden border border-outline-variant bg-ink relative">
            <Photo src={photo} alt="" className="w-full h-full object-cover opacity-50" sizes="(max-width: 640px) 100vw, 576px" />
            <div className="absolute inset-0 bg-ink/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-display text-white/85 tracking-widest" aria-hidden>
                {code}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="font-headline-md text-headline-md text-on-surface">{title}</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">{body}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-4 border-t border-outline-variant">
          {primary.href ? (
            <Link className={primaryCls} href={primary.href}>
              {primary.label}
            </Link>
          ) : (
            <button className={primaryCls} onClick={primary.onClick} type="button">
              {primary.label}
            </button>
          )}
          {secondary && (
            <div className="text-center">
              {secondary.href ? (
                <Link className={secondaryCls} href={secondary.href}>
                  {secondary.label}
                </Link>
              ) : (
                <button className={secondaryCls} onClick={secondary.onClick} type="button">
                  {secondary.label}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
