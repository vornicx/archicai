// Pure day-level grouping for Lab Weather. No I/O, no React: tested in tests/lab-weather-days.test.mjs.
// MET points carry an INSTANT temperature and a PERIOD amount (1 h, then 6 h further out). We only:
//  - group instants by the civil date of the destination time zone;
//  - report min/max of the instants we actually have (not a true daily extreme);
//  - sum rain from non-overlapping periods that tile the whole local day (or the rest of today).
export type DayPoint = {
  time: string
  temperatureC: number | null
  precipitationMm: number | null
  periodHours: number | null
  symbolCode: string | null
}

export type DaySummary = {
  date: string // YYYY-MM-DD in the destination time zone
  start: number // local midnight (or "now" side of the partial first day), epoch ms
  end: number // next local midnight, epoch ms
  partial: boolean // first day: only the rest of today is covered
  samples: number
  minC: number | null
  maxC: number | null
  symbolCode: string | null
  symbolTime: string | null
  rainMm: number | null // null = coverage incomplete; never a guess
  resolution: 1 | 6 | 'mixed' | null
}

const HOUR = 3_600_000

export function safeTimeZone(tz: string | null | undefined): string {
  if (!tz) return 'UTC'
  try { new Intl.DateTimeFormat('en-US', { timeZone: tz }); return tz } catch { return 'UTC' }
}

const fmtCache = new Map<string, Intl.DateTimeFormat>()
function parts(ms: number, tz: string) {
  let f = fmtCache.get(tz)
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
    fmtCache.set(tz, f)
  }
  const o: Record<string, number> = {}
  for (const p of f.formatToParts(new Date(ms))) if (p.type !== 'literal') o[p.type] = Number(p.value)
  return { y: o.year, m: o.month, d: o.day, h: o.hour % 24, mi: o.minute, s: o.second }
}

/** Civil date (YYYY-MM-DD) of an instant in `tz`. */
export function localDate(ms: number, tz: string): string {
  const p = parts(ms, tz)
  return `${p.y}-${String(p.m).padStart(2, '0')}-${String(p.d).padStart(2, '0')}`
}

const offsetAt = (ms: number, tz: string) => {
  const p = parts(ms, tz)
  return Date.UTC(p.y, p.m - 1, p.d, p.h, p.mi, p.s) - Math.floor(ms / 1000) * 1000
}

/** Epoch ms of a local wall-clock time in `tz` (DST-safe; for skipped times returns the shifted instant). */
export function zonedTime(date: string, hour: number, tz: string): number {
  const [y, m, d] = date.split('-').map(Number)
  const wall = Date.UTC(y, m - 1, d, hour)
  let t = wall - offsetAt(wall, tz)
  t = wall - offsetAt(t, tz)
  return t
}

const nextDate = (date: string) => {
  const [y, m, d] = date.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d + 1)).toISOString().slice(0, 10)
}

type Interval = { s: number; e: number; mm: number | null; h: number }

/** Periods sorted by start; any period overlapping an earlier kept one is dropped (1 h wins over 6 h). */
export function nonOverlapping(points: DayPoint[]): Interval[] {
  const all = points
    .filter((p) => (p.periodHours === 1 || p.periodHours === 6 || p.periodHours === 12) && Number.isFinite(Date.parse(p.time)))
    .map((p) => ({ s: Date.parse(p.time), e: Date.parse(p.time) + (p.periodHours as number) * HOUR, mm: p.precipitationMm !== null && Number.isFinite(p.precipitationMm) ? p.precipitationMm : null, h: p.periodHours as number }))
    .sort((a, b) => a.s - b.s || a.h - b.h)
  const out: Interval[] = []
  for (const iv of all) {
    const last = out[out.length - 1]
    if (last && iv.s < last.e) continue // duplicate or overlapping period
    out.push(iv)
  }
  return out
}

/** Rain over [from, to) only if kept intervals tile it exactly with known amounts; otherwise null. */
export function coveredRain(intervals: Interval[], from: number, to: number): { mm: number; resolution: 1 | 6 | 'mixed' } | null {
  if (!(to > from)) return null
  let cursor = from, sum = 0
  const res = new Set<number>()
  for (const iv of intervals) {
    if (iv.e <= from || iv.s >= to) continue
    if (iv.s < from || iv.e > to) return null // crosses a boundary (e.g. 6 h block over midnight)
    if (iv.s !== cursor) return null // gap
    if (iv.mm === null) return null
    sum += iv.mm; cursor = iv.e; res.add(iv.h)
  }
  if (cursor !== to) return null
  return { mm: Math.round(sum * 10) / 10, resolution: res.size === 1 ? ([...res][0] === 1 ? 1 : 6) : 'mixed' }
}

/**
 * Up to `limit` local days starting with today in `tz`. Instants before the hour in progress are ignored.
 * Today is partial: its rain covers from the start of the interval in progress to local midnight.
 */
export function dailySummaries(points: DayPoint[], now: number, timeZone: string, limit = 7): DaySummary[] {
  const tz = safeTimeZone(timeZone)
  const valid = points.filter((p) => Number.isFinite(Date.parse(p.time)))
  if (!valid.length) return []
  const intervals = nonOverlapping(valid)
  const firstStart = intervals.find((iv) => iv.e > now)?.s ?? null
  const cutoff = now - HOUR
  const instants = new Map<number, DayPoint>()
  for (const p of valid) { const t = Date.parse(p.time); if (t >= cutoff && !instants.has(t)) instants.set(t, p) }
  const sortedInstants = [...instants.entries()].sort((a, b) => a[0] - b[0])
  if (!sortedInstants.length) return []

  const days: DaySummary[] = []
  let date = localDate(now, tz)
  const lastTime = sortedInstants[sortedInstants.length - 1][0]
  for (let i = 0; i < limit; i++) {
    const start = zonedTime(date, 0, tz)
    const end = zonedTime(nextDate(date), 0, tz)
    if (start > lastTime) break
    const partial = i === 0
    const inDay = sortedInstants.filter(([t]) => t >= start && t < end && (!partial || t >= cutoff))
    const temps = inDay.map(([, p]) => p.temperatureC).filter((v): v is number => v !== null && Number.isFinite(v))
    const noon = zonedTime(date, 12, tz)
    let sym: [number, DayPoint] | null = null
    for (const e of inDay) if (e[1].symbolCode && (!sym || Math.abs(e[0] - noon) < Math.abs(sym[0] - noon))) sym = e
    const rainFrom = partial ? firstStart : start
    const rain = rainFrom === null ? null : coveredRain(intervals, Math.max(rainFrom, start), end)
    days.push({
      date, start: partial && firstStart !== null ? Math.max(firstStart, start) : start, end, partial,
      samples: inDay.length,
      minC: temps.length ? Math.min(...temps) : null,
      maxC: temps.length ? Math.max(...temps) : null,
      symbolCode: sym ? sym[1].symbolCode : null,
      symbolTime: sym ? sym[1].time : null,
      rainMm: rain ? rain.mm : null,
      resolution: rain ? rain.resolution : null,
    })
    date = nextDate(date)
  }
  // Drop trailing days with no instants at all (end of the model horizon).
  while (days.length && days[days.length - 1].samples === 0) days.pop()
  return days
}

/** Shared scale for the range bars: min/max over all days with samples, padded to whole degrees. */
export function rangeScale(days: DaySummary[]): { lo: number; hi: number } | null {
  const lo = Math.min(...days.map((d) => d.minC ?? Infinity)), hi = Math.max(...days.map((d) => d.maxC ?? -Infinity))
  if (!Number.isFinite(lo) || !Number.isFinite(hi)) return null
  return { lo: Math.floor(lo), hi: Math.max(Math.ceil(hi), Math.floor(lo) + 1) }
}
