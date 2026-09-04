import React from 'react'
import OpenBookingButton from './OpenBookingButton'
import styles from './Services.module.css'

interface ServiceItem {
  name: string
  detail: string
  deliverable: string
  schemesOrStage: string
}

const SERVICES: ServiceItem[] = [
  {
    name: 'Grants & Government Funding',
    detail: 'Non-dilutive funding via Central and State government schemes: PMEGP, SIDBI, CGTMSE, SISFS & more. We handle end-to-end paperwork, eligibility checks, and filings.',
    deliverable: '100% non-dilutive capital',
    schemesOrStage: 'PMEGP · SIDBI · CGTMSE · SISFS',
  },
  {
    name: 'DPIIT Recognition & 80-IAC Tax Exemption',
    detail: 'Official Startup India certification unlocking a 100% 3-year income tax holiday, angel tax exemptions, fast-track patent processing, and government tender preferences.',
    deliverable: '3-year tax exemption & certificate',
    schemesOrStage: 'Startup India · IMB Filing · Query Handling',
  },
  {
    name: 'Investor-Grade Pitch Decks',
    detail: 'Storytelling-driven, metric-focused decks engineered for angel syndicates and venture capital partners. Built strictly to guidelines that eliminate investor friction.',
    deliverable: 'Full custom narrative & deck',
    schemesOrStage: 'Pre-Seed · Seed · Pre-Series A',
  },
  {
    name: 'Financial Models & Business Valuation',
    detail: 'Comprehensive 3 to 5-year financial models, sensitivity matrices, unit economics, burn-rate forecasts, and formal IBBI-registered valuer certifications.',
    deliverable: '3-5 yr DCF & valuation report',
    schemesOrStage: 'IBBI Registered Valuer · Cap Table Modeling',
  },
  {
    name: 'Incubator & Accelerator Applications',
    detail: 'End-to-end preparation for premier incubators and university accelerators across India, including video pitch scripting, application dossiers, and mock interviews.',
    deliverable: 'Grant-ready application dossiers',
    schemesOrStage: 'Govt Incubators · TBI · Atal Innovation',
  },
  {
    name: 'Fundraising & Curated Investor Outreach',
    detail: 'Targeted matchmaking with active VCs, family offices, and angel networks aligned with your sector. Direct follow-up assistance and term sheet negotiations.',
    deliverable: 'Curated investor intros & closing support',
    schemesOrStage: '500+ Active Investor Network',
  },
]

export default function Services() {
  return (
    <section id="services" className="section" aria-labelledby="services-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Advisory Services</span>
          <h2 id="services-heading" className="section-title">
            Everything you need to go from idea to funding.
          </h2>
          <p className="section-subtitle">
            Structured capital advisory designed for measurable growth. We handle the documentation and compliance so you can focus on building your enterprise.
          </p>
        </div>

        <div className={styles.rowList}>
          {SERVICES.map((svc, index) => (
            <div key={svc.name} className={`glass-surface ${styles.serviceRow}`}>
              <div className={styles.rowHeader}>
                <span className={styles.rowNumber}>0{index + 1}</span>
                <div>
                  <h3 className={styles.serviceName}>{svc.name}</h3>
                  <div className={styles.metaBadgeGroup}>
                    <span className={styles.metaBadge}>{svc.deliverable}</span>
                    <span className={styles.metaBadge}>{svc.schemesOrStage}</span>
                  </div>
                </div>
              </div>

              <p className={styles.serviceDetail}>{svc.detail}</p>

              <div className={styles.rowAction}>
                <OpenBookingButton className="btn-secondary" variant="secondary">
                  <span>Inquire</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </OpenBookingButton>
              </div>
            </div>
          ))}
        </div>

        {/* Advisory footnote */}
        <div className={styles.disclaimerBox}>
          <p className={styles.disclaimerText}>
            Independent startup advisory: We structure compliant grant applications, institutional debt dossiers, and equity round collateral. Success fees apply only on disbursed funds.
          </p>
        </div>
      </div>
    </section>
  )
}
