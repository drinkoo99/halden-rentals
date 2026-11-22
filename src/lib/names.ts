/** "Clara von Bergmann" → "Clara V." (the patron menu label). */
export function shortName(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.` : parts[0];
}

/** "Clara von Bergmann" → "Clara" (greetings). */
export const firstName = (name: string) => name.trim().split(/\s+/)[0];
