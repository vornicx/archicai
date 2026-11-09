// MET Norway symbol_code → honest condition (pure, tested in tests/lab-weather-symbol.test.mjs).
// Only what the code itself states is derived: family, intensity, showers, thunder and the day/night suffix.
export type Family = 'clear' | 'fair' | 'partly' | 'cloudy' | 'fog' | 'rain' | 'sleet' | 'snow'
export type Condition = {
  family: Family
  intensity: 'light' | 'normal' | 'heavy'
  showers: boolean
  thunder: boolean
  period: 'day' | 'night' | 'twilight' | null
}
export type Tone = 'clear' | 'night' | 'partly' | 'overcast' | 'wet' | 'snow' | 'storm' | 'neutral'

const SKY: Record<string, Family> = { clearsky: 'clear', fair: 'fair', partlycloudy: 'partly', cloudy: 'cloudy', fog: 'fog' }
const PRECIP = /^(light|heavy)?s?(rain|sleet|snow)(showers)?(andthunder)?$/

export function parseSymbol(code: string | null | undefined): Condition | null {
  if (!code) return null
  const m = /^([a-z]+?)(?:_(day|night|polartwilight))?$/.exec(code)
  if (!m) return null
  const base = m[1]
  const period = m[2] === 'polartwilight' ? 'twilight' : (m[2] as 'day' | 'night' | undefined) ?? null
  if (SKY[base]) return { family: SKY[base], intensity: 'normal', showers: false, thunder: false, period }
  const p = PRECIP.exec(base)
  if (!p) return null
  return { family: p[2] as Family, intensity: (p[1] as 'light' | 'heavy' | undefined) ?? 'normal', showers: Boolean(p[3]), thunder: Boolean(p[4]), period }
}

const L = {
  es: {
    clear: 'Despejado', fair: 'Poco nuboso', partly: 'Parcialmente nuboso', cloudy: 'Nuboso', fog: 'Niebla',
    kind: { rain: 'lluvia', sleet: 'aguanieve', snow: 'nieve' },
    light: 'débil', heavy: 'fuerte', lightShowers: 'débiles', heavyShowers: 'fuertes', thunder: 'y tormenta',
  },
  en: {
    clear: 'Clear sky', fair: 'Fair', partly: 'Partly cloudy', cloudy: 'Cloudy', fog: 'Fog',
    kind: { rain: 'rain', sleet: 'sleet', snow: 'snow' },
    light: 'Light', heavy: 'Heavy', thunder: 'and thunder',
  },
} as const

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export function conditionLabel(c: Condition | null, lang: 'es' | 'en'): string | null {
  if (!c) return null
  if (c.family === 'clear' || c.family === 'fair' || c.family === 'partly' || c.family === 'cloudy' || c.family === 'fog') return L[lang][c.family]
  const kind = c.family as 'rain' | 'sleet' | 'snow'
  let out: string
  if (lang === 'es') {
    const k = L.es.kind[kind]
    if (c.showers) out = `Chubascos${c.intensity === 'light' ? ' débiles' : c.intensity === 'heavy' ? ' fuertes' : ''} de ${k}`
    else out = cap(k) + (c.intensity === 'light' ? ' débil' : c.intensity === 'heavy' ? ' fuerte' : '')
    if (c.thunder) out += ' y tormenta'
  } else {
    const k = L.en.kind[kind]
    out = (c.intensity === 'light' ? 'Light ' : c.intensity === 'heavy' ? 'Heavy ' : '') + k + (c.showers ? ' showers' : '')
    out = cap(out)
    if (c.thunder) out += ' and thunder'
  }
  return out
}

export function skyTone(c: Condition | null): Tone {
  if (!c) return 'neutral'
  if (c.thunder) return 'storm'
  if (c.family === 'snow') return 'snow'
  if (c.family === 'rain' || c.family === 'sleet') return 'wet'
  if (c.family === 'cloudy' || c.family === 'fog') return 'overcast'
  if (c.period === 'night') return 'night'
  return c.family === 'partly' ? 'partly' : 'clear'
}
