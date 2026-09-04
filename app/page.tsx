import React from 'react'
import Hero from '@/components/Hero'
import Approach from '@/components/Approach'
import Services from '@/components/Services'
import Process from '@/components/Process'
import WhyPatientsChooseUs from '@/components/WhyPatientsChooseUs'
import FaqAccordion from '@/components/FaqAccordion'
import FinalCta from '@/components/FinalCta'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <main id="main-content">
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Approach / Value */}
        <Approach />

        {/* Section 3: Services (Row-list) */}
        <Services />

        {/* Section 4: Process (4-step sequence) */}
        <Process />

        {/* Section 5: Why Patients Choose Us */}
        <WhyPatientsChooseUs />

        {/* Section 6: FAQ Accordion */}
        <FaqAccordion />

        {/* Section 7: Final CTA */}
        <FinalCta />
      </main>

      {/* Section 8: Footer */}
      <Footer />
    </>
  )
}
