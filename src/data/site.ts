export const site = {
  name: "Salman",
  brand: "AI With Salman",
  role: "AI Engineer at Axxeler",
  // Set NEXT_PUBLIC_SITE_URL once the domain is chosen; canonical URL and OG URLs depend on it.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? null,
  seo: {
    title: "Salman | AI Engineer: AI Agents, Automation & SaaS",
    description:
      "Salman is an AI Engineer building AI agents, n8n automations, SaaS products and AI content workflows that turn business processes into intelligent workflows.",
  },
} as const;

/** Page sections in scroll order. The trajectory rail and the 3D camera path both read this. */
export const sections = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "automation", label: "Automation Lab" },
  { id: "products", label: "Product Universe" },
  { id: "solutions", label: "Solutions Hub" },
  { id: "studio", label: "Creator Studio" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "creator", label: "Creator" },
  { id: "milestones", label: "Milestones" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const sectionIds: readonly SectionId[] = sections.map((s) => s.id);

export const sectionIndex = (id: SectionId) => sectionIds.indexOf(id);

/** Primary navigation. Work also opens a submenu of the four categories. */
export const navItems: readonly { id: SectionId; label: string }[] = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "creator", label: "Creator" },
  { id: "contact", label: "Contact" },
];
