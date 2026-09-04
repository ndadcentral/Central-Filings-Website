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
  title: 'ConsultUp India — Startup Funding & Capital Advisory',
  description:
    'Turn scattered grants, schemes, and investors into one disciplined funding roadmap. ConsultUp India helps founders & MSMEs get investor-ready with non-dilutive capital, institutional debt, and curated investor introductions.',
  keywords: [
    'startup funding',
    'government grants',
    'DPIIT recognition',
    'Startup India',
    'investor connections',
    'MSME loans',
    'CGTMSE',
    'venture capital',
    'capital advisory India',
    'ConsultUp India',
  ],
  authors: [{ name: 'ConsultUp India' }],
  metadataBase: new URL('https://consultupindia.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ConsultUp India — Structured Capital Advisory',
    description:
      'We turn the scattered maze of grants, schemes, investors, and compliance into one disciplined funding roadmap — built on real documentation, financial modeling, and investor-grade positioning.',
    url: 'https://consultupindia.com',
    siteName: 'ConsultUp India',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ConsultUp India — Structured Capital Advisory',
    description:
      'Turn scattered grants, schemes, and investors into one disciplined funding roadmap.',
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
