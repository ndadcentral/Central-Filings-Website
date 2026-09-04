import React from 'react'
import styles from './WhyPatientsChooseUs.module.css'

const CASE_STUDIES = [
  {
    amount: '₹21 Cr',
    instrument: 'Common Equity',
    company: 'Novatech Labs Private Limited',
    sector: 'DeepTech · Pre-Series A',
    location: 'Hyderabad, India',
    summary: 'Institutional round structured through comprehensive IP valuation and multi-tier investor syndication.',
  },
  {
    amount: '₹4.5 Cr',
    instrument: 'CCPS',
    company: 'VoltGrid Private Limited',
    sector: 'CleanTech / Energy · Seed',
    location: 'Hyderabad, India',
    summary: 'Early-stage equity round raised alongside government seed fund grant advisory.',
  },
  {
    amount: '₹27 Cr',
    instrument: 'Common Equity',
    company: 'Regal Hotel Private Limited',
    sector: 'Hospitality · Series B',
    location: 'Maharashtra, India',
    summary: 'Growth expansion funding executed with institutional family office consortium.',
  },
  {
    amount: '₹250 Cr',
    instrument: 'Structured Debt',
    company: 'Vista Crest Realtors Pvt Ltd',
    sector: 'Real Estate & Infrastructure',
    location: 'Maharashtra, India',
    summary: 'Large-scale debt structuring with premier scheduled commercial banks and NBFCs.',
  },
  {
    amount: 'AED 12M',
    instrument: 'OCPS',
    company: 'Lumen Bridge Stay LLC',
    sector: 'Hospitality · Series A',
    location: 'Sharjah, UAE',
    summary: 'Cross-border capital structuring and investor collateral for MENA expansion.',
  },
  {
    amount: '₹2 Cr',
    instrument: 'Collateral-Free Debt',
    company: 'Mr Burton LLP',
    sector: 'Consumer / D2C · Pre-Series A',
    location: 'Maharashtra, India',
    summary: 'CGTMSE scheme mapping and sanctioned credit facility without third-party collateral.',
  },
]

export default function WhyPatientsChooseUs() {
  return (
    <section className="section" aria-labelledby="results-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Proven Outcomes</span>
          <h2 id="results-heading" className="section-title">
            Real outcomes, from scattered to sanctioned.
          </h2>
          <p className="section-subtitle">
            How we have helped founders and enterprises turn a maze of grants, schemes, and investor conversations into closed, sanctioned capital rounds.
          </p>
        </div>

        <div className={styles.grid}>
          {CASE_STUDIES.map((item) => (
            <div key={item.company} className={`glass-surface ${styles.trustCard}`}>
              <div className={styles.cardTopRow}>
                <span className={styles.instrumentBadge}>{item.instrument}</span>
                <span className={styles.locationText}>{item.location}</span>
              </div>
              <div className={styles.amountDisplay}>{item.amount}</div>
              <div className={styles.amountLabel}>Capital Sanctioned / Raised</div>
              <h3 className={styles.cardTitle}>{item.company}</h3>
              <div className={styles.sectorTag}>{item.sector}</div>
              <p className={styles.cardDetail}>{item.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
