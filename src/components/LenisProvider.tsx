'use client'

/**
 * src/components/LenisProvider.tsx
 * ─────────────────────────────────────────────────────────────────
 * Thin client wrapper that calls useLenis() to initialize smooth
 * scroll globally. Exists because layout.tsx is a Server Component
 * and cannot call hooks directly.
 *
 * This component renders nothing — just initializes the side effect.
 * ─────────────────────────────────────────────────────────────────
 */

import React from 'react'
import { useLenis } from '@/hooks/useLenis'


interface LenisProviderProps {
  children: React.ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  // Initialize Lenis globally — returned ref available on window.lenis
  useLenis({
    lerp: 0.1,
    smooth: true,
  })

  return <>{children}</>
}
