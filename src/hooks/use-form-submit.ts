import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function useFormSubmit() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const submitForm = async (endpoint: string, payload: Record<string, any>) => {
    setStatus("loading");
    setMessage("");

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
        return true; // Form reset karne ke liye true return kar rahe hain
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong.");
        return false;
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network error. Please try again.");
      return false;
    }
  };

  return { status, message, submitForm };
}