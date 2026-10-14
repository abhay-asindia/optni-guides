import type { Guide } from "../types.ts";
import { settingsTab } from "../targets.ts";

export default {
  slug: "billing-and-usage",
  title: "Plans, billing and what counts as an interaction",
  description: "See your plan, how many interactions you've used, seats, overage, and how to change plan or update payment details.",
  category: "billing",
  order: 1,
  roles: "Owners manage billing. Admins can see it.",
  intro: "Each plan includes a number of interactions a month and a number of seats. You see your usage as it happens, and any overage before it is charged.",
  steps: [
    {
      id: "open",
      title: "Go to Settings → Billing & usage.",
      alt: "The Billing & usage page with the current plan, usage bar and plan choices.",
      shot: { app: "web", path: "/settings/billing", hide: [{ css: "div.shadow-card:has(:text('Billing is off on this server'))" }], highlight: settingsTab("Billing & usage") },
    },
    {
      id: "usage",
      title: "Check interactions used this period.",
      body: "The card also shows the price, overage so far, the price of each extra interaction and seats used.",
      alt: "The current plan card with interactions used of included.",
      shot: { app: "web", path: "/settings/billing", hide: [{ css: "div.shadow-card:has(:text('Billing is off on this server'))" }], highlight: { role: "progressbar", name: "Interactions used of included" } },
    },
    {
      id: "change",
      title: "To change plan, pick Monthly or Annual, then select Change to … on a plan.",
      body: "Annual costs 10 months' price for 12 months.",
      alt: "The Change plan section with Monthly / Annual and three plans.",
      shot: { app: "web", path: "/settings/billing", hide: [{ css: "div.shadow-card:has(:text('Billing is off on this server'))" }], scrollTo: { role: "group", name: "Billing interval" }, highlight: { role: "group", name: "Billing interval" } },
    },
    {
      id: "portal",
      title: "Select Manage billing for invoices, payment method and tax details.",
      body: "It opens the secure Stripe billing portal.",
      alt: "The Manage billing button ringed.",
      shot: { app: "web", path: "/settings/billing", hide: [{ css: "div.shadow-card:has(:text('Billing is off on this server'))" }], highlight: { role: "button", name: "Manage billing" } },
    },
  ],
  sections: [
    {
      heading: "Plans",
      table: {
        head: ["Plan", "Price", "Interactions a month", "Seats", "Each extra interaction"],
        rows: [
          ["Starter", "$99 / month", "200", "1", "$0.45"],
          ["Growth", "$249 / month", "750", "3", "$0.40"],
          ["Pro", "$499 / month", "2,000", "10", "$0.35"],
        ],
        caption: "Annual billing is 10× the monthly price.",
      },
    },
    {
      heading: "What counts as an interaction",
      bullets: [
        "An answered call counts one interaction for each started 5 minutes. A 3-minute call is 1; a 7-minute call is 2.",
        "A text conversation counts one interaction when a text starts a thread — that is, no other text in the previous 24 hours.",
        "Missed calls and test calls from Call me to test don't count.",
      ],
    },
    {
      heading: "Seats",
      paragraphs: ["Each active teammate and each pending invite uses a seat. To add people beyond your plan's seats, change plan."],
    },
  ],
  related: ["invite-your-team", "insights"],
  keywords: ["billing", "plan", "pricing", "price", "invoice", "payment", "usage", "overage", "interactions", "seats", "Stripe", "subscription"],
} satisfies Guide;
