import { validateContact, type ContactPayload } from "@/lib/contact";

/** Submissions faster than this after the form loaded are treated as bots. */
const MIN_FILL_MS = 2500;

/**
 * Validates a contact submission and forwards it as JSON to CONTACT_WEBHOOK_URL
 * (an n8n or Make.com webhook, Formspree endpoint, or similar).
 * Spam protection: a hidden honeypot field and a minimum fill time. Both fail silently.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }

  const startedAt = Number(body.startedAt);
  const looksAutomated =
    (typeof body.website === "string" && body.website.length > 0) ||
    !Number.isFinite(startedAt) ||
    Date.now() - startedAt < MIN_FILL_MS;
  if (looksAutomated) return Response.json({ ok: true });

  const payload: ContactPayload = {
    name: String(body.name ?? "").trim(),
    email: String(body.email ?? "").trim(),
    projectType: String(body.projectType ?? ""),
    message: String(body.message ?? "").trim(),
  };

  const errors = validateContact(payload);
  if (Object.keys(errors).length > 0) {
    return Response.json({ error: "invalid_fields", fields: errors }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) return Response.json({ error: "not_configured" }, { status: 503 });

  const secret = process.env.CONTACT_WEBHOOK_SECRET;
  try {
    const upstream = await fetch(webhook, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(secret ? { "x-contact-secret": secret } : {}),
      },
      body: JSON.stringify({ ...payload, source: "portfolio", receivedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!upstream.ok) return Response.json({ error: "delivery_failed" }, { status: 502 });
  } catch {
    return Response.json({ error: "delivery_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
