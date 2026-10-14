/**
 * Boots everything the capture needs, all on this machine, all synthetic:
 *  - optni-api `npm run dev:e2e` (real API, throwaway mongod, Lakeside seed)  → API_PORT
 *  - optni-web in API mode (`next start`, .next-api)                           → WEB_PORT (http://localhost)
 *  - optni-web in sample mode (`next start`, .next-guides)              → SAMPLE_PORT
 *  - optni-app web export in API mode, served with /v1 proxied to the API      → APP_PORT
 * Builds are skipped when their output exists, unless CAPTURE_REBUILD=1.
 */
import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import { createReadStream, existsSync, mkdirSync, openSync, readFileSync, statSync } from "node:fs";
import http from "node:http";
import { extname, join, resolve } from "node:path";

export const ROOT = resolve(import.meta.dirname, "..");
export const WORK = join(ROOT, ".capture");
const OPTNI = resolve(ROOT, "..");
const WEB_DIR = resolve(process.env.OPTNI_WEB_DIR ?? join(OPTNI, "optni-web"));
const API_DIR = resolve(process.env.OPTNI_API_DIR ?? join(OPTNI, "optni-api"));
const APP_DIR = resolve(process.env.OPTNI_APP_DIR ?? join(OPTNI, "optni-app"));

export const API_PORT = Number(process.env.CAPTURE_API_PORT ?? 4140);
export const WEB_PORT = Number(process.env.CAPTURE_WEB_PORT ?? 3041);
export const SAMPLE_PORT = Number(process.env.CAPTURE_SAMPLE_PORT ?? 3042);
export const APP_PORT = Number(process.env.CAPTURE_APP_PORT ?? 8141);
export const API = `http://127.0.0.1:${API_PORT}`;
// localhost, not 127.0.0.1: next start builds redirects on "localhost" and cookies are per host.
export const WEB = `http://localhost:${WEB_PORT}`;
export const SAMPLE = `http://localhost:${SAMPLE_PORT}`;
export const APP = `http://localhost:${APP_PORT}`;
export const CREDS = join(WORK, "creds.json");

const rebuild = process.env.CAPTURE_REBUILD === "1";
const children: ChildProcess[] = [];
const servers: http.Server[] = [];

function run(cmd: string, args: string[], cwd: string, env: NodeJS.ProcessEnv, logName: string) {
  console.log(`  $ ${cmd} ${args.join(" ")}   (${cwd.replace(OPTNI + "/", "")}, log .capture/${logName})`);
  const r = spawnSync(cmd, args, { cwd, env: { ...process.env, ...env }, stdio: ["ignore", openSync(join(WORK, logName), "w"), openSync(join(WORK, logName), "a")] });
  if (r.status !== 0) throw new Error(`${cmd} ${args.join(" ")} failed (exit ${r.status}) — see .capture/${logName}`);
}

function background(cmd: string, args: string[], cwd: string, env: NodeJS.ProcessEnv, logName: string) {
  const log = openSync(join(WORK, logName), "w");
  const child = spawn(cmd, args, { cwd, env: { ...process.env, ...env }, stdio: ["ignore", log, log], detached: true });
  children.push(child);
  return child;
}

async function waitFor(url: string, what: string, ms = 8 * 60_000, ok = (s: number) => s < 500) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try {
      const r = await fetch(url, { redirect: "manual" });
      if (ok(r.status)) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`${what} did not come up at ${url}`);
}

const MIME: Record<string, string> = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".ico": "image/x-icon", ".ttf": "font/ttf", ".wav": "audio/wav", ".svg": "image/svg+xml" };

/** Static SPA server for the app export, forwarding /v1/* to the API (same origin, so no CORS). */
function serveApp(dir: string) {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url ?? "/", APP);
    if (url.pathname.startsWith("/v1/")) {
      const fwd = http.request(`${API}${url.pathname}${url.search}`, { method: req.method, headers: { ...req.headers, host: `127.0.0.1:${API_PORT}` } }, (up) => {
        res.writeHead(up.statusCode ?? 502, up.headers);
        up.pipe(res);
      });
      fwd.on("error", () => {
        res.writeHead(502);
        res.end();
      });
      req.pipe(fwd);
      return;
    }
    let file = join(dir, decodeURIComponent(url.pathname));
    if (!file.startsWith(dir) || !existsSync(file) || statSync(file).isDirectory()) file = join(dir, "index.html");
    res.writeHead(200, { "content-type": MIME[extname(file)] ?? "application/octet-stream" });
    createReadStream(file).pipe(res);
  });
  servers.push(server);
  return new Promise<void>((r) => server.listen(APP_PORT, "127.0.0.1", () => r()));
}

async function answers(url: string) {
  try {
    return (await fetch(url, { redirect: "manual" })).status < 500;
  } catch {
    return false;
  }
}

export async function startAll(need: { web: boolean; sample: boolean; app: boolean }) {
  mkdirSync(WORK, { recursive: true });
  // CAPTURE_REUSE=1: use servers a previous `npm run capture:serve` left running.
  if (process.env.CAPTURE_REUSE === "1" && (await answers(`${API}/health`)) && existsSync(CREDS)) {
    if (need.web && !(await answers(`${WEB}/sign-in`))) throw new Error("CAPTURE_REUSE: optni-web is not running");
    if (need.sample && !(await answers(`${SAMPLE}/sign-in`))) throw new Error("CAPTURE_REUSE: sample web is not running");
    if (need.app && !(await answers(APP))) throw new Error("CAPTURE_REUSE: app preview is not running");
    console.log("• reusing running servers");
    return false;
  }
  spawnSync("rm", ["-f", join(WORK, "secrets.json"), join(WORK, "web-owner.json"), join(WORK, "web-admin.json"), join(WORK, "web-staff.json")]);

  // 1. optni-api dev:e2e (a fresh database every run: owner/admin enrol MFA again).
  console.log("• optni-api dev:e2e");
  spawnSync("rm", ["-f", CREDS]);
  background("npm", ["run", "dev:e2e"], API_DIR, { E2E_PORT: String(API_PORT), E2E_CREDENTIALS_FILE: CREDS, WEB_ORIGIN: WEB, LOG_LEVEL: "warn" }, "api.log");

  // 2. builds (in parallel with the API booting)
  if (need.web && (rebuild || !existsSync(join(WEB_DIR, ".next-api", "BUILD_ID")))) {
    console.log("• build optni-web (API mode)");
    run("npm", ["run", "build:api"], WEB_DIR, {}, "web-build.log");
  }
  if (need.sample && (rebuild || !existsSync(join(WEB_DIR, ".next-guides", "BUILD_ID")))) {
    console.log("• build optni-web (sample mode)");
    run("npx", ["next", "build"], WEB_DIR, { NEXT_DIST_DIR: ".next-guides", NEXT_PUBLIC_USE_SAMPLE_DATA: "true" }, "sample-build.log");
  }
  const appDist = join(WORK, "app-dist");
  if (need.app && (rebuild || !existsSync(join(appDist, "index.html")))) {
    console.log("• export optni-app (web, API mode)");
    run("npm", ["run", "export:web", "--", "--output-dir", appDist], APP_DIR, { EXPO_PUBLIC_API_URL: APP }, "app-build.log");
  }

  const end = Date.now() + 8 * 60_000;
  while (!existsSync(CREDS) && Date.now() < end) await new Promise((r) => setTimeout(r, 1000));
  await waitFor(`${API}/health`, "optni-api");
  console.log("  optni-api ready");

  if (need.web) {
    background("npx", ["next", "start", "-p", String(WEB_PORT)], WEB_DIR, { NEXT_DIST_DIR: ".next-api", API_URL: API, NEXT_TELEMETRY_DISABLED: "1" }, "web.log");
    await waitFor(`${WEB}/sign-in`, "optni-web (API mode)");
  }
  if (need.sample) {
    background("npx", ["next", "start", "-p", String(SAMPLE_PORT)], WEB_DIR, { NEXT_DIST_DIR: ".next-guides", NEXT_TELEMETRY_DISABLED: "1" }, "sample.log");
    await waitFor(`${SAMPLE}/sign-in`, "optni-web (sample mode)");
  }
  if (need.app) await serveApp(appDist);
  console.log("• servers ready");
  return true;
}

export function creds() {
  return JSON.parse(readFileSync(CREDS, "utf8")) as {
    owner: { email: string; password: string };
    logins: { email: string; password: string; role: string; name: string }[];
  };
}

export function stopAll() {
  for (const s of servers) s.close();
  for (const c of children) {
    try {
      if (c.pid) process.kill(-c.pid, "SIGTERM");
    } catch {
      /* already gone */
    }
  }
}
