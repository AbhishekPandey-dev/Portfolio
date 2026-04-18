'use client'

/**
 * src/components/CustomCursor.tsx
 * ─────────────────────────────────────────────────────────────────
 * Premium custom cursor with:
 *   - Outer ring (40px): border 1px var(--color-text), mix-blend-mode difference
 *   - Inner dot (8px): filled white
 *   - Tracking via gsap.quickTo() — GPU composited transform only
 *   - Magnetic effect on [data-cursor="magnetic"] elements
 *   - Text label mode on [data-cursor-text] elements
 *   - Link/button fill mode on <a>, <button>
 *
 * PERFORMANCE (antigravity-awesome):
 *   - willChange: 'transform' on both elements
 *   - transform: translate() ONLY — no top/left
 *   - quickTo is the most performant GSAP tracking method
 *   - Mouse handler is passive (no preventDefault calls)
 *
 * SSR GUARD: Full typeof window check — component is dynamic import ssr:false
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

// ─── Types ───────────────────────────────────────────────────────────────────
type CursorState = 'default' | 'link' | 'magnetic' | 'text'

// ─── Component ───────────────────────────────────────────────────────────────
export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const stateRef = useRef<CursorState>('default')

  useGSAP(() => {
    // ── SSR Guard & Mobile Guard ────────────────────────────────
    if (typeof window === 'undefined') return
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return
    if (!outerRef.current || !innerRef.current) return

    // ── Hide native cursor ─────────────────────────────────────
    document.body.style.cursor = 'none'

    // ── quickTo for GPU-composited transform tracking ───────────
    // Outer ring: slight lag = premium feel
    const moveOuterX = gsap.quickTo(outerRef.current, 'x', {
      duration: 0.6,
      ease: 'power3.out',
    })
    const moveOuterY = gsap.quickTo(outerRef.current, 'y', {
      duration: 0.6,
      ease: 'power3.out',
    })

    // Inner dot: snappy response
    const moveInnerX = gsap.quickTo(innerRef.current, 'x', {
      duration: 0.15,
      ease: 'power3.out',
    })
    const moveInnerY = gsap.quickTo(innerRef.current, 'y', {
      duration: 0.15,
      ease: 'power3.out',
    })

    // ── Mouse move handler ─────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      moveOuterX(e.clientX)
      moveOuterY(e.clientY)
      moveInnerX(e.clientX)
      moveInnerY(e.clientY)
    }

    // ── Show/hide cursor on window focus ───────────────────────
    const onMouseEnter = () => {
      gsap.to([outerRef.current, innerRef.current], {
        opacity: 1,
        duration: 0.3,
        ease: 'portfolioOut',
      })
    }
    const onMouseLeave = () => {
      gsap.to([outerRef.current, innerRef.current], {
        opacity: 0,
        duration: 0.3,
        ease: 'portfolioOut',
      })
    }

    // ── Hover state: Links & Buttons ───────────────────────────
    const onLinkEnter = () => {
      if (stateRef.current !== 'default') return
      stateRef.current = 'link'
      gsap.to(outerRef.current, {
        scale: 1.5,
        backgroundColor: 'var(--color-text)',
        borderColor: 'transparent',
        duration: 0.3,
        ease: 'portfolioOut',
      })
      gsap.to(innerRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.2,
        ease: 'portfolioOut',
      })
    }
    const onLinkLeave = () => {
      if (stateRef.current !== 'link') return
      stateRef.current = 'default'
      resetToDefault()
    }

    // ── Magnetic effect state ──────────────────────────────────
    const onMagneticEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      stateRef.current = 'magnetic'
      gsap.to(outerRef.current, {
        scale: 2.5,
        duration: 0.4,
        ease: 'portfolioOut',
      })

      const onMagneticMove: EventListener = (evt: Event) => {
        const me = evt as MouseEvent
        if (!outerRef.current) return
        const rect = target.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = (me.clientX - cx) * 0.3
        const dy = (me.clientY - cy) * 0.3

        // Shift element content toward cursor
        gsap.to(target, {
          x: dx,
          y: dy,
          duration: 0.3,
          ease: 'power3.out',
        })
      }

      target.addEventListener('mousemove', onMagneticMove)
      ;(target as HTMLElement & { _magneticMove?: EventListener })._magneticMove = onMagneticMove
    }

    const onMagneticLeave = (e: Event) => {
      const target = e.currentTarget as HTMLElement & { _magneticMove?: EventListener }
      stateRef.current = 'default'

      if (target._magneticMove) {
        target.removeEventListener('mousemove', target._magneticMove)
        delete target._magneticMove
      }

      gsap.to(target, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
      resetToDefault()
    }

    // ── data-cursor-text: label inside ring ────────────────────
    const onTextEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      const label = target.dataset.cursorText ?? ''
      stateRef.current = 'text'

      if (labelRef.current) {
        labelRef.current.textContent = label
      }

      gsap.to(outerRef.current, {
        scale: 2.5,
        duration: 0.4,
        ease: 'portfolioOut',
      })
      gsap.to(labelRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'portfolioOut',
      })
      gsap.to(innerRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'portfolioOut',
      })
    }
    const onTextLeave = () => {
      stateRef.current = 'default'
      gsap.to(labelRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'portfolioOut',
      })
      resetToDefault()
    }

    // ── Helper: reset cursor to default state ──────────────────
    function resetToDefault() {
      gsap.to(outerRef.current, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'var(--color-text)',
        duration: 0.4,
        ease: 'portfolioOut',
      })
      gsap.to(innerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'portfolioOut',
      })
    }

    // ── Bind interactive elements ──────────────────────────────
    const links = document.querySelectorAll<HTMLElement>('a, button, [role="button"]')
    const magneticEls = document.querySelectorAll<HTMLElement>('[data-cursor="magnetic"]')
    const textEls = document.querySelectorAll<HTMLElement>('[data-cursor-text]')

    links.forEach(el => {
      el.addEventListener('mouseenter', onLinkEnter)
      el.addEventListener('mouseleave', onLinkLeave)
    })
    magneticEls.forEach(el => {
      el.addEventListener('mouseenter', onMagneticEnter)
      el.addEventListener('mouseleave', onMagneticLeave)
    })
    textEls.forEach(el => {
      el.addEventListener('mouseenter', onTextEnter)
      el.addEventListener('mouseleave', onTextLeave)
    })

    // Bind global mouse events
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)

    // ── Cleanup ────────────────────────────────────────────────
    // useGSAP ctx.revert() handles GSAP animations automatically.
    // We manually remove event listeners below.
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)

      links.forEach(el => {
        el.removeEventListener('mouseenter', onLinkEnter)
        el.removeEventListener('mouseleave', onLinkLeave)
      })
      magneticEls.forEach(el => {
        el.removeEventListener('mouseenter', onMagneticEnter)
        el.removeEventListener('mouseleave', onMagneticLeave)
      })
      textEls.forEach(el => {
        el.removeEventListener('mouseenter', onTextEnter)
        el.removeEventListener('mouseleave', onTextLeave)
      })

      document.body.style.cursor = ''
    }
  }, { scope: outerRef })

  return (
    <>
      {/* Outer ring — mix-blend-mode difference creates inversion effect */}
      <div
        ref={outerRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          marginLeft: '-20px',
          marginTop: '-20px',
          borderRadius: '50%',
          border: '1px solid var(--color-text)',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          zIndex: 9000,
          mixBlendMode: 'difference',
          opacity: 0,
          // GPU compositing — CRITICAL for 60fps cursor tracking
          willChange: 'transform',
          transform: 'translate(0px, 0px)',
        }}
      >
        {/* Text label (data-cursor-text mode) */}
        <span
          ref={labelRef}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-body, Inter), sans-serif',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-bg)',
            opacity: 0,
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        />
      </div>

      {/* Inner dot — snappy tracking */}
      <div
        ref={innerRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          marginLeft: '-3px',
          marginTop: '-3px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-text)',
          pointerEvents: 'none',
          zIndex: 9001,
          mixBlendMode: 'difference',
          opacity: 0,
          // GPU compositing
          willChange: 'transform',
          transform: 'translate(0px, 0px)',
        }}
      />
    </>
  )
}
