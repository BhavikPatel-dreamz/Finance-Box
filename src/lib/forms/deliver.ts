import type { ContactInput } from "@/lib/validation/contact";

export type ContactDeliveryResult =
  | { ok: true; message?: string }
  | { ok: false; message: string; status: number; invalid_fields?: any[] }; // 👈 Add kiya

type Payload = Pick<ContactInput, "name" | "email" | "subject" | "message">;

async function deliverToWordPress(payload: Payload): Promise<ContactDeliveryResult> {
  const base = process.env.WORDPRESS_URL?.trim().replace(/\/$/, "");
  if (!base) {
    return {
      ok: false,
      status: 503,
      message: "Contact delivery is not configured.",
    };
  }

  try {
    const FORM_ID = "1284"; 
    
    const formData = new FormData();
    
    formData.append("your-name", payload.name || "");
    formData.append("your-email", payload.email || "");
    formData.append("your-company", payload.subject || "");
    formData.append("your-message", payload.message || "");

    formData.append("_wpcf7", FORM_ID);
    formData.append("_wpcf7_version", "6.2.4.1"); 
    formData.append("_wpcf7_locale", "en_US");
    formData.append("_wpcf7_unit_tag", `wpcf7-f${FORM_ID}-p1284-o1`);
    formData.append("_wpcf7_container_post", "1284");

    const response = await fetch(`${base}/wp-json/contact-form-7/v1/contact-forms/${FORM_ID}/feedback`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.status === "mail_sent") {
      return { ok: true, message: data.message }; 
    } else {
      return {
        ok: false,
        status: 400,
        message: data.message || "Validation failed.",
        invalid_fields: data.invalid_fields, // 👈 Saare errors frontend ko bhej rahe hain
      };
    }
  } catch (error) {
    return {
      ok: false,
      status: 502,
      message: "The message could not be delivered.",
    };
  }
}

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
  if (mode === "wordpress") return deliverToWordPress(payload);
  return { ok: false, status: 503, message: "Contact delivery is not configured." };
}