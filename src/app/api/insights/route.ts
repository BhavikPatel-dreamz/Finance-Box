import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const WP_URL = process.env.WORDPRESS_URL?.trim().replace(/\/$/, "");
    
    // Aapke URL ke hisaab se Automation Insights Form ID
    const FORM_ID = "1414"; 

    if (!WP_URL) throw new Error("WordPress URL not configured");

    const formData = new FormData();
    
    // CF7 form ke exact field names (aapke screenshot ke mutabik)
    formData.append("your-name", body.name);
    formData.append("your-email", body.email);
    formData.append("your-role", body.role);
    formData.append("your-message", body.message);

    // CF7 Hidden Fields (Security bypass)
    formData.append("_wpcf7", FORM_ID);
    formData.append("_wpcf7_version", "6.2.4.1");
    formData.append("_wpcf7_locale", "en_US");
    formData.append("_wpcf7_unit_tag", `wpcf7-f${FORM_ID}-p1414-o1`);
    formData.append("_wpcf7_container_post", "1414");

    const response = await fetch(`${WP_URL}/wp-json/contact-form-7/v1/contact-forms/${FORM_ID}/feedback`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.status === "mail_sent") {
      return NextResponse.json({ ok: true, message: data.message });
    } else {
      console.error("CF7 Insights Error:", data);
      return NextResponse.json({ ok: false, message: data.message || "Validation failed" }, { status: 400 });
    }
  } catch (error) {
    console.error("Insights API Error:", error);
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 });
  }
}