// AEMET Meteoalerta CAP 1.2, official RSS: public feed of warning *updates*.
// Never interpret an empty/restricted feed as proof that a location has no warnings.
export type AemetAlert = {
  id: string; event: string; level: 'amarillo' | 'naranja' | 'rojo'
  area: string; onset: string; expires: string; url: string
}
export type AemetAlertResult = { source: 'AEMET'; scope: 'matching-published-warnings'; alerts: AemetAlert[]; checkedAt: string; partial: boolean }
export const AEMET_RSS_URL = 'https://www.aemet.es/documentos_d/eltiempo/prediccion/avisos/rss/CAP_AFAE_wah_RSS.xml'
const CAP_ROOT = 'https://www.aemet.es/documentos_d/eltiempo/prediccion/avisos/cap/'
const tag = (xml: string, name: string) => new RegExp('<' + name + '(?:\\s[^>]*)?>([\\s\\S]*?)<\\/' + name + '>', 'i').exec(xml)?.[1]?.trim() || ''
const plain = (v: string) => v.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim()
const safeCapUrl = (value: string) => value.startsWith(CAP_ROOT) &&
  /^https:\/\/www\.aemet\.es\/documentos_d\/eltiempo\/prediccion\/avisos\/cap\/Z_CAP_C_LEMM_[A-Z0-9_]+\.xml$/.test(value)

/** CAP coordinates are latitude,longitude; ray casting uses x=longitude/y=latitude. */
export function capPolygonContains(coordinates: string, lat: number, lon: number): boolean {
  const pts = coordinates.trim().split(/\s+/).map(v => v.split(',').map(Number))
  if (pts.length < 4 || pts.some(p => p.length !== 2 || !Number.isFinite(p[0]) || !Number.isFinite(p[1]) ||
    Math.abs(p[0]) > 90 || Math.abs(p[1]) > 180)) return false
  let inside = false
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const y1 = pts[i][0], x1 = pts[i][1], y2 = pts[j][0], x2 = pts[j][1]
    const cross = (lon - x1) * (y2 - y1) - (lat - y1) * (x2 - x1)
    if (Math.abs(cross) < 1e-10 && lon >= Math.min(x1,x2)-1e-10 && lon <= Math.max(x1,x2)+1e-10 &&
      lat >= Math.min(y1,y2)-1e-10 && lat <= Math.max(y1,y2)+1e-10) return true
    if ((y1 > lat) !== (y2 > lat) && lon < (x2-x1)*(lat-y1)/(y2-y1)+x1) inside = !inside
  }
  return inside
}
export function parseCapForPoint(xml: string, capUrl: string, lat: number, lon: number, now: number): AemetAlert | null {
  if (!safeCapUrl(capUrl) || tag(xml,'msgType').toLowerCase() === 'cancel') return null
  if (tag(xml,'scope').toLowerCase() !== 'public') return null
  const info = [...xml.matchAll(/<info>([\s\S]*?)<\/info>/gi)]
    .map(m => m[1]).find(block => /^es(?:-ES)?$/i.test(tag(block,'language')))
  if (!info) return null
  const onset = tag(info,'onset'), expires = tag(info,'expires')
  const from = Date.parse(onset), until = Date.parse(expires)
  if (!Number.isFinite(from) || !Number.isFinite(until) || from > until || until <= now) return null
  const areas = [...info.matchAll(/<area>([\s\S]*?)<\/area>/gi)].map(m => m[1])
  const matching = areas.find(area => [...area.matchAll(/<polygon>([\s\S]*?)<\/polygon>/gi)]
    .some(m => capPolygonContains(m[1],lat,lon)))
  if (!matching) return null
  const level = /<valueName>AEMET-Meteoalerta nivel<\/valueName>\s*<value>(amarillo|naranja|rojo)<\/value>/i.exec(info)?.[1]?.toLowerCase()
  if (level !== 'amarillo' && level !== 'naranja' && level !== 'rojo') return null
  const event = plain(tag(info,'event')).slice(0,140)
  if (!event) return null
  return { id: tag(xml,'identifier').slice(0,180)||capUrl, event, level,
    area: plain(tag(matching,'areaDesc')).slice(0,100), onset, expires, url:capUrl }
}
/** Bounded fetch. We never fetch untrusted RSS URLs, only AEMET CAP paths for the fixed zone. */
export async function readAemetAlerts(deps: { fetch: typeof fetch; now: () => number }, zone: string,
 lat: number, lon: number): Promise<AemetAlertResult> {
  const response = await deps.fetch(AEMET_RSS_URL, {headers:{Accept:'application/xml'},signal:AbortSignal.timeout(9000)})
  if (!response.ok) throw new Error('aemet_rss_unavailable')
  const rss = await response.text()
  if (!rss.includes('<rss') || rss.length > 2_500_000) throw new Error('invalid_aemet_rss')
  const links = [...rss.matchAll(/<item>([\s\S]*?)<\/item>/gi)]
    .map(m => plain(tag(m[1],'link')))
    .filter(link => safeCapUrl(link) && link.includes('AFAZ'+zone))
  // RSS is an update feed, not a guaranteed full state. The label remains "published warnings".
  const unique = [...new Set(links)]
  const capLinks = unique.slice(0,16)
  let failed = 0
  const alerts: AemetAlert[] = []
  await Promise.all(capLinks.map(async link => {
    try {
      const response = await deps.fetch(link, {headers:{Accept:'application/xml'},signal:AbortSignal.timeout(5000)})
      if (!response.ok) throw new Error('cap_response')
      const xml = await response.text()
      if (xml.length > 180_000) throw new Error('cap_size')
      const alert = parseCapForPoint(xml,link,lat,lon,deps.now())
      if (alert) alerts.push(alert)
    } catch { failed++ }
  }))
  const rank = {rojo:0,naranja:1,amarillo:2}
  alerts.sort((a,b)=>rank[a.level]-rank[b.level]||Date.parse(a.onset)-Date.parse(b.onset))
  return {source:'AEMET',scope:'matching-published-warnings',
    alerts:alerts.slice(0,5),checkedAt:new Date(deps.now()).toISOString(),
    partial:failed>0||unique.length>capLinks.length}
}
