import type { Metadata } from "next";
import { publicMeta } from "@/lib/seo";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { MIN_DRIVER_AGE } from "@/lib/booking/driverSchema";
import { formatEuroCents, SECURITY_DEPOSIT, VAT_RATE } from "@/lib/pricing";

export const metadata: Metadata = publicMeta({ title: "Rental terms", description: "Placeholder rental terms for the HALDEN concept prototype.", path: "/terms" });

/** Rental terms — placeholder content in the editorial legal layout (no Stitch screen). */
export default function TermsPage() {
  return (
    <LegalPage
      kicker="LEGAL // RENTAL TERMS"
      title="Rental terms."
      intro="The conditions under which a HALDEN car would be reserved, handed over and returned. The figures below are the ones the prototype uses."
      updated="21 Nov 2026"
      current="/terms"
      sections={[
        {
          id: "scope",
          title: "Scope",
          body: (
            <p>
              These terms would govern rentals between <strong>[legal entity name]</strong> and the principal driver named on a reservation. In this
              prototype no contract is formed: reservations are demonstrations and are not transmitted to anyone.
            </p>
          ),
        },
        {
          id: "drivers",
          title: "Drivers",
          body: (
            <ul>
              <li>The principal driver must be at least {MIN_DRIVER_AGE} years old and hold a full licence valid in the country of travel.</li>
              <li>The physical licence is checked at the curbside handover; an International Driving Permit may be required for some licences.</li>
              <li>Additional drivers must be added as an extra and meet the same criteria.</li>
            </ul>
          ),
        },
        {
          id: "prices",
          title: "Prices and payment",
          body: (
            <>
              <p>
                Day rates are shown per vehicle. Prices include insurance, the curbside handover and the cross-border passes listed with each car;
                {` ${Math.round(VAT_RATE * 100)} %`} VAT is added to the rental and extras and shown before you confirm.
              </p>
              <p>
                Nothing is charged online. The total would be due at the handover, together with a refundable pre-authorisation of{" "}
                {formatEuroCents(SECURITY_DEPOSIT)} on the driver&apos;s payment card. <strong>[Payment methods to be confirmed.]</strong>
              </p>
            </>
          ),
        },
        {
          id: "changes",
          title: "Changes and cancellation",
          body: (
            <ul>
              <li>Reservations may be changed or cancelled from the patron account.</li>
              <li>Cancellation would be free of charge up to <strong>[48 hours]</strong> before the handover time. <strong>[Late-cancellation fee to be defined.]</strong></li>
              <li>Changes depend on availability and may change the total.</li>
            </ul>
          ),
        },
        {
          id: "handover",
          title: "Handover and return",
          body: (
            <p>
              Cars are handed over and returned at the selected hub within its handover window. The car must be returned in the condition it was
              received, apart from normal wear. <strong>[Fuel, mileage, late-return and cleaning rules to be defined.]</strong>
            </p>
          ),
        },
        {
          id: "liability",
          title: "Insurance and liability",
          body: (
            <p>
              Every rental would include third-party and comprehensive cover. The optional zero-excess waiver reduces the excess to €0.{" "}
              <strong>[Standard excess, exclusions and claims procedure to be provided by the insurer.]</strong>
            </p>
          ),
        },
        {
          id: "law",
          title: "Governing law",
          body: (
            <p>
              <strong>[Governing law and place of jurisdiction to be determined.]</strong> Questions can be sent through the{" "}
              <Link className="text-primary underline underline-offset-4" href="/about#contact">
                concierge enquiry form
              </Link>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
