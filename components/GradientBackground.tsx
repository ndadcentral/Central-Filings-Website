'use client'

import React, { useEffect, useState, Component, ErrorInfo, ReactNode } from 'react'
import dynamic from 'next/dynamic'
import styles from './GradientBackground.module.css'

// Dynamic import with SSR disabled to prevent server-side evaluation of Three.js / Canvas
const ShaderGradientCanvas = dynamic(
  () => import('@shadergradient/react').then((mod) => mod.ShaderGradientCanvas),
  { ssr: false }
)

const ShaderGradient = dynamic(
  () => import('@shadergradient/react').then((mod) => mod.ShaderGradient),
  { ssr: false }
)

// Error boundary to gracefully catch any Three.js or WebGL initialization failures
class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Gracefully catch WebGL context creation failures without crashing the application
    console.warn('WebGL context failed to initialize; falling back to CSS gradient.', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

export default function GradientBackground() {
  const [mounted, setMounted] = useState(false)
  const [hasWebGL, setHasWebGL] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Detect WebGL capability
    try {
      const canvas = document.createElement('canvas')
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')
      setHasWebGL(Boolean(gl))
    } catch {
      setHasWebGL(false)
    }

    // Detect reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleMotionChange)
    return () => mediaQuery.removeEventListener('change', handleMotionChange)
  }, [])

  return (
    <div className={styles.canvasContainer} aria-hidden="true">
      {/* High-fidelity CSS Gradient always present as instant base and fallback */}
      <div className={styles.cssFallbackGradient} />

      {/* Subtle organic light orbs */}
      <div className={styles.ambientOrbTop} />
      <div className={styles.ambientOrbBottom} />

      {mounted && hasWebGL && (
        <WebGLErrorBoundary fallback={<div className={styles.cssFallbackGradient} />}>
          <ShaderGradientCanvas
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
            pixelDensity={typeof window !== 'undefined' && window.devicePixelRatio > 1.5 ? 1.5 : 1}
            fov={45}
          >
            <ShaderGradient
              type="waterPlane"
              animate={reducedMotion ? 'off' : 'on'}
              uSpeed={reducedMotion ? 0 : 0.18}
              uStrength={2.8}
              uDensity={1.2}
              uFrequency={4.0}
              color1="#06110F"
              color2="#12433D"
              color3="#2FA39D"
              cDistance={4.2}
              cPolarAngle={80}
              cAzimuthAngle={180}
              lightType="3d"
              brightness={1.1}
            />
          </ShaderGradientCanvas>
        </WebGLErrorBoundary>
      )}
    </div>
  )
}
