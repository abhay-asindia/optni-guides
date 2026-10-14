# optni-guides

Public help guides for **Optni AI**, published at **https://guides.optni.ai** (AWS Amplify static hosting).
Astro static site; one guide per task; screenshots taken by Playwright from the real apps with
**synthetic data only**.

## Build

```bash
nvm use            # Node 22 (.nvmrc)
npm ci
npm run build      # astro check + astro build → dist/
npm run check:links  # every internal link, image and #anchor in dist/ resolves
npm run check:pages  # serves dist/, opens every page at 1440 and 375 px: no console errors,
                     # failed requests, broken images or sideways scroll; titles, descriptions, canonicals
npm run dev        # http://localhost:4330
```

`amplify.yml` builds on Node 22 and publishes `dist/`. `trailingSlash: "always"`: every page is
`/<slug>/index.html`. `sitemap-index.xml`, `robots.txt` and canonical URLs use `https://guides.optni.ai`.

## Layout

```
src/guides/types.ts           Guide / Step / Shot types
src/guides/content/<slug>.ts  one file per guide: text, steps, captions AND the screenshot recipe
src/guides/index.ts           every guide, in capture order
src/guides/categories.ts      the topics on the home page
src/lib/site.ts               URLs, "Start here" path, search index
src/pages/                    home, /<slug>/, /category/<id>/, /search/, search-index.json, robots.txt, 404
capture/                      the screenshot pipeline (npm run capture)
public/img/<slug>/<step>.png  screenshots (generated — never edit by hand)
```

## Screenshots: `npm run capture`

Each step's `shot` says which app, who is signed in, the screen size, the path, the clicks to get
there and the control to highlight. The capture script reads the same data the site renders, so a
caption and its picture never drift.

```bash
npm run capture                              # everything (boots all servers, ~25 min)
CAPTURE_ONLY=leads,calendar npm run capture  # some guides
CAPTURE_ONLY=leads CAPTURE_STEP=move npm run capture
CAPTURE_HOLD=1 npm run capture               # leave servers up …
CAPTURE_REUSE=1 CAPTURE_ONLY=… npm run capture  # … and reuse them
CAPTURE_REBUILD=1 npm run capture            # rebuild optni-web / the app export first (after UI changes)
```

It expects the sibling checkouts `../optni-api`, `../optni-web`, `../optni-app` (override with
`OPTNI_API_DIR`, `OPTNI_WEB_DIR`, `OPTNI_APP_DIR`) and runs, all on localhost:

| What | How | Port |
|---|---|---|
| optni-api | `npm run dev:e2e` — throwaway mongod, the synthetic **Lakeside Family Chiropractic** seed, random secrets | 4140 |
| optni-web, API mode | `next start` of `.next-api` (`npm run build:api`) | `http://localhost:3041` |
| optni-web, sample mode | `next start` of `.next-guides` — invented sample businesses, used only where the seed has no equivalent (business switcher, another industry's words, a simulated test call, a recording, SLOT_TAKEN) | 3042 |
| optni-app web export, API mode | `npm run export:web` served with `/v1/*` proxied to the API | 8141 (mobile shots, 390×844) |

Desktop shots are 1440×900, mobile 390×844, light theme. The ring and arrow are drawn over the page
by the script, never baked into the app.

### Data safety

- Only the synthetic seed and invented sample data. The capture signs in as `e2e-owner@example.com`
  (and the seeded admin/staff), **never** as `founder@optni.ai` or into the real "Optni AI" business.
- Before every screenshot the page is scanned: any email not at `example.com`, any phone number
  outside 555-01xx, intake keys (`oi_live_…`), JWTs and authenticator secrets are covered. If anything
  is left uncovered the step **fails**. QR codes, recovery codes and new intake keys are covered
  explicitly in their recipes. A second pass by a person looks at every image before commit.
- Logins, sessions and authenticator secrets of the throwaway accounts live in `.capture/` (git-ignored)
  and die with the database.

## Adding or changing a guide

1. Edit or add `src/guides/content/<slug>.ts` (`satisfies Guide`). One action per step; short, plain
   sentences; second person. Say when something needs setup by Optni (`setupByOptni`).
2. Add it to `src/guides/index.ts`.
3. `CAPTURE_ONLY=<slug> npm run capture`, then look at every new image.
4. `npm run build && npm run check:links && npm run check:pages`.

The dashboard links here from its sidebar and account menu (Help) and from "How this works" links on
Leads (`/leads/`), Calendar (`/calendar/`), Settings → Business knowledge (`/ai-knowledge/`) and
Locations (`/locations/`). Renaming one of those slugs needs a matching change in optni-web
`src/config/help.ts`.
