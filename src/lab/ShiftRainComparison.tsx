import { useId } from 'react'
import type { ShiftComparison } from './weatherShift'

const COPY = {
  es: {
    title: 'Cómo cambió la lluvia por horas',
    previous: 'Previsión anterior', current: 'Última previsión',
    detail: 'Ver diferencias hora a hora',
    hour: 'Hora local', before: 'Antes (mm)', after: 'Ahora (mm)', change: 'Diferencia (mm)',
    chart: 'Comparación de dos previsiones del modelo para las mismas horas futuras. El gris representa la versión anterior y el azul la última.',
  },
  en: {
    title: 'How hourly rainfall changed',
    previous: 'Previous forecast', current: 'Latest forecast',
    detail: 'See hourly differences',
    hour: 'Local hour', before: 'Before (mm)', after: 'Now (mm)', change: 'Difference (mm)',
    chart: 'Comparison of two model forecasts for the same future hours. Grey is the previous version and blue is the latest version.',
  },
}
const fmt = (n: number, locale: string) =>
  new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(n)
const signed = (n: number, locale: string) =>
  Math.abs(n) < 0.005 ? '0' : (n > 0 ? '+' : '−') + fmt(Math.abs(n), locale)

export function ShiftRainComparison({ comparison, lang, locale, timeZone }: {
  comparison: ShiftComparison; lang: 'es' | 'en'; locale: string; timeZone: string
}) {
  const t = COPY[lang]
  const titleId = useId()
  const count = comparison.hourly.length
  const width = Math.max(350, count * 32 + 28)
  const height = 166
  const left = 22, top = 15, plotHeight = 105
  const max = Math.max(0.5, ...comparison.hourly.flatMap(h => [h.beforeMm, h.afterMm]))
  const step = (width - left * 2) / count
  const barWidth = Math.min(8, step * 0.28)
  const hourFmt = new Intl.DateTimeFormat(locale, { timeZone, hour: '2-digit', minute: '2-digit' })
  const timeFmt = new Intl.DateTimeFormat(locale, { timeZone, day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
  const tickEvery = count >= 24 ? 4 : count >= 12 ? 3 : 2
  return <div className="ws-chart-wrap">
    <div className="ws-chart-head">
      <h3 id={titleId}>{t.title}</h3>
      <div className="ws-legend" aria-hidden="true">
        <span><i className="is-previous" />{t.previous}</span>
        <span><i className="is-current" />{t.current}</span>
      </div>
    </div>
    <div className="ws-chart-scroll" tabIndex={0} role="region"
      aria-label={lang === 'es' ? 'Gráfico comparativo de lluvia, desplazar horizontalmente' : 'Rain comparison chart, scroll horizontally'}>
      <svg className="ws-chart" width={width} height={height} viewBox={`0 0 ${width} ${height}`}
        role="img" aria-label={t.chart}>
        <line x1={left} x2={width - left} y1={top + plotHeight} y2={top + plotHeight} className="ws-gridline" />
        {comparison.hourly.map((h, i) => {
          const x = left + i * step + step / 2
          const bh = h.beforeMm / max * plotHeight
          const ah = h.afterMm / max * plotHeight
          const tick = i % tickEvery === 0
          return <g key={h.time}>
            {h.beforeMm > 0 && <rect className="ws-bar-old" x={x - barWidth - 1} y={top + plotHeight - bh} width={barWidth} height={bh} rx="1" />}
            {h.afterMm > 0 && <rect className="ws-bar-new" x={x + 1} y={top + plotHeight - ah} width={barWidth} height={ah} rx="1" />}
            {tick && <text x={x} y={top + plotHeight + 20} textAnchor="middle">{hourFmt.format(new Date(h.time))}</text>}
          </g>
        })}
      </svg>
    </div>
    <details className="ws-hour-detail">
      <summary>{t.detail}</summary>
      <div className="ws-hour-table-scroll">
        <table>
          <thead><tr><th scope="col">{t.hour}</th><th scope="col">{t.before}</th><th scope="col">{t.after}</th><th scope="col">{t.change}</th></tr></thead>
          <tbody>{comparison.hourly.map(h => <tr key={h.time}>
            <th scope="row"><time dateTime={h.time}>{timeFmt.format(new Date(h.time))}</time></th>
            <td>{fmt(h.beforeMm, locale)}</td><td>{fmt(h.afterMm, locale)}</td>
            <td>{signed(h.deltaMm, locale)}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </details>
  </div>
}
