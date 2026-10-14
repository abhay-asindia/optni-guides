import type { Guide } from "../types.ts";
import { card, settingsTab, tab } from "../targets.ts";

export default {
  slug: "locations",
  title: "Locations: opening hours, closed dates and time zone",
  description: "Set each location's time zone, weekly opening hours and the days you're closed. Ava uses them to know when you're open.",
  category: "locations",
  order: 1,
  roles: "Owners and admins.",
  setupByOptni: "Optni adds your locations and their phone numbers when you sign up. Ask us to add another location.",
  intro:
    "Each location has its own address, time zone, hours and phone number. Hours decide what \"after hours\" means for calls, when live transfer is offered, and when texts may go out. Each provider's own hours decide what can be booked.",
  steps: [
    {
      id: "open",
      title: "Go to Settings → Locations & channels.",
      alt: "Settings → Locations & channels with a tab for each location.",
      shot: { app: "web", path: "/settings", highlight: settingsTab("Locations & channels") },
    },
    {
      id: "pick",
      title: "Pick the location tab.",
      alt: "The location tabs ringed.",
      shot: { app: "web", path: "/settings", highlight: tab("Plymouth") },
    },
    {
      id: "timezone",
      title: "Check the time zone.",
      body: "All hours on this page are local to it. Daylight saving is handled for you.",
      alt: "The Time zone menu ringed.",
      shot: { app: "web", path: "/settings", highlight: { label: "Time zone" } },
    },
    {
      id: "hours",
      title: "Switch each day on or off and set opening and closing times.",
      body: "A day that's off is closed. Ava answers those calls as after hours.",
      alt: "The weekly hours with a switch and two times per day.",
      shot: { app: "web", path: "/settings", highlight: { label: "Open on Monday" }, scrollTo: { label: "Open on Monday" } },
    },
    {
      id: "closed",
      title: "Add closed dates for holidays.",
      body: "Pick the date and select Add date. Remove one with the bin on its chip.",
      alt: "The Closed dates list with a date picker and Add date button.",
      shot: { app: "web", path: "/settings", scrollTo: { text: "Closed dates", exact: true }, highlight: { role: "button", name: "Add date" } },
    },
    {
      id: "save",
      title: "Select Save changes.",
      body: "The save bar appears when you change something. Discard throws your changes away.",
      alt: "The save bar with Save changes ringed.",
      shot: { app: "web", path: "/settings", actions: [{ do: "click", target: { label: "Open on Saturday" } }], highlight: { role: "button", name: "Save changes" } },
    },
  ],
  sections: [
    {
      heading: "Also on this page",
      bullets: [
        "Voice — Ava: how calls are answered. See Voice mode and live transfer.",
        "Texting — Max: texting and missed-call text-back.",
        "Reviews and the location note. See Review link and location note.",
      ],
    },
  ],
  related: ["greeting", "voice-mode-and-transfer", "texting-and-text-back", "providers-and-hours"],
  keywords: ["opening hours", "business hours", "holidays", "closed", "time zone", "timezone", "location", "branch"],
} satisfies Guide;
void card;
