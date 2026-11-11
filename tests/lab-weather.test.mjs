import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createLabWeatherHandler, USER_AGENT } from '../supabase/functions/_shared/labWeather.ts'

const BASE = 'https://x.functions.supabase.co/lab-weather'
const ORIGIN = 'https://archic.es'
const req = (qs, init = {}) => new Request(BASE + qs, { ...init, headers: { origin: ORIGIN, ...(init.headers ?? {}) } })
const met = (details = { precipitation_amount: 0 }) => new Response(JSON.stringify({ properties: {
  meta: { updated_at: '2026-11-09T10:00:00Z' },
  timeseries: [{ time: '2026-11-09T11:00:00Z', data: {
    instant: { details: { air_temperature: 20, relative_humidity: 60, wind_speed: 4, wind_from_direction: 120, dew_point_temperature: 10, air_pressure_at_sea_level: 1014, cloud_area_fraction: 65 } },
    next_1_hours: { details, summary: { symbol_code: 'cloudy' } },
  } }],
} }), { status: 200, headers: { Expires: new Date(Date.now() + 900000).toUTCString() } })

test('invalid or missing coordinates are rejected without calling MET', async () => {
  let calls = 0
  const h = createLabWeatherHandler({ fetch: async () => { calls++; throw new Error('no') }, now: Date.now })
  for (const qs of ['', '?lat=40', '?lon=2', '?lat=abc&lon=2', '?lat=91&lon=2', '?lat=-90.5&lon=0', '?lat=40&lon=-181', '?lat=1e1&lon=2', '?lat=&lon=']) {
    const r = await h(req(qs))
    assert.equal(r.status, 400, qs)
    assert.equal(r.headers.get('cache-control'), 'no-store')
    assert.match(r.headers.get('content-type'), /application\/json/)
  }
  assert.equal(calls, 0)
})

test('normalizes forecast: 0 mm kept, missing probability is null, coords rounded, real UA', async () => {
  let url = '', ua = ''
  const h = createLabWeatherHandler({ fetch: async (u, init) => { url = String(u); ua = init.headers['User-Agent']; return met() }, now: Date.now })
  const r = await h(req('?lat=37.54219&lon=-5.08277'))
  assert.equal(r.status, 200)
  assert.equal(ua, USER_AGENT)
  assert.equal(ua, 'ArchicWeather/0.2 (https://archic.es; vornic@archic.es)')
  assert.match(url, /^https:\/\/api\.met\.no\/weatherapi\/locationforecast\/2\.0\/compact\?lat=37\.542&lon=-5\.083$/)
  const b = await r.json()
  assert.equal(b.source.type, 'model_forecast')
  assert.equal(b.points[0].precipitationMm, 0)
  assert.equal(b.points[0].precipitationProbabilityPct, null)
  assert.equal(b.points[0].windKmh, 14.4)
  assert.equal(b.limitations.observedStationData, false)
  assert.equal(r.headers.get('access-control-allow-origin'), ORIGIN)
  assert.equal(r.headers.get('vary'), 'Origin')
})

test('upstream failure returns 502 no-store', async () => {
  const h = createLabWeatherHandler({ fetch: async () => new Response('{}', { status: 503 }), now: Date.now })
  const r = await h(req('?lat=0&lon=0'))
  assert.equal(r.status, 502)
  assert.equal(r.headers.get('cache-control'), 'no-store')
  const h2 = createLabWeatherHandler({ fetch: async () => { throw new Error('timeout') }, now: Date.now })
  assert.equal((await h2(req('?lat=0&lon=0'))).status, 502)
})

test('repeat requests within MET expiry are served from isolate cache', async () => {
  let calls = 0
  const h = createLabWeatherHandler({ fetch: async (u) => { if (String(u).startsWith('https://api.met.no/')) calls++; return met() }, now: Date.now })
  await h(req('?lat=37.5&lon=-5.08'))
  const r = await h(req('?lat=37.5001&lon=-5.0801'))
  assert.equal(r.headers.get('x-archic-cache'), 'HIT')
  assert.equal(calls, 1)
})

test('CORS: allowed origins only, OPTIONS handled', async () => {
  const h = createLabWeatherHandler({ fetch: async () => met(), now: Date.now })
  const ok = await h(new Request(BASE, { method: 'OPTIONS', headers: { origin: 'https://id-preview--ee3844d0-54b2-4926-a94e-54f6df9a59de.lovable.app' } }))
  assert.equal(ok.status, 204)
  assert.ok(ok.headers.get('access-control-allow-origin'))
  const bad = await h(new Request(BASE + '?lat=1&lon=1', { headers: { origin: 'https://evil.example' } }))
  assert.equal(bad.status, 403)
  assert.equal(bad.headers.get('access-control-allow-origin'), null)
  const spoof = await h(new Request(BASE, { method: 'OPTIONS', headers: { origin: 'https://ee3844d0-54b2-4926-a94e-54f6df9a59de.lovable.app.evil.com' } }))
  assert.equal(spoof.status, 403)
  assert.equal((await h(req('?lat=1&lon=1', { method: 'POST' }))).status, 405)
})
