import type { Metadata } from "next";
import { AccountSettingsMobile } from "@/components/account/AccountSettingsMobile";
import { AccountSettingsDesktop } from "@/components/account/AccountSettingsDesktop";

export const metadata: Metadata = { title: "Patron Circle — Settings", robots: { index: false } };

/** Stitch "Patron Circle: Account Settings" and "Mobile: Patron Settings". */
export default function Page() {
  return (
    <>
      <AccountSettingsMobile />
      <AccountSettingsDesktop />
    </>
  );
}
