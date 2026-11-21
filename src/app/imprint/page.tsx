import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Imprint",
  description: "Imprint for the HALDEN concept prototype (placeholder).",
};

/** Imprint — every company detail is a placeholder until a real operator exists. */
export default function ImprintPage() {
  return (
    <LegalPage
      kicker="LEGAL // IMPRINT"
      title="Imprint."
      intro="HALDEN is a portfolio concept. The details below are placeholders for the information a real operator must publish."
      updated="21 Nov 2026"
      current="/imprint"
      sections={[
        {
          id: "operator",
          title: "Operator",
          body: (
            <ul>
              <li>
                <strong>[Company name and legal form]</strong>
              </li>
              <li>[Street and number], [postcode] [city], [country]</li>
              <li>Represented by [managing director]</li>
            </ul>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          body: (
            <ul>
              <li>Email: [contact email]</li>
              <li>Phone: [phone number]</li>
            </ul>
          ),
        },
        {
          id: "register",
          title: "Register and tax",
          body: (
            <ul>
              <li>Commercial register: [court], [registration number]</li>
              <li>VAT ID: [VAT identification number]</li>
            </ul>
          ),
        },
        {
          id: "content",
          title: "Content and imagery",
          body: (
            <p>
              The interface was designed in Google Stitch and built for this portfolio. Photography is AI-generated in Stitch and upscaled; cars,
              people and places shown are illustrative. Vehicle names belong to their manufacturers; no affiliation is implied.
            </p>
          ),
        },
      ]}
    />
  );
}
