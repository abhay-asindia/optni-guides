import type { Locator, Page } from "@playwright/test";
import type { Action, Target } from "../src/guides/types.ts";

export function loc(page: Page, t: Target): Locator {
  const scope: Page | Locator = "within" in t && t.within ? loc(page, t.within) : page;
  let l: Locator;
  if ("role" in t) l = scope.getByRole(t.role as Parameters<Page["getByRole"]>[0], { ...(t.name !== undefined ? { name: t.name } : {}), ...(t.exact ? { exact: true } : {}) });
  else if ("label" in t) l = scope.getByLabel(t.label, { exact: t.exact });
  else if ("text" in t) l = scope.getByText(t.text, { exact: t.exact });
  else if ("placeholder" in t) l = scope.getByPlaceholder(t.placeholder);
  else l = scope.locator(t.css);
  return t.nth !== undefined ? l.nth(t.nth) : l.first();
}

export type Special = { signIn: (page: Page, who: "owner" | "admin" | "staff") => Promise<void>; enrol: (page: Page, who: "owner" | "admin") => Promise<void> };

export async function act(page: Page, a: Action, base: string, special?: Special) {
  switch (a.do) {
    case "signIn":
      await special!.signIn(page, a.who);
      return;
    case "enrolMfa":
      await special!.enrol(page, a.who);
      return;
    case "choose":
      await loc(page, a.target).click();
      await page.getByRole("option", { name: a.option }).first().click();
      break;
    case "goto":
      await page.goto(base + a.path, { waitUntil: "networkidle" });
      return;
    case "click":
      if (a.optional && !(await loc(page, a.target).isVisible().catch(() => false))) return;
      await loc(page, a.target).click();
      break;
    case "openFirst":
      await loc(page, a.target).click();
      break;
    case "fill":
      await loc(page, a.target).fill(a.value);
      break;
    case "press":
      if (a.target) await loc(page, a.target).press(a.key);
      else await page.keyboard.press(a.key);
      break;
    case "hover":
      await loc(page, a.target).hover();
      break;
    case "check":
      await loc(page, a.target).check();
      break;
    case "waitFor":
      await loc(page, a.target).waitFor({ state: "visible", timeout: 20_000 });
      return;
    case "wait":
      await page.waitForTimeout(a.ms);
      return;
    case "scrollTo":
      await loc(page, a.target).scrollIntoViewIfNeeded();
      break;
  }
  await page.waitForLoadState("networkidle").catch(() => undefined);
  await page.waitForTimeout(250);
}

/**
 * Cover anything that is not obviously synthetic: emails outside example.com, phone numbers outside
 * 555-01xx, intake keys and bearer-looking tokens. Text is wrapped in an opaque span; form values get
 * a box drawn over them. Returns what was masked (kinds only, never the values).
 */
export async function maskSensitive(page: Page, extra: Locator[]) {
  for (const l of extra) {
    const n = await l.count();
    for (let i = 0; i < n; i++) {
      const box = await l.nth(i).boundingBox();
      if (box) await drawMask(page, box);
    }
  }
  return page.evaluate(() => {
    const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+/g;
    const PHONE = /(?:\+?1[\s.-]?)?\(?(\d{3})\)?[\s.-]?(\d{3})[\s.-]?(\d{4})(?!\d)/g;
    const KEY = /\boi_(?:live|test)_[A-Za-z0-9_-]+|\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]+|\b[A-Z2-7]{4}(?: ?[A-Z2-7]{4}){3,}\b/g;
    // Real people who are members of the test business (PLATFORM.md §12.4: Optni's founder co-owns it).
    const PEOPLE = /Optni Founder|Optni Admin|Optni Staff/g;
    const okEmail = (s: string) => /@example\.com$/i.test(s);
    const okPhone = (m: RegExpExecArray) => m[2] === "555" && m[3]!.startsWith("01");
    const hits: string[] = [];
    const bad = (text: string) => {
      const ranges: [number, number, string][] = [];
      for (const m of text.matchAll(EMAIL)) if (!okEmail(m[0])) ranges.push([m.index!, m.index! + m[0].length, "email"]);
      for (const m of text.matchAll(PHONE)) if (!okPhone(m as unknown as RegExpExecArray)) ranges.push([m.index!, m.index! + m[0].length, "phone"]);
      for (const m of text.matchAll(PEOPLE)) ranges.push([m.index!, m.index! + m[0].length, "person"]);
      for (const m of text.matchAll(KEY)) {
        // Base32 secrets mix letters and digits 2-7; all-letter runs are just uppercase labels.
        if (/^[A-Z2-7 ]+$/.test(m[0]) && (!/[2-7]/.test(m[0]) || !/[A-Z]/.test(m[0]))) continue;
        ranges.push([m.index!, m.index! + m[0].length, "key"]);
      }
      return ranges.sort((a, b) => a[0] - b[0]);
    };
    const style = "background:#647872;color:transparent;border-radius:3px;user-select:none";
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    while (walker.nextNode()) nodes.push(walker.currentNode as Text);
    for (const node of nodes) {
      const text = node.data;
      const ranges = bad(text);
      if (!ranges.length || node.parentElement?.closest("[data-guide-mask]")) continue;
      const frag = document.createDocumentFragment();
      let at = 0;
      for (const [s, e, kind] of ranges) {
        if (s < at) continue;
        frag.append(text.slice(at, s));
        const span = document.createElement("span");
        span.dataset.guideMask = kind;
        span.setAttribute("style", style);
        span.textContent = text.slice(s, e);
        frag.append(span);
        hits.push(kind);
        at = e;
      }
      frag.append(text.slice(at));
      node.replaceWith(frag);
    }
    for (const el of Array.from(document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea"))) {
      if (!el.value || !bad(el.value).length) continue;
      const r = el.getBoundingClientRect();
      const box = document.createElement("div");
      box.dataset.guideMask = "field";
      box.setAttribute("style", `position:fixed;left:${r.left + 4}px;top:${r.top + 4}px;width:${r.width - 8}px;height:${r.height - 8}px;${style};z-index:2147483646`);
      document.body.append(box);
      hits.push("field");
    }
    // Leftovers = a failure the caller reports (text we could not wrap, e.g. split across nodes).
    const visible = document.body.innerText.replace(/\s+/g, " ");
    const clean = Array.from(document.querySelectorAll("[data-guide-mask]")).reduce((s, el) => s.replace((el as HTMLElement).innerText, ""), visible);
    const left = bad(clean);
    return { hits, leftovers: left.map(([s, , k]) => `${k}:${clean.slice(Math.max(0, s - 12), s)}…`) };
  });
}

export async function drawMask(page: Page, box: { x: number; y: number; width: number; height: number }) {
  await page.evaluate((b) => {
    const d = document.createElement("div");
    d.dataset.guideMask = "area";
    d.setAttribute(
      "style",
      `position:fixed;left:${b.x}px;top:${b.y}px;width:${b.width}px;height:${b.height}px;z-index:2147483646;border-radius:8px;` +
        "background:repeating-linear-gradient(135deg,#E2E2DA 0 10px,#EDEDE7 10px 20px);display:flex;align-items:center;justify-content:center;" +
        "font:600 13px system-ui;color:#33443F",
    );
    d.textContent = "Hidden in this guide";
    document.body.append(d);
  }, box);
}

/** Amber ring around the control and an arrow pointing at it, drawn over the page (not part of the app). */
export async function drawHighlight(page: Page, box: { x: number; y: number; width: number; height: number }, arrow: boolean) {
  await page.evaluate(
    ({ b, arrow }) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const pad = 6;
      const ring = document.createElement("div");
      ring.dataset.guideOverlay = "ring";
      ring.setAttribute(
        "style",
        `position:fixed;left:${b.x - pad}px;top:${b.y - pad}px;width:${b.width + pad * 2}px;height:${b.height + pad * 2}px;` +
          "border:3px solid #F0A22E;border-radius:10px;box-shadow:0 0 0 4px rgba(255,255,255,.85),0 0 0 9999px rgba(14,22,20,.12);z-index:2147483647;pointer-events:none",
      );
      document.body.append(ring);
      if (!arrow) return;
      // Put the arrow where there is the most room: left, right, below or above the ring.
      const room = { left: b.x, right: vw - (b.x + b.width), below: vh - (b.y + b.height), above: b.y };
      const side = (Object.entries(room).sort((p, q) => q[1] - p[1])[0]![0]) as keyof typeof room;
      const len = 56;
      const cx = b.x + b.width / 2;
      const cy = b.y + b.height / 2;
      let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
      if (side === "left") { x2 = b.x - pad - 6; y2 = cy; x1 = x2 - len; y1 = cy - len * 0.55; }
      if (side === "right") { x2 = b.x + b.width + pad + 6; y2 = cy; x1 = x2 + len; y1 = cy - len * 0.55; }
      if (side === "below") { x2 = cx; y2 = b.y + b.height + pad + 6; x1 = cx + len * 0.55; y1 = y2 + len; }
      if (side === "above") { x2 = cx; y2 = b.y - pad - 6; x1 = cx + len * 0.55; y1 = y2 - len; }
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.dataset.guideOverlay = "arrow";
      svg.setAttribute("width", String(vw));
      svg.setAttribute("height", String(vh));
      svg.setAttribute("style", "position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none");
      const ang = Math.atan2(y2 - y1, x2 - x1);
      const h = 14;
      const p1 = `${x2 - h * Math.cos(ang - 0.5)},${y2 - h * Math.sin(ang - 0.5)}`;
      const p2 = `${x2 - h * Math.cos(ang + 0.5)},${y2 - h * Math.sin(ang + 0.5)}`;
      svg.innerHTML =
        `<line x1="${x1}" y1="${y1}" x2="${x2 - 6 * Math.cos(ang)}" y2="${y2 - 6 * Math.sin(ang)}" stroke="#fff" stroke-width="9" stroke-linecap="round"/>` +
        `<line x1="${x1}" y1="${y1}" x2="${x2 - 6 * Math.cos(ang)}" y2="${y2 - 6 * Math.sin(ang)}" stroke="#B4700F" stroke-width="5" stroke-linecap="round"/>` +
        `<polygon points="${x2},${y2} ${p1} ${p2}" fill="#B4700F" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/>`;
      document.body.append(svg);
    },
    { b: box, arrow },
  );
}
