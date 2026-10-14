import type { Guide } from "../types.ts";
import { button, inDialog } from "../targets.ts";

const firstBooking = { css: "button[aria-label*=', booked by ']" } as const;
const pending = { css: "button[aria-label*=', pending, ']" } as const;

export default {
  slug: "change-a-booking",
  title: "Confirm, reschedule, cancel or complete a booking",
  description: "Open a booking to confirm it, move it to a new time, cancel it, or mark it completed or a no-show.",
  category: "bookings",
  order: 3,
  roles: "Everyone.",
  intro: "Open any booking from the calendar, Today or a contact's page. The buttons you see depend on whether it has started.",
  steps: [
    {
      id: "confirm",
      title: "To confirm a booking the AI made, select Confirm booking.",
      alt: "A booking awaiting confirmation with the Confirm booking button ringed.",
      shot: { app: "web", path: "/calendar", actions: [{ do: "click", target: pending }], highlight: inDialog(button("Confirm booking")) },
    },
    {
      id: "reschedule",
      title: "To move it, select Reschedule and pick a new time.",
      body: "Then select Move to … to save. Max texts the customer the new time.",
      alt: "A booking with the Reschedule button ringed.",
      shot: { app: "web", path: "/calendar", actions: [{ do: "click", target: firstBooking }], highlight: inDialog(button("Reschedule")) },
    },
    {
      id: "cancel",
      title: "To cancel, select Cancel, then Yes, cancel.",
      body: "The second click is a safety check. Select Keep it if you change your mind.",
      alt: "A booking with the Cancel button ringed.",
      shot: { app: "web", path: "/calendar", actions: [{ do: "click", target: firstBooking }], highlight: inDialog(button(/^Cancel /)) },
    },
    {
      id: "complete",
      title: "After it starts, select Completed or No-show.",
      body: "Completed can trigger a review request text if the location has a review link.",
      alt: "A booking that has started, with Completed and No-show buttons.",
      shot: { app: "web", path: "/calendar", clockAt: "19:30", actions: [{ do: "click", target: firstBooking }], highlight: inDialog(button("Completed")) },
    },
  ],
  sections: [
    {
      heading: "Statuses",
      bullets: [
        "Awaiting confirmation — booked by the AI, waiting for staff.",
        "Confirmed — good to go.",
        "Completed, No-show, Cancelled — finished. These can't be changed.",
      ],
    },
    {
      heading: "Bookings from outside calendars",
      paragraphs: ["A booking imported from a connected calendar without an Optni booking type can't be moved here. Move it in the calendar it came from."],
    },
  ],
  related: ["calendar", "slot-taken", "review-link-and-location-note"],
  keywords: ["reschedule", "cancel", "no show", "complete", "confirm", "move appointment"],
} satisfies Guide;
