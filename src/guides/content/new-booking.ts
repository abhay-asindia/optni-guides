import type { Guide } from "../types.ts";
import { button, inDialog } from "../targets.ts";

const open = { do: "click", target: button(/^New appointment/) } as const;
const pickType = { do: "click", target: inDialog({ role: "radio", name: /Adjustment/ }) } as const;
const next = { do: "click", target: inDialog(button("Next", true)) } as const;
const pickTime = { do: "click", target: inDialog({ role: "radio", name: /\d:\d\d (AM|PM)/, nth: 2 }) } as const;
const nextAfterTime = { do: "click", target: inDialog(button(/— next$/)) } as const;
const pickContact = { do: "click", target: inDialog({ role: "button", name: /Elena Marsh/ }) } as const;
const search = { do: "fill", target: inDialog({ label: "Search contacts" }), value: "Elena" } as const;

export default {
  slug: "new-booking",
  title: "Book an appointment yourself",
  description: "Make a booking from the calendar: pick the type, a live time, the customer, then confirm.",
  category: "bookings",
  order: 2,
  roles: "Everyone.",
  intro: "Staff bookings use the same live times Ava and Max offer, so nobody double-books. Max texts the customer a confirmation and reminders.",
  steps: [
    {
      id: "open",
      title: "In Calendar, select New appointment.",
      alt: "The calendar with the New appointment button ringed.",
      shot: { app: "web", path: "/calendar", highlight: button(/^New appointment/) },
    },
    {
      id: "type",
      title: "Choose the location and the booking type, then select Next.",
      body: "Leave the provider on First available, or pick one.",
      alt: "The first step of the booking dialog with a booking type selected.",
      shot: { app: "web", path: "/calendar", actions: [open, pickType], highlight: inDialog({ role: "radiogroup" }), noArrow: true },
    },
    {
      id: "time",
      title: "Pick a time, then select the time button to continue.",
      body: "Times come from the providers' hours and calendars, in the location's time zone. Use the arrows to see other weeks.",
      alt: "Live time slots with one selected.",
      shot: { app: "web", path: "/calendar", actions: [open, pickType, next, pickTime], highlight: inDialog({ role: "radiogroup", name: "Time" }), noArrow: true },
    },
    {
      id: "customer",
      title: "Search for the customer, or select New to add one.",
      body: "For a new customer, enter their name and mobile number.",
      alt: "The customer step with a search and matching contacts.",
      shot: { app: "web", path: "/calendar", actions: [open, pickType, next, pickTime, nextAfterTime, search, pickContact], highlight: inDialog({ label: "Search contacts" }) },
    },
    {
      id: "confirm",
      title: "Check the summary and select Book appointment.",
      body: "Max sends the confirmation, then reminders 24 hours and 2 hours before (not during quiet hours).",
      alt: "The confirm step listing customer, booking, time and provider, with the Book button ringed.",
      shot: { app: "web", path: "/calendar", actions: [open, pickType, next, pickTime, nextAfterTime, search, pickContact, next], highlight: inDialog(button(/^Book /)) },
    },
  ],
  sections: [
    {
      heading: "Good to know",
      bullets: [
        "Times respect each provider's weekly hours, the minimum notice, how far ahead people can book and the buffer after each booking.",
        "If someone else takes the time while you're choosing, you're sent back to pick another. See When a time is taken.",
        "You can also book from a contact's page.",
      ],
    },
  ],
  related: ["slot-taken", "change-a-booking", "booking-types", "providers-and-hours"],
  keywords: ["book", "schedule appointment", "make appointment", "add booking", "new job", "new demo"],
} satisfies Guide;
