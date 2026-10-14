/** Dev aid: plain screenshots of many screens into .capture/explore/ (not committed). */
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { startAll, stopAll, WORK } from "./servers.ts";
import { appNavigate, appPage, webBase, webContext } from "./sessions.ts";

const out = join(WORK, "explore");
mkdirSync(out, { recursive: true });
const webPaths = (process.env.WEB_PATHS ?? "/,/inbox,/leads,/calls,/calendar,/contacts,/insights,/settings,/settings/business,/settings/greeting,/settings/providers,/settings/appointment-types,/settings/integrations,/settings/team,/settings/notifications,/settings/security,/settings/billing").split(",");
const appPaths = (process.env.APP_PATHS ?? "/,/inbox,/schedule,/leads,/more,/notifications,/security").split(",");
const hold = process.env.HOLD === "1";

await startAll({ web: true, sample: process.env.SAMPLE === "1", app: process.env.APP !== "0" });
const browser = await chromium.launch();
try {
  const who = (process.env.WHO ?? "owner") as "owner";
  const ctx = await webContext(browser, who, "desktop");
  const page = await ctx.newPage();
  for (const p of webPaths) {
    await page.goto(webBase(false) + p, { waitUntil: "networkidle" });
    await page.waitForTimeout(700);
    await page.screenshot({ path: join(out, `web${p.replace(/\//g, "_") || "_"}.png`), fullPage: process.env.FULL === "1" });
  }
  if (process.env.APP !== "0") {
    const ap = await appPage(browser, who);
    for (const p of appPaths) {
      await appNavigate(ap, p);
      await ap.screenshot({ path: join(out, `app${p.replace(/\//g, "_") || "_"}.png`) });
    }
  }
  if (hold) {
    console.log("HOLDING — servers stay up; Ctrl-C to stop");
    await new Promise(() => undefined);
  }
} finally {
  if (!hold) {
    await browser.close();
    stopAll();
  }
}
