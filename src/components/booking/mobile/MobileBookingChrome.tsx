"use client";

import Link from "next/link";
import { useState } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { Photo } from "@/components/ui/Photo";
import { formatEuroCents } from "@/lib/pricing";

/**
 * Mobile booking chrome, from the Stitch mobile booking screens (390px): fixed header with the six-step
 * progress rail and the vehicle strip, and the sticky bottom action bar. Shown below the md breakpoint.
 */
export function MobileBookingHeader({ step, subtitle }: { step: number; subtitle: string }) {
  const { vehicle: v, quote } = useBooking();
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-28 flex flex-col justify-between">
        <div className="h-14 px-margin-mobile flex items-center justify-between">
          <Link
            aria-label="Close reservation"
            className="w-11 h-11 -ml-2 flex items-center justify-center text-on-surface active:opacity-60 transition-opacity"
            href={`/fleet/${v.slug}`}
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden>
              close
            </span>
          </Link>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-primary" aria-hidden>
              lock
            </span>
            <span className="font-label-mono text-label-mono uppercase tracking-[0.16em] text-on-surface">Secure Reservation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-spec-numeral text-spec-numeral text-on-surface-variant font-medium">
              {String(step).padStart(2, "0")} / 06
            </span>
            <Link
              aria-label="Patron account"
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
              href="/account"
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]" aria-hidden>
                person
              </span>
            </Link>
          </div>
        </div>
        <div className="w-full px-margin-mobile pb-2">
          <div className="grid grid-cols-6 gap-1 w-full" role="progressbar" aria-valuemin={1} aria-valuemax={6} aria-valuenow={step} aria-label="Reservation progress">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className={`h-[2px] ${i < step ? "bg-primary" : "bg-outline-variant/50"}`} />
            ))}
          </div>
        </div>
        <div className="h-12 px-margin-mobile bg-surface-container-low/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-10 h-7 bg-surface-container-high shrink-0 overflow-hidden flex items-center justify-center">
              <Photo src={v.image} alt="" className="w-full h-full object-cover" sizes="40px" />
            </div>
            <div className="flex flex-col truncate">
              <span className="font-headline-sm text-[13px] leading-tight text-on-surface tracking-tight truncate">{v.name}</span>
              <span className="font-label-mono text-[9px] uppercase tracking-wider text-on-surface-variant">{subtitle}</span>
            </div>
          </div>
          <button
            aria-expanded={open}
            aria-controls="mobile-price-breakdown"
            aria-label="Toggle price breakdown"
            className="flex items-center gap-1.5 h-11 pl-2 -mr-1 active:opacity-60 transition-opacity"
            onClick={() => setOpen((o) => !o)}
            type="button"
          >
            <span className="font-spec-numeral text-spec-numeral text-primary font-semibold">{formatEuroCents(quote.total)}</span>
            <span className={`material-symbols-outlined text-[16px] text-on-surface-variant transition-transform ${open ? "rotate-180" : ""}`} aria-hidden>
              expand_more
            </span>
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-price-breakdown" className="px-margin-mobile pb-4 pt-3 bg-surface-container-low/95 flex flex-col gap-1.5">
          <Row label={`Daily rate (${formatEuroCents(quote.dailyRate)} × ${quote.days})`} value={formatEuroCents(quote.rental)} />
          {quote.extras.map((e) => (
            <Row key={e.label} label={e.label} value={formatEuroCents(e.amount)} />
          ))}
          <Row label="VAT (19 %)" value={formatEuroCents(quote.vat)} />
          <div className="mt-1 pt-2 border-t border-outline-variant/50">
            <Row label="Total" value={formatEuroCents(quote.total)} strong />
          </div>
        </div>
      )}
    </header>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="font-body-sm text-[12px] text-on-surface-variant truncate">{label}</span>
      <span className={`font-spec-numeral text-[13px] text-on-surface shrink-0 ${strong ? "font-bold text-primary" : ""}`}>{value}</span>
    </div>
  );
}

/** Sticky bottom bar: running total and the step's primary action. */
export function MobileBookingBar({
  label,
  caption = "Total Est.",
  onAction,
  disabled = false,
  helper,
}: {
  label: string;
  caption?: string;
  onAction: () => void;
  disabled?: boolean;
  helper?: string;
}) {
  const { quote } = useBooking();
  return (
    <aside className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-[430px] mx-auto h-20 px-margin-mobile flex items-center justify-between gap-4">
        <div className="flex flex-col min-w-0">
          <span className="font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant truncate">{caption}</span>
          <div className="flex items-baseline gap-1">
            <span className="font-spec-numeral text-[16px] font-bold text-on-surface">{formatEuroCents(quote.total)}</span>
            <span className="font-label-mono text-[10px] text-outline">EUR</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <button
            className={
              disabled
                ? "h-12 px-6 bg-surface-dim text-sage opacity-50 cursor-not-allowed font-action text-action flex items-center justify-center gap-2 rounded-[2px]"
                : "h-12 px-6 bg-primary text-on-primary font-action text-action flex items-center justify-center gap-2 hover:bg-primary-container active:scale-[0.99] transition-all rounded-[2px]"
            }
            aria-disabled={disabled}
            onClick={onAction}
            type="button"
          >
            <span>{label}</span>
            <span className="font-label-mono text-xs" aria-hidden>
              →
            </span>
          </button>
          {helper && <span className="font-label-mono text-[9px] uppercase tracking-wider text-on-surface-variant">{helper}</span>}
        </div>
      </div>
    </aside>
  );
}

/** Bottom sheet frame shared by the hub selector, calendar and licence country sheets. */
export function MobileSheet({
  title,
  kicker,
  onClose,
  children,
  labelledBy,
}: {
  title: string;
  kicker: string;
  onClose: () => void;
  children: React.ReactNode;
  labelledBy: string;
}) {
  return (
    <div className="md:hidden">
      <div className="fixed inset-0 z-60 bg-on-surface/40 backdrop-blur-[2px]" onClick={onClose} aria-hidden />
      <section
        aria-labelledby={labelledBy}
        aria-modal="true"
        className="fixed inset-x-0 bottom-0 z-70 max-w-[430px] mx-auto bg-surface flex flex-col rounded-t-[4px] shadow-[0_-8px_30px_rgba(25,28,26,0.12)] max-h-[90dvh] overflow-hidden pb-safe"
        role="dialog"
        onKeyDown={(e) => e.key === "Escape" && onClose()}
      >
        <div className="w-full pt-3 pb-1.5 flex items-center justify-center">
          <div className="w-10 h-[3px] bg-outline-variant rounded-full" />
        </div>
        <div className="px-5 pt-2 pb-3.5 flex items-start justify-between bg-surface">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              <span className="font-label-mono text-[10px] tracking-[0.2em] uppercase text-on-surface-variant font-medium">{kicker}</span>
            </div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface mt-0.5" id={labelledBy}>
              {title}
            </h2>
          </div>
          <button
            aria-label="Close"
            autoFocus
            className="w-10 h-10 -mr-2 flex items-center justify-center text-on-surface active:opacity-60 transition-opacity"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden>
              close
            </span>
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

/** Square architectural switch from the Stitch screens: 48×24, forest when on. */
export function Switch({
  checked,
  onChange,
  labelledBy,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  labelledBy?: string;
  label?: string;
}) {
  return (
    <button
      aria-checked={checked}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={`shrink-0 w-12 h-6 p-0.5 rounded-[2px] relative transition-colors duration-200 flex items-center ${checked ? "bg-primary" : "bg-outline-variant"}`}
      onClick={() => onChange(!checked)}
      role="switch"
      type="button"
    >
      <span
        className={`w-5 h-5 rounded-[1px] transition-transform duration-200 flex items-center justify-center pointer-events-none ${
          checked ? "bg-on-primary translate-x-6" : "bg-surface-container-lowest translate-x-0"
        }`}
      >
        <span className={`w-1.5 h-1.5 ${checked ? "bg-primary" : "bg-outline"}`} />
      </span>
    </button>
  );
}
