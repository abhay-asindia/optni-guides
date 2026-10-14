import type { Guide } from "../types.ts";
import { button, inDialog, sidebar } from "../targets.ts";

const openGrace = [{ do: "fill", target: { placeholder: "Name or phone" }, value: "Grace" }, { do: "wait", ms: 800 }, { do: "click", target: { role: "link", name: /Grace Lindqvist/ } }] as const;

export default {
  slug: "contacts",
  title: "Contacts: search, export and delete",
  description: "Find any customer by name or phone, see their history, export their data, or delete them and know what's kept.",
  category: "leads",
  order: 4,
  roles: "Everyone can search. Export and delete: owners and admins.",
  intro:
    "Everyone who has called or texted, or been added, is a contact — one per phone number. The page is named for your industry: Patients, Clients or Customers. For software businesses it's Contacts, next to Leads.",
  steps: [
    {
      id: "open",
      title: "Select Patients, Clients or Customers in the sidebar.",
      alt: "The contacts page with tabs for All, Texts on and Opted out.",
      shot: { app: "web", path: "/contacts", highlight: sidebar("Patients") },
    },
    {
      id: "search",
      title: "Search by name or phone number.",
      body: "Part of a name works (\"Gra\"). For phone numbers, type the whole number.",
      alt: "The search box with a name typed and the matching contact listed.",
      shot: { app: "web", path: "/contacts", actions: [{ do: "fill", target: { placeholder: "Name or phone" }, value: "Grace" }, { do: "wait", ms: 800 }], highlight: { placeholder: "Name or phone" } },
    },
    {
      id: "detail",
      title: "Open a contact to see their conversation, calls and bookings.",
      alt: "A contact's page with their details, texting status and history.",
      shot: { app: "web", path: "/contacts", actions: [...openGrace], highlight: { role: "heading", name: "Grace Lindqvist" } },
    },
    {
      id: "export",
      title: "To give someone a copy of their data, select Export data.",
      body: "You get one JSON file with their details, conversations, calls, bookings and consent records.",
      alt: "The Export data button ringed.",
      shot: { app: "web", path: "/contacts", actions: [...openGrace], highlight: button("Export data") },
    },
    {
      id: "delete",
      title: "To erase someone, select Delete contact.",
      alt: "The Delete contact button ringed.",
      shot: { app: "web", path: "/contacts", actions: [...openGrace], highlight: button("Delete contact") },
    },
    {
      id: "confirm-delete",
      title: "Read what's erased and kept, type their name, and select Delete permanently.",
      body: "This can't be undone. Export first if they asked for a copy.",
      alt: "The delete dialog listing what is erased and what is kept, with a field to type the name.",
      shot: { app: "web", path: "/contacts", actions: [...openGrace, { do: "click", target: button("Delete contact") }], highlight: inDialog({ label: /^Type / }) },
    },
  ],
  sections: [
    {
      heading: "What delete erases",
      bullets: ["Name, phone, email and notes.", "Every text message and call transcript.", "Call recordings and AI summaries.", "Their bookings in Optni."],
    },
    {
      heading: "What delete keeps (with personal details removed)",
      bullets: [
        "The access log — who opened what and when. Kept for 6 years.",
        "Text-consent records, so a STOP keeps working if they text again.",
        "Records in your other systems (for example your practice-management system). Delete them there too.",
      ],
    },
  ],
  related: ["opted-out-contacts", "leads", "privacy-and-compliance"],
  keywords: ["patients", "clients", "customers", "search", "export", "delete", "erase", "GDPR", "data request", "privacy"],
} satisfies Guide;
