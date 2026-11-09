// Single browser entry to the Lovable Cloud Edge Function "lab-weather" (public GET).
// Only the public project URL + publishable key are used; MET is never called from the browser.
export type Point = {
  time: string
  temperatureC: number | null
  feelsLikeC: number | null
  humidityPct: number | null
  dewPointC: number | null
  pressureHpa: number | null
  cloudPct: number | null
  fogPct: number | null
  uvClearSky: number | null
  windKmh: number | null
  gustKmh: number | null
  windFromDegrees: number | null
  precipitationMm: number | null
  precipitationProbabilityPct: number | null
  periodHours: number | null
  symbolCode: string | null
}
export type WeatherPayload = {
  source: { name: string; url: string; type: 'model_forecast' }
  updatedAt: string | null
  points: Point[]
  limitations: { observedStationData: false; officialAlerts: false; radar: false; timesAreUtc: true }
}

const WEATHER_FN_URL = import.meta.env.VITE_SUPABASE_URL + '/functions/v1/lab-weather'
const PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string

export async function fetchForecast(lat: number, lon: number, signal?: AbortSignal): Promise<WeatherPayload> {
  const params = new URLSearchParams({ lat: String(lat), lon: String(lon) })
  const res = await fetch(WEATHER_FN_URL + '?' + params.toString(), { method: 'GET', headers: { apikey: PUBLISHABLE_KEY }, signal })
  if (!res.ok) throw new Error('weather_unavailable')
  const body = (await res.json()) as WeatherPayload
  if (!Array.isArray(body.points) || body.source?.type !== 'model_forecast') throw new Error('invalid_weather')
  return body
}
