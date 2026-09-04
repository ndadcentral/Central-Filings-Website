import React from 'react'
import Image from 'next/image'
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
              <Image
                src="/logo-dark.png"
                alt="Central Filings"
                width={190}
                height={70}
                className={styles.footerLogoImg}
              />
            </div>
            <p className={styles.brandDesc}>
              Business registration, tax, and compliance filings — for individuals, startups, and MSMEs across India. Explained in plain language, filed correctly the first time.
            </p>
          </div>

          {/* Contact Details */}
          <div className={styles.contactCol}>
            <h3 className={styles.colTitle}>Support &amp; Inquiries</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <span className={styles.contactLabel}>Email:</span>
                <a href="mailto:hello@centralfilings.in" className={styles.contactLink}>
                  hello@centralfilings.in
                </a>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactLabel}>Consultation:</span>
                <span className={styles.addressText}>
                  Scheduled 1-on-1 virtual filing assessment
                </span>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactLabel}>Service Area:</span>
                <span className={styles.addressText}>
                  Pan-India GST, ROC &amp; Tax Compliance Advisory
                </span>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactLabel}>Business Hours:</span>
                <span className={styles.addressText}>
                  Monday – Saturday: 9:30 AM – 6:30 PM IST
                </span>
              </li>
            </ul>
          </div>

          {/* Services Quick Directory */}
          <div className={styles.legalCol}>
            <h3 className={styles.colTitle}>Core Services</h3>
            <ul className={styles.legalList}>
              <li>
                <a href="#services" className={styles.footerLink}>GST Registration &amp; Filing</a>
              </li>
              <li>
                <a href="#services" className={styles.footerLink}>Company / LLP Incorporation</a>
              </li>
              <li>
                <a href="#services" className={styles.footerLink}>ROC Annual Compliance</a>
              </li>
              <li>
                <a href="#services" className={styles.footerLink}>Income Tax Filing (ITR)</a>
              </li>
              <li>
                <a href="#services" className={styles.footerLink}>MSME / Udyam Registration</a>
              </li>
              <li>
                <a href="#services" className={styles.footerLink}>Trademark &amp; IP Filing</a>
              </li>
              <li>
                <a href="#services" className={styles.footerLink}>Startup India / DPIIT Recognition</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className={styles.disclaimerContainer}>
          <p className={styles.disclaimerText}>
            <strong>Disclaimer:</strong> Central Filings is an independent corporate, tax, and compliance advisory service provider. We are not a government agency, department, or statutory portal. All filings are submitted through respective official government portals on behalf of our clients.
          </p>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {currentYear} Central Filings. All rights reserved.
          </p>
          <div className={styles.policyLinks}>
            <a href="#services" className={styles.footerLink}>Privacy Policy</a> ·{' '}
            <a href="#services" className={styles.footerLink}>Terms &amp; Conditions</a> ·{' '}
            <a href="#services" className={styles.footerLink}>Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
