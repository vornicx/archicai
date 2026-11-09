import { test } from 'node:test'
import assert from 'node:assert/strict'
import { forecastReducer as r, forecastView as v, initialForecast, placeKey } from '../src/lab/forecastState.ts'

const ECIJA = placeKey(37.541, -5.083), TOKYO = placeKey(35.676, 139.65)
const pay = (t) => ({ source: { type: 'model_forecast' }, updatedAt: null, points: [{ time: 'x', temperatureC: t }] })
const temp = (s) => v(s).data?.payload.points[0].temperatureC ?? null

test('switching place never shows the previous place data while loading', () => {
  let s = r(initialForecast(ECIJA), { type: 'start', key: ECIJA, id: 1 })
  s = r(s, { type: 'resolve', key: ECIJA, id: 1, payload: pay(17), at: 1 })
  assert.equal(temp(s), 17)
  s = r(s, { type: 'start', key: TOKYO, id: 2 })
  assert.equal(v(s).data, null)
  assert.equal(v(s).loadingFresh, true)
})

test('a late response for a superseded place is dropped (Écija→Tokio→Écija quickly)', () => {
  let s = r(initialForecast(ECIJA), { type: 'start', key: ECIJA, id: 1 })
  s = r(s, { type: 'start', key: TOKYO, id: 2 })
  s = r(s, { type: 'start', key: ECIJA, id: 3 })
  s = r(s, { type: 'resolve', key: TOKYO, id: 2, payload: pay(9), at: 2 })
  assert.equal(v(s).data, null)
  s = r(s, { type: 'resolve', key: ECIJA, id: 1, payload: pay(15), at: 3 })
  assert.equal(v(s).data, null, 'older Écija request must not write either')
  s = r(s, { type: 'resolve', key: ECIJA, id: 3, payload: pay(18), at: 4 })
  assert.equal(temp(s), 18)
})

test('refreshing the same place keeps its data, flagged as refreshing', () => {
  let s = r(initialForecast(ECIJA), { type: 'start', key: ECIJA, id: 1 })
  s = r(s, { type: 'resolve', key: ECIJA, id: 1, payload: pay(17), at: 1 })
  s = r(s, { type: 'start', key: ECIJA, id: 2 })
  assert.equal(temp(s), 17)
  assert.equal(v(s).refreshing, true)
})

test('a failed request hides data and reports the error; retry recovers', () => {
  let s = r(initialForecast(ECIJA), { type: 'start', key: ECIJA, id: 1 })
  s = r(s, { type: 'resolve', key: ECIJA, id: 1, payload: pay(17), at: 1 })
  s = r(s, { type: 'start', key: ECIJA, id: 2 })
  s = r(s, { type: 'fail', key: ECIJA, id: 2 })
  assert.equal(v(s).error, true)
  assert.equal(v(s).data, null)
  s = r(s, { type: 'start', key: ECIJA, id: 3 })
  s = r(s, { type: 'resolve', key: ECIJA, id: 3, payload: pay(16), at: 2 })
  assert.equal(temp(s), 16)
})

test('a failure from a superseded request does not mark the new place as failed', () => {
  let s = r(initialForecast(ECIJA), { type: 'start', key: ECIJA, id: 1 })
  s = r(s, { type: 'start', key: TOKYO, id: 2 })
  s = r(s, { type: 'fail', key: ECIJA, id: 1 })
  assert.equal(v(s).error, false)
})
