'use client'

import React, { useState, useRef, ChangeEvent, FormEvent } from 'react'
import {
  BookingFormData,
  BookingValidationErrors,
  validateBookingData,
  submitBookingAppointment,
  AVAILABLE_SERVICES,
} from '@/lib/bookingAction'
import styles from './BookingForm.module.css'

interface BookingFormProps {
  onSuccess?: () => void
}

export default function BookingForm({ onSuccess }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    service: '',
    preferredDate: '',
    message: '',
    website: '',
  })

  const [errors, setErrors] = useState<BookingValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // Field element refs to focus the first invalid field on failed submit
  const fullNameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const serviceRef = useRef<HTMLSelectElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    const updatedData = { ...formData, [name]: value }
    setFormData(updatedData)

    // Live re-validation: clear the field error as soon as it becomes valid
    if (errors[name as keyof BookingValidationErrors]) {
      const fieldErrors = validateBookingData(updatedData)
      setErrors((prev) => {
        const nextErrors = { ...prev }
        if (!fieldErrors[name as keyof BookingValidationErrors]) {
          delete nextErrors[name as keyof BookingValidationErrors]
        } else {
          nextErrors[name as keyof BookingValidationErrors] =
            fieldErrors[name as keyof BookingValidationErrors]
        }
        return nextErrors
      })
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isSubmitting) return

    // Run full validation
    const validationErrors = validateBookingData(formData)
    setErrors(validationErrors)

    // If there are errors, shift focus to the first invalid field
    if (Object.keys(validationErrors).length > 0) {
      if (validationErrors.fullName) {
        fullNameRef.current?.focus()
      } else if (validationErrors.phone) {
        phoneRef.current?.focus()
      } else if (validationErrors.service) {
        serviceRef.current?.focus()
      } else if (validationErrors.message) {
        messageRef.current?.focus()
      }
      return
    }

    setIsSubmitting(true)

    try {
      const result = await submitBookingAppointment(formData)
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
      service: '',
      preferredDate: '',
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
        <h3 className={styles.successTitle}>Request Validated</h3>
        <p className={styles.successText}>{successMessage}</p>
        <div className={styles.demoNotice}>
          <strong>DEMO NOTICE:</strong> No backend endpoint is connected yet. Form input has been validated according to clinical booking standards without storing or logging personal information.
        </div>
        <button
          type="button"
          onClick={handleResetDemo}
          className="btn-primary"
          style={{ width: '100%', marginTop: '16px' }}
        >
          Test Another Submission
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      {/* Honeypot field for bot deflection */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <label htmlFor="booking-website">Leave this field blank</label>
        <input
          type="text"
          id="booking-website"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Full Name */}
      <div className={styles.fieldGroup}>
        <label htmlFor="booking-fullname" className={styles.label}>
          Full Name <span className={styles.requiredMark}>*</span>
        </label>
        <input
          ref={fullNameRef}
          type="text"
          id="booking-fullname"
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

      {/* Phone Number */}
      <div className={styles.fieldGroup}>
        <label htmlFor="booking-phone" className={styles.label}>
          Mobile Number <span className={styles.requiredMark}>*</span>
        </label>
        <input
          ref={phoneRef}
          type="tel"
          id="booking-phone"
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

      {/* Service Selection */}
      <div className={styles.fieldGroup}>
        <label htmlFor="booking-service" className={styles.label}>
          Desired Procedure / Service <span className={styles.requiredMark}>*</span>
        </label>
        <div className={styles.selectWrapper}>
          <select
            ref={serviceRef}
            id="booking-service"
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            className={`${styles.select} ${errors.service ? styles.inputError : ''}`}
            aria-required="true"
            aria-invalid={errors.service ? 'true' : 'false'}
            aria-describedby={errors.service ? 'err-service' : undefined}
          >
            <option value="">Select a procedure...</option>
            {AVAILABLE_SERVICES.map((srv) => (
              <option key={srv} value={srv}>
                {srv}
              </option>
            ))}
          </select>
        </div>
        {errors.service && (
          <p id="err-service" className={styles.errorMessage} role="alert">
            {errors.service}
          </p>
        )}
      </div>

      {/* Preferred Date (Optional) */}
      <div className={styles.fieldGroup}>
        <label htmlFor="booking-date" className={styles.label}>
          Preferred Date <span className={styles.optionalMark}>(Optional)</span>
        </label>
        <input
          type="date"
          id="booking-date"
          name="preferredDate"
          value={formData.preferredDate}
          onChange={handleInputChange}
          className={styles.input}
          aria-required="false"
        />
      </div>

      {/* Message (Optional, max 400 chars) */}
      <div className={styles.fieldGroup}>
        <div className={styles.labelRow}>
          <label htmlFor="booking-message" className={styles.label}>
            Symptoms or Notes <span className={styles.optionalMark}>(Optional)</span>
          </label>
          <span className={styles.charCount}>
            {(formData.message || '').length}/400
          </span>
        </div>
        <textarea
          ref={messageRef}
          id="booking-message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Describe your tooth sensitivity, broken filling, or timeline..."
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`btn-primary ${styles.submitButton}`}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <span className={styles.submittingContent}>
            <span className={styles.spinner} aria-hidden="true" />
            Validating...
          </span>
        ) : (
          'Confirm Appointment Request'
        )}
      </button>
    </form>
  )
}
