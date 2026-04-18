/**
 * src/lib/tokens.ts
 * -----------------------------------------------------------------------
 * Centralized Design Token definitions.
 * Sourced directly from globals.css @theme specification.
 */

export const DESIGN_TOKENS = {
  colors: {
    background: 'var(--color-bg)',      // var(--color-bg)
    surface: 'var(--color-surface)',    // var(--color-surface)
    border: 'var(--color-border)',      // var(--color-border)
    textPrimary: 'var(--color-text)',   // var(--color-text)
    textMuted: 'var(--color-muted)',    // var(--color-muted)
    accent: 'var(--color-accent)',      // var(--color-accent)
    white: 'var(--color-white)',        // #FFFFFF
    success: 'var(--color-success)',
    error: 'var(--color-error)'
  },
  typography: {
    display: 'var(--font-display, Syne), sans-serif',
    body: 'var(--font-body, Inter), sans-serif',
  },
  spacing: {
    edge: '24px',
    maxWidth: '1440px',
    sectionBase: '120px',
    sectionMobile: '80px',
  },
}