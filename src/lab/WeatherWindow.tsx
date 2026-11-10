import { useEffect, useId, useMemo, useState } from 'react'
import type { Point } from './weatherClient'
import { availableWindowDays, findWeatherWindows, windowFitIssues, WINDOW_PRESETS, type WindowCriteria } from './weatherWindow'

type Preset = 'walk' | 'sport' | 'outdoors' | 'custom'
const COPY = {
  es: {
    heading: 'Weather Window', kicker: 'Encuentra tu momento', lead: 'Las próximas horas, ordenadas según tus preferencias.',
    walk: 'Pasear', sport: 'Deporte', outdoors: 'Exterior',
    days: 'Elegir día', allDays: 'Todos',
    schedule: 'Horario a considerar', usual: '08:00–22:00 (hora local)', anyHour: 'Cualquier hora',
    coverage: (n: number, usual: boolean) => `${n} horas futuras con datos completos. ${usual ? 'Buscando franjas entre las 08:00 y las 22:00, hora local.' : 'Incluye también los horarios nocturnos.'}`,
    closest: 'No hay una franja que cumpla todos los criterios. Estas son las más cercanas.',
    match: 'Franjas que cumplen tus criterios', top: 'Mejor franja', next: 'Otras franjas',
    noData: 'No hay suficientes horas futuras con lluvia, temperatura y viento disponibles para comparar. Los periodos de 6 o 12 horas no se tratan como datos horarios.',
    rain: 'Lluvia total', temp: 'Temperatura', wind: 'Viento máximo',
    criteria: 'Personalizar criterios', duration: 'Duración', rainLimit: 'Lluvia máxima por hora',
    windLimit: 'Viento máximo', minTemp: 'Temperatura mínima', maxTemp: 'Temperatura máxima',
    hour: 'hora', hours: 'horas', note: 'Comparación de predicciones, no garantía de buen tiempo ni evaluación de seguridad. Se descartan las horas sin datos y la hora que ya ha empezado. No incluye avisos oficiales ni ráfagas en los criterios.',
    noMatch: 'No se ha encontrado una franja utilizable en el horizonte horario.',
    fits: 'Cumple los límites de lluvia, viento y temperatura.', exceeds: 'No cumple:', rainIssue: 'lluvia por hora', windIssue: 'viento', tempIssue: 'temperatura', peak: 'Máximo de lluvia en una hora',
  },
  en: {
    heading: 'Weather Window', kicker: 'Find your moment', lead: 'Upcoming hours ranked by your preferences.',
    walk: 'Walking', sport: 'Exercise', outdoors: 'Outdoors',
    days: 'Choose day', allDays: 'All',
    schedule: 'Times to consider', usual: '08:00–22:00 (local time)', anyHour: 'Any time',
    coverage: (n: number, usual: boolean) => `${n} future hours have complete data. ${usual ? 'Considering 08:00–22:00 in local time.' : 'Includes overnight hours.'}`,
    closest: 'No time window meets every criterion. These are the closest alternatives.',
    match: 'Windows matching your criteria', top: 'Best window', next: 'Other windows',
    noData: 'Not enough future hours with complete rain, temperature and wind data to compare. Six- and twelve-hour blocks are not treated as hourly values.',
    rain: 'Total rain', temp: 'Temperature', wind: 'Maximum wind',
    criteria: 'Customize criteria', duration: 'Duration', rainLimit: 'Maximum rain per hour',
    windLimit: 'Maximum wind', minTemp: 'Minimum temperature', maxTemp: 'Maximum temperature',
    hour: 'hour', hours: 'hours', note: 'Comparison of model forecasts, not a promise of good weather or a safety assessment. Missing hours and the hour already in progress are excluded. Official warnings and gusts are not included in these criteria.',
    noMatch: 'No usable window found within the hourly forecast.',
    fits: 'Meets the rain, wind and temperature limits.', exceeds: 'Outside limits:', rainIssue: 'hourly rain', windIssue: 'wind', tempIssue: 'temperature', peak: 'Peak hourly rain',
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
  const [day, setDay] = useState('all')
  const [schedule, setSchedule] = useState<'usual' | 'any'>('usual')
  const hoursRange = schedule === 'usual' ? { startHour: 8, endHour: 22 } : undefined
  const days = useMemo(
    () => availableWindowDays(hourly, now, criteria, timeZone, hoursRange),
    // 'schedule' is the stable primitive; hoursRange is a new lightweight object on render.
    [hourly, now, criteria, timeZone, schedule],
  )
  const activeDay = day === 'all' || days.some(d => d.key === day) ? day : 'all'
  useEffect(() => {
    if (day !== 'all' && !days.some(d => d.key === day)) setDay('all')
  }, [day, days])
  const result = useMemo(
    () => findWeatherWindows(hourly, now, criteria,
      schedule === 'any' && activeDay === 'all' ? undefined :
      { timeZone, ...(activeDay === 'all' ? {} : { dayKey: activeDay }), ...(schedule === 'usual' ? { startHour: 8, endHour: 22 } : {}) }),
    [hourly, now, criteria, activeDay, timeZone, schedule],
  )
  const completeHours = hourly.filter(p => Date.parse(p.time) >= now && p.periodHours === 1
    && p.precipitationMm !== null && Number.isFinite(p.precipitationMm) && p.precipitationMm >= 0
    && p.temperatureC !== null && Number.isFinite(p.temperatureC)
    && p.windKmh !== null && Number.isFinite(p.windKmh) && p.windKmh >= 0).length
  const dayLabel = (s: string) => new Intl.DateTimeFormat(locale, {
    weekday: 'short', day: 'numeric', month: 'short', timeZone,
  }).format(new Date(s))
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
    <div className="ww-day-select" role="group" aria-label={t.days}>
      <button type="button" aria-pressed={activeDay === 'all'} onClick={() => setDay('all')}>{t.allDays}</button>
      {days.map(d => <button type="button" key={d.key} aria-pressed={activeDay === d.key}
        onClick={() => setDay(d.key)}>{dayLabel(d.startsAt)}</button>)}
    </div>
    <p className="ww-coverage">{t.coverage(completeHours, schedule === 'usual')}</p>
    <details className="ww-settings">
      <summary>{t.criteria}</summary>
      <div className="ww-fields">
        <label>{t.schedule}
          <select value={schedule} onChange={e => setSchedule(e.target.value === 'any' ? 'any' : 'usual')}>
            <option value="usual">{t.usual}</option>
            <option value="any">{t.anyHour}</option>
          </select>
        </label>
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
          <p className="ww-explanation">
            {w.meetsCriteria ? t.fits : `${t.exceeds} ${windowFitIssues(w, criteria).map(issue =>
              issue === 'rain' ? t.rainIssue : issue === 'wind' ? t.windIssue : t.tempIssue).join(' · ')}.`}
            <span>{t.peak}: {formatter(w.peakRainMm, locale, 2)} mm/h</span>
          </p>
        </li>)}</ol>
      </>}
    </div>
    <p className="ww-note">{t.note}</p>
  </section>
}
