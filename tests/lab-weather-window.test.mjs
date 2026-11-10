import { test } from 'node:test'
import assert from 'node:assert/strict'
import { findWeatherWindows as find, WINDOW_PRESETS } from '../src/lab/weatherWindow.ts'

const T = Date.parse('2026-11-10T10:00:00Z')
const sample = (i, rain = 0, wind = 8, temp = 20) => ({
  time: new Date(T + i * 3600000).toISOString(), periodHours: 1,
  precipitationMm: rain, windKmh: wind, temperatureC: temp,
})
test('never recommends the current in-progress hour', () => {
  const hours = Array.from({ length: 6 }, (_, i) => sample(i))
  const r = find(hours, T + 20 * 60_000, WINDOW_PRESETS.walk)
  assert.equal(r.windows[0].start, sample(1).time)
})
test('selects the lowest-rain complete matching window and shows real values', () => {
  const h = [sample(0, 2), sample(1, 0.3), sample(2, 0.2), sample(3, 0), sample(4, 0)]
  const r = find(h, T - 1000, WINDOW_PRESETS.walk)
  assert.equal(r.matchesFound, true)
  assert.equal(r.windows[0].start, sample(3).time)
  assert.equal(r.windows[0].rainMm, 0)
  assert.equal(r.windows[0].windMaxKmh, 8)
  assert.equal(r.windows[0].tempMinC, 20)
  assert.equal(r.windows[0].end, sample(5).time)
})
test('missing wind, temperature and rain cause exclusion, not an invented best time', () => {
  for (const key of ['windKmh', 'temperatureC', 'precipitationMm']) {
    const h = [sample(0), sample(1), sample(2)]
    h[1][key] = null
    const r = find(h, T - 1000, WINDOW_PRESETS.walk)
    assert.equal(r.windows.length, 0, key)
  }
})
test('non-hourly periods, duplicates and gaps are not turned into continuous windows', () => {
  const h = [sample(0), sample(2), sample(3)]
  assert.equal(find(h, T - 1000, WINDOW_PRESETS.walk).windows[0].start, sample(2).time)
  h[2].time = h[1].time
  assert.equal(find(h, T - 1000, WINDOW_PRESETS.walk).windows.length, 0)
  h[2].time = sample(3).time
  h[2].periodHours = 6
  assert.equal(find(h, T - 1000, WINDOW_PRESETS.walk).windows.length, 0)
})
test('if nothing passes, reports closest fit but never calls it a match', () => {
  const r = find([sample(0, 3, 60, 37), sample(1, 4, 60, 37), sample(2, 2, 50, 35)],
    T - 1000, WINDOW_PRESETS.walk)
  assert.equal(r.matchesFound, false)
  assert.equal(r.windows[0].meetsCriteria, false)
  assert.equal(r.windows.length, 1)
})
test('top recommendations never overlap and ranking is deterministic', () => {
  const r = find(Array.from({ length: 9 }, (_, i) => sample(i)), T - 1000, WINDOW_PRESETS.walk)
  assert.equal(r.windows.length, 3)
  for (let i = 0; i < r.windows.length; i++) for (let j = i + 1; j < r.windows.length; j++)
    assert.ok(Date.parse(r.windows[i].end) <= Date.parse(r.windows[j].start) || Date.parse(r.windows[j].end) <= Date.parse(r.windows[i].start))
})
test('rain threshold controls maximum amount in any single hour, not total', () => {
  const r = find([sample(0, 0.25), sample(1, 0.25)], T - 1000, WINDOW_PRESETS.walk)
  assert.equal(r.matchesFound, true)
  assert.equal(r.windows[0].rainMm, 0.5)
  assert.equal(r.windows[0].peakRainMm, 0.25)
})
test('zero rain is dry, invalid config is rejected, and no forecast returns nothing', () => {
  assert.equal(find([], T, WINDOW_PRESETS.walk).windows.length, 0)
  const r = find([sample(0, 0), sample(1, 0)], T - 1000, WINDOW_PRESETS.walk)
  assert.equal(r.windows[0].rainMm, 0)
  assert.equal(find([sample(0), sample(1)], T, { ...WINDOW_PRESETS.walk, tempMin: 32, tempMax: 20 }).candidates, 0)
})
test('separate UTC hours crossing a destination midnight remain continuous', () => {
  const r = find([sample(11), sample(12), sample(13)], T + 10 * 3600000, WINDOW_PRESETS.walk)
  assert.equal(r.windows.length, 1)
  assert.equal(r.windows[0].end, sample(13).time)
})
