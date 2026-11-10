// Deterministic, conservative hourly-window finder. No network requests or model predictions are generated here.
export type WindowHour = {
  time: string
  periodHours: number | null
  precipitationMm: number | null
  temperatureC: number | null
  windKmh: number | null
}
export type WindowCriteria = {
  duration: 1 | 2 | 3
  rainMax: number // largest acceptable forecast amount in any single hour (mm)
  windMax: number // km/h
  tempMin: number // sampled Celsius
  tempMax: number
}
export type ForecastWindow = {
  start: string
  end: string
  rainMm: number
  peakRainMm: number
  windMaxKmh: number
  tempMinC: number
  tempMaxC: number
  meetsCriteria: boolean
  score: number
}
export type WindowFitIssue = 'rain' | 'wind' | 'temperature'
/** Explain precisely which configured limits this already-ranked interval exceeds. */
export function windowFitIssues(w: ForecastWindow, criteria: WindowCriteria): WindowFitIssue[] {
  const issues: WindowFitIssue[] = []
  if (w.peakRainMm > criteria.rainMax + 1e-9) issues.push('rain')
  if (w.windMaxKmh > criteria.windMax + 1e-9) issues.push('wind')
  if (w.tempMinC < criteria.tempMin - 1e-9 || w.tempMaxC > criteria.tempMax + 1e-9) issues.push('temperature')
  return issues
}
export type WindowSearchResult = { windows: ForecastWindow[]; matchesFound: boolean; candidates: number }
const HOUR = 3_600_000

export type WindowDay = { key: string; startsAt: string }
export type WindowDayFilter = { dayKey?: string; timeZone: string; startHour?: number; endHour?: number }

/** A civil calendar date in the forecast destination's zone, not in the visitor's zone.
 * Absolute hourly instants remain distinct through DST clock changes. */
export function localWindowDay(time: string, timeZone: string): string | null {
  const ms = Date.parse(time)
  if (!Number.isFinite(ms)) return null
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
    })
    const parts = formatter.formatToParts(new Date(ms))
    const get = (type: string) => parts.find(part => part.type === type)?.value
    const year = get('year'), month = get('month'), day = get('day')
    return year && month && day ? `${year}-${month}-${day}` : null
  } catch {
    return null
  }
}

export const WINDOW_PRESETS: Record<'walk' | 'sport' | 'outdoors', WindowCriteria> = {
  walk: { duration: 2, rainMax: 0.3, windMax: 25, tempMin: 8, tempMax: 30 },
  sport: { duration: 1, rainMax: 0.1, windMax: 20, tempMin: 5, tempMax: 28 },
  outdoors: { duration: 3, rainMax: 0.5, windMax: 30, tempMin: 5, tempMax: 32 },
}

function validCriteria(c: WindowCriteria): boolean {
  return [c.duration, c.rainMax, c.windMax, c.tempMin, c.tempMax].every(Number.isFinite)
    && [1, 2, 3].includes(c.duration)
    && c.rainMax >= 0 && c.rainMax <= 20
    && c.windMax >= 0 && c.windMax <= 150
    && c.tempMin >= -50 && c.tempMax <= 60 && c.tempMin <= c.tempMax
}
function validHour(p: WindowHour): boolean {
  return p.periodHours === 1
    && Number.isFinite(Date.parse(p.time))
    && p.precipitationMm !== null && Number.isFinite(p.precipitationMm) && p.precipitationMm >= 0
    && p.temperatureC !== null && Number.isFinite(p.temperatureC)
    && p.windKmh !== null && Number.isFinite(p.windKmh) && p.windKmh >= 0
}

/** Only complete, future (not in-progress), strictly contiguous hourly intervals can be ranked.
 * Incomplete or non-hourly forecasts are skipped, never treated as calm or dry.
 * A fallback is explicitly marked when none satisfies every user-defined criterion. */
/** Optional local-clock range is explicit, never inferred from sunrise/sunset. */
function windowMatchesScope(w: ForecastWindow, scope: WindowDayFilter): boolean {
  if (scope.dayKey && localWindowDay(w.start, scope.timeZone) !== scope.dayKey) return false
  const from = scope.startHour, until = scope.endHour
  if (from === undefined && until === undefined) return true
  if (from === undefined || until === undefined || !Number.isInteger(from) || !Number.isInteger(until)
    || from < 0 || until > 23 || from >= until) return false
  // The chosen usual-hours range always describes one destination-local day.
  const localStartDay = localWindowDay(w.start, scope.timeZone)
  if (!localStartDay || localStartDay !== localWindowDay(w.end, scope.timeZone)) return false
  try {
    const format = new Intl.DateTimeFormat('en-US', { timeZone: scope.timeZone, hour: '2-digit', hourCycle: 'h23' })
    const hourOf = (s: string) => Number(format.formatToParts(new Date(s)).find(p => p.type === 'hour')?.value)
    const startHour = hourOf(w.start), endHour = hourOf(w.end)
    return Number.isInteger(startHour) && Number.isInteger(endHour) && startHour >= from && endHour <= until
  } catch {
    return false
  }
}

export function findWeatherWindows(hours: WindowHour[], now: number, criteria: WindowCriteria, dayFilter?: WindowDayFilter): WindowSearchResult {
  const empty: WindowSearchResult = { windows: [], matchesFound: false, candidates: 0 }
  if (!Number.isFinite(now) || !validCriteria(criteria)) return empty
  const sorted = [...hours].sort((a, b) => Date.parse(a.time) - Date.parse(b.time))
  const candidates: ForecastWindow[] = []
  for (let i = 0; i + criteria.duration <= sorted.length; i++) {
    const slice = sorted.slice(i, i + criteria.duration)
    const startMs = Date.parse(slice[0].time)
    if (startMs < now || !slice.every(validHour)) continue
    if (slice.some((p, j) => Date.parse(p.time) !== startMs + j * HOUR)) continue
    const rain = slice.map(p => p.precipitationMm as number)
    const temp = slice.map(p => p.temperatureC as number)
    const wind = slice.map(p => p.windKmh as number)
    const peakRainMm = Math.max(...rain)
    const rainMm = rain.reduce((a, b) => a + b, 0)
    const windMaxKmh = Math.max(...wind)
    const tempMinC = Math.min(...temp)
    const tempMaxC = Math.max(...temp)
    const rainExcess = rain.reduce((s, v) => s + Math.max(0, v - criteria.rainMax), 0)
    const windExcess = wind.reduce((s, v) => s + Math.max(0, v - criteria.windMax), 0)
    const tempExcess = temp.reduce((s, v) => s + Math.max(0, criteria.tempMin - v, v - criteria.tempMax), 0)
    const meetsCriteria = rainExcess === 0 && windExcess === 0 && tempExcess === 0
    const hoursFromNow = (startMs - now) / HOUR
    const score = rainExcess * 32 + windExcess * 2 + tempExcess * 4 + rainMm * 6
      + windMaxKmh * 0.03 + hoursFromNow * 0.015
    candidates.push({ start: slice[0].time, end: new Date(startMs + criteria.duration * HOUR).toISOString(),
      rainMm, peakRainMm, windMaxKmh, tempMinC, tempMaxC, meetsCriteria, score })
  }
  // Filter before ranking, so the best window of tomorrow cannot disappear behind
  // the top three from today. The day refers to the START in the destination's zone.
  const filtered = dayFilter ? candidates.filter(w => windowMatchesScope(w, dayFilter)) : candidates
  const matchesFound = filtered.some(w => w.meetsCriteria)
  // Strict matches always beat closest alternatives. Return distinct, non-overlapping windows.
  const ranked = filtered.filter(w => !matchesFound || w.meetsCriteria)
    .sort((a, b) => a.score - b.score || Date.parse(a.start) - Date.parse(b.start))
  const chosen: ForecastWindow[] = []
  for (const w of ranked) {
    if (chosen.every(c => Date.parse(w.end) <= Date.parse(c.start) || Date.parse(w.start) >= Date.parse(c.end))) chosen.push(w)
    if (chosen.length === 3) break
  }
  return { windows: chosen, matchesFound, candidates: filtered.length }
}

/** Days with at least one evaluable, fully known future candidate of the selected duration.
 * Uses the same candidate checks as the recommendations; never labels a day available
 * based merely on an isolated point, missing values or a 6h/12h aggregate. */
export function availableWindowDays(hours: WindowHour[], now: number, criteria: WindowCriteria, timeZone: string, hoursRange?: { startHour: number; endHour: number }): WindowDay[] {
  if (!Number.isFinite(now)) return []
  const possibleDays = new Map<string, string>()
  for (const hour of hours) {
    const ms = Date.parse(hour.time)
    if (!Number.isFinite(ms) || ms < now || hour.periodHours !== 1) continue
    const key = localWindowDay(hour.time, timeZone)
    if (key && (!possibleDays.has(key) || ms < Date.parse(possibleDays.get(key)!))) {
      possibleDays.set(key, hour.time)
    }
  }
  return [...possibleDays.entries()]
    .filter(([dayKey]) => findWeatherWindows(hours, now, criteria, { dayKey, timeZone, ...hoursRange }).candidates > 0)
    .map(([key, startsAt]) => ({ key, startsAt }))
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt))
}
