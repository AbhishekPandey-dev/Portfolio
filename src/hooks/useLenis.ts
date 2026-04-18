'use client'

/**
 * src/hooks/useLenis.ts
 * ─────────────────────────────────────────────────────────────────
 * Initializes Lenis smooth scroll and connects it to GSAP ticker
 * and ScrollTrigger proxy. Call once via LenisProvider in RootLayout.
 *
 * API: Lenis 1.3.x
 *   Constructor options: { lerp, smoothWheel, duration, touchMultiplier }
 *   No "smooth" option — use smoothWheel instead
 *
 * PATTERN (antigravity-kit):
 *   gsap.ticker.add() → Lenis.raf() → ScrollTrigger.update()
 *   Full scroller proxy so ScrollTrigger reads Lenis scroll position
 *
 * CLEANUP:
 *   lenis.destroy() + gsap.ticker.remove() on unmount — zero leaks
 *
 * SSR GUARD:
 *   All browser APIs behind typeof window check
 * ─────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

// ─── Types ───────────────────────────────────────────────────────────────────
export interface UseLenisOptions {
  /** Lerp interpolation factor — 0.1 feels silky, closer to 1 feels faster */
  lerp?: number
  /** Smooth wheel scrolling — disable for reduced-motion */
  smooth?: boolean
  /** Animation duration multiplier in seconds */
  duration?: number
}

// Augment window to store lenis ref for cross-component access
declare global {
  interface Window {
    __lenis?: Lenis
  }
}

/**
 * useLenis — Initialize Lenis smooth scroll with GSAP integration.
 *
 * @param options LenisOptions
 * @returns Stable ref to Lenis instance
 *
 * @example
 * // In LenisProvider (client component):
 * useLenis({ lerp: 0.1, smooth: true })
 */
export function useLenis(options: UseLenisOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // ── SSR Guard ─────────────────────────────────────────────────
    if (typeof window === 'undefined') return

    // ── Reduced Motion Check ──────────────────────────────────────
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // ── Initialize Lenis ──────────────────────────────────────────
    const lenis = new Lenis({
      lerp: options.lerp ?? 0.1,
      duration: options.duration,
      // smoothWheel: true by default in Lenis 1.3+, disable for reduced motion
      smoothWheel: options.smooth ?? !prefersReducedMotion,
      touchMultiplier: 2,
      infinite: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    })

    lenisRef.current = lenis

    // ── Expose globally for cross-component imperative access ─────
    // (Used by PageTransition to pause/resume during transitions)
    window.__lenis = lenis

    // ── Connect Lenis RAF to GSAP Ticker ──────────────────────────
    // GSAP ticker is more reliable than rAF — prevents drift.
    // Time multiplied by 1000 because GSAP reports seconds, Lenis expects ms.
    const onTick = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(onTick)
    // Disable GSAP lag smoothing — lets Lenis handle its own timing
    gsap.ticker.lagSmoothing(0)

    // ── ScrollTrigger Proxy ───────────────────────────────────────
    // Required: ScrollTrigger must read Lenis scroll position, not native browser scroll.
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value?: number) {
        if (value !== undefined) {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: document.body.style.transform ? 'transform' : 'fixed',
    })

    // ── Sync ScrollTrigger on each Lenis scroll event ─────────────
    const unsubscribe = lenis.on('scroll', ScrollTrigger.update)

    // ── Cleanup ───────────────────────────────────────────────────
    return () => {
      unsubscribe()
      gsap.ticker.remove(onTick)
      // Clear the scroller proxy before destroying Lenis
      ScrollTrigger.scrollerProxy(document.body, undefined as never)
      ScrollTrigger.refresh()
      lenis.destroy()
      lenisRef.current = null
      delete window.__lenis
    }
  // Stable deps — lerp, smooth, duration are primitive values only
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.lerp, options.duration, options.smooth])

  return lenisRef
}

export default useLenis
