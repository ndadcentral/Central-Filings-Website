import React from 'react'
import Image from 'next/image'
import styles from './FloatingElements.module.css'

export default function BrandWordmark() {
  return (
    <div className={styles.brandContainer}>
      <a href="#" className={styles.brandLink} aria-label="Central Fillings — Home">
        <span className={styles.brandIcon} aria-hidden="true">
          <Image
            src="/logo-emblem.png"
            alt="Central Fillings emblem"
            width={24}
            height={24}
            className={styles.brandLogoImg}
            priority
          />
        </span>
        <span className={styles.brandText}>Central Fillings</span>
      </a>
    </div>
  )
}

