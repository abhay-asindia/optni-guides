import type { Guide } from "../types.ts";
import { card } from "../targets.ts";

const voice = card("Voice — Ava");
// Voice is switched off on the seeded locations until a number is live; switch it on (unsaved) so the card reads as it does for a live business.
const voiceOn = { do: "click", target: { role: "switch", name: "Voice channel enabled" } } as const;

export default {
  slug: "voice-mode-and-transfer",
  title: "Voice: AI answers or forward, live transfer and after hours",
  description: "Choose whether Ava answers every call or your front desk rings first, set the live transfer number, and pick what happens after hours.",
  category: "locations",
  order: 3,
  roles: "Owners and admins.",
  setupByOptni: "Your business phone number is provisioned by Optni. Live transfer needs a number your team answers.",
  intro: "Each location decides how its calls are answered during opening hours and after hours.",
  steps: [
    {
      id: "open",
      title: "In Settings → Locations & channels, find the Voice — Ava card.",
      body: "It shows the location's business number. The switch at the top turns Ava on or off for this location.",
      alt: "The Voice — Ava card.",
      shot: { app: "web", path: "/settings", actions: [voiceOn], scrollTo: voice, highlight: voice, noArrow: true },
    },
    {
      id: "mode",
      title: "Choose how calls are answered during opening hours.",
      body: "Ava answers every call: she books, reschedules, answers questions and hands over when needed. Forward to front desk: your team's phones ring first, and unanswered calls get a missed-call text from Max.",
      alt: "The two choices: Ava answers every call, and Forward to front desk.",
      shot: { app: "web", path: "/settings", actions: [voiceOn], scrollTo: voice, highlight: { role: "radio", name: /Ava answers every call/ } },
    },
    {
      id: "transfer",
      title: "Enter a live transfer number.",
      body: "When a caller asks for a person during opening hours, Ava puts them through to this number. Leave it empty and she takes a message instead. In forward mode the same field is called Forward to: the numbers that ring first, separated by commas.",
      alt: "The Live transfer number field ringed.",
      shot: { app: "web", path: "/settings", actions: [voiceOn], scrollTo: { label: "Live transfer number" }, highlight: { label: "Live transfer number" } },
    },
    {
      id: "after-hours",
      title: "Choose what happens after hours.",
      body: "Ava answers (good if new customers call in the evening), or voicemail (callers leave a message; the transcript lands in the inbox).",
      alt: "The After hours choices ringed.",
      shot: { app: "web", path: "/settings", actions: [voiceOn], scrollTo: { text: "After hours", exact: true }, highlight: { role: "radio", name: /^Voicemail/ } },
    },
    {
      id: "save",
      title: "Select Save changes.",
      alt: "The save bar.",
      shot: { app: "web", path: "/settings", scrollTo: voice, actions: [voiceOn, { do: "click", target: { role: "radio", name: /^Voicemail/ } }], highlight: { role: "button", name: "Save changes" } },
    },
  ],
  sections: [
    {
      heading: "Good to know",
      bullets: [
        "If someone on your team has taken over a customer's conversation, that customer's next call goes to your forwarding number or voicemail, not to Ava.",
        "Ava only transfers while the location is open.",
        "Forward mode needs at least one number to forward to.",
      ],
    },
  ],
  related: ["locations", "texting-and-text-back", "missed-calls", "calls"],
  keywords: ["call forwarding", "forward", "transfer", "live transfer", "after hours", "voicemail", "AI mode"],
} satisfies Guide;
