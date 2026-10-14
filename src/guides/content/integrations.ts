import type { Guide } from "../types.ts";
import { card, settingsTab } from "../targets.ts";

export default {
  slug: "integrations",
  title: "Connect Google Calendar or Open Dental",
  description: "Connect providers' calendars so busy time is never offered and new bookings are written back. What \"not configured\" means.",
  category: "settings",
  order: 3,
  roles: "Owners and admins.",
  setupByOptni:
    "Calendar connections are switched on for your account by Optni. If you see \"Not configured on this server\", contact Optni — there is nothing to fix on your side.",
  intro:
    "Optni has its own calendar and works without any connection. If your team already lives in Google Calendar, or your practice uses Open Dental, connect it: busy time there is never offered, and bookings Ava, Max and staff make are written back.",
  steps: [
    {
      id: "open",
      title: "Go to Settings → Website & integrations.",
      alt: "The Website & integrations page with Google Calendar and Open Dental cards.",
      shot: { app: "web", path: "/settings/integrations", highlight: settingsTab("Website & integrations") },
    },
    {
      id: "google",
      title: "Select Connect Google Calendar.",
      body: "Sign in with the Google account that owns the providers' calendars and allow access. You come back to this page, which says Connected.",
      alt: "The Google Calendar card with the Connect Google Calendar button ringed.",
      shot: { app: "web", path: "/settings/integrations", scrollTo: card("Google Calendar"), highlight: { role: "button", name: "Connect Google Calendar" } },
    },
    {
      id: "open-dental",
      title: "For Open Dental, paste each office's customer key and select Connect.",
      body: "Find the key in Open Dental under Setup → Advanced Setup → API. Each location has its own key.",
      alt: "The Open Dental card with a customer key field per location.",
      shot: { app: "web", path: "/settings/integrations", scrollTo: card("Open Dental"), highlight: { label: "Customer key" } },
    },
    {
      id: "not-configured",
      title: "If connecting says Not configured on this server, contact Optni.",
      body: "It means the connection hasn't been switched on for your account yet.",
      alt: "A calendar card showing Not configured on this server.",
      shot: {
        app: "web",
        path: "/settings/integrations",
        actions: [{ do: "click", target: { role: "button", name: "Connect Google Calendar" } }, { do: "waitFor", target: { text: "Not configured on this server" } }],
        scrollTo: card("Google Calendar"),
        highlight: { text: "Not configured on this server" },
      },
    },
  ],
  sections: [
    {
      heading: "Statuses",
      bullets: [
        "Not connected — nothing linked yet.",
        "Connected — working. The card shows when it last synced.",
        "Needs attention — the connection stopped (for example, access was removed in Google). Connect again.",
        "Unavailable / Not configured on this server — Optni hasn't switched this connection on for your account yet.",
      ],
    },
    {
      heading: "Good to know",
      bullets: [
        "Open Dental shows only for healthcare and dental businesses.",
        "Disconnecting stops syncing. Bookings already in Optni stay.",
      ],
    },
  ],
  related: ["providers-and-hours", "calendar", "slot-taken"],
  keywords: ["Google Calendar", "Open Dental", "calendar sync", "PMS", "practice management", "integration", "connect"],
} satisfies Guide;
