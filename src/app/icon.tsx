import { ImageResponse } from 'next/og'
export const size = { width: 64, height: 64 }
export const contentType = 'image/png'
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: '#3e2c23',
          color: '#f5f0e9',
          borderRadius: 14,
          fontSize: 46,
          fontWeight: 700,
          paddingBottom: 8,
        }}
      >
        a.
      </div>
    ),
    size,
  )
}
