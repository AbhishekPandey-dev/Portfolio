'use client'

/**
 * src/components/three/SplineScene.tsx
 * ─────────────────────────────────────────────────────────────────
 * Spline 3D scene wrapper — keyboard model for hero section.
 *
 * PERFORMANCE (antigravity-awesome):
 *   - Dynamic import from parent with ssr:false eliminates SSR hydration
 *   - Canvas uses pointer-events:none to not block cursor tracking
 *   - Spline compresses its own WebGL context — no Three.js duplication
 *
 * GPU BUDGET: Spline scenes typically ~80MB VRAM at 1080p (acceptable)
 * Spline URL: Replace SPLINE_URL with your actual Spline export URL
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useState } from 'react'
import Spline from '@splinetool/react-spline'

// ── Replace with actual Spline scene URL ─────────────────────────────────────
// From conversations 527c050c and 1b25dd67: a keyboard 3D model was integrated
const SPLINE_URL =
  'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode'

export default function SplineScene() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '50vh',
        position: 'relative',
        borderRadius: 0,
      }}
    >
      {/* Loading skeleton — shown until Spline mounts */}
      {!isLoaded && !hasError && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Pulsing placeholder */}
          <div
            style={{
              width: '60%',
              aspectRatio: '1',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(175,169,236,0.06) 0%, transparent 70%)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
        </div>
      )}

      {/* Spline canvas */}
      {!hasError && (
        <Spline
          scene={SPLINE_URL}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          style={{
            width: '100%',
            height: '100%',
            // Allow Spline to intercept pointer events for 3D interaction
            pointerEvents: 'auto',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        />
      )}

      {/* Graceful fallback if Spline fails to load */}
      {hasError && (
        <div
          style={{
            width: '100%',
            height: '100%',
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display, Syne), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(60px, 12vw, 120px)',
              color: 'var(--color-text)',
              opacity: 0.04,
              letterSpacing: '-0.04em',
              userSelect: 'none',
            }}
          >
            AP
          </span>
        </div>
      )}
    </div>
  )
}
