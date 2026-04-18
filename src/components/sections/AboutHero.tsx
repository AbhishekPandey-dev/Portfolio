'use client'

/**
 * src/components/sections/AboutHero.tsx
 * -----------------------------------------------------------------------
 * Hero section for the About page.
 * Features a muted label and large staggered statement lines.
 */

import React from 'react'
import HeadingReveal from '@/components/ui/HeadingReveal'
import LineReveal from '@/components/ui/LineReveal'

export default function AboutHero() {
  return (
    <section
      aria-label="About Me Header"
      style={{
        width: '100%',
        backgroundColor: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
        paddingTop: '160px',
        paddingBottom: '96px',
        paddingLeft: '24px',
        paddingRight: '24px',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* Label */}
        <div
          style={{
            fontFamily: 'var(--font-body, Inter), sans-serif',
            fontSize: '12px',
            color: 'var(--color-muted)',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            marginBottom: '40px',
          }}
        >
          01 — About Me
        </div>

        {/* Huge Statement */}
        <div style={{ marginBottom: '64px' }}>
          <HeadingReveal
            tag="h1"
            delay={0.1}
            scroll={false}
            style={{
              fontFamily: 'var(--font-display, Syne), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 72px)',
              color: 'var(--color-text)',
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              margin: '0 0 8px 0',
            }}
          >
            I&apos;m Abhishek Pandey—
          </HeadingReveal>
          <HeadingReveal
            tag="h1"
            delay={0.2}
            scroll={false}
            style={{
              fontFamily: 'var(--font-display, Syne), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 72px)',
              color: 'var(--color-text)',
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              margin: '0 0 8px 0',
            }}
          >
            a developer who builds things
          </HeadingReveal>
          <HeadingReveal
            tag="h1"
            delay={0.3}
            scroll={false}
            style={{
              fontFamily: 'var(--font-display, Syne), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 72px)',
              color: 'var(--color-text)',
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              margin: '0 0 8px 0',
            }}
          >
            that look great, load fast,
          </HeadingReveal>
          <HeadingReveal
            tag="h1"
            delay={0.4}
            scroll={false}
            style={{
              fontFamily: 'var(--font-display, Syne), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 72px)',
              color: 'var(--color-text)',
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              margin: 0,
            }}
          >
            and drive real results.
          </HeadingReveal>
        </div>

        {/* Sub Paragraph */}
        <LineReveal
          delay={0.6}
          scroll={false}
          style={{
            fontFamily: 'var(--font-body, Inter), sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(16px, 1.5vw, 20px)',
            color: 'var(--color-muted)',
            lineHeight: 1.6,
            letterSpacing: '-0.01em',
            maxWidth: '680px',
          }}
        >
          2 years of freelance work through PixelForge.in. 25+ projects shipped.
          Clients from India, UAE, UK, and beyond. I obsess over performance,
          clean code, and the kind of design that actually converts.
        </LineReveal>
      </div>
    </section>
  )
}
