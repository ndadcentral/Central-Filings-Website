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
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </span>
              <span className={styles.brandName}>ConsultUp India</span>
            </div>
            <p className={styles.brandDesc}>
              Strategic capital advisory firm empowering founders to build investment-ready enterprises through non-dilutive grants, institutional debt, and curated equity rounds.
            </p>
            <div className={styles.demoBadge}>
              <span className={styles.cinTag}>CIN: U70200GJ2024PTC154854 · GSTIN: 24AAMCC0978L1Z8</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className={styles.contactCol}>
            <h3 className={styles.colTitle}>Offices &amp; Contact</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <span className={styles.contactLabel}>Toll-Free Helpline:</span>
                <a href="tel:18002021945" className={styles.contactLink}>1800-202-1945</a>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactLabel}>Email Inquiries:</span>
                <a href="mailto:hello@consultupindia.com" className={styles.contactLink}>hello@consultupindia.com</a>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactLabel}>Head Office (Ahmedabad):</span>
                <span className={styles.addressText}>415, Westface, Thaltej, Ahmedabad, Gujarat - 380059</span>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactLabel}>Hyderabad Office:</span>
                <span className={styles.addressText}>Tower 2, Phoenix H10, HITEC City, Madhapur, Hyderabad - 500081</span>
              </li>
            </ul>
          </div>

          {/* Services Quick Directory */}
          <div className={styles.legalCol}>
            <h3 className={styles.colTitle}>Core Advisory</h3>
            <ul className={styles.legalList}>
              <li>
                <a href="#services" className={styles.footerLink}>Government Grants &amp; SISFS</a>
              </li>
              <li>
                <a href="#services" className={styles.footerLink}>DPIIT &amp; 80-IAC Tax Exemption</a>
              </li>
              <li>
                <a href="#services" className={styles.footerLink}>CGTMSE Collateral-Free Debt</a>
              </li>
              <li>
                <a href="#services" className={styles.footerLink}>Investor-Grade Pitch Decks</a>
              </li>
              <li>
                <a href="#services" className={styles.footerLink}>Financial Modeling &amp; IBBI Valuation</a>
              </li>
              <li>
                <a href="#services" className={styles.footerLink}>500+ Curated Investor Network</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className={styles.disclaimerContainer}>
          <p className={styles.disclaimerText}>
            <strong>Disclaimer:</strong> We are a startup consultancy firm in India, specializing in providing expert advice tailored to the needs of modern businesses. We operate independently, without any affiliations or collaborations with government agencies, non-government organizations, institutions, or departments.
          </p>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {currentYear} ConsultUp India. All rights reserved.
          </p>
          <div className={styles.policyLinks}>
            <span>Privacy Policy</span> · <span>Terms &amp; Conditions</span> · <span>Refund Policy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
