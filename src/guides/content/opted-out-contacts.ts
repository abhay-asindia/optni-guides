import type { Guide } from "../types.ts";
import { sidebar, tab } from "../targets.ts";

export default {
  slug: "opted-out-contacts",
  title: "Opted-out contacts (STOP)",
  description: "What happens when a customer texts STOP, how to see who opted out, and how they opt back in.",
  category: "daily",
  order: 4,
  roles: "Everyone.",
  intro:
    "When a customer texts STOP (or STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, REVOKE or OPTOUT), Optni stops all texts to them right away — from Max and from your team. You can still call them.",
  steps: [
    {
      id: "thread",
      title: "Open their conversation to see that texting is off.",
      body: "The reply box is switched off and says when they opted out.",
      alt: "A conversation whose reply box says texting is off because the customer opted out.",
      shot: { app: "web", path: "/inbox", actions: [{ do: "click", target: tab(/^All/) }, { do: "fill", target: { placeholder: "Filter by name or phone" }, value: "Neil" }, { do: "wait", ms: 800 }, { do: "click", target: { text: "Neil Varga" } }], highlight: { text: /^Texting is off/ } },
    },
    {
      id: "list",
      title: "To see everyone who opted out, open Contacts → Opted out.",
      body: "In some industries this page is called Patients, Clients or Customers.",
      alt: "The contacts page with the Opted out tab ringed.",
      shot: { app: "web", path: "/contacts", actions: [{ do: "click", target: tab(/^Opted out/) }], highlight: tab(/^Opted out/) },
    },
    { id: "opt-in", title: "To get texts again, the customer texts START to your number.", body: "UNSTOP and YES work too. You can't opt someone back in for them. Carrier rules and US law (the TCPA) require it to come from the customer." },
  ],
  sections: [
    {
      heading: "What still works",
      bullets: [
        "Calls — Ava still answers when they call, and you can call them.",
        "Their history stays in the inbox.",
        "HELP or INFO gets an automatic reply with the location name and how to opt out.",
        "The carrier sends the customer a confirmation when they text STOP.",
      ],
    },
  ],
  related: ["send-a-message", "contacts", "privacy-and-compliance"],
  keywords: ["STOP", "unsubscribe", "opt out", "opt in", "START", "TCPA", "do not text"],
} satisfies Guide;
void sidebar;
