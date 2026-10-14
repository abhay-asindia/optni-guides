import type { Guide } from "../types.ts";
import { button, label } from "../targets.ts";

export default {
  slug: "reset-password",
  title: "Reset your password",
  description: "Ask for a reset link, then choose a new password. The link works once, for 30 minutes.",
  category: "start",
  order: 3,
  roles: "Everyone.",
  intro: "Forgot your password? Ask for a reset link by email. Resetting signs you out everywhere else.",
  steps: [
    {
      id: "forgot-link",
      title: "On the sign-in screen, select Forgot password?",
      alt: "The sign-in screen with the Forgot password link ringed.",
      shot: { app: "web", as: "signed-out", path: "/sign-in", highlight: { role: "link", name: "Forgot password?" } },
    },
    {
      id: "enter-email",
      title: "Enter your work email and select Send reset link.",
      body: "For your privacy the screen always says a link was sent, even if the email has no account.",
      alt: "The Reset your password screen with the work email field ringed.",
      shot: { app: "web", as: "signed-out", path: "/forgot-password", actions: [{ do: "fill", target: label("Work email"), value: "e2e-owner@example.com" }], highlight: label("Work email") },
    },
    { id: "open-email", title: "Open the email and select the link within 30 minutes.", body: "Each link works once. Ask for a new one if it has expired." },
    { id: "new-password", title: "Type a new password twice and select Save new password.", body: "Use at least 12 characters. Then sign in with it and, for owners and admins, your 6-digit code." },
  ],
  sections: [{ heading: "Good to know", bullets: ["A reset signs out every session on every device.", "Two-step verification stays on. A reset never removes it."] }],
  related: ["sign-in", "recovery-codes"],
  keywords: ["forgot password", "change password", "locked out"],
} satisfies Guide;
void button;
