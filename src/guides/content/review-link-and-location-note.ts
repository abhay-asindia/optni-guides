import type { Guide } from "../types.ts";
import { card } from "../targets.ts";

export default {
  slug: "review-link-and-location-note",
  title: "Review link and location note",
  description: "Send review requests after completed bookings, and tell Ava and Max things only one location does, like parking.",
  category: "locations",
  order: 5,
  roles: "Owners and admins.",
  intro: "Two small settings per location that make a big difference: a review link, and a short note about that location.",
  steps: [
    {
      id: "review",
      title: "Paste your review page link in Reviews → Review link.",
      body: "Max texts it 2 hours after a booking is marked completed (quiet hours apply). Leave it empty to send no review requests.",
      alt: "The Review link field ringed.",
      shot: { app: "web", path: "/settings", scrollTo: card("Reviews"), highlight: { label: "Review link" } },
    },
    {
      id: "note",
      title: "Write the location note.",
      body: "Parking, entrance, directions — anything only this location does. Up to 500 characters. Ava and Max use it for this location only.",
      alt: "The Location note box with an example filled in.",
      shot: {
        app: "web",
        path: "/settings",
        actions: [{ do: "fill", target: { label: "Location note" }, value: "Free parking behind the building. Use the side entrance on Lake St; the front door is for the pharmacy next door." }],
        scrollTo: { label: "Location note" },
        highlight: { label: "Location note" },
      },
    },
    {
      id: "save",
      title: "Select Save changes.",
      alt: "The save bar.",
      shot: {
        app: "web",
        path: "/settings",
        actions: [{ do: "fill", target: { label: "Location note" }, value: "Free parking behind the building." }],
        highlight: { role: "button", name: "Save changes" },
      },
    },
  ],
  sections: [
    {
      heading: "Tips",
      bullets: [
        "Use your Google Business Profile review link (it starts with https://g.page/r/).",
        "Everything that is true at every location belongs in What your AI should know instead.",
      ],
    },
  ],
  related: ["ai-knowledge", "change-a-booking", "locations"],
  keywords: ["reviews", "Google reviews", "review request", "location note", "parking", "directions"],
} satisfies Guide;
