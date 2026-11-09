import { test } from 'node:test'
import assert from 'node:assert/strict'
import handler from '../api/lab/weather.ts'

test('invalid coordinates never reach upstream', async () => {
  const original = globalThis.fetch
  let calls = 0
  globalThis.fetch = async () => { calls++; throw new Error('should not call MET') }
  try {
    for (const url of [
      'https://archic.es/api/lab/weather',
      'https://archic.es/api/lab/weather?lat=not-a-number&lon=2',
      'https://archic.es/api/lab/weather?lat=91&lon=2',
      'https://archic.es/api/lab/weather?lat=40&lon=-181',
    ]) {
      const result = await handler.fetch(new Request(url))
      assert.equal(result.status, 400)
      assert.equal(result.headers.get('cache-control'), 'no-store')
    }
    assert.equal(calls, 0)
  } finally { globalThis.fetch = original }
})

test('normalizes MET forecast, preserving zero rain and unknown probability', async () => {
  const original = globalThis.fetch
  let endpoint = ''
  let agent = ''
  globalThis.fetch = async (input, init) => {
    endpoint = String(input)
    agent = new Headers(init?.headers).get('User-Agent') ?? ''
    return new Response(JSON.stringify({
      properties: {
        meta: { updated_at: '2026-11-09T10:00:00Z' },
        timeseries: [
          {
            time: '2026-11-09T11:00:00Z',
            data: {
              instant: { details: {
                air_temperature: 20, relative_humidity: 60,
                wind_speed: 4, wind_from_direction: 120,
                dew_point_temperature: 10, air_pressure_at_sea_level: 1014,
                cloud_area_fraction: 65,
              } },
              next_1_hours: { details: { precipitation_amount: 0 }, summary: { symbol_code: 'cloudy' } },
            },
          },
        ],
      },
    }), { status: 200, headers: { Expires: new Date(Date.now() + 900000).toUTCString() } })
  }
  try {
    const result = await handler.fetch(new Request('https://archic.es/api/lab/weather?lat=37.54&lon=-5.08'))
    assert.equal(result.status, 200)
    assert.match(endpoint, /api\.met\.no\/weatherapi\/locationforecast\/2\.0\/compact/)
    assert.match(agent, /ArchicWeather/)
    const body = await result.json()
    assert.equal(body.source.type, 'model_forecast')
    assert.equal(body.limitations.observedStationData, false)
    assert.equal(body.points[0].precipitationMm, 0)
    assert.equal(body.points[0].precipitationProbabilityPct, null)
    assert.equal(body.points[0].periodHours, 1)
    assert.equal(body.points[0].windKmh, 14.4)
    assert.equal(body.points[0].temperatureC, 20)
    assert.ok(Number.isFinite(body.points[0].feelsLikeC))
    assert.match(result.headers.get('cache-control') ?? '', /s-maxage=/)
  } finally { globalThis.fetch = original }
})

test('upstream errors are not cached', async () => {
  const original = globalThis.fetch
  globalThis.fetch = async () => new Response('{}', { status: 503 })
  try {
    const result = await handler.fetch(new Request('https://archic.es/api/lab/weather?lat=0&lon=0'))
    assert.equal(result.status, 502)
    assert.equal(result.headers.get('cache-control'), 'no-store')
  } finally { globalThis.fetch = original }
})
