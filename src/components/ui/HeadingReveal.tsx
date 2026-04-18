'use client'

/**
 * src/components/ui/HeadingReveal.tsx
 * -----------------------------------------------------------------------
 * Reusable character-by-character heading reveal.
 * antigravity-kit pattern: useGSAP + manual char split, NO SplitText dep.
 *
 * TECHNIQUE:
 *   1. Split text into individual <span> chars on mount inside useGSAP
 *   2. Each char wrapped in an overflow:hidden parent clip container
 *   3. GSAP from: y:100, opacity:0, rotationX:-20
 *         to:   y:0,   opacity:1, rotationX:0,  stagger:0.03
 *   4. ScrollTrigger: start "top 85%", once:true
 *   5. prefers-reduced-motion: immediately visible
 *
 * CLEANUP: ctx.revert() from useGSAP scope — zero leaks
 */

import React, { useRef, ElementType } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export interface HeadingRevealProps {
  children: React.ReactNode
  /** Default 0 */
  delay?: number
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p'
  className?: string
  style?: React.CSSProperties
  /** If true, use ScrollTrigger instead of play-on-mount */
  scroll?: boolean
}

export default function HeadingReveal({
  children,
  delay = 0,
  tag = 'h2',
  className,
  style,
  scroll = true,
}: HeadingRevealProps) {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const container = containerRef.current
      if (!container) return

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Split text into char spans — each char is a separate animated element
      const text = container.textContent ?? ''
      container.innerHTML = ''

      // Build word groups so spaces are preserved
      const words = text.split(' ')
      words.forEach((word, wi) => {
        const wordSpan = document.createElement('span')
        wordSpan.style.cssText = 'display:inline-block; white-space:nowrap;'

        word.split('').forEach((char) => {
          // Clip container (overflow hidden)
          const clip = document.createElement('span')
          clip.style.cssText = 'display:inline-block; overflow:hidden; vertical-align:bottom;'

          const inner = document.createElement('span')
          inner.style.cssText = 'display:inline-block; will-change:transform;'
          inner.textContent = char

          clip.appendChild(inner)
          wordSpan.appendChild(clip)
        })

        container.appendChild(wordSpan)

        // Add space between words (except last)
        if (wi < words.length - 1) {
          const space = document.createElement('span')
          space.innerHTML = '&nbsp;'
          space.style.display = 'inline-block'
          container.appendChild(space)
        }
      })

      if (prefersReduced) {
        // Show immediately — no animation
        const inners = container.querySelectorAll<HTMLElement>('span > span > span')
        gsap.set(inners, { y: 0, opacity: 1, rotationX: 0 })
        return
      }

      const charInners = Array.from(
        container.querySelectorAll<HTMLElement>('span > span > span')
      )

      // Initial state
      gsap.set(charInners, {
        y: 100,
        opacity: 0,
        rotationX: -20,
        transformOrigin: '0% 50% -50',
      })

      const animProps: gsap.TweenVars = {
        y: 0,
        opacity: 1,
        rotationX: 0,
        stagger: 0.03,
        duration: 1,
        ease: 'power3.out',
        delay,
      }

      if (scroll) {
        animProps.scrollTrigger = {
          trigger: container,
          start: 'top 85%',
          once: true,
        }
      }

      gsap.to(charInners, animProps)
    },
    { scope: containerRef, dependencies: [children, delay, scroll] }
  )

  const Tag: any = tag

  return (
    <Tag
      ref={containerRef}
      className={className}
      style={style}
    >
      {children}
    </Tag>
  )
}
