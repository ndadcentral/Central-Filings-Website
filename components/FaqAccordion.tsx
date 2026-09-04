'use client'

import React, { useState } from 'react'
import styles from './FaqAccordion.module.css'

interface FaqItem {
  question: string
  answer: string
  placeholderTag?: string
}

const FAQS: FaqItem[] = [
  {
    question: 'Do fillings hurt?',
    answer:
      'No. We apply a topical numbing gel first, followed by gentle, localized anaesthesia before beginning any preparation. Most patients feel only slight vibrations or light water spray during the procedure, with zero sharp discomfort.',
  },
  {
    question: 'How long does a filling appointment take?',
    answer:
      'A standard single-tooth composite filling typically takes between 35 and 50 minutes from start to finish. This includes numbing, careful decay removal, layer-by-layer composite bonding, UV light curing, and bite adjustment.',
  },
  {
    question: 'Do you accept dental insurance?',
    answer:
      'We provide detailed, itemized medical receipts and treatment forms suitable for claiming reimbursement with major private healthcare insurers and employer dental plans.',
    placeholderTag: '[Placeholder — confirm insurance networks with clinic]',
  },
  {
    question: 'Can I get a same-day emergency appointment?',
    answer:
      'We reserve priority emergency slots daily for acute toothache, dislodged restorations, and sudden trauma. Please use our instant booking form or call our direct desk for priority same-day scheduling.',
    placeholderTag: '[Placeholder — confirm same-day emergency protocol with clinic]',
  },
  {
    question: 'What if my old filling needs replacing?',
    answer:
      'Old amalgam or cracked composite fillings can leak over time, allowing bacteria beneath the restoration. We gently remove the failing material, inspect and sanitize the cavity, and restore the tooth with modern shade-matched nano-hybrid resin.',
  },
]

export default function FaqAccordion() {
  const [openIndices, setOpenIndices] = useState<number[]>([0]) // First item expanded by default

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
            Frequently Asked Questions
          </h2>
          <p className="section-subtitle">
            Clear answers about treatment time, anaesthesia, restorative materials, and booking.
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
                    {faq.placeholderTag && (
                      <span className="placeholder-tag">{faq.placeholderTag}</span>
                    )}
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
