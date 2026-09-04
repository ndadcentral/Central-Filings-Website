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
    name: 'GST Registration & Filing',
    detail:
      'Monthly, quarterly, and annual GST return preparation (GSTR-1, GSTR-3B, GSTR-9), input tax credit reconciliation, and new registrations for businesses.',
    deliverable: 'Accurate ITC & timely return filing',
    schemesOrStage: 'GSTR-1 · GSTR-3B · GSTR-9 · ITC Match',
  },
  {
    name: 'Company / LLP Incorporation',
    detail:
      'Name reservation, MOA/AOA drafting, SPICe+ form submission, DIN, PAN, TAN, and Certificate of Incorporation for Private Limited and LLP entities.',
    deliverable: 'Incorporation certificate & kit',
    schemesOrStage: 'Pvt Ltd · LLP · OPC · SPICe+',
  },
  {
    name: 'ROC Annual Compliance',
    detail:
      'Annual statutory filing with MCA: Form AOC-4 (financial statements), Form MGT-7/7A (annual return), Director KYC (DIR-3 KYC), and statutory register maintenance.',
    deliverable: 'Zero penalty MCA compliance',
    schemesOrStage: 'AOC-4 · MGT-7 · DIR-3 KYC · MCA',
  },
  {
    name: 'Income Tax Filing — Individuals & Businesses',
    detail:
      'Tax computation, regime comparison (old vs. new), advance tax planning, and timely return filing for salaried individuals, professionals, and corporate entities.',
    deliverable: 'Maximized deductions & compliant ITR',
    schemesOrStage: 'ITR-1 to ITR-7 · Tax Planning',
  },
  {
    name: 'MSME / Udyam Registration',
    detail:
      'Official Ministry of MSME registration certificate enabling priority sector bank credit, lower loan interest rates, and government tender fee exemptions.',
    deliverable: 'Official Udyam certificate',
    schemesOrStage: 'Udyam · MSME Benefits · Priority Credit',
  },
  {
    name: 'Trademark & IP Filing Support',
    detail:
      'Comprehensive trademark availability search, appropriate class classification, TM application filing with the IP India registry, and objection response support.',
    deliverable: 'Brand protection & TM application',
    schemesOrStage: 'IP India · TM-A · Objection Defense',
  },
  {
    name: 'Startup India / DPIIT Recognition Support',
    detail:
      'DPIIT recognition dossier preparation unlocking 3-year tax exemption eligibility, angel tax relief, fast-track patent processing, and government scheme access.',
    deliverable: 'DPIIT recognition certificate',
    schemesOrStage: 'Startup India · 80-IAC · Fast-Track IP',
  },
]

export default function Services() {
  return (
    <section id="services" className="section" aria-labelledby="services-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Filing &amp; Compliance</span>
          <h2 id="services-heading" className="section-title">
            Everything you need to keep your business fully compliant.
          </h2>
          <p className="section-subtitle">
            End-to-end filing services for individuals, entrepreneurs, and established enterprises across India.
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

        {/* Footnote disclaimer */}
        <div className={styles.disclaimerBox}>
          <p className={styles.disclaimerText}>
            <span className="placeholder-tag">[Service list based on the business category provided — please confirm the exact services Central Filings offers so this list can be corrected.]</span>
          </p>
        </div>
      </div>
    </section>
  )
}
