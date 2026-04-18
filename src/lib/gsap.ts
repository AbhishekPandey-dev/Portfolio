/**
 * src/lib/gsap.ts
 * ─────────────────────────────────────────────────────────────────
 * Central GSAP registration file.
 * Import THIS module everywhere instead of importing from 'gsap' directly.
 * This guarantees plugins are registered exactly once.
 * ─────────────────────────────────────────────────────────────────
 *
 * SSR Safety: This file imports browser-only GSAP. Only import inside
 * client components or hooks guarded by typeof window !== 'undefined'.
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { CustomEase } from 'gsap/CustomEase'

// ─── Plugin Registration ───────────────────────────────────────────────────────
// Register all plugins once — safe to call multiple times (GSAP deduplicates)
gsap.registerPlugin(ScrollTrigger, Flip, CustomEase)

// ─── Custom Eases ──────────────────────────────────────────────────────────────

/**
 * "portfolio" ease — the signature cubic-bezier for this portfolio.
 * Silky deceleration. Equivalent to cubic-bezier(0.76, 0, 0.24, 1).
 * Use this for ALL primary transitions: page reveals, hover states, clip-path.
 */
CustomEase.create('portfolio', '0.76, 0, 0.24, 1')

/**
 * "portfolioIn" — accelerating ease for elements leaving the screen.
 */
CustomEase.create('portfolioIn', '0.76, 0, 1, 1')

/**
 * "portfolioOut" — decelerating ease for elements entering the screen.
 */
CustomEase.create('portfolioOut', '0, 0, 0.24, 1')

// ─── GSAP Global Defaults ──────────────────────────────────────────────────────
gsap.defaults({
  ease: 'portfolio',
  duration: 0.6,
})

// ─── ScrollTrigger Defaults ────────────────────────────────────────────────────
ScrollTrigger.defaults({
  toggleActions: 'play none none reverse',
})

// ─── Export ────────────────────────────────────────────────────────────────────
export { gsap, ScrollTrigger, Flip, CustomEase }
export default gsap
