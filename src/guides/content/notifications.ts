import type { Guide } from "../types.ts";
import { settingsTab } from "../targets.ts";

export default {
  slug: "notifications",
  title: "Notifications: what you're alerted about",
  description: "Choose which push alerts reach your phone: handovers, bookings to confirm, missed calls and new leads.",
  category: "mobile",
  order: 1,
  roles: "Everyone (new-lead alerts: owners and admins).",
  intro:
    "Optni sends push notifications to the Optni app on your phone. You choose which kinds you get. The choices are yours alone and follow you to every device you sign in on.",
  steps: [
    {
      id: "open",
      title: "Go to Settings → Notifications.",
      body: "In the app: More → Notifications.",
      alt: "Settings → Notifications listing the alert types with switches.",
      shot: { app: "web", path: "/settings/notifications", highlight: settingsTab("Notifications") },
    },
    {
      id: "choose",
      title: "Switch each kind of alert on or off.",
      alt: "The notification switches ringed.",
      shot: { app: "web", path: "/settings/notifications", highlight: { role: "switch", nth: 0 } },
    },
    {
      id: "app",
      title: "On your phone, allow notifications for the Optni app.",
      body: "The app asks the first time you sign in. If you said no, turn them on in your phone's settings.",
      alt: "The app's Notifications screen with the same switches.",
      shot: { app: "app", path: "/notifications", highlight: { text: "AI hands a conversation to you" }, hide: [{ text: "Notifications are off for this device" }, { text: /web preview cannot receive/ }] },
    },
  ],
  sections: [
    {
      heading: "The alerts",
      bullets: [
        "AI hands a conversation to you — Ava or Max needs a person.",
        "Appointments to confirm — the AI made a booking that needs staff confirmation.",
        "Missed calls — a missed call is still not returned after 15 minutes.",
        "New leads — someone new called, texted or filled in your website form (owners and admins).",
      ],
    },
    {
      heading: "Privacy on the lock screen",
      paragraphs: ["Alerts never include the customer's name or message. Open the app to see who it is."],
    },
  ],
  related: ["mobile-app", "inbox-handovers", "missed-calls", "leads"],
  keywords: ["push notifications", "alerts", "notify", "phone alerts", "mobile"],
} satisfies Guide;
