export type ExternalLink = { label: string; href: string };

export const instagram: ExternalLink = {
  label: "Instagram",
  href: "https://www.instagram.com/imsalmaann/",
};

export const topmate: ExternalLink = {
  label: "Topmate",
  href: "https://topmate.io/aiwithsalman/",
};

export const handle = "@imsalmaann";

// Unconfirmed details stay null. Anything null is left out of the page rather than shown as a placeholder.
export const youtube: ExternalLink | null = null;
export const email: string | null = null;
/** "250+ learners" from an older profile; set only once it is verified as current. */
export const learnerCount: string | null = null;
