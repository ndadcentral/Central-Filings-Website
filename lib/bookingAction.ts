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

export function validateConsultationData(data: ConsultationFormData): ConsultationValidationErrors {
  const errors: ConsultationValidationErrors = {}

  // 1. Full name
  const trimmedName = (data.fullName || '').trim()
  if (!trimmedName || trimmedName.length < 2) {
    errors.fullName = 'Please enter your full name (minimum 2 characters).'
  }

  // 2. Phone (10 digits India mobile)
  const sanitizedPhone = (data.phone || '').replace(/\s+/g, '').replace(/[-+()]/g, '')
  const tenDigitMatch = sanitizedPhone.match(/(?:(?:0|91))?(\d{10})$/)
  const digitsOnly = sanitizedPhone.replace(/\D/g, '')

  if (!sanitizedPhone) {
    errors.phone = 'Mobile number is required.'
  } else if (!/^\d{10}$/.test(digitsOnly) && !tenDigitMatch) {
    errors.phone = 'Please enter a valid 10-digit mobile number.'
  }

  // 3. Company / Startup name
  const trimmedCompany = (data.companyName || '').trim()
  if (!trimmedCompany || trimmedCompany.length < 2) {
    errors.companyName = 'Please enter your startup or company name.'
  }

  // 4. Service / Advisory Track
  if (!data.serviceType || data.serviceType.trim() === '') {
    errors.serviceType = 'Please select your primary filing requirement.'
  }

  // 5. Message (optional, max 400 chars)
  if (data.message && data.message.length > 400) {
    errors.message = 'Message must be 400 characters or fewer.'
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
      message: 'Submission rejected.',
    }
  }

  const errors = validateConsultationData(data)
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Please resolve the highlighted fields.',
      errors,
    }
  }

  // Simulate network delay for realistic interaction
  await new Promise((resolve) => setTimeout(resolve, 550))

  return {
    success: true,
    message: 'Consultation request received. A filing specialist will connect to review your requirements.',
  }
}
