import { useId, useMemo, useState } from 'react'
import type { Point } from './weatherClient'
import { findWeatherWindows, WINDOW_PRESETS, type WindowCriteria } from './weatherWindow'

type Preset = 'walk' | 'sport' | 'outdoors' | 'custom'
const COPY = {
  es: {
    heading: 'Weather Window', kicker: 'Encuentra tu momento', lead: 'Las próximas horas, ordenadas según tus preferencias.',
    walk: 'Pasear', sport: 'Deporte', outdoors: 'Exterior',
    closest: 'No hay una franja que cumpla todos los criterios. Estas son las más cercanas.',
    match: 'Franjas que cumplen tus criterios', top: 'Mejor franja', next: 'Otras franjas',
    noData: 'No hay suficientes horas futuras con lluvia, temperatura y viento disponibles para comparar.',
    rain: 'Lluvia total', temp: 'Temperatura', wind: 'Viento máximo',
    criteria: 'Personalizar criterios', duration: 'Duración', rainLimit: 'Lluvia máxima por hora',
    windLimit: 'Viento máximo', minTemp: 'Temperatura mínima', maxTemp: 'Temperatura máxima',
    hour: 'hora', hours: 'horas', note: 'Comparación de predicciones, no garantía de buen tiempo ni evaluación de seguridad. Se descartan las horas sin datos y la hora que ya ha empezado. No incluye avisos oficiales ni ráfagas en los criterios.',
    noMatch: 'No se ha encontrado una franja utilizable en el horizonte horario.',
  },
  en: {
    heading: 'Weather Window', kicker: 'Find your moment', lead: 'Upcoming hours ranked by your preferences.',
    walk: 'Walking', sport: 'Exercise', outdoors: 'Outdoors',
    closest: 'No time window meets every criterion. These are the closest alternatives.',
    match: 'Windows matching your criteria', top: 'Best window', next: 'Other windows',
    noData: 'Not enough future hours with complete rain, temperature and wind data to compare.',
    rain: 'Total rain', temp: 'Temperature', wind: 'Maximum wind',
    criteria: 'Customize criteria', duration: 'Duration', rainLimit: 'Maximum rain per hour',
    windLimit: 'Maximum wind', minTemp: 'Minimum temperature', maxTemp: 'Maximum temperature',
    hour: 'hour', hours: 'hours', note: 'Comparison of model forecasts, not a promise of good weather or a safety assessment. Missing hours and the hour already in progress are excluded. Official warnings and gusts are not included in these criteria.',
    noMatch: 'No usable window found within the hourly forecast.',
  },
}
const formatter = (n: number, locale: string, digits: number) =>
  new Intl.NumberFormat(locale, { maximumFractionDigits: digits }).format(n)
const clamp = (v: number, lo: number, hi: number, fallback: number) =>
  Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : fallback

export function WeatherWindow({ hourly, lang, locale, timeZone, now }: {
  hourly: Point[]; lang: 'es' | 'en'; locale: string; timeZone: string; now: number
}) {
  const t = COPY[lang], id = useId()
  const [preset, setPreset] = useState<Preset>('walk')
  const [criteria, setCriteria] = useState<WindowCriteria>({ ...WINDOW_PRESETS.walk })
  const result = useMemo(() => findWeatherWindows(hourly, now, criteria), [hourly, now, criteria])
  const formatted = (s: string) => new Intl.DateTimeFormat(locale,
    { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone }).format(new Date(s))
  const selectPreset = (p: Exclude<Preset, 'custom'>) => { setPreset(p); setCriteria({ ...WINDOW_PRESETS[p] }) }
  const change = (field: keyof WindowCriteria, value: number, lo: number, hi: number) => {
    setPreset('custom')
    setCriteria(c => ({ ...c, [field]: clamp(value, lo, hi, c[field]) }))
  }
  return <section className="lw-section ww-section" aria-labelledby={id + '-heading'}>
    <div className="lw-section-head">
      <div><p className="ww-kicker">{t.kicker}</p><h2 id={id + '-heading'}>{t.heading}</h2></div>
      <div className="ww-presets" role="group" aria-label={lang === 'es' ? 'Actividad' : 'Activity'}>
        {(['walk', 'sport', 'outdoors'] as const).map(p =>
          <button key={p} type="button" aria-pressed={preset === p} onClick={() => selectPreset(p)}>{t[p]}</button>)}
      </div>
    </div>
    <p className="ww-lead">{t.lead}</p>
    <details className="ww-settings">
      <summary>{t.criteria}</summary>
      <div className="ww-fields">
        <label>{t.duration}
          <select value={criteria.duration} onChange={e => change('duration', Number(e.target.value), 1, 3)}>
            {[1, 2, 3].map(h => <option key={h} value={h}>{h} {h === 1 ? t.hour : t.hours}</option>)}
          </select>
        </label>
        <label>{t.rainLimit} <span>mm/h</span>
          <input type="number" min="0" max="20" step="0.1" value={criteria.rainMax}
            onChange={e => change('rainMax', Number(e.target.value), 0, 20)} />
        </label>
        <label>{t.windLimit} <span>km/h</span>
          <input type="number" min="0" max="150" step="1" value={criteria.windMax}
            onChange={e => change('windMax', Number(e.target.value), 0, 150)} />
        </label>
        <label>{t.minTemp} <span>°C</span>
          <input type="number" min="-50" max="60" step="1" value={criteria.tempMin}
            onChange={e => change('tempMin', Number(e.target.value), -50, 60)} />
        </label>
        <label>{t.maxTemp} <span>°C</span>
          <input type="number" min="-50" max="60" step="1" value={criteria.tempMax}
            onChange={e => change('tempMax', Number(e.target.value), -50, 60)} />
        </label>
      </div>
    </details>
    <div className="ww-results" aria-live="polite" aria-atomic="true">
      {!result.windows.length ? <p className="ww-empty">{result.candidates ? t.noMatch : t.noData}</p> : <>
        <p className="ww-subtitle">{result.matchesFound ? t.match : t.closest}</p>
        <ol className="ww-list">{result.windows.map((w, i) => <li className="ww-item" key={w.start} data-primary={i === 0 || undefined}>
          <div className="ww-number">{String(i + 1).padStart(2, '0')}</div>
          <div className="ww-time"><strong>{formatted(w.start)} – {formatted(w.end)}</strong>
            {i === 0 && <span>{result.matchesFound ? t.top : t.closest}</span>}</div>
          <dl className="ww-measures">
            <div><dt>{t.rain}</dt><dd>{formatter(w.rainMm, locale, 2)} mm</dd></div>
            <div><dt>{t.temp}</dt><dd>{formatter(w.tempMinC, locale, 0)}–{formatter(w.tempMaxC, locale, 0)} °C</dd></div>
            <div><dt>{t.wind}</dt><dd>{formatter(w.windMaxKmh, locale, 0)} km/h</dd></div>
          </dl>
        </li>)}</ol>
      </>}
    </div>
    <p className="ww-note">{t.note}</p>
  </section>
}
