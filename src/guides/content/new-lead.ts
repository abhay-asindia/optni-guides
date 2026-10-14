import type { Guide } from "../types.ts";
import { button, inDialog } from "../targets.ts";

const open = { do: "click", target: button(/^New lead/) } as const;

export default {
  slug: "new-lead",
  title: "Add a lead yourself",
  description: "Add someone who walked in, emailed or was referred, so Ava and Max know them when they call or text.",
  category: "leads",
  order: 2,
  roles: "Everyone.",
  intro: "Add a lead when someone reaches you outside Optni. You create one record per phone number.",
  steps: [
    {
      id: "open",
      title: "In Leads, select New lead.",
      alt: "The Leads page with the New lead button ringed.",
      shot: { app: "web", path: "/leads", highlight: button(/^New lead/) },
    },
    {
      id: "details",
      title: "Enter their name and phone number.",
      body: "Email and company are optional.",
      alt: "The New lead dialog with name and phone filled in.",
      shot: {
        app: "web",
        path: "/leads",
        actions: [open, { do: "fill", target: inDialog({ label: "Name", exact: true }), value: "Jordan Example" }, { do: "fill", target: inDialog({ label: "Phone", exact: true }), value: "(612) 555-0177" }],
        highlight: inDialog({ label: "Phone", exact: true }),
      },
    },
    {
      id: "stage",
      title: "Choose the stage and owner, and add value or notes if you know them.",
      alt: "Stage, owner, value and notes fields in the dialog.",
      shot: {
        app: "web",
        path: "/leads",
        actions: [open, { do: "fill", target: inDialog({ label: "Name", exact: true }), value: "Jordan Example" }, { do: "fill", target: inDialog({ label: "Phone", exact: true }), value: "(612) 555-0177" }],
        highlight: inDialog({ label: "Stage", exact: true }),
      },
    },
    {
      id: "save",
      title: "Save the lead.",
      body: "If that number is already a lead, Optni says so and links to it.",
      alt: "The save button of the New lead dialog ringed.",
      shot: {
        app: "web",
        path: "/leads",
        actions: [open, { do: "fill", target: inDialog({ label: "Name", exact: true }), value: "Jordan Example" }, { do: "fill", target: inDialog({ label: "Phone", exact: true }), value: "(612) 555-0177" }],
        highlight: inDialog({ css: "button[type=submit]" }),
      },
    },
  ],
  related: ["leads", "website-intake", "contacts"],
  keywords: ["add lead", "create lead", "manual lead", "walk-in", "referral"],
} satisfies Guide;
