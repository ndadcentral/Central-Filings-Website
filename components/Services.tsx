import React from 'react'
import OpenBookingButton from './OpenBookingButton'
import styles from './Services.module.css'

interface ServiceItem {
  name: string
  detail: string
  duration: string
  idealFor: string
}

const SERVICES: ServiceItem[] = [
  {
    name: 'Tooth-Coloured Fillings',
    detail: 'Biocompatible, nano-hybrid composite resin sculpted directly into decayed or chipped teeth to restore structural integrity with an imperceptible finish.',
    duration: '35–50 mins',
    idealFor: 'Fresh cavities, minor chips, wear facets',
  },
  {
    name: 'Old Filling Replacement',
    detail: 'Careful removal of leaking, cracked, or discoloured amalgam (silver) and failing composite fillings, followed by deep disinfection and modern resin sealing.',
    duration: '45–60 mins',
    idealFor: 'Recurrent decay, cracked silver fillings, metallic staining',
  },
  {
    name: 'Root Canal Therapy',
    detail: 'Conservative endodontic care to clear infected pulp, eradicate persistent tooth pain, and preserve your natural tooth root under a custom coronal seal.',
    duration: '60–90 mins',
    idealFor: 'Deep infection, severe throbbing, abscessed teeth',
  },
  {
    name: 'Preventive Checkups & Cleaning',
    detail: 'Comprehensive digital dental diagnostics, gentle ultrasonic tartar scaling, enamel remineralization, and early cavity spot-checks.',
    duration: '40–50 mins',
    idealFor: 'Routine 6-month maintenance, plaque prevention',
  },
  {
    name: 'Emergency Visits',
    detail: 'Immediate same-day clinical evaluation for acute toothaches, lost fillings, broken restorations, or sudden dental trauma.',
    duration: 'Same-day priority',
    idealFor: 'Sudden sharp pain, dislodged restoration, dental trauma',
  },
]

export default function Services() {
  return (
    <section id="services" className="section" aria-labelledby="services-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Clinical Scope</span>
          <h2 id="services-heading" className="section-title">
            Restorative treatments designed for longevity.
          </h2>
          <p className="section-subtitle">
            Focused, conservative dental care prioritizing the preservation of your natural tooth structure.
          </p>
        </div>

        {/* Row-list layout per Section 6 instructions */}
        <div className={styles.rowList}>
          {SERVICES.map((svc, index) => (
            <div key={svc.name} className={`glass-surface ${styles.serviceRow}`}>
              <div className={styles.rowHeader}>
                <span className={styles.rowNumber}>0{index + 1}</span>
                <div>
                  <h3 className={styles.serviceName}>{svc.name}</h3>
                  <div className={styles.metaBadgeGroup}>
                    <span className={styles.metaBadge}>Est. {svc.duration}</span>
                    <span className={styles.metaBadge}>Ideal for: {svc.idealFor}</span>
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

        {/* Explicit confirmation notice per Section 6 */}
        <div className={styles.disclaimerBox}>
          <span className="placeholder-tag">[Placeholder Verification Required]</span>
          <p className={styles.disclaimerText}>
            Service list based on the brand name — please confirm the exact procedures Central Filling offers.
          </p>
        </div>
      </div>
    </section>
  )
}
