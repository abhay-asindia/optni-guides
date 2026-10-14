import type { Guide } from "../types.ts";
import { button, tab } from "../targets.ts";

export default {
  slug: "missed-calls",
  title: "Call back missed callers",
  description: "Find missed calls, call the person back and mark the call as called back so the team doesn't call twice.",
  category: "daily",
  order: 6,
  roles: "Everyone.",
  intro: "If a call is missed — for example while calls ring your front desk — Max can text the caller within a minute. Anyone not reached still needs a call back.",
  steps: [
    {
      id: "find",
      title: "On Today, open the Missed calls tab.",
      alt: "Today with the Missed calls tab selected.",
      shot: { app: "web", path: "/", actions: [{ do: "click", target: tab(/^Missed calls/) }], highlight: tab(/^Missed calls/) },
    },
    {
      id: "call",
      title: "Select Call back.",
      body: "Your phone or computer dials the number.",
      alt: "A missed call card with Call back ringed.",
      shot: { app: "web", path: "/", actions: [{ do: "click", target: tab(/^Missed calls/) }], highlight: { role: "link", name: "Call back" } },
    },
    {
      id: "mark",
      title: "Select Mark called back.",
      body: "Everyone on the team now sees it was handled, and by whom.",
      alt: "A missed call card with Mark called back ringed.",
      shot: { app: "web", path: "/", actions: [{ do: "click", target: tab(/^Missed calls/) }], highlight: button("Mark called back") },
    },
  ],
  sections: [
    {
      heading: "Good to know",
      bullets: [
        "Turn on missed-call text-back per location in Settings → Locations & channels.",
        "You can get a push alert on your phone when a missed call is still not returned after 15 minutes.",
        "In the Optni app, open the call and use the same buttons.",
      ],
    },
  ],
  related: ["texting-and-text-back", "today", "notifications"],
  keywords: ["missed call", "call back", "callback", "returned call"],
} satisfies Guide;
