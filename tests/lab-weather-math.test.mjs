import { test } from 'node:test'
import assert from 'node:assert/strict'
import { upcomingHourly, rainTotal, chartMax } from '../src/lab/weatherMath.ts'

const T0 = Date.parse('2026-11-09T14:00:00Z')
const h = (offset, mm = 0.1, period = 1) => ({ time: new Date(T0 + offset * 3600000).toISOString(), periodHours: period, precipitationMm: mm })
const now = T0 + 34 * 60000 // 14:34Z

test('starts with the interval in progress and never includes an elapsed hour', () => {
  const pts = [h(-1, 9), h(0), h(1), h(2)]
  const out = upcomingHourly(pts, now)
  assert.equal(out[0].time, '2026-11-09T14:00:00.000Z')
  assert.equal(out.length, 3)
})

test('24 h total sums exactly 24 contiguous hourly intervals', () => {
  const pts = Array.from({ length: 30 }, (_, i) => h(i, 0.5))
  const out = upcomingHourly(pts, now)
  assert.equal(out.length, 24)
  assert.equal(rainTotal(out, 24), 12)
  assert.equal(rainTotal(out, 6), 3)
})

test('6 h blocks are never mixed into hourly totals', () => {
  const pts = [...Array.from({ length: 10 }, (_, i) => h(i, 1)), h(10, 6, 6), h(16, 6, 6)]
  const out = upcomingHourly(pts, now)
  assert.equal(out.length, 10)
  assert.equal(rainTotal(out, 6), 6)
  assert.equal(rainTotal(out, 24), null)
})

test('a gap in the hourly series stops continuity and hides the total', () => {
  const pts = [h(0), h(1), h(2), h(4), h(5), h(6), h(7)]
  const out = upcomingHourly(pts, now)
  assert.equal(out.length, 3)
  assert.equal(rainTotal(out, 6), null)
})

test('a missing amount hides the total instead of counting it as 0', () => {
  const pts = Array.from({ length: 6 }, (_, i) => h(i, i === 3 ? null : 0))
  assert.equal(rainTotal(upcomingHourly(pts, now), 6), null)
})

test('0 mm is a real value: dry 6 h totals 0, not unavailable', () => {
  const pts = Array.from({ length: 6 }, (_, i) => h(i, 0))
  assert.equal(rainTotal(upcomingHourly(pts, now), 6), 0)
})

test('unsorted input is ordered; empty or all-past input yields nothing', () => {
  assert.equal(upcomingHourly([h(2), h(0), h(1)], now).map((p) => p.time.slice(11, 13)).join(','), '14,15,16')
  assert.deepEqual(upcomingHourly([], now), [])
  assert.deepEqual(upcomingHourly([h(-3), h(-2)], now), [])
})

test('chart scale starts at zero and never exaggerates dry hours', () => {
  assert.equal(chartMax([h(0, 0), h(1, 0)]), 1)
  assert.equal(chartMax([h(0, 0.4)]), 1)
  assert.equal(chartMax([h(0, 3.2)]), 5)
  assert.equal(chartMax([h(0, 11)]), 15)
})
