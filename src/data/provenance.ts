/**
 * Who a piece of work was done for. Shown on every project so employer work,
 * learning material and independent work are never confused (brief §4, §16).
 * The current employer is deliberately unnamed.
 */
export type Provenance =
  | { kind: "employer"; label: string }
  | { kind: "learning"; label: string }
  | { kind: "independent"; label: string };

export const provenance = {
  aspirentech: { kind: "employer", label: "Employer project · Aspirentech" },
  currentRole: { kind: "employer", label: "Employer project · current role" },
  currentRoleLearning: { kind: "learning", label: "Learning module · current role" },
  independent: { kind: "independent", label: "Independent / freelance" },
} as const satisfies Record<string, Provenance>;
