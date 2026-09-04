import type { Metadata, Viewport } from 'next'
import { Fraunces, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'
import { ModalProvider } from '@/components/ModalContext'
import GradientBackground from '@/components/GradientBackground'
import BrandWordmark from '@/components/BrandWordmark'
import FloatingBookButton from '@/components/FloatingBookButton'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#06110F',
}

export const metadata: Metadata = {
  title: 'Central Filling — Business Registration, Tax & ROC Compliance Filings',
  description:
    'Business registration, tax, and compliance filings for individuals, startups, and MSMEs across India. Explained in plain language, filed correctly the first time.',
  keywords: [
    'business registration',
    'GST filing',
    'ROC compliance',
    'income tax filing',
    'LLP incorporation',
    'company registration',
    'MSME Udyam registration',
    'trademark filing',
    'Startup India DPIIT',
    'Central Filling',
  ],
  authors: [{ name: 'Central Filling' }],
  metadataBase: new URL('https://centralfilling.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Central Filling — Every filing, done right and on time.',
    description:
      'Central Filling handles business registration, tax, and compliance filings for individuals, startups, and MSMEs — explained in plain language, filed correctly the first time.',
    url: 'https://centralfilling.in',
    siteName: 'Central Filling',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Central Filling — Business Registration, Tax & ROC Compliance Filings',
    description:
      'Every filing, done right and on time. For individuals, startups, and MSMEs across India.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${ibmPlexSans.variable}`}>
      <body>
        <ModalProvider>
          {/* 3D Moving ShaderGradient Background (Client Component) */}
          <GradientBackground />

          {/* Floating Brand Wordmark — Fixed top-left (Server Component) */}
          <BrandWordmark />

          {/* Floating "Start Funding Journey" Pill Button — Fixed top-right (Client Component) */}
          <FloatingBookButton />

          {children}
        </ModalProvider>
      </body>
    </html>
  )
}
