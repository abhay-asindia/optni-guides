/**
 * npm run capture — screenshots for every guide step that has a `shot`, from the REAL apps with
 * synthetic data only (optni-api dev:e2e seed: the Lakeside test business; optni-web sample mode for
 * the invented sample businesses). Writes public/img/<guide>/<step>.png and capture/manifest.json.
 *
 *   npm run capture                         boot everything, capture all, stop
 *   CAPTURE_ONLY=leads,calendar npm run capture
 *   CAPTURE_HOLD=1 npm run capture          keep the servers up afterwards (then CAPTURE_REUSE=1 …)
 *   CAPTURE_REBUILD=1                       rebuild optni-web / the app export first
 *
 * Never point this at staging or production: it signs in, clicks and saves.
 */
import { chromium, type Page } from "@playwright/test";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { guides } from "../src/guides/index.ts";
import type { Guide, Shot, Step, Target } from "../src/guides/types.ts";
import { act, drawHighlight, drawMask, loc, maskSensitive } from "./page-tools.ts";
import { ROOT, startAll, stopAll } from "./servers.ts";
import { appNavigate, appPage, enrolAction, resetSessions, signInAction, webBase, webContext, type ViewName, type Who } from "./sessions.ts";
const special = { signIn: signInAction, enrol: enrolAction };

const only = (process.env.CAPTURE_ONLY ?? "").split(",").filter(Boolean);
const onlyStep = process.env.CAPTURE_STEP;
const picked: Guide[] = guides.filter((g) => !only.length || only.includes(g.slug));
const jobs: { guide: Guide; step: Step; shot: Shot }[] = [];
for (const guide of picked) for (const step of guide.steps) if (step.shot && (!onlyStep || step.id === onlyStep)) jobs.push({ guide, step, shot: step.shot });

// Start each picked guide from an empty folder, so a renamed or removed step leaves no stale image.
if (!onlyStep && !process.env.CAPTURE_SERVE) for (const g of picked) rmSync(join(ROOT, "public", "img", g.slug), { recursive: true, force: true });
const serveAll = process.env.CAPTURE_SERVE === "1";
const need = serveAll ? { web: true, sample: true, app: true } : { web: jobs.some((j) => j.shot.app === "web" || j.shot.app === "app"), sample: jobs.some((j) => j.shot.app === "web-sample"), app: jobs.some((j) => j.shot.app === "app") };
console.log(`capture: ${jobs.length} screenshots from ${picked.length} guides`);
const fresh = await startAll(need);
if (fresh) resetSessions();
const browser = await chromium.launch();
const manifest: { guide: string; step: string; file: string; app: string; view: string; masked: Record<string, number> }[] = [];
const failures: string[] = [];

/** Today's date in America/Chicago at the given HH:mm, as an instant. */
function chicagoToday(hhmm: string) {
  const now = new Date();
  const day = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  const off = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", timeZoneName: "longOffset" }).formatToParts(now).find((p) => p.type === "timeZoneName")!.value.replace("GMT", "");
  return new Date(`${day}T${hhmm}:00${off || "Z"}`);
}

async function shoot(page: Page, guide: Guide, step: Step, shot: Shot, view: ViewName) {
  // tsx (esbuild keepNames) wraps functions in __name(); give the page a no-op one.
  await page.evaluate("window.__name = window.__name || ((f) => f)");
  // Centre what matters: sticky save bars and bottom tab bars cover the edges of the viewport.
  const centre = (t: Target) =>
    loc(page, t)
      .evaluate((e) => {
        const r = e.getBoundingClientRect();
        if (r.top < 72 || r.bottom > window.innerHeight - 140) e.scrollIntoView({ block: "center", inline: "nearest" });
      })
      .catch(() => undefined);
  if (shot.scrollTo) await centre(shot.scrollTo);
  else if (shot.highlight) await centre(shot.highlight);
  await page.waitForTimeout(300);
  // Freeze animations and the blinking caret so pictures are stable.
  await page.addStyleTag({ content: "*,*::before,*::after{transition:none!important;animation:none!important;caret-color:transparent!important}" });
  // Sample-mode chrome ("Sample data" badge) and preview-only notices are hidden: real users never see them.
  if (shot.app === "web-sample") await page.getByText("Sample data", { exact: true }).locator("xpath=ancestor::*[contains(@class,'rounded')][1]").evaluateAll((els) => els.forEach((e) => ((e as HTMLElement).style.visibility = "hidden"))).catch(() => undefined);
  for (const t of shot.hide ?? []) await loc(page, t).evaluate((e) => ((e as HTMLElement).style.display = "none")).catch(() => undefined);
  const extra = (shot.mask ?? []).map((t) => loc(page, t));
  const { hits, leftovers } = await maskSensitive(page, extra);
  if (leftovers.length) throw new Error(`unmasked sensitive text: ${leftovers.join(", ")}`);
  if (shot.highlight) {
    const target = loc(page, shot.highlight);
    const box = await target.boundingBox();
    if (!box) throw new Error("highlight target not visible");
    await drawHighlight(page, box, !shot.noArrow);
  }
  const dir = join(ROOT, "public", "img", guide.slug);
  mkdirSync(dir, { recursive: true });
  const file = join(dir, `${step.id}.png`);
  let clip: { x: number; y: number; width: number; height: number } | undefined;
  if (shot.clip) {
    const b = await loc(page, shot.clip).boundingBox();
    if (!b) throw new Error("clip target not visible");
    const vp = page.viewportSize()!;
    const m = 16;
    const x = Math.max(0, b.x - m), y = Math.max(0, b.y - m);
    clip = { x, y, width: Math.min(vp.width - x, b.width + 2 * m), height: Math.min(vp.height - y, b.height + 2 * m) };
  }
  await page.screenshot({ path: file, ...(clip ? { clip } : {}), animations: "disabled" });
  const masked: Record<string, number> = {};
  for (const h of hits) masked[h] = (masked[h] ?? 0) + 1;
  if (extra.length) masked.area = extra.length;
  manifest.push({ guide: guide.slug, step: step.id, file: `img/${guide.slug}/${step.id}.png`, app: shot.app, view, masked });
}

try {
  // The owner enrols the authenticator first, so screens that expect an enrolled owner see one.
  if (need.web) await (await webContext(browser, "owner", "desktop")).close();
  for (const { guide, step, shot } of jobs) {
    const view: ViewName = shot.viewport ?? (shot.app === "app" ? "mobile" : "desktop");
    const label = `${guide.slug}/${step.id}`;
    try {
      if (shot.app === "app") {
        const page = await appPage(browser, (shot.as ?? "owner") as Who);
        await appNavigate(page, shot.path);
        for (const a of shot.actions ?? []) await act(page, a, "", special);
        await shoot(page, guide, step, shot, view);
        // Leave no overlay or mask behind for the next shot on this long-lived page.
        await page.evaluate(() => document.querySelectorAll("[data-guide-overlay],[data-guide-mask=area],[data-guide-mask=field]").forEach((e) => e.remove()));
      } else {
        const sample = shot.app === "web-sample";
        const ctx = await webContext(browser, (shot.as ?? "owner") as Who | "signed-out", view, sample);
        const page = await ctx.newPage();
        if (shot.clockAt) await page.clock.install({ time: chicagoToday(shot.clockAt) });
        const base = webBase(sample);
        try {
          await page.goto(base + shot.path, { waitUntil: "networkidle" });
          await page.waitForTimeout(600);
          for (const a of shot.actions ?? []) await act(page, a, base, special);
          await shoot(page, guide, step, shot, view);
        } catch (e) {
          // What the page looked like when the recipe broke (git-ignored, for fixing recipes).
          mkdirSync(join(ROOT, ".capture", "fail"), { recursive: true });
          await page.screenshot({ path: join(ROOT, ".capture", "fail", `${guide.slug}-${step.id}.png`) }).catch(() => undefined);
          throw e;
        } finally {
          await ctx.close();
        }
      }
      console.log(`  ✓ ${label}`);
    } catch (e) {
      failures.push(`${label}: ${(e as Error).message.split("\n")[0]}`);
      console.log(`  ✗ ${label}: ${(e as Error).message.split("\n")[0]}`);
    }
  }
} finally {
  await browser.close();
  // Merge into the manifest: entries for the guides captured now replace their old ones.
  if (jobs.length) {
    const file = join(ROOT, "capture", "manifest.json");
    const old: typeof manifest = existsSync(file) && (only.length || onlyStep) ? JSON.parse(readFileSync(file, "utf8")) : [];
    const redone = new Set(manifest.map((m) => `${m.guide}/${m.step}`));
    const order = new Map(guides.flatMap((g) => g.steps.map((s) => `${g.slug}/${s.id}`)).map((k, i) => [k, i]));
    const merged = [...old.filter((m) => !redone.has(`${m.guide}/${m.step}`) && order.has(`${m.guide}/${m.step}`)), ...manifest].sort((a, b) => order.get(`${a.guide}/${a.step}`)! - order.get(`${b.guide}/${b.step}`)!);
    writeFileSync(file, JSON.stringify(merged, null, 2) + "\n");
  }
  if (process.env.CAPTURE_HOLD === "1") {
    console.log("CAPTURE_HOLD: servers stay up. Re-run with CAPTURE_REUSE=1. Ctrl-C to stop.");
    await new Promise(() => undefined);
  }
  stopAll();
}
void drawMask;
if (failures.length) {
  console.error(`\n${failures.length} screenshot(s) failed:\n  ${failures.join("\n  ")}`);
  process.exit(1);
}
console.log(`\ncapture: ${manifest.length} screenshots written`);
