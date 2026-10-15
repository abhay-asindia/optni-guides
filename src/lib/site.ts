import { existsSync, openSync, readSync, closeSync } from "node:fs";
import { join } from "node:path";
import { categories } from "../guides/categories.ts";
import { guideBySlug, guides } from "../guides/index.ts";
import type { CategoryId, Guide } from "../guides/types.ts";

export const SITE = "https://guides.optni.ai";
export const guideUrl = (slug: string) => `/${slug}/`;
export const categoryUrl = (id: CategoryId) => `/category/${id}/`;
export const categoryOf = (id: CategoryId) => categories.find((c) => c.id === id)!;
export { categories, guides, guideBySlug };

export function guidesIn(id: CategoryId): Guide[] {
  return guides.filter((g) => g.category === id).sort((a, b) => a.order - b.order);
}

/** Width/height from the PNG header, so <img> reserves space (no layout shift). */
export function pngSize(publicPath: string): { width: number; height: number } | null {
  const file = join(process.cwd(), "public", publicPath);
  if (!existsSync(file)) return null;
  const fd = openSync(file, "r");
  const buf = Buffer.alloc(24);
  readSync(fd, buf, 0, 24, 0);
  closeSync(fd);
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

export const shotPath = (slug: string, stepId: string) => `img/${slug}/${stepId}.png`;

/** The "Start here" path for a new business owner, in order. */
export const startHere: { slug: string; why: string }[] = [
  { slug: "get-started", why: "Create your account and follow the setup guide to go live." },
  { slug: "sign-in", why: "Sign in and turn on two-step verification." },
  { slug: "business-and-industry", why: "Check your business name and industry, so the words fit." },
  { slug: "locations", why: "Set opening hours, closed dates and time zone for each location." },
  { slug: "providers-and-hours", why: "Add the people customers book with, and their hours." },
  { slug: "booking-types", why: "Set what can be booked, and what the AI may book." },
  { slug: "ai-knowledge", why: "Tell Ava and Max about your business, FAQs and policies." },
  { slug: "greeting", why: "Make the greeting sound like you." },
  { slug: "test-your-ai", why: "Chat and talk with Ava and Max before going live — nothing is saved." },
  { slug: "call-me-to-test", why: "Hear Ava on your own phone." },
  { slug: "invite-your-team", why: "Invite your team and pick their roles." },
  { slug: "notifications", why: "Get handover alerts on your phone." },
];

export type SearchDoc = { u: string; t: string; d: string; c: string; k: string; s: string };
export function searchIndex(): SearchDoc[] {
  return guides.map((g) => ({
    u: guideUrl(g.slug),
    t: g.title,
    d: g.description,
    c: categoryOf(g.category).title,
    k: (g.keywords ?? []).join(" "),
    s: [g.intro, ...g.steps.map((s) => `${s.title} ${s.body ?? ""}`), ...(g.sections ?? []).flatMap((x) => [x.heading, ...(x.paragraphs ?? []), ...(x.bullets ?? [])])].join(" "),
  }));
}
