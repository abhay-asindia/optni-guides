#!/usr/bin/env node
// Serves dist/ locally and opens every page in Chromium (desktop 1440 and phone 375 px):
// fails on any console error, page error, failed request or HTTP ≥ 400, or horizontal scrolling at 375 px.
// Also checks each page has a <title>, a meta description and a canonical link, and that the search box finds a guide.
import { chromium } from "@playwright/test";
import { createReadStream, existsSync, readdirSync, statSync } from "node:fs";
import http from "node:http";
import { extname, join, relative, resolve } from "node:path";

const root = resolve("dist");
const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".xml": "application/xml", ".txt": "text/plain" };
const server = http.createServer((req, res) => {
  let p = join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, "index.html");
  if (!p.startsWith(root) || !existsSync(p)) {
    res.writeHead(404, { "content-type": "text/html" });
    return createReadStream(join(root, "404.html")).pipe(res);
  }
  res.writeHead(200, { "content-type": MIME[extname(p)] ?? "application/octet-stream" });
  createReadStream(p).pipe(res);
});
await new Promise((r) => server.listen(4331, "127.0.0.1", r));
const base = "http://127.0.0.1:4331";

const pages = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f === "index.html") pages.push("/" + relative(root, dir).split("\\").join("/") + (dir === root ? "" : "/"));
  }
})(root);

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const problems = [];
for (const width of [1440, 375]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await ctx.newPage();
  let current = "";
  page.on("console", (m) => m.type() === "error" && problems.push(`${width}px ${current}: console: ${m.text()}`));
  page.on("pageerror", (e) => problems.push(`${width}px ${current}: pageerror: ${e.message}`));
  page.on("requestfailed", (r) => problems.push(`${width}px ${current}: failed ${r.url()}`));
  page.on("response", (r) => r.status() >= 400 && problems.push(`${width}px ${current}: HTTP ${r.status()} ${r.url()}`));
  for (const path of pages.map((p) => p.replace(/^\/\//, "/"))) {
    current = path;
    await page.goto(base + path, { waitUntil: "networkidle" });
    // load lazy images too
    await page.evaluate(async () => {
      for (const img of document.querySelectorAll("img")) img.loading = "eager";
      await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => (i.onload = i.onerror = r)))));
    });
    const info = await page.evaluate(() => ({
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "",
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      broken: [...document.images].filter((i) => !i.naturalWidth).map((i) => i.getAttribute("src")),
      h1: document.querySelectorAll("h1").length,
    }));
    if (!info.title) problems.push(`${path}: no <title>`);
    if (!info.desc) problems.push(`${path}: no meta description`);
    if (!info.canonical.startsWith("https://guides.optni.ai/")) problems.push(`${path}: canonical is "${info.canonical}"`);
    if (info.h1 !== 1) problems.push(`${path}: ${info.h1} <h1> elements`);
    if (info.broken.length) problems.push(`${path}: images failed to load: ${info.broken.join(", ")}`);
    if (width === 375 && info.overflow > 0) problems.push(`${path}: scrolls sideways at 375px (${info.overflow}px)`);
  }
  await ctx.close();
}
// Search works from the home page.
{
  const page = await browser.newPage();
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.getByRole("searchbox").first().fill("intake key");
  const hit = page.locator(".search-results a").first();
  await hit.waitFor({ timeout: 5000 }).catch(() => problems.push("search: no result for 'intake key'"));
  if ((await hit.getAttribute("href").catch(() => null)) !== "/website-intake/") problems.push("search: 'intake key' should find /website-intake/ first");
  await page.close();
}
await browser.close();
server.close();
if (problems.length) {
  console.error(`check-pages: ${problems.length} problem(s):\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log(`check-pages: ${pages.length} pages at 1440 and 375 px — no console errors, failed requests, broken images or sideways scroll`);
