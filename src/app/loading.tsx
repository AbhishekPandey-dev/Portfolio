export default function Loading() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100svh',
        backgroundColor: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '0 24px',
      }}
    >
      {/* Top row skeleton */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '96px',
        }}
      >
        <div style={{ width: '120px', height: '16px', backgroundColor: 'var(--color-border)' }} />
        <div style={{ width: '100px', height: '16px', backgroundColor: 'var(--color-border)' }} />
      </div>

      {/* Center skeleton */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
        }}
      >
        <div style={{ width: '60vw', height: '10vw', backgroundColor: 'var(--color-border)' }} />
        <div style={{ width: '50vw', height: '10vw', backgroundColor: 'var(--color-border)' }} />
      </div>

      {/* Bottom row skeleton */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingBottom: '32px',
        }}
      >
        <div style={{ display: 'flex', gap: '32px' }}>
          <div style={{ width: '80px', height: '40px', backgroundColor: 'var(--color-border)' }} />
          <div style={{ width: '100px', height: '40px', backgroundColor: 'var(--color-border)' }} />
          <div style={{ width: '90px', height: '40px', backgroundColor: 'var(--color-border)' }} />
        </div>
        <div style={{ width: '20px', height: '60px', backgroundColor: 'var(--color-border)' }} />
      </div>
      
      {/* Thin rule at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: 'var(--color-border)',
        }}
      />
    </div>
  )
}
