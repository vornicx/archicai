// ARCHIC LAB WEATHER — platform-neutral handler (no Deno/Node globals) so it can be unit-tested.
// Source: MET Norway Locationforecast 2.0 (CC BY 4.0). Values are MODEL FORECASTS, never station observations.
type Dict = Record<string, unknown>
const rec = (v: unknown): Dict => (v && typeof v === 'object' && !Array.isArray(v) ? (v as Dict) : {})
const num = (v: unknown, decimals = 1): number | null =>
  typeof v === 'number' && Number.isFinite(v) ? Number(v.toFixed(decimals)) : null

export const USER_AGENT = 'ArchicWeather/0.2 (https://archic.es; vornic@archic.es)'
export const MET_ENDPOINT = 'https://api.met.no/weatherapi/locationforecast/2.0/compact'
const PROJECT_ID = 'ee3844d0-54b2-4926-a94e-54f6df9a59de'
const STATIC_ORIGINS = new Set(['https://archic.es', 'https://www.archic.es', 'https://archicai.lovable.app'])
// Lovable preview origins of THIS project only (id-preview--<id>.lovable.app, <id>.lovableproject.com, ...).
const PREVIEW_ORIGIN = new RegExp(
  '^https://([a-z0-9-]+--)?' + PROJECT_ID + '(--[a-z0-9-]+)?\\.(lovable\\.app|lovableproject\\.com)$',
)
export const isAllowedOrigin = (origin: string | null) =>
  !!origin && (STATIC_ORIGINS.has(origin) || PREVIEW_ORIGIN.test(origin))

function corsHeaders(origin: string | null): Record<string, string> {
  const h: Record<string, string> = { Vary: 'Origin' }
  if (isAllowedOrigin(origin)) {
    h['Access-Control-Allow-Origin'] = origin as string
    h['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
    h['Access-Control-Allow-Headers'] = 'apikey, authorization, x-client-info, content-type'
    h['Access-Control-Max-Age'] = '86400'
  }
  return h
}

const json = (body: unknown, status: number, origin: string | null, cache = 'no-store', extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(origin),
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': cache,
      'X-Content-Type-Options': 'nosniff',
      ...extra,
    },
  })

const COORD = /^-?\d{1,3}(\.\d{1,8})?$/
export function parseCoords(url: URL): { lat: number; lon: number } | null {
  const a = url.searchParams.get('lat')
  const b = url.searchParams.get('lon')
  if (a === null || b === null || !COORD.test(a.trim()) || !COORD.test(b.trim())) return null
  const lat = Number(a), lon = Number(b)
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) return null
  // ~0.001° (~110 m): MET's recommended max precision; also improves cache hits.
  return { lat: Number(lat.toFixed(3)), lon: Number(lon.toFixed(3)) }
}

export function parsePoint(value: unknown) {
  const row = rec(value)
  if (typeof row.time !== 'string' || !Number.isFinite(Date.parse(row.time))) return null
  const data = rec(row.data)
  const instant = rec(rec(data.instant).details)
  const key = (['next_1_hours', 'next_6_hours', 'next_12_hours'] as const)
    .find((name) => rec(rec(data[name]).details).precipitation_amount !== undefined)
  const details = key ? rec(rec(data[key]).details) : {}
  const temperature = num(instant.air_temperature)
  const humidity = num(instant.relative_humidity)
  const wind = num(typeof instant.wind_speed === 'number' ? instant.wind_speed * 3.6 : null)
  let apparent: number | null = null
  if (temperature !== null && humidity !== null && wind !== null) {
    const vp = (humidity / 100) * 6.105 * Math.exp((17.27 * temperature) / (237.7 + temperature))
    apparent = num(temperature + 0.33 * vp - (0.7 * wind) / 3.6 - 4)
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

type Entry = { body: unknown; expiresAt: number; lastModified: string | null }
export type Deps = { fetch: typeof fetch; now: () => number }

// Per-isolate state. NOT shared across Edge instances/regions: a cold or different isolate refetches.
export function createLabWeatherHandler(deps: Deps = { fetch: (...a) => fetch(...a), now: () => Date.now() }) {
  const cache = new Map<string, Entry>()
  const inflight = new Map<string, Promise<Entry | null>>()
  const hits = new Map<string, { start: number; count: number }>()
  const RATE = 30, WINDOW = 60_000, MAX_KEYS = 500

  const limited = (ip: string) => {
    const t = deps.now()
    const h = hits.get(ip)
    if (!h || t - h.start > WINDOW) {
      if (hits.size > MAX_KEYS) hits.clear()
      hits.set(ip, { start: t, count: 1 })
      return false
    }
    return ++h.count > RATE
  }

  async function load(key: string, lat: number, lon: number, stale?: Entry): Promise<Entry | null> {
    const endpoint = new URL(MET_ENDPOINT)
    endpoint.searchParams.set('lat', lat.toFixed(3))
    endpoint.searchParams.set('lon', lon.toFixed(3))
    const headers: Record<string, string> = { 'User-Agent': USER_AGENT, Accept: 'application/json' }
    if (stale?.lastModified) headers['If-Modified-Since'] = stale.lastModified
    const upstream = await deps.fetch(endpoint.toString(), { headers, signal: AbortSignal.timeout(8000) })
    const exp = Date.parse(upstream.headers.get('expires') ?? '')
    const expiresAt = Number.isFinite(exp) ? Math.min(exp, deps.now() + 7_200_000) : deps.now() + 1_800_000
    if (upstream.status === 304 && stale) {
      const e = { ...stale, expiresAt }
      cache.set(key, e)
      return e
    }
    if (!upstream.ok) return null
    const props = rec(rec(await upstream.json()).properties)
    const points = Array.isArray(props.timeseries) ? props.timeseries.map(parsePoint).filter(Boolean).slice(0, 110) : []
    if (!points.length) return null
    const updatedAt = rec(props.meta).updated_at
    const body = {
      source: {
        name: 'MET Norway', url: 'https://api.met.no/', type: 'model_forecast',
        license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      },
      location: { latitude: lat, longitude: lon },
      updatedAt: typeof updatedAt === 'string' ? updatedAt : null,
      points,
      limitations: { observedStationData: false, officialAlerts: false, radar: false, longRange: false, timesAreUtc: true },
    }
    const entry = { body, expiresAt, lastModified: upstream.headers.get('last-modified') }
    if (cache.size >= MAX_KEYS) cache.delete(cache.keys().next().value as string)
    cache.set(key, entry)
    return entry
  }

  return async function handler(request: Request): Promise<Response> {
    const origin = request.headers.get('origin')
    if (request.method === 'OPTIONS') return new Response(null, { status: isAllowedOrigin(origin) ? 204 : 403, headers: corsHeaders(origin) })
    if (request.method !== 'GET') return json({ error: 'method_not_allowed' }, 405, origin, 'no-store', { Allow: 'GET, OPTIONS' })
    if (origin && !isAllowedOrigin(origin)) return json({ error: 'origin_not_allowed' }, 403, origin)
    const coords = parseCoords(new URL(request.url))
    if (!coords) return json({ error: 'invalid_coordinates' }, 400, origin)
    const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown'
    if (limited(ip)) return json({ error: 'rate_limited' }, 429, origin, 'no-store', { 'Retry-After': '60' })

    const key = coords.lat + ',' + coords.lon
    const cached = cache.get(key)
    const ttl = (e: Entry) => Math.max(0, Math.min(300, Math.floor((e.expiresAt - deps.now()) / 1000)))
    if (cached && cached.expiresAt > deps.now()) {
      return json(cached.body, 200, origin, 'public, max-age=' + ttl(cached), { 'X-Archic-Cache': 'HIT' })
    }
    try {
      let p = inflight.get(key)
      if (!p) {
        p = load(key, coords.lat, coords.lon, cached).finally(() => inflight.delete(key))
        inflight.set(key, p)
      }
      const entry = await p
      if (!entry) return json({ error: 'provider_unavailable' }, 502, origin)
      return json(entry.body, 200, origin, 'public, max-age=' + ttl(entry), { 'X-Archic-Cache': 'MISS' })
    } catch {
      return json({ error: 'weather_temporarily_unavailable' }, 502, origin)
    }
  }
}
