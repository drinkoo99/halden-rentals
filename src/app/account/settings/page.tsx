import { requireUser } from "@/server/auth/session";
import type { Metadata } from "next";
import { AccountSettingsMobile } from "@/components/account/AccountSettingsMobile";
import { AccountSettingsDesktop } from "@/components/account/AccountSettingsDesktop";

export const metadata: Metadata = { title: "Patron Circle — Settings", robots: { index: false } };

/** Stitch "Patron Circle: Account Settings" and "Mobile: Patron Settings". */
export default async function Page() {
  const user = await requireUser("/account/settings"); // verified by the layout's gate; cached per request
  return (
    <>
      <AccountSettingsMobile name={user.name} email={user.email} emailVerified={user.emailVerified} />
      <AccountSettingsDesktop name={user.name} email={user.email} emailVerified={user.emailVerified} />
    </>
  );
}
