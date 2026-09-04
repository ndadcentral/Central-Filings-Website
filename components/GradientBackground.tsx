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

    // Interactive pointer movement tracking for luminous aura spotlight
    const handlePointerMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      document.documentElement.style.setProperty('--mouse-x', `${x.toFixed(1)}%`)
      document.documentElement.style.setProperty('--mouse-y', `${y.toFixed(1)}%`)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange)
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

  return (
    <div className={styles.canvasContainer} aria-hidden="true">
      {/* Deep dark obsidian base with subtle moody emerald ambient lighting */}
      <div className={styles.cssFallbackGradient} />

      {/* Floating Animated Aurora Nebula Orbs */}
      <div className={styles.ambientOrb1} />
      <div className={styles.ambientOrb2} />
      <div className={styles.ambientOrb3} />

      {/* Interactive Cursor Spotlight Follower */}
      <div className={styles.mouseSpotlight} />

      {/* Cyber Fintech Geometric Tech Grid Overlay */}
      <div className={styles.gridOverlay} />

      {/* 3D Liquid Fluid Shader Wave (Client Component) */}
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
              opacity: 0.56, // Eye-catching, rich liquid silk glow
              mixBlendMode: 'screen',
            }}
            pixelDensity={typeof window !== 'undefined' && window.devicePixelRatio > 1.5 ? 1.5 : 1}
            fov={45}
          >
            <ShaderGradient
              type="waterPlane"
              shader="defaults"
              animate={reducedMotion ? 'off' : 'on'}
              grain="on"
              uSpeed={reducedMotion ? 0 : 0.24}
              uStrength={3.4}
              uDensity={1.35}
              uFrequency={5.2}
              color1="#021713" // Deep obsidian jade base
              color2="#0a4c3e" // Rich radiant seafoam emerald
              color3="#15947e" // Luminous glowing seafoam teal highlight
              cDistance={3.8}
              cPolarAngle={80}
              cAzimuthAngle={170}
              lightType="3d"
              brightness={1.12} // Vibrant lighting with rich contrast
              reflection={0.14}
              envPreset="city"
              positionX={-0.1}
              positionY={0.05}
              rotationX={12}
              rotationY={10}
              rotationZ={18}
            />
          </ShaderGradientCanvas>
        </WebGLErrorBoundary>
      )}

      {/* Dark Readability Vignette Shield protecting centered text */}
      <div className={styles.readabilityShield} />

      {/* Subtle organic film grain texture overlay */}
      <div className={styles.noiseOverlay} />
    </div>
  )
}
