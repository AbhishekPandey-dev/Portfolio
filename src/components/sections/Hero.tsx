'use client'

/**
 * src/components/sections/Hero.tsx
 * -----------------------------------------------------------------------
 * Full-viewport hero — chkstepan.com reference quality.
 *
 * LAYOUT (100svh, flex-col, justify-between):
 *   TOP ROW:   Name label left | Availability badge right
 *   CENTER:    Mega heading (absolute centered) — HeadingReveal
 *   BOTTOM ROW: Stats left | Scroll indicator right
 *
 * ANIMATION SEQUENCE (fires after 'preloaderComplete' event or immediate):
 *   0.0s: top row items fade up
 *   0.2s: HeadingReveal char stagger (delay prop)
 *   0.9s: bottom row stats fade up
 *   Loop: scroll indicator oscillates
 *
 * THREE.JS: HeroScene dynamic import ssr:false as absolute bg layer
 *
 * ANTIGRAVITY-AWESOME AUDIT:
 *   - HeroScene: dynamic + ssr:false — no SSR canvas
 *   - Canvas DPR capped at 2, antialias:false
 *   - Main heading: will-change:auto (GSAP handles will-change internally)
 *   - SVH: 100svh for correct mobile viewport
 */

import React, { useRef, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import HeadingReveal from '@/components/ui/HeadingReveal'
import CountUp from '@/components/ui/CountUp'

// HeroScene — dynamic, ssr:false, no SSR canvas crash
const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => null,
})

// ─── Stat data ─────────────────────────────────────────────────────────────
const STATS = [
  { value: 25, suffix: '+', label: 'Projects' },
  { value: 2,  suffix: '',  label: 'Years @ PixelForge.in' },
  { value: 98, suffix: '',  label: 'Lighthouse Score' },
]

// ─── Component ───────────────────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const topRowRef = useRef<HTMLDivElement>(null)
  const bottomRowRef = useRef<HTMLDivElement>(null)
  const scrollLineRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  // Gate animations on preloader complete (or immediate on repeat visit)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const seen = sessionStorage.getItem('preloaderSeen') === 'true'
    if (seen) {
      const t = setTimeout(() => setReady(true), 120)
      return () => clearTimeout(t)
    }
    const handler = () => setReady(true)
    window.addEventListener('preloaderComplete', handler)
    return () => window.removeEventListener('preloaderComplete', handler)
  }, [])

  useGSAP(
    () => {
      if (!ready) return
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reduced) {
        gsap.set([topRowRef.current, bottomRowRef.current], { opacity: 1, y: 0 })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Top row
      tl.from(topRowRef.current!.children, {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
      })

      // Bottom stats + scroll indicator
      tl.from(
        bottomRowRef.current!.children,
        {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
        },
        0.6
      )

      // Scroll indicator oscillation
      if (scrollLineRef.current) {
        gsap.to(scrollLineRef.current, {
          scaleY: 0.25,
          transformOrigin: 'top center',
          duration: 1.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 1.8,
        })
      }
    },
    { scope: sectionRef, dependencies: [ready] }
  )

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero — Abhishek Pandey"
      style={{
        position: 'relative',
        height: '100svh',
        minHeight: '600px',
        backgroundColor: 'var(--color-bg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '0 24px',
      }}
    >
      {/* ── Three.js particle background ─────────────────────────── */}
      <HeroScene />

      {/* ── TOP ROW ───────────────────────────────────────────────── */}
      <div
        ref={topRowRef}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '96px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Name label */}
        <span
          style={{
            fontFamily: 'var(--font-body, Inter), sans-serif',
            fontSize: '11px',
            fontWeight: 400,
            color: 'var(--color-muted)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Abhishek Pandey
        </span>

        {/* Availability badge */}
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-body, Inter), sans-serif',
            fontSize: '12px',
            fontWeight: 400,
            color: 'var(--color-muted)',
            letterSpacing: '0.04em',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#4CAF50',
              boxShadow: '0 0 6px #4CAF50',
              flexShrink: 0,
            }}
          />
          Available for Work
        </span>
      </div>

      {/* ── CENTER: mega heading (absolute) ───────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          pointerEvents: 'none',
          padding: '0 24px',
          textAlign: 'center',
        }}
      >
        {ready && (
          <>
            {/* LINE 1 */}
            <HeadingReveal
              tag="h1"
              delay={0.2}
              scroll={false}
              style={{
                fontFamily: 'var(--font-display, Syne), sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(44px, 8.5vw, 116px)',
                color: 'var(--color-text)',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                margin: 0,
                display: 'block',
              }}
            >
              I Build Experiences
            </HeadingReveal>

            {/* LINE 2 */}
            <HeadingReveal
              tag="h1"
              delay={0.35}
              scroll={false}
              style={{
                fontFamily: 'var(--font-display, Syne), sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(44px, 8.5vw, 116px)',
                color: 'var(--color-text)',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                margin: 0,
                display: 'block',
              }}
            >
              That Convert
            </HeadingReveal>
          </>
        )}
      </div>

      {/* ── BOTTOM ROW ───────────────────────────────────────────── */}
      <div
        ref={bottomRowRef}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingBottom: '32px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Stats */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0',
          }}
        >
          {STATS.map(({ value, suffix, label }, i) => (
            <React.Fragment key={label}>
              {/* Separator */}
              {i > 0 && (
                <div
                  style={{
                    width: '1px',
                    height: '32px',
                    backgroundColor: 'var(--color-border)',
                    margin: '0 20px',
                    flexShrink: 0,
                  }}
                />
              )}
              <div>
                {/* Number */}
                <div
                  style={{
                    fontFamily: 'var(--font-display, Syne), sans-serif',
                    fontWeight: 800,
                    fontSize: 'clamp(22px, 2.5vw, 32px)',
                    color: 'var(--color-text)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}
                >
                  <CountUp to={value} suffix={suffix} duration={2} />
                </div>
                {/* Label */}
                <div
                  style={{
                    fontFamily: 'var(--font-body, Inter), sans-serif',
                    fontWeight: 400,
                    fontSize: '11px',
                    color: 'var(--color-muted)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginTop: '4px',
                  }}
                >
                  {label}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body, Inter), sans-serif',
              fontSize: '10px',
              fontWeight: 400,
              color: 'var(--color-muted)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
            }}
          >
            Scroll ↓
          </span>
          <div
            ref={scrollLineRef}
            style={{
              width: '1px',
              height: '48px',
              backgroundColor: 'var(--color-border)',
              willChange: 'transform',
            }}
          />
        </div>
      </div>

      {/* ── Thin rule at bottom ──────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: 'var(--color-border)',
        }}
      />
    </section>
  )
}
