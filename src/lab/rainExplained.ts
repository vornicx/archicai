import type { HourPoint } from './weatherMath'

const HOUR = 3_600_000
// Presentation threshold only, not an official meteorological intensity threshold.
export const WET_HOUR_MM = 0.1
export type RainMode = 6 | 24 | 'episode'
export type RainHour = { time: string; end: string; mm: number; index: number }
export type RainWindow = { start: string; end: string; startIndex: number; length: number; total: number; share: number | null }
export type RainPattern = 'dry' | 'trace' | 'distributed' | 'intermittent' | 'concentrated' | 'light'
export type RainMetrics = {
  hours: RainHour[]; rainTotal: number; wetHours: number; firstWet: RainHour | null; lastWet: RainHour | null
  peak: RainHour; wetStreak: number; dryGaps: number; top3Share: number | null; main3hWindow: RainWindow
  cumulative: number[]; pattern: RainPattern
}
export type RainExplanation = { available: true; mode: RainMode; metrics: RainMetrics } | { available: false; mode: RainMode; reason: 'coverage' | 'no-episode' }

/** First contiguous window wins equal-volume ties. Never calls separated hours a time window. */
export function findMainRainWindow(hours: RainHour[]): RainWindow | null {
  if (!hours.length) return null
  const length = Math.min(3, hours.length)
  let startIndex = 0, total = -1
  for (let i = 0; i <= hours.length - length; i++) {
    const sum = hours.slice(i, i + length).reduce((s, h) => s + h.mm, 0)
    if (sum > total) { total = sum; startIndex = i }
  }
  const all = hours.reduce((s, h) => s + h.mm, 0)
  return { start: hours[startIndex].time, end: hours[startIndex + length - 1].end, startIndex, length, total, share: all > 0 ? total / all : null }
}

/** Pattern, NOT official intensity: concentration >=70% only with total >=1 mm;
 * otherwise internal dry gaps, then low hourly amounts (<0.5 mm), then distributed. */
export function classifyRainPattern(m: Pick<RainMetrics, 'rainTotal' | 'dryGaps' | 'peak' | 'main3hWindow'>): RainPattern {
  if (m.rainTotal === 0) return 'dry'
  if (m.rainTotal < WET_HOUR_MM) return 'trace'
  if (m.rainTotal >= 1 && (m.main3hWindow.share ?? 0) >= 0.7) return 'concentrated'
  if (m.dryGaps > 0) return 'intermittent'
  if (m.peak.mm < 0.5) return 'light'
  return 'distributed'
}

/** No sorting, deduplication, interpolation or 6h conversion: reject malformed selected coverage. */
export function buildRainExplanation(points: HourPoint[], mode: RainMode): RainExplanation {
  const count = mode === 'episode' ? 24 : mode
  if (points.length < count) return { available: false, mode, reason: 'coverage' }
  const hours: RainHour[] = []
  for (let i = 0; i < count; i++) {
    const p = points[i], ms = Date.parse(p.time), mm = p.precipitationMm
    if (p.periodHours !== 1 || !Number.isFinite(ms) || mm === null || !Number.isFinite(mm) || mm < 0 || (i > 0 && ms !== Date.parse(points[i - 1].time) + HOUR)) {
      return { available: false, mode, reason: 'coverage' }
    }
    hours.push({ time: p.time, end: new Date(ms + HOUR).toISOString(), mm, index: i })
  }
  const first = hours.findIndex((h) => h.mm >= WET_HOUR_MM)
  let last = -1
  hours.forEach((h, i) => { if (h.mm >= WET_HOUR_MM) last = i })
  const chosen = mode === 'episode' ? hours.slice(first, last + 1) : hours
  if (mode === 'episode' && first < 0) return { available: false, mode, reason: 'no-episode' }
  const main3hWindow = findMainRainWindow(chosen)
  if (!main3hWindow) return { available: false, mode, reason: 'coverage' }
  const wet = chosen.filter((h) => h.mm >= WET_HOUR_MM)
  let streak = 0, wetStreak = 0, dryGaps = 0, inGap = false
  const firstWet = wet[0] ?? null, lastWet = wet[wet.length - 1] ?? null
  for (const h of chosen) {
    if (h.mm >= WET_HOUR_MM) { wetStreak = Math.max(wetStreak, ++streak); inGap = false }
    else {
      streak = 0
      if (firstWet && lastWet && h.index > firstWet.index && h.index < lastWet.index && !inGap) { dryGaps++; inGap = true }
    }
  }
  const cumulative = [0]
  for (const h of chosen) cumulative.push(cumulative[cumulative.length - 1] + h.mm)
  const rainTotal = cumulative[cumulative.length - 1]
  const peak = chosen.reduce((a, b) => b.mm > a.mm ? b : a)
  const top3 = [...chosen].sort((a, b) => b.mm - a.mm).slice(0, 3).reduce((s, h) => s + h.mm, 0)
  const base = { hours: chosen, rainTotal, wetHours: wet.length, firstWet, lastWet, peak, wetStreak, dryGaps, top3Share: rainTotal > 0 ? top3 / rainTotal : null, main3hWindow, cumulative }
  return { available: true, mode, metrics: { ...base, pattern: classifyRainPattern(base) } }
}

export function formatRainAmount(value: number, locale: string): string {
  // Preserve small nonzero amounts rather than silently rounding them to dry zero.
  return new Intl.NumberFormat(locale, { maximumFractionDigits: value > 0 && value < 0.1 ? 3 : 1 }).format(value)
}
export function rainInterval(start: string, end: string, locale: string, timeZone: string): string {
  const f = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone })
  return `${f.format(new Date(start))} – ${f.format(new Date(end))}`
}
export const RAIN_PATTERN_LABELS = {
  es: { dry: 'Sin lluvia prevista', trace: 'Sin lluvia apreciable', distributed: 'Principalmente repartida', intermittent: 'Lluvia intermitente', concentrated: 'Lluvia concentrada', light: 'Cantidades pequeñas, repartidas' },
  en: { dry: 'No rainfall forecast', trace: 'No appreciable rainfall', distributed: 'Mostly distributed', intermittent: 'Intermittent rainfall', concentrated: 'Concentrated rainfall', light: 'Small, distributed amounts' },
}
export function buildRainNarrative(explanation: RainExplanation, lang: 'es' | 'en', locale: string, timeZone: string): { lead: string; detail: string } {
  if (!explanation.available) return { lead: explanation.reason === 'coverage' ? (lang === 'es' ? 'No hay datos suficientes para esta ventana.' : 'Not enough data for this window.') : (lang === 'es' ? 'No hay un episodio calculable en estos 24 intervalos.' : 'No calculable episode in these 24 intervals.'), detail: '' }
  const m = explanation.metrics, a = m.hours[0], b = m.hours[m.hours.length - 1]
  const amount = formatRainAmount(m.rainTotal, locale), unit = lang === 'es' ? 'l/m²' : 'mm'
  const lead = lang === 'es' ? `El modelo prevé ${amount} ${unit} entre ${rainInterval(a.time, b.end, locale, timeZone)}.` : `The model forecasts ${amount} ${unit} between ${rainInterval(a.time, b.end, locale, timeZone)}.`
  if (m.rainTotal === 0) return { lead, detail: lang === 'es' ? 'Todos los intervalos de esta ventana tienen 0 mm previstos.' : 'Every interval in this window has 0 mm forecast.' }
  const w = m.main3hWindow
  const pct = new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 0 }).format(w.share ?? 0)
  const distribution = lang === 'es' ? (m.dryGaps ? 'Se alternan intervalos con lluvia apreciable y sin ella.' : 'Lluvia repartida entre varias horas.') : (m.dryGaps ? 'Intervals with and without appreciable rain alternate.' : 'Rainfall is spread across several hours.')
  const detail = lang === 'es' ? `El tramo más lluvioso dentro de esta ventana es ${rainInterval(w.start, w.end, locale, timeZone)}: ${pct} del total en ${w.length} h.` : `The rainiest stretch within this window is ${rainInterval(w.start, w.end, locale, timeZone)}: ${pct} of the total in ${w.length} h.`
  return { lead, detail: `${detail} ${m.wetHours > 1 ? distribution : ''}`.trim() }
}