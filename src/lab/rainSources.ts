// Rain source selection for Lab Weather. Pure; tested in tests/lab-rain-sources.test.mjs.
// Editorial priority (NOT a claim of accuracy): AEMET municipal forecast where mapped and fresh,
// then Open-Meteo best match, then MET Norway. A source is used only if it covers the whole window.
export type RainHour = { time: string; mm: number }
export type RainSourceId = 'aemet' | 'om_best_match' | 'om_ecmwf' | 'om_gfs' | 'om_icon' | 'met'
export type RainSeries = { id: RainSourceId; status: 'ok' | 'unavailable' | 'stale' | 'invalid'; issuedAt: string | null; hours: RainHour[]; municipality?: { id: string; name: string } }
export type RainBlock = { fetchedAt: string; series: RainSeries[] }
type P = { time: string; periodHours: number | null; precipitationMm: number | null }

const HOUR = 3_600_000
export const PRIORITY: RainSourceId[] = ['aemet', 'om_best_match', 'met']
export const COMPARE: RainSourceId[] = ['aemet', 'om_best_match', 'om_ecmwf', 'om_gfs', 'om_icon', 'met']
/** Conflict = absolute difference above 5 mm AND above 30 % of the primary total. Presentation rule, not calibrated confidence. */
export const DISAGREE_MM = 5
export const DISAGREE_RATIO = 0.3

/** First full hour after `now`: totals never count an in-progress or elapsed hour as future. */
export const nextHourStart = (now: number) => Math.floor(now / HOUR) * HOUR + HOUR

export function metSeries(points: P[]): RainSeries {
  const hours = points
    .filter((p) => p.periodHours === 1 && p.precipitationMm !== null && Number.isFinite(p.precipitationMm) && (p.precipitationMm as number) >= 0 && Number.isFinite(Date.parse(p.time)))
    .map((p) => ({ time: new Date(Date.parse(p.time)).toISOString(), mm: p.precipitationMm as number }))
  return { id: 'met', status: hours.length ? 'ok' : 'invalid', issuedAt: null, hours }
}

/** Sum of `hours` consecutive 1 h intervals starting exactly at `start`, or null if any interval is missing. */
export function windowTotal(series: RainSeries | undefined, start: number, hours: number): number | null {
  if (!series || series.status !== 'ok') return null
  const by = new Map(series.hours.map((h) => [Date.parse(h.time), h.mm]))
  let sum = 0
  for (let k = 0; k < hours; k++) {
    const v = by.get(start + k * HOUR)
    if (v === undefined || !Number.isFinite(v) || v < 0) return null
    sum += v
  }
  return Math.round(sum * 10) / 10
}

export type RainSelection = {
  primary: RainSourceId
  primarySeries: RainSeries
  windowStart: number
  hours: number
  total: number | null
  others: { id: RainSourceId; total: number }[]
  disagree: boolean
  single: boolean
  aemetStatus: RainSeries['status'] | 'not_covered'
}

export function selectRainSource(block: RainBlock | null | undefined, points: P[], now: number, hours = 24): RainSelection {
  const start = nextHourStart(now)
  const all = new Map<RainSourceId, RainSeries>()
  for (const s of block?.series ?? []) if (s && COMPARE.includes(s.id) && s.id !== 'met' && Array.isArray(s.hours)) all.set(s.id, s)
  all.set('met', metSeries(points))
  let primary: RainSourceId = 'met'
  for (const id of PRIORITY) if (windowTotal(all.get(id), start, hours) !== null) { primary = id; break }
  const total = windowTotal(all.get(primary), start, hours)
  const others = COMPARE.filter((id) => id !== primary)
    .map((id) => ({ id, total: windowTotal(all.get(id), start, hours) }))
    .filter((o): o is { id: RainSourceId; total: number } => o.total !== null)
  const disagree = total !== null && others.some((o) => Math.abs(o.total - total) > DISAGREE_MM && Math.abs(o.total - total) > DISAGREE_RATIO * total)
  const a = all.get('aemet')
  return { primary, primarySeries: all.get(primary) as RainSeries, windowStart: start, hours, total, others, disagree, single: others.length === 0,
    aemetStatus: a ? a.status : 'not_covered' }
}

/**
 * Points whose precipitation comes ONLY from the primary source: 1 h intervals take its value (null where it has none),
 * longer MET periods lose their amount when the primary is not MET, so no total ever mixes providers silently.
 */
export function applyRainSource<T extends P>(points: T[], sel: RainSelection): T[] {
  if (sel.primary === 'met') return points
  const by = new Map(sel.primarySeries.hours.map((h) => [Date.parse(h.time), h.mm]))
  return points.map((p) => {
    if (p.periodHours !== 1) return { ...p, precipitationMm: null }
    const v = by.get(Date.parse(p.time))
    return { ...p, precipitationMm: v === undefined ? null : v }
  })
}

export const SOURCE_LABEL: Record<RainSourceId, { es: string; en: string }> = {
  aemet: { es: 'AEMET · predicción municipal', en: 'AEMET · municipal forecast' },
  om_best_match: { es: 'Open-Meteo · mejor ajuste', en: 'Open-Meteo · best match' },
  om_ecmwf: { es: 'Modelo ECMWF vía Open-Meteo', en: 'ECMWF model via Open-Meteo' },
  om_gfs: { es: 'Modelo GFS vía Open-Meteo', en: 'GFS model via Open-Meteo' },
  om_icon: { es: 'Modelo ICON vía Open-Meteo', en: 'ICON model via Open-Meteo' },
  met: { es: 'MET Norway · modelo', en: 'MET Norway · model' },
}
