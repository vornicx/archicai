import { test } from 'node:test'
import assert from 'node:assert/strict'
import { availableWindowDays, findWeatherWindows as find, localWindowDay, WINDOW_PRESETS, windowFitIssues } from '../src/lab/weatherWindow.ts'

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


test('explanation names only the configured limits that fail in closest alternatives', () => {
  const w = find([sample(0, 2, 35, 32), sample(1, 1, 40, 31)], T - 1000, WINDOW_PRESETS.walk).windows[0]
  assert.deepEqual(windowFitIssues(w, WINDOW_PRESETS.walk), ['rain', 'wind', 'temperature'])
  const onlyWind = find([sample(0, 0, 15, 20), sample(1, 0, 15, 20)], T - 1000,
    { ...WINDOW_PRESETS.walk, windMax: 0 }).windows[0]
  assert.deepEqual(windowFitIssues(onlyWind, { ...WINDOW_PRESETS.walk, windMax: 0 }), ['wind'])
})
test('fitting forecast windows have no reason to warn about exceeded criteria', () => {
  const match = find([sample(0, 0.2, 12, 18), sample(1, 0.3, 20, 24)],
    T - 1000, WINDOW_PRESETS.walk).windows[0]
  assert.equal(match.meetsCriteria, true)
  assert.deepEqual(windowFitIssues(match, WINDOW_PRESETS.walk), [])
  assert.equal(match.peakRainMm, 0.3)
})

test('day filtering ranks all candidates for tomorrow, not just the three global winners', () => {
  const hours = Array.from({ length: 48 }, (_, i) => sample(i))
  const all = find(hours, T - 1000, WINDOW_PRESETS.walk)
  assert.ok(all.windows.every(w => localWindowDay(w.start, 'Europe/Madrid') === '2026-11-10'))
  const tomorrow = find(hours, T - 1000, WINDOW_PRESETS.walk, { dayKey: '2026-11-11', timeZone: 'Europe/Madrid' })
  assert.equal(tomorrow.matchesFound, true)
  assert.ok(tomorrow.candidates > 0)
  assert.ok(tomorrow.windows.every(w => localWindowDay(w.start, 'Europe/Madrid') === '2026-11-11'))
  const days = availableWindowDays(hours, T - 1000, WINDOW_PRESETS.walk, 'Europe/Madrid')
  assert.ok(days.some(d => d.key === '2026-11-11'))
  assert.ok(days.some(d => d.key === '2026-11-12'))
})

test('DST in Madrid keeps consecutive absolute hours across spring-forward', () => {
  const start = Date.parse('2026-03-29T00:00:00Z')
  const hours = Array.from({length: 4}, (_, i) => ({...sample(0), time:new Date(start+i*3600000).toISOString()}))
  const day = '2026-03-29'
  assert.equal(localWindowDay(hours[0].time, 'Europe/Madrid'), day)
  assert.equal(localWindowDay(hours[1].time, 'Europe/Madrid'), day)
  const result = find(hours, start-1000, WINDOW_PRESETS.walk, {dayKey:day, timeZone:'Europe/Madrid'})
  assert.ok(result.windows.length > 0)
  assert.equal(result.windows[0].end, new Date(Date.parse(result.windows[0].start)+2*3600000).toISOString())
})

test('DST in New York keeps both repeated 01:00 local hours distinct', () => {
  const first = Date.parse('2026-11-01T05:00:00Z')
  const h = [0,1,2].map(i => ({...sample(0), time:new Date(first+i*3600000).toISOString()}))
  assert.equal(localWindowDay(h[0].time, 'America/New_York'), '2026-11-01')
  assert.equal(localWindowDay(h[1].time, 'America/New_York'), '2026-11-01')
  const r = find(h, first-1000, WINDOW_PRESETS.walk, {dayKey:'2026-11-01',timeZone:'America/New_York'})
  assert.equal(r.candidates, 2)
  assert.ok(r.windows.length > 0)
  assert.equal(Date.parse(h[1].time)-Date.parse(h[0].time), 3600000)
})

test('day without complete candidate does not appear available or claim matches', () => {
  const short = [sample(0),sample(1)]
  assert.equal(find(short,T-1000,WINDOW_PRESETS.walk,{dayKey:'2026-11-30',timeZone:'UTC'}).candidates,0)
  assert.deepEqual(availableWindowDays([sample(0), {...sample(1), windKmh:null}], T-1000, WINDOW_PRESETS.walk,'UTC'),[])
  assert.deepEqual(availableWindowDays([sample(0), {...sample(1), periodHours:6}], T-1000, WINDOW_PRESETS.walk,'UTC'),[])
  assert.equal(localWindowDay(sample(0).time,'Definitely/Invalid'),null)
})

test('day choices adapt to one-, two- and three-hour presets and future-only rule', () => {
  const h = [sample(0),sample(1),sample(2)]
  const afterFirstStarted = T + 10 * 60000
  assert.equal(availableWindowDays(h,afterFirstStarted,WINDOW_PRESETS.sport,'UTC').length,1)
  assert.equal(availableWindowDays(h,afterFirstStarted,WINDOW_PRESETS.walk,'UTC').length,1)
  assert.equal(availableWindowDays(h,afterFirstStarted,WINDOW_PRESETS.outdoors,'UTC').length,0)
  for (const preset of Object.values(WINDOW_PRESETS)) {
    const r = find(h, afterFirstStarted, preset)
    assert.ok(r.windows.every(w => Date.parse(w.start)>=afterFirstStarted))
  }
})
