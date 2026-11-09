// Builds public/lab/weather/cities.json from the official GeoNames dump (CC BY 4.0).
// Usage: node scripts/build-weather-cities.mjs <cities5000.txt> <admin1CodesASCII.txt> [alt-es-en.txt]
// Download: https://download.geonames.org/export/dump/cities5000.zip, admin1CodesASCII.txt and
// alternateNamesV2.zip, pre-filtered to Spanish/English, non-colloquial, non-historic rows:
//   awk -F'\t' '($3=="es"||$3=="en") && $7!="1" && $8!="1"' alternateNamesV2.txt > alt-es-en.txt
// The source CSV is never committed; only the derived compact index is.
import { readFileSync, writeFileSync, statSync } from 'node:fs'
import { gzipSync } from 'node:zlib'

const [citiesPath, adminPath, altPath] = process.argv.slice(2)
if (!citiesPath || !adminPath) { console.error('usage: build-weather-cities.mjs <cities5000.txt> <admin1CodesASCII.txt>'); process.exit(1) }

const fold = (s) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
// Spanish/English names from GeoNames alternateNames (language-tagged): display names + search aliases.
const loc = new Map() // geonameid -> { es: [name, preferred][], en: [...] }
if (altPath) for (const line of readFileSync(altPath, 'utf8').split('\n')) {
  const f = line.split('\t'); if (f.length < 4 || !f[3]) continue
  const e = loc.get(f[1]) ?? { es: [], en: [] }; loc.set(f[1], e)
  ;(f[2] === 'es' ? e.es : e.en).push([f[3], f[4] === '1'])
}
const pick = (list) => (list.find((x) => x[1]) ?? list[0])?.[0] ?? null
const admin = new Map()
for (const line of readFileSync(adminPath, 'utf8').split('\n')) {
  const [code, name] = line.split('\t'); if (code && name) admin.set(code, name)
}

const rows = []
for (const line of readFileSync(citiesPath, 'utf8').split('\n')) {
  const f = line.split('\t'); if (f.length < 18) continue
  const [id, name, ascii, alts, lat, lon, , , cc, , a1, , , , pop, , , tz] = f
  const la = Number(lat), lo = Number(lon), p = Number(pop) || 0
  if (!name || !cc || !tz || !Number.isFinite(la) || !Number.isFinite(lo) || Math.abs(la) > 90 || Math.abs(lo) > 180) continue
  try { new Intl.DateTimeFormat('en', { timeZone: tz }) } catch { continue }
  rows.push({ id: Number(id), name, ascii, alts, lat: lat, lon: lon, cc, region: a1 ? admin.get(`${cc}.${a1}`) ?? '' : '', pop: p, tz })
}
// Collisions: same folded name + region + country -> keep the most populated entry only.
rows.sort((a, b) => b.pop - a.pop)
const seen = new Set(); const kept = []
for (const r of rows) { const k = `${fold(r.name)}|${r.region}|${r.cc}`; if (seen.has(k)) continue; seen.add(k); kept.push(r) }

const tzs = [...new Set(kept.map((r) => r.tz))].sort()
const regions = [...new Set(kept.map((r) => r.region))].sort()
const tzI = new Map(tzs.map((t, i) => [t, i])), rgI = new Map(regions.map((t, i) => [t, i]))
kept.sort((a, b) => a.id - b.id)
// Columnar + integer encoding keeps the asset small and lossless: GeoNames publishes 5 decimals,
// so lat/lon are stored as exact integers x 1e5 and ids as deltas.
const e5 = (v) => { const n = Math.round(Number(v) * 1e5); if (n / 1e5 !== Number(v)) throw new Error('non 5-decimal coordinate ' + v); return n }
const col = { idDelta: [], name: [], lat5: [], lon5: [], country: [], region: [], timeZone: [], population: [], nameEs: {}, nameEn: {}, alternates: {} }
let prev = 0
kept.forEach((r, i) => {
  col.idDelta.push(r.id - prev); prev = r.id
  col.name.push(r.name); col.lat5.push(e5(r.lat)); col.lon5.push(e5(r.lon)); col.country.push(r.cc)
  col.region.push(rgI.get(r.region)); col.timeZone.push(tzI.get(r.tz)); col.population.push(r.pop)
  const l = loc.get(String(r.id))
  if (l) {
    const es = pick(l.es), en = pick(l.en)
    if (es && es !== r.name) col.nameEs[i] = es
    if (en && en !== r.name) col.nameEn[i] = en
    const own = new Set([fold(r.name), fold(r.ascii), fold(es ?? ''), fold(en ?? '')])
    const extra = []; for (const [n] of [...l.es, ...l.en]) { const k = fold(n); if (k && !own.has(k)) { own.add(k); extra.push(n) } }
    if (extra.length) col.alternates[i] = extra.slice(0, 4).join('|')
  }
})
const out = { v: 2, source: 'GeoNames cities5000', license: 'CC BY 4.0', url: 'https://www.geonames.org/', built: new Date().toISOString().slice(0, 10),
  count: kept.length, timeZones: tzs, regions, ...col }
const json = JSON.stringify(out)
const target = new URL('../public/lab/weather/cities.json', import.meta.url)
writeFileSync(target, json)
console.log(`cities ${kept.length} (from ${rows.length}) · raw ${(json.length / 1024).toFixed(0)} kB · gzip ${(gzipSync(json).length / 1024).toFixed(0)} kB · src ${(statSync(citiesPath).size / 1048576).toFixed(1)} MB`)
