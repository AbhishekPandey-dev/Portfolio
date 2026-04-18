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
        minHeight: '100svh',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <h2 
        style={{ 
          fontFamily: 'var(--font-display, Syne), sans-serif',
          fontWeight: 800,
          fontSize: '32px',
          marginBottom: '16px'
        }}
      >
        Something went wrong!
      </h2>
      <p 
        style={{ 
          color: 'var(--color-muted)',
          fontFamily: 'var(--font-body, Inter), sans-serif',
          marginBottom: '32px'
        }}
      >
        Failed to load the contact page.
      </p>
      <div onClick={() => reset()}>
        <MagneticButton variant="outline">Try Again</MagneticButton>
      </div>
    </div>
  )
}
