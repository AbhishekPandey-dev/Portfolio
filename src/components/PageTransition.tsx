'use client'

/**
 * src/components/PageTransition.tsx
 * ─────────────────────────────────────────────────────────────────
 * Route-aware full-screen page transition overlay.
 *
 * SEQUENCE:
 *   Exit:  clipPath inset(100% 0 0% 0) → inset(0% 0 0% 0)   [0.7s portfolio ease]
 *   Hold:  150ms at full coverage
 *   Enter: clipPath inset(0% 0 0% 0) → inset(0% 0 100% 0)   [0.6s portfolio ease]
 *
 * DESIGN:
 *   - var(--color-bg) overlay, z-index 9998 (below preloader, above content)
 *   - "AP" monogram visible during hold — Syne 800, 48px, var(--color-text) opacity 0.12
 *
 * LENIS:
 *   - Paused during transition, resumed after enter completes
 *
 * PATTERN:
 *   useGSAP() with cleanup via ctx.revert()
 *   usePathname() for route change detection
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import type Lenis from 'lenis'

// ─── Types ───────────────────────────────────────────────────────────────────
interface PageTransitionProps {
  children: React.ReactNode
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function PageTransition({ children }: PageTransitionProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const isFirstMount = useRef(true)
  const isAnimating = useRef(false)

  // ── Helper: get Lenis instance from window ──────────────────────────────
  const getLenis = useCallback((): Lenis | undefined => {
    if (typeof window === 'undefined') return undefined
    return (window as Window & { __lenis?: Lenis }).__lenis
  }, [])

  // ── Run transition on pathname change ────────────────────────────────────
  useGSAP(
    () => {
      if (typeof window === 'undefined') return
      if (!overlayRef.current) return

      // Skip animation on first mount
      if (isFirstMount.current) {
        isFirstMount.current = false
        return
      }

      // Prevent overlapping transitions
      if (isAnimating.current) return
      isAnimating.current = true

      const overlay = overlayRef.current
      const lenis = getLenis()

      // ── Pause Lenis during transition ──────────────────────────
      lenis?.stop()

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false
          // Resume Lenis after enter completes
          lenis?.start()
        },
      })

      // ── EXIT: wipe overlay DOWN over content ───────────────────
      tl.set(overlay, {
        pointerEvents: 'auto',
        clipPath: 'inset(100% 0 0% 0)',
      })
        .to(overlay, {
          clipPath: 'inset(0% 0 0% 0)',
          duration: 0.65,
          ease: 'portfolio',
        })
        // ── HOLD 150ms ──────────────────────────────────────────
        .to({}, { duration: 0.15 })
        // ── ENTER: wipe overlay UP revealing new page ───────────
        .to(overlay, {
          clipPath: 'inset(0% 0 100% 0)',
          duration: 0.6,
          ease: 'portfolio',
          onComplete() {
            gsap.set(overlay, { pointerEvents: 'none', clipPath: 'inset(100% 0 0% 0)' })
          },
        })
    },
    {
      scope: overlayRef,
      dependencies: [pathname, getLenis],
    }
  )

  return (
    <>
      {/* Page content */}
      {children}

      {/* Transition overlay */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          backgroundColor: 'var(--color-bg)',
          pointerEvents: 'none',
          clipPath: 'inset(100% 0 0% 0)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // GPU compositing
          willChange: 'clip-path',
        }}
      >
        {/* "AP" monogram — visible during hold */}
        <span
          style={{
            fontFamily: 'var(--font-display, Syne), sans-serif',
            fontWeight: 800,
            fontSize: '48px',
            color: 'var(--color-text)',
            opacity: 0.12,
            letterSpacing: '-0.04em',
            userSelect: 'none',
          }}
        >
          AP
        </span>
      </div>
    </>
  )
}
