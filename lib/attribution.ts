'use client'

export const ATTRIBUTION_STORAGE_KEY = 'central_filings_attribution_v1'

export const ALLOWED_ATTRIBUTION_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'platform',
  'gclid',
  'fbclid',
  'fbp',
  'fbc',
  'matchtype',
  'network',
  'device',
  'keyword',
  'placement',
  'campaignid',
  'adgroupid',
] as const

export type AttributionParamKey = (typeof ALLOWED_ATTRIBUTION_PARAMS)[number]

export interface AttributionData {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  platform?: string
  gclid?: string
  fbclid?: string
  fbp?: string
  fbc?: string
  matchtype?: string
  network?: string
  device?: string
  keyword?: string
  placement?: string
  campaignid?: string
  adgroupid?: string
  route?: string
}

const MAX_PARAM_LENGTH = 200

/**
 * Sanitizes a single attribution value: trims, limits to 200 chars.
 * Returns undefined if empty.
 */
export function sanitizeAttributionValue(val: unknown): string | undefined {
  if (typeof val !== 'string') return undefined
  const trimmed = val.trim()
  if (!trimmed) return undefined
  return trimmed.slice(0, MAX_PARAM_LENGTH)
}

/**
 * Derives safe route string from current pathname.
 */
export function getSafeRoute(): string {
  if (typeof window === 'undefined') return '/'
  const pathname = window.location.pathname || '/'
  const trimmed = pathname.trim()
  if (!trimmed.startsWith('/') || trimmed.includes('://') || trimmed.startsWith('//')) {
    return '/'
  }
  return trimmed.slice(0, MAX_PARAM_LENGTH)
}

/**
 * Extracts allowlisted attribution parameters from a URL search query string or URLSearchParams.
 */
export function extractAttributionFromQuery(searchQuery: string | URLSearchParams): AttributionData {
  const params = typeof searchQuery === 'string' ? new URLSearchParams(searchQuery) : searchQuery
  const attribution: AttributionData = {}

  for (const key of ALLOWED_ATTRIBUTION_PARAMS) {
    const rawVal = params.get(key)
    const sanitized = sanitizeAttributionValue(rawVal)
    if (sanitized) {
      attribution[key] = sanitized
    }
  }

  return attribution
}

/**
 * Safely reads stored attribution from sessionStorage.
 */
export function getStoredAttribution(): AttributionData {
  if (typeof window === 'undefined') return {}
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return {}
    }

    const sanitized: AttributionData = {}
    for (const key of ALLOWED_ATTRIBUTION_PARAMS) {
      const val = sanitizeAttributionValue(parsed[key])
      if (val) {
        sanitized[key] = val
      }
    }
    return sanitized
  } catch {
    return {}
  }
}

/**
 * Safely saves attribution to sessionStorage if any valid parameter exists.
 */
export function saveStoredAttribution(data: AttributionData): void {
  if (typeof window === 'undefined') return
  try {
    const sanitized: AttributionData = {}
    let hasKeys = false

    for (const key of ALLOWED_ATTRIBUTION_PARAMS) {
      const val = sanitizeAttributionValue(data[key])
      if (val) {
        sanitized[key] = val
        hasKeys = true
      }
    }

    if (hasKeys) {
      sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(sanitized))
    }
  } catch {
    // Gracefully handle storage quota or access denial
  }
}

/**
 * Captures attribution on page load:
 * If URL has valid parameters, stores them.
 * A clean URL does NOT wipe existing valid storage.
 */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return
  const urlAttribution = extractAttributionFromQuery(window.location.search)
  if (Object.keys(urlAttribution).length > 0) {
    saveStoredAttribution(urlAttribution)
  }
}

/**
 * Retrieves attribution for form submission:
 * Prioritizes active URL parameters with stored sessionStorage parameters as fallback,
 * and attaches the derived safe route.
 */
export function getAttributionForSubmission(): AttributionData {
  const stored = getStoredAttribution()
  const currentUrl = typeof window !== 'undefined' ? extractAttributionFromQuery(window.location.search) : {}

  const merged: AttributionData = {
    ...stored,
    ...currentUrl,
    route: getSafeRoute(),
  }

  return merged
}

/**
 * Clears stored attribution strictly after verified API success.
 */
export function clearAttribution(): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.removeItem(ATTRIBUTION_STORAGE_KEY)
  } catch {
    // Gracefully ignore storage errors
  }
}
