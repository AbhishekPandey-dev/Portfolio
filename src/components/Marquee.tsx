'use client'

/**
 * src/components/Marquee.tsx
 * ─────────────────────────────────────────────────────────────────
 * Infinite horizontal marquee with Lenis scroll velocity sync.
 *
 * TECHNIQUE:
 *   - Two identical content clones side by side in a flex row
 *   - GSAP ticker moves x by (speed / 60) each frame
 *   - When x reaches -clone1Width, reset to 0 → seamless loop
 *   - Speed increases proportionally with Math.abs(lenis.velocity)
 *
 * PERFORMANCE:
 *   - gsap.set() inside ticker = RAF-synchronized, no layout thrash
 *   - willChange: transform on the track
 *   - Passive scroll listeners only
 *
 * BASE_SPEED: 60px/s (ui-ux-pro-max: 40px/s is too sluggish)
 * VELOCITY_FACTOR: 0.35 — scroll adds up to ~2x speed at aggressive scroll
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import type Lenis from 'lenis'

// ─── Constants ───────────────────────────────────────────────────────────────
const BASE_SPEED = 60    // px per second at rest
const VELOCITY_FACTOR = 0.35 // multiplier for Lenis velocity contribution

const MARQUEE_TEXT =
  'ABHISHEK PANDEY\u00A0\u00A0✦\u00A0\u00A0FULL STACK\u00A0\u00A0✦\u00A0\u00A0UI/UX\u00A0\u00A0✦\u00A0\u00A0SHOPIFY\u00A0\u00A0✦\u00A0\u00A0WORDPRESS\u00A0\u00A0✦\u00A0\u00A0PIXELFORGE.IN\u00A0\u00A0✦\u00A0\u00A0'

// ─── Types ───────────────────────────────────────────────────────────────────
export interface MarqueeProps {
  /** Direction of travel — default left */
  direction?: 'left' | 'right'
  /** Override base speed in px/s */
  speed?: number
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function Marquee({
  direction = 'left',
  speed = BASE_SPEED,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const xPos = useRef(0)

  useGSAP(
    () => {
      if (typeof window === 'undefined') return
      const track = trackRef.current
      if (!track) return

      const dir = direction === 'left' ? -1 : 1

      const tick = () => {
        // Read Lenis velocity for speed boost
        const lenis = (window as Window & { __lenis?: Lenis }).__lenis
        const rawVelocity = lenis?.velocity ?? 0
        const velocityBoost = Math.abs(rawVelocity) * VELOCITY_FACTOR

        // Clamp: never faster than 3× base speed
        const effectiveSpeed = Math.min(speed + velocityBoost, speed * 3)

        // Move per frame (60fps normalized)
        xPos.current += dir * (effectiveSpeed / 60)

        // Measure clone width — the track has two identical children
        const clone = track.children[0] as HTMLElement | undefined
        const cloneWidth = clone?.offsetWidth ?? 0

        // Seamless wrap
        if (direction === 'left' && xPos.current <= -cloneWidth) {
          xPos.current += cloneWidth
        } else if (direction === 'right' && xPos.current >= 0) {
          xPos.current -= cloneWidth
        }

        gsap.set(track, { x: xPos.current })
      }

      gsap.ticker.add(tick)

      // Cleanup — useGSAP ctx.revert() handles GSAP animations;
      // we manually remove the ticker listener.
      return () => {
        gsap.ticker.remove(tick)
      }
    },
    { scope: containerRef, dependencies: [direction, speed] }
  )

  // ─── Content block (rendered twice for seamless loop) ────────────────────
  const ContentBlock = () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        fontFamily: 'var(--font-display, Syne), sans-serif',
        fontWeight: 700,
        fontSize: '14px',
        letterSpacing: '0.2em',
        color: 'var(--color-muted)',
        paddingRight: '0', // gap is built into the text with nbsp chars
        flexShrink: 0,
      }}
    >
      {MARQUEE_TEXT}
    </div>
  )

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        overflow: 'hidden',
        width: '100%',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        padding: '14px 0',
        backgroundColor: 'transparent',
      }}
    >
      {/* Track — flex row of two identical clones */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: 'max-content',
          // GPU compositing — critical for 60fps
          willChange: 'transform',
          transform: 'translateX(0px)',
        }}
      >
        <ContentBlock />
        <ContentBlock />
      </div>
    </div>
  )
}
