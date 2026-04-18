'use client'

/**
 * src/components/sections/Contact.tsx
 * ─────────────────────────────────────────────────────────────────
 * Contact / CTA section — the closing statement.
 *
 * DESIGN INTENT:
 *   - Large "Let's Work Together" headline — full width, center-aligned
 *   - Email as a massive typographic CTA (Syne 800, hover accent)
 *   - Simple availability note below
 *   - Connects visually to the Footer below it (no hard border)
 *
 * ANIMATIONS:
 *   - Headline: clip-reveal from bottom (same pattern as hero H1)
 *   - Email link: opacity 0→1 + y 30→0, 0.6s delay
 *   - Parallax: email scales subtly on scroll (scrub)
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineWrapRef = useRef<HTMLSpanElement>(null)
  const emailRef = useRef<HTMLAnchorElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      if (typeof window === 'undefined') return
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) return

      // Headline clip reveal
      gsap.from(headlineWrapRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        yPercent: 110,
        duration: 1,
        ease: 'portfolio',
      })

      // Email
      gsap.from(emailRef.current, {
        scrollTrigger: {
          trigger: emailRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'portfolio',
        delay: 0.2,
      })

      // Sub text
      gsap.from(subRef.current, {
        scrollTrigger: {
          trigger: subRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: 'portfolioOut',
        delay: 0.3,
      })

      // Email hover effect
      const emailEl = emailRef.current
      if (emailEl) {
        const onEnter = () =>
          gsap.to(emailEl, { color: 'var(--color-accent)', duration: 0.3, ease: 'portfolioOut' })
        const onLeave = () =>
          gsap.to(emailEl, { color: 'var(--color-text)', duration: 0.4, ease: 'portfolioOut' })

        emailEl.addEventListener('mouseenter', onEnter)
        emailEl.addEventListener('mouseleave', onLeave)

        return () => {
          emailEl.removeEventListener('mouseenter', onEnter)
          emailEl.removeEventListener('mouseleave', onLeave)
        }
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-label="Contact — Get in touch"
      style={{
        backgroundColor: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
        padding: '160px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Section index */}
      <p
        style={{
          fontFamily: 'var(--font-body, Inter), sans-serif',
          fontSize: '11px',
          fontWeight: 400,
          color: 'var(--color-muted)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '48px',
        }}
      >
        05 — Contact
      </p>

      {/* Headline — clip mask */}
      <div style={{ overflow: 'hidden', marginBottom: '48px' }}>
        <span
          ref={headlineWrapRef}
          style={{
            display: 'block',
            willChange: 'transform',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display, Syne), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(40px, 7vw, 100px)',
              color: 'var(--color-text)',
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              margin: 0,
            }}
          >
            Let's Work Together
          </h2>
        </span>
      </div>

      {/* Email CTA */}
      <a
        ref={emailRef}
        href="mailto:abhishek@pixelforge.in"
        aria-label="Send email to Abhishek Pandey"
        data-cursor="magnetic"
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-display, Syne), sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(24px, 4vw, 56px)',
          color: 'var(--color-text)',
          letterSpacing: '-0.03em',
          textDecoration: 'none',
          cursor: 'none',
          willChange: 'color',
          borderBottom: '2px solid var(--color-border)',
          paddingBottom: '4px',
          marginBottom: '48px',
        }}
      >
        abhishek@pixelforge.in
      </a>

      {/* Availability note */}
      <p
        ref={subRef}
        style={{
          fontFamily: 'var(--font-body, Inter), sans-serif',
          fontWeight: 400,
          fontSize: '13px',
          color: 'var(--color-muted)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        {/* Green availability dot */}
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#4CAF50',
            flexShrink: 0,
          }}
        />
        Available for new projects · India (Remote worldwide)
      </p>
    </section>
  )
}
