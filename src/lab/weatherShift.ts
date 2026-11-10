// Weather Shift v1: local browser snapshots of model forecasts, NOT measured rain.
// The public MET API exposes current global forecasts, not global historic forecast versions.
// No device geolocation or arbitrary coordinates may be saved.
export type ShiftSourcePoint = { time: string; periodHours: number | null; precipitationMm: number | null }
export type ForecastSnapshot = {
  issuedAt: string
  savedAt: number
  hours: { time: string; rainMm: number | null }[]
}
export type ShiftEntry = { cityId: string; latest: ForecastSnapshot; previous?: ForecastSnapshot }
export type ShiftStore = { version: 1; entries: ShiftEntry[] }
export type ShiftComparison = {
  hours: 6 | 12 | 24
  from: string
  until: string
  beforeMm: number
  afterMm: number
  deltaMm: number
  previousModel: string
  currentModel: string
}
export type ShiftOutcome = {
  store: ShiftStore
  state: 'baseline' | 'same' | 'changed' | 'insufficient' | 'stale'
  comparison: ShiftComparison | null
}
const HOUR = 3_600_000
const DAY = 24 * HOUR
export const SHIFT_STORAGE_KEY = 'archic-weather-shift-v1'
export const emptyShiftStore = (): ShiftStore => ({ version: 1, entries: [] })

export function eligibleShiftCity(id: string): boolean {
  return /^(ecija|sevilla|madrid|london|new-york|tokyo)$/.test(id)
    || /^geonames:[1-9][0-9]{0,11}$/.test(id)
}
function validDate(v: string) { return typeof v === 'string' && Number.isFinite(Date.parse(v)) }
function validRain(v: unknown): v is number | null {
  return v === null || typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 1000
}
function validSnapshot(s: unknown): s is ForecastSnapshot {
  if (!s || typeof s !== 'object') return false
  const p = s as Partial<ForecastSnapshot>
  return validDate(p.issuedAt ?? '') && typeof p.savedAt === 'number'
    && Number.isFinite(p.savedAt) && Array.isArray(p.hours)
    && p.hours.length >= 6 && p.hours.length <= 55
    && p.hours.every(h => !!h && validDate(h.time) && validRain(h.rainMm))
}
export function parseShiftStore(text: string | null, now: number): ShiftStore {
  if (!text || text.length > 120_000) return emptyShiftStore()
  try {
    const data = JSON.parse(text) as Partial<ShiftStore>
    if (data.version !== 1 || !Array.isArray(data.entries)) return emptyShiftStore()
    const entries: ShiftEntry[] = []
    for (const e of data.entries.slice(0, 32)) {
      if (!e || !eligibleShiftCity(e.cityId) || !validSnapshot(e.latest)
        || e.latest.savedAt < now - 30 * DAY || e.latest.savedAt > now + HOUR) continue
      const prev = validSnapshot(e.previous) && e.previous.savedAt >= now - 30 * DAY ? e.previous : undefined
      if (!entries.some(x => x.cityId === e.cityId)) entries.push({ cityId: e.cityId, latest: e.latest, ...(prev ? { previous: prev } : {}) })
    }
    return { version: 1, entries: entries.slice(0, 8) }
  } catch { return emptyShiftStore() }
}
export function snapshotForecast(issuedAt: string | null, points: ShiftSourcePoint[], now: number): ForecastSnapshot | null {
  if (!issuedAt || !validDate(issuedAt) || !Number.isFinite(now)) return null
  const times = new Set<string>()
  const hours = [...points]
    .filter(p => p.periodHours === 1 && validDate(p.time) && validRain(p.precipitationMm))
    .sort((a, b) => Date.parse(a.time) - Date.parse(b.time))
    .filter(p => {
      const ms = Date.parse(p.time)
      if (ms < now - HOUR || ms > now + 55 * HOUR || times.has(p.time)) return false
      times.add(p.time)
      return true
    })
    .slice(0, 50)
    .map(p => ({ time: p.time, rainMm: p.precipitationMm }))
  return hours.length >= 6 ? { issuedAt, savedAt: now, hours } : null
}

/** Compare forecast volumes for exactly the same FUTURE UTC hourly intervals in both versions.
 * Never compare a previous 24h rolling total against a different 24h rolling horizon.
 * Requires 6, 12 or 24 complete consecutive one-hour amounts in both snapshots. */
export function compareShift(previous: ForecastSnapshot, current: ForecastSnapshot, now: number): ShiftComparison | null {
  if (!validSnapshot(previous) || !validSnapshot(current)
    || Date.parse(current.issuedAt) <= Date.parse(previous.issuedAt)) return null
  const prev = new Map(previous.hours.map(h => [h.time, h.rainMm]))
  const available = current.hours
    .filter(h => Date.parse(h.time) >= now && h.rainMm !== null && prev.has(h.time) && prev.get(h.time) !== null)
    .sort((a, b) => Date.parse(a.time) - Date.parse(b.time))
  for (const span of [24, 12, 6] as const) {
    for (let i = 0; i + span <= available.length; i++) {
      const start = Date.parse(available[i].time)
      const rows = available.slice(i, i + span)
      if (!rows.every((h, n) => Date.parse(h.time) === start + n * HOUR)) continue
      const after = rows.reduce((sum, h) => sum + (h.rainMm as number), 0)
      const before = rows.reduce((sum, h) => sum + (prev.get(h.time) as number), 0)
      return {
        hours: span, from: rows[0].time, until: new Date(start + span * HOUR).toISOString(),
        beforeMm: before, afterMm: after, deltaMm: after - before,
        previousModel: previous.issuedAt, currentModel: current.issuedAt,
      }
    }
  }
  return null
}
export function updateShiftStore(store: ShiftStore, cityId: string, current: ForecastSnapshot, now: number): ShiftOutcome {
  if (!eligibleShiftCity(cityId) || !validSnapshot(current)) {
    return { store, state: 'stale', comparison: null }
  }
  const existing = store.entries.find(e => e.cityId === cityId)
  let latest: ShiftEntry
  if (!existing) latest = { cityId, latest: current }
  else if (Date.parse(current.issuedAt) > Date.parse(existing.latest.issuedAt)) {
    latest = { cityId, latest: current, previous: existing.latest }
  } else if (Date.parse(current.issuedAt) === Date.parse(existing.latest.issuedAt)) {
    // Existing previous version lets a user inspect the same shift after reloading the page.
    latest = existing
  } else {
    return { store, state: 'stale', comparison: null }
  }
  const entries = [latest, ...store.entries.filter(e => e.cityId !== cityId && e.latest.savedAt >= now - 30 * DAY)].slice(0, 8)
  const nextStore: ShiftStore = { version: 1, entries }
  const comparison = latest.previous ? compareShift(latest.previous, latest.latest, now) : null
  return {
    store: nextStore,
    state: !latest.previous ? 'baseline' : !comparison ? 'insufficient' : Math.abs(comparison.deltaMm) < 0.05 ? 'same' : 'changed',
    comparison,
  }
}
