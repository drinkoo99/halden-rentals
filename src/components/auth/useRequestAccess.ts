"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerAction } from "@/app/actions/auth";
import { refreshSession } from "@/lib/session";
import { isEmail } from "@/lib/useCountdown";

/** Passcode rules from the Stitch request-access screens: 12+ characters, a letter, a number or symbol. */
export function passcodeRules(p: string) {
  return { length: p.length >= 12, letter: /[A-Za-z]/.test(p), digit: /[\d\W_]/.test(p) };
}

/** 0–4 strength segments for the 4-segment meter. */
export function passcodeStrength(p: string) {
  if (!p) return 0;
  const r = passcodeRules(p);
  let score = [r.length, r.letter, r.digit].filter(Boolean).length;
  if (r.length && p.length >= 16 && /[A-Z]/.test(p) && /[a-z]/.test(p)) score++;
  return Math.min(4, score);
}
export const strengthLabel = ["", "WEAK", "FAIR", "STRONG", "EXCELLENT STRENGTH"] as const;

/**
 * Request-access (registration) form state. The browser checks the rules for instant feedback; the server
 * (registerAction) validates again, creates a customer account, signs the patron in and opens the account.
 */
export function useRequestAccess() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const rules = passcodeRules(pass);
  const strength = passcodeStrength(pass);
  const matches = confirm.length > 0 && confirm === pass;

  async function submit(e?: React.FormEvent) {
    e?.preventDefault();
    setNotice(null);
    if (name.trim().length < 2) return setError("Enter your full name as shown on your passport.");
    if (!isEmail(email)) return setError("Enter a valid email address.");
    if (!rules.length || !rules.letter || !rules.digit) return setError("Your passcode needs 12+ characters, a letter and a number or symbol.");
    if (!matches) return setError("The two passcodes do not match.");
    if (!agree) return setError("Please accept the Custodial Charter and data protocols.");
    setError(null);
    if (pending) return;
    setPending(true);
    const res = await registerAction({ name, email, password: pass });
    if (res.ok) {
      await refreshSession();
      router.replace(res.redirectTo ?? "/account");
      router.refresh();
      return;
    }
    setPending(false);
    setError(res.fieldErrors ? (Object.values(res.fieldErrors)[0] ?? res.error) : res.error);
  }

  return { name, setName, email, setEmail, pass, setPass, confirm, setConfirm, agree, setAgree, error, notice, rules, strength, matches, submit, pending };
}
