'use client'

/**
 * src/components/Footer.tsx
 * ─────────────────────────────────────────────────────────────────
 * Dark full-width footer with oversized ghosted brand typography.
 *
 * DESIGN INTENT (chkstepan.com aesthetic):
 *   - "ABHISHEK" at clamp(80px, 18vw, 220px) dominates the centerpiece
 *   - Opacity 0.06 on off-white = ghosted, nearly-invisible bg texture
 *   - Bleeds beyond viewport edges — container overflow: hidden clips it
 *   - Parallax: moves left 8% as footer scrolls into view (GSAP scrub)
 *   - This says "I am a typographic studio" not "I made a portfolio website"
 *
 * GETDESIGN-MD TOKEN AUDIT:
 *   bg: var(--color-bg) ✅ | border: var(--color-border) ✅ | text: var(--color-text) ✅
 *   muted: var(--color-muted) ✅ | accent: var(--color-accent) ✅
 *   pt-20 = 80px ✅ | gap-6 = 24px ✅ | spacing.12 = 48px ✅
 *   Syne 800 (display) ✅ | Inter 400 (body) ✅
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useRef } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

// ─── Footer nav links ────────────────────────────────────────────────────────
const FOOTER_LINKS = [
  { label: 'Overview', href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact',  href: '/contact' },
]

const SOCIAL_LINKS = [
  { label: 'GH',  href: 'https://github.com',   title: 'GitHub' },
  { label: 'LI',  href: 'https://linkedin.com',  title: 'LinkedIn' },
  { label: 'TW',  href: 'https://twitter.com',   title: 'Twitter' },
]

// ─── Component ───────────────────────────────────────────────────────────────
export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const bigTextRef = useRef<HTMLDivElement>(null)

  // ── Parallax on the oversized brand text ──────────────────────────────
  useGSAP(
    () => {
      if (typeof window === 'undefined') return
      if (!footerRef.current || !bigTextRef.current) return

      // Start slightly right, end slightly left as footer scrolls through viewport
      gsap.fromTo(
        bigTextRef.current,
        { x: '3%' },
        {
          x: '-6%',
          ease: 'none',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        }
      )
    },
    { scope: footerRef }
  )

  return (
    <footer
      ref={footerRef}
      style={{
        backgroundColor: 'var(--color-bg)',
        paddingTop: '80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Top row ────────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '0 24px',
          gap: '24px',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left: Logo + tagline */}
        <div>
          <Link
            href="/"
            aria-label="Abhishek Pandey — Home"
            style={{ textDecoration: 'none', cursor: 'none', display: 'block' }}
            data-cursor="magnetic"
          >
            <span
              style={{
                fontFamily: 'var(--font-display, Syne), sans-serif',
                fontWeight: 800,
                fontSize: '20px',
                color: 'var(--color-text)',
                letterSpacing: '-0.04em',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              AP
            </span>
          </Link>
          <p
            style={{
              fontFamily: 'var(--font-body, Inter), sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              color: 'var(--color-muted)',
              letterSpacing: '0.04em',
              lineHeight: 1.6,
              maxWidth: '200px',
            }}
          >
            Full Stack Developer · UI/UX ·{' '}
            <br />
            Shopify · WordPress
          </p>
        </div>

        {/* Right: Nav + socials */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '16px',
          }}
        >
          {/* Nav links row */}
          <nav
            aria-label="Footer navigation"
            style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'flex-end' }}
          >
            {FOOTER_LINKS.map(({ label, href }) => (
              <FooterLink key={href} href={href} label={label} />
            ))}
          </nav>

          {/* Social links row */}
          <div style={{ display: 'flex', gap: '24px' }}>
            {SOCIAL_LINKS.map(({ label, href, title }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={title}
                title={title}
                style={{
                  fontFamily: 'var(--font-body, Inter), sans-serif',
                  fontWeight: 500,
                  fontSize: '11px',
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

      {/* ── CENTERPIECE: Oversized ghosted brand name ─────────────────── */}
      {/*
        Design intent:
          - opacity 0.06 = barely visible, like a watermark burned into the darkness
          - bleeds past both viewport edges — the overflow:hidden on the footer clips it
          - GSAP parallax gives it life as the user scrolls
          - This is the visual anchor of the entire footer
      */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          margin: '48px 0 0',
          // Negative horizontal margin to bleed past container padding
          marginLeft: '-2%',
          marginRight: '-2%',
        }}
      >
        <div
          ref={bigTextRef}
          aria-hidden="true"
          style={{
            fontFamily: 'var(--font-display, Syne), sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(80px, 18vw, 220px)',
            color: 'var(--color-text)',
            // 0.06 opacity: nearly invisible ghost — validates premium, not cheap
            opacity: 0.06,
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            whiteSpace: 'nowrap',
            userSelect: 'none',
            pointerEvents: 'none',
            // GPU constraint: no perspective, just plain translate
            willChange: 'transform',
          }}
        >
          ABHISHEK
        </div>
      </div>

      {/* ── Bottom row ─────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 24px 32px',
          borderTop: '1px solid var(--color-border)',
          marginTop: '0',
          flexWrap: 'wrap',
          gap: '12px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Email */}
        <a
          href="mailto:abhishek@pixelforge.in"
          style={{
            fontFamily: 'var(--font-body, Inter), sans-serif',
            fontWeight: 400,
            fontSize: '13px',
            color: 'var(--color-muted)',
            letterSpacing: '0.04em',
            textDecoration: 'none',
            cursor: 'none',
          }}
          data-cursor="magnetic"
        >
          abhishek@pixelforge.in
        </a>

        {/* Location + availability */}
        <span
          style={{
            fontFamily: 'var(--font-body, Inter), sans-serif',
            fontWeight: 400,
            fontSize: '12px',
            color: 'var(--color-muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          India · Available for Projects
        </span>

        {/* Copyright */}
        <span
          style={{
            fontFamily: 'var(--font-body, Inter), sans-serif',
            fontWeight: 400,
            fontSize: '12px',
            color: 'var(--color-muted)',
            letterSpacing: '0.04em',
          }}
        >
          © 2026 All Rights Reserved
        </span>
      </div>
    </footer>
  )
}

// ─── Sub-component: footer nav link with hover accent ───────────────────────
function FooterLink({ href, label }: { href: string; label: string }) {
  const linkRef = useRef<HTMLAnchorElement>(null)

  useGSAP(
    () => {
      const el = linkRef.current
      if (!el) return

      const onEnter = () => {
        gsap.to(el, { color: 'var(--color-accent)', duration: 0.3, ease: 'portfolioOut' })
      }
      const onLeave = () => {
        gsap.to(el, { color: 'var(--color-muted)', duration: 0.3, ease: 'portfolioOut' })
      }

      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)

      return () => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      }
    },
    { scope: linkRef }
  )

  return (
    <Link
      ref={linkRef}
      href={href}
      style={{
        fontFamily: 'var(--font-body, Inter), sans-serif',
        fontWeight: 400,
        fontSize: '13px',
        color: 'var(--color-muted)',
        letterSpacing: '0.04em',
        textDecoration: 'none',
        cursor: 'none',
        willChange: 'color',
      }}
      data-cursor="magnetic"
    >
      {label}
    </Link>
  )
}
