import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Helmet } from 'react-helmet-async'
import '@fontsource-variable/geist/wght.css'
import { useLang } from '../i18n/LanguageContext'
import { upcomingHourly, rainTotal, chartMax } from '../lab/weatherMath'
import '../styles/archic-light.css'
import '../styles/archic-lab.css'

type Place = { id: string; name: { es: string; en: string }; lat: number; lon: number; timeZone: string }
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
  { id: 'ecija', name: { es: 'Écija', en: 'Écija' }, lat: 37.541, lon: -5.083, timeZone: 'Europe/Madrid' },
  { id: 'sevilla', name: { es: 'Sevilla', en: 'Seville' }, lat: 37.389, lon: -5.984, timeZone: 'Europe/Madrid' },
  { id: 'madrid', name: { es: 'Madrid', en: 'Madrid' }, lat: 40.417, lon: -3.704, timeZone: 'Europe/Madrid' },
  { id: 'london', name: { es: 'Londres', en: 'London' }, lat: 51.507, lon: -0.128, timeZone: 'Europe/London' },
  { id: 'new-york', name: { es: 'Nueva York', en: 'New York' }, lat: 40.713, lon: -74.006, timeZone: 'America/New_York' },
  { id: 'tokyo', name: { es: 'Tokio', en: 'Tokyo' }, lat: 35.676, lon: 139.65, timeZone: 'Asia/Tokyo' },
]

const COPY = {
  es: {
    title: 'Archic Lab Weather — lluvia y previsión',
    description: 'Predicción meteorológica por horas y lluvia en litros por metro cuadrado, con fuente y hora de actualización visibles.',
    location: 'Ubicación', device: 'Usar mi ubicación', coords: 'Introducir coordenadas', latitude: 'Latitud', longitude: 'Longitud', go: 'Consultar',
    simple: 'Resumen', detail: 'Detalle', refresh: 'Actualizar', mode: 'Nivel de detalle',
    loading: 'Consultando la predicción…', failure: 'No hemos podido obtener la predicción.', retry: 'Reintentar', empty: 'La fuente no ha devuelto intervalos horarios para esta ubicación.',
    invalid: 'Introduce una latitud entre −90 y 90 y una longitud entre −180 y 180.',
    geoError: 'No se pudo acceder a tu ubicación. Revisa los permisos del navegador.',
    model: 'Predicción de modelo, no observación', forHour: 'Para', rain24: 'Lluvia prevista · 24 h', rain6: 'Próximas 6 h', unit: 'l/m²',
    incomplete: 'No disponible: la fuente no cubre 24 horas seguidas.', incomplete6: 'No disponible',
    wind: 'Viento', humidity: 'Humedad', updated: 'Actualizado', feels: 'Sensación', gust: 'Ráfagas', direction: 'Dirección', dew: 'Punto de rocío', pressure: 'Presión', clouds: 'Nubosidad', fog: 'Niebla', uv: 'UV cielo despejado', chance: 'Probabilidad',
    chartTitle: 'Lluvia por hora', chartRange: (n: number) => `Próximas ${n} h · mm (l/m²)`,
    chartSummary: (n: number, total: string, max: string, at: string) => `Lluvia prevista por hora durante ${n} horas. Total ${total}. Máximo horario ${max}${at ? ' a las ' + at : ''}.`,
    hours: 'Próximas horas', table: 'Predicción hora a hora', time: 'Hora', temp: 'Temperatura', rain: 'Lluvia', metrics: 'Variables del intervalo actual',
    tzLocal: (tz: string) => `Hora local (${tz})`, tzUtc: 'Hora UTC',
    note: 'Weather muestra predicciones de modelo y no incluye avisos oficiales. En España, consulta los avisos de',
    noteEnd: 'Fuera de España, tu servicio meteorológico nacional.',
    aemet: 'https://www.aemet.es/es/eltiempo/prediccion/avisos',
    source: 'Datos: MET Norway, Locationforecast 2.0', license: 'CC BY 4.0', processed: 'Procesados por Archic Lab (unidades, acumulados y horario).',
    lab: 'Lab', home: 'Inicio', nav: 'Navegación de Weather', langLabel: 'Idioma',
    myLocation: 'Mi ubicación', selectedCoords: 'Coordenadas',
  },
  en: {
    title: 'Archic Lab Weather — rainfall and forecast',
    description: 'Hourly weather forecasts and rainfall in millimetres, with the source and update time in view.',
    location: 'Location', device: 'Use my location', coords: 'Enter coordinates', latitude: 'Latitude', longitude: 'Longitude', go: 'Go',
    simple: 'Overview', detail: 'Detail', refresh: 'Refresh', mode: 'Detail level',
    loading: 'Loading the forecast…', failure: 'We could not load the forecast.', retry: 'Try again', empty: 'The source returned no hourly intervals for this location.',
    invalid: 'Enter a latitude between −90 and 90 and a longitude between −180 and 180.',
    geoError: 'We could not access your location. Check your browser permissions.',
    model: 'Model forecast, not an observation', forHour: 'For', rain24: 'Forecast rainfall · 24 h', rain6: 'Next 6 h', unit: 'mm',
    incomplete: 'Unavailable: the source does not cover 24 consecutive hours.', incomplete6: 'Unavailable',
    wind: 'Wind', humidity: 'Humidity', updated: 'Updated', feels: 'Feels like', gust: 'Gusts', direction: 'Direction', dew: 'Dew point', pressure: 'Pressure', clouds: 'Cloud cover', fog: 'Fog', uv: 'Clear-sky UV', chance: 'Probability',
    chartTitle: 'Hourly rainfall', chartRange: (n: number) => `Next ${n} h · mm`,
    chartSummary: (n: number, total: string, max: string, at: string) => `Forecast rainfall per hour over ${n} hours. Total ${total}. Hourly peak ${max}${at ? ' at ' + at : ''}.`,
    hours: 'Next hours', table: 'Hour-by-hour forecast', time: 'Time', temp: 'Temperature', rain: 'Rain', metrics: 'Current interval variables',
    tzLocal: (tz: string) => `Local time (${tz})`, tzUtc: 'UTC time',
    note: 'Weather shows model forecasts and does not include official warnings. In Spain, check the warnings from',
    noteEnd: 'Elsewhere, refer to your national weather service.',
    aemet: 'https://www.aemet.es/en/eltiempo/prediccion/avisos',
    source: 'Data: MET Norway, Locationforecast 2.0', license: 'CC BY 4.0', processed: 'Processed by Archic Lab (units, totals and time zone).',
    lab: 'Lab', home: 'Home', nav: 'Weather navigation', langLabel: 'Language',
    myLocation: 'My location', selectedCoords: 'Coordinates',
  },
} as const

// Lovable Cloud Edge Function "lab-weather" (public GET). Only the public URL + publishable key are used here.
const WEATHER_FN_URL = import.meta.env.VITE_SUPABASE_URL + '/functions/v1/lab-weather'
const PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string

const fmt = (value: number | null | undefined, unit: string, locale: string, digits = 0) =>
  value === null || value === undefined || !Number.isFinite(value)
    ? '—'
    : new Intl.NumberFormat(locale, { maximumFractionDigits: digits, minimumFractionDigits: digits ? Math.min(digits, 1) : 0 }).format(value) + unit

const compass = (deg: number | null, lang: 'es' | 'en') => {
  if (deg === null || !Number.isFinite(deg)) return ''
  const es = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO']
  const en = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return (lang === 'es' ? es : en)[Math.round(((deg % 360) + 360) % 360 / 45) % 8]
}

function RainChart({ hourly, locale, timeZone, label }: { hourly: Point[]; locale: string; timeZone: string; label: string }) {
  const W = 720, H = 200, top = 12, bottom = 28, left = 32, right = 8
  const max = chartMax(hourly)
  const plotH = H - top - bottom
  const step = (W - left - right) / Math.max(hourly.length, 1)
  const barW = Math.max(4, step * 0.62)
  const hour = (t: string) => new Intl.DateTimeFormat(locale, { hour: '2-digit', timeZone }).format(new Date(t))
  const n = (v: number) => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(v)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label}>
      <line className="grid" x1={left} x2={W - right} y1={top} y2={top} />
      <line className="grid" x1={left} x2={W - right} y1={top + plotH / 2} y2={top + plotH / 2} />
      <line className="axis" x1={left} x2={W - right} y1={top + plotH} y2={top + plotH} />
      <text x={left - 6} y={top + 4} textAnchor="end">{n(max)}</text>
      <text x={left - 6} y={top + plotH / 2 + 4} textAnchor="end">{n(max / 2)}</text>
      <text x={left - 6} y={top + plotH + 4} textAnchor="end">0</text>
      {hourly.map((p, i) => {
        const v = p.precipitationMm
        const x = left + i * step + (step - barW) / 2
        if (v === null) return null
        const h = (Math.max(0, v) / max) * plotH
        return v > 0
          ? <rect key={p.time} className="bar" x={x} y={top + plotH - h} width={barW} height={Math.max(h, 1.5)} rx={2} />
          : <rect key={p.time} className="bar-zero" x={x} y={top + plotH - 1.5} width={barW} height={1.5} rx={0.75} />
      })}
      {hourly.map((p, i) => (i % 3 === 0 ? (
        <text key={'t' + p.time} x={left + i * step + step / 2} y={H - 8} textAnchor="middle">{hour(p.time)}</text>
      ) : null))}
    </svg>
  )
}

export default function LabWeather() {
  const { lang, setLang, canSwitchLang } = useLang()
  const c = COPY[lang]
  const locale = lang === 'es' ? 'es-ES' : 'en-GB'
  const [place, setPlace] = useState<Place>(PLACES[0])
  const [latText, setLatText] = useState(String(PLACES[0].lat))
  const [lonText, setLonText] = useState(String(PLACES[0].lon))
  const [mode, setMode] = useState<'simple' | 'detail'>('simple')
  const [revision, setRevision] = useState(0)
  const [payload, setPayload] = useState<WeatherPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [formError, setFormError] = useState('')
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(false)
    const params = new URLSearchParams({ lat: String(place.lat), lon: String(place.lon) })
    fetch(WEATHER_FN_URL + '?' + params.toString(), { method: 'GET', headers: { apikey: PUBLISHABLE_KEY }, signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error('weather_unavailable')
        return res.json() as Promise<WeatherPayload>
      })
      .then((body) => {
        if (!Array.isArray(body.points) || body.source?.type !== 'model_forecast') throw new Error('invalid_weather')
        setPayload(body)
        setNow(Date.now())
      })
      .catch((cause: unknown) => {
        if (cause instanceof Error && cause.name === 'AbortError') return
        setPayload(null)
        setError(true)
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [place, revision])

  const hourly = useMemo(() => (payload ? upcomingHourly(payload.points, now, 24) : []), [payload, now])
  const current = hourly[0] ?? null
  const rain24 = rainTotal(hourly, 24)
  const rain6 = rainTotal(hourly, 6)
  const tz = place.timeZone
  const tzLabel = tz === 'UTC' ? c.tzUtc : c.tzLocal(tz)
  const hour = (t: string) => new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', timeZone: tz }).format(new Date(t))
  const updated = payload?.updatedAt
    ? new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: tz }).format(new Date(payload.updatedAt))
    : '—'
  const placeName = place.name[lang]
  const peak = hourly.reduce<Point | null>((best, p) => (p.precipitationMm !== null && (best === null || (p.precipitationMm ?? 0) > (best.precipitationMm ?? 0)) ? p : best), null)
  const chartTotal = rainTotal(hourly, hourly.length)
  const chartLabel = c.chartSummary(
    hourly.length,
    chartTotal === null ? '—' : fmt(chartTotal, ' mm', locale, 1),
    fmt(peak?.precipitationMm ?? null, ' mm', locale, 1),
    peak && (peak.precipitationMm ?? 0) > 0 ? hour(peak.time) : '',
  )

  const choose = (next: Place) => {
    setPlace(next)
    setLatText(String(Number(next.lat.toFixed(4))))
    setLonText(String(Number(next.lon.toFixed(4))))
    setFormError('')
  }
  const submitCoordinates = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const lat = Number(latText.replace(',', '.'))
    const lon = Number(lonText.replace(',', '.'))
    if (!latText.trim() || !lonText.trim() || !Number.isFinite(lat) || !Number.isFinite(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      setFormError(c.invalid)
      return
    }
    choose({ id: 'coordinates', name: { es: `${c.selectedCoords} ${lat.toFixed(2)}, ${lon.toFixed(2)}`, en: `${COPY.en.selectedCoords} ${lat.toFixed(2)}, ${lon.toFixed(2)}` }, lat, lon, timeZone: 'UTC' })
  }
  const useDevice = () => {
    if (!navigator.geolocation) { setFormError(c.geoError); return }
    navigator.geolocation.getCurrentPosition(
      (pos) => choose({
        id: 'device', name: { es: COPY.es.myLocation, en: COPY.en.myLocation },
        lat: pos.coords.latitude, lon: pos.coords.longitude,
        // The device is where the user is, so its own time zone is the honest local time.
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
      }),
      () => setFormError(c.geoError),
      { maximumAge: 300000, timeout: 8000, enableHighAccuracy: false },
    )
  }

  const metrics: [string, string][] = current ? [
    [c.feels, fmt(current.feelsLikeC, ' °C', locale, 1)],
    [c.humidity, fmt(current.humidityPct, ' %', locale)],
    [c.wind, fmt(current.windKmh, ' km/h', locale)],
    [c.gust, fmt(current.gustKmh, ' km/h', locale)],
    [c.direction, current.windFromDegrees === null ? '—' : `${compass(current.windFromDegrees, lang)} · ${fmt(current.windFromDegrees, '°', locale)}`],
    [c.dew, fmt(current.dewPointC, ' °C', locale, 1)],
    [c.pressure, fmt(current.pressureHpa, ' hPa', locale)],
    [c.clouds, fmt(current.cloudPct, ' %', locale)],
    [c.fog, fmt(current.fogPct, ' %', locale)],
    [c.uv, fmt(current.uvClearSky, '', locale, 1)],
  ] : []
  const nextHour = current ? new Date(Date.parse(current.time) + 3600000).toISOString() : ''

  return (
    <div className="al-site lw-root">
      <Helmet htmlAttributes={{ lang }}>
        <title>{c.title}</title>
        <meta name="description" content={c.description} />
        <meta name="theme-color" content="#F8F9FB" />
        <link rel="canonical" href={lang === 'es' ? 'https://archic.es/lab/weather/' : 'https://archic.es/en/lab/weather/'} />
        <link rel="alternate" hrefLang="es" href="https://archic.es/lab/weather/" />
        <link rel="alternate" hrefLang="en" href="https://archic.es/en/lab/weather/" />
        <link rel="alternate" hrefLang="x-default" href="https://archic.es/lab/weather/" />
      </Helmet>

      <header className="lw-header">
        <a className="lw-identity" href={lang === 'es' ? '/' : '/en/'} aria-label={lang === 'es' ? 'Archic Lab · inicio' : 'Archic Lab · home'}>
          <img src="/brand/archic-lockup-dark.svg" alt="" width={981} height={174} />
          <span className="as-brand-lab" aria-hidden="true">LAB</span>
          <b aria-hidden="true">Weather</b>
        </a>
        <nav aria-label={c.nav}>
          <a href={lang === 'es' ? '/lab/' : '/en/lab/'}>{c.lab}</a>
          <a className="lw-hide-sm" href={lang === 'es' ? '/' : '/en/'}>{c.home}</a>
          {canSwitchLang && (
            <span role="group" aria-label={c.langLabel} style={{ display: 'inline-flex' }}>
              <button type="button" aria-pressed={lang === 'es'} onClick={() => setLang('es')}>ES</button>
              <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
            </span>
          )}
        </nav>
      </header>

      <main id="main-content" className="lw-main" tabIndex={-1}>
        <h1 className="lw-sr">{c.title}</h1>
        <div className="lw-toolbar">
          <div className="lw-place">
            <label htmlFor="lw-place">{c.location}</label>
            <span className="lw-select-wrap">
              <select id="lw-place" value={place.id} onChange={(e) => {
                const item = PLACES.find((p) => p.id === e.target.value)
                if (item) choose(item)
              }}>
                {!PLACES.some((p) => p.id === place.id) && <option value={place.id}>{placeName}</option>}
                {PLACES.map((item) => <option key={item.id} value={item.id}>{item.name[lang]}</option>)}
              </select>
            </span>
          </div>
          <div className="lw-controls">
            <div className="lw-seg" role="group" aria-label={c.mode}>
              <button type="button" aria-pressed={mode === 'simple'} onClick={() => setMode('simple')}>{c.simple}</button>
              <button type="button" aria-pressed={mode === 'detail'} onClick={() => setMode('detail')}>{c.detail}</button>
            </div>
            <button className="lw-iconbtn" type="button" onClick={useDevice}>{c.device}</button>
            <button className="lw-iconbtn" type="button" onClick={() => setRevision((n) => n + 1)} disabled={loading}>{c.refresh}</button>
          </div>
        </div>

        <details className="lw-coords">
          <summary>{c.coords}</summary>
          <form onSubmit={submitCoordinates} noValidate>
            <label>{c.latitude}<input inputMode="decimal" autoComplete="off" value={latText} onChange={(e) => setLatText(e.target.value)} /></label>
            <label>{c.longitude}<input inputMode="decimal" autoComplete="off" value={lonText} onChange={(e) => setLonText(e.target.value)} /></label>
            <button className="al-btn al-btn-primary" type="submit">{c.go}</button>
          </form>
        </details>
        {formError && <p className="lw-error" role="alert">{formError}</p>}

        <div aria-live="polite" aria-busy={loading}>
          {loading && !payload && <><p className="lw-sr" role="status">{c.loading}</p><div className="lw-skeleton" aria-hidden="true" /></>}
          {error && !loading && (
            <div className="lw-state" role="alert">
              <p>{c.failure}</p>
              <button className="lw-iconbtn" type="button" onClick={() => setRevision((n) => n + 1)}>{c.retry}</button>
            </div>
          )}
          {payload && !error && !current && !loading && <div className="lw-state"><p>{c.empty}</p></div>}
          {payload && !error && current && (
            <div style={{ opacity: loading ? 0.6 : 1, transition: 'opacity .15s ease' }}>
              <section className="lw-hero" aria-labelledby="lw-now-title">
                <div className="lw-now">
                  <div className="lw-now-top"><span id="lw-now-title">{placeName}</span><span>{c.model}</span></div>
                  <div>
                    <p className="lw-temp">{current.temperatureC === null ? '—' : Math.round(current.temperatureC)}<sup>°C</sup></p>
                    <small>{c.forHour} {hour(current.time)}–{hour(nextHour)} · {tzLabel}</small>
                  </div>
                </div>
                <div className="lw-rain">
                  <div>
                    <h2>{c.rain24}</h2>
                    <p className="lw-rain-num"><strong>{rain24 === null ? '—' : fmt(rain24, '', locale, 1)}</strong>{rain24 !== null && <span>{c.unit}</span>}</p>
                    {rain24 === null && <p className="al-small">{c.incomplete}</p>}
                    <p className="al-small" style={{ marginTop: 8 }}>{c.rain6}: <b style={{ color: 'var(--al-ink)' }}>{rain6 === null ? c.incomplete6 : fmt(rain6, ' ' + c.unit, locale, 1)}</b></p>
                  </div>
                  <dl className="lw-facts">
                    <div><dt>{c.wind}</dt><dd>{fmt(current.windKmh, ' km/h', locale)} {compass(current.windFromDegrees, lang)}</dd></div>
                    <div><dt>{c.humidity}</dt><dd>{fmt(current.humidityPct, ' %', locale)}</dd></div>
                    <div><dt>{c.feels}</dt><dd>{fmt(current.feelsLikeC, ' °C', locale, 1)}</dd></div>
                    <div><dt>{c.updated}</dt><dd>{updated}</dd></div>
                  </dl>
                </div>
              </section>

              <section className="lw-card" aria-labelledby="lw-chart-title">
                <div className="lw-card-head"><h2 id="lw-chart-title">{c.chartTitle}</h2><span>{c.chartRange(hourly.length)} · {tzLabel}</span></div>
                <figure className="lw-chart">
                  <RainChart hourly={hourly} locale={locale} timeZone={tz} label={chartLabel} />
                  <figcaption>{chartLabel}</figcaption>
                </figure>
              </section>

              <section className="lw-card" aria-labelledby="lw-hours-title">
                <div className="lw-card-head"><h2 id="lw-hours-title">{c.hours}</h2><span>{tzLabel}</span></div>
                <ul className="lw-strip">
                  {hourly.map((p) => (
                    <li key={p.time}>
                      <time dateTime={p.time}>{hour(p.time)}</time>
                      <strong>{p.temperatureC === null ? '—' : `${Math.round(p.temperatureC)}°`}</strong>
                      <span>{fmt(p.precipitationMm, ' mm', locale, 1)}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {mode === 'detail' && (
                <>
                  <section className="lw-card" aria-labelledby="lw-table-title">
                    <div className="lw-card-head"><h2 id="lw-table-title">{c.table}</h2><span>{tzLabel}</span></div>
                    <div className="lw-table-wrap" tabIndex={0} role="region" aria-labelledby="lw-table-title">
                      <table className="lw-table">
                        <thead><tr><th scope="col">{c.time}</th><th scope="col">{c.temp}</th><th scope="col">{c.rain}</th><th scope="col">{c.chance}</th><th scope="col">{c.wind}</th><th scope="col">{c.humidity}</th></tr></thead>
                        <tbody>{hourly.map((p) => (
                          <tr key={p.time}>
                            <th scope="row" style={{ fontWeight: 500 }}>{hour(p.time)}</th>
                            <td>{fmt(p.temperatureC, ' °C', locale, 1)}</td>
                            <td>{fmt(p.precipitationMm, ' mm', locale, 1)}</td>
                            <td>{fmt(p.precipitationProbabilityPct, ' %', locale)}</td>
                            <td>{fmt(p.windKmh, ' km/h', locale)}</td>
                            <td>{fmt(p.humidityPct, ' %', locale)}</td>
                          </tr>
                        ))}</tbody>
                      </table>
                    </div>
                  </section>
                  <section className="lw-card" aria-labelledby="lw-metrics-title">
                    <div className="lw-card-head"><h2 id="lw-metrics-title">{c.metrics}</h2><span>{hour(current.time)} · {c.model}</span></div>
                    <dl className="lw-metrics">{metrics.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
                  </section>
                </>
              )}
            </div>
          )}
        </div>

        <p className="lw-note">
          {c.note} <a href={c.aemet} target="_blank" rel="noopener noreferrer">AEMET ↗</a>. {c.noteEnd}
        </p>

        <footer className="lw-foot">
          <p>
            <a href="https://api.met.no/weatherapi/locationforecast/2.0/documentation" target="_blank" rel="noopener noreferrer">{c.source}</a>
            {' · '}
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer license">{c.license}</a>
            {'. '}{c.processed}
          </p>
        </footer>
      </main>
    </div>
  )
}
