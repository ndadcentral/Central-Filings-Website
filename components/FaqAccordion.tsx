'use client'

import React, { useState } from 'react'
import styles from './FaqAccordion.module.css'

interface FaqItem {
  question: string
  answer: string
}

const FAQS: FaqItem[] = [
  {
    question: 'What is ROC compliance, and do I need it?',
    answer:
      'ROC (Registrar of Companies) compliance refers to mandatory annual statutory filings required by the Ministry of Corporate Affairs (MCA) for all Private Limited companies, OPCs, and LLPs. This includes filing annual financial statements (Form AOC-4), annual returns (Form MGT-7/7A), and director KYC (DIR-3 KYC). If you run a registered corporate entity in India, ROC compliance is mandatory every financial year, regardless of turnover, to maintain active legal standing and avoid heavy penalty fees.',
  },
  {
    question: 'Do you handle GST registration and ongoing GST filing?',
    answer:
      'Yes. Central Fillings handles both initial GST registration (generating your 15-digit GSTIN) and recurring monthly or quarterly GST returns (GSTR-1, GSTR-3B, and annual GSTR-9). We also perform input tax credit (ITC) reconciliation with GSTR-2B to ensure you claim eligible deductions without mismatch notices.',
  },
  {
    question: 'Do you support individual income tax filing, or only businesses?',
    answer:
      'Yes, we support both. We assist individual taxpayers (salaried professionals, freelancers, consultants, capital gains earners, and NRI returns) as well as proprietorships, partnerships, LLPs, and Private Limited companies with tax computation, regime analysis (old vs. new), and compliant ITR filing.',
  },
  {
    question: 'How long does a typical filing take?',
    answer:
      '[placeholder — confirm turnaround time with the business] Turnaround depends on the filing type: standard individual ITRs and GST returns are typically prepared within 1–2 business days after document verification, while company incorporations and trademark registrations depend on statutory portal processing queues.',
  },
  {
    question: 'Is this a one-time filing service, or do you offer ongoing compliance support?',
    answer:
      '[placeholder — confirm with the business] We offer both one-time filing services (such as single registrations or annual tax returns) and ongoing monthly or annual compliance calendar retainers for growing businesses.',
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
            Frequently asked questions about filings.
          </h2>
          <p className="section-subtitle">
            Plain answers to help you navigate registration, tax, and ongoing statutory compliance requirements.
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
