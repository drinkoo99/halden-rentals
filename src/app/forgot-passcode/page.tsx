import type { Metadata } from "next";
import { ForgotPasscodeMobile } from "@/components/auth/ForgotPasscodeMobile";
import { ForgotPasscodeDesktop } from "@/components/auth/ForgotPasscodeDesktop";

export const metadata: Metadata = { title: "Forgot passcode — Patron Circle", robots: { index: false } };

/** Stitch "Forgot Passcode & Recovery (Desktop)" and "Mobile: Forgot Passcode (B)". */
export default function Page() {
  return (
    <>
      <ForgotPasscodeMobile />
      <ForgotPasscodeDesktop />
    </>
  );
}
