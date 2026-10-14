import type { Guide } from "../types.ts";

const card = { role: "region", name: "What your AI should know" } as const;

export default {
  slug: "ai-knowledge",
  title: "What your AI should know: about, FAQs and policies",
  description: "Tell Ava and Max about your business, the questions people ask and your policies, so they answer instead of taking a message.",
  category: "settings",
  order: 2,
  roles: "Owners and admins edit. Staff can read it.",
  intro:
    "Ava and Max already know your name, address, hours, booking types and providers. Everything else — what you offer, prices, parking, cancellation rules — comes from this section. If a question isn't covered, they say they don't know and take a message. They never guess prices or policies.",
  steps: [
    {
      id: "open",
      title: "Go to Settings → Business and scroll to What your AI should know.",
      alt: "The What your AI should know card in Settings → Business.",
      shot: { app: "web", path: "/settings/business", scrollTo: card, highlight: card, noArrow: true },
    },
    {
      id: "about",
      title: "Write a short About your business.",
      body: "What you do, who you serve, what you offer and what it costs. Up to 2,000 characters.",
      alt: "The About your business box with an example filled in.",
      shot: {
        app: "web",
        path: "/settings/business",
        actions: [
          {
            do: "fill",
            target: { label: "About your business" },
            value:
              "Lakeside Family Chiropractic is a family chiropractic practice in Minneapolis and Plymouth, MN. We see adults and children for back and neck pain, sports injuries and pregnancy care. New patient exams are 45 minutes and include a consultation and adjustment. We also offer 60-minute massage therapy at Plymouth.",
          },
        ],
        scrollTo: { label: "About your business" },
        highlight: { label: "About your business" },
      },
    },
    {
      id: "add-faq",
      title: "Select Add question for each question your front desk hears every day.",
      alt: "The Add question button ringed.",
      shot: { app: "web", path: "/settings/business", scrollTo: { role: "button", name: "Add question" }, highlight: { role: "button", name: "Add question" } },
    },
    {
      id: "write-faq",
      title: "Type the question the way a customer asks it, and the exact answer.",
      body: "Up to 60 questions. Use the arrows to reorder and the bin to remove one.",
      alt: "A question and answer filled in.",
      shot: {
        app: "web",
        path: "/settings/business",
        actions: [
          { do: "click", target: { role: "button", name: "Add question" } },
          { do: "fill", target: { label: "Question 1", exact: true }, value: "Do you take walk-ins?" },
          { do: "fill", target: { label: "Answer 1", exact: true }, value: "We see walk-ins when there's an opening, but booking ahead is best. Ava or Max can book you now." },
        ],
        scrollTo: { label: "Answer 1", exact: true },
        highlight: { label: "Answer 1", exact: true },
      },
    },
    {
      id: "policies",
      title: "Add your policies.",
      body: "Cancellation, deposits, payment, warranty, what to bring. Up to 2,000 characters.",
      alt: "The Policies box with an example filled in.",
      shot: {
        app: "web",
        path: "/settings/business",
        actions: [{ do: "fill", target: { label: "Policies" }, value: "Please give 24 hours' notice to cancel or move a visit. We accept HSA and FSA cards. Bring a photo ID and your insurance card to your first visit." }],
        scrollTo: { label: "Policies" },
        highlight: { label: "Policies" },
      },
    },
    {
      id: "save",
      title: "Select Save changes.",
      body: "Ava and Max use the new answers on the next call or text. If something is too long, the box is marked and the message says what to fix.",
      alt: "The save bar with Save changes ringed.",
      shot: {
        app: "web",
        path: "/settings/business",
        actions: [{ do: "fill", target: { label: "Policies" }, value: "Please give 24 hours' notice to cancel or move a visit." }],
        highlight: { role: "button", name: "Save changes" },
      },
    },
  ],
  sections: [
    {
      heading: "Writing tips",
      bullets: [
        "Write facts, not marketing. \"New patient exams are 45 minutes and cost $85\" beats \"We offer amazing care\".",
        "Keep numbers and conditions exact. The AI repeats them as written and never adds to them.",
        "One question per FAQ. Write it how people really ask: \"Do you take my insurance?\"",
        "Answer in one to three short sentences. Ava reads them aloud.",
        "Say what to do next: \"Ava or Max can book you now\" or \"We'll have someone call you back\".",
        "Leave out anything you don't want said on the phone, like staff mobile numbers.",
        "For healthcare, don't add medical advice. Ava never gives it, whatever this section says.",
        "Something only one location does (parking, entrance)? Put it in that location's note instead.",
      ],
    },
    {
      heading: "Check it",
      paragraphs: ["After saving, select Try it (next to the help link) and ask Ava or Max one of your questions — the panel stays open beside your settings, so you can fix an answer, save and ask again. Nothing in it is saved or sent. Or use Call me to test to hear Ava on your phone. Check Insights later: fewer transferred calls and messages usually means the answers are working."],
    },
  ],
  related: ["test-your-ai", "review-link-and-location-note", "call-me-to-test", "business-and-industry"],
  keywords: ["knowledge base", "FAQ", "questions", "policies", "about", "prices", "train AI", "what AI knows"],
} satisfies Guide;
