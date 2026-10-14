import type { Guide } from "../types.ts";
import { button, sidebar, tab } from "../targets.ts";

export default {
  slug: "inbox-handovers",
  title: "Inbox: handovers, take over and hand back",
  description: "Read every call and text in one thread, see why the AI handed over, take a conversation over and hand it back.",
  category: "daily",
  order: 2,
  roles: "Everyone. Staff see their own locations.",
  intro:
    "Each customer has one conversation. Calls with Ava and texts with Max appear together, in order, so anyone can pick up where the AI left off. When Ava or Max needs a person, the conversation lands in Needs you.",
  steps: [
    {
      id: "open-inbox",
      title: "Select Inbox in the sidebar.",
      body: "The number on Inbox is how many conversations need you.",
      alt: "The sidebar with Inbox ringed.",
      shot: { app: "web", path: "/inbox", highlight: sidebar("Inbox") },
    },
    {
      id: "tabs",
      title: "Pick a tab: Needs you, With staff, With AI or All.",
      body: "Needs you holds handovers. With staff is what a person is handling. With AI is what Ava and Max are handling.",
      alt: "The conversation list tabs ringed.",
      shot: { app: "web", path: "/inbox", highlight: { role: "tablist" }, noArrow: true },
    },
    {
      id: "reason",
      title: "Open a conversation and read the handover note.",
      body: "The purple note says what the customer needs. Calls show as a block of turns; texts show as bubbles.",
      alt: "A handed-over conversation with the Handed to staff note ringed.",
      shot: { app: "web", path: "/inbox", actions: [{ do: "click", target: { text: "Victor Almeida" } }], highlight: { text: /^Handed to staff:/ } },
    },
    {
      id: "take-over",
      title: "Select Take over to handle it yourself.",
      body: "Ava and Max pause on this customer — calls and texts — until you hand it back. Sending a reply also takes over.",
      alt: "The conversation header with the Take over button ringed.",
      shot: { app: "web", path: "/inbox", actions: [{ do: "click", target: { text: "Victor Almeida" } }], highlight: button("Take over") },
    },
    {
      id: "hand-back",
      title: "When you're done, select Hand back to Max.",
      body: "The AI answers this customer again from the next call or text.",
      alt: "A conversation a staff member is handling, with Hand back to Max ringed.",
      shot: { app: "web", path: "/inbox", actions: [{ do: "click", target: tab(/^With staff/) }, { do: "click", target: { text: "Hannah Okafor" } }], highlight: button("Hand back to Max") },
    },
    {
      id: "contact-panel",
      title: "Use the side panel for the customer's details and bookings.",
      alt: "The contact panel showing the customer, their texting status and their appointments.",
      shot: { app: "web", path: "/inbox", actions: [{ do: "click", target: { text: "Victor Almeida" } }], highlight: { role: "complementary", name: "Contact details" }, noArrow: true },
    },
  ],
  sections: [
    {
      heading: "What the statuses mean",
      bullets: [
        "AI handling — Ava or Max is talking to the customer.",
        "Handed to staff — the AI asked for a person and paused.",
        "Staff replying — a person took over. The AI stays paused.",
        "Live call — Ava is on the phone now. Take over becomes available when the call ends.",
      ],
    },
    {
      heading: "What pausing does",
      bullets: [
        "Max doesn't reply to new texts from this customer.",
        "Missed-call text-back is skipped for them.",
        "New calls go to your forwarding number or voicemail instead of Ava.",
      ],
    },
  ],
  related: ["send-a-message", "opted-out-contacts", "today", "notifications"],
  keywords: ["conversation", "thread", "handoff", "escalation", "take over", "hand back", "pause AI"],
} satisfies Guide;
