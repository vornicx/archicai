// Pure helpers for the hourly strip selection on Weather (keyboard + summary text).
import { parseSymbol, conditionLabel } from './weatherSymbol'

type P = { time: string; temperatureC: number | null; precipitationMm: number | null; symbolCode: string | null }

/** Roving selection: arrows move one hour, Home/End jump; clamps to the strip. Returns null for other keys. */
export function nextHourIndex(i: number, key: string, length: number): number | null {
  if (length <= 0) return null
  if (key === 'ArrowRight' || key === 'ArrowDown') return Math.min(length - 1, i + 1)
  if (key === 'ArrowLeft' || key === 'ArrowUp') return Math.max(0, i - 1)
  if (key === 'Home') return 0
  if (key === 'End') return length - 1
  return null
}

/** "20:00 · 0,6 mm · 17 °C · Chubascos" — missing values read "—", never invented. */
export function hourSummary(p: P, hourText: string, locale: string, lang: 'es' | 'en'): string {
  const n = (v: number, d: number) => new Intl.NumberFormat(locale, { minimumFractionDigits: d, maximumFractionDigits: d }).format(v)
  const mm = p.precipitationMm === null || !Number.isFinite(p.precipitationMm) ? '— mm' : `${n(p.precipitationMm, 1)} mm`
  const t = p.temperatureC === null || !Number.isFinite(p.temperatureC) ? '— °C' : `${n(p.temperatureC, 0)} °C`
  const cond = conditionLabel(parseSymbol(p.symbolCode), lang) ?? '—'
  return [hourText, mm, t, cond].join(' · ')
}

/** Same facts as hourSummary, split so the UI can lay them out as a wrapping micro-row. */
export function hourParts(p: P, locale: string, lang: 'es' | 'en'): { rain: string; temp: string; condition: string } {
  const n = (v: number, d: number) => new Intl.NumberFormat(locale, { minimumFractionDigits: d, maximumFractionDigits: d }).format(v)
  return {
    rain: p.precipitationMm === null || !Number.isFinite(p.precipitationMm) ? '— mm' : `${n(p.precipitationMm, 1)} mm`,
    temp: p.temperatureC === null || !Number.isFinite(p.temperatureC) ? '— °C' : `${n(p.temperatureC, 0)} °C`,
    condition: conditionLabel(parseSymbol(p.symbolCode), lang) ?? '—',
  }
}

/** Which edges of a horizontally scrollable strip still hide content (1px tolerance for subpixel widths). */
export function scrollEdges(scrollLeft: number, clientWidth: number, scrollWidth: number): { start: boolean; end: boolean } {
  return { start: scrollLeft > 1, end: scrollLeft + clientWidth < scrollWidth - 1 }
}
