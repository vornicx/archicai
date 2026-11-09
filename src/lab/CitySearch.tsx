// Accessible city combobox (ARIA 1.2 combobox + listbox). Search is local: the GeoNames index is
// fetched only on first focus and kept in memory; no keystroke ever leaves the browser.
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { loadCities, searchCities, readRecents, type City, type RecentCity } from './citySearch'

export type PickedCity = RecentCity
type Lang = 'es' | 'en'

const T = {
  es: { label: 'Buscar ciudad', placeholder: 'Buscar ciudad', loading: 'Cargando ciudades…', none: 'Sin resultados. El índice incluye ciudades de más de 5.000 habitantes; prueba con coordenadas.', error: 'No se pudo cargar el índice de ciudades.', retry: 'Reintentar', recent: 'Recientes', results: (n: number) => `${n} resultados`, hint: 'Miles de ciudades · GeoNames', clear: 'Borrar búsqueda' },
  en: { label: 'Search city', placeholder: 'Search city', loading: 'Loading cities…', none: 'No results. The index covers cities above 5,000 people; try coordinates.', error: 'The city index could not be loaded.', retry: 'Try again', recent: 'Recent', results: (n: number) => `${n} results`, hint: 'Thousands of cities · GeoNames', clear: 'Clear search' },
}

const SearchIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m20 20-4.8-4.8" /></svg>

const toPicked = (c: City): PickedCity => ({ id: c.id, nameEs: c.nameEs, nameEn: c.nameEn, lat: c.lat, lon: c.lon, timeZone: c.timeZone, countryCode: c.countryCode, region: c.region })

export function CitySearch({ lang, locale, onPick }: { lang: Lang; locale: string; onPick: (c: PickedCity) => void }) {
  const t = T[lang]
  const uid = useId()
  const listId = `${uid}-list`
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [cities, setCities] = useState<City[] | null>(null)
  const [active, setActive] = useState(-1)
  const [recents, setRecents] = useState<RecentCity[]>([])

  const region = useMemo(() => { try { return new Intl.DisplayNames([locale], { type: 'region' }) } catch { return null } }, [locale])
  const country = (cc: string) => { try { return region?.of(cc) ?? cc } catch { return cc } }

  const ensureLoaded = () => {
    if (cities || status === 'loading') return
    setStatus('loading')
    loadCities().then((list) => { setCities(list); setStatus('ready') }).catch(() => setStatus('error'))
  }

  const items: PickedCity[] = useMemo(() => {
    if (query.trim().length < 2) return recents
    return cities ? searchCities(cities, query, 8).map(toPicked) : []
  }, [query, cities, recents])
  const showingRecents = query.trim().length < 2

  useEffect(() => { setActive(-1) }, [query])
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => { if (!rootRef.current?.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  const choose = (c: PickedCity) => {
    onPick(c)
    setQuery('')
    setOpen(false)
    setRecents(readRecents())
  }
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!open) { setOpen(true); ensureLoaded(); return }
      if (!items.length) return
      setActive((i) => (e.key === 'ArrowDown' ? (i + 1) % items.length : (i <= 0 ? items.length - 1 : i - 1)))
    } else if (e.key === 'Enter') {
      if (open && items.length) { e.preventDefault(); choose(items[Math.max(0, active)]) }
    } else if (e.key === 'Escape') {
      if (open) { e.preventDefault(); setOpen(false) } else if (query) { e.preventDefault(); setQuery('') }
    } else if (e.key === 'Tab') setOpen(false)
  }

  const label = (c: PickedCity) => (lang === 'es' ? c.nameEs : c.nameEn)
  const sub = (c: PickedCity) => [c.region, country(c.countryCode)].filter(Boolean).join(' · ')
  const expanded = open && (items.length > 0 || status === 'loading' || status === 'error' || (!showingRecents && status === 'ready'))
  const message = status === 'loading' && !showingRecents ? t.loading : status === 'error' ? t.error : !showingRecents && status === 'ready' && !items.length ? t.none : ''

  return (
    <div className="lw-search" ref={rootRef}>
      <label className="lw-sr" htmlFor={`${uid}-input`}>{t.label}</label>
      <div className="lw-search-field">
        <SearchIcon />
        <input
          ref={inputRef} id={`${uid}-input`} type="search" role="combobox" autoComplete="off" spellCheck={false} enterKeyHint="search"
          aria-autocomplete="list" aria-expanded={expanded} aria-controls={listId}
          aria-activedescendant={expanded && active >= 0 ? `${uid}-opt-${active}` : undefined}
          aria-describedby={`${uid}-hint`}
          placeholder={t.placeholder} value={query}
          onFocus={() => { setRecents(readRecents()); setOpen(true); ensureLoaded() }}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); ensureLoaded() }}
          onKeyDown={onKey}
        />
        {query && <button type="button" className="lw-search-clear" aria-label={t.clear} onClick={() => { setQuery(''); inputRef.current?.focus() }}><span aria-hidden="true">×</span></button>}
      </div>
      <p className="lw-sr" id={`${uid}-hint`}>{t.hint}</p>
      <div className="lw-search-pop" hidden={!expanded}>
        {showingRecents && items.length > 0 && <p className="lw-search-group" aria-hidden="true">{t.recent}</p>}
        <ul id={listId} role="listbox" aria-label={showingRecents ? t.recent : t.label}>
          {items.map((c, i) => (
            <li key={c.id} id={`${uid}-opt-${i}`} role="option" aria-selected={i === active} data-active={i === active || undefined}
              onPointerDown={(e) => e.preventDefault()} onClick={() => choose(c)} onPointerMove={() => setActive(i)}>
              <span className="lw-search-name">{label(c)}</span>
              <span className="lw-search-sub"><span className="lw-sr">, </span>{sub(c)}</span>
            </li>
          ))}
        </ul>
        {message && <p className="lw-search-msg">{message}{status === 'error' && <> <button type="button" className="lw-link" onClick={ensureLoaded}>{t.retry}</button></>}</p>}
      </div>
      <p className="lw-sr" role="status" aria-live="polite">{open ? (message || (!showingRecents && items.length ? t.results(items.length) : '')) : ''}</p>
    </div>
  )
}
