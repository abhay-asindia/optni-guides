import type { Guide } from "../types.ts";
import { button, inDialog } from "../targets.ts";

const open = { do: "click", target: button(/^New appointment/) } as const;
const pickType = { do: "click", target: inDialog({ role: "radio", nth: 0 }) } as const;
const next = { do: "click", target: inDialog(button("Next", true)) } as const;
const pickTime = { do: "click", target: inDialog({ role: "radio", name: /\d:\d\d (AM|PM)/, nth: 2 }) } as const;
const nextAfterTime = { do: "click", target: inDialog(button(/— next$/)) } as const;
const search = { do: "fill", target: inDialog({ label: "Search contacts" }), value: "a" } as const;
const pickContact = { do: "click", target: inDialog({ css: "ul[aria-label='Matching contacts'] button", nth: 0 }) } as const;

export default {
  slug: "slot-taken",
  title: "When a time is taken while you book",
  description: "Why you're sent back to pick another time, and what to do next.",
  category: "bookings",
  order: 4,
  roles: "Everyone.",
  intro:
    "Ava, Max and your team all book from the same times. If two people try to book the same time at once, only the first one gets it. Optni checks this at the very last moment, so nothing is ever double-booked.",
  steps: [
    {
      id: "notice",
      title: "If the time was just taken, read the note and pick another time.",
      body: "The list of times is already refreshed. Your type, provider and customer are kept.",
      alt: "The booking dialog back on the time step, with a note that the chosen time was just taken.",
      shot: {
        app: "web-sample",
        path: "/calendar?scenario=slot-taken",
        actions: [open, pickType, next, pickTime, nextAfterTime, search, pickContact, next, { do: "click", target: inDialog(button(/^Book /)) }, { do: "waitFor", target: inDialog({ text: /was just taken/ }) }],
        highlight: inDialog({ text: /was just taken/ }),
      },
    },
    { id: "again", title: "Choose a new time and book again.", body: "The same happens when you reschedule: the times refresh and you pick another." },
  ],
  sections: [
    {
      heading: "Why this happens",
      bullets: [
        "A caller may have just booked that time with Ava, or a texter with Max.",
        "A teammate may have booked it from another screen.",
        "A connected calendar may have filled that time.",
      ],
    },
  ],
  related: ["new-booking", "change-a-booking", "integrations"],
  keywords: ["SLOT_TAKEN", "double booking", "time taken", "slot unavailable", "conflict"],
} satisfies Guide;
