import { createContext, useCallback, useContext, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LEGAL_PATHS, type LegalDocKey } from '../legal/documents'
import { CONTENT, type Content, type Lang } from './content'

type Ctx = { lang: Lang; setLang: (l: Lang) => void; canSwitchLang: boolean; t: Content }

const LanguageContext = createContext<Ctx | null>(null)
const CORE_TRANSLATED = new Set([
  'presence',
  'control',
  'business',
  'studio',
  'contact',
  'explorations/hospitality',
  'explorations/mobility',
  'explorations/real-estate',
])
const LEGAL_KEYS = Object.keys(LEGAL_PATHS) as LegalDocKey[]

function langFromPath(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es'
}

function normalise(pathname: string) {
  if (pathname === '/') return '/'
  return pathname.replace(/\/$/, '')
}

function translatedPath(target: Lang, pathname: string, search: string, hash: string): string | null {
  const current = normalise(pathname)

  for (const key of LEGAL_KEYS) {
    const esPath = normalise(LEGAL_PATHS[key].es)
    const enPath = normalise(LEGAL_PATHS[key].en)
    if (current === esPath || current === enPath) {
      return `${LEGAL_PATHS[key][target]}${search}${hash}`
    }
  }

  const withoutLang = current === '/en' ? '/' : current.startsWith('/en/') ? current.slice(3) || '/' : current
  const slug = withoutLang.replace(/^\//, '')
  const isHome = withoutLang === '/'
  const isCore = CORE_TRANSLATED.has(slug)

  if (!isHome && !isCore) return null

  const nextPath = target === 'en'
    ? isHome ? '/en/' : `/en/${slug}/`
    : isHome ? '/' : `/${slug}/`

  return `${nextPath}${search}${hash}`
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const lang = langFromPath(location.pathname)
  const otherLang: Lang = lang === 'es' ? 'en' : 'es'
  const canSwitchLang = translatedPath(otherLang, location.pathname, location.search, location.hash) !== null

  const setLang = useCallback((target: Lang) => {
    if (target === lang) return
    const destination = translatedPath(target, location.pathname, location.search, location.hash)
    if (!destination) return
    navigate(destination)
  }, [lang, location.pathname, location.search, location.hash, navigate])

  const value = useMemo(() => ({ lang, setLang, canSwitchLang, t: CONTENT[lang] }), [lang, setLang, canSwitchLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
