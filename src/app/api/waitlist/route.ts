import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const WP_URL = process.env.WORDPRESS_URL?.trim().replace(/\/$/, "");
    // CF7 form ID comes from the WordPress "Join Waitlist" section (formId); 1338 is the fallback.
    const requestedId = typeof body.formId === "string" ? body.formId.trim() : String(body.formId ?? "");
    const FORM_ID = /^\d+$/.test(requestedId) ? requestedId : "1338";

    if (!WP_URL) throw new Error("WordPress URL not configured");

    const formData = new FormData();
    
    // Empty fields bhi bhej rahe hain taaki CF7 validate kar sake
    formData.append("your-name", body.name || "");
    formData.append("your-email", body.email || "");
    formData.append("your-company", body.company || "");
    formData.append("your-message", body.message || "");

    formData.append("_wpcf7", FORM_ID);
    formData.append("_wpcf7_version", "6.2.4.1");
    formData.append("_wpcf7_locale", "en_US");
    formData.append("_wpcf7_unit_tag", `wpcf7-f${FORM_ID}-p${FORM_ID}-o1`);
    formData.append("_wpcf7_container_post", FORM_ID);

    const response = await fetch(`${WP_URL}/wp-json/contact-form-7/v1/contact-forms/${FORM_ID}/feedback`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.status === "mail_sent") {
      return NextResponse.json({ ok: true, message: data.message }); 
    } 
    
    // 👇 Yahan hum invalid_fields ko frontend ko bhej rahe hain
    else {
      // Agar CF7 ne specific field errors diye hain
      if (data.invalid_fields && data.invalid_fields.length > 0) {
        return NextResponse.json(
          { 
            ok: false, 
            message: data.message, 
            invalid_fields: data.invalid_fields // Frontend isko use karega
          }, 
          { status: 400 }
        );
      }

      // Agar koi generic error hai
      return NextResponse.json(
        { ok: false, message: data.message || "Validation failed" }, 
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Waitlist API Error:", error);
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 });
  }
}