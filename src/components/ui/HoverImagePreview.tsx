'use client'

/**
 * src/components/ui/HoverImagePreview.tsx
 * -----------------------------------------------------------------------
 * Fixed absolute div that follows the mouse using gsap.quickTo.
 * Replicates the smooth chkstepan.com project hover.
 */

import React, { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

interface HoverImagePreviewProps {
  isVisible: boolean
  activeImageId: string | null
  // In a real app this would map to actual images, here we use accent colors
}

export default function HoverImagePreview({ isVisible, activeImageId }: HoverImagePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageDivRef = useRef<HTMLDivElement>(null)

  // Use gsap.quickTo for high-performance mouse tracking
  const xTo = useRef<any>(null)
  const yTo = useRef<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Set up quickTo functions
    if (containerRef.current) {
      xTo.current = gsap.quickTo(containerRef.current, 'x', { duration: 0.6, ease: 'power3.out' })
      yTo.current = gsap.quickTo(containerRef.current, 'y', { duration: 0.6, ease: 'power3.out' })
    }

    const mouseMove = (e: MouseEvent) => {
      if (xTo.current && yTo.current) {
        // Center the preview on the cursor
        xTo.current(e.clientX - 160) // 160 is half of 320px
        yTo.current(e.clientY - 110) // 110 is half of 220px
      }
      
      // Calculate slight rotation based on mouse velocity X (crude approximation)
      if (containerRef.current) {
        const movementX = e.movementX || 0
        const rotate = Math.max(-5, Math.min(5, movementX * 0.2))
        gsap.to(containerRef.current, { rotation: rotate, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
      }
    }

    window.addEventListener('mousemove', mouseMove)
    return () => window.removeEventListener('mousemove', mouseMove)
  }, [])

  // Handle visibility transitions
  useEffect(() => {
    if (!containerRef.current) return

    if (isVisible) {
      gsap.to(containerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
    } else {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        ease: 'power2.inOut',
        rotation: 0
      })
    }
  }, [isVisible])

  // Get a unique color based on ID just for demo
  const getDemoColor = (id: string | null) => {
    const colors = ['var(--color-accent)', 'var(--color-text)', '#4CAF50', 'var(--color-muted)', 'var(--color-border)', '#333333']
    if (!id) return 'transparent'
    const index = parseInt(id) || 0
    return colors[index % colors.length]
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '320px',
        height: '220px',
        opacity: 0,
        scale: 0.9,
        pointerEvents: 'none',
        zIndex: 90,
        overflow: 'hidden',
        willChange: 'transform, opacity',
      }}
    >
      <div
        ref={imageDivRef}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: getDemoColor(activeImageId),
          transition: 'background-color 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <span style={{ 
          fontFamily: 'var(--font-display, Syne), sans-serif',
          fontWeight: 800,
          color: 'var(--color-bg)',
          fontSize: '32px'
        }}>
          {activeImageId ? `Preview ${activeImageId}` : ''}
        </span>
      </div>
    </div>
  )
}
