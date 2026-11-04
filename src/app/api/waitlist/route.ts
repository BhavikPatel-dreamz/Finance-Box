import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const WP_URL = process.env.WORDPRESS_URL?.trim().replace(/\/$/, "");
    
    // Aapki Waitlist Form ID
    const FORM_ID = "1338"; 

    if (!WP_URL) throw new Error("WordPress URL not configured");

    const formData = new FormData();
    
    // Empty fields ko bhi append karein taaki CF7 validate kar sake
    formData.append("your-name", body.name || "");
    formData.append("your-email", body.email || "");
    formData.append("your-company", body.company || "");
    formData.append("your-message", body.message || "");

    // CF7 Hidden Fields (Security bypass ke liye)
    formData.append("_wpcf7", FORM_ID);
    formData.append("_wpcf7_version", "6.2.4.1");
    formData.append("_wpcf7_locale", "en_US");
    formData.append("_wpcf7_unit_tag", `wpcf7-f${FORM_ID}-p1338-o1`);
    formData.append("_wpcf7_container_post", "1338");

    const response = await fetch(`${WP_URL}/wp-json/contact-form-7/v1/contact-forms/${FORM_ID}/feedback`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    // Agar successfully mail chali gayi
    if (data.status === "mail_sent") {
      return NextResponse.json({ ok: true, message: data.message });
    } 
    
    // Agar validation fail hui (Error Handling)
    else {
      let errorMessage = data.message || "Validation failed";
      
      // 👇 CF7 ke 'invalid_fields' array se exact error nikalne ka logic
      if (data.invalid_fields && data.invalid_fields.length > 0) {
        // Priority 1: Email error check karein
        const emailError = data.invalid_fields.find((f: any) => f.field === "your-email");
        
        if (emailError) {
          errorMessage = emailError.message; 
        } else {
          // Priority 2: Agar koi aur field khali hai (jaise name ya message), toh uska error uthayein
          errorMessage = data.invalid_fields[0].message;
        }
      }

      return NextResponse.json(
        { ok: false, message: errorMessage }, 
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Waitlist API Error:", error);
    return NextResponse.json(
      { ok: false, message: "Internal server error. Please try again later." }, 
      { status: 500 }
    );
  }
}