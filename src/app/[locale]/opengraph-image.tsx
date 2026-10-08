import { ImageResponse } from 'next/og'

export const alt = 'Ansilum — cashier app with an AI assistant for Indonesian small businesses'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const copy = {
  en: {
    headline: 'Turn daily sales into your next business decision.',
    sub: 'A cashier app with an AI assistant for Indonesian small businesses.',
    question: 'What changed in my sales this week?',
  },
  id: {
    headline: 'Ubah penjualan harian menjadi langkah usaha berikutnya.',
    sub: 'Aplikasi kasir dengan asisten AI untuk UMKM Indonesia.',
    question: 'Apa yang berubah dari penjualan minggu ini?',
  },
}

export default function OpenGraphImage({ params }: { params: { locale: string } }) {
  const text = copy[params.locale === 'en' ? 'en' : 'id']
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: '56px 72px',
          background: '#FFFFFF',
          color: '#111418',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 120,
            background: 'linear-gradient(100deg, #FF5B1F 0%, #FF7A2E 45%, #FFC53D 100%)',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 48, fontWeight: 700, letterSpacing: '-2px' }}>
            ansilum<span style={{ color: '#FF5B1F' }}>.</span>
          </span>
          <span
            style={{
              display: 'flex',
              fontSize: 24,
              background: '#111418',
              color: '#FFFFFF',
              padding: '12px 22px',
              borderRadius: 16,
            }}
          >
            {text.question}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 1000, marginBottom: 110 }}>
          <span style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-3px' }}>{text.headline}</span>
          <span style={{ marginTop: 24, fontSize: 30, color: '#545D6A' }}>{text.sub}</span>
        </div>
      </div>
    ),
    size,
  )
}
