import { createContext, useCallback, useContext, useMemo } from 'react'
import { CONTENT, type Content, type Lang } from './content'

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Content }

const LanguageContext = createContext<Ctx | null>(null)

function initialLang(): Lang {
  if (typeof window === 'undefined') return 'es'
  return window.location.pathname.startsWith('/en') ? 'en' : 'es'
}

function translatedPath(target: Lang) {
  const current = window.location.pathname
  const hash = window.location.hash
  const search = window.location.search

  if (target === 'en') {
    const clean = current.startsWith('/en/') ? current.slice(3) : current
    const path = clean === '/' ? '/en/' : `/en${clean.startsWith('/') ? clean : `/${clean}`}`
    return `${path}${search}${hash}`
  }

  const path = current.startsWith('/en/') ? current.slice(3) || '/' : current
  return `${path}${search}${hash}`
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = initialLang()

  const setLang = useCallback((l: Lang) => {
    if (l === lang) return
    window.location.assign(translatedPath(l))
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: CONTENT[lang] }), [lang, setLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
