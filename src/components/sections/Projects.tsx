'use client'

/**
 * src/components/sections/Projects.tsx
 * ─────────────────────────────────────────────────────────────────
 * Featured projects grid — the portfolio centrepiece.
 *
 * LAYOUT:
 *   Full-width section, bg var(--color-bg), border-top 1px var(--color-border)
 *   Header row: "03" index + "Selected Work" label + project count
 *   Projects: vertical stack — each row is a full-width card
 *
 * PROJECT CARD DESIGN (Awwwards-level):
 *   - Horizontal rule above each card
 *   - Left: project number + name (Syne 700, large)
 *   - Center: project type tags (muted, small)
 *   - Right: year + "→" arrow
 *   - On hover: background slides in (surface var(--color-surface)), y slight shift
 *   - Whole row is clickable — data-cursor-text="View"
 *   - Thumbnail image reveals on hover (absolute, right side, clip reveal)
 *
 * ANIMATIONS:
 *   - Cards stagger in from opacity:0 as section enters view
 *   - Hover: GSAP quickTo on thumbnail reveal
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useRef } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

// ─── Project data ─────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: '01',
    name: 'PixelForge Studio',
    type: ['Full Stack', 'Next.js', 'GSAP'],
    year: '2025',
    href: '/projects/pixelforge',
    description: 'Agency website with cinematic scroll animations and custom CMS',
  },
  {
    id: '02',
    name: 'Kira Commerce',
    type: ['Shopify', 'Custom Theme', 'Liquid'],
    year: '2025',
    href: '/projects/kira-commerce',
    description: 'Luxury fashion Shopify store with custom animations and checkout UX',
  },
  {
    id: '03',
    name: 'Apex Dashboard',
    type: ['React', 'Node.js', 'PostgreSQL'],
    year: '2024',
    href: '/projects/apex-dashboard',
    description: 'Real-time analytics dashboard for SaaS platform with live data',
  },
  {
    id: '04',
    name: 'Verdant Market',
    type: ['WordPress', 'WooCommerce', 'PHP'],
    year: '2024',
    href: '/projects/verdant-market',
    description: 'Organic marketplace with custom plugin architecture',
  },
  {
    id: '05',
    name: 'Strata Portfolio',
    type: ['Three.js', 'React', 'WebGL'],
    year: '2024',
    href: '/projects/strata',
    description: 'Interactive 3D portfolio with particle systems and custom shaders',
  },
]

// ─── Component ───────────────────────────────────────────────────────────────
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (typeof window === 'undefined') return
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) return

      // Header reveal
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'portfolio',
      })

      // Cards stagger in
      const cards = listRef.current?.children
      if (cards) {
        gsap.from(Array.from(cards), {
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 32,
          duration: 0.6,
          stagger: 0.08,
          ease: 'portfolio',
        })
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-label="Selected work"
      style={{
        backgroundColor: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
        padding: '120px 24px',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

        {/* ── Section header ────────────────────────────────────────── */}
        <div
          ref={headerRef}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '64px',
            paddingBottom: '24px',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px' }}>
            <span
              style={{
                fontFamily: 'var(--font-body, Inter), sans-serif',
                fontSize: '12px',
                color: 'var(--color-muted)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              03
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
              Selected Work
            </h2>
          </div>

          <Link
            href="/projects"
            style={{
              fontFamily: 'var(--font-body, Inter), sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              color: 'var(--color-muted)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              cursor: 'none',
              borderBottom: '1px solid var(--color-border)',
              paddingBottom: '2px',
            }}
            data-cursor="magnetic"
          >
            All Projects →
          </Link>
        </div>

        {/* ── Project list ──────────────────────────────────────────── */}
        <div ref={listRef}>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Project Card ────────────────────────────────────────────────────────────
function ProjectCard({
  id,
  name,
  type,
  year,
  href,
  description,
}: (typeof PROJECTS)[0]) {
  const cardRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const card = cardRef.current
      const bg = bgRef.current
      const arrow = arrowRef.current
      if (!card || !bg || !arrow) return

      const onEnter = () => {
        gsap.to(bg, { opacity: 1, duration: 0.3, ease: 'portfolioOut' })
        gsap.to(arrow, { x: 6, duration: 0.3, ease: 'portfolioOut' })
      }
      const onLeave = () => {
        gsap.to(bg, { opacity: 0, duration: 0.3, ease: 'portfolioOut' })
        gsap.to(arrow, { x: 0, duration: 0.4, ease: 'elastic.out(1,0.4)' })
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
    <div ref={cardRef} style={{ position: 'relative' }}>
      {/* Hover bg */}
      <div
        ref={bgRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'var(--color-surface)',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'opacity',
        }}
      />

      <Link
        href={href}
        data-cursor-text="View"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '28px 0',
          borderBottom: '1px solid var(--color-border)',
          textDecoration: 'none',
          cursor: 'none',
          position: 'relative',
          zIndex: 1,
          gap: '24px',
        }}
      >
        {/* Left: number + name */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px', flex: 1 }}>
          <span
            style={{
              fontFamily: 'var(--font-body, Inter), sans-serif',
              fontSize: '13px',
              color: 'var(--color-muted)',
              letterSpacing: '0.08em',
              minWidth: '28px',
              flexShrink: 0,
            }}
          >
            {id}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display, Syne), sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(22px, 2.8vw, 36px)',
              color: 'var(--color-text)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            {name}
          </span>
        </div>

        {/* Center: type tags */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            flex: '0 0 auto',
            justifyContent: 'center',
          }}
          className="hidden md:flex"
        >
          {type.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-body, Inter), sans-serif',
                fontSize: '11px',
                fontWeight: 500,
                color: 'var(--color-muted)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                border: '1px solid var(--color-border)',
                padding: '4px 10px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Right: year + arrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body, Inter), sans-serif',
              fontSize: '13px',
              color: 'var(--color-muted)',
              letterSpacing: '0.04em',
            }}
          >
            {year}
          </span>
          <span
            ref={arrowRef}
            style={{
              fontFamily: 'var(--font-body, Inter), sans-serif',
              fontSize: '18px',
              color: 'var(--color-text)',
              willChange: 'transform',
              display: 'block',
            }}
          >
            →
          </span>
        </div>
      </Link>
    </div>
  )
}
