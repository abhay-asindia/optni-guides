import type { Guide } from "../types.ts";
import { button, sidebar, tab } from "../targets.ts";

export default {
  slug: "today",
  title: "The Today page",
  description: "See today's numbers and everything that needs a person: handovers, bookings to confirm and missed calls.",
  category: "daily",
  order: 1,
  roles: "Everyone. Staff see their own locations.",
  intro: "Today is your home page. The top shows what Ava and Max handled. Below is a short list of what needs you. Work it from top to bottom.",
  steps: [
    {
      id: "numbers",
      title: "Read today's numbers across the top.",
      body: "Calls answered, texts handled, bookings made, and an estimate of revenue recovered from today's bookings.",
      alt: "Four number cards: calls answered, texts handled, appointments made and revenue recovered.",
      shot: { app: "web", path: "/", highlight: { role: "region", name: "Today's numbers" }, noArrow: true },
    },
    {
      id: "needs-you",
      title: "Use the tabs to filter what needs you.",
      body: "Handovers are conversations the AI passed to a person. Unconfirmed are bookings waiting for staff. Missed calls are callers nobody reached yet.",
      alt: "The What needs you now list with its All, Handovers, Unconfirmed and Missed calls tabs ringed.",
      shot: { app: "web", path: "/", highlight: { role: "tablist", name: "Filter what needs you" }, noArrow: true },
    },
    {
      id: "handover",
      title: "Select Open conversation on a handover.",
      body: "The card says why the AI handed over and how long the person has waited.",
      alt: "A Handed to staff card with the Open conversation link ringed.",
      shot: { app: "web", path: "/", actions: [{ do: "click", target: tab(/^Handovers/) }], highlight: { role: "link", name: /Open conversation/ } },
    },
    {
      id: "confirm",
      title: "Select Confirm on a booking awaiting confirmation.",
      body: "Select Review first if you want to check the details or move it.",
      alt: "An Awaiting confirmation card with the Confirm button ringed.",
      shot: { app: "web", path: "/", actions: [{ do: "click", target: tab(/^Unconfirmed/) }], highlight: button("Confirm", true) },
    },
    {
      id: "missed",
      title: "Call back a missed caller, then select Mark called back.",
      body: "The card shows whether Max already texted them back.",
      alt: "A Missed call card with the Call back and Mark called back buttons.",
      shot: { app: "web", path: "/", actions: [{ do: "click", target: tab(/^Missed calls/) }], highlight: button("Mark called back") },
    },
    {
      id: "activity",
      title: "Glance at Live activity and New leads on the right.",
      body: "Live activity updates by itself. Select a new lead to open it.",
      alt: "The New leads and Live activity panels.",
      shot: { app: "web", path: "/", highlight: { role: "list", name: "New leads" }, noArrow: true },
    },
  ],
  sections: [
    {
      heading: "Locations",
      paragraphs: ["Use the location picker in the top bar to see one location or all of them. Staff only ever see the locations they were invited to."],
    },
    {
      heading: "Revenue recovered",
      paragraphs: ["This is an estimate based on the bookings made today. It is not an accounting figure."],
    },
  ],
  related: ["inbox-handovers", "calls", "change-a-booking", "leads"],
  keywords: ["dashboard", "home", "overview", "to do", "missed calls", "confirm booking"],
} satisfies Guide;
void sidebar;
