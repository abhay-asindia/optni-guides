/**
 * Every guide, in capture order. The capture runs these top to bottom against one fresh seeded API,
 * so a guide that changes data (e.g. creates an intake key) must not break a later one.
 */
import type { Guide } from "./types.ts";
import getStarted from "./content/get-started.ts";
import signIn from "./content/sign-in.ts";
import recoveryCodes from "./content/recovery-codes.ts";
import resetPassword from "./content/reset-password.ts";
import testYourAi from "./content/test-your-ai.ts";
import callMeToTest from "./content/call-me-to-test.ts";
import feedback from "./content/feedback.ts";
import inviteYourTeam from "./content/invite-your-team.ts";
import switchBusinesses from "./content/switch-businesses.ts";
import today from "./content/today.ts";
import inboxHandovers from "./content/inbox-handovers.ts";
import sendAMessage from "./content/send-a-message.ts";
import optedOutContacts from "./content/opted-out-contacts.ts";
import calls from "./content/calls.ts";
import missedCalls from "./content/missed-calls.ts";
import calendar from "./content/calendar.ts";
import newBooking from "./content/new-booking.ts";
import changeABooking from "./content/change-a-booking.ts";
import slotTaken from "./content/slot-taken.ts";
import providersAndHours from "./content/providers-and-hours.ts";
import bookingTypes from "./content/booking-types.ts";
import leads from "./content/leads.ts";
import newLead from "./content/new-lead.ts";
import websiteIntake from "./content/website-intake.ts";
import contacts from "./content/contacts.ts";
import insights from "./content/insights.ts";
import businessAndIndustry from "./content/business-and-industry.ts";
import aiKnowledge from "./content/ai-knowledge.ts";
import integrations from "./content/integrations.ts";
import locations from "./content/locations.ts";
import greeting from "./content/greeting.ts";
import voiceModeAndTransfer from "./content/voice-mode-and-transfer.ts";
import textingAndTextBack from "./content/texting-and-text-back.ts";
import reviewLinkAndLocationNote from "./content/review-link-and-location-note.ts";
import notifications from "./content/notifications.ts";
import mobileApp from "./content/mobile-app.ts";
import billingAndUsage from "./content/billing-and-usage.ts";
import privacyAndCompliance from "./content/privacy-and-compliance.ts";
import troubleshooting from "./content/troubleshooting.ts";

export const guides: Guide[] = [
  getStarted,
  signIn,
  recoveryCodes,
  resetPassword,
  testYourAi,
  callMeToTest,
  feedback,
  inviteYourTeam,
  switchBusinesses,
  today,
  inboxHandovers,
  sendAMessage,
  optedOutContacts,
  calls,
  missedCalls,
  calendar,
  newBooking,
  changeABooking,
  slotTaken,
  providersAndHours,
  bookingTypes,
  leads,
  newLead,
  websiteIntake,
  contacts,
  insights,
  businessAndIndustry,
  aiKnowledge,
  integrations,
  locations,
  greeting,
  voiceModeAndTransfer,
  textingAndTextBack,
  reviewLinkAndLocationNote,
  notifications,
  mobileApp,
  billingAndUsage,
  privacyAndCompliance,
  troubleshooting,
];

export const guideBySlug = new Map(guides.map((g) => [g.slug, g]));
