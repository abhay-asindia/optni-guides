import type { Guide } from "../types.ts";
import { sidebar } from "../targets.ts";

export default {
  slug: "insights",
  title: "Insights",
  description: "See calls, texts and bookings per day, call outcomes and who made the bookings, for any date range.",
  category: "leads",
  order: 5,
  roles: "Everyone. Staff see their own locations.",
  intro: "Insights shows what your AI front desk did over time. The location picker in the top bar applies to every number here.",
  steps: [
    {
      id: "open",
      title: "Select Insights in the sidebar.",
      alt: "The Insights page with totals, a daily chart and call outcomes.",
      shot: { app: "web", path: "/insights", highlight: sidebar("Insights") },
    },
    {
      id: "range",
      title: "Pick a range: 7, 14, 30 or 90 days.",
      alt: "The date range buttons ringed.",
      shot: { app: "web", path: "/insights", highlight: { role: "group", name: "Date range" } },
    },
    {
      id: "chart",
      title: "Hover or tab through the chart to see each day.",
      body: "Switch to Table to read the same numbers as a table.",
      alt: "The calls and texts per day chart.",
      shot: { app: "web", path: "/insights", highlight: { role: "list", name: "Daily calls and texts" }, noArrow: true },
    },
    {
      id: "outcomes",
      title: "Check call outcomes and who booked.",
      body: "A high share of transferred calls or messages can mean the AI needs more answers. See What your AI should know.",
      alt: "The call outcomes breakdown.",
      shot: { app: "web", path: "/insights", scrollTo: { text: "Call outcomes", exact: true }, highlight: { text: "Call outcomes", exact: true } },
    },
  ],
  sections: [
    {
      heading: "What the totals mean",
      bullets: [
        "Interactions — calls plus texts in the range.",
        "Bookings — made by Ava, Max and staff.",
        "Transferred or message — the share of calls sent to staff or where a message was taken.",
        "Missed calls — calls nobody answered.",
      ],
    },
  ],
  related: ["calls", "ai-knowledge", "billing-and-usage"],
  keywords: ["reports", "analytics", "stats", "statistics", "charts", "performance"],
} satisfies Guide;
