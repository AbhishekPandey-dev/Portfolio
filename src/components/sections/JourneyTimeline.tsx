'use client'

/**
 * src/components/sections/JourneyTimeline.tsx
 * -----------------------------------------------------------------------
 * 2-column layout (50/50). Left: Story text. Right: Vertical timeline.
 */

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import HeadingReveal from '@/components/ui/HeadingReveal'
import LineReveal from '@/components/ui/LineReveal'

const TIMELINE = [
  { year: '2022', text: 'Started freelancing — first clients, WordPress & static sites' },
  { year: '2023', text: 'Shopify mastery — custom Liquid themes, 10+ stores launched' },
  { year: '2024', text: 'Full stack + UI/UX — React, Next.js, Figma, GSAP animations' },
  { year: '2025–Now', text: 'PixelForge.in — international clients, complex builds' },
]

export default function JourneyTimeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const items = timelineRef.current?.querySelectorAll('[data-timeline-item]')
    if (!items?.length) return

    gsap.from(items, {
      scrollTrigger: {
        trigger: timelineRef.current,
        start: 'top 75%',
        once: true,
      },
      x: -20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      aria-label="My Professional Journey"
      style={{
        backgroundColor: 'var(--color-bg)',
        padding: '120px 24px',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div 
        style={{ 
          maxWidth: '1440px', 
          margin: '0 auto',
          display: 'grid',
          gap: '80px',
        }}
        className="grid-cols-1 md:grid-cols-2"
      >
        {/* Left Col: Story Text */}
        <div>
          <HeadingReveal
            tag="h2"
            style={{
              fontFamily: 'var(--font-display, Syne), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 48px)',
              color: 'var(--color-text)',
              letterSpacing: '-0.03em',
              marginBottom: '48px',
            }}
          >
            The Journey
          </HeadingReveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <LineReveal delay={0.1} style={{ fontFamily: 'var(--font-body, Inter), sans-serif', fontSize: '16px', color: 'var(--color-muted)', lineHeight: 1.6 }}>
              Started as a self-taught developer, fell in love with the intersection of design and engineering. Learned by building — real projects, real clients.
            </LineReveal>
            <LineReveal delay={0.2} style={{ fontFamily: 'var(--font-body, Inter), sans-serif', fontSize: '16px', color: 'var(--color-muted)', lineHeight: 1.6 }}>
              Joined PixelForge.in where I&apos;ve spent 2 years building everything from Shopify stores for D2C brands to full-stack web applications for SaaS companies.
            </LineReveal>
            <LineReveal delay={0.3} style={{ fontFamily: 'var(--font-body, Inter), sans-serif', fontSize: '16px', color: 'var(--color-muted)', lineHeight: 1.6 }}>
              Today I specialize in Next.js + GSAP for high-performance marketing sites, Shopify custom themes, WordPress/WooCommerce builds, and UI/UX design in Figma.
            </LineReveal>
          </div>
        </div>

        {/* Right Col: Timeline */}
        <div ref={timelineRef} style={{ position: 'relative', paddingTop: '16px' }}>
          {/* Vertical tracking line */}
          <div 
            style={{ 
              position: 'absolute', 
              top: 0, 
              bottom: 0, 
              left: '5px', 
              width: '1px', 
              backgroundColor: 'var(--color-border)' 
            }} 
            aria-hidden="true" 
          />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
            {TIMELINE.map((item, index) => (
              <div 
                key={index} 
                data-timeline-item 
                style={{ 
                  position: 'relative', 
                  paddingLeft: '40px',
                }}
              >
                {/* Node dot */}
                <div 
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '6px',
                    width: '11px',
                    height: '11px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-accent)',
                    border: '2px solid var(--color-bg)',
                  }}
                  aria-hidden="true"
                />
                
                <h3 
                  style={{ 
                    fontFamily: 'var(--font-display, Syne), sans-serif',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    marginBottom: '8px',
                    lineHeight: 1,
                  }}
                >
                  {item.year}
                </h3>
                <p 
                  style={{ 
                    fontFamily: 'var(--font-body, Inter), sans-serif',
                    fontSize: '14px',
                    color: 'var(--color-muted)',
                    lineHeight: 1.5,
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Utilities required for the grid-cols class logic */}
      <style>{`
        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        @media (min-width: 768px) {
          .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
      `}</style>
    </section>
  )
}
