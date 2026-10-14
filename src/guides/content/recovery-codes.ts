import type { Guide } from "../types.ts";
import { button, inDialog, settingsTab } from "../targets.ts";

export default {
  slug: "recovery-codes",
  title: "Recovery codes",
  description: "Make a new set of recovery codes, and use one to sign in when you don't have your authenticator.",
  category: "start",
  order: 2,
  roles: "Owners and admins (anyone with two-step verification on).",
  intro: "Recovery codes get you in when your phone is lost or reset. You get 10 when you set up your authenticator. Each works once.",
  steps: [
    {
      id: "open-security",
      title: "Go to Settings → Security.",
      alt: "Settings with the Security tab ringed.",
      shot: { app: "web", path: "/settings/security", highlight: settingsTab("Security") },
    },
    {
      id: "new-codes",
      title: "Select New recovery codes.",
      body: "Making new codes switches off all of your old ones.",
      alt: "The Two-step verification card with the New recovery codes button ringed.",
      shot: { app: "web", path: "/settings/security", highlight: button("New recovery codes") },
    },
    {
      id: "confirm",
      title: "Select Make new codes to confirm.",
      alt: "A confirmation dialog warning that old codes stop working, with Make new codes ringed.",
      shot: { app: "web", path: "/settings/security", actions: [{ do: "click", target: button("New recovery codes") }], highlight: inDialog(button("Make new codes")) },
    },
    {
      id: "save",
      title: "Copy or download the codes and keep them safe.",
      body: "Store them in a password manager or print them. Don't keep them only on the phone that has your authenticator.",
      alt: "Ten new recovery codes (hidden in this guide) with Copy codes and Download buttons.",
      shot: {
        app: "web",
        path: "/settings/security",
        actions: [{ do: "click", target: button("New recovery codes") }, { do: "click", target: inDialog(button("Make new codes")) }, { do: "waitFor", target: { role: "list", name: "Recovery codes" } }],
        mask: [{ role: "list", name: "Recovery codes" }],
        highlight: button("Copy codes"),
      },
    },
  ],
  sections: [
    {
      heading: "Signing in with a recovery code",
      bullets: [
        "Enter your email and password as usual.",
        "On the code step, select Use a recovery code instead and type one code.",
        "That code is now used up. Set up your authenticator again in Settings → Security and make new codes.",
      ],
    },
    { heading: "Lost your codes and your phone?", paragraphs: ["Ask the business owner, or contact Optni support. For your safety we confirm who you are before we reset two-step verification."] },
  ],
  related: ["sign-in", "reset-password"],
  keywords: ["backup codes", "lost phone", "MFA", "2FA", "authenticator"],
} satisfies Guide;
