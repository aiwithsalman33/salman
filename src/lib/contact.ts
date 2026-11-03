/** Shared between the contact form and the /api/contact route so both validate the same way. */

export const projectTypes = [
  "AI automation",
  "AI agent or LLM app",
  "Voice AI",
  "WhatsApp automation",
  "Content or education collaboration",
  "Something else",
] as const;

export type ContactPayload = {
  name: string;
  email: string;
  projectType: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};
  if (!input.name.trim() || input.name.length > 120) errors.name = "Enter your name.";
  if (!EMAIL.test(input.email.trim()) || input.email.length > 200) errors.email = "Enter a valid email address.";
  if (!(projectTypes as readonly string[]).includes(input.projectType)) errors.projectType = "Choose a project type.";
  if (input.message.trim().length < 10) errors.message = "Write a short message (at least 10 characters).";
  else if (input.message.length > 5000) errors.message = "Keep the message under 5,000 characters.";
  return errors;
}
