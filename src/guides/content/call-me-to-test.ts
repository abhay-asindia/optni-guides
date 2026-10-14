import type { Guide } from "../types.ts";
import { button, card, inDialog, label, settingsTab } from "../targets.ts";

export default {
  slug: "call-me-to-test",
  title: "Call me to test: hear your AI receptionist",
  description: "Have Ava call your own phone so you can hear her exactly as a caller would, then read the transcript.",
  category: "start",
  order: 4,
  roles: "Owners and admins.",
  setupByOptni: "Your location needs a phone number. Optni attaches it for you. Until then the button says there is nothing to call from.",
  intro:
    "Before you send real calls to Ava, hear her yourself. Call me to test rings your phone from your business number. You answer and talk to her like a customer would. Test calls are never billed and never create a lead.",
  steps: [
    {
      id: "open",
      title: "On Today, select Call me to test.",
      body: "It is also on each location's Voice card in Settings → Locations & channels.",
      alt: "The Today page header with the Call me to test button ringed.",
      shot: { app: "web", path: "/", highlight: button("Call me to test") },
    },
    {
      id: "number",
      title: "Enter your phone number with its country code.",
      body: "For example +1 312 555 0100. Mobile numbers and landlines work. Toll-free, premium and short codes can't be called.",
      alt: "The Call me to test dialog with the phone number field ringed.",
      shot: {
        app: "web",
        path: "/",
        actions: [{ do: "click", target: button("Call me to test") }, { do: "fill", target: inDialog(label("Your phone number")), value: "+1 612 555 0199" }],
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
          { do: "click", target: button("Call me to test") },
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
          { do: "click", target: button("Call me to test") },
          { do: "fill", target: inDialog(label("Your phone number")), value: "+1 612 555 0199" },
          { do: "click", target: inDialog(button("Call me", true)) },
          { do: "waitFor", target: inDialog({ text: "Completed" }) },
        ],
        highlight: inDialog({ role: "link", name: /View call and transcript/ }),
      },
    },
    {
      id: "from-settings",
      title: "To test another location, use Call me to test on its Voice card.",
      alt: "Settings → Locations & channels, Voice — Ava card, with Call me to test ringed.",
      shot: { app: "web", path: "/settings", scrollTo: card("Voice — Ava"), highlight: { ...button("Call me to test"), within: card("Voice — Ava") } },
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
  related: ["greeting", "ai-knowledge", "calls"],
  keywords: ["test call", "demo", "try", "hear Ava", "phone test"],
} satisfies Guide;
void settingsTab;
