#!/usr/bin/env node
// Link checker over the built site: every internal href/src/srcset in every HTML file must resolve to a file
// in dist/ (directory URLs → index.html), and every #fragment must exist on the target page.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve, dirname } from "node:path";

const root = resolve(process.argv[2] ?? "dist");
if (!existsSync(root)) {
  console.error(`check-links: ${root} does not exist — run the build first`);
  process.exit(1);
}
const html = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".html")) html.push(p);
  }
})(root);

const ids = new Map();
const idsOf = (file) => {
  if (!ids.has(file)) ids.set(file, new Set([...readFileSync(file, "utf8").matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  return ids.get(file);
};
const resolveTarget = (from, url) => {
  const [path] = url.split(/[?#]/);
  let p = path.startsWith("/") ? join(root, path) : join(dirname(from), path);
  if (!path || path.endsWith("/")) p = join(p, "index.html");
  else if (existsSync(p) && statSync(p).isDirectory()) p = join(p, "index.html");
  return p;
};

const broken = [];
let checked = 0;
for (const file of html) {
  const src = readFileSync(file, "utf8");
  const urls = [];
  for (const m of src.matchAll(/\s(?:href|src)="([^"]+)"/g)) urls.push(m[1]);
  for (const m of src.matchAll(/\ssrcset="([^"]+)"/g)) for (const part of m[1].split(",")) urls.push(part.trim().split(/\s+/)[0]);
  for (const raw of urls) {
    const url = raw.replace(/&amp;/g, "&");
    if (/^(https?:|mailto:|tel:|data:|javascript:)/.test(url)) {
      if (url.startsWith("https://guides.optni.ai/")) {
        // canonical / og URLs: check the page they name exists in this build
        const local = url.replace("https://guides.optni.ai", "");
        const t = local.endsWith(".html") ? join(root, local) : resolveTarget(file, local);
        checked++;
        if (!existsSync(t)) broken.push(`${relative(root, file)} → ${url}`);
      }
      continue;
    }
    checked++;
    if (url.startsWith("#")) {
      if (url.length > 1 && !idsOf(file).has(decodeURIComponent(url.slice(1)))) broken.push(`${relative(root, file)} → ${url} (no such id)`);
      continue;
    }
    const target = resolveTarget(file, url);
    if (!existsSync(target)) {
      broken.push(`${relative(root, file)} → ${url}`);
      continue;
    }
    const frag = url.split("#")[1];
    if (frag && target.endsWith(".html") && !idsOf(target).has(decodeURIComponent(frag))) broken.push(`${relative(root, file)} → ${url} (no such id)`);
  }
}
if (broken.length) {
  console.error(`check-links: ${broken.length} broken link(s) out of ${checked}:\n  ${broken.join("\n  ")}`);
  process.exit(1);
}
console.log(`check-links: ${html.length} pages, ${checked} internal links and images, 0 broken`);
