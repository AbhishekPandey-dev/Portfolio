'use client'

/**
 * src/components/sections/StrategyCards.tsx
 * -----------------------------------------------------------------------
 * "How I Approach Every Project?" — horizontal rule-separated card list.
 * chkstepan.com reference: numbered rows, arrow right, no outer cards.
 *
 * ANIMATION (antigravity-kit):
 *   - Each card: y:30 → 0, opacity:0 → 1, ScrollTrigger stagger 0.1
 *   - Index number: on enter, transitions to accent (var(--color-accent))
 *   - Arrow: rotates 0 → 45deg on hover
 */

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import HeadingReveal from '@/components/ui/HeadingReveal'

const CARDS = [
  {
    index: '01',
    title: 'Performance-First',
    body: 'I optimize for Core Web Vitals from day one.',
  },
  {
    index: '02',
    title: 'Clean & Scalable Code',
    body: 'Readable, maintainable, built to grow.',
  },
  {
    index: '03',
    title: 'Pixel-Perfect UI/UX',
    body: 'From Figma to code without losing fidelity.',
  },
  {
    index: '04',
    title: 'Shopify & WordPress Mastery',
    body: 'Custom themes, headless, full CMS ownership.',
  },
  {
    index: '05',
    title: 'SEO & Conversion Focus',
    body: 'Rankings and revenue, not just aesthetics.',
  },
]

export default function StrategyCards() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) return

      const cards = cardsRef.current?.querySelectorAll<HTMLElement>('[data-card]')
      if (!cards?.length) return

      // Stagger reveal
      gsap.from(Array.from(cards), {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 75%',
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
      })

      // Index accent on scroll enter — each card individually
      Array.from(cards).forEach((card) => {
        const indexEl = card.querySelector<HTMLElement>('[data-idx]')
        if (!indexEl) return
        gsap.to(indexEl, {
          scrollTrigger: {
            trigger: card,
            start: 'top 70%',
            once: true,
          },
          color: 'var(--color-accent)',
          duration: 0.5,
          ease: 'power2.out',
        })
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="strategy"
      aria-label="My approach to every project"
      style={{
        backgroundColor: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
        padding: '120px 24px',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* Section heading */}
        <HeadingReveal
          tag="h2"
          style={{
            fontFamily: 'var(--font-display, Syne), sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 52px)',
            color: 'var(--color-text)',
            letterSpacing: '-0.035em',
            lineHeight: 1.05,
            marginBottom: '64px',
            margin: '0 0 64px',
          }}
        >
          How I Approach Every Project?
        </HeadingReveal>

        {/* Cards list */}
        <div ref={cardsRef} role="list">
          {CARDS.map(({ index, title, body }, i) => (
            <div
              key={index}
              data-card
              role="listitem"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '28px 0',
                borderTop: '1px solid var(--color-border)',
                ...(i === CARDS.length - 1 ? { borderBottom: '1px solid var(--color-border)' } : {}),
                cursor: 'default',
              }}
              className="strategy-card"
            >
              {/* INDEX */}
              <span
                data-idx
                style={{
                  fontFamily: 'var(--font-display, Syne), sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--color-muted)',
                  letterSpacing: '0.04em',
                  minWidth: '48px',
                  transition: 'color 0.3s ease',
                }}
              >
                {index}
              </span>

              {/* TITLE + BODY */}
              <div style={{ flex: 1, padding: '0 24px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display, Syne), sans-serif',
                    fontWeight: 600,
                    fontSize: 'clamp(17px, 2vw, 22px)',
                    color: 'var(--color-text)',
                    letterSpacing: '-0.02em',
                    display: 'block',
                  }}
                >
                  {title}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body, Inter), sans-serif',
                    fontWeight: 400,
                    fontSize: '13px',
                    color: 'var(--color-muted)',
                    marginTop: '4px',
                    display: 'block',
                  }}
                >
                  {body}
                </span>
              </div>

              {/* ARROW — hover rotate 45deg */}
              <span
                aria-hidden="true"
                style={{
                  fontFamily: 'var(--font-body, Inter), sans-serif',
                  fontSize: '20px',
                  color: 'var(--color-muted)',
                  flexShrink: 0,
                  transition: 'transform 0.3s ease, color 0.3s ease',
                  display: 'inline-block',
                }}
                className="strategy-arrow"
              >
                →
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hover styles injected via a style tag */}
      <style>{`
        .strategy-card:hover .strategy-arrow {
          transform: rotate(45deg);
          color: var(--color-accent);
        }
        .strategy-card:hover [data-idx] {
          color: var(--color-accent);
        }
      `}</style>
    </section>
  )
}
