import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { HourPoint } from './weatherMath'
import { buildRainExplanation, buildRainNarrative, formatRainAmount, rainInterval, rainFacts, RAIN_PATTERN_LABELS, type RainMode, type RainMetrics } from './rainExplained'

const COPY = {
  es: { title: 'Lluvia explicada', first: 'Primer intervalo con lluvia apreciable', peakInsight: 'Hora con más lluvia', concentration: 'Tramo más lluvioso', window: 'Ventana de lluvia', episode: 'Episodio', bars: 'Por hora · mm/h', line: 'Acumulado · mm', band: 'Tramo de mayor concentración', table: 'Lectura hora a hora', interval: 'Intervalo local', amount: 'Lluvia (mm)', cumulative: 'Acumulado (mm)', peak: 'Pico horario', wet: 'Horas con lluvia apreciable', streak: 'Mayor tramo seguido', top: 'Tres horas más lluviosas, no necesariamente seguidas', note: 'Predicción en intervalos horarios a partir de la hora actual (incluye la hora en curso completa). 1 mm = 1 l/m². «Apreciable» usa 0,1 mm/h como criterio de presentación, no oficial. Episodio: desde la primera hasta la última hora con lluvia apreciable de las 24 analizadas, incluyendo pausas sin lluvia entre medias; no indica el inicio ni el final exactos de la precipitación.', unavailable: 'No hay datos suficientes', noEpisode: 'Sin episodio calculable', graph: 'Distribución horaria y acumulación de lluvia; escalas independientes desde cero.' },
  en: { title: 'Rain Explained', first: 'First appreciable-rain interval', peakInsight: 'Rainiest hour', concentration: 'Rainiest stretch', window: 'Rainfall window', episode: 'Episode', bars: 'Hourly · mm/h', line: 'Cumulative · mm', band: 'Most concentrated stretch', table: 'Hour-by-hour reading', interval: 'Local interval', amount: 'Rain (mm)', cumulative: 'Cumulative (mm)', peak: 'Hourly peak', wet: 'Hours with appreciable rain', streak: 'Longest wet stretch', top: 'Three rainiest hours, not necessarily consecutive', note: 'Forecast in hourly intervals from the current hour (including the full ongoing hour). 1 mm = 1 l/m². “Appreciable” uses 0.1 mm/h for presentation, not an official threshold. Episode: from the first to the last hour with appreciable rain in the 24-hour set, including dry breaks in between; it does not pinpoint the exact onset or end of precipitation.', unavailable: 'Not enough data', noEpisode: 'No calculable episode', graph: 'Hourly rainfall distribution and accumulation; independent scales starting at zero.' },
}

function RainStoryline({ m, lang, locale, timeZone, selectedTime, id }: { m: RainMetrics; lang: 'es' | 'en'; locale: string; timeZone: string; selectedTime?: string; id: string }) {
  const t = COPY[lang]
  const ref = useRef<HTMLElement>(null)
  const [width, setWidth] = useState(360)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => { if (entry) setWidth(Math.max(240, entry.contentRect.width)) })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  // Two aligned plots, rather than a dual-axis overlay: amounts and accumulation cannot be confused.
  const left = 36, right = 8, plot = width - left - right, step = plot / m.hours.length
  const maxBar = Math.max(1, ...m.hours.map((h) => h.mm)), maxSum = Math.max(1, m.rainTotal)
  const barBase = 124, sumBase = 248, height = 76
  const w = m.main3hWindow
  const line = m.cumulative.map((v, i) => `${left + i * step},${sumBase - v / maxSum * height}`).join(' ')
  const tickIndices = [...new Set([0, Math.floor(m.hours.length / 2), m.hours.length])]
  const time = (s: string) => new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', timeZone }).format(new Date(s))
  const summary = m.hours.map((h, i) => `${rainInterval(h.time, h.end, locale, timeZone)}: ${formatRainAmount(h.mm, locale)} mm; ${formatRainAmount(m.cumulative[i + 1], locale)} mm ${lang === 'es' ? 'acumulados' : 'cumulative'}`).join('. ')
  return <figure className="re-figure" ref={ref}>
    <svg className="re-storyline" viewBox={`0 0 ${width} 282`} role="img" aria-labelledby={`${id}-chart-title ${id}-chart-desc`}>
      <title id={`${id}-chart-title`}>{t.graph}</title>
      <desc id={`${id}-chart-desc`}>{summary}</desc>
      {m.rainTotal > 0 && m.wetHours > 0 && <rect className="re-band" x={left + w.startIndex * step} y={38} width={w.length * step} height={210} />}
      <text className="re-plot-label" x={left} y={24}>{t.bars}</text>
      <text className="re-plot-label" x={left} y={158}>{t.line}</text>
      {[{ base: barBase, max: maxBar }, { base: sumBase, max: maxSum }].map(({ base, max }) => <g key={base}>
        <line className="re-rule" x1={left} x2={width - right} y1={base} y2={base} />
        <line className="re-rule is-guide" x1={left} x2={width - right} y1={base - height} y2={base - height} />
        <text className="re-axis" x={left - 10} y={base + 4} textAnchor="end">0</text>
        <text className="re-axis" x={left - 10} y={base - height + 4} textAnchor="end">{formatRainAmount(max, locale)}</text>
      </g>)}
      {m.hours.map((h, i) => <g key={h.time} data-selected={h.time === selectedTime || undefined}>
        {h.time === selectedTime && <rect className="re-selected" x={left + i * step} y={38} width={step} height={210} />}
        <rect className="re-bar" x={left + (i + 0.18) * step} y={barBase - h.mm / maxBar * height} width={step * 0.64} height={h.mm / maxBar * height} />
      </g>)}
      <polyline className="re-line" points={line} />
      {tickIndices.map((i) => <text className="re-axis" key={i} x={left + i * step} y={274} textAnchor={i === 0 ? 'start' : i === m.hours.length ? 'end' : 'middle'}>{time(i === m.hours.length ? m.hours[i - 1].end : m.hours[i].time)}</text>)}
    </svg>
    {m.rainTotal > 0 && m.wetHours > 0 && <figcaption className="re-band-caption"><span aria-hidden="true" />{t.band} · {w.length} h</figcaption>}
  </figure>
}

export function RainExplained({ hourly, lang, locale, timeZone, selectedTime }: { hourly: HourPoint[]; lang: 'es' | 'en'; locale: string; timeZone: string; selectedTime?: string }) {
  const [mode, setMode] = useState<RainMode>(6)
  const id = useId(), t = COPY[lang]
  const results = useMemo(() => ({ 6: buildRainExplanation(hourly, 6), 24: buildRainExplanation(hourly, 24), episode: buildRainExplanation(hourly, 'episode') }), [hourly])
  const result = results[mode], narrative = buildRainNarrative(result, lang, locale, timeZone)
  const m = result.available ? result.metrics : null
  const pct = (v: number) => new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 0 }).format(v)
  const facts = m ? rainFacts(m, lang, locale, timeZone) : null
  return <section className="lw-section re-section" aria-labelledby={`${id}-title`}>
    <div className="lw-section-head"><h2 id={`${id}-title`}>{t.title}</h2>
      <div className="re-selector" role="group" aria-label={t.window}>
        {([6, 24, 'episode'] as RainMode[]).map((value) => <button type="button" key={value} aria-pressed={mode === value} disabled={!results[value].available} onClick={() => setMode(value)} aria-describedby={!results[value].available ? `${id}-availability` : undefined}>{value === 'episode' ? t.episode : `${value} h`}</button>)}
      </div>
    </div>
    <div className="re-editorial"><div>
      {m && <p className="re-pattern">{RAIN_PATTERN_LABELS[lang][m.pattern]}</p>}
      <p className="re-lead">{narrative.lead}</p>
      {narrative.detail && <details className="lw-disclosure"><summary>{lang === 'es' ? 'Ver explicación' : 'See explanation'}</summary><p className="re-detail">{narrative.detail}</p></details>}
      <p className="lw-sr" id={`${id}-availability`}>
        {!results[6].available && `6 h: ${t.unavailable}. `}
        {!results[24].available && `24 h: ${t.unavailable}. `}
        {!results.episode.available && `${t.episode}: ${results.episode.reason === 'coverage' ? t.unavailable : t.noEpisode}.`}
      </p>
    </div>
    {m && <RainStoryline m={m} lang={lang} locale={locale} timeZone={timeZone} selectedTime={selectedTime} id={id} />}
    </div>
    {m && facts && m.wetHours > 0 && (
      <details className="lw-disclosure re-signals-disclosure"><summary>{lang === 'es' ? 'Datos clave' : 'Key figures'}</summary><dl className="re-signals" aria-label={lang === 'es' ? 'Resumen de la lluvia prevista' : 'Forecast rainfall summary'}>
        <div><dt>{t.first}</dt><dd>{facts.first}</dd></div>
        <div><dt>{t.peakInsight}</dt><dd>{facts.peak}</dd></div>
        <div><dt>{t.concentration}</dt><dd>{facts.window}</dd></div>
      </dl></details>
    )}
    {m && <details className="re-reading"><summary>{t.table}</summary>
      <dl className="re-facts">
        <div><dt>{t.peak}</dt><dd>{formatRainAmount(m.peak.mm, locale)} mm/h · {rainInterval(m.peak.time, m.peak.end, locale, timeZone)}</dd></div>
        <div><dt>{t.wet}</dt><dd>{m.wetHours} / {m.hours.length}</dd></div>
        <div><dt>{t.streak}</dt><dd>{m.wetStreak} h</dd></div>
        {m.top3Share !== null && <div><dt>{t.top}</dt><dd>{pct(m.top3Share)}</dd></div>}
      </dl>
      <div className="re-table-wrap" tabIndex={0} role="region" aria-label={t.table}>
        <table className="re-table"><thead><tr><th scope="col">{t.interval}</th><th scope="col">{t.amount}</th><th scope="col">{t.cumulative}</th></tr></thead>
          <tbody>{m.hours.map((h, i) => <tr key={h.time} data-selected={h.time === selectedTime || undefined}><th scope="row">{rainInterval(h.time, h.end, locale, timeZone)}</th><td>{formatRainAmount(h.mm, locale)}</td><td>{formatRainAmount(m.cumulative[i + 1], locale)}</td></tr>)}</tbody>
        </table>
      </div>
    </details>}
    <details className="lw-disclosure"><summary>{lang === 'es' ? 'Método y límites' : 'Method and limits'}</summary><p className="re-note">{t.note} · {timeZone}</p></details>
  </section>
}