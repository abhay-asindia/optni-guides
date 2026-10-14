import type { Guide } from "../types.ts";

export default {
  slug: "mobile-app",
  title: "The Optni mobile app",
  description: "Handle handovers, reply to customers, confirm bookings and call back missed callers from your phone.",
  category: "mobile",
  order: 2,
  roles: "Everyone.",
  setupByOptni: "Ask Optni for the app download link for your team. Sign in with the same email and password as the dashboard.",
  intro: "The Optni app is for when you're away from the desk. It has four tabs — Today, Inbox, Leads and Schedule — plus More for settings.",
  steps: [
    {
      id: "today",
      title: "Open Today to see what needs you.",
      body: "Handovers come first, then bookings to confirm and missed calls.",
      alt: "The app's Today screen with handed-over conversations and appointments to confirm.",
      shot: { app: "app", path: "/", highlight: { text: "Handed over to you" } },
    },
    {
      id: "tap",
      title: "Tap a notification to go straight to it.",
      body: "A handover opens the conversation, a booking opens the booking, a missed call opens Today and a new lead opens the lead. If it's for another of your businesses, the app switches first.",
    },
    {
      id: "thread",
      title: "In a conversation, tap Take over to reply yourself.",
      body: "Tap Hand back to AI when you're done.",
      alt: "A conversation in the app with the Take over button.",
      shot: { app: "app", path: "/inbox", actions: [{ do: "click", target: { text: "Victor Almeida" } }, { do: "wait", ms: 1200 }], highlight: { role: "button", name: "Take over" } },
    },
    {
      id: "confirm",
      title: "On Today, tap Confirm on a booking the AI made.",
      alt: "An appointment to confirm with its Confirm button ringed.",
      shot: { app: "app", path: "/", scrollTo: { role: "button", name: /^Confirm / }, highlight: { role: "button", name: /^Confirm / } },
    },
    {
      id: "schedule",
      title: "Open Schedule to see the day and book someone.",
      alt: "The app's Schedule screen.",
      shot: { app: "app", path: "/schedule", highlight: { role: "button", name: /^New/ } },
    },
    {
      id: "more",
      title: "Open More for notifications, security and signing out.",
      alt: "The app's More screen.",
      shot: { app: "app", path: "/more", highlight: { role: "button", name: "Notification settings" } },
    },
  ],
  sections: [
    {
      heading: "Good to know",
      bullets: [
        "Owners and admins enter their 6-digit code after the password, like on the web.",
        "Staff only see their own locations.",
      ],
    },
  ],
  related: ["notifications", "inbox-handovers", "today"],
  keywords: ["app", "iPhone", "Android", "mobile", "phone app", "push"],
} satisfies Guide;
