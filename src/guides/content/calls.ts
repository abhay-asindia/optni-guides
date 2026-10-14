import type { Guide } from "../types.ts";
import { sidebar, tab } from "../targets.ts";

export default {
  slug: "calls",
  title: "Calls: outcomes, transcripts and recordings",
  description: "See every call Ava took, what happened on it, read the transcript and play the recording.",
  category: "daily",
  order: 5,
  roles: "Everyone. Staff see their own locations.",
  setupByOptni: "Call recording is switched on by Optni for your account. Without it, calls still get a summary and transcript but no recording.",
  intro: "Every call to your business numbers is listed with a short AI summary. Open one to read the full transcript or listen to it.",
  steps: [
    {
      id: "open",
      title: "Select Calls in the sidebar.",
      alt: "The Calls page with numbers at the top and a list of calls with outcome chips and AI summaries.",
      shot: { app: "web", path: "/calls", highlight: sidebar("Calls") },
    },
    {
      id: "filter",
      title: "Filter with the tabs: Booked, Transferred or message, Missed.",
      alt: "The calls tabs ringed.",
      shot: { app: "web", path: "/calls", highlight: { role: "tablist", name: "Filter calls" }, noArrow: true },
    },
    {
      id: "outcome",
      title: "Read the outcome chip and summary on each row.",
      body: "The summary is two sentences or less. It appears about a minute after the call ends.",
      alt: "A call row with its outcome chip and AI summary ringed.",
      shot: { app: "web", path: "/calls", highlight: { role: "row", nth: 3 }, noArrow: true },
    },
    {
      id: "detail",
      title: "Select a call to open it.",
      body: "You see who called, which number they called, how long it lasted and the transcript, turn by turn.",
      alt: "A call's detail page with the AI summary and the transcript.",
      shot: { app: "web", path: "/calls", actions: [{ do: "click", target: { text: "Paula Wendt" } }], highlight: { role: "heading", name: "Transcript" } },
    },
    {
      id: "play",
      title: "Select Play recording to listen.",
      body: "The recording streams through a link that expires after 5 minutes. Every listen is logged.",
      alt: "The recording player with the play button ringed.",
      shot: { app: "web-sample", path: "/calls", actions: [{ do: "click", target: { role: "row", name: /Booked/ } }, { do: "waitFor", target: { role: "button", name: "Play recording" } }], highlight: { role: "button", name: "Play recording" } },
    },
  ],
  sections: [
    {
      heading: "Outcomes",
      bullets: [
        "Booked — Ava made a booking.",
        "Rescheduled / Cancelled — Ava moved or cancelled one.",
        "Answered — Ava answered a question; nothing to book.",
        "Message taken — Ava took a message for staff. It's in the inbox as a handover.",
        "Transferred — Ava put the caller through to your live transfer number.",
        "Missed — nobody answered (for example, forwarding was on and no one picked up).",
        "Other — anything else.",
      ],
    },
    {
      heading: "Good to know",
      bullets: [
        "A call that is still going shows as live. Its summary is written when it ends.",
        "Test calls from Call me to test are marked as tests.",
        "Missed calls with no recording say so — there is nothing to play.",
      ],
    },
  ],
  related: ["today", "inbox-handovers", "voice-mode-and-transfer", "call-me-to-test"],
  keywords: ["call log", "recording", "transcript", "voicemail", "outcome", "summary", "listen"],
} satisfies Guide;
void tab;
