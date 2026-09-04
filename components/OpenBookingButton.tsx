'use client'

import React from 'react'
import { useBookingModal } from './ModalContext'

interface OpenBookingButtonProps {
  children?: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
}

export default function OpenBookingButton({
  children = 'Book an appointment',
  className = 'btn-primary',
}: OpenBookingButtonProps) {
  const { openModal } = useBookingModal()

  return (
    <button
      type="button"
      onClick={(e) => openModal(e.currentTarget)}
      className={className}
      aria-haspopup="dialog"
    >
      {children}
    </button>
  )
}
