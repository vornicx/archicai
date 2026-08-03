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
            <Logo size={28} minSize={24} compactWordmark />
          </a>


          <nav className="ar-nav" aria-label={t.a11y.mainNav}>
            {SECTIONS.map((s) => (
              <a key={s.key} href={s.href}>
                {t.nav[s.key]}
              </a>
            ))}
          </nav>

          <div className="ar-header-actions">
            <div className="ar-lang" role="group" aria-label={t.footer.langLabel}>
              <button
                type="button"
                aria-pressed={lang === 'es'}
                lang="es"
                onClick={() => setLang('es')}
              >
                <span aria-hidden="true">ES</span>
                <span className="ar-sr-only">Español</span>
              </button>
              <button
                type="button"
                aria-pressed={lang === 'en'}
                lang="en"
                onClick={() => setLang('en')}
              >
                <span aria-hidden="true">EN</span>
                <span className="ar-sr-only">English</span>
              </button>
            </div>
            <a href="#contacto" className="ar-btn ar-btn-primary ar-btn-sm ar-header-cta">
              {t.nav.cta}
            </a>
            <button
              type="button"
              className="ar-burger"
              aria-expanded={open}
              aria-controls="ar-mobile-nav"
              aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
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
          <nav id="ar-mobile-nav" className="ar-mobile-nav" aria-label={t.a11y.mainNav}>
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
