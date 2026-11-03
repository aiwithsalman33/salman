export type Achievement = { id: string; title: string; detail: string };

// No certificates or badges until real ones are supplied.
export const achievements: readonly Achievement[] = [
  { id: "best-employee", title: "Best Employee of the Year", detail: "2025, Aspirentech" },
  { id: "outstanding-student", title: "Outstanding Student of the Year", detail: "2025, Dhaanish Chennai College" },
  { id: "ziya", title: "Built Ziya Voice from scratch over approximately six months", detail: "Aspirentech" },
];
