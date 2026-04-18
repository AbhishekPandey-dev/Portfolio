'use client'

/**
 * src/components/sections/ContactHero.tsx
 * -----------------------------------------------------------------------
 * Left side of the contact page split layout.
 * Contains giant typography and social links.
 */

import React from 'react'
import HeadingReveal from '@/components/ui/HeadingReveal'
import AvailabilityBadge from '@/components/ui/AvailabilityBadge'

export default function ContactHero() {
  return (
    <div
      style={{
        padding: '160px 24px 48px 24px',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="contact-hero"
    >
      <span 
        style={{
          fontFamily: 'var(--font-body, Inter), sans-serif',
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--color-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          marginBottom: '32px',
          display: 'block',
        }}
      >
        03 — Let&apos;s Talk
      </span>

      <HeadingReveal
        tag="h1"
        style={{
          fontFamily: 'var(--font-display, Syne), sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(64px, 12vw, 160px)',
          lineHeight: 0.9,
          color: 'var(--color-text)',
          letterSpacing: '-0.04em',
          marginBottom: '48px',
        }}
      >
        Let&apos;s{'\n'}Talk.
      </HeadingReveal>

      <div style={{ marginBottom: '24px' }}>
        <AvailabilityBadge />
      </div>

      <p 
        style={{
          fontFamily: 'var(--font-body, Inter), sans-serif',
          fontSize: '14px',
          color: 'var(--color-muted)',
          lineHeight: 1.6,
          marginBottom: '48px',
          maxWidth: '400px',
        }}
      >
        Based in India · Working globally through PixelForge.in
      </p>

      {/* Direct Email */}
      <a 
        href="mailto:abhishek@pixelforge.in"
        data-cursor-text="Email"
        className="contact-email"
        style={{
          fontFamily: 'var(--font-display, Syne), sans-serif',
          fontSize: '20px',
          fontWeight: 600,
          color: 'var(--color-text)',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: '80px',
          position: 'relative',
        }}
      >
        abhishek@pixelforge.in
      </a>

      {/* Social Row */}
      <div 
        style={{ 
          display: 'flex', 
          gap: '24px',
          marginTop: 'auto', // pushes to bottom if container grows
        }}
      >
        {['LinkedIn', 'GitHub', 'Instagram'].map((social) => (
          <a
            key={social}
            href={`#${social.toLowerCase()}`}
            className="social-link"
            style={{
              fontFamily: 'var(--font-body, Inter), sans-serif',
              fontSize: '12px',
              color: 'var(--color-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
          >
            {social}
          </a>
        ))}
      </div>

      <style>{`
        .contact-hero {
          flex: 1; /* mobile */
        }
        @media (min-width: 1024px) {
          .contact-hero {
            flex: 0 0 55%;
          }
        }
        .contact-email::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -4px;
          left: 0;
          background-color: var(--color-accent);
          transition: width 0.3s ease;
        }
        .contact-email:hover {
          color: var(--color-accent) !important;
        }
        .contact-email:hover::after {
          width: 100%;
        }
        .social-link:hover {
          color: var(--color-text) !important;
        }
      `}</style>
    </div>
  )
}
