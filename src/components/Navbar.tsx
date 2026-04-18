'use client'

/**
 * src/components/Navbar.tsx
 * ─────────────────────────────────────────────────────────────────
 * Fixed minimal dark navbar — global header for all pages.
 *
 * LAYOUT:
 *   Fixed top-0, full width, h-16 (64px), z-index 50
 *   Left: "AP" monogram (Syne 800) + "Abhishek Pandey" (hidden mobile)
 *   Right: "Menu" text button (Inter 500, uppercase, tracked)
 *
 * SCROLL BEHAVIOR:
 *   On scroll > 60px: bg layer fades in (rgba(10,10,10,0.85) + backdrop-blur)
 *   On scroll down > 100px: nav slides up (-100%) out of view
 *   On scroll up: nav slides back down
 *
 * MENU: manages MobileMenu state internally
 *
 * PATTERN:
 *   useGSAP + ScrollTrigger.create() — no useEffect for GSAP
 *   overwrite: true prevents animation stacking on rapid scroll
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import MobileMenu from '@/components/MobileMenu'

// ─── Component ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const bgLayerRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // Ref mirror of isMenuOpen for GSAP closure access
  const isMenuOpenRef = useRef(false)

  const openMenu = () => {
    isMenuOpenRef.current = true
    setIsMenuOpen(true)
  }

  const closeMenu = () => {
    isMenuOpenRef.current = false
    setIsMenuOpen(false)
  }

  // ── GSAP: scroll-driven behaviors ─────────────────────────────────────
  useGSAP(
    () => {
      if (typeof window === 'undefined') return
      if (!navRef.current || !bgLayerRef.current) return

      // ── 1. Frosted glass on scroll past 60px ───────────────────────
      ScrollTrigger.create({
        start: '60px top',
        onEnter: () => {
          gsap.to(bgLayerRef.current, {
            opacity: 1,
            duration: 0.4,
            ease: 'portfolio',
          })
        },
        onLeaveBack: () => {
          gsap.to(bgLayerRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: 'portfolio',
          })
        },
      })

      // ── 2. Hide on scroll down / reveal on scroll up ─────────────────
      let prevDirection = 0 // prevent redundant tweens

      ScrollTrigger.create({
        onUpdate: (self) => {
          // Don't hide while menu is open
          if (isMenuOpenRef.current) return
          const dir = self.direction
          if (dir === prevDirection) return
          prevDirection = dir

          if (dir === 1 && self.scroll() > 100) {
            // Scrolling down — hide
            gsap.to(navRef.current, {
              y: '-110%',
              duration: 0.45,
              ease: 'portfolio',
              overwrite: true,
            })
          } else {
            // Scrolling up — reveal
            gsap.to(navRef.current, {
              y: '0%',
              duration: 0.45,
              ease: 'portfolioOut',
              overwrite: true,
            })
          }
        },
      })
    },
    { scope: navRef }
  )

  return (
    <>
      {/* ── Nav header ──────────────────────────────────────────────── */}
      <header
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          // GPU compositing for y-transform hide/show
          willChange: 'transform',
        }}
      >
        {/* ── Background blur layer (opacity animated by GSAP) ────── */}
        <div
          ref={bgLayerRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(10, 10, 10, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--color-border)',
            opacity: 0,
            willChange: 'opacity',
            zIndex: -1,
          }}
        />

        {/* ── Logo ────────────────────────────────────────────────── */}
        <Link
          href="/"
          aria-label="Abhishek Pandey — Home"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            cursor: 'none',
          }}
          data-cursor="magnetic"
        >
          {/* "AP" monogram */}
          <span
            style={{
              fontFamily: 'var(--font-display, Syne), sans-serif',
              fontWeight: 800,
              fontSize: '20px',
              color: 'var(--color-text)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            AP
          </span>

          {/* Full name — hidden on mobile */}
          <span
            style={{
              fontFamily: 'var(--font-body, Inter), sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              color: 'var(--color-muted)',
              letterSpacing: '0.04em',
              // Hidden below 768px — use display:none via inline media query workaround
            }}
            className="hidden md:block"
          >
            Abhishek Pandey
          </span>
        </Link>

        {/* ── Menu trigger ────────────────────────────────────────── */}
        <MenuButton onOpen={openMenu} />
      </header>

      {/* ── Mobile menu overlay ──────────────────────────────────────── */}
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  )
}

// ─── Sub-component: Menu button with hover opacity effect ───────────────────
function MenuButton({ onOpen }: { onOpen: () => void }) {
  const btnRef = useRef<HTMLButtonElement>(null)

  useGSAP(
    () => {
      const el = btnRef.current
      if (!el) return

      const onEnter = () => {
        gsap.to(el, { opacity: 0.5, duration: 0.25, ease: 'portfolioOut' })
      }
      const onLeave = () => {
        gsap.to(el, { opacity: 1, duration: 0.25, ease: 'portfolioOut' })
      }

      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)

      return () => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      }
    },
    { scope: btnRef }
  )

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={onOpen}
      aria-label="Open navigation menu"
      aria-expanded={false}
      data-cursor="magnetic"
      style={{
        background: 'none',
        border: 'none',
        color: 'var(--color-text)',
        fontFamily: 'var(--font-body, Inter), sans-serif',
        fontWeight: 500,
        fontSize: '13px',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        cursor: 'none',
        padding: '8px 0',
        willChange: 'opacity',
      }}
    >
      Menu
    </button>
  )
}
