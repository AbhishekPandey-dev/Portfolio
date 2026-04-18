'use client'

/**
 * src/components/ui/MagneticButton.tsx
 * ─────────────────────────────────────────────────────────────────
 * Reusable magnetic button with GSAP-powered attraction effect.
 *
 * MECHANICS:
 *   On mousemove: element body moves 40% of cursor offset toward cursor
 *                 inner content moves 20% (parallax layer feel)
 *   On mouseleave: elastic spring-back via elastic.out
 *
 * GPU: Only transform (x/y) animated — no layout-triggering properties
 * SSR: typeof window guard inside event handlers
 *
 * Usage:
 *   <MagneticButton variant="outline" size="md">View Work</MagneticButton>
 *   <MagneticButton href="/projects" variant="fill">Projects</MagneticButton>
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useRef } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

// ─── Types ───────────────────────────────────────────────────────────────────
export type MagneticSize = 'sm' | 'md' | 'lg'
export type MagneticVariant = 'outline' | 'fill'

export interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  size?: MagneticSize
  variant?: MagneticVariant
  className?: string
  style?: React.CSSProperties
  'aria-label'?: string
  disabled?: boolean
}

// ─── Size styles ─────────────────────────────────────────────────────────────
const sizeMap: Record<MagneticSize, { padding: string; fontSize: string }> = {
  sm: { padding: '10px 20px', fontSize: '12px' },
  md: { padding: '14px 32px', fontSize: '13px' },
  lg: { padding: '18px 48px', fontSize: '14px' },
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function MagneticButton({
  children,
  href,
  onClick,
  size = 'md',
  variant = 'outline',
  className = '',
  'aria-label': ariaLabel,
  disabled = false,
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLSpanElement>(null)

  // ── GSAP: magnetic effect setup ─────────────────────────────────────────
  useGSAP(
    () => {
      const wrapper = wrapperRef.current
      const inner = innerRef.current
      
      const isTouch = window.matchMedia('(pointer: coarse)').matches
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      if (!wrapper || !inner || disabled || isTouch || isReduced) return

      const onMouseMove = (e: MouseEvent) => {
        const rect = wrapper.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const offsetX = e.clientX - cx
        const offsetY = e.clientY - cy

        gsap.to(wrapper, {
          x: offsetX * 0.4,
          y: offsetY * 0.4,
          duration: 0.3,
          ease: 'power3.out',
        })
        gsap.to(inner, {
          x: offsetX * 0.2,
          y: offsetY * 0.2,
          duration: 0.3,
          ease: 'power3.out',
        })
      }

      const onMouseLeave = () => {
        gsap.to(wrapper, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.35)',
        })
        gsap.to(inner, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.35)',
        })
      }

      wrapper.addEventListener('mousemove', onMouseMove)
      wrapper.addEventListener('mouseleave', onMouseLeave)

      return () => {
        wrapper.removeEventListener('mousemove', onMouseMove)
        wrapper.removeEventListener('mouseleave', onMouseLeave)
      }
    },
    { scope: wrapperRef, dependencies: [disabled] }
  )

  // ── Computed styles ────────────────────────────────────────────────────
  const { padding, fontSize } = sizeMap[size]
  const isOutline = variant === 'outline'

  const buttonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding,
    fontSize,
    fontFamily: 'var(--font-body, Inter), sans-serif',
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    border: isOutline ? '1px solid var(--color-text)' : 'none',
    backgroundColor: isOutline ? 'transparent' : 'var(--color-text)',
    color: isOutline ? 'var(--color-text)' : 'var(--color-bg)',
    borderRadius: 0,
    cursor: 'none',
    userSelect: 'none',
    willChange: 'transform',
    transition: 'background-color 0.3s, color 0.3s, opacity 0.3s',
    opacity: disabled ? 0.4 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
  }

  // ── Render ─────────────────────────────────────────────────────────────
  const content = (
    <div
      ref={wrapperRef}
      data-cursor="magnetic"
      style={{ display: 'inline-block', willChange: 'transform' }}
      className={className}
    >
      {href ? (
        <Link href={href} aria-label={ariaLabel} style={buttonStyle}>
          <span ref={innerRef} style={{ display: 'block' }}>
            {children}
          </span>
        </Link>
      ) : (
        <button
          type="button"
          onClick={onClick}
          aria-label={ariaLabel}
          disabled={disabled}
          style={buttonStyle}
        >
          <span ref={innerRef} style={{ display: 'block' }}>
            {children}
          </span>
        </button>
      )}
    </div>
  )

  return content
}
