'use client'

/**
 * src/components/Preloader.tsx
 * ─────────────────────────────────────────────────────────────────
 * Full-screen cinematic preloader for the portfolio.
 *
 * SEQUENCE:
 *   0%  → Counter starts at 0
 *   70% → Name "ABHISHEK PANDEY" fades in below counter
 *   100% → 300ms hold → initials "AP" appear
 *   EXIT → clipPath inset(0 0 0% 0) → inset(0 0 100% 0) — 1s portfolio ease
 *   POST → dispatches 'preloaderComplete' on window
 *
 * SESSION:
 *   Checks sessionStorage 'preloaderSeen' — skips if already played.
 *
 * PATTERN:
 *   All animations via useGSAP() from @gsap/react — never useEffect.
 *   Cleanup via ctx.revert() automatic from useGSAP.
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

// Register useGSAP plugin (safe to call multiple times)
import { useGSAP as _useGSAP } from '@gsap/react'
gsap.registerPlugin(_useGSAP)

// ─── Types ───────────────────────────────────────────────────────────────────
interface PreloaderProps {
  /** Called after preloader exit animation completes */
  onComplete?: () => void
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const nameRef = useRef<HTMLParagraphElement>(null)
  const initialsRef = useRef<HTMLSpanElement>(null)

  const [shouldRender, setShouldRender] = useState(true)

  // ── Skip if already seen in this session ─────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('preloaderSeen') === 'true') {
      setShouldRender(false)
      onComplete?.()
    }
  }, [onComplete])

  // ── Animation sequence via useGSAP ───────────────────────────────────────
  useGSAP(
    () => {
      if (!shouldRender) return
      if (!containerRef.current || !counterRef.current) return

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      if (prefersReducedMotion) {
        // Skip to complete immediately
        const tl = gsap.timeline({
          onComplete: handleExit,
        })
        tl.set(containerRef.current, { opacity: 0 })
        return
      }

      const tl = gsap.timeline()

      // ── Counter animation: 0 → 100 over 2.2s ────────────────────
      const counterObj = { value: 0 }

      tl.to(counterObj, {
        value: 100,
        duration: 2.2,
        ease: 'power2.inOut',
        onUpdate() {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(counterObj.value).toString()
          }

          // ── At 70: fade in name ────────────────────────────────
          if (counterObj.value >= 70 && nameRef.current) {
            gsap.to(nameRef.current, {
              opacity: 1,
              duration: 0.4,
              ease: 'portfolioOut',
              overwrite: 'auto',
            })
          }
        },
        onComplete() {
          // ── At 100: show initials ────────────────────────────────
          if (initialsRef.current) {
            gsap.to(initialsRef.current, {
              opacity: 0.15,
              duration: 0.3,
              ease: 'portfolioOut',
            })
          }
        },
      })

      // ── Hold 300ms at 100 ────────────────────────────────────────
      tl.to({}, { duration: 0.5 })

      // ── Exit: clipPath wipe upward ───────────────────────────────
      tl.to(containerRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1,
        ease: 'portfolio',
        onComplete: handleExit,
      })
    },
    { scope: containerRef, dependencies: [shouldRender] }
  )

  function handleExit() {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('preloaderSeen', 'true')
      window.dispatchEvent(new CustomEvent('preloaderComplete'))
    }
    onComplete?.()
    setShouldRender(false)
  }

  // ── Don't render if seen ─────────────────────────────────────────────────
  if (!shouldRender) return null

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        clipPath: 'inset(0 0 0% 0)',
        // GPU compositing hint
        willChange: 'clip-path',
      }}
    >
      {/* Counter */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {/* Background "AP" monogram — appears at 100% */}
        <span
          ref={initialsRef}
          style={{
            position: 'absolute',
            fontFamily: 'var(--font-display, Syne), sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(120px, 20vw, 220px)',
            color: 'var(--color-text)',
            opacity: 0,
            letterSpacing: '-0.05em',
            userSelect: 'none',
            pointerEvents: 'none',
            zIndex: 0,
            // GPU composited
            willChange: 'opacity',
          }}
        >
          AP
        </span>

        {/* Counting number */}
        <span
          ref={counterRef}
          style={{
            position: 'relative',
            zIndex: 1,
            fontFamily: 'var(--font-display, Syne), sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(80px, 15vw, 160px)',
            color: 'var(--color-text)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            fontVariantNumeric: 'tabular-nums',
            willChange: 'contents',
          }}
        >
          0
        </span>

        {/* Name — fades in at 70 */}
        <p
          ref={nameRef}
          style={{
            position: 'relative',
            zIndex: 1,
            fontFamily: 'var(--font-body, Inter), sans-serif',
            fontWeight: 400,
            fontSize: '11px',
            color: 'var(--color-text)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            opacity: 0,
            // GPU composited
            willChange: 'opacity',
          }}
        >
          Abhishek Pandey
        </p>
      </div>

      {/* Bottom progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: 'var(--color-border)',
        }}
      />
    </div>
  )
}
