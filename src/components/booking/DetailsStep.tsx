"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Children, cloneElement, isValidElement } from "react";
import { useForm, useWatch, type FieldError } from "react-hook-form";
import { useBooking } from "@/components/booking/BookingProvider";
import { Icon } from "@/components/ui/Icon";
import { ageOn, driverSchema, licenceCountries, MIN_DRIVER_AGE, parseDob, type DriverDetails } from "@/lib/booking/driverSchema";
import { formatEuroCents, SECURITY_DEPOSIT } from "@/lib/pricing";

/** Booking step 04 · Details — Stitch screen 22. Validated with zod; error styling follows the design's phone-field state. */
export function DetailsStep() {
  const router = useRouter();
  const { vehicle: v, state, update, pickup } = useBooking();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
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

  function onSubmit(values: DriverDetails) {
    update({ driver: values, mode: "guest" });
    router.push(`/book/${v.slug}/review`);
  }

  return (
    <div className="flex flex-col w-full">
      <div className="space-y-3 pb-8">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-label-mono text-label-mono uppercase tracking-[0.2em] text-outline">STEP 04 / 06 · PATRON DOSSIER</span>
          <span className="w-1.5 h-1.5 bg-primary" />
          <span className="font-label-mono text-label-mono uppercase text-secondary">
            ARCHIVE REF. #HLD-{pickup.code}-{v.exhibit}
          </span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface">Principal driver identification.</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
          HALDEN vehicles are reserved exclusively for licensed patrons aged {MIN_DRIVER_AGE} and above with at least 3 years of verified driving
          experience.
        </p>
      </div>

      {/* Account Choice */}
      <div className="mb-10 p-1 bg-surface-container-low flex flex-col sm:flex-row gap-1" role="radiogroup" aria-label="How would you like to continue?">
        <button type="button" role="radio" aria-checked="true" className="flex-1 py-3 px-5 text-left bg-surface-container-lowest flex items-center justify-between transition-colors">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 bg-primary flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-surface-container-lowest" />
            </span>
            <span className="font-action text-action uppercase tracking-wider text-on-surface">Enter driver details</span>
          </div>
          <span className="font-label-mono text-label-mono text-outline">SIGN IN TO CONFIRM</span>
        </button>
        <Link
          role="radio"
          aria-checked="false"
          href={`/sign-in?next=/book/${v.slug}/details`}
          className="flex-1 py-3 px-5 text-left bg-transparent hover:bg-surface-container flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 bg-surface-container-high flex items-center justify-center" />
            <span className="font-action text-action uppercase tracking-wider text-on-surface-variant">Sign in to HALDEN Patron Circle</span>
          </div>
          <span className="font-label-mono text-label-mono text-outline">SAVED DOSSIER</span>
        </Link>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <Field id="firstName" label="First Name (Legal)" tag="PASSPORT / ID MATCH" error={errors.firstName}>
            <input
              {...register("firstName")}
              id="firstName"
              autoComplete="given-name"
              placeholder="Given name"
              className={inputCls(errors.firstName)}
            />
          </Field>
          <Field id="lastName" label="Last Name (Legal)" tag="SURNAME" error={errors.lastName}>
            <input
              {...register("lastName")}
              id="lastName"
              autoComplete="family-name"
              placeholder="Family name"
              className={inputCls(errors.lastName)}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <Field
            id="email"
            label="Official Dispatch Email"
            tag="CONFIRMATION DESTINATION"
            error={errors.email}
            hint="Booking confirmation and handover instructions will be transmitted here."
          >
            <input
              {...register("email")}
              id="email"
              type="email"
              autoComplete="email"
              placeholder="name@domain.com"
              className={inputCls(errors.email)}
            />
          </Field>
          <Field id="phone" label="Mobile Phone Number" tag="FOR CURBSIDE SMS" error={errors.phone} icon="phone_in_talk">
            <input
              {...register("phone")}
              id="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="+41 79 000 0000"
              className={inputCls(errors.phone)}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <Field
            id="dob"
            label="Date of Birth (DD / MM / YYYY)"
            tag={age != null ? `AGE: ${age}` : "28+ ONLY"}
            tagStrong={age != null && age >= MIN_DRIVER_AGE}
            error={errors.dob}
            icon="calendar_today"
            iconAfter
            hint={`Patrons must be ${MIN_DRIVER_AGE}+ years of age for executive and performance archival classes.`}
          >
            <input
              {...register("dob")}
              id="dob"
              autoComplete="bday"
              inputMode="numeric"
              placeholder="DD / MM / YYYY"
              className={inputCls(errors.dob)}
            />
          </Field>
          <Field
            id="licenceCountry"
            label="Licence Country of Issue"
            tag="VALIDATION REGION"
            error={errors.licenceCountry as FieldError | undefined}
            hint="Original physical licence card must be presented upon curbside handover."
          >
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-2 pointer-events-none">
                <span className="font-label-mono text-label-mono px-1.5 py-0.5 bg-surface-container text-on-surface font-semibold">
                  {country?.code === "OTHER" ? "IDP" : country?.code}
                </span>
                <span className="font-spec-numeral text-spec-numeral text-on-surface">{country?.label}</span>
              </div>
              <Icon name="expand_more" className="text-outline text-[18px]" />
              <select {...register("licenceCountry")} id="licenceCountry" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                {licenceCountries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <Field
            id="licenceNumber"
            label="Driving Licence Number"
            tag="MIN. 3 YRS VALID"
            error={errors.licenceNumber}
            hint="Checked against the physical licence at curbside handover."
          >
            <input
              {...register("licenceNumber")}
              id="licenceNumber"
              autoComplete="off"
              placeholder="LICENCE ID"
              className={`${inputCls(errors.licenceNumber)} uppercase tracking-wider`}
            />
          </Field>
          <Field id="notes" label="Concierge & Arrival Notes" tag="OPTIONAL" error={errors.notes}>
            <textarea
              {...register("notes")}
              id="notes"
              rows={2}
              placeholder="Add flight numbers, arrival gate, or curbside notes..."
              className={`${inputCls(errors.notes)} resize-none`}
            />
          </Field>
        </div>

        {/* Security Protocol */}
        <div className="bg-surface-container-low p-6 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Icon name="verified_user" className="text-primary text-[20px]" />
              <span className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface font-semibold">
                SECURITY PROTOCOL &amp; MANDATORY PRE-AUTHORISATION
              </span>
            </div>
            <span className="font-label-mono text-label-mono text-outline">PROTOCOL 14-B</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            A pre-authorisation security hold of <span className="font-bold text-on-surface">{formatEuroCents(SECURITY_DEPOSIT)}</span> will be
            ringfenced on your primary credit card upon curbside physical vehicle handover. This authorization is automatically revoked upon
            seamless return inspection at {pickup.label}.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 bg-surface-container-high/40 p-3">
            {["Zero Deductible Included", "No Physical Paperwork", "Digital Key Release"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <Icon name="check_circle" className="text-primary text-[16px]" />
                <span className="font-label-mono text-label-mono uppercase text-on-surface">{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <Link
            className="font-action text-action uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 py-3"
            href={`/book/${v.slug}/extras`}
          >
            <Icon name="west" className="text-[16px]" />
            Back to Extras
          </Link>
          <button
            className="w-full sm:w-auto bg-primary text-on-primary px-8 py-3.5 font-action text-action uppercase tracking-widest flex items-center justify-center gap-3 transition-colors hover:bg-primary-container disabled:opacity-60"
            type="submit"
            disabled={isSubmitting}
          >
            Continue to Review
            <Icon name="east" className="text-[18px]" />
          </button>
        </div>
      </form>
    </div>
  );
}

function inputCls(error?: FieldError) {
  return `w-full bg-transparent font-spec-numeral text-spec-numeral focus:outline-none ${error ? "text-error font-medium" : "text-on-surface"}`;
}

/** Form field shell matching screen 22: mono label + right-hand tag, white well, error state as on the phone field. */
function Field({
  id,
  label,
  tag,
  tagStrong,
  error,
  hint,
  icon,
  iconAfter,
  children,
}: {
  id: string;
  label: string;
  tag: string;
  tagStrong?: boolean;
  error?: FieldError;
  hint?: string;
  icon?: string;
  iconAfter?: boolean;
  children: React.ReactNode;
}) {
  const errId = `${id}-error`;
  const hintId = `${id}-hint`;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline gap-3">
        <label className={`font-label-mono text-label-mono uppercase tracking-wider block ${error ? "text-error" : "text-on-surface"}`} htmlFor={id}>
          {label}
        </label>
        {error ? (
          <span className="font-label-mono text-label-mono uppercase text-on-error bg-error px-1.5 py-0.5 shrink-0">REQUIRED</span>
        ) : (
          <span className={`font-label-mono text-label-mono shrink-0 ${tagStrong ? "text-primary font-bold" : "text-outline"}`}>{tag}</span>
        )}
      </div>
      <div
        className={`p-3 focus-within:outline-2 focus-within:outline-primary focus-within:-outline-offset-2 ${error ? "bg-error-container/40" : "bg-surface-container-lowest"}`}
      >
        <div className={`flex items-center gap-2 ${iconAfter ? "flex-row-reverse justify-between" : ""}`}>
          {icon && <Icon name={icon} className={`text-[18px] shrink-0 ${error ? "text-error" : "text-outline"}`} />}
          <DescribedBy id={error ? errId : hint ? hintId : undefined} invalid={!!error}>
            {children}
          </DescribedBy>
        </div>
      </div>
      {error ? (
        <div className="flex items-start gap-1.5 p-2 bg-error-container/30 text-on-error-container" id={errId} role="alert">
          <Icon name="error" className="text-[16px] text-error shrink-0" />
          <p className="font-body-sm text-body-sm text-error">{error.message}</p>
        </div>
      ) : (
        hint && (
          <p id={hintId} className="font-label-mono text-label-mono text-outline">
            {hint}
          </p>
        )
      )}
    </div>
  );
}


/** Adds aria-describedby / aria-invalid to the field's input element. */
function DescribedBy({ id, invalid, children }: { id?: string; invalid: boolean; children: React.ReactNode }) {
  return (
    <>
      {Children.map(children, (child) => {
        if (!isValidElement<{ "aria-describedby"?: string; "aria-invalid"?: boolean }>(child) || (child.type !== "input" && child.type !== "textarea")) return child;
        return cloneElement(child, { "aria-describedby": id, "aria-invalid": invalid || undefined });
      })}
    </>
  );
}
