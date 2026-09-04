import React from 'react'
import styles from './Approach.module.css'

const PILLARS = [
  {
    number: '01',
    title: 'Expert Guidance Upfront',
    description:
      'Free one-hour consultation. We evaluate your funding stage, stress-test your business model, and outline the exact non-dilutive and equity capital options available to you.',
    highlight: 'Comprehensive stage & eligibility audit',
  },
  {
    number: '02',
    title: 'Full Cycle Hand Holding',
    description:
      'Present at term sheet structuring, investor due diligence, and final sanction. Our team works alongside you until funds are officially disbursed into your company account.',
    highlight: 'Present through term sheet to disbursement',
  },
  {
    number: '03',
    title: 'Diverse Portfolio, All Stages',
    description:
      'Direct relationships with 500+ active angel syndicates, institutional venture funds, and family offices spanning DeepTech, CleanTech, Healthcare, D2C, and B2B SaaS.',
    highlight: '500+ active institutional & angel connections',
  },
]

export default function Approach() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Who We Are</span>
          <h2 id="about-heading" className="section-title">
            Raising capital? It starts here.
          </h2>
          <p className="section-subtitle">
            Transparent pricing. Experienced hands. Proven results. Your financial models and investor relations handled by seasoned analysts and incubator advisors.
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
