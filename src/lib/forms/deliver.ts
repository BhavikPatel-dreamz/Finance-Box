import type { ContactInput } from "@/lib/validation/contact";

export type ContactDeliveryResult =
  | { ok: true }
  | { ok: false; message: string; status: number };

type Payload = Pick<ContactInput, "name" | "email" | "subject" | "message">;

async function postJson(url: string, body: unknown, headers: Record<string, string>) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  return response;
}

async function deliverToWordPress(payload: Payload): Promise<ContactDeliveryResult> {
  const base = process.env.WORDPRESS_URL?.trim().replace(/\/$/, "");
  const secret = process.env.CONTACT_FORM_SECRET?.trim();
  if (!base || !secret) {
    return {
      ok: false,
      status: 503,
      message: "Contact delivery is not configured.",
    };
  }

  try {
    const response = await postJson(`${base}/wp-json/financebox/v1/leads`, payload, {
      "X-Financebox-Secret": secret,
    });
    if (!response.ok) {
      return {
        ok: false,
        status: 502,
        message: "The message could not be saved.",
      };
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      status: 502,
      message: "The message could not be saved.",
    };
  }
}

async function deliverToWebhook(payload: Payload): Promise<ContactDeliveryResult> {
  const url = process.env.CONTACT_WEBHOOK_URL?.trim();
  const secret = process.env.CONTACT_WEBHOOK_SECRET?.trim();
  if (!url || !secret) {
    return {
      ok: false,
      status: 503,
      message: "Contact delivery is not configured.",
    };
  }

  try {
    const response = await postJson(url, payload, {
      Authorization: `Bearer ${secret}`,
    });
    if (!response.ok) {
      return {
        ok: false,
        status: 502,
        message: "The message could not be delivered.",
      };
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      status: 502,
      message: "The message could not be delivered.",
    };
  }
}

export async function deliverContact(payload: Payload): Promise<ContactDeliveryResult> {
  const mode = process.env.CONTACT_DELIVERY?.trim() || "wordpress";
  if (mode === "webhook") return deliverToWebhook(payload);
  if (mode === "wordpress") return deliverToWordPress(payload);
  return {
    ok: false,
    status: 503,
    message: "Contact delivery is not configured.",
  };
}
