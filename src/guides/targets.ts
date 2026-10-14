import type { Target } from "./types.ts";

/** Shared ways to find dashboard controls in capture recipes. */
export const sidebar = (name: string): Target => ({ role: "link", name: new RegExp(`^${name}\\b`), within: { role: "complementary", name: "Primary" } });
export const settingsTab = (name: string): Target => ({ role: "link", name, exact: true, within: { role: "navigation", name: "Settings sections" } });
export const tab = (name: string | RegExp): Target => ({ role: "tab", name });
export const button = (name: string | RegExp, exact = false): Target => ({ role: "button", name, ...(exact ? { exact } : {}) });
export const link = (name: string | RegExp): Target => ({ role: "link", name });
export const dialog: Target = { role: "dialog" };
export const inDialog = (t: Target): Target => ({ ...t, within: dialog } as Target);
export const text = (t: string | RegExp, exact = false): Target => ({ text: t, ...(exact ? { exact } : {}) });
export const label = (l: string | RegExp, exact = false): Target => ({ label: l, ...(exact ? { exact } : {}) });
/** A dashboard card found by its title (CardTitle is an h2 inside the card header). */
export const card = (title: string): Target => ({ css: `div.shadow-card:has(> div > h2:has-text("${title}"))` });
