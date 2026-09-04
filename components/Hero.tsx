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
            <span className={styles.statusLabel}>For founders &amp; MSMEs across India</span>
            <span className={styles.ratingBadge}>★ 4.5/5 on Google</span>
          </div>

          {/* Main H1 Title */}
          <h1 id="hero-heading" className={styles.heroHeading}>
            Be the company,<br />
            <span className={styles.highlightText}>Investors</span> are looking for.
          </h1>

          <p className={styles.heroSubhead}>
            Grants, investors, and regulatory structuring delivered with clarity and discipline. We turn the scattered maze of schemes and compliance into one structured funding roadmap designed for measurable growth.
          </p>

          {/* Action CTAs */}
          <div className={styles.ctaGroup}>
            <OpenBookingButton className="btn-primary">
              <span>Start Your Funding Journey</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </OpenBookingButton>

            <a href="#services" className="btn-secondary">
              Explore Advisory Services
            </a>
          </div>

          {/* Supporting Micro-Proof Ribbon */}
          <div className={styles.microProof}>
            <div className={styles.proofItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>100+ Govt Schemes &amp; Grants</span>
            </div>
            <div className={styles.proofDivider} aria-hidden="true">•</div>
            <div className={styles.proofItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>500+ Curated Investor Network</span>
            </div>
            <div className={styles.proofDivider} aria-hidden="true">•</div>
            <div className={styles.proofItem}>
              <span className={styles.checkIcon}>✓</span>
              <span>DPIIT &amp; 80-IAC Tax Exemption</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
