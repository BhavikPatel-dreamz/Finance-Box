import { NextResponse } from "next/server";
import { wordpressSiteUrl } from "@/lib/forms/cf7";
import { isFormId } from "@/lib/forms/types";

/**
 * Submits any Contact Form 7 form: `POST /api/forms/{formId}` with
 * `{ "fields": { "your-name": "…", "your-topics": ["A", "B"] } }`.
 *
 * Field names are CF7's own, so fields added in WordPress need no change here.
 * CF7 validates, stores and mails the submission; its `invalid_fields` are
 * returned as-is so the form can show the message under each field.
 */

const MAX_FIELDS = 50;
const MAX_VALUE_LENGTH = 10_000;
const FIELD_NAME = /^[A-Za-z][A-Za-z0-9_-]{0,63}$/;
const CF7_VERSION = "6.2.4.1";

type Cf7Feedback = {
  status?: string;
  message?: string;
  invalid_fields?: Array<{ field?: string; message?: string }>;
};

function bad(message: string, status = 400) {
  return NextResponse.json({ ok: false, message }, { status });
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isFormId(id)) return bad("Unknown form.", 404);

  const site = wordpressSiteUrl();
  if (!site) return bad("Forms are not configured.", 500);

  let fields: Record<string, unknown>;
  try {
    const body = (await request.json()) as { fields?: unknown };
    if (!body?.fields || typeof body.fields !== "object" || Array.isArray(body.fields)) return bad("Invalid request.");
    fields = body.fields as Record<string, unknown>;
  } catch {
    return bad("Invalid request.");
  }

  const formData = new FormData();
  let count = 0;
  for (const [name, value] of Object.entries(fields)) {
    // `_wpcf7*` and other underscore keys are CF7's own; never take them from the client.
    if (!FIELD_NAME.test(name) || ++count > MAX_FIELDS) continue;
    if (typeof value === "string") {
      formData.append(name, value.slice(0, MAX_VALUE_LENGTH));
    } else if (Array.isArray(value)) {
      for (const item of value) {
        if (typeof item === "string") formData.append(`${name}[]`, item.slice(0, MAX_VALUE_LENGTH));
      }
    }
  }

  formData.append("_wpcf7", id);
  formData.append("_wpcf7_version", CF7_VERSION);
  formData.append("_wpcf7_locale", "en_US");
  formData.append("_wpcf7_unit_tag", `wpcf7-f${id}-p${id}-o1`);
  formData.append("_wpcf7_container_post", id);

  let data: Cf7Feedback;
  try {
    const response = await fetch(`${site}/wp-json/contact-form-7/v1/contact-forms/${id}/feedback`, {
      method: "POST",
      body: formData,
      cache: "no-store",
      signal: AbortSignal.timeout(20_000),
    });
    data = (await response.json()) as Cf7Feedback;
  } catch (error) {
    console.error(`[forms] submission to form ${id} failed:`, error);
    return bad("We could not send your message. Please try again later.", 502);
  }

  if (data.status === "mail_sent") {
    return NextResponse.json({ ok: true, message: data.message || "Thank you!" });
  }

  return NextResponse.json(
    {
      ok: false,
      message: data.message || "Something went wrong. Please try again.",
      ...(Array.isArray(data.invalid_fields) && data.invalid_fields.length > 0 ? { invalid_fields: data.invalid_fields } : {}),
    },
    { status: 400 },
  );
}
