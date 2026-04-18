export default function Loading() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100svh',
        backgroundColor: 'var(--color-bg)',
        padding: '160px 24px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
        <div style={{ width: '100px', height: '14px', backgroundColor: 'var(--color-border)', marginBottom: '24px' }} />
        <div style={{ width: '80%', maxWidth: '800px', height: '64px', backgroundColor: 'var(--color-border)', marginBottom: '16px' }} />
        <div style={{ width: '60%', maxWidth: '600px', height: '64px', backgroundColor: 'var(--color-border)', marginBottom: '48px' }} />
        <div style={{ width: '40%', maxWidth: '400px', height: '80px', backgroundColor: 'var(--color-border)' }} />
      </div>
    </div>
  )
}
