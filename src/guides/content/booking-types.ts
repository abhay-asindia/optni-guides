import type { Guide } from "../types.ts";
import { button, inDialog, settingsTab } from "../targets.ts";

export default {
  slug: "booking-types",
  title: "Booking types: length, notice and what the AI may book",
  description: "Set up what customers can book, how long each takes, minimum notice, how far ahead, buffers, and whether Ava and Max may book it.",
  category: "bookings",
  order: 6,
  roles: "Owners and admins.",
  intro:
    "A booking type is something a customer can book, like a new patient exam, a haircut or a furnace repair. Your industry gives you sensible starting types. Ava, Max and staff all use these rules.",
  steps: [
    {
      id: "open",
      title: "Go to Settings → Appointment types.",
      body: "The tab uses your word, for example Job types.",
      alt: "The booking types settings page listing each type with length, notice and whether the AI may book it.",
      shot: { app: "web", path: "/settings/appointment-types", highlight: settingsTab("Appointment types") },
    },
    {
      id: "add",
      title: "Select Add type, or Edit on a type.",
      alt: "The Add type button ringed.",
      shot: { app: "web", path: "/settings/appointment-types", highlight: button(/^Add type/) },
    },
    {
      id: "length",
      title: "Set the name and length.",
      alt: "The type dialog with the name and length fields.",
      shot: { app: "web", path: "/settings/appointment-types", actions: [{ do: "click", target: button(/^Add type/) }], highlight: inDialog({ label: "Length" }) },
    },
    {
      id: "rules",
      title: "Set minimum notice, how far ahead people can book, and the buffer after.",
      body: "Minimum notice stops last-minute bookings. The buffer leaves time to clean up or travel.",
      alt: "Minimum notice, Book up to and Buffer after fields.",
      shot: { app: "web", path: "/settings/appointment-types", actions: [{ do: "click", target: button(/^Add type/) }], highlight: inDialog({ label: "Minimum notice" }) },
    },
    {
      id: "ai",
      title: "Choose whether Ava and Max may book it.",
      body: "Off means the AI takes a message and staff book it. Use this for anything that needs a person to check first.",
      alt: "The Bookable by AI switch ringed.",
      shot: { app: "web", path: "/settings/appointment-types", actions: [{ do: "click", target: button(/^Add type/) }], highlight: inDialog({ label: "Bookable by AI" }) },
    },
    {
      id: "save",
      title: "Save the type, then add it to the right providers.",
      body: "A type is only offered with providers who do it (Settings → Providers).",
      alt: "The Save type button ringed.",
      shot: { app: "web", path: "/settings/appointment-types", actions: [{ do: "click", target: button(/^Add type/) }], highlight: inDialog({ css: "button[type=submit]" }) },
    },
  ],
  related: ["providers-and-hours", "new-booking", "ai-knowledge"],
  keywords: ["appointment types", "services", "job types", "duration", "buffer", "lead time", "notice"],
} satisfies Guide;
