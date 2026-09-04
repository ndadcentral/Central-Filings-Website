import React from 'react'
import OpenBookingButton from './OpenBookingButton'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.heroSection} aria-labelledby="hero-heading">
      <div className="container">
        <div className={styles.heroContent}>
          {/* Lightweight Abstract Line-Art Motif: Document Stack with Verified Filing Seal */}
          <div className={styles.motifContainer} aria-hidden="true">
            <svg width="60" height="60" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" className={styles.motifSvg}>
              {/* Back document card */}
              <rect x="18" y="6" width="34" height="46" rx="4" stroke="var(--teal-300)" strokeOpacity="0.35" fill="rgba(18, 67, 61, 0.2)" />
              {/* Front document card */}
              <rect x="12" y="12" width="34" height="46" rx="4" stroke="var(--teal-300)" strokeOpacity="0.8" fill="rgba(9, 22, 19, 0.75)" />
              {/* Folded corner indicator */}
              <path d="M36 12v10h10" stroke="var(--teal-300)" strokeOpacity="0.8" />
              {/* Content text lines */}
              <line x1="18" y1="26" x2="30" y2="26" stroke="var(--teal-300)" strokeOpacity="0.5" strokeLinecap="round" />
              <line x1="18" y1="32" x2="38" y2="32" stroke="var(--teal-300)" strokeOpacity="0.5" strokeLinecap="round" />
              <line x1="18" y1="38" x2="32" y2="38" stroke="var(--teal-300)" strokeOpacity="0.5" strokeLinecap="round" />
              {/* Official "Filed" circular stamp seal */}
              <circle cx="44" cy="46" r="11" fill="rgba(6, 17, 15, 0.95)" stroke="var(--coral-400)" strokeWidth="1.8" />
              <path d="m39 46 3.5 3.5 7-7" stroke="var(--teal-300)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Glass Card Status Badge */}
          <div className={styles.statusBadge}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span className={styles.statusLabel}>Now onboarding new clients</span>
            <span className="placeholder-tag">[Confirm onboarding capacity &amp; regions served]</span>
          </div>

          {/* Main H1 Title */}
          <h1 id="hero-heading" className={styles.heroHeading}>
            Every filing, done right and<br />
            <span className={styles.highlightText}>on time.</span>
          </h1>

          <p className={styles.heroSubhead}>
            Central Filling handles business registration, tax, and compliance filings for individuals, startups, and MSMEs — explained in plain language, filed correctly the first time.
          </p>

          {/* Action CTAs */}
          <div className={styles.ctaGroup}>
            <OpenBookingButton className="btn-primary">
              <span>Book a free consultation</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </OpenBookingButton>

            <a href="#process" className="btn-secondary">
              See how it works
            </a>
          </div>

          {/* Reassurance text under CTA */}
          <p className={styles.reassuranceText}>
            No pressure, straightforward assessment before anything is filed.
          </p>

          {/* Supporting Micro-Proof Ribbon */}
          <div className={styles.microProof}>
            <div className={styles.proofItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>Plain-Language Guidance</span>
            </div>
            <div className={styles.proofDivider} aria-hidden="true">•</div>
            <div className={styles.proofItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>Proactive Deadline Tracking</span>
            </div>
            <div className={styles.proofDivider} aria-hidden="true">•</div>
            <div className={styles.proofItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>Direct Specialist Access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
