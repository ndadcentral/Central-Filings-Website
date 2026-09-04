'use client'

import React, { createContext, useContext, useState, useCallback, useRef } from 'react'
import BookingModal from '@/components/BookingModal'

export interface ModalContextType {
  isOpen: boolean
  openModal: (triggerEl?: HTMLElement | null) => void
  closeModal: () => void
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLElement | null>(null)

  const openModal = useCallback((triggerEl?: HTMLElement | null) => {
    if (triggerEl) {
      triggerRef.current = triggerEl
    } else if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      triggerRef.current = document.activeElement
    }
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    // Return focus to trigger element
    if (triggerRef.current) {
      setTimeout(() => {
        triggerRef.current?.focus()
        triggerRef.current = null
      }, 50)
    }
  }, [])

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <BookingModal isOpen={isOpen} onClose={closeModal} />
    </ModalContext.Provider>
  )
}

export function useBookingModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useBookingModal must be used within a ModalProvider')
  }
  return context
}
