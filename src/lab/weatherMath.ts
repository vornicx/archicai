// Pure helpers for Lab Weather. No I/O, no React: unit-tested in tests/lab-weather-math.test.mjs.
export type HourPoint = {
  time: string
  periodHours: number | null
  precipitationMm: number | null
}

const HOUR = 3_600_000

/**
 * Hourly intervals starting with the one in progress at `now` (its end is still in the future),
 * followed only by strictly contiguous 1-hour intervals. Stops at the first gap or non-hourly period,
 * so 6 h / 12 h blocks are never mixed in and no fully elapsed hour is included.
 */
export function upcomingHourly<T extends HourPoint>(points: T[], now: number, limit = 24): T[] {
  const sorted = points
    .filter((p) => p.periodHours === 1 && Number.isFinite(Date.parse(p.time)))
    .sort((a, b) => Date.parse(a.time) - Date.parse(b.time))
  const startIndex = sorted.findIndex((p) => Date.parse(p.time) + HOUR > now)
  if (startIndex < 0) return []
  const out: T[] = [sorted[startIndex]]
  for (let i = startIndex + 1; i < sorted.length && out.length < limit; i++) {
    const prev = Date.parse(out[out.length - 1].time)
    if (Date.parse(sorted[i].time) !== prev + HOUR) break
    out.push(sorted[i])
  }
  return out
}

/** Rain total over the next `hours` contiguous hourly intervals, or null when coverage is incomplete. */
export function rainTotal(hourly: HourPoint[], hours: number): number | null {
  if (hourly.length < hours) return null
  const slice = hourly.slice(0, hours)
  if (slice.some((p) => p.precipitationMm === null || !Number.isFinite(p.precipitationMm))) return null
  const sum = slice.reduce((acc, p) => acc + (p.precipitationMm as number), 0)
  return Math.round(sum * 10) / 10
}

/** Honest chart scale: always starts at 0; with no rain uses a 1 mm ceiling so bars render at zero height. */
export function chartMax(hourly: HourPoint[]): number {
  const values = hourly.map((p) => p.precipitationMm).filter((v): v is number => v !== null && Number.isFinite(v))
  const max = values.length ? Math.max(...values) : 0
  if (max <= 0) return 1
  if (max <= 1) return 1
  if (max <= 2) return 2
  if (max <= 5) return 5
  return Math.ceil(max / 5) * 5
}

/** A future model sample cannot be labelled "Now". All instants are absolute, DST-safe. */
export function isCurrentForecastHour(start:string,now:number):boolean{
  const ms=Date.parse(start)
  return Number.isFinite(ms)&&Number.isFinite(now)&&ms<=now&&now<ms+3_600_000
}
