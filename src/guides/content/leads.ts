import type { Guide } from "../types.ts";
import { sidebar } from "../targets.ts";

const openLead = { do: "click", target: { role: "link", name: "Desmond Varley" } } as const;

export default {
  slug: "leads",
  title: "Leads: stages, sources, owners and value",
  description: "Work your pipeline: see every new caller, texter and form lead, move them through stages, assign an owner, add value and notes.",
  category: "leads",
  order: 1,
  roles: "Everyone. Staff see leads at their own locations.",
  intro:
    "Every first call or text from an unknown number becomes a lead in New. So does every website form and anyone you add yourself. Ava and Max keep talking to leads whatever their stage — the pipeline is for your team.",
  steps: [
    {
      id: "open",
      title: "Select Leads in the sidebar.",
      body: "The number on Leads is how many are new.",
      alt: "The Leads page with stage tabs, filters and a table of leads.",
      shot: { app: "web", path: "/leads", highlight: sidebar("Leads") },
    },
    {
      id: "stages",
      title: "Use the stage tabs to see each step of the pipeline.",
      body: "The counts are exact. Your industry sets the stages — for example New, Contacted, Booked, Won and Lost.",
      alt: "The stage tabs with counts ringed.",
      shot: { app: "web", path: "/leads", highlight: { role: "tablist", name: "Lead stages" }, noArrow: true },
    },
    {
      id: "filter",
      title: "Search by name or phone, or filter by source and owner.",
      alt: "The search box and the source and owner filters ringed.",
      shot: { app: "web", path: "/leads", highlight: { role: "combobox", name: "Source" } },
    },
    {
      id: "move",
      title: "Change a lead's stage with the menu on its row.",
      body: "It moves to the new tab right away.",
      alt: "A row's stage menu open, listing the pipeline stages.",
      shot: { app: "web", path: "/leads", actions: [{ do: "click", target: { role: "combobox", name: /^Stage for / } }], highlight: { role: "listbox" }, noArrow: true },
    },
    {
      id: "detail",
      title: "Select a lead to open it.",
      body: "You see their stage, owner, expected value, source, notes and a timeline of every call, text and booking.",
      alt: "A lead's page with the lead panel and timeline.",
      shot: { app: "web", path: "/leads", actions: [openLead], highlight: { label: "Stage", exact: true } },
    },
    {
      id: "owner-value",
      title: "Pick an owner and type the expected value.",
      body: "The value saves when you leave the box. Use it to see what your pipeline is worth.",
      alt: "The Owner menu and Expected value field ringed.",
      shot: { app: "web", path: "/leads", actions: [openLead], highlight: { label: /^Expected value/ } },
    },
    {
      id: "notes",
      title: "Write notes and select Save notes.",
      body: "When a lead is Lost, a Lost reason box appears too.",
      alt: "The Notes box with the Save notes button ringed.",
      shot: {
        app: "web",
        path: "/leads",
        actions: [openLead, { do: "fill", target: { label: "Notes", exact: true }, value: "Wants a follow-up about the 6-visit package next week." }],
        highlight: { role: "button", name: "Save notes" },
      },
    },
  ],
  sections: [
    {
      heading: "Sources",
      bullets: [
        "Phone call / Text — their first call or text to your number.",
        "Website form / Demo request — sent by your website (see Website lead form).",
        "Added by staff — someone on your team added them.",
        "Import — brought in from another system.",
      ],
    },
    {
      heading: "Good to know",
      bullets: [
        "One lead per phone number. Adding the same number again opens the existing lead.",
        "Owners and admins can get a push alert for each new lead.",
        "Test calls never create leads.",
      ],
    },
  ],
  related: ["new-lead", "website-intake", "contacts", "notifications"],
  keywords: ["pipeline", "CRM", "sales", "prospects", "stage", "funnel", "deal value", "won", "lost"],
} satisfies Guide;
