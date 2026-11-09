import { useEffect, useMemo, useState } from 'react'
import { fetchForecast, type WeatherPayload } from './weatherClient'
import { upcomingHourly, rainTotal } from './weatherMath'
import { parseSymbol, conditionLabel, skyTone } from './weatherSymbol'
import { WeatherGlyph } from './WeatherGlyph'
import { RainBars } from './RainBars'

// Live, read-only excerpt of Weather for Écija, rendered from the same Edge Function.
// If the forecast cannot load, it says so — no placeholder numbers.
const ECIJA = { lat: 37.541, lon: -5.083, timeZone: 'Europe/Madrid' }

export function WeatherSpecimen({ lang }: { lang: 'es' | 'en' }) {
  const [payload, setPayload] = useState<WeatherPayload | null>(null)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const ctrl = new AbortController()
    fetchForecast(ECIJA.lat, ECIJA.lon, ctrl.signal).then(setPayload).catch((e: unknown) => {
      if (!(e instanceof Error && e.name === 'AbortError')) setFailed(true)
    })
    return () => ctrl.abort()
  }, [])
  const locale = lang === 'es' ? 'es-ES' : 'en-GB'
  const hourly = useMemo(() => (payload ? upcomingHourly(payload.points, Date.now(), 24) : []), [payload])
  const now = hourly[0]
  const cond = now ? parseSymbol(now.symbolCode) : null
  const rain = rainTotal(hourly, 24)
  const n1 = (v: number) => new Intl.NumberFormat(locale, { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(v)
  const t = lang === 'es'
    ? { live: 'En vivo · predicción de modelo', rain: 'Lluvia 24 h', unit: 'l/m²', off: 'La vista en vivo no está disponible ahora mismo. Weather sigue accesible.', loading: 'Cargando predicción…', bars: 'Lluvia prevista por hora en las próximas 24 horas, Écija' }
    : { live: 'Live · model forecast', rain: 'Rain 24 h', unit: 'mm', off: 'The live view is unavailable right now. Weather remains available.', loading: 'Loading forecast…', bars: 'Forecast hourly rainfall over the next 24 hours, Écija' }
  return (
    <div className="lab-specimen" data-tone={skyTone(cond)} aria-live="polite">
      <p className="lab-specimen-kicker"><span>Écija</span><span>{t.live}</span></p>
      {now ? (
        <>
          <div className="lab-specimen-now">
            <p className="lab-specimen-temp">{now.temperatureC === null ? '—' : Math.round(now.temperatureC)}<span>°C</span></p>
            <WeatherGlyph condition={cond} size={44} />
          </div>
          <p className="lab-specimen-cond">{conditionLabel(cond, lang) ?? '—'}</p>
          <div className="lab-specimen-rain">
            <span>{t.rain}</span><strong>{rain === null ? '—' : `${n1(rain)} ${t.unit}`}</strong>
          </div>
          <RainBars hourly={hourly} locale={locale} timeZone={ECIJA.timeZone} label={t.bars} compact />
        </>
      ) : (
        <p className="lab-specimen-off">{failed ? t.off : t.loading}</p>
      )}
    </div>
  )
}
