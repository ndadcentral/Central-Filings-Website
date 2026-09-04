import React from 'react'
import styles from './FloatingElements.module.css'

export default function BrandWordmark() {
  return (
    <div className={styles.brandContainer}>
      <a href="#" className={styles.brandLink} aria-label="ConsultUp India — Home">
        <span className={styles.brandIcon} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
        </span>
        <span className={styles.brandText}>ConsultUp India</span>
      </a>
    </div>
  )
}
