/**
 * Guide data. One file per guide in src/guides/<slug>.ts. The site renders the text and the
 * capture script (`npm run capture`) reads the same `shot` recipes to take each step's
 * screenshot into public/img/<slug>/<step id>.png, so caption and picture never drift.
 *
 * Recipes are declarative (no Playwright import here) so the site build stays light.
 */

export type CategoryId =
  | "start"
  | "team"
  | "daily"
  | "bookings"
  | "leads"
  | "settings"
  | "locations"
  | "mobile"
  | "billing"
  | "help";

/** How the capture script finds an element. */
export type Target =
  | { role: string; name?: string | RegExp; exact?: boolean; nth?: number; within?: Target }
  | { label: string | RegExp; exact?: boolean; nth?: number; within?: Target }
  | { text: string | RegExp; exact?: boolean; nth?: number; within?: Target }
  | { css: string; nth?: number; within?: Target }
  | { placeholder: string | RegExp; nth?: number; within?: Target };

export type Action =
  | { do: "click"; target: Target; optional?: boolean }
  | { do: "fill"; target: Target; value: string }
  | { do: "press"; key: string; target?: Target }
  | { do: "hover"; target: Target }
  | { do: "check"; target: Target }
  | { do: "waitFor"; target: Target }
  | { do: "wait"; ms: number }
  | { do: "scrollTo"; target: Target }
  | { do: "openFirst"; target: Target }
  | { do: "goto"; path: string }
  /** Type this seeded person's email and password on the sign-in screen and submit (capture fills the secrets). */
  | { do: "signIn"; who: "owner" | "admin" | "staff" }
  /** Finish authenticator enrolment on screen (capture computes the code from the setup key). */
  | { do: "enrolMfa"; who: "owner" | "admin" }
  /** Pick an option in an open Radix select/listbox. */
  | { do: "choose"; target: Target; option: string | RegExp };

/**
 * Which real app, which signed-in person and which screen size.
 * - web: optni-web in API mode against optni-api `dev:e2e` (Lakeside test business, synthetic).
 * - web-sample: optni-web in sample mode (invented businesses — used only where the API seed has no
 *   second business, e.g. the business switcher and other industries' words).
 * - app: optni-app's web export in API mode against the same API.
 */
export type Shot = {
  app: "web" | "web-sample" | "app";
  as?: "owner" | "admin" | "staff" | "signed-out";
  viewport?: "desktop" | "mobile";
  path: string;
  actions?: Action[];
  /** The control to ring and point at. */
  highlight?: Target;
  /** Ring only, no arrow (for large areas). */
  noArrow?: boolean;
  /** Crop to this element (plus a margin) instead of the full viewport. */
  clip?: Target;
  /** Scroll this element into view before the shot. */
  scrollTo?: Target;
  /** Extra things to cover (in addition to the automatic email/phone/key masking). */
  mask?: Target[];
  /** Run the browser clock as if it were this local time today (America/Chicago), e.g. "18:30". */
  clockAt?: string;
  /** Hide these (e.g. a preview-only notice that real users never see). */
  hide?: Target[];
};

export type Step = {
  id: string;
  /** One action, imperative, short. */
  title: string;
  /** Optional detail, one or two short sentences. */
  body?: string;
  /** Screenshot alt text (what the picture shows). Required when `shot` is set. */
  alt?: string;
  shot?: Shot;
};

export type Section = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: { head: string[]; rows: string[][]; caption?: string };
  code?: { lang: string; text: string; label?: string };
};

export type Guide = {
  slug: string;
  title: string;
  /** Meta description, ≤ 155 chars. */
  description: string;
  category: CategoryId;
  /** Order inside the category. */
  order: number;
  /** Who can do this. */
  roles?: string;
  /** Part of a feature that Optni sets up for you. */
  setupByOptni?: string;
  intro: string;
  steps: Step[];
  /** Background, reference tables and tips after the steps. */
  sections?: Section[];
  related?: string[];
  keywords?: string[];
};
