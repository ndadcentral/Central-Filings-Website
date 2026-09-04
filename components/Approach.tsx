import React from 'react'
import styles from './Approach.module.css'

const PILLARS = [
  {
    number: '01',
    title: 'Plain-Language Guidance',
    description:
      "You'll understand what's being filed and why, not just sign where told. We deconstruct statutory requirements and forms into clear, actionable steps.",
    highlight: 'Clear explanations on every form',
  },
  {
    number: '02',
    title: 'Deadlines Tracked for You',
    description:
      'A structured compliance calendar so nothing is missed after the first filing. Proactive reminders before critical due dates to prevent penalty fees.',
    highlight: 'Proactive deadline tracking',
  },
  {
    number: '03',
    title: 'Clear Scope Before We Start',
    description:
      "You'll know exactly what's included before any work begins. Upfront document requirements and transparent processes with zero hidden surprises.",
    highlight: 'Transparent scope upfront',
  },
]

export default function Approach() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Our Approach</span>
          <h2 id="about-heading" className="section-title">
            Compliance without the confusion.
          </h2>
          <p className="section-subtitle">
            We believe filing your taxes and business documents should be straightforward, accurate, and completely transparent.
          </p>
        </div>

        <div className={styles.grid}>
          {PILLARS.map((item) => (
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
