import React from 'react'
import OpenBookingButton from './OpenBookingButton'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.heroSection} aria-labelledby="hero-heading">
      <div className="container">
        <div className={styles.heroContent}>
          {/* Glass Card Status Badge */}
          <div className={styles.statusBadge}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span className={styles.statusLabel}>Now accepting new patients</span>
            <span className="placeholder-tag">[Confirm accepting-patients status &amp; area served]</span>
          </div>

          {/* Single H1 on Page */}
          <h1 id="hero-heading" className={styles.heroHeading}>
            A filling that fits,<br className={styles.desktopBreak} /> the first time.
          </h1>

          <p className={styles.heroSubhead}>
            Precision, tooth-coloured restorations crafted to match your natural enamel shade, withstand daily bite pressure, and preserve healthy tooth structure for years to come.
          </p>

          {/* Action CTAs */}
          <div className={styles.ctaGroup}>
            <OpenBookingButton className="btn-primary">
              <span>Book an appointment</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </OpenBookingButton>

            <a href="#process" className="btn-secondary">
              See how it works
            </a>
          </div>

          {/* Supporting Micro-Proof Ribbon */}
          <div className={styles.microProof}>
            <div className={styles.proofItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>Shade-matched composite</span>
            </div>
            <div className={styles.proofDivider} aria-hidden="true">•</div>
            <div className={styles.proofItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>Single-visit restoration</span>
            </div>
            <div className={styles.proofDivider} aria-hidden="true">•</div>
            <div className={styles.proofItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>Digital low-radiation imaging</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
