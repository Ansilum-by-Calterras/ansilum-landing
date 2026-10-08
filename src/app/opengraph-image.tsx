import { ImageResponse } from 'next/og'
export const alt =
  'Ansilum — POS untuk kafe dan restoran. Early Beta. Dikembangkan oleh Calterras.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: '60px 72px',
          background: '#f5f0e9',
          color: '#3e2c23',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 46, fontWeight: 700 }}>ansilum.</span>
          <span style={{ fontSize: 24 }}>Early Beta · Indonesia</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{ fontSize: 76, fontWeight: 700, letterSpacing: '-3px' }}
          >
            Kasir lebih andal.
          </span>
          <span
            style={{ fontSize: 76, fontWeight: 700, letterSpacing: '-3px' }}
          >
            Usaha lebih terbaca.
          </span>
          <span style={{ marginTop: 28, fontSize: 28 }}>
            POS untuk kafe dan restoran.
          </span>
        </div>
        <span style={{ fontSize: 24 }}>Dikembangkan oleh Calterras</span>
      </div>
    ),
    size,
  )
}
