import { createContext, useCallback, useContext, useMemo } from 'react'
import { CONTENT, type Content, type Lang } from './content'

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Content }

const LanguageContext = createContext<Ctx | null>(null)
function initialLang(): Lang {
  if (typeof window === 'undefined') return 'es'
  return window.location.pathname.startsWith('/en') ? 'en' : 'es'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = initialLang()

  const setLang = useCallback((l: Lang) => {
    const target = l === 'en' ? '/en/' : '/'
    window.location.assign(`${target}${window.location.hash}`)
  }, [])

  const value = useMemo(() => ({ lang, setLang, t: CONTENT[lang] }), [lang, setLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
