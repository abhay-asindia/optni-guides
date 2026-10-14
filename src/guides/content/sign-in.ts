import type { Guide } from "../types.ts";
import { button, label } from "../targets.ts";

export default {
  slug: "sign-in",
  title: "Sign in and set up two-step verification",
  description: "Sign in to the Optni dashboard, set up an authenticator app and enter a 6-digit code at each sign-in.",
  category: "start",
  order: 1,
  roles: "Everyone. Owners and admins must use two-step verification.",
  intro:
    "You sign in with your work email and password. Owners and admins also confirm each sign-in with a 6-digit code from an authenticator app. This keeps your customers' details safe if a password leaks.",
  steps: [
    {
      id: "email-password",
      title: "Enter your work email and password, then select Sign in.",
      body: "Use the email your invite was sent to.",
      alt: "The Optni sign-in screen with the work email filled in and the Sign in button ringed.",
      shot: { app: "web", as: "signed-out", path: "/sign-in", actions: [{ do: "fill", target: label("Work email"), value: "e2e-owner@example.com" }], highlight: button("Sign in", true) },
    },
    {
      id: "scan-qr",
      title: "The first time, scan the QR code with your authenticator app.",
      body: "Any authenticator app works: Google Authenticator, Microsoft Authenticator, 1Password or Authy. If you can't scan, select \"Can't scan? Enter this key instead\" and type the key into the app.",
      alt: "The Set up your authenticator screen with a QR code (hidden in this guide).",
      shot: {
        app: "web",
        as: "signed-out",
        path: "/sign-in",
        actions: [{ do: "signIn", who: "admin" }, { do: "waitFor", target: { role: "heading", name: "Set up your authenticator" } }],
        mask: [{ role: "img", name: "QR code for your authenticator app" }],
        highlight: { role: "img", name: "QR code for your authenticator app" },
      },
    },
    {
      id: "enter-first-code",
      title: "Type the 6-digit code the app shows, then select Verify and turn on.",
      body: "Codes change every 30 seconds. If one fails, wait for the next and try again.",
      alt: "The code field under the QR code, ringed.",
      shot: {
        app: "web",
        as: "signed-out",
        path: "/sign-in",
        actions: [{ do: "signIn", who: "admin" }, { do: "waitFor", target: { role: "heading", name: "Set up your authenticator" } }],
        mask: [{ role: "img", name: "QR code for your authenticator app" }],
        highlight: label("Then enter the 6-digit code it shows"),
      },
    },
    {
      id: "save-codes",
      title: "Save your 10 recovery codes, tick the box and continue.",
      body: "Copy or download them and keep them somewhere safe, away from your phone. Each code works once. See Recovery codes for more.",
      alt: "Ten recovery codes (hidden in this guide) with Copy and Download buttons and a confirmation checkbox.",
      shot: {
        app: "web",
        as: "signed-out",
        path: "/sign-in",
        actions: [{ do: "signIn", who: "admin" }, { do: "waitFor", target: { role: "heading", name: "Set up your authenticator" } }, { do: "enrolMfa", who: "admin" }],
        mask: [{ role: "list", name: "Recovery codes" }],
        highlight: { role: "checkbox" },
      },
    },
    {
      id: "next-time",
      title: "Next time, enter the code from your authenticator app after your password.",
      alt: "The Enter your code step with the 6-digit code field ringed.",
      shot: { app: "web", as: "signed-out", path: "/sign-in", actions: [{ do: "signIn", who: "owner" }, { do: "waitFor", target: label("6-digit code", true) }], highlight: label("6-digit code", true) },
    },
    {
      id: "use-recovery",
      title: "No phone? Select Use a recovery code instead.",
      body: "Type one of your saved codes. Then set up your authenticator again in Settings → Security.",
      alt: "The code step with the Use a recovery code instead link ringed.",
      shot: { app: "web", as: "signed-out", path: "/sign-in", actions: [{ do: "signIn", who: "owner" }, { do: "waitFor", target: label("6-digit code", true) }], highlight: button("Use a recovery code instead") },
    },
  ],
  sections: [
    {
      heading: "Good to know",
      bullets: [
        "Staff sign in with email and password only. Owners and admins need the code before they can see customer details.",
        "If the dashboard asks for a code in the middle of your work, enter it. Your session needed a fresh check.",
        "Signing out (account menu → Sign out) ends the session on the server too, not only in this browser.",
        "Too many wrong tries pause sign-in for a few minutes.",
      ],
    },
  ],
  related: ["recovery-codes", "reset-password", "invite-your-team"],
  keywords: ["login", "log in", "password", "MFA", "2FA", "two-factor", "authenticator", "TOTP", "code"],
} satisfies Guide;
