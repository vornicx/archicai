import { useEffect, useMemo, useState } from 'react'
import type { WeatherPayload } from './weatherClient'
import {
  SHIFT_STORAGE_KEY, SHIFT_OPT_IN_KEY, hasShiftOptIn, eligibleShiftCity,
  parseShiftStore, snapshotForecast, updateShiftStore, type ShiftComparison,
} from './weatherShift'

const COPY = {
  es: {
    heading: 'Weather Shift', kicker: 'Lo que ha cambiado', lead: 'Compara dos versiones del pronóstico para las mismas horas futuras.',
    optIn: 'Activa el historial para guardar una primera previsión solo en este navegador. Podrás comparar versiones después de una actualización del modelo.', enable: 'Activar historial local',
    baseline: 'Primera previsión guardada en este navegador. Cuando vuelvas después de una actualización del modelo, podremos comparar los mismos intervalos.',
    same: 'No hay cambios apreciables en la cantidad de lluvia prevista para el periodo comparable.',
    changedUp: 'La última previsión contiene más lluvia.',
    changedDown: 'La última previsión contiene menos lluvia.',
    insufficient: 'Hay dos versiones guardadas, pero no comparten seis horas futuras completas con datos de lluvia. No podemos compararlas con rigor.',
    stale: 'Esta respuesta pertenece a una versión anterior del modelo. No se ha sobrescrito la guardada.',
    disabled: 'El historial no se guarda para coordenadas manuales ni para la ubicación del dispositivo.',
    unavailable: 'El proveedor no ha indicado una versión del modelo o no hay datos horarios suficientes para guardar una comparación.',
    storageError: 'El navegador no permite guardar este historial local.',
    cleared: 'Historial local eliminado de este navegador.',
    before: 'Versión anterior', after: 'Versión más reciente', delta: 'Cambio en lluvia prevista',
    interval: 'Mismas horas comparadas', model: 'Actualizaciones del modelo', clear: 'Borrar historial local',
    note: 'Si activas el historial, solo guarda previsiones de ciudades elegidas, en este navegador. No almacena GPS ni sincroniza información entre dispositivos y no busca actualizaciones en segundo plano. Las diferencias son cambios del modelo, no lluvia observada.',
  },
  en: {
    heading: 'Weather Shift', kicker: 'What changed', lead: 'Compare two model forecasts for exactly the same future hours.',
    optIn: 'Enable history to save a first forecast in this browser only. You can compare versions after the model updates.', enable: 'Enable local history',
    baseline: 'First forecast saved in this browser. When you return after a model update, the same future intervals can be compared.',
    same: 'No appreciable change in forecast rainfall for the comparable period.',
    changedUp: 'The latest forecast shows more rainfall.',
    changedDown: 'The latest forecast shows less rainfall.',
    insufficient: 'Two versions are saved, but they do not share six complete future hours with rain values. A reliable comparison is unavailable.',
    stale: 'This response comes from an older model version. The stored version was not overwritten.',
    disabled: 'Forecast history is not stored for manually entered coordinates or device location.',
    unavailable: 'The provider has not supplied a model version or enough hourly data for a comparison.',
    storageError: 'Local forecast history cannot be stored in this browser.',
    cleared: 'Local history cleared from this browser.',
    before: 'Previous forecast', after: 'Latest forecast', delta: 'Forecast rainfall change',
    interval: 'Same hours compared', model: 'Model versions', clear: 'Clear local history',
    note: 'If enabled, only forecasts for selected named cities are stored in this browser. No GPS storage, no cross-device sync, and no background model checks. Differences are changes in a forecast, not measured rainfall.',
  },
}
type State = 'checking' | 'optIn' | 'baseline' | 'same' | 'changed' | 'insufficient' | 'stale' | 'disabled' | 'unavailable' | 'storageError' | 'cleared'
type ShiftView = { state: State; comparison: ShiftComparison | null }

export function WeatherShift({ payload, placeId, lang, locale, timeZone, now }: {
  payload: WeatherPayload; placeId: string; lang: 'es' | 'en'
  locale: string; timeZone: string; now: number
}) {
  const t = COPY[lang]
  const [view, setView] = useState<ShiftView>({ state: 'checking', comparison: null })
  const [enabled, setEnabled] = useState(false)
  const [consentLoaded, setConsentLoaded] = useState(false)
  const [clearNotice, setClearNotice] = useState(false)
  useEffect(() => {
    try {
      const optedIn = hasShiftOptIn(window.localStorage.getItem(SHIFT_OPT_IN_KEY))
      // The previous release saved model forecasts automatically. Drop that legacy
      // baseline unless this browser has explicitly opted into history storage.
      if (!optedIn) window.localStorage.removeItem(SHIFT_STORAGE_KEY)
      setEnabled(optedIn)
    } catch { setEnabled(false) }
    setConsentLoaded(true)
  }, [])
  const snapshot = useMemo(() => snapshotForecast(payload.updatedAt, payload.points, now), [payload, now])
  useEffect(() => {
    if (!consentLoaded) return
    if (!eligibleShiftCity(placeId)) { setView({ state: 'disabled', comparison: null }); return }
    if (!enabled) { setView({ state: 'optIn', comparison: null }); return }
    if (!snapshot) { setView({ state: 'unavailable', comparison: null }); return }
    try {
      const stored = parseShiftStore(window.localStorage.getItem(SHIFT_STORAGE_KEY), now)
      const next = updateShiftStore(stored, placeId, snapshot, now)
      window.localStorage.setItem(SHIFT_STORAGE_KEY, JSON.stringify(next.store))
      setView({ state: next.state, comparison: next.comparison })
    } catch { setView({ state: 'storageError', comparison: null }) }
  }, [placeId, snapshot, now, enabled, consentLoaded])
  const onEnable = () => {
    try {
      window.localStorage.setItem(SHIFT_OPT_IN_KEY, '1')
      setClearNotice(false)
      setEnabled(true)
    } catch { setView({ state: 'storageError', comparison: null }) }
  }
  const onClear = () => {
    try {
      window.localStorage.removeItem(SHIFT_STORAGE_KEY)
      window.localStorage.removeItem(SHIFT_OPT_IN_KEY)
      setClearNotice(true)
      setEnabled(false)
      setView({ state: 'cleared', comparison: null })
    } catch { setView({ state: 'storageError', comparison: null }) }
  }
  const display = (n: number) => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(n)
  const date = (s: string) => new Intl.DateTimeFormat(locale,
    { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone }).format(new Date(s))
  const cmp = view.comparison
  const message = view.state === 'optIn' ? (clearNotice ? `${t.cleared} ${t.optIn}` : t.optIn)
    : view.state === 'changed' && cmp
    ? (cmp.deltaMm > 0 ? t.changedUp : t.changedDown)
    : view.state === 'same' ? t.same
    : view.state === 'baseline' ? t.baseline
    : view.state === 'insufficient' ? t.insufficient
    : view.state === 'stale' ? t.stale
    : view.state === 'disabled' ? t.disabled
    : view.state === 'unavailable' ? t.unavailable
    : view.state === 'storageError' ? t.storageError
    : view.state === 'cleared' ? t.cleared : ''
  return <section className="lw-section ws-section" aria-labelledby="ws-title">
    <div className="lw-section-head">
      <div><p className="ws-kicker">{t.kicker}</p><h2 id="ws-title">{t.heading}</h2></div>
      {enabled && eligibleShiftCity(placeId) && view.state !== 'cleared' && view.state !== 'storageError' &&
        <button className="ws-clear" type="button" onClick={onClear}>{t.clear}</button>}
    </div>
    <p className="ws-lead">{t.lead}</p>
    {message && <p className="ws-message" role="status">{message}</p>}
    {consentLoaded && !enabled && eligibleShiftCity(placeId) && view.state !== 'storageError' &&
      <button className="ws-enable" type="button" onClick={onEnable}>{t.enable}</button>}
    {cmp && (view.state === 'changed' || view.state === 'same') && <div className="ws-comparison">
      <div className="ws-change" data-direction={cmp.deltaMm > 0.05 ? 'up' : cmp.deltaMm < -0.05 ? 'down' : 'same'}>
        <p>{t.delta} · {cmp.hours} h</p>
        <strong>{Math.abs(cmp.deltaMm) < 0.05 ? '≈ 0' : (cmp.deltaMm > 0 ? '+' : '−') + display(Math.abs(cmp.deltaMm))} <span>mm</span></strong>
      </div>
      <dl className="ws-values">
        <div><dt>{t.before}</dt><dd>{display(cmp.beforeMm)} mm</dd></div>
        <div><dt>{t.after}</dt><dd>{display(cmp.afterMm)} mm</dd></div>
      </dl>
      <p className="ws-range">{t.interval}: <time dateTime={cmp.from}>{date(cmp.from)}</time> – <time dateTime={cmp.until}>{date(cmp.until)}</time></p>
      <p className="ws-model">{t.model}: <time dateTime={cmp.previousModel}>{date(cmp.previousModel)}</time> / <time dateTime={cmp.currentModel}>{date(cmp.currentModel)}</time></p>
    </div>}
    <p className="ws-note">{t.note}</p>
  </section>
}
