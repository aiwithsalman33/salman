export type Achievement = { id: string; title: string; detail: string };

// Wording follows brief §7 and §16 exactly. No certificates or badges until real ones are supplied.
export const achievements: readonly Achievement[] = [
  { id: "best-employee", title: "Best Employee of the Year", detail: "2025" },
  { id: "outstanding-student", title: "Outstanding Student of the Year", detail: "2025, Dhaanish Chennai College" },
  { id: "ziya", title: "Built Ziya Voice from scratch over approximately six months", detail: "Aspirentech" },
  { id: "n8n", title: "Created an n8n learning module with ten practical projects", detail: "Current role" },
  { id: "whatsapp", title: "Built internal AI WhatsApp automation for sales operations", detail: "Current role" },
];
