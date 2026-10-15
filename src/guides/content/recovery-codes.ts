import type { Guide } from "../types.ts";
import { button, inDialog, settingsTab } from "../targets.ts";

// Optni's founder co-owns the synthetic test business (PLATFORM.md §12.4): his row is covered.
const founderRow = { role: "row", name: /founder@optni\.ai|Optni Founder/ } as const;

export default {
  slug: "recovery-codes",
  title: "Lost your phone?",
  description: "Get back in when you lose the phone with your authenticator: an owner resets it from Settings → Team & seats, and the Optni team can help if the owner is locked out.",
  category: "start",
  order: 2,
  roles: "Owners reset other teammates. Everyone with two-step verification can read this.",
  intro:
    "If you lose or replace the phone with your authenticator app, you don't need to keep anything safe in advance. Your account owner resets your authenticator, and you set it up again the next time you sign in.",
  steps: [
    {
      id: "open-team",
      title: "As the owner, go to Settings → Team & seats.",
      alt: "Settings with the Team & seats tab ringed.",
      shot: { app: "web", path: "/settings/team", mask: [founderRow], highlight: settingsTab("Team & seats") },
    },
    {
      id: "reset",
      title: "Select Reset authenticator on your teammate's row.",
      body: "Only owners see this, and only for other people. Your own authenticator is changed in Settings → Security with Set up again.",
      alt: "The team list with the Reset authenticator button on a teammate's row ringed.",
      shot: { app: "web", path: "/settings/team", mask: [founderRow], highlight: button(/^Reset authenticator for /) },
    },
    {
      id: "confirm",
      title: "Select Reset authenticator to confirm.",
      body: "They're signed out everywhere. The next time they sign in, they scan a new QR code and type one code from their app.",
      alt: "A confirmation dialog explaining the person will set up their authenticator again, with Reset authenticator ringed.",
      shot: { app: "web", path: "/settings/team", mask: [founderRow], actions: [{ do: "click", target: button(/^Reset authenticator for /) }], highlight: inDialog(button("Reset authenticator", true)) },
    },
  ],
  sections: [
    {
      heading: "If you're the one who lost your phone",
      bullets: [
        "Ask your account owner to reset your authenticator, then sign in and set it up on your new phone.",
        "Still have your old phone? Go to Settings → Security and select Set up again. Your old app keeps working until you confirm a code from the new one.",
      ],
    },
    {
      heading: "If the owner is locked out",
      paragraphs: ["Contact the Optni team. For your safety we confirm who you are before we reset your authenticator."],
    },
    {
      heading: "Backup codes are optional",
      paragraphs: [
        "Most people don't need them. If you want a way to sign in without your phone, open Settings → Security → Advanced: backup codes (optional) and select Make backup codes. Each code works once, and making new ones switches the old ones off. On the sign-in code step, select Use a backup code to use one.",
      ],
    },
  ],
  related: ["sign-in", "invite-your-team", "reset-password"],
  keywords: ["lost phone", "new phone", "reset authenticator", "backup codes", "recovery codes", "locked out", "MFA", "2FA", "authenticator"],
} satisfies Guide;
