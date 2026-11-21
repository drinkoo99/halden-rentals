"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * Cookie consent banner from the Stitch states sheet (S8): dark room bar pinned to the bottom with
 * Preferences / Accept necessary only / Accept all. HALDEN only uses strictly necessary browser storage
 * (booking draft, saved cars, this choice) and no trackers, so the optional categories exist for the
 * future and are off by default. The choice is remembered in localStorage; any link to
 * "#cookie-preferences" reopens the preferences.
 */
type Consent = { necessary: true; analytics: boolean; marketing: boolean; at: string };
const KEY = "halden:consent";
const OPEN_HASH = "#cookie-preferences";

function read(): Consent | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}
function save(c: Omit<Consent, "necessary" | "at">) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ necessary: true, ...c, at: new Date().toISOString() }));
    window.dispatchEvent(new Event("halden:consent"));
  } catch {
    /* storage blocked: the banner simply shows again next time */
  }
}
const subscribe = (cb: () => void) => {
  window.addEventListener("halden:consent", cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener("halden:consent", cb);
    window.removeEventListener("storage", cb);
  };
};

export function CookieConsent() {
  // server snapshot "decided" so no banner is prerendered; the client shows it only if no choice exists
  const decided = useSyncExternalStore(subscribe, () => read() !== null, () => true);
  const [prefs, setPrefs] = useState(false);

  const openPrefs = useCallback(() => setPrefs(true), []);
  useEffect(() => {
    const check = () => {
      if (window.location.hash === OPEN_HASH) {
        openPrefs();
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.(`a[href$="${OPEN_HASH}"]`);
      if (a) {
        e.preventDefault();
        openPrefs();
      }
    };
    check();
    window.addEventListener("hashchange", check);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", check);
      document.removeEventListener("click", onClick);
    };
  }, [openPrefs]);

  return (
    <>
      {!decided && !prefs && (
        <section aria-label="Cookie consent" className="fixed bottom-0 inset-x-0 z-70 bg-surface-dark text-white border-t border-[#333835] p-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-sage rounded-full" aria-hidden />
                <span className="font-label-mono text-label-mono uppercase tracking-widest text-sage">{"PRIVACY // BROWSER STORAGE"}</span>
              </div>
              <h2 className="font-headline-sm text-[18px] text-white">Respecting your privacy.</h2>
              <p className="font-body-sm text-[12px] text-white/70 leading-relaxed">
                HALDEN only uses storage that is strictly necessary — your booking draft, saved cars and this choice, kept in your browser. There are
                no analytics or advertising trackers.{" "}
                <Link className="underline underline-offset-2 hover:text-white" href="/privacy">
                  Privacy notice
                </Link>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button className="px-4 py-2.5 border border-[#333835] text-white/80 hover:text-white font-label-mono text-label-mono uppercase tracking-wider transition-colors" onClick={openPrefs} type="button">
                Preferences
              </button>
              <button className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-label-mono text-label-mono uppercase tracking-wider transition-colors" onClick={() => save({ analytics: false, marketing: false })} type="button">
                Accept necessary only
              </button>
              <button className="px-5 py-2.5 bg-primary-container hover:bg-primary text-white font-label-mono text-label-mono uppercase tracking-wider transition-colors" onClick={() => save({ analytics: true, marketing: true })} type="button">
                Accept all →
              </button>
            </div>
          </div>
        </section>
      )}
      {prefs && <Preferences onClose={() => setPrefs(false)} />}
    </>
  );
}

function Preferences({ onClose }: { onClose: () => void }) {
  const current = read();
  const [analytics, setAnalytics] = useState(current?.analytics ?? false);
  const [marketing, setMarketing] = useState(current?.marketing ?? false);
  const dialog = useRef<HTMLDivElement>(null);
  useEffect(() => {
    dialog.current?.querySelector<HTMLElement>("button, input")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const row = (id: string, title: string, text: string, checked: boolean, onChange?: (v: boolean) => void) => (
    <label htmlFor={id} className="flex items-start justify-between gap-4 py-4 border-b border-outline-variant last:border-b-0">
      <span className="flex flex-col gap-1">
        <span className="font-body-md text-body-md text-on-surface font-medium">{title}</span>
        <span className="font-body-sm text-body-sm text-on-surface-variant">{text}</span>
      </span>
      <input id={id} type="checkbox" className="mt-1 w-4 h-4 accent-primary shrink-0" checked={checked} disabled={!onChange} onChange={(e) => onChange?.(e.target.checked)} />
    </label>
  );
  return (
    <div className="fixed inset-0 z-80 bg-ink/50 backdrop-blur-[2px] flex items-end md:items-center justify-center p-4" onClick={onClose}>
      <div
        ref={dialog}
        aria-labelledby="cookie-prefs-title"
        aria-modal="true"
        className="w-full max-w-lg bg-surface border border-outline-variant p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4 border-b border-outline-variant pb-3">
          <div>
            <span className="font-label-mono text-label-mono uppercase tracking-widest text-primary">{"PRIVACY // PREFERENCES"}</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface" id="cookie-prefs-title">
              Cookie preferences
            </h2>
          </div>
          <button aria-label="Close" className="w-8 h-8 border border-outline-variant flex items-center justify-center hover:bg-surface-container" onClick={onClose} type="button">
            <span className="material-symbols-outlined text-[18px]" aria-hidden>
              close
            </span>
          </button>
        </div>
        <div className="flex flex-col">
          {row("consent-necessary", "Strictly necessary", "Booking draft, saved cars and this choice, kept in your browser. Always on.", true)}
          {row("consent-analytics", "Analytics", "Not used in this prototype. Your choice is stored for when it is.", analytics, setAnalytics)}
          {row("consent-marketing", "Marketing", "Not used in this prototype. Your choice is stored for when it is.", marketing, setMarketing)}
        </div>
        <button
          className="h-12 bg-primary-container hover:bg-primary text-on-primary font-action text-action uppercase tracking-widest"
          onClick={() => {
            save({ analytics, marketing });
            onClose();
          }}
          type="button"
        >
          Save preferences
        </button>
      </div>
    </div>
  );
}
