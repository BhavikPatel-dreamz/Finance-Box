import type { ContactInput } from "@/lib/validation/contact";

export type ContactDeliveryResult =
  | { ok: true; message?: string }
  | { ok: false; message: string; status: number; invalid_fields?: any[] };

type Payload = Pick<ContactInput, "name" | "email" | "subject" | "message">;

async function deliverToWebhook(payload: Payload): Promise<ContactDeliveryResult> {
  const url = process.env.CONTACT_WEBHOOK_URL?.trim();
  const secret = process.env.CONTACT_WEBHOOK_SECRET?.trim();
  if (!url || !secret) {
    return { ok: false, status: 503, message: "Contact delivery is not configured." };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    
    if (!response.ok) return { ok: false, status: 502, message: "The message could not be delivered." };
    return { ok: true };
  } catch {
    return { ok: false, status: 502, message: "The message could not be delivered." };
  }
}

export async function deliverContact(payload: Payload): Promise<ContactDeliveryResult> {
  const mode = process.env.CONTACT_DELIVERY?.trim() || "wordpress";
  
  if (mode === "webhook") return deliverToWebhook(payload);
  
  return { ok: false, status: 503, message: "Contact delivery is not configured." };
}