import { clsx } from 'clsx'

/*
 * Animated line art. Everything is decorative SVG (aria-hidden) driven by CSS classes in
 * marketing.css: `.pulse` runs a short brand-coloured dash along a path drawn with pathLength=100,
 * `.ping` ripples out from a node, and `data-anim` pauses the loops while they are off screen.
 */

const INK = '#111418'
const LINE = '#D5DAE1'
const BRAND = '#FF5B1F'
const SUN = '#FFC53D'
const MIST = '#F4F5F7'

const stroke = {
  fill: 'none',
  stroke: INK,
  strokeWidth: 2.25,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

type Style = React.CSSProperties & Record<`--${string}`, string | number>

/** A dotted track with brand pulses running along it. */
function Flow({
  d,
  pulses = 2,
  duration = 3.2,
  offset = 0,
  track = LINE,
  pulse = BRAND,
  width = 2,
}: {
  d: string
  pulses?: number
  duration?: number
  offset?: number
  track?: string
  pulse?: string
  width?: number
}) {
  return (
    <g fill="none" strokeLinecap="round">
      <path d={d} stroke={track} strokeWidth={width} strokeDasharray="2 7" />
      {Array.from({ length: pulses }, (_, index) => (
        <path
          key={index}
          className="pulse"
          d={d}
          pathLength={100}
          stroke={pulse}
          strokeWidth={width + 1.5}
          style={{ '--dur': `${duration}s`, '--delay': `${offset + (index * duration) / pulses}s` } as Style}
        />
      ))}
    </g>
  )
}

function Node({ x, y, r = 6, color = BRAND, delay = 0 }: { x: number; y: number; r?: number; color?: string; delay?: number }) {
  return (
    <g>
      <circle className="ping" cx={x} cy={y} r={r} fill={color} style={{ '--delay': `${delay}s` } as Style} />
      <circle cx={x} cy={y} r={r} fill={color} />
    </g>
  )
}

/** The Ansilum mark as a node: an orange rounded square with an "a". */
function Mark({ x, y, size = 40, delay = 0 }: { x: number; y: number; size?: number; delay?: number }) {
  const half = size / 2
  return (
    <g>
      <rect
        className="ping"
        x={x - half}
        y={y - half}
        width={size}
        height={size}
        rx={size * 0.3}
        fill={BRAND}
        style={{ '--delay': `${delay}s` } as Style}
      />
      <rect x={x - half} y={y - half} width={size} height={size} rx={size * 0.3} fill={BRAND} />
      <text x={x} y={y + size * 0.17} textAnchor="middle" fontSize={size * 0.52} fontWeight={700} fill="#fff">
        a
      </text>
    </g>
  )
}

/** Hero: a sale is saved at the counter, travels through Ansilum, and drops into the assistant below. */
export function HeroFlow({
  text,
}: {
  text: { order: string; items: [string, string][]; total: [string, string]; saved: string }
}) {
  return (
    <svg viewBox="0 0 420 300" className="h-auto w-full overflow-visible" data-anim aria-hidden="true">
      <Flow d="M214 92 C 300 92, 330 120, 330 168 L 330 360" pulses={2} duration={2.6} />
      <Flow d="M330 168 C 330 230, 250 250, 160 280 S 60 330, 40 380" pulses={1} duration={3.4} offset={1.2} />
      <g className="float">
        <rect x="0" y="20" width="214" height="150" rx="14" fill="#fff" stroke={LINE} />
        <text x="18" y="46" fontSize="13" fontWeight={700} fill={INK}>
          {text.order}
        </text>
        {text.items.map(([name, amount], index) => (
          <g key={name} fontSize="11.5" fill="#545D6A">
            <text x="18" y={72 + index * 20}>
              {name}
            </text>
            <text x="196" y={72 + index * 20} textAnchor="end">
              {amount}
            </text>
          </g>
        ))}
        <path d="M18 106 H196" stroke={LINE} strokeDasharray="3 4" />
        <text x="18" y="126" fontSize="12.5" fontWeight={700} fill={INK}>
          {text.total[0]}
        </text>
        <text x="196" y="126" fontSize="12.5" fontWeight={700} fill={INK} textAnchor="end">
          {text.total[1]}
        </text>
        <rect x="18" y="138" width="86" height="20" rx="6" fill="#E2F5EC" />
        <path d="M26 148 l4 4 l7 -8" stroke="#12805A" strokeWidth="2" fill="none" strokeLinecap="round" />
        <text x="42" y="152" fontSize="11" fontWeight={600} fill="#12805A">
          {text.saved}
        </text>
      </g>
      <Mark x={330} y={168} size={42} />
      <Sparkles x={300} y={10} cols={8} rows={5} gap={12} />
    </svg>
  )
}

/** A small halftone patch whose dots twinkle in a slow wave. */
function Sparkles({
  x,
  y,
  cols,
  rows,
  gap,
  color = BRAND,
}: {
  x: number
  y: number
  cols: number
  rows: number
  gap: number
  color?: string
}) {
  return (
    <g fill={color}>
      {Array.from({ length: cols * rows }, (_, index) => {
        const col = index % cols
        const row = Math.floor(index / cols)
        if ((col + row) % 3 === 0) return null
        return (
          <circle
            key={index}
            className="twinkle"
            cx={x + col * gap}
            cy={y + row * gap}
            r={1.6}
            style={{ '--delay': `${(col + row) * 0.18}s`, '--dur': '3.2s' } as Style}
          />
        )
      })}
    </g>
  )
}

function Tablet({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x} ${y + 34} L${x + 8} ${y} H${x + 54} L${x + 46} ${y + 34} Z`} {...stroke} fill="#fff" />
      <path d={`M${x + 20} ${y + 34} V${y + 44} M${x + 10} ${y + 44} H${x + 36}`} {...stroke} />
      <circle cx={x + 29} cy={y + 15} r="5.5" fill={BRAND} />
    </g>
  )
}

function Steam({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <path
      className="steam"
      d={`M${x} ${y} c-4 -6 4 -10 0 -16`}
      {...stroke}
      strokeWidth={2}
      style={{ '--delay': `${delay}s` } as Style}
    />
  )
}

/** Four everyday counters, each with a cashier tablet sending its sales up to Ansilum. */
export function UmkmScene({ question, answer }: { question: string; answer: string }) {
  const tablets: [number, number][] = [
    [199, 237],
    [529, 197],
    [843, 231],
    [1119, 233],
  ]
  return (
    <svg viewBox="0 0 1200 350" className="h-auto w-full" data-anim aria-hidden="true">
      {tablets.map(([x, y], index) => (
        <Flow
          key={x}
          d={`M${x} ${y} C ${x} ${y - 110}, 600 ${y - 60}, 600 78`}
          pulses={1}
          duration={2.8}
          offset={index * 0.7}
        />
      ))}

      {/* Warung makan: cart with awning, pot, and steam */}
      <g>
        <path d="M50 192 L70 162 H250 L270 192 Z" {...stroke} fill="#fff" />
        <path d="M50 192 q18 16 36.7 0 q18 16 36.7 0 q18 16 36.7 0 q18 16 36.7 0 q18 16 36.7 0 q18 16 36.7 0" {...stroke} fill={SUN} />
        <path d="M70 204 V264 M250 204 V264" {...stroke} />
        <rect x="50" y="264" width="220" height="40" rx="4" {...stroke} fill={MIST} />
        <circle cx="96" cy="316" r="13" {...stroke} fill="#fff" />
        <circle cx="224" cy="316" r="13" {...stroke} fill="#fff" />
        <path d="M84 264 v-24 h46 v24 M78 240 h58" {...stroke} fill="#fff" />
        <Steam x={98} y={230} />
        <Steam x={114} y={230} delay={0.9} />
        <Tablet x={170} y={222} />
      </g>

      {/* Kedai kopi: espresso machine, cups, steam */}
      <g>
        <rect x="350" y="250" width="240" height="80" rx="4" {...stroke} fill={MIST} />
        <path d="M350 250 H590" {...stroke} strokeWidth={4.5} />
        <path d="M376 250 V182 H456 V250" {...stroke} fill="#fff" />
        <path d="M376 200 H456 M394 212 V226 M438 212 V226" {...stroke} />
        <path d="M400 238 h12 v12 h-12 z M422 238 h12 v12 h-12 z" {...stroke} />
        <circle cx="416" cy="191" r="3.5" fill={INK} />
        <path d="M472 226 h24 l-3 24 h-18 z" {...stroke} fill="#fff" />
        <Steam x={480} y={216} delay={0.4} />
        <Steam x={490} y={216} delay={1.3} />
        <Tablet x={500} y={182} />
      </g>

      {/* Barbershop: mirror, chair, striped pole */}
      <g>
        <rect x="650" y="150" width="78" height="96" rx="39" {...stroke} fill="#fff" />
        <path d="M670 186 c9 -12 24 -16 34 -10" {...stroke} />
        <path d="M676 290 h62 v-38 a9 9 0 0 0 -9 -9 h-44 a9 9 0 0 0 -9 9 z" {...stroke} fill={MIST} />
        <path d="M668 290 h78 M707 290 v24 M688 330 l19 -16 l19 16" {...stroke} />
        <clipPath id="pole-clip">
          <rect x="766" y="186" width="20" height="96" rx="10" />
        </clipPath>
        <g clipPath="url(#pole-clip)">
          <rect x="766" y="186" width="20" height="96" fill="#fff" />
          <g className="stripes">
            {Array.from({ length: 6 }, (_, index) => (
              <path key={index} d={`M762 ${206 + index * 24} l28 -18`} stroke={BRAND} strokeWidth={6} />
            ))}
          </g>
        </g>
        <rect x="766" y="186" width="20" height="96" rx="10" {...stroke} />
        <path d="M770 176 h12 M770 292 h12 M776 292 v38" {...stroke} />
        <rect x="806" y="262" width="76" height="68" rx="4" {...stroke} fill={MIST} />
        <Tablet x={814} y={216} />
      </g>

      {/* Toko kelontong: shelves with goods, counter */}
      <g>
        <rect x="940" y="168" width="120" height="162" rx="4" {...stroke} fill="#fff" />
        <path d="M940 210 H1060 M940 252 H1060 M940 294 H1060" {...stroke} />
        {[
          [952, 186, 18, 24, SUN],
          [976, 192, 22, 18, BRAND],
          [1004, 184, 16, 26, MIST],
          [1026, 190, 22, 20, SUN],
          [952, 230, 26, 22, MIST],
          [984, 226, 16, 26, BRAND],
          [1006, 232, 30, 20, SUN],
          [954, 272, 20, 22, BRAND],
          [980, 276, 34, 18, MIST],
          [1020, 270, 18, 24, SUN],
        ].map(([x, y, w, h, fill]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="3" {...stroke} strokeWidth={1.75} fill={fill as string} />
        ))}
        <rect x="1080" y="264" width="100" height="66" rx="4" {...stroke} fill={MIST} />
        <Tablet x={1090} y={218} />
      </g>

      <path d="M20 330 H1180" {...stroke} />

      {/* The owner's question and Ansilum's answer around the mark */}
      <g className="float">
        <rect x="642" y="14" width="300" height="42" rx="14" fill={INK} />
        <text x="792" y="40" textAnchor="middle" fontSize="15" fontWeight={600} fill="#fff">
          {question}
        </text>
      </g>
      <g className="float" style={{ '--delay': '-2.5s' } as Style}>
        <rect x="258" y="68" width="300" height="42" rx="14" fill="#fff" stroke={LINE} />
        <text x="408" y="94" textAnchor="middle" fontSize="15" fontWeight={600} fill={INK}>
          {answer}
        </text>
      </g>
      <Mark x={600} y={60} size={48} />
    </svg>
  )
}

/** Step 1: a receipt prints from the cashier. */
export function ReceiptArt({ lines }: { lines: string[] }) {
  return (
    <svg viewBox="0 0 240 150" className="h-auto w-full" data-anim aria-hidden="true">
      <rect x="40" y="16" width="160" height="20" rx="8" {...stroke} fill={MIST} />
      <clipPath id="receipt-clip">
        <rect x="40" y="26" width="160" height="124" />
      </clipPath>
      <g clipPath="url(#receipt-clip)">
        <g className="print">
          <path d="M60 26 V138 l10 -6 l10 6 l10 -6 l10 6 l10 -6 l10 6 l10 -6 l10 6 l10 -6 l10 6 l10 -6 l10 6 V26" {...stroke} fill="#fff" />
          {lines.map((line, index) => (
            <text key={line} x="72" y={52 + index * 18 + (index === lines.length - 1 ? 8 : 0)} fontSize="11" fill={index === lines.length - 1 ? INK : '#545D6A'} fontWeight={index === lines.length - 1 ? 700 : 500}>
              {line}
            </text>
          ))}
          <path d="M72 80 H168" stroke={LINE} strokeDasharray="3 4" />
        </g>
      </g>
      <Node x={200} y={26} r={5} color="#12805A" delay={0.4} />
    </svg>
  )
}

/** Step 2: sales sorted into a halftone bar chart; the dots light up in a wave. */
export function SortArt() {
  const heights = [4, 6, 5, 8, 7, 3, 3]
  return (
    <svg viewBox="0 0 240 150" className="h-auto w-full" data-anim aria-hidden="true">
      {heights.map((height, col) =>
        Array.from({ length: height }, (_, row) => (
          <circle
            key={`${col}-${row}`}
            className="twinkle"
            cx={48 + col * 24}
            cy={128 - row * 13}
            r={4.5}
            fill={col === 5 || col === 6 ? BRAND : INK}
            style={{ '--delay': `${col * 0.15 + row * 0.08}s`, '--dur': '2.6s' } as Style}
          />
        )),
      )}
      <path d="M32 142 H208" {...stroke} />
    </svg>
  )
}

/** Step 3: the owner asks; Ansilum is typing. */
export function AskArt({ question }: { question: string }) {
  return (
    <svg viewBox="0 0 240 150" className="h-auto w-full" data-anim aria-hidden="true">
      <g className="float">
        <rect x="56" y="22" width="168" height="36" rx="12" fill={INK} />
        <text x="140" y="45" textAnchor="middle" fontSize="11.5" fontWeight={600} fill="#fff">
          {question}
        </text>
      </g>
      <g className="float" style={{ '--delay': '-2s' } as Style}>
        <rect x="16" y="78" width="84" height="36" rx="12" fill="#fff" stroke={LINE} />
        {[0, 1, 2].map((dot) => (
          <circle
            key={dot}
            cx={44 + dot * 14}
            cy={96}
            r={4}
            fill={BRAND}
            className="[animation:dot-bounce_1s_ease-in-out_infinite]"
            style={{ animationDelay: `${dot * 0.15}s`, transformBox: 'fill-box' }}
          />
        ))}
      </g>
      <Mark x={128} y={128} size={22} delay={0.6} />
    </svg>
  )
}

/** A horizontal rule with a soft glow travelling along it. */
export function PulseRule({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <div className={clsx('relative h-0.5 overflow-hidden', dark ? 'bg-white/15' : 'bg-ink', className)} data-anim aria-hidden="true">
      <div
        className={clsx(
          'absolute inset-y-0 left-0 w-full [animation:rule-run_3.6s_cubic-bezier(0.45,0,0.55,1)_infinite]',
          dark
            ? 'bg-[linear-gradient(90deg,transparent_0%,#FFC53D_10%,transparent_20%)]'
            : 'bg-[linear-gradient(90deg,transparent_0%,#FF5B1F_10%,transparent_20%)]',
        )}
      />
    </div>
  )
}

/** Dark sections: a field of dots with a few businesses lighting up and linking together. */
export function NetworkField() {
  const nodes: [number, number, string][] = [
    [90, 80, SUN],
    [250, 40, BRAND],
    [420, 110, SUN],
    [160, 220, BRAND],
    [340, 250, SUN],
    [520, 210, BRAND],
    [470, 330, SUN],
    [110, 340, SUN],
  ]
  const links: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [3, 4],
    [2, 5],
    [4, 5],
    [4, 6],
    [3, 7],
  ]
  return (
    <svg viewBox="0 0 600 400" className="h-full w-full" preserveAspectRatio="xMidYMid slice" data-anim aria-hidden="true">
      <g fill="#fff" opacity="0.14">
        {Array.from({ length: 30 * 20 }, (_, index) => (
          <circle key={index} cx={10 + (index % 30) * 20} cy={10 + Math.floor(index / 30) * 20} r={1.3} />
        ))}
      </g>
      {links.map(([from, to], index) => {
        const [x1, y1] = nodes[from]
        const [x2, y2] = nodes[to]
        const mx = (x1 + x2) / 2
        return (
          <Flow
            key={index}
            d={`M${x1} ${y1} Q ${mx} ${Math.min(y1, y2) - 40}, ${x2} ${y2}`}
            pulses={1}
            duration={3}
            offset={index * 0.45}
            track="rgb(255 255 255 / 0.22)"
            pulse={index % 2 ? SUN : BRAND}
            width={1.5}
          />
        )
      })}
      {nodes.map(([x, y, color], index) => (
        <Node key={index} x={x} y={y} r={5} color={color} delay={index * 0.35} />
      ))}
    </svg>
  )
}

/** The closing curve with a node, for the final call to action. */
export function CtaCurve({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 400" className={className} fill="none" data-anim aria-hidden="true">
      <Flow
        d="M0 340 C 160 340, 180 60, 330 60 S 520 260, 600 200"
        pulses={2}
        duration={3}
        track="rgb(17 20 24 / 0.25)"
        pulse="#fff"
        width={3}
      />
      <Node x={330} y={60} r={9} color="#fff" />
    </svg>
  )
}

/** Page headers: a short flow into the Ansilum mark over a halftone patch. */
export function HeaderArt() {
  return (
    <svg viewBox="0 0 360 220" className="h-auto w-full" data-anim aria-hidden="true">
      <Sparkles x={20} y={20} cols={14} rows={8} gap={14} color={LINE} />
      <Flow d="M0 170 C 90 170, 120 60, 220 80 S 320 150, 360 110" pulses={2} duration={3} />
      <Node x={60} y={164} r={5} color={SUN} delay={0.6} />
      <Mark x={220} y={80} size={40} />
    </svg>
  )
}
