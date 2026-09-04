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
  title: 'Central Filling — Precision Tooth-Coloured Dental Restorations',
  description:
    'Natural shade-matched dental fillings, amalgam replacement, and gentle cavity care in a single visit. Upfront transparent pricing and modern clinical precision.',
  keywords: [
    'Central Filling',
    'dental filling',
    'tooth-coloured fillings',
    'composite restoration',
    'cavity treatment',
    'amalgam replacement',
    'dental clinic',
  ],
  authors: [{ name: 'Central Filling Dental Clinic' }],
  metadataBase: new URL('https://centralfilling-demo.placeholder.local'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Central Filling — A filling that fits, the first time.',
    description:
      'Precision, tooth-coloured restorations crafted to match your natural enamel and protect your smile in one visit.',
    url: 'https://centralfilling-demo.placeholder.local',
    siteName: 'Central Filling',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-placeholder.png',
        width: 1200,
        height: 630,
        alt: 'Central Filling Clinic Preview [Placeholder asset required for production]',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Central Filling — Precision Dental Restorations',
    description:
      'Tooth-coloured composite fillings and restorative dentistry in a single visit.',
    images: ['/og-placeholder.png'],
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

          {/* Floating "Book appointment" Pill Button — Fixed top-right (Client Component) */}
          <FloatingBookButton />

          {children}
        </ModalProvider>
      </body>
    </html>
  )
}
