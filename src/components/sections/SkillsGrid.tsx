'use client'

/**
 * src/components/sections/SkillsGrid.tsx
 * -----------------------------------------------------------------------
 * A 4-column responsive grid mapping technical tooling and stacks.
 * Stagger reveal columns via GSAP.
 */

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import HeadingReveal from '@/components/ui/HeadingReveal'

const SKILLS = [
  {
    category: 'Frontend',
    items: [
      'React', 'Next.js', 'TypeScript', 'JavaScript (ES2024)',
      'Tailwind CSS', 'GSAP', 'Framer Motion', 'Lenis',
      'Three.js', 'HTML5', 'CSS3', 'Responsive Design'
    ]
  },
  {
    category: 'Backend',
    items: [
      'Node.js', 'Express.js', 'REST APIs', 'GraphQL',
      'MongoDB', 'MySQL', 'PostgreSQL', 'Redis',
      'JWT Auth', 'NextAuth', 'Prisma ORM'
    ]
  },
  {
    category: 'CMS & E-Commerce',
    items: [
      'Shopify (Liquid, CLI, Custom Themes)',
      'Shopify Headless + Hydrogen',
      'WordPress (Gutenberg, ACF, Elementor)',
      'WooCommerce', 'Custom Post Types'
    ]
  },
  {
    category: 'Tools & Workflow',
    items: [
      'Figma (UI/UX, Prototyping, DS)',
      'Git', 'GitHub', 'GitLab',
      'Vercel', 'Netlify', 'cPanel',
      'Lighthouse', 'Chrome DevTools',
      'VS Code', 'Postman', 'Docker (basics)'
    ]
  }
]

export default function SkillsGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const columns = gridRef.current?.querySelectorAll('[data-stagger-col]')
    if (!columns?.length) return

    gsap.from(columns, {
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 80%',
        once: true,
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      aria-label="My Technical Skills"
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
          What I Work With
        </HeadingReveal>

        <div 
          ref={gridRef}
          style={{ 
            display: 'grid', 
            gap: '48px',
          }}
          className="skills-grid"
        >
          {SKILLS.map((col, i) => (
            <div key={col.category} data-stagger-col>
              {/* Category Header */}
              <h3 
                style={{
                  fontFamily: 'var(--font-body, Inter), sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--color-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  marginBottom: '24px',
                  borderBottom: '1px solid var(--color-border)',
                  paddingBottom: '16px',
                }}
              >
                {col.category}
              </h3>
              
              {/* Skills List */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {col.items.map((skill) => (
                  <li 
                    key={skill}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start',
                      gap: '8px' 
                    }}
                    className="skill-item"
                  >
                    <span 
                      aria-hidden="true" 
                      className="skill-dot"
                      style={{
                        marginTop: '6px',
                        width: '4px',
                        height: '4px',
                        backgroundColor: 'var(--color-border)',
                        borderRadius: '50%',
                        flexShrink: 0,
                        transition: 'background-color 0.2s ease',
                      }}
                    />
                    <span 
                      style={{
                        fontFamily: 'var(--font-body, Inter), sans-serif',
                        fontSize: '13px',
                        color: 'var(--color-text)',
                        lineHeight: 1.5,
                        transition: 'color 0.2s ease',
                      }}
                      className="skill-text"
                    >
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skills-grid {
          grid-template-columns: repeat(1, minmax(0, 1fr));
        }
        @media (min-width: 640px) {
          .skills-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (min-width: 1024px) {
          .skills-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        }
        .skill-item:hover .skill-dot {
          background-color: var(--color-accent) !important;
        }
        .skill-item:hover .skill-text {
          color: var(--color-accent) !important;
        }
      `}</style>
    </section>
  )
}
