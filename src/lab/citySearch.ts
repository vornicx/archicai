// Local city search over the GeoNames-derived index (public/lab/weather/cities.json, CC BY 4.0).
// Pure parts (fold, decode, search) are tested in tests/lab-city-search.test.mjs; loadCities() is the only I/O.
export type CityAsset = {
  v: 2
  count: number
  timeZones: string[]
  regions: string[]
  idDelta: number[]
  name: string[]
  lat5: number[]
  lon5: number[]
  country: string[]
  region: number[]
  timeZone: number[]
  population: number[]
  nameEs: Record<string, string>
  nameEn: Record<string, string>
  alternates: Record<string, string>
}

export type City = {
  id: number
  name: string
  nameEs: string
  nameEn: string
  lat: number
  lon: number
  countryCode: string
  region: string
  timeZone: string
  population: number
  keys: string[] // folded searchable names: [primary es, primary en, canonical, ...aliases]
}

/** Lowercase, strip diacritics and punctuation: "Écija" -> "ecija", "Saint-Étienne" -> "saint etienne". */
export const fold = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim()

export function decodeCities(a: CityAsset): City[] {
  if (!a || a.v !== 2 || !Array.isArray(a.name)) throw new Error('invalid_city_index')
  const out: City[] = new Array(a.name.length)
  let id = 0
  for (let i = 0; i < a.name.length; i++) {
    id += a.idDelta[i]
    const name = a.name[i]
    const es = a.nameEs[i] ?? name, en = a.nameEn[i] ?? name
    const keys = [...new Set([fold(es), fold(en), fold(name), ...(a.alternates[i] ? a.alternates[i].split('|').map(fold) : [])])].filter(Boolean)
    out[i] = {
      id, name, nameEs: es, nameEn: en,
      lat: a.lat5[i] / 1e5, lon: a.lon5[i] / 1e5,
      countryCode: a.country[i], region: a.regions[a.region[i]] ?? '', timeZone: a.timeZones[a.timeZone[i]] ?? 'UTC',
      population: a.population[i], keys,
    }
  }
  return out
}

// Lower is better. Exact > prefix > word prefix > substring; aliases rank one step below primary names.
function matchRank(keys: string[], q: string): number {
  let best = Infinity
  keys.forEach((k, idx) => {
    const alias = idx > 2 ? 1 : 0
    let r = Infinity
    if (k === q) r = 0
    else if (k.startsWith(q)) r = 2
    else if (k.includes(' ' + q)) r = 4
    else if (q.length >= 3 && k.includes(q)) r = 6
    if (r + alias < best) best = r + alias
  })
  return best
}

/** Top `limit` matches, ordered by match quality then population (larger first), then name. */
export function searchCities(cities: City[], query: string, limit = 8): City[] {
  const q = fold(query)
  if (q.length < 2) return []
  const hits: { c: City; r: number }[] = []
  for (const c of cities) { const r = matchRank(c.keys, q); if (r !== Infinity) hits.push({ c, r }) }
  hits.sort((a, b) => a.r - b.r || b.c.population - a.c.population || a.c.name.localeCompare(b.c.name))
  return hits.slice(0, limit).map((h) => h.c)
}

export const CITIES_URL = '/lab/weather/cities.json'
let cache: Promise<City[]> | null = null
/** Fetched once on demand (first open of the search) and kept in memory; a failure allows a retry. */
export function loadCities(fetcher: typeof fetch = fetch): Promise<City[]> {
  if (!cache) {
    cache = fetcher(CITIES_URL)
      .then((r) => { if (!r.ok) throw new Error('cities_unavailable'); return r.json() as Promise<CityAsset> })
      .then(decodeCities)
      .catch((e) => { cache = null; throw e })
  }
  return cache
}
export const resetCityCache = () => { cache = null }

// Recent picks: at most 3, only GeoNames cities (never device coordinates), validated on read.
export type RecentCity = { id: number; nameEs: string; nameEn: string; lat: number; lon: number; timeZone: string; countryCode: string; region: string }
const RECENT_KEY = 'archic-lab-weather-recent'
export function parseRecents(raw: string | null): RecentCity[] {
  try {
    const v = JSON.parse(raw ?? '[]')
    if (!Array.isArray(v)) return []
    return v.filter((r) => r && Number.isInteger(r.id) && typeof r.nameEs === 'string' && typeof r.nameEn === 'string'
      && Number.isFinite(r.lat) && Math.abs(r.lat) <= 90 && Number.isFinite(r.lon) && Math.abs(r.lon) <= 180
      && typeof r.timeZone === 'string' && typeof r.countryCode === 'string' && /^[A-Z]{2}$/.test(r.countryCode) && typeof r.region === 'string'
      && r.nameEs.length < 120 && r.nameEn.length < 120).slice(0, 3)
  } catch { return [] }
}
export function pushRecent(list: RecentCity[], c: RecentCity): RecentCity[] {
  return [c, ...list.filter((r) => r.id !== c.id)].slice(0, 3)
}
export const readRecents = () => { try { return parseRecents(localStorage.getItem(RECENT_KEY)) } catch { return [] } }
export const writeRecents = (l: RecentCity[]) => { try { localStorage.setItem(RECENT_KEY, JSON.stringify(l)) } catch { /* storage disabled */ } }
