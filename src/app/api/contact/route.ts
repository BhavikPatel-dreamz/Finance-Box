// Aapki file kuch aisi dikhni chahiye:
import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation/contact";
import { deliverContact } from "@/lib/forms/deliver";
import { rateLimit } from "@/lib/forms/rate-limit"; // if exists

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validation (Agar aapke schema mein 'subject' hai)
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, message: "Invalid data" }, { status: 400 });
    }

    // Delivery Call
    const result = await deliverContact(parsed.data);
    
    if (!result.ok) {
      return NextResponse.json({ ok: false, message: result.message }, { status: result.status });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}