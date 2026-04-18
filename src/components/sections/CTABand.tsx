'use client'

/**
 * src/components/sections/CTABand.tsx
 * -----------------------------------------------------------------------
 * Full-width closing CTA section.
 * Reference: chkstepan.com contact band — centered, commanding, minimal.
 *
 * LAYOUT:
 *   Center aligned:
 *     HeadingReveal "Ready to build something remarkable?"
 *     LineReveal subtext
 *     MagneticButton fill "Let's Talk →" (data-cursor-text="Go")
 *
 * DESIGN TOKENS:
 *   Vertical padding: 120px
 *   Border-top + border-bottom: 1px var(--color-border)
 */

import React from 'react'
import HeadingReveal from '@/components/ui/HeadingReveal'
import LineReveal from '@/components/ui/LineReveal'
import MagneticButton from '@/components/ui/MagneticButton'

export default function CTABand() {
  return (
    <section
      id="cta-band"
      aria-label="Get in touch"
      style={{
        backgroundColor: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        padding: '120px 24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '880px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0',
        }}
      >
        {/* Heading */}
        <HeadingReveal
          tag="h2"
          style={{
            fontFamily: 'var(--font-display, Syne), sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(32px, 5.5vw, 72px)',
            color: 'var(--color-text)',
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            margin: '0 0 24px',
          }}
        >
          Ready to build something remarkable?
        </HeadingReveal>

        {/* Sub */}
        <LineReveal
          delay={0.2}
          style={{
            fontFamily: 'var(--font-body, Inter), sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(15px, 1.5vw, 18px)',
            color: 'var(--color-muted)',
            lineHeight: 1.6,
            letterSpacing: '-0.01em',
            margin: '0 0 48px',
            maxWidth: '480px',
          }}
        >
          {`Let's turn your idea into a fast, beautiful product.`}
        </LineReveal>

        {/* CTA */}
        <div data-cursor-text="Go">
          <MagneticButton href="/contact" variant="fill" size="lg">
            Let&apos;s Talk →
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
