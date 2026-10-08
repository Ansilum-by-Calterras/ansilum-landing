'use client'

import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { DottedMap, type Marker } from './dotted-map'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
export interface CityMarker extends Marker {
  /** Country flag emoji */
  flag: string
  /** Short label shown in the pill (e.g. "KL", "Tokyo") */
  label: string
  /** Whether to render the flag + pill badge */
  showNode: boolean
  /** Which side of the badge the pill extends to */
  labelDir: 'right' | 'left'
}

// Radius of the circular flag badge in SVG units (viewBox 0 0 150 75)
const BADGE_R = 1.26

// ─────────────────────────────────────────────────────────────────────────────
// City data — toggle showNode or add entries freely
// ─────────────────────────────────────────────────────────────────────────────
export const cityMarkers: CityMarker[] = [
  // ── Featured nodes ─────────────────────────────────────────────────────────
  {
    lat: 35.689, lng: 139.691,
    size: 0.01, pulse: false,
    flag: '🇯🇵', label: 'Tokyo',
    showNode: true, labelDir: 'right',
  },
  {
    lat: 37.566, lng: 126.977,
    size: 0.01, pulse: false,
    flag: '🇰🇷', label: 'Seoul',
    showNode: true, labelDir: 'left',
  },
  {
    lat: -6.208, lng: 106.845,
    size: 0.01, pulse: false,
    flag: '🇮🇩', label: 'Jakarta',
    showNode: true, labelDir: 'right',
  },
  {
    lat: 3.139, lng: 101.686,
    size: 0.01, pulse: false,
    flag: '🇲🇾', label: 'KL',
    showNode: true, labelDir: 'left',
  },
  {
    lat: 51.507, lng: -0.127,
    size: 0.01, pulse: false,
    flag: '🇬🇧', label: 'London',
    showNode: true, labelDir: 'right',
  },

  // ── Background pulse dots ───────────────────────────────────────────────────
  { lat:  1.352, lng: 103.819, size: 0.75, pulse: false,  flag: '', label: '', showNode: false, labelDir: 'right' }, // Singapore
  { lat: 13.756, lng: 100.501, size: 0.65, pulse: false, flag: '', label: '', showNode: false, labelDir: 'right' }, // Bangkok
  { lat: 10.762, lng: 106.660, size: 0.65, pulse: false, flag: '', label: '', showNode: false, labelDir: 'right' }, // HCMC
  { lat: 14.599, lng: 120.984, size: 0.60, pulse: false, flag: '', label: '', showNode: false, labelDir: 'right' }, // Manila
  { lat: 22.319, lng: 114.169, size: 0.60, pulse: false,  flag: '', label: '', showNode: false, labelDir: 'right' }, // HK
  { lat: 31.230, lng: 121.473, size: 0.60, pulse: false, flag: '', label: '', showNode: false, labelDir: 'right' }, // Shanghai
  { lat: 11.562, lng: 104.916, size: 0.55, pulse: false, flag: '', label: '', showNode: false, labelDir: 'right' }, // Phnom Penh
  { lat: 25.204, lng:  55.270, size: 0.60, pulse: false, flag: '', label: '', showNode: false, labelDir: 'right' }, // Dubai
  { lat: -33.868, lng: 151.209, size: 0.50, pulse: false, flag: '', label: '', showNode: false, labelDir: 'right' }, // Sydney
  { lat:  40.712, lng: -74.005, size: 0.50, pulse: false, flag: '', label: '', showNode: false, labelDir: 'right' }, // New York
]

// ─────────────────────────────────────────────────────────────────────────────
// Badge: circular flag + pill label — matches the reference design
// ─────────────────────────────────────────────────────────────────────────────
function NodeBadge({
  marker,
  x,
  y,
}: {
  marker: Omit<CityMarker, 'lat' | 'lng'>
  x: number
  y: number
}) {
  if (!marker.showNode) return null

  const { flag, label, labelDir: dir } = marker

  // Pill dimensions — scale with label length
  const pillH  = 1.62
  const pillW  = Math.max(label.length * 0.65 + 1.5, 3.6)
  const gap    = 0.36
  const pillX  = dir === 'right' ? x + BADGE_R + gap : x - BADGE_R - gap - pillW
  const pillY  = y - pillH / 2

  return (
    <g>
      {/* Outer colored ring */}
      <circle cx={x} cy={y} r={BADGE_R} fill="var(--primary)" />
      {/* Inner white circle */}
      <circle cx={x} cy={y} r={BADGE_R - 0.23} fill="white" />
      {/* Flag emoji */}
      <text
        x={x}
        y={y}
        fontSize={BADGE_R * 1.55}
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {flag}
      </text>

      {/* Gray pill */}
      <rect
        x={pillX}
        y={pillY}
        width={pillW}
        height={pillH}
        rx={pillH / 2}
        fill="rgba(72,74,84,0.88)"
      />
      {/* City label */}
      <text
        x={pillX + pillW / 2}
        y={y}
        fontSize="0.86"
        fill="rgba(255,255,255,0.95)"
        dominantBaseline="middle"
        textAnchor="middle"
        fontWeight="500"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        {label}
      </text>
    </g>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main exported component
// ─────────────────────────────────────────────────────────────────────────────
export function HeroMapAnimation() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    // 3-D tilt — Maps-app-style perspective
    gsap.set(el, {
      transformPerspective: 680,
      rotateX: 24,
      rotateY: -5,
      rotateZ: 1.2,
    })

    // Pan across Asia — 45 s yoyo
    // -38 % → Indonesia/Malaysia visible, -55 % → Japan/Korea visible
    const tween = gsap.fromTo(
      el,
      { x: '-38%' },
      {
        x: '-55%',
        duration: 45,
        ease: 'none',
        repeat: -1,
      },
    )

    return () => { tween.kill() }
  }, [])

  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] overflow-hidden sm:block"
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0%, black 42%, black 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 42%, black 100%)',
      }}
    >
      <div
        ref={wrapperRef}
        className="absolute inset-0 w-[145%]"
      >
        <DottedMap<CityMarker>
          markers={cityMarkers}
          dotColor="rgba(255,255,255,0.14)"
          markerColor="rgba(255,255,255,0.78)"
          dotRadius={0.38}
          mapSamples={4000}
          className="h-full w-full"
          renderMarkerOverlay={({ marker, x, y }) => (
            <NodeBadge marker={marker} x={x} y={y} />
          )}
        />
      </div>
    </div>
  )
}
