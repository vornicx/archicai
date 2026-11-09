import { test } from 'node:test'
import assert from 'node:assert/strict'
import { nextHourIndex, hourSummary } from '../src/lab/hourSelection.ts'

test('keyboard selection moves by one hour and clamps', () => {
  assert.equal(nextHourIndex(0, 'ArrowLeft', 24), 0)
  assert.equal(nextHourIndex(0, 'ArrowRight', 24), 1)
  assert.equal(nextHourIndex(23, 'ArrowRight', 24), 23)
  assert.equal(nextHourIndex(5, 'Home', 24), 0)
  assert.equal(nextHourIndex(5, 'End', 24), 23)
  assert.equal(nextHourIndex(5, 'a', 24), null)
})

test('summary shows real 0 mm as 0,0 mm and missing rain as —', () => {
  const base = { time: 'x', temperatureC: 17.2, symbolCode: 'cloudy' }
  assert.equal(hourSummary({ ...base, precipitationMm: 0 }, '20:00', 'es-ES', 'es').split(' · ')[1], '0,0 mm')
  assert.equal(hourSummary({ ...base, precipitationMm: null }, '20:00', 'es-ES', 'es').split(' · ')[1], '— mm')
})

test('summary uses the MET condition and rounds temperature', () => {
  const s = hourSummary({ time: 'x', temperatureC: 16.6, precipitationMm: 0.6, symbolCode: 'lightrainshowers_night' }, '20:00', 'es-ES', 'es')
  assert.match(s, /^20:00 · 0,6 mm · 17 °C · /)
  assert.notEqual(s.split(' · ')[3], '—')
  assert.equal(hourSummary({ time: 'x', temperatureC: null, precipitationMm: 0, symbolCode: null }, '01:00', 'en-GB', 'en'), '01:00 · 0.0 mm · — °C · —')
})
