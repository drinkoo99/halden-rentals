"use client";

import { useState } from "react";
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
 * Request-access form state. Patron accounts are not live yet (backend phase), so a valid request is
 * acknowledged with an honest notice and nothing is stored or sent.
 */
export function useRequestAccess() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const rules = passcodeRules(pass);
  const strength = passcodeStrength(pass);
  const matches = confirm.length > 0 && confirm === pass;

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    setNotice(null);
    if (name.trim().length < 2) return setError("Enter your full name as shown on your passport.");
    if (!isEmail(email)) return setError("Enter a valid email address.");
    if (!rules.length || !rules.letter || !rules.digit) return setError("Your passcode needs 12+ characters, a letter and a number or symbol.");
    if (!matches) return setError("The two passcodes do not match.");
    if (!agree) return setError("Please accept the Custodial Charter and data protocols.");
    setError(null);
    setNotice("Thank you. Patron registration opens with the next HALDEN release — your details were not stored. You can book as a guest meanwhile.");
  }

  return { name, setName, email, setEmail, pass, setPass, confirm, setConfirm, agree, setAgree, error, notice, rules, strength, matches, submit };
}
