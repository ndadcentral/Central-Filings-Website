import React from 'react'
import styles from './Footer.module.css'

export default function Footer() {
  const currentYear = 2026

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Brand Col */}
          <div className={styles.brandCol}>
            <div className={styles.brandWordmark}>
              <span className={styles.brandIcon} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C7.5 2 4 4.5 4 8c0 3 2.5 5.5 3 9 .5 3 2 5 5 5s4.5-2 5-5c.5-3.5 3-6 3-9 0-3.5-3.5-6-8-6z" />
                  <path d="M9 10c1 .8 2 1 3 1s2-.2 3-1" />
                </svg>
              </span>
              <span className={styles.brandName}>Central Filling</span>
            </div>
            <p className={styles.brandDesc}>
              Conservative restorative dentistry providing shade-matched, long-lasting dental fillings and oral health care in a single visit.
            </p>
            <div className={styles.demoBadge}>
              <span className="placeholder-tag">[Client Demo Build — No Live Backend]</span>
            </div>
          </div>

          {/* Contact Placeholders per Section 6 */}
          <div className={styles.contactCol}>
            <h3 className={styles.colTitle}>Clinic Contact</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <span className={styles.contactLabel}>Phone:</span>
                <span className="placeholder-tag">[Phone number — confirm with clinic]</span>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactLabel}>Email:</span>
                <span className="placeholder-tag">[Email address — confirm with clinic]</span>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactLabel}>Address:</span>
                <span className="placeholder-tag">[Clinic address — confirm with clinic]</span>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactLabel}>Hours:</span>
                <span className="placeholder-tag">[Opening hours — confirm with clinic]</span>
              </li>
            </ul>
          </div>

          {/* Legal Links Placeholders */}
          <div className={styles.legalCol}>
            <h3 className={styles.colTitle}>Information &amp; Policies</h3>
            <ul className={styles.legalList}>
              <li>
                <span className="placeholder-tag">[Privacy Policy placeholder]</span>
              </li>
              <li>
                <span className="placeholder-tag">[Terms of Service placeholder]</span>
              </li>
              <li>
                <span className="placeholder-tag">[Patient Health Disclosures placeholder]</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {currentYear} Central Filling. All rights reserved. Restorative dental services for adults &amp; families.
          </p>
          <p className={styles.note}>
            This site is a verified frontend implementation. Placeholders marked in brackets require client clinic data before public deployment.
          </p>
        </div>
      </div>
    </footer>
  )
}
