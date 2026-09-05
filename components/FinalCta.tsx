import React from 'react'
import OpenBookingButton from './OpenBookingButton'
import styles from './FinalCta.module.css'

export default function FinalCta() {
  return (
    <section className="section" aria-labelledby="cta-heading" style={{ paddingTop: 32 }}>
      <div className="container">
        <div className={`glass-surface ${styles.ctaBanner}`}>
          <div className={styles.ctaContent}>
            <h2 id="cta-heading" className={styles.ctaTitle}>
              Let&apos;s get it filed properly.
            </h2>
            <p className={styles.ctaText}>
              Whether you need an individual tax return filed, a company incorporated, or ongoing GST and ROC compliance managed, Central Filings is ready.
            </p>
            <div className={styles.ctaActions}>
              <OpenBookingButton className="btn-primary">
                <span>Book a free consultation</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </OpenBookingButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
