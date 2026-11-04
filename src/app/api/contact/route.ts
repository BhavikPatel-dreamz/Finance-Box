import { NextResponse } from "next/server";
import { deliverContact } from "@/lib/forms/deliver";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Zod validation hata di hai taaki request seedha CF7 par jaye
    const payload = {
      name: body.name || "",
      email: body.email || "",
      subject: body.subject || "", 
      message: body.message || "",
    };

    const result = await deliverContact(payload);
    
    if (!result.ok) {
      // 👇 CF7 se aane wale saare invalid_fields frontend ko bhej rahe hain
      if (result.invalid_fields && result.invalid_fields.length > 0) {
        return NextResponse.json({ 
          ok: false, 
          message: result.message, 
          invalid_fields: result.invalid_fields 
        }, { status: result.status });
      }

      return NextResponse.json({ ok: false, message: result.message }, { status: result.status });
    }

    return NextResponse.json({ 
      ok: true, 
      message: result.message || "Thank you for your message. It has been sent." 
    });

  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}