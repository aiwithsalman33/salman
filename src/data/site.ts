export const site = {
  name: "Salman",
  brand: "AI With Salman",
  role: "AI Engineer & Automation Builder",
  // Set NEXT_PUBLIC_SITE_URL once the domain is chosen; canonical URL and OG URLs depend on it.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? null,
  seo: {
    title: "Salman | AI Engineer, Automation Builder & Creative Technologist",
    description:
      "Salman is an AI engineer and automation builder creating AI agents, voice experiences, WhatsApp automations and intelligent business workflows.",
  },
} as const;

/** Page sections in scroll order. The trajectory rail and (later) the 3D camera path both read this. */
export const sections = [
  { id: "top", label: "Intro" },
  { id: "about", label: "About" },
  { id: "capabilities", label: "Capabilities" },
  { id: "work", label: "Work" },
  { id: "journey", label: "Journey" },
  { id: "skills", label: "Skills" },
  { id: "creator", label: "Creator" },
  { id: "milestones", label: "Milestones" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const sectionIds: readonly SectionId[] = sections.map((s) => s.id);

/** Primary navigation, in the order the brief specifies (§9). */
export const navItems: readonly { id: SectionId; label: string }[] = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "capabilities", label: "Capabilities" },
  { id: "journey", label: "Journey" },
  { id: "creator", label: "Creator" },
  { id: "contact", label: "Contact" },
];
