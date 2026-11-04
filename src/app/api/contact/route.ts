import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation/contact";
import { deliverContact } from "@/lib/forms/deliver";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Zod Validation
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      // Zod v4 mein 'errors' ki jagah 'issues' use hota hai
      const firstError = parsed.error.issues[0]?.message || "Invalid data provided.";
      return NextResponse.json({ ok: false, message: firstError }, { status: 400 });
    }

    // Delivery Call
    const result = await deliverContact(parsed.data);
    
    if (!result.ok) {
      return NextResponse.json({ ok: false, message: result.message }, { status: result.status });
    }

    // Success Response with WordPress Message
    return NextResponse.json({ 
      ok: true, 
      message: result.message || "Thank you for your message. It has been sent." 
    });

  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ ok: false, message: "Server error. Please try again later." }, { status: 500 });
  }
}