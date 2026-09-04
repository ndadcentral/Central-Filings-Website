import React from 'react'
import styles from './Process.module.css'

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Book Online or Call',
    desc: 'Reserve a guaranteed time slot through our instant booking request modal or direct clinic line without waiting on hold.',
  },
  {
    step: '02',
    title: 'Consultation & Digital X-Ray',
    desc: 'Low-radiation digital radiography identifies the exact perimeter of cavity decay and confirms pulp health before treatment.',
  },
  {
    step: '03',
    title: 'The Filling, Same Visit',
    desc: 'Targeted gentle local anaesthesia, meticulous decay removal, optical shade matching, and light-cured composite bonding.',
  },
  {
    step: '04',
    title: 'Aftercare & Follow-up',
    desc: 'Occlusion check for natural bite alignment, immediate sensitivity guidance, and straightforward follow-up advice.',
  },
]

export default function Process() {
  return (
    <section id="process" className="section" aria-labelledby="process-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">The Journey</span>
          <h2 id="process-heading" className="section-title">
            Simple, transparent, and complete in one visit.
          </h2>
          <p className="section-subtitle">
            From the moment you reserve your appointment to walking out with a restored smile, here is how we work.
          </p>
        </div>

        <div className={styles.timelineGrid}>
          {PROCESS_STEPS.map((item) => (
            <div key={item.step} className={`glass-surface ${styles.stepCard}`}>
              <div className={styles.stepBadge}>
                <span>Step {item.step}</span>
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
