import type { Guide } from "../types.ts";
import { button, inDialog, settingsTab } from "../targets.ts";

export default {
  slug: "providers-and-hours",
  title: "Providers (staff who take bookings) and their hours",
  description: "Add the people customers book with, choose where they work, what they do and their weekly hours.",
  category: "bookings",
  order: 5,
  roles: "Owners and admins.",
  intro:
    "Providers are the people customers book with — doctors, stylists, technicians, reps. Your industry picks the word. Ava and Max only offer times when a provider works, minus existing bookings and busy time on a connected calendar.",
  steps: [
    {
      id: "open",
      title: "Go to Settings → Providers.",
      body: "The tab uses your word, for example Stylists or Technicians.",
      alt: "The Providers settings page with a card per provider showing their locations, types and weekly hours.",
      shot: { app: "web", path: "/settings/providers", highlight: settingsTab("Providers") },
    },
    {
      id: "add",
      title: "Select Add provider, or Edit on an existing one.",
      alt: "The Add provider button ringed.",
      shot: { app: "web", path: "/settings/providers", highlight: button(/^Add provider/) },
    },
    {
      id: "name",
      title: "Enter their name and title.",
      body: "The title is optional, for example DC, Senior stylist or Lead tech. Ava says the name to callers.",
      alt: "The provider dialog with Name and Title fields.",
      shot: {
        app: "web",
        path: "/settings/providers",
        actions: [{ do: "click", target: { role: "button", name: "Edit Dr. Lee Sample" } }],
        highlight: inDialog({ label: "Name", exact: true }),
      },
    },
    {
      id: "where-what",
      title: "Tick the locations they work at and the booking types they do.",
      alt: "Location and booking type checkboxes in the provider dialog.",
      shot: {
        app: "web",
        path: "/settings/providers",
        actions: [{ do: "click", target: { role: "button", name: "Edit Dr. Lee Sample" } }],
        highlight: inDialog({ role: "group", name: /types they do/ }),
        noArrow: true,
      },
    },
    {
      id: "hours",
      title: "Switch on the days they work and set start and end times.",
      body: "Hours are in each location's time zone.",
      alt: "The weekly hours editor in the provider dialog.",
      shot: {
        app: "web",
        path: "/settings/providers",
        actions: [{ do: "click", target: { role: "button", name: "Edit Dr. Lee Sample" } }, { do: "scrollTo", target: inDialog({ label: "Works on Monday" }) }],
        highlight: inDialog({ label: "Works on Monday" }),
      },
    },
    {
      id: "save",
      title: "Select Save provider (or Add provider).",
      alt: "The save button of the provider dialog ringed.",
      shot: { app: "web", path: "/settings/providers", actions: [{ do: "click", target: { role: "button", name: "Edit Dr. Lee Sample" } }], highlight: inDialog(button(/^Save /)) },
    },
  ],
  sections: [
    {
      heading: "Good to know",
      bullets: [
        "Location opening hours and provider hours both count. A provider is only offered when the location is open and they work.",
        "If a provider's own calendar is connected (Google Calendar or Open Dental), their busy time there is never offered.",
        "Closed dates on a location block every provider there.",
      ],
    },
  ],
  related: ["booking-types", "locations", "integrations"],
  keywords: ["provider", "staff", "doctor", "stylist", "technician", "rep", "availability", "working hours", "schedule"],
} satisfies Guide;
