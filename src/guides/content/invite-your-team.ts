import type { Guide } from "../types.ts";
import { button, inDialog, label, settingsTab } from "../targets.ts";

// Optni's founder co-owns the synthetic test business (PLATFORM.md §12.4): his row is covered.
const founderRow = { role: "row", name: /founder@optni\.ai|Optni Founder/ } as const;

export default {
  slug: "invite-your-team",
  title: "Invite your team, roles and seats",
  description: "Invite teammates as staff or admins, limit staff to their locations, and see how many seats your plan has.",
  category: "team",
  order: 1,
  roles: "Owners and admins.",
  intro: "Everyone who uses Optni needs their own login. You invite them by email and pick a role. Each person or pending invite uses one seat.",
  steps: [
    {
      id: "open-team",
      title: "Go to Settings → Team & seats.",
      body: "Or open the account menu (your name, top right) and select Account & team.",
      alt: "The Team & seats page listing teammates, their roles, locations and status.",
      shot: { app: "web", path: "/settings/team", mask: [founderRow], highlight: settingsTab("Team & seats") },
    },
    {
      id: "invite",
      title: "Select Invite teammate.",
      body: "The seat bar shows how many seats are used and how many your plan has.",
      alt: "The seats bar and the Invite teammate button ringed.",
      shot: { app: "web", path: "/settings/team", mask: [founderRow], highlight: button("Invite teammate") },
    },
    {
      id: "email-role",
      title: "Enter their work email and choose a role.",
      body: "Staff fit most front-desk people. Choose admin only for people who manage settings and the team.",
      alt: "The Invite a teammate dialog with the email filled in and the role choice ringed.",
      shot: {
        app: "web",
        path: "/settings/team",
        mask: [founderRow],
        actions: [{ do: "click", target: button("Invite teammate") }, { do: "fill", target: inDialog(label("Work email")), value: "new.teammate@example.com" }],
        highlight: inDialog(label("Role")),
      },
    },
    {
      id: "location",
      title: "Pick the location they work at.",
      body: "Staff see only that location's inbox, calls and calendar. Choose All locations if they cover every site.",
      alt: "The location choice in the invite dialog ringed.",
      shot: {
        app: "web",
        path: "/settings/team",
        mask: [founderRow],
        actions: [{ do: "click", target: button("Invite teammate") }, { do: "fill", target: inDialog(label("Work email")), value: "new.teammate@example.com" }],
        highlight: inDialog(label("Location")),
      },
    },
    {
      id: "send",
      title: "Send the invite.",
      body: "They get an email with a link. The invite shows as pending until they accept, and it expires after a week.",
      alt: "The send button at the bottom of the invite dialog ringed.",
      shot: {
        app: "web",
        path: "/settings/team",
        mask: [founderRow],
        actions: [{ do: "click", target: button("Invite teammate") }, { do: "fill", target: inDialog(label("Work email")), value: "new.teammate@example.com" }],
        highlight: inDialog(button("Send invite", true)),
      },
    },
  ],
  sections: [
    {
      heading: "Roles",
      bullets: [
        "Owner — everything, including billing and the business's name and industry. Two-step verification required.",
        "Admin — settings, the team and every conversation. Two-step verification required.",
        "Staff — inbox, calls and calendar for their locations. Staff can't change settings.",
      ],
    },
    {
      heading: "Seats",
      paragraphs: [
        "Each active teammate and each pending invite uses a seat. Starter includes 1 seat, Growth 3 and Pro 10. When you're out of seats, the invite is refused until you free a seat or change plan in Settings → Billing & usage.",
      ],
    },
    {
      heading: "When they accept",
      bullets: [
        "The link opens a page where they set their name and a password of at least 12 characters.",
        "Admins then set up two-step verification: scan a QR code and type one code from their app.",
        "If the link has expired or was already used, send a new invite.",
      ],
    },
  ],
  related: ["sign-in", "switch-businesses", "billing-and-usage"],
  keywords: ["users", "staff", "admin", "owner", "permissions", "add user", "seats", "members"],
} satisfies Guide;
