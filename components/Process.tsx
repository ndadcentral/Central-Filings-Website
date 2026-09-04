import React from 'react'
import styles from './Process.module.css'

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Funding Audit',
    desc: 'We assess your stage, traction, and sector, then map every Central/State grant, debt scheme, and investor track you qualify for.',
  },
  {
    step: '02',
    title: 'Documentation & Financial Modelling',
    desc: 'We construct your grant-ready pitch deck, 3–5 year financial model, unit economics breakdown, and investor collateral.',
  },
  {
    step: '03',
    title: 'Applications & Investor Introductions',
    desc: 'We file scheme applications strictly to official guidelines and open curated introductions to our 500+ investor network.',
  },
  {
    step: '04',
    title: 'Close & Disburse',
    desc: 'Pitch rehearsals, due diligence management, query handling, and compliance support carry you through to final sanction and capital disbursement.',
  },
]

export default function Process() {
  return (
    <section id="process" className="section" aria-labelledby="process-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">How It Works</span>
          <h2 id="process-heading" className="section-title">
            A disciplined path from scattered to funded.
          </h2>
          <p className="section-subtitle">
            We turn the scattered maze of grants, schemes, and investors into one structured capital roadmap.
          </p>
        </div>

        <div className={styles.timelineGrid}>
          {PROCESS_STEPS.map((item) => (
            <div key={item.step} className={`glass-surface ${styles.stepCard}`}>
              <div className={styles.stepBadge}>
                <span>Phase {item.step}</span>
              </div>
              <h3 className={styles.stepTitle}>{item.title}</h3>
              <p className={styles.stepDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
