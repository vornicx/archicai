import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { CONTENT, type Content, type Lang } from './content'

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Content }

const LanguageContext = createContext<Ctx | null>(null)
const STORAGE_KEY = 'archic-lang'

function initialLang(): Lang {
  if (typeof window === 'undefined') return 'es'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'es' || stored === 'en') return stored
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'es'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      window.localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo(() => ({ lang, setLang, t: CONTENT[lang] }), [lang, setLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
