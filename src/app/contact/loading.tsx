export default function Loading() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100svh',
        backgroundColor: 'var(--color-bg)',
        padding: '160px 24px',
        display: 'flex',
        gap: '48px',
      }}
    >
      {/* Left Skeleton */}
      <div style={{ flex: 0.55, display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ width: '100px', height: '16px', backgroundColor: 'var(--color-border)' }} />
        <div style={{ width: '80%', height: '120px', backgroundColor: 'var(--color-border)' }} />
        <div style={{ width: '200px', height: '32px', backgroundColor: 'var(--color-border)', borderRadius: '16px' }} />
      </div>

      {/* Right Skeleton */}
      <div style={{ flex: 0.45, display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ width: '100%', height: '48px', backgroundColor: 'var(--color-border)' }} />
        <div style={{ width: '100%', height: '48px', backgroundColor: 'var(--color-border)' }} />
        <div style={{ width: '100%', height: '48px', backgroundColor: 'var(--color-border)' }} />
        <div style={{ width: '100%', height: '120px', backgroundColor: 'var(--color-border)' }} />
      </div>
    </div>
  )
}
