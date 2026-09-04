export interface BookingFormData {
  fullName: string
  phone: string
  service: string
  preferredDate?: string
  message?: string
  website?: string // Honeypot field
}

export interface BookingValidationErrors {
  fullName?: string
  phone?: string
  service?: string
  preferredDate?: string
  message?: string
}

export interface BookingActionResult {
  success: boolean
  message: string
  errors?: BookingValidationErrors
}

export const AVAILABLE_SERVICES = [
  'Tooth-coloured fillings',
  'Old filling replacement',
  'Root canal therapy',
  'Preventive checkups & cleaning',
  'Emergency visit',
  'General consultation',
] as const

/**
 * Pure client-side validation logic following Section 7 requirements.
 */
export function validateBookingData(data: BookingFormData): BookingValidationErrors {
  const errors: BookingValidationErrors = {}

  // 1. Full name: trimmed, min 2 chars, reject spaces-only
  const trimmedName = (data.fullName || '').trim()
  if (!trimmedName || trimmedName.length < 2) {
    errors.fullName = 'Please enter your full name (minimum 2 characters).'
  }

  // 2. Phone: exactly 10 digits after stripping whitespace
  const sanitizedPhone = (data.phone || '').replace(/\s+/g, '').replace(/[-+()]/g, '')
  // If user included +91 or 0 prefix, allow stripping standard prefix or check 10 digits
  const tenDigitMatch = sanitizedPhone.match(/(?:(?:0|91))?(\d{10})$/)
  const digitsOnly = sanitizedPhone.replace(/\D/g, '')

  if (!sanitizedPhone) {
    errors.phone = 'Phone number is required.'
  } else if (!/^\d{10}$/.test(digitsOnly) && !tenDigitMatch) {
    errors.phone = 'Please enter a valid 10-digit mobile number.'
  }

  // 3. Service: required, must not be empty
  if (!data.service || data.service.trim() === '') {
    errors.service = 'Please select a service.'
  }

  // 4. Message: optional, max 400 chars
  if (data.message && data.message.length > 400) {
    errors.message = 'Message must be 400 characters or fewer.'
  }

  return errors
}

/**
 * Isolated submit handler ready for drop-in backend/API integration.
 * In demo mode, returns demo success without sending or persisting data.
 */
export async function submitBookingAppointment(
  data: BookingFormData
): Promise<BookingActionResult> {
  // Honeypot check: if filled, silently fail submission (bot deflection)
  if (data.website && data.website.trim().length > 0) {
    return {
      success: false,
      message: 'Submission rejected.',
    }
  }

  const errors = validateBookingData(data)
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Please resolve the highlighted errors.',
      errors,
    }
  }

  // Simulate minimal async delay for realistic UI feedback without real backend
  await new Promise((resolve) => setTimeout(resolve, 600))

  return {
    success: true,
    message: 'Demo validation successful. No information has been sent or saved.',
  }
}
