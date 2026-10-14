import type { Guide } from "../types.ts";

export default {
  slug: "privacy-and-compliance",
  title: "Privacy and compliance basics",
  description: "What Optni does about AI disclosure, call recording notice, STOP and HELP, consent and customer data — stated plainly.",
  category: "help",
  order: 1,
  roles: "Everyone.",
  intro:
    "This page describes what Optni does. It isn't legal advice, and it doesn't promise that using Optni makes your business compliant. Laws differ by state and industry and change over time — check with your own adviser what applies to you.",
  steps: [],
  sections: [
    {
      heading: "AI disclosure",
      bullets: [
        "Ava says she is an AI assistant at the start of every call. The greeting can't be saved without it.",
        "Max's first text back to a missed caller says it is the business's AI assistant.",
      ],
    },
    {
      heading: "Call recording notice",
      bullets: [
        "Every greeting says the call may be recorded. It can't be saved without it.",
        "Recordings are stored encrypted and play only through links that expire after 5 minutes. Each listen is logged.",
      ],
    },
    {
      heading: "Texting: STOP, HELP and quiet hours",
      bullets: [
        "STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, REVOKE or OPTOUT stops all texts to that number, from the AI and from staff. START, UNSTOP or YES turns them back on.",
        "HELP or INFO gets an automatic reply naming the business and how to opt out.",
        "Optni sends no texts between 9 PM and 8 AM in the customer's time zone.",
        "US carriers require business numbers to be registered before they can text. Optni does this for you.",
      ],
    },
    {
      heading: "Consent",
      bullets: [
        "When a website form sends consent text, Optni stores the exact words, when and how it was given.",
        "STOP and START are recorded as consent records too.",
        "Consent records are kept even if you delete the contact (with personal details removed), so an opt-out keeps working.",
        "It's your job to collect consent before marketing texts. Optni's own texts are replies, confirmations, reminders, review requests and missed-call text-backs.",
      ],
    },
    {
      heading: "Customer data",
      bullets: [
        "Names, phone numbers, messages, transcripts and notes are encrypted in storage.",
        "Every time someone opens a conversation, call or booking, it's written to an access log kept for 6 years.",
        "Owners and admins must use two-step verification before they see customer details.",
        "You can export everything about one customer, or delete them. See Contacts.",
      ],
    },
    {
      heading: "Healthcare businesses",
      bullets: [
        "Ava and Max never give medical advice or triage, for healthcare, dental, med spa and veterinary businesses.",
        "HIPAA and Business Associate Agreement (BAA) details are covered with you by Optni during onboarding. Ask your Optni contact; don't send patient information until you have confirmed the agreement is in place.",
      ],
    },
  ],
  related: ["greeting", "opted-out-contacts", "contacts", "website-intake"],
  keywords: ["privacy", "compliance", "HIPAA", "BAA", "TCPA", "consent", "recording law", "AI disclosure", "STOP", "HELP", "security", "encryption"],
} satisfies Guide;
