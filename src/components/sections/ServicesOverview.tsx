'use client'

/**
 * src/components/sections/ServicesOverview.tsx
 * -----------------------------------------------------------------------
 * 3 large service cards — numbered, full-width, alternating bg.
 * Reference: chkstepan.com services section exactly.
 *
 * LAYOUT per card (2-col grid inside):
 *   Left: index + title + italic subtitle + body tags + CTA
 *   Right: decorative SVG geometric shape
 *
 * ANIMATION (antigravity-kit):
 *   Cards reveal y:60 → 0, stagger 0.15s, ScrollTrigger
 *   CTA arrows: magnetic via CSS + transform
 */

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import HeadingReveal from '@/components/ui/HeadingReveal'

const SERVICES = [
  {
    index: '01',
    bg: 'var(--color-bg)',
    title: 'Design',
    subtitle: "it's intention",
    tags: ['UI/UX', 'Figma to Code', 'Pixel-perfect interfaces', 'Design systems'],
    cta: 'Design →',
    href: '/services#design',
    icon: (
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ width: '120px', height: '120px', opacity: 0.12 }}
      >
        <rect x="10" y="10" width="100" height="100" stroke="var(--color-accent)" strokeWidth="1" />
        <rect x="30" y="30" width="60" height="60" stroke="var(--color-accent)" strokeWidth="1" />
        <rect x="50" y="50" width="20" height="20" stroke="var(--color-accent)" strokeWidth="1" />
        <line x1="10" y1="10" x2="110" y2="110" stroke="var(--color-accent)" strokeWidth="0.5" />
        <line x1="110" y1="10" x2="10" y2="110" stroke="var(--color-accent)" strokeWidth="0.5" />
      </svg>
    ),
  },
  {
    index: '02',
    bg: 'var(--color-surface)',
    title: 'Engineering',
    subtitle: 'ship fast, scale forever',
    tags: ['React', 'Next.js', 'Shopify', 'WordPress', 'Full Stack', 'APIs', 'Node.js'],
    cta: 'Engineering →',
    href: '/services#engineering',
    icon: (
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ width: '120px', height: '120px', opacity: 0.12 }}
      >
        <circle cx="60" cy="60" r="50" stroke="var(--color-text)" strokeWidth="1" />
        <circle cx="60" cy="60" r="30" stroke="var(--color-text)" strokeWidth="1" />
        <circle cx="60" cy="60" r="10" stroke="var(--color-text)" strokeWidth="1" />
        <line x1="60" y1="10" x2="60" y2="110" stroke="var(--color-text)" strokeWidth="0.5" />
        <line x1="10" y1="60" x2="110" y2="60" stroke="var(--color-text)" strokeWidth="0.5" />
      </svg>
    ),
  },
  {
    index: '03',
    bg: 'var(--color-bg)',
    title: 'Strategy',
    subtitle: 'rank & convert',
    tags: ['Performance', 'SEO', 'Core Web Vitals', 'CRO', 'Technical audits'],
    cta: 'Strategy →',
    href: '/services#strategy',
    icon: (
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ width: '120px', height: '120px', opacity: 0.12 }}
      >
        <polyline points="10,100 40,50 70,70 100,20" stroke="#4CAF50" strokeWidth="1" strokeLinejoin="round" />
        <line x1="10" y1="100" x2="110" y2="100" stroke="var(--color-text)" strokeWidth="0.5" />
        <line x1="10" y1="100" x2="10" y2="10" stroke="var(--color-text)" strokeWidth="0.5" />
      </svg>
    ),
  },
]

export default function ServicesOverview() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) return

      const cards = sectionRef.current?.querySelectorAll<HTMLElement>('[data-service-card]')
      if (!cards?.length) return

      gsap.from(Array.from(cards), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Services"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Section heading outside cards */}
      <div
        style={{
          padding: '120px 24px 64px',
          maxWidth: '1440px',
          margin: '0 auto',
        }}
      >
        <HeadingReveal
          tag="h2"
          style={{
            fontFamily: 'var(--font-display, Syne), sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 52px)',
            color: 'var(--color-text)',
            letterSpacing: '-0.035em',
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          What I Do
        </HeadingReveal>
      </div>

      {/* Service cards */}
      {SERVICES.map(({ index, bg, title, subtitle, tags, cta, href, icon }) => (
        <div
          key={index}
          data-service-card
          style={{
            backgroundColor: bg,
            borderTop: '1px solid var(--color-border)',
            padding: '64px 24px',
          }}
        >
          <div
            style={{
              maxWidth: '1440px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              alignItems: 'center',
              gap: '48px',
            }}
          >
            {/* LEFT: content */}
            <div>
              {/* Index + Title */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '16px',
                  marginBottom: '8px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body, Inter), sans-serif',
                    fontSize: '11px',
                    fontWeight: 400,
                    color: 'var(--color-muted)',
                    letterSpacing: '0.1em',
                  }}
                >
                  {index}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display, Syne), sans-serif',
                    fontWeight: 800,
                    fontSize: 'clamp(36px, 5vw, 72px)',
                    color: 'var(--color-text)',
                    letterSpacing: '-0.04em',
                    lineHeight: 0.95,
                    margin: 0,
                  }}
                >
                  {title}
                </h3>
                <em
                  style={{
                    fontFamily: 'var(--font-body, Inter), sans-serif',
                    fontWeight: 400,
                    fontSize: 'clamp(14px, 1.5vw, 18px)',
                    color: 'var(--color-muted)',
                    fontStyle: 'italic',
                    letterSpacing: '-0.01em',
                  }}
                >
                  ({subtitle})
                </em>
              </div>

              {/* Tag pills */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginTop: '24px',
                  marginBottom: '32px',
                }}
              >
                {tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'var(--font-body, Inter), sans-serif',
                      fontSize: '12px',
                      fontWeight: 400,
                      color: 'var(--color-muted)',
                      letterSpacing: '0.04em',
                      padding: '6px 12px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'transparent',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <a
                href={href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-display, Syne), sans-serif',
                  fontWeight: 700,
                  fontSize: '15px',
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  letterSpacing: '-0.01em',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--color-border)',
                  transition: 'color 0.3s ease, border-color 0.3s ease',
                }}
                className="service-cta"
              >
                {cta}
              </a>
            </div>

            {/* RIGHT: icon */}
            <div
              aria-hidden="true"
              style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}
            >
              {icon}
            </div>
          </div>
        </div>
      ))}

      <style>{`
        .service-cta:hover {
          color: var(--color-accent);
          border-color: var(--color-accent);
        }
      `}</style>
    </section>
  )
}
