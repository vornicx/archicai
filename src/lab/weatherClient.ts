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

export type AemetAlert = { id:string; event:string; level:'amarillo'|'naranja'|'rojo'; area:string; onset:string; expires:string; url:string }
export type AemetAlertResult = { source:'AEMET'; scope:'matching-published-warnings'; alerts:AemetAlert[]; checkedAt:string; partial:boolean }
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

/** Known AEMET warning zones only. Never infer a zone from an arbitrary place name. */
export async function fetchOfficialAlerts(lat:number,lon:number,zone:'614102'|'722802',signal?:AbortSignal):Promise<AemetAlertResult>{
  const params=new URLSearchParams({lat:String(lat),lon:String(lon),alerts:'1',zone})
  const res=await fetch(WEATHER_FN_URL+'?'+params,{headers:{apikey:PUBLISHABLE_KEY},signal})
  if(!res.ok) throw new Error('aemet_unavailable')
  const body=await res.json() as AemetAlertResult
  if(body.source!=='AEMET'||body.scope!=='matching-published-warnings'||!Array.isArray(body.alerts))throw new Error('invalid_aemet')
  return body
}
