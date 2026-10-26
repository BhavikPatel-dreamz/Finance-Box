import { deliverContact } from "@/lib/forms/deliver";
import { rateLimit } from "@/lib/forms/rate-limit";
import { validateContact } from "@/lib/validation/contact";

export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const limit = rateLimit(forwarded || "local");
  if (!limit.allowed) {
    return Response.json(
      { ok: false, message: "Too many messages. Try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const parsed = validateContact(payload);
  if (!parsed.success) {
    return Response.json(
      { ok: false, message: "Check the form and try again.", errors: parsed.errors },
      { status: 400 },
    );
  }

  if (parsed.data.companyWebsite.trim()) {
    return Response.json({ ok: true });
  }

  const result = await deliverContact(parsed.data);
  if (!result.ok) {
    return Response.json({ ok: false, message: result.message }, { status: result.status });
  }

  return Response.json({ ok: true });
}
