import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import Logo from './Logo'


const SECTIONS = [
  { key: 'web', href: '#servicios' },
  { key: 'software', href: '#software' },
  { key: 'maintenance', href: '#mantenimiento' },
  { key: 'projects', href: '#proyectos' },
  { key: 'about', href: '#sobre' },
  { key: 'contact', href: '#contacto' },
] as const

export default function SiteHeader() {
  const { t, lang, setLang } = useLang()
  const [open, setOpen] = useState(false)

  return (
    <header className="ar-header">
      <div className="ar-container">
        <div className="ar-header-row">
          <a className="ar-brand" href="#top">
            <img src={markAsset.url} alt="" width={26} height={26} />
            <span>ARCHIC</span>
          </a>

          <nav className="ar-nav" aria-label={t.nav.home}>
            {SECTIONS.map((s) => (
              <a key={s.key} href={s.href}>
                {t.nav[s.key]}
              </a>
            ))}
          </nav>

          <div className="ar-header-actions">
            <div className="ar-lang" role="group" aria-label={t.footer.langLabel}>
              <button type="button" aria-pressed={lang === 'es'} onClick={() => setLang('es')}>
                ES
              </button>
              <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>
                EN
              </button>
            </div>
            <a href="#contacto" className="ar-btn ar-btn-primary ar-btn-sm ar-header-cta">
              {t.nav.cta}
            </a>
            <button
              type="button"
              className="ar-burger"
              aria-expanded={open}
              aria-label={t.nav.home}
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {open ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <nav className="ar-mobile-nav" aria-label={t.nav.home}>
            {SECTIONS.map((s) => (
              <a key={s.key} href={s.href} onClick={() => setOpen(false)}>
                {t.nav[s.key]}
              </a>
            ))}
            <a href="#contacto" className="ar-btn ar-btn-primary" style={{ marginTop: 16 }} onClick={() => setOpen(false)}>
              {t.nav.cta}
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
