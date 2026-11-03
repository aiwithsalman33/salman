"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { whatsappLink } from "@/data/social-links";
import { projectTypes, validateContact, type ContactErrors, type ContactPayload } from "@/lib/contact";
import { buttonClass, ButtonLink } from "@/components/ui/Button";

function composeMessage({ name, email, projectType, message }: ContactPayload) {
  return [
    "Hi Salman, I'd like to talk about a project.",
    "",
    `Name: ${name.trim()}`,
    `Email: ${email.trim()}`,
    `Project type: ${projectType}`,
    "",
    message.trim(),
  ].join("\n");
}

/**
 * Collects the enquiry, then opens WhatsApp with it pre-filled. Nothing is stored or sent by the site:
 * the visitor presses send in WhatsApp themselves.
 */
export function ContactForm() {
  const [chatUrl, setChatUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<ContactErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload: ContactPayload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      projectType: String(data.get("projectType") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    const found = validateContact(payload);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const url = whatsappLink(composeMessage(payload));
    // Opened inside the submit handler so browsers treat it as user-initiated.
    window.open(url, "_blank", "noopener,noreferrer");
    form.reset();
    setChatUrl(url);
  }

  if (chatUrl) {
    return (
      <div role="status" className="border border-go/40 p-6 sm:p-8">
        <p className="display text-h3 text-go">WhatsApp is ready</p>
        <p className="mt-3 max-w-[48ch] text-steel">
          Your message is filled in. Press send in WhatsApp to deliver it. If WhatsApp didn&apos;t open, use the button
          below.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ButtonLink href={chatUrl} external>
            Open WhatsApp
          </ButtonLink>
          <button
            type="button"
            onClick={() => setChatUrl(null)}
            className="text-meta font-medium underline underline-offset-4 hover:text-signal"
          >
            Write another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form id="contact-form" noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Field id="contact-name" label="Name" error={errors.name}>
        <input id="contact-name" name="name" type="text" autoComplete="name" required className="field" {...describedBy("contact-name", errors.name)} />
      </Field>

      <Field id="contact-email" label="Email" error={errors.email}>
        <input id="contact-email" name="email" type="email" autoComplete="email" required className="field" {...describedBy("contact-email", errors.email)} />
      </Field>

      <Field id="contact-type" label="Project type" error={errors.projectType}>
        <select id="contact-type" name="projectType" required defaultValue="" className="field" {...describedBy("contact-type", errors.projectType)}>
          <option value="" disabled>
            Choose one
          </option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Field>

      <Field id="contact-message" label="What takes too much time?" error={errors.message}>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder="Describe the process you'd like to automate."
          className="field resize-y"
          {...describedBy("contact-message", errors.message)}
        />
      </Field>

      <div className="flex flex-col gap-3">
        <button type="submit" className={buttonClass("go", "md", "self-start")}>
          Send via WhatsApp
        </button>
        <p className="text-meta text-steel">Opens WhatsApp with your message filled in, ready to send.</p>
      </div>
    </form>
  );
}

function describedBy(id: string, error?: string) {
  return error ? { "aria-invalid": true, "aria-describedby": `${id}-error` } : {};
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-meta font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-meta text-alert">
          {error}
        </p>
      )}
    </div>
  );
}
