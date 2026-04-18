'use client'

/**
 * src/components/MobileMenu.tsx
 * ─────────────────────────────────────────────────────────────────
 * Full-screen navigation overlay. Works on all screen sizes.
 *
 * ANIMATION SEQUENCE (open):
 *   1. overlay: clipPath inset(0 0 100% 0) → inset(0 0 0% 0) [0.8s portfolio]
 *   2. nav items: y:80 opacity:0 → y:0 opacity:1 [stagger 0.08s, 0.6s each]
 *   3. footer line: opacity:0 → opacity:1 [0.4s]
 *
 * ANIMATION SEQUENCE (close):
 *   Reverse: footer first, then items, then overlay wipes down.
 *
 * LENIS: stop() on open, start() on close
 * ROUTE: auto-closes on pathname change via usePathname
 * PATTERN: GSAP timeline created once (paused), play/reverse via useEffect
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import type Lenis from 'lenis'

// ─── Nav items ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { index: '01', label: 'Overview', href: '/' },
  { index: '02', label: 'About',    href: '/about' },
  { index: '03', label: 'Projects', href: '/projects' },
  { index: '04', label: 'Contact',  href: '/contact' },
]

// ─── Types ───────────────────────────────────────────────────────────────────
export interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

// ─── Helper: access Lenis instance ──────────────────────────────────────────
function getLenis(): Lenis | undefined {
  if (typeof window === 'undefined') return undefined
  return (window as Window & { __lenis?: Lenis }).__lenis
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLUListElement>(null)
  const footerLineRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const pathname = usePathname()

  // ── Build GSAP timeline once (paused) ───────────────────────────────────
  useGSAP(
    () => {
      if (!overlayRef.current || !itemsRef.current || !footerLineRef.current) return

      const items = Array.from(itemsRef.current.children) as HTMLElement[]

      // Set initial states
      gsap.set(overlayRef.current, { clipPath: 'inset(0 0 100% 0)', pointerEvents: 'none' })
      gsap.set(items, { y: 80, opacity: 0 })
      gsap.set(footerLineRef.current, { opacity: 0 })

      const tl = gsap.timeline({
        paused: true,
        onStart: () => {
          // Lock scroll
          getLenis()?.stop()
          if (overlayRef.current) overlayRef.current.style.pointerEvents = 'auto'
        },
        onReverseComplete: () => {
          // Unlock scroll
          getLenis()?.start()
          if (overlayRef.current) overlayRef.current.style.pointerEvents = 'none'
        },
      })

      tl
        // 1. Overlay wipe up
        .to(overlayRef.current, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.8,
          ease: 'portfolio',
        })
        // 2. Nav items stagger in
        .to(
          items,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'portfolio',
            stagger: 0.08,
          },
          '-=0.4'
        )
        // 3. Footer line
        .to(
          footerLineRef.current,
          {
            opacity: 1,
            duration: 0.4,
            ease: 'portfolioOut',
          },
          '-=0.3'
        )

      tlRef.current = tl
    },
    { scope: containerRef }
  )

  // ── Control timeline based on isOpen prop ────────────────────────────────
  // Using useEffect to CONTROL (play/reverse) an existing GSAP timeline —
  // not to create animations. This is distinct from "useEffect for GSAP" anti-pattern.
  useEffect(() => {
    if (!tlRef.current) return
    if (isOpen) {
      tlRef.current.play()
    } else {
      tlRef.current.reverse()
    }
  }, [isOpen])

  // ── Close on route change ────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) onClose()
    // Only run on pathname change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <div ref={containerRef}>
      {/* Full-screen overlay */}
      <div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          backgroundColor: 'var(--color-bg)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px 24px 40px',
          pointerEvents: 'none',
          willChange: 'clip-path',
          clipPath: 'inset(0 0 100% 0)',
          overflowY: 'auto',
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
          style={{
            position: 'absolute',
            top: '20px',
            right: '24px',
            background: 'none',
            border: 'none',
            color: 'var(--color-muted)',
            fontFamily: 'var(--font-body, Inter), sans-serif',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: 'none',
            padding: '8px 0',
          }}
          data-cursor="magnetic"
        >
          Close
        </button>

        {/* Nav items */}
        <nav aria-label="Primary navigation">
          <ul
            ref={itemsRef}
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
            }}
          >
            {NAV_ITEMS.map(({ index, label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '20px',
                    padding: '8px 0',
                    textDecoration: 'none',
                    cursor: 'none',
                    borderBottom: '1px solid var(--color-border)',
                  }}
                  data-cursor="magnetic"
                >
                  {/* Index number */}
                  <span
                    style={{
                      fontFamily: 'var(--font-body, Inter), sans-serif',
                      fontSize: '13px',
                      fontWeight: 400,
                      color: 'var(--color-muted)',
                      letterSpacing: '0.08em',
                      minWidth: '28px',
                    }}
                  >
                    {index}
                  </span>

                  {/* Nav label */}
                  <MenuItemText label={label} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer line: email + socials */}
        <div
          ref={footerLineRef}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '16px',
            paddingTop: '40px',
          }}
        >
          {/* Email */}
          <a
            href="mailto:abhishek@pixelforge.in"
            style={{
              fontFamily: 'var(--font-body, Inter), sans-serif',
              fontSize: '13px',
              fontWeight: 400,
              color: 'var(--color-muted)',
              letterSpacing: '0.04em',
              textDecoration: 'none',
              cursor: 'none',
            }}
            data-cursor="magnetic"
          >
            abhishek@pixelforge.in
          </a>

          {/* Socials */}
          <div style={{ display: 'flex', gap: '24px' }}>
            {[
              { label: 'GitHub', href: 'https://github.com' },
              { label: 'LinkedIn', href: 'https://linkedin.com' },
              { label: 'Twitter', href: 'https://twitter.com' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-body, Inter), sans-serif',
                  fontSize: '11px',
                  fontWeight: 400,
                  color: 'var(--color-muted)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  cursor: 'none',
                }}
                data-cursor="magnetic"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Sub-component: menu item with hover accent ─────────────────────────────
function MenuItemText({ label }: { label: string }) {
  const textRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = textRef.current
      if (!el) return

      const onEnter = () => {
        gsap.to(el, { color: 'var(--color-accent)', duration: 0.3, ease: 'portfolioOut' })
      }
      const onLeave = () => {
        gsap.to(el, { color: 'var(--color-text)', duration: 0.3, ease: 'portfolioOut' })
      }

      const parent = el.closest('a')
      parent?.addEventListener('mouseenter', onEnter)
      parent?.addEventListener('mouseleave', onLeave)

      return () => {
        parent?.removeEventListener('mouseenter', onEnter)
        parent?.removeEventListener('mouseleave', onLeave)
      }
    },
    { scope: textRef }
  )

  return (
    <span
      ref={textRef}
      style={{
        fontFamily: 'var(--font-display, Syne), sans-serif',
        fontWeight: 700,
        fontSize: 'clamp(40px, 8vw, 96px)',
        color: 'var(--color-text)',
        lineHeight: 1.05,
        letterSpacing: '-0.03em',
        // GPU compositing for color transition
        willChange: 'color',
      }}
    >
      {label}
    </span>
  )
}
