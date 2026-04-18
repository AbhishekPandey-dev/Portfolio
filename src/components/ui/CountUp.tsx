'use client'

/**
 * src/components/ui/CountUp.tsx
 * -----------------------------------------------------------------------
 * Number counter animation via GSAP + ScrollTrigger.
 * antigravity-kit pattern: gsap.to({ val: 0 }, ...) object tween.
 *
 * PROPS:
 *   to       — target number
 *   duration — seconds (default 2)
 *   suffix   — string appended after number (e.g. "+", "%")
 *   prefix   — string prepended before number
 */

import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

export interface CountUpProps {
  to: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  style?: React.CSSProperties
}

export default function CountUp({
  to,
  duration = 2,
  suffix = '',
  prefix = '',
  className,
  style,
}: CountUpProps) {
  const [count, setCount] = useState(0)
  const triggerRef = useRef<HTMLSpanElement>(null)
  // Ref to keep track of whether animation has run
  const hasRun = useRef(false)

  useGSAP(
    () => {
      const el = triggerRef.current
      if (!el) return

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) {
        setCount(to)
        return
      }

      const obj = { val: 0 }

      gsap.to(obj, {
        val: to,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            if (hasRun.current) return
            hasRun.current = true
          },
        },
        onUpdate() {
          setCount(Math.round(obj.val))
        },
        onComplete() {
          setCount(to)
        },
      })
    },
    { scope: triggerRef, dependencies: [to, duration] }
  )

  return (
    <span ref={triggerRef} className={className} style={style}>
      {prefix}{count}{suffix}
    </span>
  )
}
