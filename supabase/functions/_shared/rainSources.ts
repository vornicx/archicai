// Precipitation sources for ARCHIC LAB WEATHER. Platform-neutral (no Deno/Node globals), unit-tested.
// Every series is normalised to hourly INTERVALS keyed by their START instant (UTC ISO), amount in mm.
// Selection between sources happens in the browser (src/lab/rainSources.ts) against a window anchored at "now".
export type RainHour = { time: string; mm: number }
export type RainSourceId = 'aemet' | 'om_best_match' | 'om_ecmwf' | 'om_gfs' | 'om_icon'
export type RainSeries = {
  id: RainSourceId
  status: 'ok' | 'unavailable' | 'stale' | 'invalid'
  issuedAt: string | null
  hours: RainHour[]
  municipality?: { id: string; name: string }
}
const HOUR = 3_600_000
const iso = (ms: number) => new Date(ms).toISOString().replace('.000Z', 'Z')

// ---------- Minimal strict XML parser (well-formedness checked; no DTD/entities beyond the five predefined) ----------
export type XmlNode = { name: string; attrs: Record<string, string>; children: XmlNode[]; text: string }
const ENT: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" }
const unescape = (s: string) => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
  if (e[0] === '#') { const n = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10); return Number.isFinite(n) ? String.fromCodePoint(n) : m }
  if (e in ENT) return ENT[e]
  throw new Error('xml_unknown_entity')
})
export function parseXml(src: string): XmlNode {
  let i = 0
  const root: XmlNode = { name: '#doc', attrs: {}, children: [], text: '' }
  const stack: XmlNode[] = [root]
  const NAME = /[A-Za-z_][\w.:-]*/y
  const readName = () => { NAME.lastIndex = i; const m = NAME.exec(src); if (!m) throw new Error('xml_bad_name'); i = NAME.lastIndex; return m[0] }
  const ws = () => { while (i < src.length && /\s/.test(src[i])) i++ }
  while (i < src.length) {
    const lt = src.indexOf('<', i)
    const textEnd = lt < 0 ? src.length : lt
    if (textEnd > i) { const t = src.slice(i, textEnd); if (stack.length === 1 && t.trim()) throw new Error('xml_text_outside_root'); stack[stack.length - 1].text += unescape(t) }
    if (lt < 0) break
    i = lt
    if (src.startsWith('<?', i)) { const e = src.indexOf('?>', i); if (e < 0) throw new Error('xml_unclosed_pi'); i = e + 2; continue }
    if (src.startsWith('<!--', i)) { const e = src.indexOf('-->', i); if (e < 0) throw new Error('xml_unclosed_comment'); i = e + 3; continue }
    if (src.startsWith('<![CDATA[', i)) { const e = src.indexOf(']]>', i); if (e < 0) throw new Error('xml_unclosed_cdata'); stack[stack.length - 1].text += src.slice(i + 9, e); i = e + 3; continue }
    if (src.startsWith('<!', i)) throw new Error('xml_doctype_not_allowed')
    if (src[i + 1] === '/') {
      i += 2; const name = readName(); ws()
      if (src[i] !== '>') throw new Error('xml_bad_close')
      i++
      const open = stack.pop()
      if (!open || open.name !== name || stack.length === 0) throw new Error('xml_mismatch')
      continue
    }
    i++
    const node: XmlNode = { name: readName(), attrs: {}, children: [], text: '' }
    for (;;) {
      ws()
      if (src[i] === '/' && src[i + 1] === '>') { i += 2; stack[stack.length - 1].children.push(node); break }
      if (src[i] === '>') { i++; stack[stack.length - 1].children.push(node); stack.push(node); break }
      const an = readName(); ws()
      if (src[i] !== '=') throw new Error('xml_bad_attr'); i++; ws()
      const q = src[i]
      if (q !== '"' && q !== "'") throw new Error('xml_bad_attr_quote')
      const e = src.indexOf(q, i + 1); if (e < 0) throw new Error('xml_unclosed_attr')
      if (an in node.attrs) throw new Error('xml_dup_attr')
      node.attrs[an] = unescape(src.slice(i + 1, e)); i = e + 1
    }
    if (stack.length === 1 && root.children.length > 1) throw new Error('xml_multiple_roots')
  }
  if (stack.length !== 1 || root.children.length !== 1) throw new Error('xml_unbalanced')
  return root.children[0]
}
const kids = (n: XmlNode | undefined, name: string) => (n ? n.children.filter((c) => c.name === name) : [])
const kid = (n: XmlNode | undefined, name: string) => kids(n, name)[0]

// ---------- Europe/Madrid wall clock -> UTC (DST-safe; returns null for non-existent local times) ----------
const madridParts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
function offsetAt(ms: number): number {
  const p = Object.fromEntries(madridParts.formatToParts(new Date(ms)).map((x) => [x.type, x.value]))
  return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - ms
}
export function madridToUtc(y: number, mo: number, d: number, h: number, mi = 0, s = 0): number | null {
  const wall = Date.UTC(y, mo - 1, d, h, mi, s)
  if (!Number.isFinite(wall)) return null
  // Try both offsets around the instant; earliest valid mapping wins for repeated (fall-back) hours.
  const cands = [...new Set([offsetAt(wall - 3 * HOUR), offsetAt(wall + 3 * HOUR)])].map((o) => wall - o).sort((a, b) => a - b)
  for (const c of cands) if (c + offsetAt(c) === wall) return c
  return null
}

// ---------- AEMET municipal hourly forecast ----------
export const AEMET_MUNICIPALITIES = [
  { id: '41039', name: 'Écija', lat: 37.541, lon: -5.083 },
  { id: '41091', name: 'Sevilla', lat: 37.3891, lon: -5.9845 },
  { id: '28079', name: 'Madrid', lat: 40.4168, lon: -3.7038 },
] as const
export const AEMET_MAX_KM = 3
export function distanceKm(a: number, b: number, c: number, d: number) {
  const r = Math.PI / 180, x = Math.sin(((c - a) * r) / 2) ** 2 + Math.cos(a * r) * Math.cos(c * r) * Math.sin(((d - b) * r) / 2) ** 2
  return 2 * 6371 * Math.asin(Math.sqrt(x))
}
/** Only municipalities in the fixed table, and only when the point is within AEMET_MAX_KM of its centre. */
export function matchAemetMunicipality(lat: number, lon: number) {
  return AEMET_MUNICIPALITIES.find((m) => distanceKm(lat, lon, m.lat, m.lon) < AEMET_MAX_KM) ?? null
}
export const aemetUrl = (id: string) => {
  if (!AEMET_MUNICIPALITIES.some((m) => m.id === id)) throw new Error('aemet_unknown_municipality')
  return `https://www.aemet.es/xml/municipios_h/localidad_h_${id}.xml`
}
export const AEMET_MAX_AGE_MS = 12 * HOUR
export const AEMET_FUTURE_SKEW_MS = HOUR
export const MIN_FUTURE_HOURS = 24

/**
 * AEMET `<precipitacion periodo="HH">` is the amount accumulated in the hour ENDING at local HH:00
 * (Europe/Madrid), so the interval starts one hour earlier. "Ip" (inapreciable, trace) counts as 0 mm.
 * Throws a short reason on anything that is not a fresh, complete, well-formed forecast for `expectedId`.
 */
export function parseAemetHourly(xml: string, expectedId: string, now: number): { issuedAt: string; hours: RainHour[]; name: string } {
  const root = parseXml(xml)
  if (root.name !== 'root' || root.attrs.id !== expectedId) throw new Error('aemet_location_mismatch')
  const el = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/.exec(kid(root, 'elaborado')?.text.trim() ?? '')
  const issued = el ? madridToUtc(+el[1], +el[2], +el[3], +el[4], +el[5], +el[6]) : null
  if (issued === null) throw new Error('aemet_no_issue_time')
  if (now - issued > AEMET_MAX_AGE_MS) throw new Error('aemet_stale')
  if (issued - now > AEMET_FUTURE_SKEW_MS) throw new Error('aemet_future_issue_time')
  const byStart = new Map<number, number>()
  for (const dia of kids(kid(root, 'prediccion'), 'dia')) {
    const f = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dia.attrs.fecha ?? '')
    if (!f) throw new Error('aemet_bad_day')
    for (const p of kids(dia, 'precipitacion')) {
      const hh = /^\d{2}$/.test(p.attrs.periodo ?? '') ? +p.attrs.periodo : NaN
      if (!(hh >= 0 && hh <= 23)) throw new Error('aemet_bad_period')
      const raw = p.text.trim()
      const mm = raw === 'Ip' ? 0 : /^\d+(\.\d+)?$/.test(raw) ? Number(raw) : NaN
      if (!Number.isFinite(mm) || mm < 0 || mm > 500) throw new Error('aemet_bad_amount')
      const end = madridToUtc(+f[1], +f[2], +f[3], hh)
      if (end === null) continue // non-existent local hour (spring-forward); no interval to attach
      if (byStart.has(end - HOUR)) continue // repeated fall-back hour: keep first occurrence
      byStart.set(end - HOUR, Math.round(mm * 10) / 10)
    }
  }
  const hours = [...byStart.entries()].sort((a, b) => a[0] - b[0]).map(([s, mm]) => ({ time: iso(s), mm }))
  const future = hours.filter((h) => Date.parse(h.time) + HOUR > now)
  if (future.length < MIN_FUTURE_HOURS) throw new Error('aemet_insufficient_horizon')
  return { issuedAt: iso(issued), hours, name: kid(root, 'nombre')?.text.trim() ?? '' }
}

// ---------- Open-Meteo (models via Open-Meteo, not official provider feeds) ----------
export const OM_MODELS = { om_best_match: 'best_match', om_ecmwf: 'ecmwf_ifs025', om_gfs: 'gfs_seamless', om_icon: 'icon_seamless' } as const
export function openMeteoUrl(lat: number, lon: number) {
  const u = new URL('https://api.open-meteo.com/v1/forecast')
  u.searchParams.set('latitude', lat.toFixed(3)); u.searchParams.set('longitude', lon.toFixed(3))
  u.searchParams.set('hourly', 'precipitation'); u.searchParams.set('models', Object.values(OM_MODELS).join(','))
  u.searchParams.set('timezone', 'GMT'); u.searchParams.set('forecast_days', '3')
  return u.toString()
}
/** Open-Meteo hourly `precipitation` at T is the sum of the PRECEDING hour, so the interval starts at T-1h. */
export function parseOpenMeteo(body: unknown): RainSeries[] {
  const b = body && typeof body === 'object' ? (body as Record<string, unknown>) : {}
  const hourly = b.hourly && typeof b.hourly === 'object' ? (b.hourly as Record<string, unknown>) : null
  if (!hourly || !Array.isArray(hourly.time) || b.utc_offset_seconds !== 0) throw new Error('om_invalid')
  const times = (hourly.time as unknown[]).map((t) => (typeof t === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:00$/.test(t) ? Date.parse(t + ':00Z') : NaN))
  return (Object.keys(OM_MODELS) as (keyof typeof OM_MODELS)[]).map((id) => {
    const values = hourly['precipitation_' + OM_MODELS[id]]
    if (!Array.isArray(values) || values.length !== times.length) return { id, status: 'invalid', issuedAt: null, hours: [] }
    const hours: RainHour[] = []
    values.forEach((v, k) => {
      if (Number.isFinite(times[k]) && typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 500) hours.push({ time: iso(times[k] - HOUR), mm: Math.round(v * 10) / 10 })
    })
    return { id, status: hours.length ? 'ok' : 'invalid', issuedAt: null, hours }
  })
}

// ---------- Bounded fetch helpers ----------
export async function readBounded(res: Response, maxBytes: number): Promise<Uint8Array> {
  const len = Number(res.headers.get('content-length') ?? '0')
  if (len > maxBytes) throw new Error('too_large')
  const buf = new Uint8Array(await res.arrayBuffer())
  if (buf.byteLength > maxBytes) throw new Error('too_large')
  return buf
}
type Fetcher = { fetch: typeof fetch; now: () => number }
export const RAIN_TIMEOUT_MS = 4000

export async function loadAemet(deps: Fetcher, lat: number, lon: number, userAgent: string): Promise<RainSeries | null> {
  const m = matchAemetMunicipality(lat, lon)
  if (!m) return null
  const base = { id: 'aemet' as const, issuedAt: null, hours: [], municipality: { id: m.id, name: m.name } }
  try {
    const res = await deps.fetch(aemetUrl(m.id), { headers: { 'User-Agent': userAgent, Accept: 'application/xml' }, redirect: 'error', signal: AbortSignal.timeout(RAIN_TIMEOUT_MS) })
    if (!res.ok) return { ...base, status: 'unavailable' }
    const bytes = await readBounded(res, 300_000)
    const text = new TextDecoder('iso-8859-15').decode(bytes)
    const parsed = parseAemetHourly(text, m.id, deps.now())
    return { ...base, status: 'ok', issuedAt: parsed.issuedAt, hours: parsed.hours }
  } catch (e) {
    const r = e instanceof Error ? e.message : ''
    return { ...base, status: r === 'aemet_stale' ? 'stale' : r.startsWith('aemet_') || r.startsWith('xml_') ? 'invalid' : 'unavailable' }
  }
}
export async function loadOpenMeteo(deps: Fetcher, lat: number, lon: number, userAgent: string): Promise<RainSeries[]> {
  const fail = (status: RainSeries['status']) => (Object.keys(OM_MODELS) as RainSourceId[]).map((id) => ({ id, status, issuedAt: null, hours: [] }))
  try {
    const res = await deps.fetch(openMeteoUrl(lat, lon), { headers: { 'User-Agent': userAgent, Accept: 'application/json' }, redirect: 'error', signal: AbortSignal.timeout(RAIN_TIMEOUT_MS) })
    if (!res.ok) return fail('unavailable')
    const bytes = await readBounded(res, 400_000)
    return parseOpenMeteo(JSON.parse(new TextDecoder().decode(bytes)))
  } catch { return fail('unavailable') }
}
export async function loadRainSources(deps: Fetcher, lat: number, lon: number, userAgent: string): Promise<RainSeries[]> {
  const [a, o] = await Promise.all([loadAemet(deps, lat, lon, userAgent), loadOpenMeteo(deps, lat, lon, userAgent)])
  return [...(a ? [a] : []), ...o]
}
