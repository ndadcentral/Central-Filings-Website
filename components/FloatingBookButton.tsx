'use client'

import React from 'react'
import { useBookingModal } from './ModalContext'
import styles from './FloatingElements.module.css'

export default function FloatingBookButton() {
  const { openModal } = useBookingModal()

  return (
    <div className={styles.bookButtonContainer}>
      <button
        type="button"
        onClick={(e) => openModal(e.currentTarget)}
        className={styles.floatingButton}
        aria-haspopup="dialog"
      >
        <span className={styles.pulseDot} aria-hidden="true" />
        <span className={styles.btnText}>Book appointment</span>
      </button>
    </div>
  )
}
