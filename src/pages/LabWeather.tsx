import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Helmet } from 'react-helmet-async'
import '@fontsource/instrument-serif/latin-400.css'
import { useLang } from '../i18n/LanguageContext'
import '../styles/archic-lab.css'

type Place = { id: string; name: string; lat: number; lon: number }
type Point = {
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
type WeatherPayload = {
  source: { name: string; url: string; type: 'model_forecast' }
  updatedAt: string | null
  points: Point[]
  limitations: { observedStationData: false; officialAlerts: false; radar: false; timesAreUtc: true }
}
const PLACES: Place[] = [
  { id: 'ecija', name: 'Écija, España', lat: 37.541, lon: -5.083 },
  { id: 'sevilla', name: 'Sevilla, España', lat: 37.389, lon: -5.984 },
  { id: 'madrid', name: 'Madrid, España', lat: 40.417, lon: -3.704 },
  { id: 'london', name: 'Londres, Reino Unido', lat: 51.507, lon: -0.128 },
  { id: 'new-york', name: 'Nueva York, EE. UU.', lat: 40.713, lon: -74.006 },
  { id: 'tokyo', name: 'Tokio, Japón', lat: 35.676, lon: 139.65 },
]
const COPY = {
  es: {
    label: 'WEATHER / ARCHIC LAB', title: 'El tiempo, más claro.',
    subtitle: 'Datos meteorológicos con contexto, cantidades y procedencia.',
    location: 'Ubicación', coordinates: 'O introduce coordenadas', latitude: 'Latitud', longitude: 'Longitud',
    explore: 'Consultar', device: 'Mi ubicación', refresh: 'Actualizar', simple: 'Resumen', advanced: 'Detalle',
    loading: 'Consultando predicción…', failure: 'No hemos podido obtener la predicción. Inténtalo de nuevo.',
    invalid: 'Introduce coordenadas válidas: latitud entre −90 y 90, longitud entre −180 y 180.',
    geoError: 'No se pudo acceder a la ubicación. Comprueba los permisos del navegador.',
    forecast: 'Predicción de modelo (no medición real)', updated: 'Actualización del modelo',
    current: 'Temperatura prevista', feels: 'Sensación estimada', noValue: 'No disponible',
    rain: 'Lluvia prevista', next24: 'Próximas 24 horas', next6: 'Próximas 6 horas',
    mm: 'mm = l/m²', rainIncomplete: 'No hay suficientes intervalos horarios para sumar ese periodo.',
    hourly: 'Próximas horas', time: 'Hora (UTC)', temperature: 'Temperatura', amount: 'Lluvia', chance: 'Probabilidad',
    probability: 'Mayor probabilidad horaria', probabilityNote: 'Valor del intervalo, cuando el proveedor lo publica.',
    wind: 'Viento', gust: 'Ráfagas', direction: 'Dirección', humidity: 'Humedad', pressure: 'Presión',
    dew: 'Punto de rocío', clouds: 'Nubosidad', fog: 'Niebla', uv: 'UV cielo despejado',
    info: 'Los horarios se indican en UTC; la ubicación elegida puede tener otro huso horario.',
    alerts: 'Avisos meteorológicos', maps: 'Radar y rayos', outlook: 'Tendencias a largo plazo',
    notReady: 'Integración pendiente', alertsCopy: 'Todavía no se muestran avisos oficiales. No interpretes esta ausencia como que no existe riesgo meteorológico.',
    mapsCopy: 'Estamos preparando mapas de radar y rayos con proveedores y licencias verificadas.',
    outlookCopy: 'La previsión de este proveedor cubre aproximadamente 9 días. Los escenarios a 30–36 días se añadirán aparte, con incertidumbre explícita.',
    details: 'Variables disponibles', attribution: 'Predicción: MET Norway · datos sujetos a condiciones de atribución',
    notice: 'Producto experimental. No sustituyas los avisos de los servicios meteorológicos oficiales por esta herramienta.',
    back: 'Volver a Lab', site: 'Archic',
  },
  en: {
    label: 'WEATHER / ARCHIC LAB', title: 'Weather, made clearer.',
    subtitle: 'Forecast data with context, quantities and transparent sources.',
    location: 'Location', coordinates: 'Or enter coordinates', latitude: 'Latitude', longitude: 'Longitude',
    explore: 'Go', device: 'Use my location', refresh: 'Refresh', simple: 'Overview', advanced: 'Detail',
    loading: 'Loading forecast…', failure: 'Unable to retrieve the forecast. Please try again.',
    invalid: 'Enter valid coordinates: latitude −90 to 90 and longitude −180 to 180.',
    geoError: 'Unable to get your location. Check your browser permissions.',
    forecast: 'Model forecast (not a station measurement)', updated: 'Model updated',
    current: 'Forecast temperature', feels: 'Estimated apparent temperature', noValue: 'Unavailable',
    rain: 'Forecast rainfall', next24: 'Next 24 hours', next6: 'Next 6 hours',
    mm: 'mm = litres/m²', rainIncomplete: 'Insufficient hourly periods to total this interval.',
    hourly: 'Next hours', time: 'Time (UTC)', temperature: 'Temperature', amount: 'Rainfall', chance: 'Probability',
    probability: 'Highest hourly rain chance', probabilityNote: 'Per-period estimate, only where the provider supplies it.',
    wind: 'Wind', gust: 'Gusts', direction: 'Direction', humidity: 'Humidity', pressure: 'Pressure',
    dew: 'Dew point', clouds: 'Cloud cover', fog: 'Fog', uv: 'Clear-sky UV',
    info: 'Times are displayed in UTC; your selected location may be in another time zone.',
    alerts: 'Official weather alerts', maps: 'Radar and lightning', outlook: 'Long-range outlook',
    notReady: 'Not connected yet', alertsCopy: 'Official warnings are not connected yet. This does not mean your location is free from weather risks.',
    mapsCopy: 'Radar and lightning layers will be added after provider coverage and licensing are verified.',
    outlookCopy: 'This source covers about 9 days. The 30–36 day outlook will be added separately and labelled with uncertainty.',
    details: 'Available variables', attribution: 'Forecast: MET Norway · attribution conditions apply',
    notice: 'Experimental tool. Always refer to official meteorological authorities for severe weather warnings.',
    back: 'Back to Lab', site: 'Archic',
  },
} as const

const fmt = (value: number | null | undefined, unit: string, locale: string, digits = 0) =>
  value === null || value === undefined || !Number.isFinite(value)
    ? '—'
    : new Intl.NumberFormat(locale, { maximumFractionDigits: digits }).format(value) + unit

export default function LabWeather() {
  const { lang } = useLang()
  const c = COPY[lang]
  const locale = lang === 'es' ? 'es-ES' : 'en-GB'
  const [place, setPlace] = useState<Place>(PLACES[0])
  const [latText, setLatText] = useState(String(PLACES[0].lat))
  const [lonText, setLonText] = useState(String(PLACES[0].lon))
  const [mode, setMode] = useState<'simple' | 'advanced'>('simple')
  const [revision, setRevision] = useState(0)
  const [payload, setPayload] = useState<WeatherPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')
    setPayload(null)
    const params = new URLSearchParams({ lat: String(place.lat), lon: String(place.lon) })
    fetch('/api/lab/weather?' + params.toString(), { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error('weather_unavailable')
        return res.json() as Promise<WeatherPayload>
      })
      .then((body) => {
        if (!Array.isArray(body.points) || !body.points.length || body.source?.type !== 'model_forecast') {
          throw new Error('invalid_weather')
        }
        setPayload(body)
      })
      .catch((cause: unknown) => {
        if (cause instanceof Error && cause.name === 'AbortError') return
        setError(c.failure)
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [place, revision, c.failure])

  const now = payload?.points.find((point) => Date.parse(point.time) >= Date.now() - 60 * 60 * 1000) ?? null
  const hourly = useMemo(() => {
    if (!payload) return []
    const start = Date.now() - 60 * 60 * 1000
    return payload.points.filter((p) => p.periodHours === 1 && Date.parse(p.time) >= start).slice(0, 24)
  }, [payload])
  const rain = (points: Point[], expected: number) =>
    points.length >= expected && points.every((p) => p.precipitationMm !== null)
      ? Number(points.slice(0, expected).reduce((sum, p) => sum + (p.precipitationMm ?? 0), 0).toFixed(1))
      : null
  const rain24 = rain(hourly, 24)
  const rain6 = rain(hourly, 6)
  const availableProbabilities = hourly.map((p) => p.precipitationProbabilityPct).filter((x): x is number => x !== null)
  const maxProbability = availableProbabilities.length ? Math.max(...availableProbabilities) : null
  const hour = (date: string) => new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }).format(new Date(date))
  const updated = payload?.updatedAt ? new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' }).format(new Date(payload.updatedAt)) + ' UTC' : '—'

  const choose = (next: Place) => {
    setPlace(next)
    setLatText(String(next.lat))
    setLonText(String(next.lon))
    setFormError('')
  }
  const submitCoordinates = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const lat = Number(latText)
    const lon = Number(lonText)
    if (!latText.trim() || !lonText.trim() || !Number.isFinite(lat) || !Number.isFinite(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      setFormError(c.invalid)
      return
    }
    choose({ id: 'coordinates', name: lang === 'es' ? 'Coordenadas seleccionadas' : 'Selected coordinates', lat, lon })
  }
  const useDevice = () => {
    if (!navigator.geolocation) { setFormError(c.geoError); return }
    navigator.geolocation.getCurrentPosition(
      (position) => choose({ id: 'device', name: lang === 'es' ? 'Mi ubicación' : 'My location', lat: position.coords.latitude, lon: position.coords.longitude }),
      () => setFormError(c.geoError),
      { maximumAge: 300000, timeout: 8000, enableHighAccuracy: false },
    )
  }

  const metrics = now ? [
    [c.feels, fmt(now.feelsLikeC, ' °C', locale, 1)],
    [c.humidity, fmt(now.humidityPct, ' %', locale)],
    [c.wind, fmt(now.windKmh, ' km/h', locale)],
    [c.gust, fmt(now.gustKmh, ' km/h', locale)],
    [c.direction, fmt(now.windFromDegrees, '°', locale)],
    [c.dew, fmt(now.dewPointC, ' °C', locale, 1)],
    [c.pressure, fmt(now.pressureHpa, ' hPa', locale)],
    [c.clouds, fmt(now.cloudPct, ' %', locale)],
    [c.fog, fmt(now.fogPct, ' %', locale)],
    [c.uv, fmt(now.uvClearSky, '', locale, 1)],
  ] : []

  return (
    <div className="lab-root lw-root">
      <Helmet htmlAttributes={{ lang }}>
        <title>{lang === 'es' ? 'Weather — lluvia y previsión | Archic Lab' : 'Weather — rainfall and forecast | Archic Lab'}</title>
        <meta name="description" content={c.subtitle} />
        <link rel="canonical" href={lang === 'es' ? 'https://archic.es/lab/weather/' : 'https://archic.es/en/lab/weather/'} />
        <link rel="alternate" hrefLang="es" href="https://archic.es/lab/weather/" />
        <link rel="alternate" hrefLang="en" href="https://archic.es/en/lab/weather/" />
        <link rel="alternate" hrefLang="x-default" href="https://archic.es/lab/weather/" />
      </Helmet>
      <header className="lw-header">
        <a className="lw-identity" href={lang === 'es' ? '/lab/' : '/en/lab/'}>
          <img src="/brand/archic-symbol-2026.svg" alt="" width="30" height="30" />
          <span>Archic Lab <b>/ Weather</b></span>
        </a>
        <nav aria-label={lang === 'es' ? 'Navegación' : 'Navigation'}>
          <a href={lang === 'es' ? '/lab/' : '/en/lab/'}>{c.back}</a>
          <a href={lang === 'es' ? '/' : '/en/'}>{c.site} ↗</a>
        </nav>
      </header>
      <main id="main-content" className="lw-main" tabIndex={-1}>
        <div className="lw-container">
          <div className="lw-heading">
            <p className="lab-kicker">{c.label}</p>
            <h1>{c.title}</h1>
            <p>{c.subtitle}</p>
          </div>
          <section className="lw-location" aria-label={c.location}>
            <div className="lw-location-top">
              <label htmlFor="lw-place">{c.location}</label>
              <select id="lw-place" value={place.id} onChange={(e) => {
                const item = PLACES.find((p) => p.id === e.target.value)
                if (item) choose(item)
              }}>
                {!PLACES.some((p) => p.id === place.id) && <option value={place.id}>{place.name}</option>}
                {PLACES.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
              <button className="lw-text-button" type="button" onClick={useDevice}>{c.device}</button>
            </div>
            <form className="lw-coordinate-form" onSubmit={submitCoordinates}>
              <span>{c.coordinates}</span>
              <label>{c.latitude}<input type="number" min="-90" max="90" step="any" value={latText} onChange={(e) => setLatText(e.target.value)} /></label>
              <label>{c.longitude}<input type="number" min="-180" max="180" step="any" value={lonText} onChange={(e) => setLonText(e.target.value)} /></label>
              <button type="submit">{c.explore} ↗</button>
            </form>
            {formError && <p className="lw-error" role="alert">{formError}</p>}
          </section>
          <div className="lw-viewbar">
            <div role="group" aria-label={lang === 'es' ? 'Nivel de detalle' : 'Detail level'} className="lw-mode">
              <button type="button" aria-pressed={mode === 'simple'} onClick={() => setMode('simple')}>{c.simple}</button>
              <button type="button" aria-pressed={mode === 'advanced'} onClick={() => setMode('advanced')}>{c.advanced}</button>
            </div>
            <button className="lw-text-button" type="button" onClick={() => setRevision((n) => n + 1)} disabled={loading}>{c.refresh} ↻</button>
          </div>
          {loading && <div className="lw-system-state" role="status">{c.loading}</div>}
          {error && !loading && <div className="lw-system-state lw-error" role="alert">{error}</div>}
          {payload && now && !loading && (
            <>
              <section className="lw-forecast" aria-labelledby="lw-current-title">
                <div className="lw-current">
                  <div>
                    <span className="lw-overline">{c.current}</span>
                    <h2 id="lw-current-title">{fmt(now.temperatureC, '°', locale, 1)}</h2>
                    <p>{place.name}</p>
                    <small>{c.forecast}</small>
                  </div>
                  <div className="lw-current-side">
                    <span>{c.feels}</span>
                    <strong>{fmt(now.feelsLikeC, ' °C', locale, 1)}</strong>
                    <small>{c.updated}: {updated}</small>
                  </div>
                </div>
                <div className="lw-rain" id="rain">
                  <div className="lw-rain-head"><span>{c.rain}</span><strong>{c.next24}</strong></div>
                  <div className="lw-rain-number">
                    <strong>{rain24 !== null ? fmt(rain24, '', locale, 1) : '—'}</strong>
                    <span>l/m²</span>
                  </div>
                  {rain24 === null && <p>{c.rainIncomplete}</p>}
                  <div className="lw-rain-stat">
                    <span>{c.next6}: <b>{fmt(rain6, ' mm', locale, 1)}</b></span>
                    <span>{c.probability}: <b>{fmt(maxProbability, ' %', locale)}</b></span>
                  </div>
                  <small>{c.probabilityNote}</small>
                </div>
              </section>
              <section className="lw-hourly" aria-labelledby="lw-hourly-title">
                <div className="lw-section-heading">
                  <h2 id="lw-hourly-title">{c.hourly}</h2>
                  <span>{c.info}</span>
                </div>
                <div className="lw-scroll">
                  <table>
                    <thead><tr><th scope="col">{c.time}</th><th scope="col">{c.temperature}</th><th scope="col">{c.amount}</th><th scope="col">{c.chance}</th></tr></thead>
                    <tbody>{hourly.slice(0, mode === 'advanced' ? 24 : 10).map((point) => (
                      <tr key={point.time}>
                        <td>{hour(point.time)}</td><td>{fmt(point.temperatureC, ' °C', locale, 1)}</td>
                        <td><span className="lw-rain-cell">{fmt(point.precipitationMm, ' mm', locale, 1)}</span></td>
                        <td>{fmt(point.precipitationProbabilityPct, ' %', locale)}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                  {!hourly.length && <p>{c.noValue}</p>}
                </div>
              </section>
              {mode === 'advanced' && (
                <section className="lw-details" id="details" aria-labelledby="lw-details-title">
                  <div className="lw-section-heading"><h2 id="lw-details-title">{c.details}</h2><span>{c.forecast}</span></div>
                  <dl>{metrics.map(([name, value]) => <div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}</dl>
                </section>
              )}
            </>
          )}
          <section className="lw-upcoming" id="alerts" aria-label={c.alerts}>
            <article><span>01 / {c.notReady}</span><h2>{c.alerts}</h2><p>{c.alertsCopy}</p></article>
            <article><span>02 / {c.notReady}</span><h2>{c.maps}</h2><p>{c.mapsCopy}</p></article>
            <article><span>03 / {c.notReady}</span><h2>{c.outlook}</h2><p>{c.outlookCopy}</p></article>
          </section>
          <footer className="lw-footer">
            <p>{c.notice}</p>
            <a href="https://api.met.no/" target="_blank" rel="noopener noreferrer">{c.attribution} ↗</a>
          </footer>
        </div>
      </main>
    </div>
  )
}
