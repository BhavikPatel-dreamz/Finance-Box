import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const WP_URL = process.env.WORDPRESS_URL?.trim().replace(/\/$/, "");
    const FORM_ID = "1283"; // Newsletter Form ID

    if (!WP_URL) throw new Error("WordPress URL not configured");

    const formData = new FormData();
    formData.append("email-address", body.email); 

    formData.append("_wpcf7", FORM_ID);
    formData.append("_wpcf7_version", "6.2.4.1");
    formData.append("_wpcf7_locale", "en_US");
    formData.append("_wpcf7_unit_tag", `wpcf7-f${FORM_ID}-p1283-o1`);
    formData.append("_wpcf7_container_post", "1283");

    const response = await fetch(`${WP_URL}/wp-json/contact-form-7/v1/contact-forms/${FORM_ID}/feedback`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.status === "mail_sent") {
      return NextResponse.json({ ok: true, message: data.message }); // 👈 Message bhej rahe hain
    } else {
      return NextResponse.json({ ok: false, message: data.message || "Validation failed" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 });
  }
}