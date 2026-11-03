export type Role = {
  id: string;
  org: string;
  role: string;
  /** Omitted when the exact start date isn't confirmed; the timeline then shows no date. */
  start?: { label: string; iso: string };
  /** Omitted for the current role. */
  end?: { label: string; iso: string };
  current?: boolean;
  /** One-line focus statement, used where no individual highlights are confirmed. */
  focus?: string;
  highlights: readonly string[];
};

export const experience: readonly Role[] = [
  {
    id: "zenxai",
    org: "ZenXAI",
    role: "AI Automation Engineer",
    start: { label: "Jun 2025", iso: "2025-06" },
    end: { label: "Aug 2025", iso: "2025-08" },
    highlights: [],
  },
  {
    id: "aspirentech",
    org: "Aspirentech Business Solutions",
    role: "Business Analyst, automation and product work",
    start: { label: "Aug 2025", iso: "2025-08" },
    end: { label: "Apr 2026", iso: "2026-04" },
    highlights: [
      "Built Ziya Voice from scratch over approximately six months.",
      "Worked on WhatsApp automation setup involving BOTZUP and CLWise.",
      "Contributed to AI automation, product and UI work, marketing and business operations.",
      "Awarded Best Employee of the Year 2025.",
    ],
  },
  {
    id: "axxeler",
    org: "Axxeler",
    role: "AI Engineer",
    // Start date not confirmed, so none is shown.
    current: true,
    focus: "AI engineering, business automation, intelligent systems, AI agents and product development.",
    highlights: [],
  },
];
