import type { Guide } from "../types.ts";
import { button, inDialog, label, text } from "../targets.ts";

const openPanel = { do: "click", target: button("Test your AI") } as const;
const offer = [
  openPanel,
  { do: "click", target: { css: '[data-testid="sim-starter"]', nth: 0 } },
  { do: "waitFor", target: inDialog({ text: "Which works for you?" }) },
] as const;
const offerReply = { css: '[data-testid="sim-ai"]', nth: 1 } as const;

export default {
  slug: "feedback",
  title: "Tell us how your AI did",
  description: "Rate any reply in Test your AI or send the Optni team a note. We fix what we can, or explain what the AI did and why — read the answer under Your feedback.",
  category: "start",
  order: 6,
  roles: "Everyone on your team. Owners and admins see the whole team's feedback; staff see their own.",
  intro:
    "While you test your AI, tell us what you think. Give any reply a thumbs up or down, or send a note about the whole test. The Optni team reads every piece of feedback with the conversation and what the AI did, then fixes it for you or explains why the AI answered that way. You get an email and a notification when we reply.",
  steps: [
    {
      id: "thumbs",
      title: "Under any reply in Test your AI, select thumbs up or thumbs down.",
      body: "They're under every reply on the Chat and Talk tabs. Thumbs up sends straight away.",
      alt: "A reply from Ava in Test your AI with the thumbs up and thumbs down buttons ringed.",
      shot: {
        app: "web-sample",
        path: "/",
        actions: [...offer],
        highlight: { css: '[data-testid="reply-feedback"]', nth: 1 },
      },
    },
    {
      id: "what-was-wrong",
      title: "After a thumbs down, pick what was wrong and add a note.",
      body: "Choose one or more — Wrong information, Missed a booking, Should have handed over, Tone, Too long, Didn't understand — and say what it should have said. Then select Send to Optni.",
      alt: "The small form under a reply with Missed a booking selected and a note typed.",
      shot: {
        app: "web-sample",
        path: "/",
        actions: [
          ...offer,
          { do: "click", target: { role: "button", name: /Bad reply/, within: offerReply } },
          { do: "click", target: text("Missed a booking", true) },
          { do: "fill", target: label(/What should it have said/), value: "Offer Saturday mornings too — we're open 9 to 1." },
        ],
        highlight: { css: '[data-testid="reply-feedback-form"]' },
        noArrow: true,
      },
    },
    {
      id: "send-feedback",
      title: "To comment on the whole test, select Send feedback to Optni.",
      body: "Write what you think. Include this test conversation is on, so we see what was said and what the AI did — turn it off to send only your note.",
      alt: "The Send feedback to Optni dialog with Include this test conversation ringed.",
      shot: {
        app: "web-sample",
        path: "/",
        actions: [...offer, { do: "click", target: button("Send feedback to Optni") }, { do: "waitFor", target: { css: '[data-testid="send-feedback-dialog"]' } }, { do: "wait", ms: 400 }],
        highlight: { label: /Include this test conversation/ },
      },
    },
    {
      id: "your-feedback",
      title: "Read our replies under Help → Your feedback.",
      body: "Open the account menu at the top right. It's also linked from the Test your AI panel.",
      alt: "The account menu open with Your feedback ringed under Help.",
      shot: { app: "web-sample", path: "/", actions: [{ do: "click", target: button("Account menu") }], highlight: { role: "menuitem", name: "Your feedback" } },
    },
    {
      id: "list",
      title: "Check the status of each piece of feedback.",
      body: "Sent, Looking into it, Fixed, Answered or Closed. Optni replied shows when there's an answer to read.",
      alt: "The Your feedback list with status chips and an Optni replied chip.",
      shot: { app: "web-sample", path: "/feedback", actions: [{ do: "waitFor", target: { css: '[data-testid="feedback-row"]' } }], highlight: { css: '[data-testid="feedback-list"]' }, noArrow: true },
    },
    {
      id: "reply",
      title: "Open one to see our reply next to the conversation.",
      body: "The reply you rated is marked, and What the AI did shows each step it took.",
      alt: "A feedback page with the Optni team's reply ringed above the test conversation.",
      shot: {
        app: "web-sample",
        path: "/feedback",
        actions: [{ do: "click", target: { css: '[data-testid="feedback-row"]:has-text("Optni replied")' } }, { do: "waitFor", target: { css: '[data-testid="feedback-reply"]' } }],
        highlight: { css: '[data-testid="feedback-reply"]' },
        noArrow: true,
      },
    },
    {
      id: "phone",
      title: "On your phone, it's the same page.",
      alt: "Your feedback on a phone, showing the list of feedback with status chips.",
      shot: { app: "web-sample", viewport: "mobile", path: "/feedback", actions: [{ do: "waitFor", target: { css: '[data-testid="feedback-row"]' } }] },
    },
  ],
  sections: [
    {
      heading: "What the statuses mean",
      table: {
        head: ["Status", "What it means"],
        rows: [
          ["Sent", "We have it and haven't looked yet."],
          ["Looking into it", "Someone on the Optni team is checking the conversation."],
          ["Fixed", "We changed something for you. Test again to hear the difference."],
          ["Answered", "We explained what the AI did and why — often a setting you can change yourself."],
          ["Closed", "We won't change this one; the reply says why."],
        ],
      },
    },
    {
      heading: "Good to know",
      bullets: [
        "We see the test conversation as it was when you sent the feedback, and what the AI did at each step.",
        "Many answers come down to your settings: hours under Locations, and prices, policies and FAQs under What your AI should know.",
        "When we reply you get an email and a notification. The email only links here — the reply itself stays in Optni.",
        "You can send up to 60 pieces of feedback a day.",
      ],
    },
  ],
  related: ["test-your-ai", "ai-knowledge", "locations"],
  keywords: ["feedback", "thumbs up", "thumbs down", "report a problem", "wrong answer", "reply from Optni", "your feedback", "support"],
} satisfies Guide;
