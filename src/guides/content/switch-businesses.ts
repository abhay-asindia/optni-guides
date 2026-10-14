import type { Guide } from "../types.ts";

const switcher = { role: "button", name: /^Business: / } as const;

export default {
  slug: "switch-businesses",
  title: "Switch between businesses",
  description: "If you belong to more than one business, switch between them from the top bar or the More menu.",
  category: "team",
  order: 2,
  roles: "Anyone who belongs to two or more businesses.",
  intro:
    "One login can belong to several businesses — for example a salon and a spa you both run. Each business has its own data, team, plan and words. You work in one at a time.",
  steps: [
    {
      id: "open",
      title: "Select the business name in the top bar.",
      body: "It only shows when you belong to more than one business.",
      alt: "The top bar with the business switcher ringed.",
      shot: { app: "web-sample", path: "/", highlight: switcher },
    },
    {
      id: "pick",
      title: "Pick the business you want.",
      body: "Each row shows the business, its industry and your role there. The dashboard reloads on Today.",
      alt: "The switcher menu listing three sample businesses with industry and role.",
      shot: { app: "web-sample", path: "/", actions: [{ do: "click", target: switcher }], highlight: { role: "menu" }, noArrow: true },
    },
    {
      id: "words",
      title: "Check the words change with the business.",
      body: "A home-services business sees Customers, Jobs and Technicians instead of Patients, Appointments and Providers.",
      alt: "Today for a sample home-services business, with Customers in the sidebar.",
      shot: {
        app: "web-sample",
        path: "/",
        actions: [{ do: "click", target: switcher }, { do: "click", target: { role: "menuitem", name: /Northstar Home Services/ } }, { do: "wait", ms: 1500 }],
        highlight: { role: "link", name: "Customers", exact: true, within: { role: "complementary", name: "Primary" } },
      },
    },
    {
      id: "mobile",
      title: "On a phone, open More and pick the business under Switch business.",
      alt: "The More sheet on a phone with the Switch business list ringed.",
      shot: { app: "web-sample", viewport: "mobile", path: "/", actions: [{ do: "click", target: { role: "button", name: "More" } }], highlight: { text: "Switch business" } },
    },
  ],
  sections: [
    {
      heading: "Good to know",
      bullets: [
        "Sign-in opens the business you joined first. Switch whenever you need to.",
        "A notification from another business switches you to it before it opens.",
        "Two-step verification carries over when you switch.",
      ],
    },
  ],
  related: ["invite-your-team", "business-and-industry", "notifications"],
  keywords: ["multiple businesses", "accounts", "switch account", "organizations"],
} satisfies Guide;
