'use client'

/**
 * src/components/sections/AboutStrip.tsx
 * -----------------------------------------------------------------------
 * Compact horizontal bio strip with CTA — chkstepan.com reference layout.
 *
 * LAYOUT: 60/40 grid
 *   Left (60%): Short bio paragraph — LineReveal
 *   Right (40%): Small label + MagneticButton "About Me →"
 *
 * TOKENS:
 *   Padding: 120px vertical, full gutter horizontal
 *   Border-bottom: 1px var(--color-border)
 *   Max-width: 1440px centered
 */

import React from 'react'
import Link from 'next/link'
import LineReveal from '@/components/ui/LineReveal'
import MagneticButton from '@/components/ui/MagneticButton'

export default function AboutStrip() {
  return (
    <section
      id="about-strip"
      aria-label="About Abhishek"
      style={{
        backgroundColor: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
        padding: '120px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '60% 40%',
          gap: '48px',
          alignItems: 'center',
        }}
      >
        {/* ── LEFT: Bio ────────────────────────────────────────── */}
        <LineReveal
          style={{
            fontFamily: 'var(--font-body, Inter), sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            color: 'var(--color-muted)',
            lineHeight: 1.8,
            margin: 0,
            maxWidth: '560px',
          }}
        >
          {`I'm a full stack developer and UI/UX specialist working from India, building fast, beautiful, and conversion-focused digital products for brands worldwide through PixelForge.in. Every project I touch is built with attention to performance, clean code, and real results.`}
        </LineReveal>

        {/* ── RIGHT: Label + CTA ───────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '20px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body, Inter), sans-serif',
              fontSize: '11px',
              fontWeight: 400,
              color: 'var(--color-muted)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            About Me
          </span>

          <MagneticButton href="/about" variant="outline" size="md">
            Learn More →
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
