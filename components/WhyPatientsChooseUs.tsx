import React from 'react'
import styles from './WhyPatientsChooseUs.module.css'

const TRUST_POINTS = [
  {
    title: 'Straight Answers First',
    summary: 'Clear diagnosis, realistic restorative outcomes, and honest clinical advice with zero sales pressure.',
    detail: 'We will show you exactly what your dental X-rays reveal and outline your options plainly before starting any treatment.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: 'Comfort Paced to You',
    summary: 'Gentle, localized numbing, modern low-vibration instruments, and pauses whenever you raise a hand.',
    detail: 'Dental procedures can cause anxiety. We move strictly at your pace, checking in at every stage of the restoration.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    title: 'Built for One Visit',
    summary: 'Efficient appointments designed to respect your schedule without rushing technical precision.',
    detail: 'We allocate dedicated doctor and operatory time so you leave with your cavity fully resolved in a single session.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
]

export default function WhyPatientsChooseUs() {
  return (
    <section className="section" aria-labelledby="trust-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Patient Commitment</span>
          <h2 id="trust-heading" className="section-title">
            Why patients choose Central Filling.
          </h2>
          <p className="section-subtitle">
            Reliable dental care centered around honest diagnostics and clinical precision.
          </p>
        </div>

        <div className={styles.grid}>
          {TRUST_POINTS.map((pt) => (
            <div key={pt.title} className={`glass-surface ${styles.trustCard}`}>
              <div className={styles.iconBadge}>{pt.icon}</div>
              <h3 className={styles.cardTitle}>{pt.title}</h3>
              <p className={styles.cardSummary}>{pt.summary}</p>
              <p className={styles.cardDetail}>{pt.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
