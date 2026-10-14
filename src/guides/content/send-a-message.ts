import type { Guide } from "../types.ts";

const composer = { placeholder: /^Reply to / } as const;

export default {
  slug: "send-a-message",
  title: "Send a text to a customer",
  description: "Reply from the inbox. Sending takes the conversation over from the AI until you hand it back.",
  category: "daily",
  order: 3,
  roles: "Everyone.",
  setupByOptni: "Texting needs a registered business number. Optni registers it for you (US carriers require this). Until then, sending says texting is off for the location.",
  intro: "You can text any customer who hasn't opted out. The text goes from your location's business number, so replies come back to the same thread.",
  steps: [
    {
      id: "open",
      title: "Open the conversation in Inbox.",
      alt: "A conversation open in the inbox.",
      shot: { app: "web", path: "/inbox", actions: [{ do: "click", target: { text: "Victor Almeida" } }], highlight: { role: "log" }, noArrow: true },
    },
    {
      id: "type",
      title: "Type your reply in the box at the bottom.",
      body: "Up to 320 characters. Keep it short — it's a text.",
      alt: "The reply box with a message typed in.",
      shot: {
        app: "web",
        path: "/inbox",
        actions: [{ do: "click", target: { text: "Victor Almeida" } }, { do: "fill", target: composer, value: "Hi Victor, this is the front desk. Your itemized receipt is on its way by email today." }],
        highlight: composer,
      },
    },
    {
      id: "send",
      title: "Select the send button.",
      body: "Or press Ctrl+Enter (⌘+Enter on a Mac). The note above the box reminds you that sending takes over from the AI.",
      alt: "The amber send button ringed, with the take-over note above the reply box.",
      shot: {
        app: "web",
        path: "/inbox",
        actions: [{ do: "click", target: { text: "Victor Almeida" } }, { do: "fill", target: composer, value: "Hi Victor, this is the front desk. Your itemized receipt is on its way by email today." }],
        highlight: { role: "button", name: /^Send text/ },
      },
    },
  ],
  sections: [
    {
      heading: "Good to know",
      bullets: [
        "The line under the box shows which number the text goes from.",
        "No texts go out between 9 PM and 8 AM in the customer's time zone. Ava and Max follow this too.",
        "If the customer replied STOP, the box is switched off. See Opted-out contacts.",
        "When you're done, hand the conversation back so Ava and Max take over again.",
      ],
    },
  ],
  related: ["inbox-handovers", "opted-out-contacts", "privacy-and-compliance"],
  keywords: ["SMS", "text message", "reply", "message customer"],
} satisfies Guide;
