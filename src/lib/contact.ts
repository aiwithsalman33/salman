/** Contact form fields and validation. The form hands the enquiry to WhatsApp; nothing is sent to a server. */

export const projectTypes = [
  "n8n automation or AI agent",
  "SaaS product or internal system",
  "AI solution for my business",
  "WhatsApp or voice AI",
  "AI content or founder marketing",
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
