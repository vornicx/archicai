// "Coming days": one editorial row per local day. Values come from src/lab/weatherDays.ts only.
import { useState } from 'react'
import { rangeScale, type DaySummary } from './weatherDays'
import { parseSymbol, conditionLabel } from './weatherSymbol'
import { WeatherGlyph } from './WeatherGlyph'

type Lang = 'es' | 'en'
const T = {
  es: {
    title: 'Próximos días', today: 'Resto de hoy', tomorrow: 'Mañana', rain: 'Lluvia', noCover: 'No hay cobertura suficiente',
    range: (lo: string, hi: string) => `Temperatura entre ${lo} y ${hi} en las muestras`, noTemp: 'Sin muestras de temperatura',
    samples: (n: number) => `${n} ${n === 1 ? 'muestra' : 'muestras'} de temperatura instantánea`,
    symbol: (h: string) => `Icono: condición prevista cerca de mediodía (${h})`, res: { 1: 'suma de intervalos de 1 h', 6: 'suma de bloques de 6 h', mixed: 'suma de intervalos de 1 h y 6 h' },
    rainLine: (v: string, r: string) => `Lluvia ${v} · ${r}`, rainNone: 'Lluvia: sin total — los intervalos de la fuente no cubren el día local completo',
    minmax: 'Mín./máx. de muestras',
    note: 'Predicción de modelo, no observación. La fuente da intervalos de 1 h para unas 60 h y después bloques de 6 h: la lluvia diaria solo se suma cuando los intervalos cubren el día local completo, y mín./máx. son los de las muestras disponibles, no extremos medidos.',
  },
  en: {
    title: 'Coming days', today: 'Rest of today', tomorrow: 'Tomorrow', rain: 'Rain', noCover: 'Not enough coverage',
    range: (lo: string, hi: string) => `Temperature between ${lo} and ${hi} in the samples`, noTemp: 'No temperature samples',
    samples: (n: number) => `${n} instant temperature ${n === 1 ? 'sample' : 'samples'}`,
    symbol: (h: string) => `Icon: forecast condition near midday (${h})`, res: { 1: 'sum of 1 h intervals', 6: 'sum of 6 h blocks', mixed: 'sum of 1 h and 6 h intervals' },
    rainLine: (v: string, r: string) => `Rain ${v} · ${r}`, rainNone: 'Rain: no total — the source intervals do not cover the whole local day',
    minmax: 'Sampled min/max',
    note: 'Model forecast, not an observation. The source gives 1 h intervals for about 60 h, then 6 h blocks: daily rain is only summed when the intervals cover the whole local day, and min/max are those of the available samples, not measured extremes.',
  },
}

export function DaysForecast({ days, lang, locale, timeZone }: { days: DaySummary[]; lang: Lang; locale: string; timeZone: string }) {
  const t = T[lang]
  const [open, setOpen] = useState<string | null>(null)
  if (!days.length) return null
  const scale = rangeScale(days)
  // Round first and drop the sign of zero so -0.3 never prints as "-0".
  const n = (v: number | null, d = 0) => (v === null ? '—' : new Intl.NumberFormat(locale, { maximumFractionDigits: d, minimumFractionDigits: d }).format(Math.round(v * 10 ** d) / 10 ** d + 0))
  // Labels come from the civil date itself (noon UTC of that date), never from interval instants.
  const civil = (d: DaySummary) => { const [y, m, dd] = d.date.split('-').map(Number); return new Date(Date.UTC(y, m - 1, dd, 12)) }
  const cap = (s: string) => s.charAt(0).toLocaleUpperCase(locale) + s.slice(1)
  const dayName = (d: DaySummary, i: number) => {
    if (i === 0) return t.today
    if (i === 1) return t.tomorrow
    return cap(new Intl.DateTimeFormat(locale, { weekday: 'long', timeZone: 'UTC' }).format(civil(d)))
  }
  const dateText = (d: DaySummary) => new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(civil(d))
  const hour = (iso: string) => new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', timeZone }).format(new Date(iso))

  return (
    <section className="lw-section lw-days" aria-labelledby="lw-days-title">
      <div className="lw-section-head"><h2 id="lw-days-title">{t.title}</h2><span aria-hidden="true">{t.minmax} · °C</span></div>
      <ol className="lw-days-list">
        {days.map((d, i) => {
          const cond = parseSymbol(d.symbolCode)
          const condText = conditionLabel(cond, lang)
          const left = scale && d.minC !== null ? ((d.minC - scale.lo) / (scale.hi - scale.lo)) * 100 : 0
          const width = scale && d.minC !== null && d.maxC !== null ? Math.max(2, ((d.maxC - d.minC) / (scale.hi - scale.lo)) * 100) : 0
          const rainText = d.rainMm === null ? '—' : `${n(d.rainMm, 1)} mm`
          const tempA11y = d.minC === null ? t.noTemp : t.range(`${n(d.minC)} °C`, `${n(d.maxC)} °C`)
          const isOpen = open === d.date
          const panel = `lw-day-${d.date}`
          return (
            <li key={d.date}>
              <button type="button" className="lw-day" aria-expanded={isOpen} aria-controls={panel} onClick={() => setOpen(isOpen ? null : d.date)}>
                <span className="lw-day-name"><strong>{dayName(d, i)}</strong><span>{dateText(d)}</span></span>
                <span className="lw-day-glyph">{cond ? <WeatherGlyph condition={cond} size={28} /> : <span aria-hidden="true">—</span>}{condText && <span className="lw-sr">, {condText}</span>}</span>
                <span className="lw-day-rain" data-wet={(d.rainMm ?? 0) > 0 || undefined} title={d.rainMm === null ? t.noCover : undefined}><span className="lw-sr">, {t.rain}: </span>{d.rainMm === null ? <><span aria-hidden="true">—</span><span className="lw-sr">{t.noCover}</span></> : rainText}</span>
                <span className="lw-sr">. {tempA11y}</span>
                <span className="lw-day-temp" aria-hidden="true">
                  <span className="lw-day-lo">{d.minC === null ? '—' : `${n(d.minC)}°`}</span>
                  <span className="lw-day-track">{d.minC !== null && <i style={{ left: `${left}%`, width: `${width}%` }} />}</span>
                  <span className="lw-day-hi">{d.maxC === null ? '—' : `${n(d.maxC)}°`}</span>
                </span>
              </button>
              <div id={panel} className="lw-day-detail" hidden={!isOpen}>
                <p>{condText && d.symbolTime ? `${condText}. ${t.symbol(hour(d.symbolTime))}` : '—'}</p>
                <p>{d.minC === null ? t.noTemp : `${t.minmax}: ${n(d.minC, 1)} / ${n(d.maxC, 1)} °C · ${t.samples(d.samples)}`}</p>
                <p>{d.rainMm === null ? t.rainNone : t.rainLine(`${n(d.rainMm, 1)} mm (l/m²)`, t.res[d.resolution ?? 1])}</p>
              </div>
            </li>
          )
        })}
      </ol>
      <p className="lw-days-note">{t.note}</p>
    </section>
  )
}
