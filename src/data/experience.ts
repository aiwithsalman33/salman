export type Role = {
  id: string;
  /** null for the current role: the current employer is deliberately unnamed. */
  org: string | null;
  role: string;
  start: { label: string; iso: string };
  /** Omitted for the current role. */
  end?: { label: string; iso: string };
  location?: string;
  current?: boolean;
  highlights: readonly string[];
  awards?: readonly string[];
};

export const experience: readonly Role[] = [
  {
    id: "zenxai",
    org: "ZenXAI",
    role: "AI Automation Engineer",
    start: { label: "Jun 2025", iso: "2025-06" },
    end: { label: "Aug 2025", iso: "2025-08" },
    // Summary intentionally empty until the work can be described publicly (brief §4).
    highlights: [],
  },
  {
    id: "aspirentech",
    org: "Aspirentech Business Solutions",
    role: "Business Analyst, automation and product work",
    start: { label: "Aug 2025", iso: "2025-08" },
    end: { label: "Apr 2026", iso: "2026-04" },
    highlights: [
      "Contributed to business and brand growth.",
      "Built Ziya Voice over approximately six months.",
      "Worked on WhatsApp automation setups, including BOTZUP and CLWise.",
      "Contributed to client meetings, sales and marketing, Meta ads, UI/UX and social content.",
      "Supported AI automation knowledge transfer and learning.",
    ],
    awards: [
      "Best Employee of the Year (2025)",
      "Outstanding Student of the Year 2025, Dhaanish Chennai College",
    ],
  },
  {
    id: "current",
    org: null,
    role: "AI Engineer",
    start: { label: "May 2026", iso: "2026-05" },
    location: "Bengaluru, India",
    current: true,
    highlights: [
      "Internal AI WhatsApp automation for the sales team.",
      "Founder AI-avatar and Tamil and regional-language content workflows.",
      "An n8n learning module with ten practical projects.",
      "AI workflow experimentation and implementation.",
    ],
  },
];
