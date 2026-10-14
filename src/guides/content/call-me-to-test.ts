import type { Guide } from "../types.ts";
import { button, card, inDialog, label, settingsTab, tab } from "../targets.ts";

export default {
  slug: "call-me-to-test",
  title: "Call me to test: hear your AI receptionist",
  description: "Have Ava call your own phone so you can hear her exactly as a caller would, then read the transcript.",
  category: "start",
  order: 5,
  roles: "Owners and admins.",
  setupByOptni: "Your location needs a phone number. Optni attaches it for you. Until then the Call me tab says it needs a connected number — use Chat or Talk instead.",
  intro:
    "Before you send real calls to Ava, hear her yourself. Call me — the third tab of Test your AI — rings your phone from your business number. You answer and talk to her like a customer would. Test calls are never billed and never create a lead.",
  steps: [
    {
      id: "open",
      title: "On Today, select Test your AI, then the Call me tab.",
      body: "On a location's Voice card in Settings → Locations & channels, Test your AI opens straight on Call me.",
      alt: "The Test your AI panel with the Call me tab ringed.",
      shot: { app: "web", path: "/", actions: [{ do: "click", target: button("Test your AI") }], highlight: inDialog(tab("Call me")) },
    },
    {
      id: "number",
      title: "Enter your phone number with its country code.",
      body: "For example +1 312 555 0100. Mobile numbers and landlines work. Toll-free, premium and short codes can't be called.",
      alt: "The Call me to test dialog with the phone number field ringed.",
      shot: {
        app: "web",
        path: "/",
        actions: [{ do: "click", target: button("Test your AI") }, { do: "click", target: inDialog(tab("Call me")) }, { do: "fill", target: inDialog(label("Your phone number")), value: "+1 612 555 0199" }],
        highlight: inDialog(label("Your phone number")),
      },
    },
    {
      id: "call",
      title: "Select Call me, then answer your phone.",
      body: "Talk to Ava like a caller: ask your hours, ask to book, ask for a person. Hang up when you're done.",
      alt: "The dialog showing the call's progress: queued, ringing, in progress, completed.",
      shot: {
        app: "web-sample",
        path: "/",
        actions: [
          { do: "click", target: button("Test your AI") },
          { do: "click", target: inDialog(tab("Call me")) },
          { do: "fill", target: inDialog(label("Your phone number")), value: "+1 612 555 0199" },
          { do: "click", target: inDialog(button("Call me", true)) },
          { do: "waitFor", target: inDialog({ text: "Completed" }) },
        ],
        highlight: inDialog({ role: "list", name: "Call progress" }),
        noArrow: true,
      },
    },
    {
      id: "transcript",
      title: "Select View call and transcript to read what was said.",
      body: "The call also appears in Calls, marked as a test.",
      alt: "The finished test call with the View call and transcript link ringed.",
      shot: {
        app: "web-sample",
        path: "/",
        actions: [
          { do: "click", target: button("Test your AI") },
          { do: "click", target: inDialog(tab("Call me")) },
          { do: "fill", target: inDialog(label("Your phone number")), value: "+1 612 555 0199" },
          { do: "click", target: inDialog(button("Call me", true)) },
          { do: "waitFor", target: inDialog({ text: "Completed" }) },
        ],
        highlight: inDialog({ role: "link", name: /View call and transcript/ }),
      },
    },
    {
      id: "from-settings",
      title: "To test another location, use Test your AI on its Voice card.",
      alt: "Settings → Locations & channels, Voice — Ava card, with Test your AI ringed.",
      shot: { app: "web", path: "/settings", scrollTo: card("Voice — Ava"), highlight: { ...button("Test your AI"), within: card("Voice — Ava") } },
    },
  ],
  sections: [
    {
      heading: "Good to know",
      bullets: [
        "Ava always answers a test call, even if the location forwards calls or is closed.",
        "If voicemail picks up, Ava says goodbye and hangs up.",
        "Limits: 5 test calls an hour per person and 20 a day per business.",
        "\"Calling isn't switched on for this server yet\" means phone service for your account isn't ready. Contact Optni.",
      ],
    },
  ],
  related: ["test-your-ai", "greeting", "ai-knowledge", "calls"],
  keywords: ["test call", "demo", "try", "hear Ava", "phone test"],
} satisfies Guide;
void settingsTab;
