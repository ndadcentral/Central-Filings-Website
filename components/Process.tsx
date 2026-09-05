import React from 'react'
import styles from './Process.module.css'

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Share Your Details',
    desc: 'Tell us your entity type and what needs filing. We identify the exact statutory forms and documentation required.',
  },
  {
    step: '02',
    title: 'Document Review',
    desc: 'We check what is required and flag any gaps or errors before filing, eliminating rejection notices and delays.',
  },
  {
    step: '03',
    title: 'Filing & Submission',
    desc: 'Your forms are prepared, double-checked, and submitted directly to the relevant government or statutory portal.',
  },
  {
    step: '04',
    title: 'Confirmation & Calendar',
    desc: 'You receive official proof of filing plus a tailored compliance calendar so you always know what is due next.',
  },
]

export default function Process() {
  return (
    <section id="process" className="section" aria-labelledby="process-heading">
      <div className="container">
        <div className="section-header">
          <h2 id="process-heading" className="section-title">
            A simple, four-step filing process.
          </h2>
          <p className="section-subtitle">
            From document review to official submission, we make business and tax compliance straightforward and dependable.
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
