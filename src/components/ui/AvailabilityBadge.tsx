'use client'

/**
 * src/components/ui/AvailabilityBadge.tsx
 * -----------------------------------------------------------------------
 * Minimal pill badge with pure CSS keyframe pulsing dot.
 * Indicates open for work status.
 */

import React from 'react'

export default function AvailabilityBadge() {
  return (
    <>
      <div 
        className="availability-badge"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 16px',
          borderRadius: '99px',
          border: '1px solid var(--color-border)',
          backgroundColor: 'transparent',
          cursor: 'default',
          transition: 'all 0.3s ease',
        }}
      >
        <span 
          className="pulsing-dot"
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-success)',
          }}
          aria-hidden="true"
        />
        <span
          className="badge-text"
          style={{
            fontFamily: 'var(--font-body, Inter), sans-serif',
            fontSize: '12px',
            color: 'var(--color-muted)',
            transition: 'color 0.3s ease',
          }}
        >
          Available for new projects
        </span>
      </div>

      <style>{`
        @keyframes customPulse {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }
        .pulsing-dot {
          animation: customPulse 2s ease-in-out infinite;
        }
        .availability-badge:hover {
          border-color: var(--color-success) !important;
        }
        .availability-badge:hover .badge-text {
          color: var(--color-text) !important;
        }
      `}</style>
    </>
  )
}
