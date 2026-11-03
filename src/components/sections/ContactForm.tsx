"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { instagram } from "@/data/social-links";
import { projectTypes, validateContact, type ContactErrors, type ContactPayload } from "@/lib/contact";
import { buttonClass, TextLink } from "@/components/ui/Button";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent"; email: string }
  | { state: "error"; message: string; offerInstagram?: boolean };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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

    setStatus({ state: "sending" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, website: data.get("website"), startedAt: startedAt.current }),
      });
      const result: { ok?: boolean; error?: string; fields?: ContactErrors } = await response.json();

      if (response.ok && result.ok) {
        form.reset();
        setStatus({ state: "sent", email: payload.email });
      } else if (result.error === "invalid_fields" && result.fields) {
        setErrors(result.fields);
        setStatus({ state: "idle" });
      } else if (result.error === "not_configured") {
        setStatus({
          state: "error",
          message: "The contact form isn't connected yet, so your message wasn't sent. Message me on Instagram instead.",
          offerInstagram: true,
        });
      } else {
        setStatus({
          state: "error",
          message: "Your message wasn't sent because the server couldn't deliver it. Try again in a minute, or message me on Instagram.",
          offerInstagram: true,
        });
      }
    } catch {
      setStatus({ state: "error", message: "Your message wasn't sent. Check your connection and try again." });
    }
  }

  if (status.state === "sent") {
    return (
      <div role="status" className="border border-go/40 p-6 sm:p-8">
        <p className="display text-h3 text-go">Message sent</p>
        <p className="mt-3 text-steel">I&apos;ll reply to {status.email}.</p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="mt-6 text-meta font-medium underline underline-offset-4 hover:text-signal"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form id="contact-form" noValidate onSubmit={handleSubmit} aria-describedby="contact-status" className="flex flex-col gap-6">
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

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4">
        <button type="submit" disabled={status.state === "sending"} className={buttonClass("go", "md", "self-start disabled:opacity-60")}>
          {status.state === "sending" ? "Sending…" : "Send message"}
        </button>
        <div id="contact-status" role="status" aria-live="polite">
          {status.state === "error" && (
            <p className="max-w-[56ch] text-alert">
              {status.message}{" "}
              {status.offerInstagram && (
                <TextLink href={instagram.href} external className="text-fg">
                  Open Instagram
                </TextLink>
              )}
            </p>
          )}
        </div>
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
