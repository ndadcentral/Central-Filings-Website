import React from 'react'
import styles from './WhyPatientsChooseUs.module.css'

const TRUST_PANELS = [
  {
    title: 'Plain-language answers before anything is filed.',
    summary:
      'No confusing legal jargon or rushed sign-offs. We explain what each statutory form does, which disclosures are required, and why it matters to your business.',
  },
  {
    title: 'Deadlines tracked, not left to you to remember.',
    summary:
      'Statutory compliance does not end after registration. We maintain your active calendar for GST, ROC, and advance tax dates so penalty fees never catch you off-guard.',
  },
  {
    title: 'Direct access to the person actually handling your filing.',
    summary:
      'Work directly with the filing professional handling your documentation. Get clear answers, timely filing confirmations, and accountable support without call-center hurdles.',
  },
]

export default function WhyPatientsChooseUs() {
  return (
    <section className="section" aria-labelledby="why-clients-heading">
      <div className="container">
        <div className="section-header">
          <h2 id="why-clients-heading" className="section-title">
            Why clients choose Central Filings.
          </h2>
          <p className="section-subtitle">
            Straightforward filing support built on plain language, proactive deadline tracking, and dependable execution.
          </p>
        </div>

        <div className={styles.grid}>
          {TRUST_PANELS.map((item) => (
            <div key={item.title} className={`glass-surface ${styles.trustCard}`}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDetail}>{item.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

