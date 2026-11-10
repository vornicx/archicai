import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  snapshotForecast, compareShift, updateShiftStore, emptyShiftStore,
  parseShiftStore, eligibleShiftCity, hasShiftOptIn,
} from '../src/lab/weatherShift.ts'

const HOUR = 3600000
const NOW = Date.parse('2026-11-10T10:15:00Z')
const OLDER = '2026-11-09T18:00:00Z'
const NEWER = '2026-11-10T06:00:00Z'
const rows = (mm, count = 50) => Array.from({ length: count }, (_, i) =>
  ({ time: new Date(NOW - 15 * 60000 + i * HOUR).toISOString(), periodHours: 1, precipitationMm: mm }))
const snap = (model, mm, at = NOW) => {
  const s = snapshotForecast(model, rows(mm), at)
  assert.ok(s)
  return s
}
test('first visit stores a baseline, but invents no past forecast', () => {
  const result = updateShiftStore(emptyShiftStore(), 'ecija', snap(OLDER, 0.3), NOW)
  assert.equal(result.state, 'baseline')
  assert.equal(result.comparison, null)
  assert.equal(result.store.entries.length, 1)
})
test('later revision compares EXACT same future hours and persists previous revision', () => {
  const old = snap(OLDER, 0.1)
  const newSnap = snap(NEWER, 0.4)
  const first = updateShiftStore(emptyShiftStore(), 'ecija', old, NOW)
  const second = updateShiftStore(first.store, 'ecija', newSnap, NOW)
  assert.equal(second.state, 'changed')
  assert.equal(second.comparison.hours, 24)
  assert.ok(Math.abs(second.comparison.deltaMm - 7.2) < 1e-9)
  assert.ok(Math.abs(second.comparison.beforeMm - 2.4) < 1e-9)
  assert.equal(second.comparison.from, rows(0)[1].time)
  const revisit = updateShiftStore(second.store, 'ecija', newSnap, NOW)
  assert.equal(revisit.state, 'changed')
  assert.deepEqual(revisit.comparison, second.comparison)
})
test('unchanged version does not fabricate a model revision', () => {
  const old = snap(OLDER, 0.1)
  const first = updateShiftStore(emptyShiftStore(), 'madrid', old, NOW)
  const sameVersion = snapshotForecast(OLDER, rows(2), NOW)
  const again = updateShiftStore(first.store, 'madrid', sameVersion, NOW)
  assert.equal(again.state, 'baseline')
  assert.equal(again.comparison, null)
})
test('equal rainfall between versions says no meaningful change', () => {
  const first = updateShiftStore(emptyShiftStore(), 'ecija', snap(OLDER, 0.4), NOW)
  const next = updateShiftStore(first.store, 'ecija', snap(NEWER, 0.4), NOW)
  assert.equal(next.state, 'same')
  assert.ok(Math.abs(next.comparison.deltaMm) < 1e-8)
})
test('hour missing, interval missing, or explicit null is not counted as zero', () => {
  const old = snap(OLDER, 0.1)
  const newer = snap(NEWER, 0.2)
  newer.hours.splice(4, 1)
  const res = compareShift(old, newer, NOW)
  assert.ok(res)
  assert.equal(res.hours, 24) // there is still a complete 24h run later in the 48h snapshot
  const shorter = { ...newer, hours: newer.hours.slice(0, 8) }
  assert.equal(compareShift(old, shorter, NOW), null)
  const nulls = snap(NEWER, null)
  assert.equal(compareShift(old, nulls, NOW), null)
})
test('only a shared 6h forecast is comparable, not different rolling periods', () => {
  const old = snap(OLDER, 1)
  const now = snap(NEWER, 2)
  now.hours = now.hours.slice(0, 9)
  const cmp = compareShift(old, now, NOW)
  assert.equal(cmp.hours, 6)
  assert.equal(cmp.beforeMm, 6)
  assert.equal(cmp.afterMm, 12)
})
test('source timestamps must advance, stale models may not replace latest', () => {
  assert.equal(compareShift(snap(NEWER, 1), snap(OLDER, 2), NOW), null)
  const first = updateShiftStore(emptyShiftStore(), 'tokyo', snap(NEWER, 1), NOW)
  const stale = updateShiftStore(first.store, 'tokyo', snap(OLDER, 2), NOW)
  assert.equal(stale.state, 'stale')
  assert.equal(stale.store.entries[0].latest.issuedAt, NEWER)
})
test('manual coordinates or device GPS are explicitly ineligible for browser history', () => {
  assert.equal(eligibleShiftCity('device'), false)
  assert.equal(eligibleShiftCity('coordinates'), false)
  assert.equal(eligibleShiftCity('geonames:12345'), true)
  assert.equal(eligibleShiftCity('ecija'), true)
  assert.equal(updateShiftStore(emptyShiftStore(), 'device', snap(OLDER, 2), NOW).store.entries.length, 0)
})
test('corrupted localStorage is discarded; entries expire; no hidden PII', () => {
  const baseline = updateShiftStore(emptyShiftStore(), 'geonames:987', snap(OLDER, 0), NOW).store
  const clean = parseShiftStore(JSON.stringify(baseline), NOW)
  assert.equal(clean.entries.length, 1)
  assert.equal(parseShiftStore('{invalid', NOW).entries.length, 0)
  assert.equal(parseShiftStore(JSON.stringify(baseline), NOW + 31 * 86400000).entries.length, 0)
  assert.equal(parseShiftStore(JSON.stringify({ version: 1, entries: [{ cityId: 'device', latest: snap(OLDER, 2) }] }), NOW).entries.length, 0)
})
test('null source timestamp or six hours not available yield no baseline', () => {
  assert.equal(snapshotForecast(null, rows(2), NOW), null)
  assert.equal(snapshotForecast(OLDER, rows(2, 5), NOW), null)
})

test('forecast-history permission requires explicit affirmative activation', () => {
  assert.equal(hasShiftOptIn(null), false)
  assert.equal(hasShiftOptIn(''), false)
  assert.equal(hasShiftOptIn('0'), false)
  assert.equal(hasShiftOptIn('false'), false)
  assert.equal(hasShiftOptIn('1'), true)
})
