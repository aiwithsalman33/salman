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

/** Contact-form messages open a WhatsApp chat with this number (international format, digits only). */
export const whatsapp = {
  label: "WhatsApp",
  number: "918148035472",
  href: "https://wa.me/918148035472",
};

/** A WhatsApp click-to-chat link with the message pre-filled. */
export function whatsappLink(text: string) {
  return `${whatsapp.href}?text=${encodeURIComponent(text)}`;
}

// Unconfirmed details stay null. Anything null is left out of the page rather than shown as a placeholder.
export const youtube: ExternalLink | null = null;
export const email: string | null = null;
/** "250+ learners" from an older profile; set only once it is verified as current. */
export const learnerCount: string | null = null;
