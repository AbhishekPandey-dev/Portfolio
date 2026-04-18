'use client'

/**
 * src/components/sections/About.tsx
 * ─────────────────────────────────────────────────────────────────
 * About section — who Abhishek is, what he does, his stack.
 *
 * LAYOUT:
 *   Two-column: left 40% (label + large number stat block),
 *               right 60% (text content + skills grid)
 *   bg var(--color-bg), border-top 1px var(--color-border)
 *   padding: 120px 0
 *
 * ANIMATIONS (ScrollTrigger, on enter viewport):
 *   - Section eyebrow: fade up
 *   - Large "02" index number: clip reveal from bottom
 *   - Body paragraphs: stagger fade up, 0.1s apart
 *   - Skills: stagger in from y:20, 0.06s apart
 *
 * STATS BLOCK (left col):
 *   "2+" years → "Freelance"
 *   "30+" projects → "Delivered"
 *   "100%" client satisfaction implied → shown as "Always" → "On time"
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

// ─── Skills list ──────────────────────────────────────────────────────────────
const SKILLS = [
  'Next.js', 'React', 'TypeScript', 'Node.js',
  'Shopify', 'WordPress', 'GSAP', 'Framer Motion',
  'Three.js', 'Tailwind CSS', 'PostgreSQL', 'MongoDB',
]

const STATS = [
  { value: '2+',  label: 'Years\nFreelance' },
  { value: '30+', label: 'Projects\nDelivered' },
  { value: '∞',   label: 'Passion\nFor Craft' },
]

// ─── Component ───────────────────────────────────────────────────────────────
export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const indexRef = useRef<HTMLSpanElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (typeof window === 'undefined') return

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      if (prefersReducedMotion) return

      const scrollDefaults = {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }

      // Eyebrow
      gsap.from(eyebrowRef.current, {
        ...scrollDefaults,
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: 'portfolio',
      })

      // Large index number — clip reveal
      gsap.from(indexRef.current, {
        ...scrollDefaults,
        yPercent: 110,
        duration: 0.8,
        ease: 'portfolio',
        delay: 0.1,
      })

      // Stats
      const statEls = statsRef.current?.children
      if (statEls) {
        gsap.from(Array.from(statEls), {
          ...scrollDefaults,
          opacity: 0,
          y: 24,
          duration: 0.6,
          stagger: 0.1,
          ease: 'portfolio',
          delay: 0.2,
        })
      }

      // Text paragraphs
      const textEls = textRef.current?.children
      if (textEls) {
        gsap.from(Array.from(textEls), {
          ...scrollDefaults,
          opacity: 0,
          y: 24,
          duration: 0.7,
          stagger: 0.1,
          ease: 'portfolio',
          delay: 0.15,
        })
      }

      // Skills chips
      const skillEls = skillsRef.current?.children
      if (skillEls) {
        gsap.from(Array.from(skillEls), {
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.05,
          ease: 'portfolioOut',
        })
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About Abhishek Pandey"
      style={{
        backgroundColor: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
        padding: '120px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          gap: '80px',
          alignItems: 'flex-start',
        }}
      >
        {/* ── LEFT: index + stats ──────────────────────────────────── */}
        <div
          style={{
            flex: '0 0 38%',
            display: 'flex',
            flexDirection: 'column',
            gap: '48px',
          }}
        >
          {/* Section eyebrow */}
          <p
            ref={eyebrowRef}
            style={{
              fontFamily: 'var(--font-body, Inter), sans-serif',
              fontSize: '11px',
              fontWeight: 400,
              color: 'var(--color-muted)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            About
          </p>

          {/* Large index "02" */}
          <div style={{ overflow: 'hidden' }}>
            <span
              ref={indexRef}
              style={{
                display: 'block',
                fontFamily: 'var(--font-display, Syne), sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(80px, 14vw, 180px)',
                color: 'var(--color-text)',
                opacity: 0.06,
                letterSpacing: '-0.05em',
                lineHeight: 1,
                willChange: 'transform',
              }}
            >
              02
            </span>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
              borderTop: '1px solid var(--color-border)',
              paddingTop: '32px',
            }}
          >
            {STATS.map(({ value, label }) => (
              <div key={value}>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-display, Syne), sans-serif',
                    fontWeight: 800,
                    fontSize: '40px',
                    color: 'var(--color-text)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}
                >
                  {value}
                </span>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body, Inter), sans-serif',
                    fontWeight: 400,
                    fontSize: '12px',
                    color: 'var(--color-muted)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginTop: '6px',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: bio + skills ──────────────────────────────────── */}
        <div
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '48px',
            paddingTop: '48px',
          }}
        >
          {/* Bio text */}
          <div
            ref={textRef}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display, Syne), sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(28px, 3.5vw, 48px)',
                color: 'var(--color-text)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              I turn complex ideas into{' '}
              <em style={{ color: 'var(--color-accent)', fontStyle: 'normal' }}>
                elegant products
              </em>
            </h2>

            <p
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
              Based in India, I run{' '}
              <a
                href="https://pixelforge.in"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-text)', textDecoration: 'none' }}
                data-cursor="magnetic"
              >
                PixelForge.in
              </a>{' '}
              — a boutique development studio delivering full-stack web applications,
              custom Shopify stores, and WordPress solutions. Every pixel is intentional.
              Every line of code has purpose.
            </p>

            <p
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
              I obsess over performance, smooth animations, and UI details that most
              developers overlook — the kind of craft that earns an Awwwards nomination.
            </p>
          </div>

          {/* Skills grid */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-body, Inter), sans-serif',
                fontSize: '11px',
                fontWeight: 400,
                color: 'var(--color-muted)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                margin: '0 0 20px',
              }}
            >
              Stack
            </p>
            <div
              ref={skillsRef}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontFamily: 'var(--font-body, Inter), sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: 'var(--color-muted)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    border: '1px solid var(--color-border)',
                    padding: '6px 14px',
                    lineHeight: 1,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
