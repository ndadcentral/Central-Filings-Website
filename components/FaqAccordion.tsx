'use client'

import React, { useState } from 'react'
import styles from './FaqAccordion.module.css'

interface FaqItem {
  question: string
  answer: string
}

const FAQS: FaqItem[] = [
  {
    question: 'What exactly does ConsultUp India do?',
    answer:
      'ConsultUp India is a structured funding and capital advisory firm. We help startups and MSMEs prepare for government grants, institutional venture funding, and collateral-free loan opportunities through professional financial modeling, investor-grade documentation, and strategic scheme alignment.',
  },
  {
    question: 'Do you guarantee funding?',
    answer:
      'No. Funding approvals and disbursements are decided exclusively by investors, banks, or government review committees. Our role is to optimize your company’s compliance, financial models, pitch deck narrative, and presentation standards to maximize investor readiness and sanction probability.',
  },
  {
    question: 'What type of funding support do you provide?',
    answer:
      'We support the full capital spectrum: non-dilutive government grants (SISFS, PMEGP, state innovation schemes), DPIIT recognition, 80-IAC 3-year tax exemption, structured debt advisory (CGTMSE up to ₹20 Cr, SIDBI, bank term loans), and curated investor outreach for equity rounds.',
  },
  {
    question: 'What is the success fee?',
    answer:
      'Our success fee (1.5% to 2% depending on agreement terms) applies strictly post-disbursement. It is earned only after funds are officially sanctioned and deposited into your company’s bank account.',
  },
  {
    question: 'What is the validity period of each advisory plan?',
    answer:
      'Advisory programs carry a validity of 6 to 12 months. All document drafting, financial models, scheme filings, pitch rehearsals, and investor introductions are delivered continuously within this timeframe.',
  },
  {
    question: 'Do you support collateral-free bank loans?',
    answer:
      'Yes. We specialize in mapping and structuring government-backed credit guarantees such as CGTMSE (Credit Guarantee Fund Trust for Micro and Small Enterprises), enabling collateral-free business loans up to ₹20 Crores through scheduled commercial lenders.',
  },
  {
    question: 'How long does the funding process take?',
    answer:
      'Timelines depend on the chosen route: government grants typically process within 60–90 days, institutional debt takes 30–60 days, and equity rounds span 3–6 months. We compress these timelines by eliminating documentation back-and-forth.',
  },
]

export default function FaqAccordion() {
  const [openIndices, setOpenIndices] = useState<number[]>([0])

  const toggleItem = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (
    <section id="faq" className="section" aria-labelledby="faq-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Common Questions</span>
          <h2 id="faq-heading" className="section-title">
            Everything founders ask before starting.
          </h2>
          <p className="section-subtitle">
            Transparent answers regarding our advisory scope, non-dilutive grant procedures, success fees, and timelines.
          </p>
        </div>

        <div className={styles.faqList}>
          {FAQS.map((faq, index) => {
            const isOpen = openIndices.includes(index)
            const questionId = `faq-btn-${index}`
            const answerId = `faq-ans-${index}`

            return (
              <div key={faq.question} className={`glass-surface ${styles.faqItem}`}>
                <button
                  type="button"
                  id={questionId}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggleItem(index)}
                  className={styles.questionButton}
                >
                  <span className={styles.questionText}>{faq.question}</span>
                  <span
                    className={`${styles.iconIndicator} ${isOpen ? styles.iconOpen : ''}`}
                    aria-hidden="true"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>

                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  className={`${styles.answerWrapper} ${isOpen ? styles.answerOpen : ''}`}
                >
                  <div className={styles.answerInner}>
                    <p className={styles.answerText}>{faq.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
