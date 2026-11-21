"use client";

import { useId, useState } from "react";
import { z } from "zod";

const emailSchema = z.email("Enter a valid email address.");

/**
 * "The Dispatch" newsletter form. Desktop (screen 04) and mobile (screen 28) variants.
 * Demo only: validates the address and confirms on screen — nothing is sent yet.
 */
export function NewsletterForm({ variant }: { variant: "desktop" | "mobile" }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<{ kind: "idle" | "error" | "done"; msg?: string }>({ kind: "idle" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = emailSchema.safeParse(email.trim());
    if (!res.success) {
      setState({ kind: "error", msg: res.error.issues[0]?.message });
      return;
    }
    setState({ kind: "done", msg: "Thank you — you’re on the list for the next Dispatch." });
    setEmail("");
  }

  const message =
    state.kind !== "idle" ? (
      <p
        id={`${id}-msg`}
        role={state.kind === "error" ? "alert" : "status"}
        className={
          variant === "desktop"
            ? `mt-3 font-mono text-[11px] ${state.kind === "error" ? "text-[#e08b84]" : "text-sage"}`
            : `font-label-mono text-label-mono ${state.kind === "error" ? "text-[#e08b84]" : "text-inverse-primary"}`
        }
      >
        {state.msg}
      </p>
    ) : null;

  if (variant === "desktop") {
    return (
      <>
        <form className="flex items-center max-w-md" onSubmit={submit} noValidate>
          <label htmlFor={`${id}-email`} className="sr-only">
            Email address
          </label>
          <input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={state.kind === "error"}
            aria-describedby={state.kind !== "idle" ? `${id}-msg` : undefined}
            className="bg-dark-panel border border-dark-border px-4 py-3 text-xs text-ivory placeholder:text-text-muted focus:outline-none focus:border-sage grow rounded-l-[2px]"
          />
          <button
            type="submit"
            className="bg-forest text-ivory text-xs font-sans uppercase tracking-wider px-6 py-3 rounded-r-[2px] hover:bg-forest-hover transition-colors font-medium whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
        {message}
      </>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <label
        className="font-label-mono text-label-mono text-inverse-primary tracking-widest uppercase"
        htmlFor={`${id}-email`}
      >
        QUARTERLY ARCHIVE DISPATCH
      </label>
      <form className="flex flex-col gap-2.5" onSubmit={submit} noValidate>
        <input
          className="w-full min-h-[48px] bg-tertiary-container text-inverse-on-surface px-4 font-body-md rounded-[2px] focus:outline-none focus:bg-surface-container-highest/20 placeholder:text-on-tertiary-container"
          id={`${id}-email`}
          placeholder="colleague@domain.com"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={state.kind === "error"}
          aria-describedby={state.kind !== "idle" ? `${id}-msg` : undefined}
        />
        <button
          className="w-full min-h-[48px] bg-inverse-primary text-on-primary-fixed font-action uppercase rounded-[2px] active:opacity-90"
          type="submit"
        >
          Subscribe to Dispatch
        </button>
      </form>
      {message}
    </div>
  );
}
