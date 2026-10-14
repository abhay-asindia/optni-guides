import type { CategoryId } from "./types.ts";

export const categories: { id: CategoryId; title: string; blurb: string }[] = [
  { id: "start", title: "Getting started", blurb: "Sign in, stay secure and hear your AI receptionist for the first time." },
  { id: "team", title: "Team and businesses", blurb: "Invite people, set roles and seats, and switch between businesses." },
  { id: "daily", title: "Everyday work", blurb: "Today, the inbox, calls and stepping in when Ava or Max hands over." },
  { id: "bookings", title: "Calendar and bookings", blurb: "Book, move and finish bookings, and set who can be booked and when." },
  { id: "leads", title: "Leads, contacts and insights", blurb: "Work your pipeline, take leads from your website and look after customer records." },
  { id: "settings", title: "Business settings", blurb: "Your business name and industry, what the AI knows, and connected calendars." },
  { id: "locations", title: "Locations and phone lines", blurb: "Hours, greeting, how calls are answered, texting and reviews — per location." },
  { id: "mobile", title: "Mobile app and notifications", blurb: "Get alerts on your phone and act on them in the Optni app." },
  { id: "billing", title: "Plans and billing", blurb: "Plans, seats and what counts as an interaction." },
  { id: "help", title: "Privacy and help", blurb: "Compliance basics, troubleshooting and answers to common questions." },
];
