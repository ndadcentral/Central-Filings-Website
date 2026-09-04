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
      {/* High-fidelity CSS Gradient with rich emerald & deep jade tones */}
      <div className={styles.cssFallbackGradient} />

      {/* Vibrant ambient light orbs for depth */}
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
              opacity: 0.88,
            }}
            pixelDensity={typeof window !== 'undefined' && window.devicePixelRatio > 1.5 ? 1.5 : 1}
            fov={45}
          >
            <ShaderGradient
              type="plane"
              shader="defaults"
              animate={reducedMotion ? 'off' : 'on'}
              grain="on"
              uSpeed={reducedMotion ? 0 : 0.22}
              uStrength={3.2}
              uDensity={1.35}
              uFrequency={5.2}
              color1="#0c3832"
              color2="#1e847a"
              color3="#7ee3d5"
              cDistance={3.8}
              cPolarAngle={85}
              cAzimuthAngle={175}
              lightType="3d"
              brightness={1.22}
              reflection={0.14}
              envPreset="city"
              positionX={-0.3}
              positionY={0.1}
              rotationX={10}
              rotationY={15}
              rotationZ={30}
            />
          </ShaderGradientCanvas>
        </WebGLErrorBoundary>
      )}
    </div>
  )
}
