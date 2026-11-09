// Same-origin Vercel function. Source: MET Norway / Locationforecast 2.0.
// Model forecast values must not be represented as station observations.
type Dict = Record<string, unknown>
const rec = (v: unknown): Dict => v && typeof v === 'object' && !Array.isArray(v) ? v as Dict : {}
const num = (v: unknown, decimals = 1): number | null =>
  typeof v === 'number' && Number.isFinite(v) ? Number(v.toFixed(decimals)) : null
const response = (body: unknown, status = 200, cache = 'no-store') => new Response(JSON.stringify(body), {
  status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': cache, 'X-Content-Type-Options': 'nosniff' },
})
function parsePoint(value: unknown) {
  const row = rec(value)
  if (typeof row.time !== 'string' || !Number.isFinite(Date.parse(row.time))) return null
  const data = rec(row.data)
  const instant = rec(rec(data.instant).details)
  const key = (['next_1_hours','next_6_hours','next_12_hours'] as const)
    .find((name) => rec(rec(data[name]).details).precipitation_amount !== undefined)
  const details = key ? rec(rec(data[key]).details) : {}
  const temperature = num(instant.air_temperature)
  const humidity = num(instant.relative_humidity)
  const wind = num(typeof instant.wind_speed === 'number' ? instant.wind_speed * 3.6 : null)
  let apparent: number | null = null
  if (temperature !== null && humidity !== null && wind !== null) {
    const vapourPressure = humidity / 100 * 6.105 * Math.exp(17.27 * temperature / (237.7 + temperature))
    apparent = num(temperature + 0.33 * vapourPressure - 0.7 * wind / 3.6 - 4)
  }
  const summary = rec(rec(data[key ?? 'next_1_hours']).summary)
  return {
    time: row.time,
    temperatureC: temperature,
    feelsLikeC: apparent,
    humidityPct: humidity,
    dewPointC: num(instant.dew_point_temperature),
    pressureHpa: num(instant.air_pressure_at_sea_level),
    cloudPct: num(instant.cloud_area_fraction),
    fogPct: num(instant.fog_area_fraction),
    uvClearSky: num(instant.ultraviolet_index_clear_sky),
    windKmh: wind,
    gustKmh: num(typeof instant.wind_speed_of_gust === 'number' ? instant.wind_speed_of_gust * 3.6 : null),
    windFromDegrees: num(instant.wind_from_direction, 0),
    precipitationMm: num(details.precipitation_amount),
    precipitationMinMm: num(details.precipitation_amount_min),
    precipitationMaxMm: num(details.precipitation_amount_max),
    precipitationProbabilityPct: num(details.probability_of_precipitation, 0),
    periodHours: key === 'next_1_hours' ? 1 : key === 'next_6_hours' ? 6 : key === 'next_12_hours' ? 12 : null,
    symbolCode: typeof summary.symbol_code === 'string' ? summary.symbol_code : null,
  }
}
export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'GET') return response({ error: 'method_not_allowed' }, 405)
    const url = new URL(request.url)
    const latitude = url.searchParams.get('lat')
    const longitude = url.searchParams.get('lon')
    const lat = latitude === null ? NaN : Number(latitude)
    const lon = longitude === null ? NaN : Number(longitude)
    if (!Number.isFinite(lat) || !Number.isFinite(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      return response({ error: 'invalid_coordinates' }, 400)
    }
    const endpoint = new URL('https://api.met.no/weatherapi/locationforecast/2.0/compact')
    endpoint.searchParams.set('lat', lat.toFixed(3))
    endpoint.searchParams.set('lon', lon.toFixed(3))
    try {
      const upstream = await fetch(endpoint, {
        headers: { 'User-Agent': 'ArchicWeather/0.1 (https://archic.es; vornic@archic.es)', Accept: 'application/json' },
        signal: AbortSignal.timeout(9000),
      })
      if (!upstream.ok) return response({ error: 'provider_unavailable' }, 502)
      const props = rec(rec(await upstream.json()).properties)
      const points = Array.isArray(props.timeseries) ? props.timeseries.map(parsePoint).filter(Boolean).slice(0, 110) : []
      if (!points.length) return response({ error: 'invalid_provider_response' }, 502)
      const updatedAt = rec(props.meta).updated_at
      const expiry = Date.parse(upstream.headers.get('expires') ?? '')
      const ttl = Number.isFinite(expiry) ? Math.max(60, Math.min(7200, Math.floor((expiry - Date.now()) / 1000))) : 1800
      return response({
        source: { name: 'MET Norway', url: 'https://api.met.no/', type: 'model_forecast' },
        location: { latitude: Number(lat.toFixed(3)), longitude: Number(lon.toFixed(3)) },
        updatedAt: typeof updatedAt === 'string' ? updatedAt : null,
        points,
        limitations: { observedStationData: false, officialAlerts: false, radar: false, longRange: false, timesAreUtc: true },
      }, 200, 'public, max-age=0, s-maxage=' + ttl + ', stale-while-revalidate=120')
    } catch {
      return response({ error: 'weather_temporarily_unavailable' }, 502)
    }
  },
}
