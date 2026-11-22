"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInAction } from "@/app/actions/auth";
import { Icon } from "@/components/ui/Icon";
import { media } from "@/data/media";
import { refreshSession } from "@/lib/session";

const signInSchema = z.object({
  fullName: z.string().optional(),
  email: z.email("Enter the email address linked to your patron account."),
  passcode: z.string().min(8, "Your passcode has at least 8 characters."),
  remember: z.boolean(),
});
const registerSchema = signInSchema.extend({
  fullName: z.string().trim().min(2, "Enter your full name."),
  passcode: z
    .string()
    .min(12, "Use at least 12 characters.")
    .regex(/[A-Za-z]/, "Include at least one letter.")
    .regex(/\d/, "Include at least one number."),
});
type Values = z.infer<typeof signInSchema>;

/** Only same-site paths are allowed as a return target (prevents open redirects). */
function safeNext(v: string | null) {
  return v && v.startsWith("/") && !v.startsWith("//") ? v : "/fleet";
}

/**
 * Sign in — Stitch screen 31. Credentials are checked on the server (signInAction); a wrong email or
 * passcode gets one generic message, and too many attempts lead to the lockout screen with the real wait.
 * Registration has its own Stitch screen (/request-access).
 */
export function SignInScreen() {
  const params = useSearchParams();
  const router = useRouter();
  const next = safeNext(params.get("next"));
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [show, setShow] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<Values>({
    resolver: zodResolver(mode === "signin" ? signInSchema : registerSchema),
    defaultValues: { fullName: "", email: "", passcode: "", remember: true },
  });

  async function onSubmit(values: Values) {
    setFormError(null);
    setPending(true);
    const res = await signInAction({ email: values.email, password: values.passcode, remember: values.remember, next: params.get("next") ?? undefined });
    if (res.ok) {
      await refreshSession();
      router.replace(res.redirectTo ?? "/account");
      router.refresh();
      return;
    }
    setPending(false);
    // too many attempts: the Stitch lockout screen ("Sign In: Error States & Security Lockout") with the real wait
    if (res.code === "rate_limited") return router.push(`/sign-in/error?retry=${res.retryAfterSeconds ?? 900}`);
    setFormError(res.error);
  }

  const switchMode = (m: "signin" | "register") => {
    // Registration has its own Stitch screen ("Request Access")
    if (m === "register") return router.push("/request-access");
    setMode(m);
    setNotice(null);
    setFormError(null);
    clearErrors();
  };

  const fieldCls = (err?: unknown) =>
    `w-full h-[50px] px-4 bg-surface-container-lowest text-on-surface rounded border focus:outline-none focus:ring-1 transition-all placeholder:text-outline/60 ${
      err ? "border-error focus:border-error focus:ring-error" : "border-outline-variant/60 focus:border-primary focus:ring-primary"
    }`;

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md">
      <main className="min-h-screen w-full flex flex-col justify-center">
        <div className="min-h-screen w-full flex flex-col lg:flex-row bg-surface">
          {/* Left: Architectural Gallery Stage */}
          <div className="relative w-full lg:w-1/2 min-h-[480px] lg:min-h-screen bg-tertiary flex flex-col justify-between p-8 lg:p-14 overflow-hidden select-none">
            <div className="absolute inset-0 transition-transform duration-1000 ease-out hover:scale-105">
              <Image src={media.signInGallery} alt="" fill preload quality={90} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-center" />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-primary/40 mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-0 bg-primary/20 pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between">
              <Link href="/" className="flex items-baseline space-x-3">
                <span className="font-headline-md text-headline-md tracking-wider text-surface-bright uppercase">Halden</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary-fixed mb-1" />
              </Link>
              <div className="flex items-center space-x-2 bg-primary/50 backdrop-blur-sm px-3 py-1.5 rounded text-surface-bright/90">
                <Icon name="lock" className="text-[14px]" />
                <span className="font-label-mono text-label-mono uppercase tracking-widest text-[10px]">Secure Vault</span>
              </div>
            </div>
            <div className="relative z-10 max-w-lg bg-primary/80 backdrop-blur-md p-6 lg:p-8 rounded text-on-primary">
              <div className="flex items-center space-x-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-secondary-container" />
                <span className="font-label-mono text-label-mono uppercase tracking-widest text-secondary-fixed text-[11px]">
                  HALDEN AUTOMOTIVE ARCHIVE {"//"} EXHIBIT 01
                </span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-surface-bright tracking-tight mb-2">Porsche 911 2.0 Coupé (1965)</h2>
              <p className="font-body-sm text-body-sm text-surface-variant/80 line-clamp-2 mb-4">
                Chassis No. 300 248. Preserved in its original stone concrete staging pavilion with low raking natural daylight. Unrestored
                matching-numbers preservation specimen.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20 font-spec-numeral text-spec-numeral text-xs text-primary-fixed-dim">
                <span>BERLIN DEPOT {"//"} ROOM IV</span>
                <span>CURATED VAULT ENTRY</span>
              </div>
            </div>
          </div>

          {/* Right: Authentication Chamber */}
          <div className="w-full lg:w-1/2 min-h-screen bg-surface flex flex-col justify-between p-6 sm:p-12 lg:p-16 xl:p-20">
            <div className="flex items-center justify-between w-full pb-6 mb-2 border-b border-surface-container-highest">
              <div className="flex items-center space-x-2">
                <span className="font-label-mono text-label-mono uppercase text-on-surface-variant text-[11px]">PATRON TERMINAL</span>
                <span className="text-outline-variant">/</span>
                <span className="font-label-mono text-label-mono uppercase text-secondary text-[11px]">AUTH {"//"} 0.81</span>
              </div>
              <Link className="group flex items-center space-x-2 text-on-surface hover:text-primary transition-colors" href={next}>
                <span className="font-action text-action uppercase tracking-widest text-[12px]">
                  {next.startsWith("/book/") ? "Back to Reservation" : "Exit to Fleet"}
                </span>
                <Icon name="east" className="text-[16px] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="w-full max-w-md mx-auto my-auto py-8">
              <div className="mb-8">
                <div className="inline-block mb-3 px-2.5 py-1 bg-surface-container text-secondary font-label-mono text-label-mono uppercase rounded text-[10px]">
                  Private Circle Member Access
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-3">
                  {mode === "signin" ? "Welcome back." : "Request access."}
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {mode === "signin"
                    ? "Access your patron reservations, bespoke itineraries, and curated vehicle preferences."
                    : "Join the Patron Circle to keep your dossier, saved exhibits and reservations in one place."}
                </p>
              </div>

              <div role="tablist" aria-label="Account" className="grid grid-cols-2 p-1 bg-surface-container-low rounded mb-8 select-none">
                {(
                  [
                    ["signin", "Sign In"],
                    ["register", "Request Access"],
                  ] as const
                ).map(([m, label]) => (
                  <button
                    key={m}
                    type="button"
                    role="tab"
                    aria-selected={mode === m}
                    onClick={() => switchMode(m)}
                    className={
                      mode === m
                        ? "py-2.5 text-center font-action text-action rounded bg-surface-container-lowest text-on-surface transition-colors shadow-sm"
                        : "py-2.5 text-center font-action text-action rounded text-on-surface-variant hover:text-on-surface transition-colors"
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>

              {notice && (
                <div role="status" className="mb-6 p-4 bg-secondary-container/50 border-l-4 border-primary flex items-start gap-3">
                  <Icon name="info" className="text-primary text-[20px]" />
                  <div className="space-y-2">
                    <p className="font-body-sm text-body-sm text-on-surface">{notice}</p>
                    <Link href={next} className="font-action text-action text-primary underline underline-offset-4">
                      {next.startsWith("/book/") ? "Continue reservation as guest →" : "Browse the fleet →"}
                    </Link>
                  </div>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                {mode === "register" && (
                  <Field id="fullName" label="Full name" tag="AS ON LICENCE" error={errors.fullName?.message}>
                    <input
                      {...register("fullName")}
                      id="fullName"
                      autoComplete="name"
                      placeholder="Given and family name"
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? "fullName-error" : undefined}
                      className={`${fieldCls(errors.fullName)} font-body-md text-body-md`}
                    />
                  </Field>
                )}

                <Field id="email" label="Patron Identifier / Email" tag="ARCHIVE-VERIFIED" error={errors.email?.message}>
                  <div className="relative">
                    <input
                      {...register("email")}
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="patron@halden-circle.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={`${fieldCls(errors.email)} font-body-md text-body-md`}
                    />
                    <Icon name="alternate_email" className="absolute right-4 top-1/2 -translate-y-1/2 text-outline text-[18px]" />
                  </div>
                </Field>

                <Field
                  id="passcode"
                  label="Security Passcode"
                  error={errors.passcode?.message}
                  aside={
                    mode === "signin" ? (
                      <Link href="/forgot-passcode" className="font-action text-[12px] text-secondary hover:text-primary transition-colors underline underline-offset-4">
                        Forgot passcode?
                      </Link>
                    ) : (
                      <span className="font-label-mono text-label-mono text-[10px] text-outline">12+ CHARS · LETTER · NUMBER</span>
                    )
                  }
                >
                  <div className="relative">
                    <input
                      {...register("passcode")}
                      id="passcode"
                      type={show ? "text" : "password"}
                      autoComplete={mode === "signin" ? "current-password" : "new-password"}
                      placeholder="••••••••••••"
                      aria-invalid={!!errors.passcode}
                      aria-describedby={errors.passcode ? "passcode-error" : undefined}
                      className={`${fieldCls(errors.passcode)} pr-12 font-spec-numeral text-spec-numeral tracking-widest`}
                    />
                    <button
                      aria-label={show ? "Hide passcode" : "Show passcode"}
                      aria-pressed={show}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface p-1 transition-colors flex items-center justify-center"
                      type="button"
                      onClick={() => setShow((s) => !s)}
                    >
                      <Icon name={show ? "visibility_off" : "visibility"} className="text-[20px]" />
                    </button>
                  </div>
                </Field>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center space-x-3 cursor-pointer select-none group">
                    <input {...register("remember")} className="w-4 h-4 rounded-none accent-primary border border-on-surface cursor-pointer" type="checkbox" />
                    <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                      Keep terminal verified on this device
                    </span>
                  </label>
                </div>

                {formError && (
                  <p role="alert" className="font-body-sm text-body-sm text-error">
                    {formError}
                  </p>
                )}

                <button
                  className="w-full h-[52px] bg-primary text-on-primary font-action text-action uppercase tracking-widest rounded hover:bg-primary-container active:scale-[0.99] transition-all flex items-center justify-center space-x-3 group disabled:opacity-70 disabled:cursor-wait"
                  type="submit"
                  disabled={pending}
                  aria-busy={pending}
                >
                  <span>{pending ? "Verifying…" : mode === "signin" ? "Sign in to Patron Circle" : "Request patron access"}</span>
                  <Icon name="arrow_forward" className="text-[18px] group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <div className="relative my-8 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-surface-container-highest" />
                </div>
                <div className="relative px-4 bg-surface font-label-mono text-label-mono text-[10px] uppercase text-outline tracking-widest">
                  or continue via
                </div>
              </div>

              <button
                className="w-full h-[50px] bg-surface-container-lowest hover:bg-surface-container text-on-surface font-body-sm text-body-sm rounded border border-outline-variant/60 hover:border-outline transition-all flex items-center justify-center space-x-3 group"
                type="button"
                onClick={() => setNotice("Google sign-in is not available yet — sign in with your email and passcode. Nothing was sent to Google.")}
              >
                <svg className="w-4 h-4 fill-current text-on-surface" viewBox="0 0 24 24" aria-hidden>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span className="font-action text-action uppercase tracking-wider text-[12px]">Continue with Google Single-Sign</span>
              </button>

              <div className="mt-8 pt-6 border-t border-surface-container-highest text-center">
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {mode === "signin" ? "Not yet a patron?" : "Already a patron?"}
                  <button
                    type="button"
                    onClick={() => switchMode(mode === "signin" ? "register" : "signin")}
                    className="text-primary font-action text-action underline underline-offset-4 hover:text-on-surface ml-1 transition-colors"
                  >
                    {mode === "signin" ? "Create an account / Join Patron Circle →" : "Sign in →"}
                  </button>
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-surface-container-highest flex flex-col sm:flex-row items-center justify-between text-on-surface-variant gap-4">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span className="font-label-mono text-label-mono uppercase tracking-widest text-[10px] text-outline">
                  256-BIT ENCRYPTED PATRON ARCHIVE {"//"} HALDEN AG
                </span>
              </div>
              <div className="flex items-center space-x-6 font-label-mono text-label-mono text-[10px] tracking-wider uppercase">
                <Link className="hover:text-on-surface transition-colors" href="/#standard">
                  Chamber Charter
                </Link>
                <Link className="hover:text-on-surface transition-colors" href="/#about">
                  Data Protocol
                </Link>
                <a className="hover:text-on-surface transition-colors" href="tel:+41448002400">
                  Private Concierge
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({
  id,
  label,
  tag,
  aside,
  error,
  children,
}: {
  id: string;
  label: string;
  tag?: string;
  aside?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className={`block font-label-mono text-label-mono uppercase text-[11px] ${error ? "text-error" : "text-on-surface-variant"}`} htmlFor={id}>
          {label}
        </label>
        {aside ?? (tag && <span className="font-label-mono text-label-mono text-[10px] text-outline">{tag}</span>)}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 font-body-sm text-body-sm text-error">
          <Icon name="error" className="text-[16px]" />
          {error}
        </p>
      )}
    </div>
  );
}
