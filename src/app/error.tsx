'use client'

import { useEffect } from 'react'
import MagneticButton from '@/components/ui/MagneticButton'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100svh',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
        padding: '0 24px',
        textAlign: 'center',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-display, Syne), sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(32px, 5vw, 64px)',
          letterSpacing: '-0.04em',
          marginBottom: '24px',
        }}
      >
        Something went wrong!
      </h2>
      <p
        style={{
          fontFamily: 'var(--font-body, Inter), sans-serif',
          color: 'var(--color-muted)',
          fontSize: '16px',
          marginBottom: '48px',
        }}
      >
        An error occurred while loading this page.
      </p>
      
      <div onClick={() => reset()}>
        <MagneticButton variant="fill" size="md">
          Try Again
        </MagneticButton>
      </div>
    </div>
  )
}
