'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { captureAttribution } from '@/lib/attribution'

export function UtmTrackerContent() {
  const searchParams = useSearchParams()

  useEffect(() => {
    captureAttribution()
  }, [searchParams])

  return null
}

export default function UtmTracker() {
  return <UtmTrackerContent />
}
