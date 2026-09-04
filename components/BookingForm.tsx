'use client'

import React, { useState, useRef, ChangeEvent, FormEvent } from 'react'
import {
  ConsultationFormData,
  ConsultationValidationErrors,
  validateConsultationData,
  submitConsultationBooking,
  FILING_SERVICES,
  ENTITY_TYPES,
} from '@/lib/bookingAction'
import styles from './BookingForm.module.css'

interface BookingFormProps {
  onSuccess?: () => void
}

export default function BookingForm({ onSuccess }: BookingFormProps) {
  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    phone: '',
    companyName: '',
    serviceType: '',
    capitalAmount: '',
    message: '',
    website: '',
  })

  const [errors, setErrors] = useState<ConsultationValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const fullNameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const companyRef = useRef<HTMLInputElement>(null)
  const serviceRef = useRef<HTMLSelectElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    const updatedData = { ...formData, [name]: value }
    setFormData(updatedData)

    if (errors[name as keyof ConsultationValidationErrors]) {
      const fieldErrors = validateConsultationData(updatedData)
      setErrors((prev) => {
        const nextErrors = { ...prev }
        if (!fieldErrors[name as keyof ConsultationValidationErrors]) {
          delete nextErrors[name as keyof ConsultationValidationErrors]
        } else {
          nextErrors[name as keyof ConsultationValidationErrors] =
            fieldErrors[name as keyof ConsultationValidationErrors]
        }
        return nextErrors
      })
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return

    const validationErrors = validateConsultationData(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      if (validationErrors.fullName) {
        fullNameRef.current?.focus()
      } else if (validationErrors.phone) {
        phoneRef.current?.focus()
      } else if (validationErrors.companyName) {
        companyRef.current?.focus()
      } else if (validationErrors.serviceType) {
        serviceRef.current?.focus()
      } else if (validationErrors.message) {
        messageRef.current?.focus()
      }
      return
    }

    setIsSubmitting(true)

    try {
      const result = await submitConsultationBooking(formData)
      if (result.success) {
        setIsSuccess(true)
        setSuccessMessage(result.message)
        if (onSuccess) onSuccess()
      } else if (result.errors) {
        setErrors(result.errors)
      }
    } catch {
      setErrors({
        fullName: 'An unexpected validation error occurred. Please retry.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetDemo = () => {
    setFormData({
      fullName: '',
      phone: '',
      companyName: '',
      serviceType: '',
      capitalAmount: '',
      message: '',
      website: '',
    })
    setErrors({})
    setIsSuccess(false)
    setSuccessMessage('')
  }

  if (isSuccess) {
    return (
      <div className={styles.successContainer} role="status" aria-live="polite">
        <div className={styles.successIconBadge}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className={styles.successTitle}>Consultation Request Received</h3>
        <p className={styles.successText}>{successMessage}</p>
        <div className={styles.demoNotice}>
          <strong>CENTRAL FILLING:</strong> Your consultation request has been queued. A filing specialist will connect within 24 hours to review your requirements and answer your questions.
        </div>
        <button
          type="button"
          onClick={handleResetDemo}
          className="btn-primary"
          style={{ width: '100%', marginTop: '16px' }}
        >
          Submit Another Request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      {/* Honeypot field for bot prevention */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <label htmlFor="consultation-website">Leave this field blank</label>
        <input
          type="text"
          id="consultation-website"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Full Name */}
      <div className={styles.fieldGroup}>
        <label htmlFor="consultation-fullname" className={styles.label}>
          Full Name <span className={styles.requiredMark}>*</span>
        </label>
        <input
          ref={fullNameRef}
          type="text"
          id="consultation-fullname"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="e.g. Rahul Sharma"
          className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
          aria-required="true"
          aria-invalid={errors.fullName ? 'true' : 'false'}
          aria-describedby={errors.fullName ? 'err-fullname' : undefined}
          autoComplete="name"
        />
        {errors.fullName && (
          <p id="err-fullname" className={styles.errorMessage} role="alert">
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Mobile Number */}
      <div className={styles.fieldGroup}>
        <label htmlFor="consultation-phone" className={styles.label}>
          Mobile Number <span className={styles.requiredMark}>*</span>
        </label>
        <input
          ref={phoneRef}
          type="tel"
          id="consultation-phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="10-digit mobile number"
          className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
          aria-required="true"
          aria-invalid={errors.phone ? 'true' : 'false'}
          aria-describedby={errors.phone ? 'err-phone' : undefined}
          autoComplete="tel"
        />
        {errors.phone && (
          <p id="err-phone" className={styles.errorMessage} role="alert">
            {errors.phone}
          </p>
        )}
      </div>

      {/* Company / Startup / Individual Name */}
      <div className={styles.fieldGroup}>
        <label htmlFor="consultation-company" className={styles.label}>
          Company / Entity Name <span className={styles.requiredMark}>*</span>
        </label>
        <input
          ref={companyRef}
          type="text"
          id="consultation-company"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          placeholder="e.g. Acme Enterprises Pvt Ltd or Individual"
          className={`${styles.input} ${errors.companyName ? styles.inputError : ''}`}
          aria-required="true"
          aria-invalid={errors.companyName ? 'true' : 'false'}
          aria-describedby={errors.companyName ? 'err-company' : undefined}
        />
        {errors.companyName && (
          <p id="err-company" className={styles.errorMessage} role="alert">
            {errors.companyName}
          </p>
        )}
      </div>

      {/* Primary Requirement */}
      <div className={styles.fieldGroup}>
        <label htmlFor="consultation-service" className={styles.label}>
          Primary Filing Requirement <span className={styles.requiredMark}>*</span>
        </label>
        <div className={styles.selectWrapper}>
          <select
            ref={serviceRef}
            id="consultation-service"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleInputChange}
            className={`${styles.select} ${errors.serviceType ? styles.inputError : ''}`}
            aria-required="true"
            aria-invalid={errors.serviceType ? 'true' : 'false'}
            aria-describedby={errors.serviceType ? 'err-service' : undefined}
          >
            <option value="">Select filing service...</option>
            {FILING_SERVICES.map((srv) => (
              <option key={srv} value={srv}>
                {srv}
              </option>
            ))}
          </select>
        </div>
        {errors.serviceType && (
          <p id="err-service" className={styles.errorMessage} role="alert">
            {errors.serviceType}
          </p>
        )}
      </div>

      {/* Entity Type (Optional) */}
      <div className={styles.fieldGroup}>
        <label htmlFor="consultation-capital" className={styles.label}>
          Entity Type <span className={styles.optionalMark}>(Optional)</span>
        </label>
        <div className={styles.selectWrapper}>
          <select
            id="consultation-capital"
            name="capitalAmount"
            value={formData.capitalAmount}
            onChange={handleInputChange}
            className={styles.select}
          >
            <option value="">Select entity structure...</option>
            {ENTITY_TYPES.map((ent) => (
              <option key={ent} value={ent}>
                {ent}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div className={styles.fieldGroup}>
        <div className={styles.labelRow}>
          <label htmlFor="consultation-message" className={styles.label}>
            Filing Details or Questions <span className={styles.optionalMark}>(Optional)</span>
          </label>
          <span className={styles.charCount}>
            {(formData.message || '').length}/400
          </span>
        </div>
        <textarea
          ref={messageRef}
          id="consultation-message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="e.g. Need GST registration for new proprietorship, or query regarding pending ROC annual filings..."
          rows={3}
          maxLength={400}
          className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'err-message' : undefined}
        />
        {errors.message && (
          <p id="err-message" className={styles.errorMessage} role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`btn-primary ${styles.submitButton}`}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <span className={styles.submittingContent}>
            <span className={styles.spinner} aria-hidden="true" />
            Submitting Request...
          </span>
        ) : (
          'Book a Free Consultation'
        )}
      </button>
    </form>
  )
}
