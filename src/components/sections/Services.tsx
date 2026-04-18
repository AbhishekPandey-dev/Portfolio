'use client'

/**
 * src/components/sections/Services.tsx
 * ─────────────────────────────────────────────────────────────────
 * Services / offerings section — 4 service cards in a grid.
 *
 * LAYOUT:
 *   bg var(--color-bg), border-top 1px var(--color-border), padding 120px 24px
 *   2×2 grid at desktop, 1-col at mobile
 *   Each card: min-height 260px, border 1px var(--color-border), padding 32px
 *   Hover: border-color → accent (var(--color-accent)), 0.3s
 *
 * ANIMATIONS (ScrollTrigger):
 *   Cards scale from 0.98 + opacity:0 as they enter, stagger 0.1s
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const SERVICES = [
  {
    number: '01',
    title: 'Full Stack Development',
    description:
      'End-to-end web applications with Next.js, React, Node.js, and PostgreSQL. From API design to deployment — engineered for performance.',
    tags: ['Next.js', 'Node.js', 'APIs', 'Databases'],
  },
  {
    number: '02',
    title: 'UI/UX Design & Dev',
    description:
      'Pixel-perfect interfaces with GSAP animations, smooth scroll, and interactions that make users stop and pay attention.',
    tags: ['GSAP', 'Framer Motion', 'Three.js', 'Lenis'],
  },
  {
    number: '03',
    title: 'Shopify Development',
    description:
      'Custom Shopify themes, Liquid templating, app integrations, and conversion-optimised checkout flows for E-commerce brands.',
    tags: ['Shopify', 'Liquid', 'Storefront API', 'Checkout'],
  },
  {
    number: '04',
    title: 'WordPress Solutions',
    description:
      'Bespoke WordPress themes, custom plugins, WooCommerce stores, and advanced custom fields for content-heavy platforms.',
    tags: ['WordPress', 'WooCommerce', 'PHP', 'ACF'],
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (typeof window === 'undefined') return
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) return

      const cards = gridRef.current?.children
      if (!cards) return

      gsap.from(Array.from(cards), {
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 32,
        duration: 0.7,
        stagger: 0.1,
        ease: 'portfolio',
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Services"
      style={{
        backgroundColor: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
        padding: '120px 24px',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '20px',
            marginBottom: '64px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body, Inter), sans-serif',
              fontSize: '12px',
              color: 'var(--color-muted)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            04
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display, Syne), sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              color: 'var(--color-text)',
              letterSpacing: '-0.03em',
              margin: 0,
              lineHeight: 1,
            }}
          >
            What I Do
          </h2>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1px',
            border: '1px solid var(--color-border)',
          }}
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.number} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  number,
  title,
  description,
  tags,
}: (typeof SERVICES)[0]) {
  const cardRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const card = cardRef.current
      if (!card) return

      const onEnter = () => {
        gsap.to(card, {
          backgroundColor: 'var(--color-surface)',
          duration: 0.3,
          ease: 'portfolioOut',
        })
      }
      const onLeave = () => {
        gsap.to(card, {
          backgroundColor: 'var(--color-bg)',
          duration: 0.3,
          ease: 'portfolioOut',
        })
      }

      card.addEventListener('mouseenter', onEnter)
      card.addEventListener('mouseleave', onLeave)

      return () => {
        card.removeEventListener('mouseenter', onEnter)
        card.removeEventListener('mouseleave', onLeave)
      }
    },
    { scope: cardRef }
  )

  return (
    <div
      ref={cardRef}
      style={{
        backgroundColor: 'var(--color-bg)',
        padding: '40px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        willChange: 'background-color',
        borderRight: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-body, Inter), sans-serif',
          fontSize: '11px',
          color: 'var(--color-muted)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        {number}
      </span>

      <h3
        style={{
          fontFamily: 'var(--font-display, Syne), sans-serif',
          fontWeight: 700,
          fontSize: '22px',
          color: 'var(--color-text)',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          margin: 0,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontFamily: 'var(--font-body, Inter), sans-serif',
          fontWeight: 400,
          fontSize: '14px',
          color: 'var(--color-muted)',
          lineHeight: 1.7,
          margin: 0,
          flex: 1,
        }}
      >
        {description}
      </p>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: 'var(--font-body, Inter), sans-serif',
              fontSize: '10px',
              fontWeight: 500,
              color: 'var(--color-accent)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
