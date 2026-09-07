import { z } from 'zod';

/**
 * Normalizes Indian mobile phone numbers:
 * Removes country code prefixes (+91, 91), leading 0, and non-digit characters.
 */
export function normalizeIndianPhone(raw: string): string {
  if (typeof raw !== 'string') return '';
  let cleaned = raw.trim();

  // Strip +91 if present at start
  if (cleaned.startsWith('+91')) {
    cleaned = cleaned.slice(3);
  }

  // Strip non-digit characters
  cleaned = cleaned.replace(/\D/g, '');

  // If 12 digits starting with 91, extract last 10 digits
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    cleaned = cleaned.slice(2);
  }

  // If 11 digits starting with 0, extract last 10 digits
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    cleaned = cleaned.slice(1);
  }

  return cleaned;
}

/**
 * Helper to sanitize optional string fields: trims and turns empty strings into undefined.
 */
const optionalTrimmedString = (maxLen = 200) =>
  z.preprocess((val) => {
    if (typeof val !== 'string') return undefined;
    const trimmed = val.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }, z.string().max(maxLen).optional());

/**
 * Unicode regex for personal/business contact names (supports Indian regional letters & combining marks, Latin diacritics, spaces, hyphens, dots, apostrophes).
 */
const NAME_REGEX = /^[\p{L}\p{M}\s.'-]+$/u;

export const SignupSchema = z
  .object({
    name: z.preprocess(
      (val) => (typeof val === 'string' ? val.trim().replace(/\s+/g, ' ') : val),
      z
        .string()
        .min(2, 'Enter your name using 2-60 letters.')
        .max(60, 'Enter your name using 2-60 letters.')
        .regex(NAME_REGEX, 'Enter your name using 2-60 letters.')
    ),
    phone: z.preprocess(
      (val) => (typeof val === 'string' ? normalizeIndianPhone(val) : val),
      z
        .string()
        .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number beginning with 6-9.')
    ),
    companyName: z.preprocess(
      (val) => (typeof val === 'string' ? val.trim().replace(/\s+/g, ' ') : val),
      z
        .string()
        .min(2, 'Enter a valid company or entity name (2-150 characters).')
        .max(150, 'Company name cannot exceed 150 characters.')
    ),
    primaryFilingRequirement: z.preprocess(
      (val) => (typeof val === 'string' ? val.trim() : val),
      z
        .string()
        .min(1, 'Select a filing requirement.')
        .max(100, 'Filing requirement cannot exceed 100 characters.')
    ),
    email: z.preprocess((val) => {
      if (typeof val !== 'string') return undefined;
      const trimmed = val.trim().toLowerCase();
      return trimmed.length > 0 ? trimmed : undefined;
    }, z.string().email('Invalid email format').max(100, 'Email cannot exceed 100 characters.').optional()),
    entityType: optionalTrimmedString(100),
    city: optionalTrimmedString(100),
    filingDetails: optionalTrimmedString(500),
    countryCode: z.preprocess((val) => {
      if (typeof val !== 'string') return '+91';
      const trimmed = val.trim();
      return trimmed.length > 0 ? trimmed : '+91';
    }, z.string().max(6).default('+91')),
    timezone: z.preprocess((val) => {
      if (typeof val !== 'string') return 'Asia/Kolkata';
      const trimmed = val.trim();
      return trimmed.length > 0 ? trimmed : 'Asia/Kolkata';
    }, z.string().max(50).default('Asia/Kolkata')),
    route: z.preprocess((val) => {
      if (typeof val !== 'string') return '/';
      const trimmed = val.trim();
      if (!trimmed.startsWith('/') || trimmed.includes('://') || trimmed.startsWith('//')) {
        return '/';
      }
      return trimmed;
    }, z.string().max(200).default('/')),

    // 17 URL attribution parameters
    utm_source: optionalTrimmedString(200),
    utm_medium: optionalTrimmedString(200),
    utm_campaign: optionalTrimmedString(200),
    utm_content: optionalTrimmedString(200),
    utm_term: optionalTrimmedString(200),
    platform: optionalTrimmedString(200),
    gclid: optionalTrimmedString(200),
    fbclid: optionalTrimmedString(200),
    fbp: optionalTrimmedString(200),
    fbc: optionalTrimmedString(200),
    matchtype: optionalTrimmedString(200),
    network: optionalTrimmedString(200),
    device: optionalTrimmedString(200),
    keyword: optionalTrimmedString(200),
    placement: optionalTrimmedString(200),
    campaignid: optionalTrimmedString(200),
    adgroupid: optionalTrimmedString(200),
  })
  .strict();

export type SignupInput = z.infer<typeof SignupSchema>;
