'use client'

/**
 * src/components/sections/ValuesSection.tsx
 * -----------------------------------------------------------------------
 * "What I Stand For" — List of core principles. Uses the same StrategyCards
 * horizontal ruled pattern but geared towards core philosophies.
 */

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import HeadingReveal from '@/components/ui/HeadingReveal'
import MagneticButton from '@/components/ui/MagneticButton'

const VALUES = [
  {
    index: '01',
    title: 'Performance Over Flash',
    body: 'A beautiful site that\'s slow is a failing site. Core Web Vitals aren\'t optional. I build for real devices and real networks.',
  },
  {
    index: '02',
    title: 'Code Your Future Self Can Read',
    body: 'Clever code that nobody understands is technical debt. I write for clarity, maintainability, and the next developer (often me).',
  },
  {
    index: '03',
    title: 'Design That Serves the User',
    body: 'I don\'t design for my portfolio — I design for the people who will actually use the product. Usability wins over novelty.',
  },
]

export default function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const rows = listRef.current?.querySelectorAll('[data-value-row]')
    if (!rows?.length) return

    // Stagger reveal whole row
    gsap.from(rows, {
      scrollTrigger: {
        trigger: listRef.current,
        start: 'top 75%',
        once: true,
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.1,
    })

    // Accent trigger on index number independently
    rows.forEach((row) => {
      const idxEl = row.querySelector('[data-idx]')
      if (!idxEl) return
      gsap.to(idxEl, {
        scrollTrigger: {
          trigger: row,
          start: 'top 70%',
          once: true,
        },
        color: 'var(--color-accent)',
        duration: 0.5,
        ease: 'power2.out',
      })
    })

  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      aria-label="My Values"
      style={{
        backgroundColor: 'var(--color-bg)',
        padding: '120px 24px',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <HeadingReveal
          tag="h2"
          style={{
            fontFamily: 'var(--font-display, Syne), sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: 'var(--color-text)',
            letterSpacing: '-0.03em',
            marginBottom: '64px',
          }}
        >
          What I Stand For
        </HeadingReveal>

        {/* Rows */}
        <div ref={listRef} style={{ marginBottom: '80px' }}>
          {VALUES.map((val, i) => (
            <div
              key={val.index}
              data-value-row
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: '32px 0',
                borderTop: '1px solid var(--color-border)',
                ...(i === VALUES.length - 1 ? { borderBottom: '1px solid var(--color-border)' } : {}),
              }}
              className="value-row"
            >
              {/* INDEX */}
              <span
                data-idx
                style={{
                  fontFamily: 'var(--font-display, Syne), sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--color-muted)',
                  minWidth: '64px',
                  paddingTop: '2px', // align with Syne caps
                  transition: 'color 0.3s ease',
                }}
              >
                {val.index}
              </span>

              {/* CONTENT */}
              <div style={{ flex: 1, maxWidth: '800px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display, Syne), sans-serif',
                    fontWeight: 600,
                    fontSize: 'clamp(20px, 2.5vw, 28px)',
                    color: 'var(--color-text)',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                    marginBottom: '16px',
                  }}
                >
                  {val.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body, Inter), sans-serif',
                    fontWeight: 400,
                    fontSize: 'clamp(14px, 1.5vw, 16px)',
                    color: 'var(--color-muted)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {val.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div data-cursor-text="Let's Go">
          <MagneticButton href="/contact" variant="outline" size="lg">
            Let&apos;s Build Something →
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
