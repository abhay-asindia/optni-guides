import { createHmac } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Browser, BrowserContext, Page } from "@playwright/test";
import { APP, SAMPLE, WEB, WORK, creds } from "./servers.ts";

// ── RFC 6238 TOTP from the otpauth secret the enrolment screen shows ──────────
function base32(s: string) {
  const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = 0, value = 0;
  const out: number[] = [];
  for (const ch of s.replace(/=+$/, "").replace(/\s/g, "").toUpperCase()) {
    value = (value << 5) | A.indexOf(ch);
    bits += 5;
    if (bits >= 8) { out.push((value >>> (bits - 8)) & 255); bits -= 8; }
  }
  return Buffer.from(out);
}
function totp(secret: string, step: number) {
  const msg = Buffer.alloc(8);
  msg.writeBigUInt64BE(BigInt(step));
  const h = createHmac("sha1", base32(secret)).update(msg).digest();
  const o = h[h.length - 1]! & 15;
  return String((h.readUInt32BE(o) & 0x7fffffff) % 1_000_000).padStart(6, "0");
}
/** The API refuses a replayed time step, so wait for one this account has not used. */
const lastStep = new Map<string, number>();
async function freshTotp(who: string, secret: string) {
  let step = Math.floor(Date.now() / 30_000);
  while (step <= (lastStep.get(who) ?? -1)) {
    await new Promise((r) => setTimeout(r, 1000));
    step = Math.floor(Date.now() / 30_000);
  }
  lastStep.set(who, step);
  return totp(secret, step);
}
// Authenticator secrets of the throwaway seed accounts, kept in .capture/ (git-ignored) so a
// second `npm run capture` against the same running API (CAPTURE_REUSE=1) can sign in again.
const SECRETS = join(WORK, "secrets.json");
const secrets = new Map<string, string>(existsSync(SECRETS) ? Object.entries(JSON.parse(readFileSync(SECRETS, "utf8"))) : []);
const saveSecrets = () => writeFileSync(SECRETS, JSON.stringify(Object.fromEntries(secrets)), { mode: 0o600 });
export function resetSessions() {
  secrets.clear();
  saveSecrets();
}

export type Who = "owner" | "admin" | "staff";
export function login(who: Who) {
  const c = creds();
  if (who === "owner") return c.owner;
  const l = c.logins.find((x) => x.role === who);
  if (!l) throw new Error(`no ${who} login in creds.json`);
  return l;
}

const VIEW = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } } as const;
export type ViewName = keyof typeof VIEW;

async function newContext(browser: Browser, view: ViewName, storageState?: string) {
  return browser.newContext({
    viewport: VIEW[view],
    deviceScaleFactor: 1,
    colorScheme: "light",
    locale: "en-US",
    timezoneId: "America/Chicago",
    ...(view === "mobile" ? { hasTouch: true, isMobile: true } : {}),
    ...(storageState ? { storageState } : {}),
  });
}

/** Sign in to optni-web (API mode) through the real UI; owner/admin enrol TOTP on the fresh seed. */
async function signInWeb(page: Page, who: Who) {
  const me = login(who);
  await page.goto(`${WEB}/sign-in`, { waitUntil: "networkidle" });
  await page.getByLabel("Work email").fill(me.email);
  await page.getByLabel("Password").fill(me.password);
  await page.getByRole("button", { name: "Sign in" }).click();
  if (who !== "staff") {
    const enrol = page.getByRole("heading", { name: "Set up your authenticator" });
    const code = page.getByLabel("6-digit code", { exact: true });
    await enrol.or(code).waitFor();
    if (await enrol.isVisible()) {
      await page.getByText("Can't scan? Enter a key instead").click();
      const secret = (await page.getByLabel("Setup key").textContent())!.replace(/\s/g, "");
      secrets.set(who, secret);
      saveSecrets();
      await page.getByLabel("Enter the 6-digit code from your app").fill(await freshTotp(who, secret));
      await page.getByRole("button", { name: "Confirm", exact: true }).click();
    } else {
      await code.fill(await freshTotp(who, secrets.get(who)!));
      await page.getByRole("button", { name: "Verify" }).click();
    }
  }
  await page.getByRole("heading", { level: 1 }).filter({ hasText: /Good (morning|afternoon|evening)/ }).waitFor({ timeout: 30_000 });
}

/** Recipe actions that need the seeded secrets (never written into guide data). */
export async function signInAction(page: Page, who: Who) {
  const me = login(who);
  await page.getByLabel("Work email").fill(me.email);
  await page.getByLabel("Password").fill(me.password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(800);
}
export async function enrolAction(page: Page, who: Who) {
  await page.getByText("Can't scan? Enter a key instead").click();
  const secret = (await page.getByLabel("Setup key").textContent())!.replace(/\s/g, "");
  secrets.set(who, secret);
  saveSecrets();
  await page.getByLabel("Enter the 6-digit code from your app").fill(await freshTotp(who, secret));
  await page.getByRole("button", { name: "Confirm", exact: true }).click();
  await page.getByRole("heading", { level: 1 }).filter({ hasText: /Good (morning|afternoon|evening)/ }).waitFor({ timeout: 30_000 });
}

const webStates = new Map<string, string>();
export async function webContext(browser: Browser, who: Who | "signed-out", view: ViewName, sample = false): Promise<BrowserContext> {
  if (sample || who === "signed-out") return newContext(browser, view);
  const saved = join(WORK, `web-${who}.json`);
  if (!webStates.has(who) && process.env.CAPTURE_REUSE === "1" && existsSync(saved)) webStates.set(who, saved);
  if (!webStates.has(who)) {
    const ctx = await newContext(browser, "desktop");
    const page = await ctx.newPage();
    await signInWeb(page, who);
    const file = join(WORK, `web-${who}.json`);
    await ctx.storageState({ path: file });
    await ctx.close();
    webStates.set(who, file);
  }
  return newContext(browser, view, webStates.get(who));
}
export const webBase = (sample: boolean) => (sample ? SAMPLE : WEB);

/**
 * optni-app's web preview keeps tokens in memory (a reload signs out), so one signed-in page is kept
 * per person and screens are reached by in-app navigation (history API), never page.goto.
 */
const appPages = new Map<string, Page>();
export async function appPage(browser: Browser, who: Who): Promise<Page> {
  const have = appPages.get(who);
  if (have && !have.isClosed()) return have;
  const ctx = await newContext(browser, "mobile");
  const page = await ctx.newPage();
  const me = login(who);
  await page.goto(APP, { waitUntil: "networkidle" });
  await page.getByLabel("Work email").fill(me.email);
  await page.getByLabel("Password", { exact: true }).fill(me.password);
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  if (who !== "staff") {
    const secret = secrets.get(who);
    if (!secret) throw new Error(`sign ${who} in to the web first (enrols the authenticator)`);
    const code = page.getByLabel("6-digit verification code");
    await code.waitFor({ timeout: 20_000 });
    await code.pressSequentially(await freshTotp(who, secret), { delay: 40 });
    const verify = page.getByRole("button", { name: "Verify", exact: true });
    await page.waitForTimeout(500);
    if (await verify.isEnabled().catch(() => false)) await verify.click({ timeout: 5000 }).catch(() => undefined);
  }
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(1500);
  appPages.set(who, page);
  return page;
}

export async function appNavigate(page: Page, path: string) {
  await page.evaluate((p) => {
    window.history.pushState({}, "", p);
    window.dispatchEvent(new PopStateEvent("popstate", { state: {} }));
  }, path);
  await page.waitForLoadState("networkidle").catch(() => undefined);
  await page.waitForTimeout(800);
}

export function savedSecretsExist() {
  return existsSync(join(WORK, "web-owner.json"));
}
export { readFileSync, writeFileSync };
