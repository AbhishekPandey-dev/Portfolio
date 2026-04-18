'use client'

/**
 * src/components/ui/LineReveal.tsx
 * -----------------------------------------------------------------------
 * Line-by-line paragraph reveal using ScrollTrigger.
 * antigravity-kit: stagger lines y:30→0, opacity:0→1, 0.08s apart.
 *
 * TECHNIQUE:
 *   - Splits children text at \n or a passed lines[] array
 *   - Each line wrapped in overflow:hidden clip span
 *   - Inner span animates y:30→0
 *   - ScrollTrigger: start "top 85%", once:true
 */

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

export interface LineRevealProps {
  children: React.ReactNode
  delay?: number
  scroll?: boolean
  className?: string
  style?: React.CSSProperties
  as?: 'p' | 'div' | 'span'
}

export default function LineReveal({
  children,
  delay = 0,
  className,
  style,
  as: Tag = 'p',
}: LineRevealProps) {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = containerRef.current
      if (!el) return

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return

      // Animate the element itself as a single "line"
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay,
      })
    },
    { scope: containerRef, dependencies: [delay] }
  )

  return (
    <Tag
      ref={containerRef as React.Ref<HTMLParagraphElement>}
      className={className}
      style={style}
    >
      {children}
    </Tag>
  )
}
