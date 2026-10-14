import type { Guide } from "../types.ts";
import { card } from "../targets.ts";

const sms = card("Texting — Max");

export default {
  slug: "texting-and-text-back",
  title: "Texting and missed-call text-back",
  description: "Turn texting on for a location and let Max text missed callers within a minute.",
  category: "locations",
  order: 4,
  roles: "Owners and admins.",
  setupByOptni:
    "Before any business can text customers in the US, carriers require the number to be registered (10DLC / A2P registration). Optni does the registration for you; it can take a few days. Until it's done, texting stays off.",
  intro: "Max texts from the location's business number. Customers can text that number back any time and Max answers, sharing one memory with Ava.",
  steps: [
    {
      id: "card",
      title: "In Settings → Locations & channels, find the Texting — Max card.",
      body: "The switch at the top turns texting on or off for this location.",
      alt: "The Texting — Max card with its on/off switch ringed.",
      shot: { app: "web", path: "/settings", scrollTo: sms, highlight: { role: "switch", name: "SMS channel enabled" } },
    },
    {
      id: "text-back",
      title: "Turn on Missed-call text-back.",
      body: "When a call isn't answered, Max texts the caller within a minute to pick the conversation up.",
      alt: "The Missed-call text-back switch ringed.",
      shot: { app: "web", path: "/settings", scrollTo: sms, highlight: { role: "switch", name: /Missed-call text-back/ } },
    },
    {
      id: "save",
      title: "Select Save changes.",
      alt: "The save bar.",
      shot: { app: "web", path: "/settings", scrollTo: sms, actions: [{ do: "click", target: { role: "switch", name: /Missed-call text-back/ } }], highlight: { role: "button", name: "Save changes" } },
    },
  ],
  sections: [
    {
      heading: "Rules Max always follows",
      bullets: [
        "No texts between 9 PM and 8 AM in the customer's time zone. A text-back waits until morning.",
        "No texts to anyone who replied STOP.",
        "No text-back to customers your team has taken over.",
      ],
    },
  ],
  related: ["missed-calls", "opted-out-contacts", "privacy-and-compliance"],
  keywords: ["SMS", "texting", "text back", "missed call text", "10DLC", "A2P", "registration"],
} satisfies Guide;
