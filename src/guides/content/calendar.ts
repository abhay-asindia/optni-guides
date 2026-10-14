import type { Guide } from "../types.ts";
import { button, sidebar } from "../targets.ts";

const firstBooking = { css: "button[aria-label*=', booked by ']" } as const;

export default {
  slug: "calendar",
  title: "Calendar: day and week views",
  description: "See every booking by provider, switch between day and week, and open a booking to act on it.",
  category: "bookings",
  order: 1,
  roles: "Everyone. Staff see their own locations.",
  intro:
    "The calendar shows bookings made by Ava, Max and your team, side by side for each provider. In your industry, bookings may be called appointments, jobs or demos, and providers may be stylists, technicians or reps.",
  steps: [
    {
      id: "open",
      title: "Select Calendar in the sidebar.",
      body: "The day view has one column per provider.",
      alt: "The calendar's day view with a column for each provider.",
      shot: { app: "web", path: "/calendar", highlight: sidebar("Calendar") },
    },
    {
      id: "views",
      title: "Switch between Day and Week.",
      body: "Use the arrows to move a day or week, and Today to jump back.",
      alt: "The Day / Week switch and the date arrows ringed.",
      shot: { app: "web", path: "/calendar", highlight: { role: "group", name: "Calendar view" } },
    },
    {
      id: "legend",
      title: "Read the colours and badges.",
      body: "A solid edge is confirmed; a dashed edge is awaiting confirmation. The badge says who booked it: A for Ava, M for Max, S for staff.",
      alt: "The calendar legend explaining confirmed, awaiting confirmation and the source badges.",
      shot: { app: "web", path: "/calendar", highlight: { text: "Awaiting confirmation", exact: true } },
    },
    {
      id: "week",
      title: "Use the week view to see the whole week at once.",
      alt: "The calendar's week view.",
      shot: { app: "web", path: "/calendar", actions: [{ do: "click", target: { role: "button", name: /^week$/i } }], highlight: { role: "button", name: /^week$/i } },
    },
    {
      id: "open-booking",
      title: "Select a booking to open it.",
      body: "From here you can confirm, reschedule, cancel, or mark it completed or a no-show.",
      alt: "A booking's details with its action buttons.",
      shot: { app: "web", path: "/calendar", actions: [{ do: "click", target: firstBooking }], highlight: { role: "dialog" }, noArrow: true },
    },
    {
      id: "new",
      title: "Select New appointment to book someone yourself.",
      body: "The button uses your industry's word, for example New job or New demo.",
      alt: "The New appointment button ringed.",
      shot: { app: "web", path: "/calendar", highlight: button(/^New appointment/) },
    },
  ],
  sections: [
    {
      heading: "Where bookings come from",
      bullets: [
        "Ava books on calls and Max books by text, using the same live availability you see.",
        "Bookings the AI makes can wait for staff to confirm. They show on Today under Unconfirmed.",
        "If a provider's Google Calendar or Open Dental is connected, busy time there is never offered.",
      ],
    },
  ],
  related: ["new-booking", "change-a-booking", "providers-and-hours", "booking-types"],
  keywords: ["schedule", "appointments", "agenda", "day view", "week view", "diary"],
} satisfies Guide;
