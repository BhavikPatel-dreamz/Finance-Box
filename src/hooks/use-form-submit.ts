import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function useFormSubmit() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({}); // 👈 Naya state

  const submitForm = async (endpoint: string, payload: Record<string, any>) => {
    setStatus("loading");
    setMessage("");
    setErrors({}); // Reset errors on new submit

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus("success");
        setMessage(data.message || "Success!");
        return true;
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong.");
        
        // 👇 Agar API se invalid_fields aaye hain, toh unko map kar lo
        if (data.invalid_fields && Array.isArray(data.invalid_fields)) {
          const fieldErrors: Record<string, string> = {};
          data.invalid_fields.forEach((field: any) => {
            // e.g., "your-email" -> "Please enter an email address."
            fieldErrors[field.field] = field.message;
          });
          setErrors(fieldErrors);
        }
        
        return false;
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network error. Please try again.");
      return false;
    }
  };

  return { status, message, errors, submitForm };
}