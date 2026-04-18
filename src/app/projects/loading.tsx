export default function Loading() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100svh',
        backgroundColor: 'var(--color-bg)',
        padding: '160px 24px',
      }}
    >
      {/* Top row skeleton */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '64px',
          maxWidth: '1440px',
          margin: '0 auto 64px auto',
        }}
      >
        <div style={{ width: '200px', height: '48px', backgroundColor: 'var(--color-border)' }} />
        <div style={{ width: '100px', height: '24px', backgroundColor: 'var(--color-border)' }} />
      </div>

      {/* Rows skeletons */}
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              height: '100px',
              borderTop: '1px solid var(--color-border)',
              borderBottom: i === 5 ? '1px solid var(--color-border)' : 'none',
              backgroundColor: 'var(--color-bg)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
