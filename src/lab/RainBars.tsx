import { chartMax } from './weatherMath'
import type { Point } from './weatherClient'

// HTML bar chart: text stays at real size on any width (an SVG viewBox would shrink labels on phones).
// Scale always starts at 0; the full data is in the accessible table on Weather.
// selectedIndex only highlights a bar; selection is driven elsewhere (the hourly strip), so the chart
// stays a single image with no nested or tiny interactive targets (it also lives inside a link on Lab).
export function RainBars({ hourly, locale, timeZone, label, compact = false, selectedIndex }: {
  hourly: Point[]; locale: string; timeZone: string; label: string; compact?: boolean; selectedIndex?: number
}) {
  const max = chartMax(hourly)
  const n = (v: number) => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(v)
  const hour = (t: string) => new Intl.DateTimeFormat(locale, { hour: '2-digit', timeZone }).format(new Date(t))
  return (
    <div className={'lw-bars' + (compact ? ' is-compact' : '') + (selectedIndex !== undefined ? ' has-selection' : '')} role="img" aria-label={label}>
      {!compact && (
        <div className="lw-bars-y" aria-hidden="true">
          <span>{n(max)}</span><span>{n(max / 2)}</span><span>0 mm</span>
        </div>
      )}
      <div className="lw-bars-plot" aria-hidden="true">
        <i className="lw-bars-rule" style={{ top: 0 }} /><i className="lw-bars-rule is-mid" /><i className="lw-bars-rule is-base" />
        <ol>
          {hourly.map((p, i) => {
            const v = p.precipitationMm
            const pct = v === null ? 0 : Math.min(100, (Math.max(0, v) / max) * 100)
            return (
              <li key={p.time} data-missing={v === null || undefined} data-zero={v === 0 || undefined} data-selected={i === selectedIndex || undefined}>
                <b style={{ height: v && v > 0 ? `max(${pct}%, 3px)` : undefined }} />
                {!compact && i % 3 === 0 && <time className={i % 6 === 0 ? '' : 'is-minor'}>{hour(p.time)}</time>}
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
