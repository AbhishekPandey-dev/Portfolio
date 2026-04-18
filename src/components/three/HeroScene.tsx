'use client'

/**
 * src/components/three/HeroScene.tsx
 * -----------------------------------------------------------------------
 * Three.js particle cloud for hero background.
 * antigravity-kit pattern: dynamic import ssr:false from Hero.tsx.
 *
 * SCENE SPEC (antigravity-kit):
 *   - 800 particles in BufferGeometry, random in sphere radius 4
 *   - PointsMaterial: size 1.2, color var(--color-text), opacity 0.22
 *   - FogExp2 ('var(--color-bg)', 0.15) for depth
 *   - Rotation: y+=0.0003, x+=0.0001 per frame
 *   - Mouse parallax: shift cloud ±40px, lerp 0.04
 *   - Lenis scroll: scale y 1→0.85 as scroll progresses
 *   - Dispose geometry + material on unmount
 *
 * PERFORMANCE (antigravity-awesome-skills):
 *   - 800 particles = ~64KB GPU buffer (well within budget)
 *   - Mobile: reduce to 400 particles if window.innerWidth < 768
 *   - Canvas willChange:transform for compositor promotion
 *   - gl.setPixelRatio(Math.min(devicePixelRatio, 2)) to cap DPR
 *   - frameloop:'always' with manual rotation (not "demand" since always animating)
 */

import React, { useRef, useMemo, useCallback, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type Lenis from 'lenis'

// ─── Particle count — fewer on mobile ────────────────────────────────────────
const getParticleCount = () =>
  typeof window !== 'undefined' && window.innerWidth < 768 ? 400 : 800

// ─── Particle mesh component ─────────────────────────────────────────────────
function Particles() {
  const pointsRef = useRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetMouseRef = useRef({ x: 0, y: 0 })
  const scrollYRef = useRef(0)

  const count = useMemo(getParticleCount, [])

  // Build random sphere distribution once
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Uniform sphere distribution
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 4 * Math.cbrt(Math.random()) // cbrt for volume uniformity
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  // Geometry — memoized, disposed on unmount
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [positions])

  // Material — memoized, disposed on unmount
  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.04,
        color: 'var(--color-text)',
        transparent: true,
        opacity: 0.22,
        sizeAttenuation: true,
      }),
    []
  )

  // Cleanup
  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, material])

  // Mouse tracking (normalized -1 to 1)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetMouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      targetMouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Lenis scroll tracking
  useEffect(() => {
    const onScroll = () => {
      const lenis = (window as Window & { __lenis?: Lenis }).__lenis
      if (lenis) {
        scrollYRef.current = lenis.scroll / Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          1
        )
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Animate each frame (RAF loop via useFrame)
  useFrame(() => {
    const pts = pointsRef.current
    if (!pts) return

    // Slow base rotation
    pts.rotation.y += 0.0003
    pts.rotation.x += 0.0001

    // Lerp mouse toward target
    mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.04
    mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.04

    // Apply mouse parallax as position offset
    pts.position.x = mouseRef.current.x * 0.3
    pts.position.y = mouseRef.current.y * 0.3

    // Scroll: scale y from 1 to 0.85
    const targetScaleY = 1 - scrollYRef.current * 0.15
    pts.scale.y += (targetScaleY - pts.scale.y) * 0.05
  })

  return <points ref={pointsRef} geometry={geometry} material={material} />
}

// ─── Scene setup ─────────────────────────────────────────────────────────────
function SceneSetup() {
  const { scene, gl } = useThree()

  useEffect(() => {
    // Fog for depth effect
    scene.fog = new THREE.FogExp2('var(--color-bg)', 0.15)
    // Cap device pixel ratio — antigravity-awesome GPU budget
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    return () => {
      scene.fog = null
    }
  }, [scene, gl])

  return null
}

// ─── Exported component (wrapped in Canvas) ───────────────────────────────────
export default function HeroScene() {
  const [isMobile, setIsMobile] = React.useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)')
    setIsMobile(media.matches)
    
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  if (isMobile) return null

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60, near: 0.1, far: 20 }}
        gl={{
          antialias: false, // OFF — particles don't need it, saves GPU
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
        }}
      >
        <SceneSetup />
        <Particles />
      </Canvas>
    </div>
  )
}
