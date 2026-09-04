import React from 'react'
import styles from './Approach.module.css'

const APPROACH_POINTS = [
  {
    number: '01',
    title: 'Shade-Matched Fillings',
    description:
      'We use high-grade composite resin calibrated to your exact natural tooth tone and opacity. The filling integrates seamlessly, leaving no visible metal line or discoloured boundaries.',
    highlight: 'Natural aesthetics & seamless edge blend',
  },
  {
    number: '02',
    title: 'One-Visit Standard Cavities',
    description:
      'From decayed tissue removal and prep to high-intensity light curing and final occlusal polishing, your standard cavity restoration is completed in a single, unhurried appointment.',
    highlight: 'No temporary fillings or repeat trips',
  },
  {
    number: '03',
    title: 'Upfront Pricing Before Work Starts',
    description:
      'You receive a clear breakdown of recommended procedures, restorative materials, and transparent costs before any drill touches your tooth. No surprise fees on your bill.',
    highlight: 'Clear written treatment plan',
  },
]

export default function Approach() {
  return (
    <section id="approach" className="section" aria-labelledby="approach-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Clinical Philosophy</span>
          <h2 id="approach-heading" className="section-title">
            Restorations built on precision, not guesswork.
          </h2>
          <p className="section-subtitle">
            Modern restorative dentistry engineered to protect healthy tooth structure, eliminate sensitivity, and preserve your original bite.
          </p>
        </div>

        <div className={styles.grid}>
          {APPROACH_POINTS.map((item) => (
            <div key={item.number} className={`glass-surface ${styles.card}`}>
              <div className={styles.cardNumber} aria-hidden="true">
                {item.number}
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDescription}>{item.description}</p>
              <div className={styles.cardHighlight}>
                <span className={styles.check}>✓</span>
                <span>{item.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
