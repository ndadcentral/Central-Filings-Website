import React from 'react'
import styles from './Services.module.css'

interface ServiceItem {
  name: string
  detail: string
}

const SERVICES: ServiceItem[] = [
  {
    name: 'GST Registration & Filing',
    detail:
      'Monthly, quarterly, and annual GST return preparation (GSTR-1, GSTR-3B, GSTR-9), input tax credit reconciliation, and new registrations for businesses.',
  },
  {
    name: 'Company / LLP Incorporation',
    detail:
      'Name reservation, MOA/AOA drafting, SPICe+ form submission, DIN, PAN, TAN, and Certificate of Incorporation for Private Limited and LLP entities.',
  },
  {
    name: 'ROC Annual Compliance',
    detail:
      'Annual statutory filing with MCA: Form AOC-4 (financial statements), Form MGT-7/7A (annual return), Director KYC (DIR-3 KYC), and statutory register maintenance.',
  },
  {
    name: 'Income Tax Filing — Individuals & Businesses',
    detail:
      'Tax computation, regime comparison (old vs. new), advance tax planning, and timely return filing for salaried individuals, professionals, and corporate entities.',
  },
  {
    name: 'MSME / Udyam Registration',
    detail:
      'Official Ministry of MSME registration certificate enabling priority sector bank credit, lower loan interest rates, and government tender fee exemptions.',
  },
  {
    name: 'Trademark & IP Filing Support',
    detail:
      'Comprehensive trademark availability search, appropriate class classification, TM application filing with the IP India registry, and objection response support.',
  },
  {
    name: 'Startup India / DPIIT Recognition Support',
    detail:
      'DPIIT recognition dossier preparation unlocking 3-year tax exemption eligibility, angel tax relief, fast-track patent processing, and government scheme access.',
  },
]

export default function Services() {
  return (
    <section id="services" className="section" aria-labelledby="services-heading">
      <div className="container">
        <div className="section-header">
          <h2 id="services-heading" className="section-title">
            Everything you need to keep your business fully compliant.
          </h2>
          <p className="section-subtitle">
            End-to-end filing services for individuals, entrepreneurs, and established enterprises across India.
          </p>
        </div>

        {/* Row-list layout inside single glass container per approved design */}
        <div className={`glass-surface ${styles.serviceContainer}`}>
          {SERVICES.map((svc, index) => (
            <div key={svc.name} className={styles.serviceRow}>
              <div className={styles.rowNumberCol}>
                <span className={styles.rowNumber}>0{index + 1}</span>
              </div>
              <div className={styles.rowContent}>
                <h3 className={styles.serviceName}>{svc.name}</h3>
                <p className={styles.serviceDetail}>{svc.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

