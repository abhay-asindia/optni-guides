import type { Guide } from "../types.ts";
import { button, inDialog, label, settingsTab } from "../targets.ts";

const create = [
  { do: "fill", target: label("Key name"), value: "Website contact form" },
  { do: "click", target: button("Create key", true) },
  { do: "waitFor", target: { role: "dialog" } },
] as const;

export default {
  slug: "website-intake",
  title: "Website lead form: send form leads to Optni",
  description: "Create an intake key and point your website's contact or demo form at Optni so every submission becomes a lead.",
  category: "leads",
  order: 3,
  roles: "Owners and admins create keys. Your web developer sets up the form.",
  intro:
    "Your website form can send each submission straight to Optni. The person becomes a lead (source: Website form or Demo request), the consent text they agreed to is recorded, and owners and admins get a push alert. You need one intake key per website or form.",
  steps: [
    {
      id: "open",
      title: "Go to Settings → Website & integrations.",
      alt: "The Website lead form card at the top of Website & integrations.",
      shot: { app: "web", path: "/settings/integrations", highlight: settingsTab("Website & integrations") },
    },
    {
      id: "name",
      title: "Name the key after the form, then select Create key.",
      body: "For example \"Website contact form\". The name helps you tell keys apart later.",
      alt: "The Key name field filled in and the Create key button ringed.",
      shot: { app: "web", path: "/settings/integrations", actions: [{ do: "fill", target: label("Key name"), value: "Website contact form" }], highlight: button("Create key", true) },
    },
    {
      id: "copy",
      title: "Select Copy both lines and give them to your web developer.",
      body: "This is the only time Optni shows the full key. Keep it in your website's server settings, never in page code.",
      alt: "The new key dialog with the key and the two environment lines (hidden in this guide) and Copy both lines ringed.",
      shot: {
        app: "web",
        path: "/settings/integrations",
        actions: [...create],
        mask: [{ label: "Intake key", exact: true }, { label: "Website environment lines", exact: true }],
        highlight: inDialog(button("Copy both lines")),
      },
    },
    {
      id: "done",
      title: "Select I've saved it.",
      body: "The key now shows in the list by its first few characters, with when it was last used.",
      alt: "The I've saved it button ringed.",
      shot: {
        app: "web",
        path: "/settings/integrations",
        actions: [...create],
        mask: [{ label: "Intake key", exact: true }, { label: "Website environment lines", exact: true }],
        highlight: inDialog(button("I've saved it")),
      },
    },
    { id: "test", title: "Submit your form once with your own details and check Leads.", body: "The test lead appears in New within seconds. Delete it from Contacts afterwards if you like." },
  ],
  sections: [
    {
      heading: "For your web developer: the two settings",
      paragraphs: ["Put the two lines from the dialog in the website's server-side environment (for example a .env file or the hosting provider's settings). They look like this:"],
      code: { lang: "bash", label: ".env (server side only)", text: "LEAD_WEBHOOK_URL=https://<your Optni API address>/v1/intake/leads\nLEAD_WEBHOOK_TOKEN=oi_live_<the rest of your key>" },
    },
    {
      heading: "For your web developer: the request",
      paragraphs: [
        "When the form is submitted, your server sends one POST with the key as a bearer token. Required: name and phone (any common format). Optional: email, company, message and source (a short label for the form).",
      ],
      code: {
        lang: "bash",
        label: "Generic JSON example",
        text: 'curl -X POST "$LEAD_WEBHOOK_URL" \\\n  -H "Authorization: Bearer $LEAD_WEBHOOK_TOKEN" \\\n  -H "Content-Type: application/json" \\\n  -d \'{\n    "name": "Jordan Example",\n    "phone": "(612) 555-0177",\n    "email": "jordan@example.com",\n    "company": "Example Bakery",\n    "message": "Do you have time this Friday?",\n    "source": "website/contact"\n  }\'',
      },
    },
    {
      heading: "Recording consent to call and text",
      paragraphs: [
        "If your form has a consent checkbox, also send consent: true, the exact consentText the person saw, and createdAt (when they submitted). Optni stores that text as the consent record for calls and texts. Sending the same phone and createdAt twice is ignored, so retries are safe.",
      ],
      code: {
        lang: "json",
        label: "With consent",
        text: '{\n  "name": "Jordan Example",\n  "phone": "+16125550177",\n  "email": "jordan@example.com",\n  "company": "Example Bakery",\n  "message": "Please call me about catering.",\n  "source": "website/contact",\n  "consent": true,\n  "consentText": "By submitting this form I agree to receive calls and texts, including automated ones, from Example Bakery at the number provided. Consent is not a condition of purchase. Msg & data rates may apply. Reply STOP to opt out.",\n  "createdAt": "2026-10-14T15:04:05Z"\n}',
      },
    },
    {
      heading: "Responses",
      bullets: [
        "201 — a new contact and lead were created.",
        "200 with duplicate: true — this submission was already received. Nothing changed.",
        "200 with leadCreated: false — the person was already a lead; the submission is added to their notes.",
        "401 INVALID_INTAKE_KEY — the key is wrong or was revoked.",
        "422 VALIDATION_FAILED — a field is missing or too long. The message names it.",
        "429 — more than 30 submissions a minute for one key.",
      ],
    },
    {
      heading: "Revoking a key",
      paragraphs: ["Select the revoke (bin) button next to a key, then Revoke key. Forms using it stop creating leads at once. Leads already received stay."],
    },
  ],
  related: ["leads", "new-lead", "privacy-and-compliance"],
  keywords: ["intake key", "webhook", "LEAD_WEBHOOK_URL", "LEAD_WEBHOOK_TOKEN", "contact form", "demo form", "API", "integration", "website"],
} satisfies Guide;
