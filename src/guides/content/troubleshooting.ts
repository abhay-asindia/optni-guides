import type { Guide } from "../types.ts";

export default {
  slug: "troubleshooting",
  title: "Troubleshooting and FAQ",
  description: "Answers to the questions owners and staff ask most, from sign-in codes to texts that won't send.",
  category: "help",
  order: 2,
  intro: "Short answers to common problems. If yours isn't here, contact Optni support.",
  steps: [],
  sections: [
    {
      heading: "Signing in",
      bullets: [
        "\"That code didn't work\" — codes change every 30 seconds. Wait for a new one. Check your phone's clock is set automatically.",
        "Lost your phone — use a recovery code, then set up the authenticator again in Settings → Security.",
        "\"Too many requests\" — wait a few minutes before trying again.",
        "Invite link doesn't work — it has expired (after 7 days) or was used. Ask for a new invite.",
      ],
    },
    {
      heading: "Texts",
      bullets: [
        "The reply box is greyed out — the customer texted STOP. Only they can turn texts back on, by texting START.",
        "Sending says texting is off for this location — the business number isn't registered for texting yet. Optni handles this; contact us.",
        "A text-back didn't go out at night — Optni holds texts between 9 PM and 8 AM in the customer's time zone.",
      ],
    },
    {
      heading: "Calls",
      bullets: [
        "Call me to test says calling isn't switched on — phone service for your account isn't ready yet. Contact Optni.",
        "\"This location has no phone number yet\" — Optni hasn't attached a number to it. Contact us.",
        "Ava took a message instead of transferring — the location was closed, or no live transfer number is set.",
        "Ava said she didn't know something — add it to What your AI should know.",
        "No recording on a call — missed calls have none, and recording must be switched on for your account.",
      ],
    },
    {
      heading: "Bookings",
      bullets: [
        "No times are offered — check the provider works that day, does that booking type, and the location isn't closed. Minimum notice and \"book up to\" limits also apply.",
        "\"That time was just taken\" — someone booked it first. Pick another; the list is up to date.",
        "Can't reschedule a booking — it came from an outside calendar without an Optni booking type. Move it there.",
        "Ava won't book a type — it's set to staff only (Bookable by AI is off).",
      ],
    },
    {
      heading: "Settings",
      bullets: [
        "Can't change a setting — staff can't change settings, and only owners change the business name, industry and billing.",
        "Greeting won't save — it must say Ava is an AI assistant and that the call may be recorded.",
        "A calendar says Not configured on this server — Optni hasn't switched that connection on for your account.",
        "Invite refused for seats — every seat is used (pending invites count). Free one up or change plan.",
      ],
    },
    {
      heading: "Notifications",
      bullets: [
        "No alerts on your phone — allow notifications for the Optni app in your phone's settings, and check Settings → Notifications.",
        "An alert opened a different business — it belonged to that business, so the app switched to it.",
      ],
    },
  ],
  related: ["sign-in", "send-a-message", "call-me-to-test", "new-booking"],
  keywords: ["help", "problem", "not working", "error", "FAQ", "support", "fix"],
} satisfies Guide;
