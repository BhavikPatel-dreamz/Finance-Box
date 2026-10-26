# Contact form

This section is the initial contact form. It is not based on a Figma frame. Replace its presentation when the contact design arrives, and keep the fields and delivery path.

## WordPress

Layout name: `contact_form`

Parent field: Page Builder → Page Sections (`page_sections`)

| Field | Name | Type | Required |
| --- | --- | --- | --- |
| Heading | `heading` | Text | No |
| Intro | `intro` | Textarea | No |

The form controls themselves are not CMS fields. They are name, email, optional subject, and message.

Add one or more Contact Form layouts to a page. Each instance can have its own heading and intro. The layouts render in the order they are saved.

## Frontend

- Component: `src/components/forms/contact-form.tsx`
- Section: `src/components/sections/contact-form/section.tsx`
- Registry key: `contact_form`
- Submission: `POST /api/contact`

`CONTACT_DELIVERY=wordpress` stores a private lead through the Financebox plugin. `CONTACT_DELIVERY=webhook` POSTs the same JSON to `CONTACT_WEBHOOK_URL` with `Authorization: Bearer <CONTACT_WEBHOOK_SECRET>`. Neither provider nor inbox address is hardcoded.

The form includes a honeypot and a per-process limit of 5 submissions in 10 minutes. Validation runs on the server with Zod. Credentials are not sent to the browser.

The section renders only after the live GraphQL schema exposes a matching layout type. Until then, the API still accepts submissions, but no page shows the form.
