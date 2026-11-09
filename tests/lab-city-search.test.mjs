import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fold, decodeCities, searchCities, loadCities, resetCityCache, parseRecents, pushRecent } from '../src/lab/citySearch.ts'

const asset = JSON.parse(readFileSync(new URL('../public/lab/weather/cities.json', import.meta.url)))
const cities = decodeCities(asset)
const top = (q) => searchCities(cities, q)[0]

test('folding strips diacritics and punctuation', () => {
  assert.equal(fold('Écija'), 'ecija')
  assert.equal(fold('  Saint-Étienne '), 'saint etienne')
  assert.equal(fold('MÚNICH'), 'munich')
})

test('index is real GeoNames data with exact coordinates and IANA zones', () => {
  assert.ok(cities.length > 60000)
  const tokyo = cities.find((c) => c.id === 1850147)
  assert.equal(tokyo.timeZone, 'Asia/Tokyo')
  assert.equal(tokyo.lat, 35.6895)
  assert.equal(tokyo.nameEs, 'Tokio')
  for (const c of cities.slice(0, 2000)) { assert.ok(Math.abs(c.lat) <= 90 && Math.abs(c.lon) <= 180); assert.match(c.countryCode, /^[A-Z]{2}$/) }
})

test('accent-insensitive search keeps accented display names', () => {
  const c = top('ecija')
  assert.equal(c.name, 'Écija')
  assert.equal(c.countryCode, 'ES')
})

test('Spanish and English exonyms resolve to the same city', () => {
  assert.equal(top('Londres').id, top('London').id)
  assert.equal(top('Nueva York').id, 5128581)
  assert.equal(top('tokio').timeZone, 'Asia/Tokyo')
  assert.equal(top('Sevil').id, 2510911)
})

test('ties are ranked by population and stay distinguishable by country/region', () => {
  const v = searchCities(cities, 'Valencia').slice(0, 3)
  assert.deepEqual(v.map((c) => c.countryCode).sort(), [...new Set(v.map((c) => c.countryCode))].sort())
  assert.ok(v.some((c) => c.countryCode === 'ES' && c.region === 'Valencia'))
  assert.ok(v[0].population >= v[1].population)
  assert.equal(top('Palma').region, 'Balearic Islands')
  assert.equal(top('Berlin').countryCode, 'DE')
})

test('exact matches outrank prefixes; short queries return nothing; limit applies', () => {
  assert.equal(top('Paris').countryCode, 'FR')
  assert.deepEqual(searchCities(cities, 'a'), [])
  assert.equal(searchCities(cities, 'san').length, 8)
  assert.deepEqual(searchCities(cities, 'zzqxw'), [])
})

test('loader fetches once, caches, and allows retry after a blocked fetch', async () => {
  resetCityCache()
  let calls = 0
  const failing = async () => { calls++; return { ok: false } }
  await assert.rejects(loadCities(failing))
  const ok = async () => { calls++; return { ok: true, json: async () => asset } }
  const [a, b] = await Promise.all([loadCities(ok), loadCities(ok)])
  assert.equal(a, b)
  assert.equal(calls, 2)
  resetCityCache()
})

test('recents are validated and capped at 3', () => {
  const r = { id: 1, nameEs: 'A', nameEn: 'A', lat: 1, lon: 2, timeZone: 'UTC', countryCode: 'ES', region: '' }
  assert.deepEqual(parseRecents('{"x":1}'), [])
  assert.deepEqual(parseRecents('not json'), [])
  assert.deepEqual(parseRecents(JSON.stringify([{ ...r, lat: 200 }])), [])
  let l = []
  for (let i = 1; i <= 5; i++) l = pushRecent(l, { ...r, id: i })
  assert.deepEqual(l.map((x) => x.id), [5, 4, 3])
  assert.deepEqual(pushRecent(l, { ...r, id: 3 }).map((x) => x.id), [3, 5, 4])
})
