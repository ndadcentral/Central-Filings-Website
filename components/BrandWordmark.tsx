import React from 'react'
import styles from './FloatingElements.module.css'

export default function BrandWordmark() {
  return (
    <div className={styles.brandContainer}>
      <a href="#" className={styles.brandLink} aria-label="Central Filling — Back to top">
        <span className={styles.brandIcon} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C7.5 2 4 4.5 4 8c0 3 2.5 5.5 3 9 .5 3 2 5 5 5s4.5-2 5-5c.5-3.5 3-6 3-9 0-3.5-3.5-6-8-6z" />
            <path d="M9 10c1 .8 2 1 3 1s2-.2 3-1" />
          </svg>
        </span>
        <span className={styles.brandText}>Central Filling</span>
      </a>
    </div>
  )
}
