import type { Guide } from "../types.ts";
import { button, inDialog, label, tab } from "../targets.ts";

const openPanel = { do: "click", target: button("Test your AI") } as const;
const send = (value: string, who: "Ava" | "Max" = "Ava") =>
  [
    { do: "fill", target: inDialog(label(new RegExp(`Your message to ${who}`))), value },
    { do: "click", target: inDialog(button("Send", true)) },
  ] as const;
const knowledge = { role: "region", name: "What your AI should know" } as const;

export default {
  slug: "test-your-ai",
  title: "Test your AI before going live",
  description: "Chat or talk with Ava and Max in your dashboard — same answers and booking rules as a real call, but nothing is saved, booked or sent.",
  category: "start",
  order: 4,
  roles: "Everyone on your team. Call me (a real test call) is for owners and admins.",
  intro:
    "Before customers call, try your AI receptionist yourself. Test your AI runs the same Ava and Max your callers will get — your greeting, your hours, your booking types and what you told the AI about your business. It's free and needs no phone number: anything the AI books, moves or passes to your team is only a preview. Nothing is saved, booked or sent.",
  steps: [
    {
      id: "open",
      title: "On Today, select Test your AI.",
      body: "It's also on each location's Voice card in Settings, and next to What your AI should know as Try it.",
      alt: "The Today page header with the Test your AI button ringed.",
      shot: { app: "web", path: "/", highlight: button("Test your AI") },
    },
    {
      id: "preview",
      title: "Check the preview banner: nothing here is real.",
      body: "No booking appears in your calendar, nobody is notified, no text is sent and nothing counts toward your plan.",
      alt: "The Test your AI panel with the banner 'Preview — nothing here is saved, booked or sent.' ringed and Ava's greeting below it.",
      shot: {
        app: "web-sample",
        path: "/",
        actions: [openPanel, { do: "waitFor", target: { css: '[data-testid="sim-ai"]' } }],
        highlight: { css: '[data-testid="preview-banner"]' },
      },
    },
    {
      id: "channel",
      title: "Choose Phone call (Ava) or Text message (Max).",
      body: "Phone call starts with your real greeting. You read the words Ava says; callers hear them spoken.",
      alt: "The Phone call (Ava) and Text message (Max) choice ringed.",
      shot: {
        app: "web-sample",
        path: "/",
        actions: [openPanel, { do: "waitFor", target: { css: '[data-testid="sim-ai"]' } }],
        highlight: inDialog({ role: "radiogroup", name: "Test as" }),
      },
    },
    {
      id: "ask",
      title: "Type what a customer would say, or tap a suggestion.",
      body: "Try booking, prices, your hours, asking for a person, and an after-hours message.",
      alt: "A suggestion was tapped and Ava offers two open times.",
      shot: {
        app: "web-sample",
        path: "/",
        actions: [openPanel, { do: "click", target: { css: '[data-testid="sim-starter"]', nth: 0 } }, { do: "waitFor", target: inDialog({ text: "Which works for you?" }) }],
        highlight: { css: '[data-testid="sim-transcript"]' },
        noArrow: true,
      },
    },
    {
      id: "what-it-did",
      title: "Open What the AI did under a reply.",
      body: "It lists each step in plain words — checked times, booked (preview only), took a message, asked for a person.",
      alt: "A finished test booking with What the AI did open, showing 'Booked (preview only — nothing was saved)'.",
      shot: {
        app: "web-sample",
        path: "/",
        actions: [
          openPanel,
          { do: "click", target: { css: '[data-testid="sim-starter"]', nth: 0 } },
          { do: "waitFor", target: inDialog({ text: "Which works for you?" }) },
          ...send("Yes, the first one works"),
          { do: "waitFor", target: inDialog({ text: /full name/ }) },
          ...send("Pat Example"),
          { do: "waitFor", target: inDialog({ text: /You're all set/ }) },
          { do: "click", target: inDialog({ text: /What the AI did/, nth: 1 }) },
        ],
        highlight: { css: '[data-testid="sim-trace"][open]', nth: 0 },
      },
    },
    {
      id: "try-it",
      title: "Fix an answer: edit What your AI should know, save, then select Try it.",
      body: "Try it opens the panel beside your settings, so you can change an answer, save and ask again.",
      alt: "Settings → Business, What your AI should know, with the Try it button ringed.",
      shot: { app: "web", path: "/settings/business", scrollTo: knowledge, highlight: { ...button("Try it", true), within: knowledge } },
    },
    {
      id: "talk",
      title: "To hear Ava, open Talk and select Start call.",
      body: "Talk uses your computer's microphone and your browser's voice — Chrome or Edge. Callers on your real line hear Optni's phone voice, which sounds different. Talk over Ava to interrupt her, like a caller would.",
      alt: "The Talk tab with the browser-voice note and the Start call button ringed.",
      shot: { app: "web-sample", path: "/", actions: [openPanel, { do: "click", target: inDialog(tab("Talk")) }], highlight: inDialog(button("Start call")) },
    },
    {
      id: "call-me",
      title: "Once you have a business number, Call me rings your own phone.",
      body: "Until Optni connects your number, the Call me tab says it needs one — Chat and Talk work without it.",
      alt: "The Call me tab explaining that a connected number is needed.",
      shot: {
        app: "web-sample",
        path: "/?scenario=no-voice-number",
        actions: [{ do: "click", target: button("Try it now") }, { do: "click", target: inDialog(tab("Call me")) }],
        highlight: { css: '[data-testid="call-me-needs-number"]' },
        noArrow: true,
      },
    },
    {
      id: "nudge",
      title: "Not live yet? Today shows Try your AI before going live.",
      alt: "The Try your AI before going live card on Today, with Try it now ringed.",
      shot: { app: "web-sample", path: "/?scenario=no-voice-number", highlight: button("Try it now") },
    },
  ],
  sections: [
    {
      heading: "What is real and what is a preview",
      table: {
        head: ["The AI…", "In Test your AI"],
        rows: [
          ["Checks open times", "Real — your live calendar and hours"],
          ["Answers questions", "Real — your settings and What your AI should know"],
          ["Books, moves or cancels", "Preview — checked like a real booking (a taken time is refused), but nothing is saved"],
          ["Takes a message or asks for a person", "Preview — nobody is notified"],
          ["Sends a text confirmation", "Never — no texts are sent"],
        ],
      },
    },
    {
      heading: "Good to know",
      bullets: [
        "Reset starts a new conversation. Each one lasts up to 40 messages and is forgotten after two hours.",
        "A business can send 300 test messages a day.",
        "Test conversations don't appear in your inbox, calls, leads or calendar and never count toward your plan.",
        "The AI always answers here, even when the location forwards calls, is closed or has calls switched off.",
        "Talk needs Chrome or Edge. In Safari or Firefox, use Chat — it runs the same AI.",
      ],
    },
  ],
  related: ["ai-knowledge", "call-me-to-test", "greeting"],
  keywords: ["test", "try", "simulator", "preview", "demo", "chat with Ava", "talk to Ava", "before going live", "sandbox"],
} satisfies Guide;
