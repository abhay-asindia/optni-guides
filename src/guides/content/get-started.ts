import type { Action, Guide, Target } from "../types.ts";
import { button, inDialog, label } from "../targets.ts";

/**
 * §16 self-serve signup and the setup wizard. Captured in sample mode (optni-web, invented data): the sample
 * signup code is 123456 and `?scenario=setup-new` starts setup fresh, so no real account is ever created.
 */
const sampleNote: Target = { text: /^Sample mode:/ };
/** Sample-mode notices real users never see. */
const sampleHide: Target[] = [sampleNote, { text: "Sample mode — saves stay in this tab" }];
const fillSignup: Action[] = [
  { do: "fill", target: label("Your name"), value: "Riley Owner" },
  { do: "fill", target: label("Work email"), value: "riley@example.com" },
  { do: "fill", target: label("New password"), value: "a long example passphrase" },
  { do: "fill", target: label("Confirm password"), value: "a long example passphrase" },
  { do: "fill", target: label("Business name"), value: "Northside Plumbing" },
  { do: "check", target: { role: "checkbox" } },
];
const toVerify: Action[] = [...fillSignup, { do: "click", target: button("Create account") }, { do: "waitFor", target: { role: "heading", name: "Enter your code" } }];
const setup = (step: string) => `/setup?step=${step}&scenario=setup-new`;
const footer: Target = { css: '[data-testid="setup-footer"]' };

export default {
  slug: "get-started",
  title: "Create your account and set up Optni",
  description: "Sign up for a free 14-day trial, confirm your email, then follow the setup steps until your AI receptionist is ready to go live.",
  category: "start",
  order: 0,
  roles: "The person who signs up becomes the owner. Admins can help with every step except going live.",
  setupByOptni: "Your phone number, texting registration and plan — you ask for them in the last step and the Optni team sets them up.",
  intro:
    "You can set up Optni yourself in about 20 minutes. Create an account, confirm your email, and the setup guide walks you through your business, hours, services, what the AI should know and how it hands calls to your team. Test your AI as often as you like — it's free. When you're happy, ask to go live and the Optni team connects your number. Nothing is charged during the 14-day trial.",
  steps: [
    {
      id: "sign-up",
      title: "Go to Create an account and fill in your details.",
      body: "Use your work email. Pick the kind of business you run — it sets the words Optni and your AI use, and you can change it later. Your phone number is optional and only for the Optni team.",
      alt: "The Create your account form, filled in, with the Create account button ringed.",
      shot: { app: "web-sample", as: "signed-out", path: "/signup?industry=home-services", actions: fillSignup, highlight: button("Create account"), hide: sampleHide },
    },
    {
      id: "code",
      title: "Type the 6-digit code from the email, then select Confirm email.",
      body: "The code works for 15 minutes. No email? Check spam, or select Send a new code. If you already have an account, the email tells you how to sign in instead.",
      alt: "The Enter your code screen with the 6-digit code field and the Confirm email button ringed.",
      shot: { app: "web-sample", as: "signed-out", path: "/signup?industry=home-services", actions: [...toVerify, { do: "fill", target: label("6-digit code"), value: "123456" }], highlight: button("Confirm email"), hide: sampleHide },
    },
    {
      id: "authenticator",
      title: "Set up your authenticator app.",
      body: "Owners confirm every sign-in with a code from their phone, because your account can see what callers tell your AI. Scan the QR code, type the code it shows, then save your recovery codes.",
      alt: "The Protect your account screen with a QR code (hidden in this guide).",
      shot: {
        app: "web-sample",
        hide: sampleHide,
        as: "signed-out",
        path: "/signup?industry=home-services",
        actions: [...toVerify, { do: "fill", target: label("6-digit code"), value: "123456" }, { do: "click", target: button("Confirm email") }, { do: "waitFor", target: { role: "heading", name: "Protect your account" } }],
        mask: [{ role: "img", name: "QR code for your authenticator app" }],
        highlight: { role: "img", name: "QR code for your authenticator app" },
      },
    },
    {
      id: "steps",
      title: "Work through the setup steps on the left.",
      body: "Each step shows what is still missing. Done, In progress and Skipped tell you where you are. You can skip a step and come back — setup reopens where you left off.",
      alt: "The setup guide with its nine steps listed on the left and the first step open.",
      shot: { app: "web-sample", hide: sampleHide, path: setup("you"), highlight: { css: '[data-testid="setup-steps"]' }, noArrow: true },
    },
    {
      id: "import",
      title: "On Your business, add your website and select Import from my website.",
      body: "Optni reads your site and drafts your About, common questions, services, hours, phone and address — only what the site says. Untick anything that's wrong, then select Apply. Nothing is saved until you do.",
      alt: "The Import from your website dialog listing the drafted items with checkboxes, and the Apply button ringed.",
      shot: {
        app: "web-sample",
        hide: sampleHide,
        path: setup("business"),
        actions: [
          { do: "fill", target: label("Website"), value: "northside-plumbing.example" },
          { do: "click", target: { css: '[data-testid="import-website"]' } },
          { do: "waitFor", target: inDialog({ text: "Use this as your About" }) },
        ],
        highlight: { css: '[data-testid="import-apply"]' },
      },
    },
    {
      id: "locations",
      title: "Check your address and opening hours.",
      body: "Ava uses the hours to know what \"after hours\" means. Save, then select Done, continue.",
      alt: "The Locations & hours step with the Name and address card.",
      shot: { app: "web-sample", hide: sampleHide, path: setup("locations"), highlight: { role: "heading", name: "Name and address" } },
    },
    {
      id: "services",
      title: "Add what people can book, and who takes the bookings.",
      body: "Your industry's usual booking types are already there. Add at least one person with working hours, so Ava can offer real times.",
      alt: "The Services step with the booking types list and the Add provider button ringed.",
      shot: { app: "web-sample", hide: sampleHide, path: setup("services"), scrollTo: button("Add provider"), highlight: button("Add provider") },
    },
    {
      id: "knowledge",
      title: "Answer the questions callers ask. Select Suggest common questions to start.",
      body: "We add the questions people usually ask a business like yours, with the answers left blank — write them in your own words and remove any that don't apply. Ava and Max only say what's written here; they never guess prices or policies. Aim for at least three.",
      alt: "What your AI should know, with suggested questions added and a note to write the answers.",
      shot: {
        app: "web-sample",
        hide: sampleHide,
        path: setup("knowledge"),
        actions: [{ do: "click", target: button("Suggest common questions") }, { do: "waitFor", target: { text: /Write the answers in your own words/ } }],
        highlight: { text: /Write the answers in your own words/ },
      },
    },
    {
      id: "handover",
      title: "Choose how Ava hands a caller to your team.",
      body: "Check the greeting (it must say Ava is an AI and that the call may be recorded), add a live transfer number if someone can pick up, and choose what happens after hours.",
      alt: "The Hand-over step with the live transfer number card ringed.",
      shot: { app: "web-sample", hide: sampleHide, path: setup("handover"), scrollTo: { text: "When a caller needs a person" }, highlight: { text: "When a caller needs a person" } },
    },
    {
      id: "test",
      title: "Test your AI right there in the step.",
      body: "Chat or talk with Ava and Max exactly as callers will. It's free and nothing is saved, booked or sent. Use the thumbs to tell the Optni team how a reply went.",
      alt: "Test your AI inside the setup guide, with a test conversation.",
      shot: {
        app: "web-sample",
        hide: sampleHide,
        path: setup("test"),
        actions: [{ do: "click", target: { css: '[data-testid="sim-starter"]', nth: 0 } }, { do: "waitFor", target: { css: '[data-testid="sim-ai"]', nth: 1 } }],
        highlight: { css: '[data-testid="test-ai-inline"]' },
        noArrow: true,
      },
    },
    {
      id: "team",
      title: "Invite your team, or skip for now.",
      body: "Invite the people who'll pick up handovers. Your trial includes three seats.",
      alt: "The Team step with Skip for now ringed.",
      shot: { app: "web-sample", hide: sampleHide, path: setup("team"), scrollTo: footer, highlight: { css: '[data-testid="step-skip"]' } },
    },
    {
      id: "plan-number",
      title: "On Go live, pick a plan and how you want your number.",
      body: "Get a new local number, or keep the number customers know and forward its calls to Optni. Nothing is charged now — the Optni team confirms the plan with you first.",
      alt: "The Go live step with the three plan cards and the number choice.",
      shot: { app: "web-sample", hide: sampleHide, path: setup("golive"), highlight: { css: '[data-testid="plan-growth"]' } },
    },
    {
      id: "texting",
      title: "Fill in the texting registration, then select Send to the Optni team.",
      body: "US carriers only deliver business texts from registered numbers. Use your business's details exactly as on your tax records. If you only want calls for now, switch texting off.",
      alt: "The texting registration form with legal name, business type, EIN, website, address and contact details.",
      shot: { app: "web-sample", hide: sampleHide, path: setup("golive"), scrollTo: { text: "3. Texting" }, highlight: { text: "3. Texting" } },
    },
    {
      id: "status",
      title: "Watch the status card for updates.",
      body: "We email you when something changes. If the team needs more information, their note appears here — fix it and select Update and resend.",
      alt: "The go-live status card showing the request was sent and the steps still to come.",
      shot: {
        app: "web-sample",
        hide: sampleHide,
        path: setup("golive"),
        actions: [
          { do: "choose", target: { role: "combobox", name: "Type of business" }, option: /Private company/ },
          { do: "fill", target: label(/EIN/), value: "12-3456789" },
          { do: "fill", target: { css: "#gl-site" }, value: "northside-plumbing.example" },
          { do: "fill", target: label("Contact phone"), value: "(612) 555-0142" },
          { do: "click", target: { css: '[data-testid="golive-submit"]' } },
          { do: "waitFor", target: { css: '[data-testid="golive-status"]' } },
        ],
        highlight: { css: '[data-testid="golive-status"]' },
        noArrow: true,
      },
    },
    {
      id: "today",
      title: "Come back any time from Today.",
      body: "Until your go-live request is sent, Today shows Finish setting up with your progress. You can also open the setup guide from your account menu.",
      alt: "The Finish setting up card on Today with progress and a Continue setup button.",
      shot: { app: "web-sample", hide: sampleHide, path: "/?scenario=setup-new", highlight: { css: '[data-testid="finish-setup-card"]' } },
    },
    {
      id: "phone",
      title: "On a phone, use the step picker at the top.",
      body: "The progress bar and the arrows move between steps; everything works the same.",
      alt: "The setup guide on a phone, with the progress bar and step picker at the top.",
      shot: { app: "web-sample", hide: sampleHide, viewport: "mobile", path: setup("knowledge"), highlight: { css: '[data-testid="setup-pager"]' } },
    },
  ],
  sections: [
    {
      heading: "Your trial",
      bullets: [
        "14 days, free, no card. Test your AI works the whole time.",
        "Ava and Max only answer real calls and texts once you're live — the Optni team connects your number first.",
        "After the trial everything keeps working while you talk to us: your settings, your data and Test your AI.",
      ],
    },
    {
      heading: "Who can do what",
      table: {
        head: ["Step", "Owner", "Admin"],
        rows: [
          ["Business name and industry", "Yes", "View"],
          ["Website, import, locations, services, knowledge, hand-over, team", "Yes", "Yes"],
          ["Go live (plan and number)", "Yes", "View"],
        ],
      },
    },
  ],
  related: ["sign-in", "test-your-ai", "ai-knowledge", "locations", "invite-your-team", "billing-and-usage"],
  keywords: ["sign up", "signup", "create account", "trial", "setup", "onboarding", "go live", "phone number", "texting registration", "A2P", "10DLC", "import website"],
} satisfies Guide;
