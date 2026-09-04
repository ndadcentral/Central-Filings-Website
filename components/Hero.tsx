import React from 'react'
import Image from 'next/image'
import OpenBookingButton from './OpenBookingButton'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.heroSection} aria-labelledby="hero-heading">
      <div className="container">
        <div className={styles.heroContent}>
          {/* Official Brand Emblem Motif */}
          <div className={styles.motifContainer} aria-hidden="true">
            <div className={styles.emblemBadge}>
              <Image
                src="/logo-emblem.png"
                alt="Central Filings emblem"
                width={52}
                height={52}
                className={styles.heroEmblemImg}
                priority
              />
            </div>
          </div>

          {/* Glass Card Status Badge */}
          <div className={styles.statusBadge}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span className={styles.statusLabel}>Now onboarding new clients across India</span>
          </div>

          {/* Main H1 Title */}
          <h1 id="hero-heading" className={styles.heroHeading}>
            Every filing, done right and<br />
            <span className={styles.highlightText}>on time.</span>
          </h1>

          <p className={styles.heroSubhead}>
            Central Filings handles business registration, tax, and compliance filings for individuals, startups, and MSMEs — explained in plain language, filed correctly the first time.
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
