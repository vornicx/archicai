import { createContext, useCallback, useContext, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CONTENT, type Content, type Lang } from './content'

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Content }

const LanguageContext = createContext<Ctx | null>(null)

function langFromPath(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es'
}

function translatedPath(target: Lang, pathname: string, search: string, hash: string) {
  if (target === 'en') {
    if (pathname === '/en' || pathname.startsWith('/en/')) return `${pathname}${search}${hash}`
    const path = pathname === '/' ? '/en/' : `/en${pathname.startsWith('/') ? pathname : `/${pathname}`}`
    return `${path}${search}${hash}`
  }

  const path = pathname === '/en'
    ? '/'
    : pathname.startsWith('/en/')
      ? pathname.slice(3) || '/'
      : pathname
  return `${path}${search}${hash}`
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const lang = langFromPath(location.pathname)

  const setLang = useCallback((target: Lang) => {
    if (target === lang) return
    navigate(translatedPath(target, location.pathname, location.search, location.hash))
  }, [lang, location.pathname, location.search, location.hash, navigate])

  const value = useMemo(() => ({ lang, setLang, t: CONTENT[lang] }), [lang, setLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
