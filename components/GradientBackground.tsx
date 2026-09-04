'use client'

import React, { useEffect, useState, Component, ErrorInfo, ReactNode } from 'react'
import dynamic from 'next/dynamic'
import styles from './GradientBackground.module.css'

// Dynamic import with SSR disabled
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
    console.warn('WebGL context failed to initialize; falling back to dark CSS gradient.', error, errorInfo)
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
      {/* Deep dark obsidian base with subtle moody emerald ambient lighting */}
      <div className={styles.cssFallbackGradient} />

      {/* Toned-down, deep atmospheric ambient orbs */}
      <div className={styles.ambientOrbTop} />
      <div className={styles.ambientOrbBottom} />

      {/* Subtle organic film grain texture overlay */}
      <div className={styles.noiseOverlay} />

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
              opacity: 0.38, // Subtle, dark, moody background flow
            }}
            pixelDensity={typeof window !== 'undefined' && window.devicePixelRatio > 1.5 ? 1.5 : 1}
            fov={45}
          >
            <ShaderGradient
              type="plane"
              shader="defaults"
              animate={reducedMotion ? 'off' : 'on'}
              grain="on"
              uSpeed={reducedMotion ? 0 : 0.18}
              uStrength={2.8}
              uDensity={1.25}
              uFrequency={4.8}
              color1="#040c0a" // Deep obsidian
              color2="#0c2e28" // Dark rich emerald
              color3="#154d43" // Deep forest teal (never blinding neon)
              cDistance={4.2}
              cPolarAngle={85}
              cAzimuthAngle={175}
              lightType="3d"
              brightness={0.82} // Darkened lighting to preserve text contrast
              reflection={0.06}
              envPreset="city"
              positionX={-0.2}
              positionY={0}
              rotationX={10}
              rotationY={10}
              rotationZ={25}
            />
          </ShaderGradientCanvas>
        </WebGLErrorBoundary>
      )}
    </div>
  )
}
