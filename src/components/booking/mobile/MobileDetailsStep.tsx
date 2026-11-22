"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch, type FieldError, type UseFormRegisterReturn } from "react-hook-form";
import { useBooking } from "@/components/booking/BookingProvider";
import { MobileBookingBar, MobileBookingHeader, MobileSheet } from "@/components/booking/mobile/MobileBookingChrome";
import { ageOn, driverSchema, licenceCountries, MIN_DRIVER_AGE, parseDob, type DriverDetails } from "@/lib/booking/driverSchema";

/** Mobile booking step 04 · Details — Stitch "Mobile Booking: Details (Step 3)". Same rules as desktop. */
export function MobileDetailsStep() {
  const router = useRouter();
  const { vehicle: v, state, update } = useBooking();
  const [sheet, setSheet] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm<DriverDetails>({
    resolver: zodResolver(driverSchema),
    mode: "onTouched",
    defaultValues: state.driver ?? {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      licenceCountry: "CHE",
      licenceNumber: "",
      notes: "",
    },
  });
  const dobValue = useWatch({ control, name: "dob" });
  const countryCode = useWatch({ control, name: "licenceCountry" });
  const dob = parseDob(dobValue ?? "");
  const age = dob ? ageOn(dob) : null;
  const country = licenceCountries.find((c) => c.code === countryCode);
  const ok = (k: keyof DriverDetails) => (!!dirtyFields[k] || !!state.driver) && !errors[k];

  const submit = handleSubmit((values) => {
    update({ driver: values, mode: "guest" });
    router.push(`/book/${v.slug}/review`);
  });

  return (
    <div className="md:hidden bg-background text-on-surface antialiased flex flex-col min-h-screen">
      <MobileBookingHeader step={4} subtitle="Identity & Verification" />
      <div className="flex flex-col relative w-full pt-28 bg-surface min-h-screen">
        <div className="flex flex-col w-full pb-32">
          <section className="px-gutter-mobile pt-6 pb-5 flex flex-col gap-2 bg-surface">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary" />
              <span className="font-label-mono text-label-mono uppercase tracking-[0.14em] text-primary">{"STEP 04 // PATRON IDENTIFICATION"}</span>
            </div>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight font-normal">Patron Details</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm font-light leading-relaxed">
              Enter the principal driver’s details for the insurance dossier and the curbside handover.
            </p>
          </section>
          <section className="px-gutter-mobile pb-6 bg-surface">
            <div aria-label="How would you like to continue" className="p-1 bg-surface-container flex items-center gap-1 rounded-[2px]">
              <span className="flex-1 h-9 flex items-center justify-center bg-primary text-on-primary font-action text-action uppercase tracking-[0.06em] rounded-[2px]" aria-current="true">
                Driver details
              </span>
              <Link
                className="flex-1 h-9 flex items-center justify-center bg-transparent text-on-surface-variant hover:text-on-surface font-action text-action uppercase tracking-[0.06em] transition-all rounded-[2px]"
                href={`/sign-in?next=${encodeURIComponent(`/book/${v.slug}/details`)}`}
              >
                Sign in
              </Link>
            </div>
          </section>
          <section className="px-gutter-mobile pb-6 bg-surface">
            <div className="bg-surface-container-low p-4 flex gap-3.5 items-start rounded-[2px]">
              <span className="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0" aria-hidden>
                verified_user
              </span>
              <div className="flex flex-col gap-1 min-w-0">
                <span className="font-label-mono text-label-mono uppercase tracking-wider text-primary font-medium">INSURANCE COMPLIANCE DOSSIER</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                  Patrons must be {MIN_DRIVER_AGE} or older. The physical licence is checked at the curbside handover.
                </span>
              </div>
            </div>
          </section>
          <form className="px-gutter-mobile flex flex-col gap-5 bg-surface" noValidate onSubmit={submit}>
            <Field id="m-firstName" label="LEGAL FORENAME" tag="PASSPORT ID" error={errors.firstName} valid={ok("firstName")} input={register("firstName")} autoComplete="given-name" />
            <Field id="m-lastName" label="LEGAL SURNAME" tag="PASSPORT ID" error={errors.lastName} valid={ok("lastName")} input={register("lastName")} autoComplete="family-name" />
            <Field id="m-email" label="CUSTODIAL EMAIL" tag="FOR DOSSIER & KEYS" error={errors.email} valid={ok("email")} input={register("email")} type="email" autoComplete="email" />
            <Field id="m-phone" label="MOBILE TELEPHONE" tag="+ COUNTRY CODE" error={errors.phone} valid={ok("phone")} input={register("phone")} type="tel" autoComplete="tel" placeholder="+41 79 123 4567" />
            <div className="flex flex-col gap-1.5">
              <Field
                id="m-dob"
                label="DATE OF BIRTH"
                tag="NUMERIC DD/MM/YYYY"
                error={errors.dob}
                valid={ok("dob")}
                input={register("dob")}
                inputMode="numeric"
                placeholder="DD / MM / YYYY"
                mono
                validIcon="verified"
              />
              {!errors.dob && (
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="material-symbols-outlined text-primary text-[14px]" aria-hidden>
                    shield
                  </span>
                  <span className="font-label-mono text-[10.5px] uppercase tracking-wider font-medium text-primary">
                    {age !== null && age >= MIN_DRIVER_AGE ? `AGE: ${age} // MINIMUM AGE VERIFIED (${MIN_DRIVER_AGE}+)` : `MINIMUM AGE ${MIN_DRIVER_AGE}`}
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="font-label-mono text-label-mono uppercase tracking-wider text-on-surface" id="m-licence-label">
                  DRIVING LICENCE ISSUING COUNTRY
                </span>
              </div>
              <button
                aria-haspopup="dialog"
                aria-labelledby="m-licence-label m-licence-value"
                className="w-full h-[52px] px-3.5 bg-surface-container-lowest rounded-[2px] flex items-center justify-between text-left hover:bg-surface-bright transition-colors group"
                onClick={() => setSheet(true)}
                type="button"
              >
                <span className="flex items-center gap-2.5 truncate">
                  <span className="min-w-5 h-3.5 px-0.5 bg-surface-container flex items-center justify-center text-[10px] font-bold text-on-surface-variant font-label-mono shrink-0">
                    {countryCode === "OTHER" ? "IDP" : countryCode.slice(0, 2)}
                  </span>
                  <span className="font-body-md text-on-surface text-[15px] truncate" id="m-licence-value">
                    {country?.label ?? "Select country"}
                  </span>
                </span>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-[20px] shrink-0" aria-hidden>
                  expand_more
                </span>
              </button>
            </div>
            <Field
              id="m-licenceNumber"
              label="LICENCE NUMBER"
              tag="AS PRINTED ON CARD"
              error={errors.licenceNumber}
              valid={ok("licenceNumber")}
              input={register("licenceNumber")}
              autoComplete="off"
              mono
            />
            <span className="font-label-mono text-[10px] uppercase text-on-surface-variant tracking-wider -mt-3">
              PHYSICAL LICENCE PRESENTATION REQUIRED AT THE HANDOVER
            </span>
            <div className="mt-2 p-3.5 bg-surface-container flex items-start gap-2.5 rounded-[2px]">
              <span className="material-symbols-outlined text-on-surface-variant text-[16px] mt-0.5" aria-hidden>
                lock_clock
              </span>
              <p className="font-body-sm text-[12px] leading-relaxed text-on-surface-variant">
                Concept prototype: your details stay in this browser session and are not sent anywhere.
              </p>
            </div>
            {/* lets the keyboard "Go" key submit */}
            <button type="submit" className="sr-only" tabIndex={-1}>
              Continue to review
            </button>
          </form>
        </div>
      </div>
      <MobileBookingBar caption="Estimated Valuation" label="Continue to review" onAction={() => void submit()} />
      {sheet && (
        <MobileSheet title="Licence Jurisdiction" kicker="Archive Register" onClose={() => setSheet(false)} labelledBy="m-licence-sheet-title">
          <CountryList
            current={countryCode}
            onPick={(code) => {
              setValue("licenceCountry", code, { shouldDirty: true, shouldValidate: true });
              setSheet(false);
            }}
          />
        </MobileSheet>
      )}
    </div>
  );
}

function Field({
  id,
  label,
  tag,
  error,
  valid,
  input,
  type = "text",
  autoComplete,
  inputMode,
  placeholder,
  mono,
  validIcon = "check_circle",
}: {
  id: string;
  label: string;
  tag: string;
  error?: FieldError;
  valid: boolean;
  input: UseFormRegisterReturn;
  type?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string;
  mono?: boolean;
  validIcon?: string;
}) {
  const errId = `${id}-error`;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <label className={`font-label-mono text-label-mono uppercase tracking-wider ${error ? "text-error font-medium" : "text-on-surface"}`} htmlFor={id}>
          {label}
        </label>
        <span
          className={`font-label-mono text-[10px] tracking-widest uppercase px-1.5 py-0.5 rounded-[2px] ${
            error ? "text-on-error-container bg-error-container font-bold" : "text-on-surface-variant bg-surface-container"
          }`}
        >
          {error ? "REQUIRED // CHECK FORMAT" : tag}
        </span>
      </div>
      <div className={`relative rounded-[2px] transition-colors ${error ? "bg-error-container/30" : "bg-surface-container-lowest focus-within:bg-surface-bright"}`}>
        <input
          {...input}
          aria-describedby={error ? errId : undefined}
          aria-invalid={!!error}
          autoComplete={autoComplete}
          className={`w-full h-[52px] pl-3.5 pr-10 bg-transparent text-on-surface outline-hidden rounded-[2px] ${mono ? "font-spec-numeral text-[15px]" : "font-body-md text-[16px]"}`}
          id={id}
          inputMode={inputMode}
          placeholder={placeholder}
          type={type}
        />
        {(error || valid) && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
            <span className={`material-symbols-outlined ${error ? "text-error text-[20px]" : "text-primary text-[18px]"}`} aria-hidden>
              {error ? "error" : validIcon}
            </span>
          </div>
        )}
      </div>
      {error && (
        <div className="flex items-start gap-1.5 pt-0.5 text-error" id={errId}>
          <span className="material-symbols-outlined text-[15px] shrink-0" aria-hidden>
            info
          </span>
          <span className="font-body-sm text-[12px] leading-tight">{error.message}</span>
        </div>
      )}
    </div>
  );
}

function CountryList({ current, onPick }: { current: string; onPick: (code: DriverDetails["licenceCountry"]) => void }) {
  const [q, setQ] = useState("");
  const list = licenceCountries.filter((c) => c.label.toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <>
      <div className="px-gutter-mobile py-2">
        <div className="h-11 px-3 bg-surface-container-lowest flex items-center gap-2 rounded-[2px]">
          <span className="material-symbols-outlined text-on-surface-variant text-[18px]" aria-hidden>
            search
          </span>
          <input
            aria-label="Filter countries"
            className="w-full bg-transparent font-body-sm text-on-surface text-[16px] outline-hidden"
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter country or territory..."
            type="text"
            value={q}
          />
        </div>
      </div>
      <div className="overflow-y-auto px-gutter-mobile py-2 pb-6 flex flex-col gap-1 max-h-[442px]">
        {list.map((c) => {
          const on = c.code === current;
          return (
            <button
              key={c.code}
              aria-pressed={on}
              className={`flex items-center justify-between p-3.5 transition-colors text-left rounded-[2px] group ${
                on ? "bg-surface-container-low hover:bg-surface-container" : "bg-surface-container-lowest hover:bg-surface-container-low"
              }`}
              onClick={() => onPick(c.code)}
              type="button"
            >
              <span className="flex items-center gap-3">
                <span
                  className={`font-label-mono text-label-mono px-2 py-0.5 ${on ? "font-bold text-primary bg-surface" : "text-on-surface-variant bg-surface-container"}`}
                >
                  {c.code === "OTHER" ? "IDP" : c.code.slice(0, 2)}
                </span>
                <span className="font-body-md text-on-surface">{c.label}</span>
              </span>
              <span className={`material-symbols-outlined text-[20px] ${on ? "text-primary" : "text-transparent group-hover:text-on-surface-variant"}`} aria-hidden>
                check
              </span>
            </button>
          );
        })}
        {list.length === 0 && <p className="font-body-sm text-body-sm text-on-surface-variant p-3.5">No country matches “{q}”.</p>}
      </div>
    </>
  );
}
