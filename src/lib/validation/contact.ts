import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(80, "Name is too long."),
  email: z.email("Enter a valid email address.").max(120, "Email is too long."),
  subject: z.string().trim().max(140, "Subject is too long.").optional().default(""),
  message: z.string().trim().min(1, "Enter a message.").max(5000, "Message is too long."),
  companyWebsite: z.string().optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactFieldErrors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

export function validateContact(input: unknown) {
  const parsed = contactSchema.safeParse(input);
  if (parsed.success) {
    return { success: true as const, data: parsed.data };
  }

  const errors: ContactFieldErrors = {};
  for (const issue of parsed.error.issues) {
    const field = issue.path[0];
    if (
      (field === "name" || field === "email" || field === "subject" || field === "message") &&
      !errors[field]
    ) {
      errors[field] = issue.message;
    }
  }

  return { success: false as const, errors };
}
