import type { Condition } from './weatherSymbol'

// Line glyphs drawn for Weather only. They render what MET's symbol_code states; decorative to AT
// because the condition text is always shown next to them.
export function WeatherGlyph({ condition, size = 24 }: { condition: Condition | null; size?: number }) {
  if (!condition) return null
  const night = condition.period === 'night'
  const body = (() => {
    const sun = <><circle cx="16" cy="15" r="5" />{[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <line key={a} x1="16" y1="6" x2="16" y2="7.8" transform={`rotate(${a} 16 15)`} />)}</>
    const moon = <path d="M19.5 9.2a6.5 6.5 0 1 0 4.3 9.4 5.2 5.2 0 0 1-4.3-9.4Z" />
    const cloud = (y = 0) => <path transform={`translate(0 ${y})`} d="M10 26h13.5a5 5 0 0 0 .6-9.96A7 7 0 0 0 10.6 17 4.5 4.5 0 0 0 10 26Z" />
    const drops = (n: number) => Array.from({ length: n }, (_, i) => <line key={i} x1={12 + i * 4.5} y1="28.5" x2={11 + i * 4.5} y2="31" />)
    const flakes = (n: number) => Array.from({ length: n }, (_, i) => <circle key={i} cx={12.5 + i * 4.5} cy="29.6" r=".9" className="fill" />)
    const bolt = <path className="fill" d="M18.5 22.5 15 28h3l-1.5 4 4.5-6h-3l1.5-3.5Z" />
    const c = condition
    if (c.family === 'clear') return night ? moon : sun
    if (c.family === 'fair' || c.family === 'partly') return <><g transform="translate(-4 -5) scale(.8)">{night ? moon : sun}</g>{cloud(c.family === 'fair' ? 2 : 0)}</>
    if (c.family === 'cloudy') return cloud()
    if (c.family === 'fog') return <>{[14, 19, 24].map((y, i) => <line key={y} x1={7 + i * 2} y1={y} x2={27 - i} y2={y} />)}</>
    const n = c.intensity === 'light' ? 2 : c.intensity === 'heavy' ? 4 : 3
    return <g transform="translate(0 -4)">
      {c.showers && <g transform="translate(-4 -1) scale(.7)">{night ? moon : sun}</g>}
      {cloud()}
      {c.thunder ? bolt : c.family === 'snow' ? flakes(n) : c.family === 'sleet' ? <>{drops(Math.ceil(n / 2))}{flakes(Math.floor(n / 2) || 1)}</> : drops(n)}
    </g>
  })()
  return (
    <svg className="lw-glyph" width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false"
      fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">{body}</svg>
  )
}
