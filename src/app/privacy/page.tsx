import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How the HALDEN concept prototype handles personal data (placeholder privacy notice).",
};

/**
 * Privacy notice — placeholder content. The storage it describes is what the prototype really does:
 * booking drafts in sessionStorage, saved cars / demo reservation state / cookie choice in localStorage.
 */
export default function PrivacyPage() {
  return (
    <LegalPage
      kicker="LEGAL // PRIVACY"
      title="Privacy notice."
      intro="What this prototype stores, where, and for how long. In short: everything you type stays in your own browser."
      updated="21 Nov 2026"
      current="/privacy"
      sections={[
        {
          id: "controller",
          title: "Who is responsible",
          body: (
            <p>
              The controller would be <strong>[legal entity name, address]</strong>, reachable at <strong>[privacy contact email]</strong>. See the{" "}
              <Link className="text-primary underline underline-offset-4" href="/imprint">
                imprint
              </Link>
              .
            </p>
          ),
        },
        {
          id: "what-we-store",
          title: "What the prototype stores",
          body: (
            <ul>
              <li>
                <strong>Booking drafts</strong> (trip, extras, driver details) are kept in your browser&apos;s session storage so a refresh does not lose
                them. They are deleted when the tab is closed and are never sent to a server.
              </li>
              <li>
                <strong>Saved cars</strong>, the state of the demo reservation and your cookie choice are kept in your browser&apos;s local storage until
                you clear it.
              </li>
              <li>
                <strong>Forms</strong> (sign-in, request access, enquiries, newsletter) are validated in the browser and then discarded; nothing is
                stored or emailed.
              </li>
            </ul>
          ),
        },
        {
          id: "third-parties",
          title: "Third parties",
          body: (
            <p>
              The site is served by <strong>[hosting provider]</strong>. The Material Symbols icon font is loaded from Google Fonts, which means your
              browser requests it from Google&apos;s servers. Text fonts are served from this site. There is no analytics or advertising tracking.
            </p>
          ),
        },
        {
          id: "cookies",
          title: "Cookies and similar storage",
          body: (
            <p>
              The prototype only uses the browser storage described above, which is necessary for the features you use. Your cookie choice is
              remembered and can be changed at any time from the &ldquo;Cookie preferences&rdquo; link in the footer.
            </p>
          ),
        },
        {
          id: "rights",
          title: "Your rights",
          body: (
            <p>
              Under the GDPR you would have the right to access, correct, delete and port your data and to object to its processing.{" "}
              <strong>[Procedure and supervisory authority to be added.]</strong> Because the prototype keeps data only in your browser, clearing your
              browser data removes all of it.
            </p>
          ),
        },
      ]}
    />
  );
}
