import type { Guide } from "../types.ts";
import { settingsTab } from "../targets.ts";

const box = { label: "What Ava says when she answers" } as const;

export default {
  slug: "greeting",
  title: "Greeting: what Ava says first",
  description: "Edit the greeting for each location. It must say Ava is an AI assistant and that the call may be recorded.",
  category: "locations",
  order: 2,
  roles: "Owners and admins.",
  intro:
    "The greeting is the first thing every caller hears. Keep it short and friendly. Two parts are required and can't be removed: that Ava is an AI assistant, and that the call may be recorded.",
  steps: [
    {
      id: "open",
      title: "Go to Settings → Greeting and pick the location.",
      alt: "Settings → Greeting with the greeting text and a Checks panel.",
      shot: { app: "web", path: "/settings/greeting", highlight: settingsTab("Greeting") },
    },
    {
      id: "edit",
      title: "Edit the text.",
      body: "Say your business name, that Ava is an AI assistant, that the call may be recorded, then ask how you can help.",
      alt: "The greeting text box ringed.",
      shot: { app: "web", path: "/settings/greeting", highlight: { role: "textbox" } },
    },
    {
      id: "checks",
      title: "Make sure every check is ticked.",
      body: "The two required checks must pass to save. Aim for under about 20 seconds.",
      alt: "The Checks panel listing AI disclosure, recording notice, business name and length.",
      shot: { app: "web", path: "/settings/greeting", highlight: { text: "Checks", exact: true } },
    },
    {
      id: "save",
      title: "Select Save changes.",
      body: "If the AI or recording part is missing, saving is refused and the box says why.",
      alt: "The save bar with Save changes ringed.",
      shot: {
        app: "web",
        path: "/settings/greeting",
        actions: [{ do: "fill", target: { role: "textbox" }, value: "Thanks for calling Lakeside Family Chiropractic in Minneapolis. I'm Ava, the AI assistant, and this call may be recorded. How can I help you today?" }],
        highlight: { role: "button", name: "Save changes" },
      },
    },
  ],
  sections: [
    {
      heading: "Example",
      paragraphs: ["\"Thanks for calling Example Plumbing. I'm Ava, the AI assistant, and this call may be recorded. How can I help you today?\""],
    },
    {
      heading: "Why the two parts are required",
      paragraphs: [
        "Callers have a right to know they're talking to an AI and that the call may be recorded. Some US states require everyone on a call to agree to it being recorded. Telling callers at the start is how Optni gives that notice. Rules vary by place and change over time, so check what applies to your business.",
      ],
    },
  ],
  related: ["call-me-to-test", "locations", "privacy-and-compliance"],
  keywords: ["greeting", "welcome message", "intro", "AI disclosure", "recording notice", "script"],
} satisfies Guide;
void box;
