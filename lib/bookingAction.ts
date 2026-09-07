import { getAttributionForSubmission, clearAttribution } from '@/lib/attribution'
import { normalizeIndianPhone } from '@/server/validators/user.validator'

export interface ConsultationFormData {
  fullName: string
  phone: string
  companyName: string
  serviceType: string
  capitalAmount?: string
  message?: string
  website?: string // Honeypot
}

export interface ConsultationValidationErrors {
  fullName?: string
  phone?: string
  companyName?: string
  serviceType?: string
  capitalAmount?: string
  message?: string
}

export interface ConsultationActionResult {
  success: boolean
  message: string
  errors?: ConsultationValidationErrors
}

export const FILING_SERVICES = [
  'GST registration & filing',
  'Company / LLP incorporation',
  'ROC annual compliance',
  'Income tax filing — individuals & businesses',
  'MSME / Udyam registration',
  'Trademark & IP filing support',
  'Startup India / DPIIT recognition support',
  'Not sure — need advice',
] as const

export const ENTITY_TYPES = [
  'Individual / Salaried',
  'Sole Proprietorship',
  'Partnership Firm',
  'Limited Liability Partnership (LLP)',
  'Private Limited Company (Pvt Ltd)',
  'One Person Company (OPC)',
  'Not registered yet / Need guidance',
] as const

const NAME_REGEX = /^[\p{L}\p{M}\s.'-]+$/u

export function validateConsultationData(data: ConsultationFormData): ConsultationValidationErrors {
  const errors: ConsultationValidationErrors = {}

  // 1. Full name
  const trimmedName = (data.fullName || '').trim().replace(/\s+/g, ' ')
  if (!trimmedName || trimmedName.length < 2) {
    errors.fullName = 'Please enter your full name (minimum 2 characters).'
  } else if (trimmedName.length > 60) {
    errors.fullName = 'Full name cannot exceed 60 characters.'
  } else if (!NAME_REGEX.test(trimmedName)) {
    errors.fullName = 'Enter your name using letters.'
  }

  // 2. Phone (10 digits India mobile starting with 6-9)
  const normalizedPhone = normalizeIndianPhone(data.phone || '')
  if (!normalizedPhone) {
    errors.phone = 'Mobile number is required.'
  } else if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number beginning with 6-9.'
  }

  // 3. Company / Startup name
  const trimmedCompany = (data.companyName || '').trim().replace(/\s+/g, ' ')
  if (!trimmedCompany || trimmedCompany.length < 2) {
    errors.companyName = 'Please enter your company or entity name (minimum 2 characters).'
  } else if (trimmedCompany.length > 150) {
    errors.companyName = 'Company name cannot exceed 150 characters.'
  }

  // 4. Service / Advisory Track
  const trimmedService = (data.serviceType || '').trim()
  if (!trimmedService) {
    errors.serviceType = 'Please select your primary filing requirement.'
  }

  // 5. Message (optional, max 400 chars)
  if (data.message && data.message.length > 400) {
    errors.message = 'Filing details must be 400 characters or fewer.'
  }

  return errors
}

export async function submitConsultationBooking(
  data: ConsultationFormData
): Promise<ConsultationActionResult> {
  // Honeypot check: bot deflection
  if (data.website && data.website.trim().length > 0) {
    return {
      success: false,
      message: 'Please check your details and try again.',
    }
  }

  const clientErrors = validateConsultationData(data)
  if (Object.keys(clientErrors).length > 0) {
    return {
      success: false,
      message: 'Please resolve the highlighted fields.',
      errors: clientErrors,
    }
  }

  // Retrieve UTM and routing attribution
  const attribution = getAttributionForSubmission()

  const payload: Record<string, unknown> = {
    name: data.fullName.trim().replace(/\s+/g, ' '),
    phone: data.phone.trim(),
    companyName: data.companyName.trim().replace(/\s+/g, ' '),
    primaryFilingRequirement: data.serviceType.trim(),
    countryCode: '+91',
    timezone: 'Asia/Kolkata',
    ...attribution,
  }

  if (data.capitalAmount && data.capitalAmount.trim()) {
    payload.entityType = data.capitalAmount.trim()
  }

  if (data.message && data.message.trim()) {
    payload.filingDetails = data.message.trim()
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 15000)

  try {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    let json: any = null
    try {
      json = await res.json()
    } catch {
      return {
        success: false,
        message: 'Received an invalid server response. Please try again later.',
      }
    }

    // Verify exact minimal success contract
    const isVerifiedSuccess =
      (res.status === 200 || res.status === 201) &&
      json &&
      json.success === true &&
      json.data &&
      (json.data.status === 'new' || json.data.status === 'existing')

    if (isVerifiedSuccess) {
      // Clear UTM attribution strictly after verified success
      clearAttribution()
      return {
        success: true,
        message: json.message || 'Your consultation request has been received. A filing specialist will connect shortly.',
      }
    }

    // Handle validation errors from backend
    if (res.status === 400 && json?.errors) {
      const serverErrors: ConsultationValidationErrors = {}
      if (json.errors.name?._errors?.[0]) serverErrors.fullName = json.errors.name._errors[0]
      if (json.errors.phone?._errors?.[0]) serverErrors.phone = json.errors.phone._errors[0]
      if (json.errors.companyName?._errors?.[0]) serverErrors.companyName = json.errors.companyName._errors[0]
      if (json.errors.primaryFilingRequirement?._errors?.[0]) serverErrors.serviceType = json.errors.primaryFilingRequirement._errors[0]
      if (json.errors.filingDetails?._errors?.[0]) serverErrors.message = json.errors.filingDetails._errors[0]

      return {
        success: false,
        message: json.message || 'Please check your details and try again.',
        errors: Object.keys(serverErrors).length > 0 ? serverErrors : undefined,
      }
    }

    return {
      success: false,
      message: json?.message || 'Unable to submit your consultation request. Please try again.',
    }
  } catch (err: any) {
    clearTimeout(timeoutId)
    if (err.name === 'AbortError') {
      return {
        success: false,
        message: 'The request timed out. Please check your connection and try again.',
      }
    }
    return {
      success: false,
      message: 'A network error occurred. Please check your connection and retry.',
    }
  }
}
