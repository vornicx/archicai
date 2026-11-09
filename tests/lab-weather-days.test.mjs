import { test } from 'node:test'
import assert from 'node:assert/strict'
import { dailySummaries, localDate, zonedTime, nonOverlapping, coveredRain, safeTimeZone, rangeScale } from '../src/lab/weatherDays.ts'

const H = 3600000
const pt = (iso, period, mm = 0, temp = 10, sym = 'cloudy') => ({ time: new Date(iso).toISOString(), periodHours: period, precipitationMm: mm, temperatureC: temp, symbolCode: sym })
const series = (startIso, n, period, mm = 0.5, temp = (i) => 10 + i) => Array.from({ length: n }, (_, i) => pt(Date.parse(startIso) + i * period * H, period, mm, temp(i)))

test('civil date follows the destination time zone, not UTC', () => {
  const t = Date.parse('2026-11-09T16:00:00Z')
  assert.equal(localDate(t, 'Asia/Tokyo'), '2026-11-10')
  assert.equal(localDate(t, 'America/New_York'), '2026-11-09')
})

test('local midnight is DST-aware (Madrid spring forward day lasts 23 h)', () => {
  const s = zonedTime('2026-03-29', 0, 'Europe/Madrid'), e = zonedTime('2026-03-30', 0, 'Europe/Madrid')
  assert.equal(new Date(s).toISOString(), '2026-03-28T23:00:00.000Z')
  assert.equal((e - s) / H, 23)
  const ny = zonedTime('2026-11-01', 0, 'America/New_York'), ny2 = zonedTime('2026-11-02', 0, 'America/New_York')
  assert.equal((ny2 - ny) / H, 25)
})

test('invalid time zone falls back to UTC instead of throwing', () => {
  assert.equal(safeTimeZone('Mars/Olympus'), 'UTC')
  const now = Date.parse('2026-11-09T10:30:00Z')
  const days = dailySummaries(series('2026-11-09T10:00:00Z', 48, 1), now, 'Not/AZone')
  assert.equal(days[0].date, '2026-11-09')
})

test('no data yields no days', () => {
  assert.deepEqual(dailySummaries([], Date.now(), 'Europe/Madrid'), [])
})

test('Tokyo: full hourly day sums 24 intervals; partial today covers only the rest of today', () => {
  // now 2026-11-09 10:30 JST = 01:30Z. Hourly from 01:00Z for 72 h.
  const now = Date.parse('2026-11-09T01:30:00Z')
  const days = dailySummaries(series('2026-11-09T01:00:00Z', 72, 1, 0.5), now, 'Asia/Tokyo')
  assert.equal(days[0].date, '2026-11-09')
  assert.equal(days[0].partial, true)
  assert.equal(days[0].rainMm, 7) // 10:00..24:00 JST = 14 h x 0.5
  assert.equal(days[1].date, '2026-11-10')
  assert.equal(days[1].rainMm, 12)
  assert.equal(days[1].resolution, 1)
  assert.equal(days[1].samples, 24)
})

test('min/max come only from available instants', () => {
  const now = Date.parse('2026-11-09T01:30:00Z')
  const days = dailySummaries(series('2026-11-09T01:00:00Z', 72, 1, 0, (i) => i), now, 'Asia/Tokyo')
  // Nov 10 JST = 15Z Nov 9 .. 15Z Nov 10 -> i = 14..37
  assert.equal(days[1].minC, 14)
  assert.equal(days[1].maxC, 37)
})

test('6 h blocks overlapping 1 h intervals are dropped, never summed twice', () => {
  const pts = [...series('2026-11-09T00:00:00Z', 24, 1, 1), pt('2026-11-09T00:00:00Z', 6, 99), pt('2026-11-09T06:00:00Z', 6, 99)]
  const iv = nonOverlapping(pts)
  assert.equal(iv.length, 24)
  assert.equal(coveredRain(iv, Date.parse('2026-11-09T00:00:00Z'), Date.parse('2026-11-10T00:00:00Z')).mm, 24)
})

test('duplicate timestamps count once', () => {
  const pts = [...series('2026-11-09T00:00:00Z', 24, 1, 1), ...series('2026-11-09T00:00:00Z', 24, 1, 1)]
  assert.equal(coveredRain(nonOverlapping(pts), Date.parse('2026-11-09T00:00:00Z'), Date.parse('2026-11-10T00:00:00Z')).mm, 24)
})

test('1 h -> 6 h transition aligned to UTC midnight sums as mixed resolution', () => {
  const pts = [...series('2026-11-11T00:00:00Z', 12, 1, 1), pt('2026-11-11T12:00:00Z', 6, 3), pt('2026-11-11T18:00:00Z', 6, 2)]
  const now = Date.parse('2026-11-10T00:30:00Z')
  const day = dailySummaries([pt('2026-11-10T00:00:00Z', 1), ...pts], now, 'UTC').find((d) => d.date === '2026-11-11')
  assert.equal(day.rainMm, 17)
  assert.equal(day.resolution, 'mixed')
})

test('a 6 h block crossing local midnight hides that day total (Madrid)', () => {
  // UTC 6 h blocks start 00/06/12/18Z = 01/07/13/19 local in winter: the 18Z block spans 19:00-01:00.
  const pts = series('2026-11-14T00:00:00Z', 12, 6, 1)
  const now = Date.parse('2026-11-13T23:30:00Z')
  const days = dailySummaries([pt('2026-11-13T23:00:00Z', 1), ...pts], now, 'Europe/Madrid')
  const d = days.find((x) => x.date === '2026-11-15')
  assert.equal(d.rainMm, null)
  assert.ok(d.minC !== null)
})

test('missing amount or gap hides the total; explicit 0 stays 0', () => {
  const day = (mmAt) => series('2026-11-10T00:00:00Z', 24, 1, 0).map((p, i) => (i === mmAt ? { ...p, precipitationMm: null } : p))
  const now = Date.parse('2026-11-09T23:30:00Z')
  const lead = [pt('2026-11-09T23:00:00Z', 1)]
  assert.equal(dailySummaries([...lead, ...day(-1)], now, 'UTC')[1].rainMm, 0)
  assert.equal(dailySummaries([...lead, ...day(5)], now, 'UTC')[1].rainMm, null)
  const gap = series('2026-11-10T00:00:00Z', 24, 1, 0).filter((_, i) => i !== 7)
  assert.equal(dailySummaries([...lead, ...gap], now, 'UTC')[1].rainMm, null)
})

test('symbol is taken from the instant closest to local noon', () => {
  const pts = series('2026-11-10T00:00:00Z', 24, 1, 0).map((p, i) => ({ ...p, symbolCode: i === 12 ? 'rain' : 'clearsky_day' }))
  const d = dailySummaries([pt('2026-11-09T23:00:00Z', 1), ...pts], Date.parse('2026-11-09T23:30:00Z'), 'UTC')[1]
  assert.equal(d.symbolCode, 'rain')
  assert.equal(d.symbolTime, '2026-11-10T12:00:00.000Z')
})

test('limits to 7 days and drops days beyond the horizon', () => {
  const days = dailySummaries(series('2026-11-09T00:00:00Z', 60, 6), Date.parse('2026-11-09T00:30:00Z'), 'UTC')
  assert.equal(days.length, 7)
  const short = dailySummaries(series('2026-11-09T00:00:00Z', 30, 1), Date.parse('2026-11-09T00:30:00Z'), 'UTC')
  assert.equal(short.length, 2)
})

test('range scale spans all days', () => {
  assert.deepEqual(rangeScale([{ minC: 3.4, maxC: 9 }, { minC: 5, maxC: 14.2 }]), { lo: 3, hi: 15 })
  assert.equal(rangeScale([{ minC: null, maxC: null }]), null)
})
