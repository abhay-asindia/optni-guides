import type { Guide } from "../types.ts";
import { settingsTab } from "../targets.ts";

export default {
  slug: "business-and-industry",
  title: "Business name and industry",
  description: "Set the name Ava and Max use, and pick your industry — it changes the words used everywhere and your lead stages.",
  category: "settings",
  order: 1,
  roles: "Owners change these. Everyone can see them.",
  intro:
    "Your business name is what Ava says when she answers and how Max signs texts. Your industry sets the everyday words — patients or clients, appointments or jobs — plus Ava's do's and don'ts and your lead stages.",
  steps: [
    {
      id: "open",
      title: "Go to Settings → Business.",
      alt: "Settings → Business with the Your business card.",
      shot: { app: "web", path: "/settings/business", highlight: settingsTab("Business") },
    },
    {
      id: "name",
      title: "Type your business name the way you'd say it on the phone.",
      alt: "The Business name field ringed.",
      shot: { app: "web", path: "/settings/business", highlight: { label: "Business name" } },
    },
    {
      id: "industry",
      title: "Choose your industry.",
      body: "Pick the closest one. \"Other business\" uses neutral words.",
      alt: "The Industry menu open with the list of industries.",
      shot: { app: "web", path: "/settings/business", actions: [{ do: "click", target: { label: "Industry" } }], highlight: { role: "listbox" }, noArrow: true },
    },
    {
      id: "preview",
      title: "Check the preview of how your industry reads in Optni.",
      body: "It shows the words for the people you serve, what they book, who they book with, and your lead stages.",
      alt: "The How healthcare practice reads in Optni card.",
      shot: { app: "web", path: "/settings/business", highlight: { css: "[aria-label='Industry terms']" }, noArrow: true },
    },
    {
      id: "save",
      title: "Select Save changes at the bottom.",
      body: "Existing booking types and leads are kept when you change industry.",
      alt: "The save bar with Save changes ringed.",
      shot: {
        app: "web",
        path: "/settings/business",
        actions: [{ do: "fill", target: { label: "Business name" }, value: "Lakeside Family Chiropractic & Wellness" }],
        highlight: { role: "button", name: "Save changes" },
      },
    },
  ],
  sections: [
    {
      heading: "How industry changes the words",
      table: {
        head: ["Industry", "People you serve", "What they book", "Who they book with"],
        rows: [
          ["Healthcare or dental practice", "Patients", "Appointments", "Providers"],
          ["Med spa", "Clients", "Appointments", "Providers"],
          ["Veterinary clinic", "Clients", "Appointments", "Veterinarians"],
          ["Salon or spa", "Clients", "Appointments", "Stylists"],
          ["Gym or fitness studio", "Members", "Sessions", "Trainers"],
          ["Home services", "Customers", "Jobs", "Technicians"],
          ["Auto repair and service", "Customers", "Appointments", "Technicians"],
          ["Law firm", "Clients", "Consultations", "Attorneys"],
          ["Real estate", "Clients", "Showings", "Agents"],
          ["Restaurant", "Guests", "Reservations", "Hosts"],
          ["Retail store", "Customers", "Appointments", "Associates"],
          ["Professional services", "Clients", "Meetings", "Advisors"],
          ["Software / SaaS", "Leads", "Demos", "Reps"],
          ["Other business", "Customers", "Appointments", "Staff members"],
        ],
      },
    },
    {
      heading: "What else the industry sets",
      bullets: [
        "Lead stages — for example home services use New, Contacted, Estimate scheduled, Quoted, Won, Lost.",
        "Starting booking types for a new business.",
        "Ava's industry do's and don'ts. Healthcare, dental, med spa and veterinary add a firm rule: no medical advice and no triage.",
        "Healthcare industries also show HIPAA and BAA wording in Settings → Security.",
      ],
    },
  ],
  related: ["ai-knowledge", "switch-businesses", "booking-types", "leads"],
  keywords: ["business name", "industry", "terms", "words", "vocabulary", "patients", "clients", "customers"],
} satisfies Guide;
