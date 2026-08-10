import { useEffect, useState } from 'react'
import { useLang } from '../i18n/LanguageContext'

const COPY = {
  es: { studio: 'Archic', capabilities: 'Capacidades', standard: 'Estándar', cta: 'Empezar proyecto' },
  en: { studio: 'Archic', capabilities: 'Capabilities', standard: 'Standard', cta: 'Start a project' },
}

export default function StudioHeader() {
  const { lang, setLang, t } = useLang()
  const c = COPY[lang]
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#studio', label: c.studio },
    { href: '#capabilities', label: c.capabilities },
    { href: '#contact', label: c.standard },
  ]

  return (
    <header className="v5-header" data-solid={solid || open}>
      <a href={lang === 'en' ? '/en/' : '/'} className="v5-brand" aria-label="Archic">
        <img src="/brand/archic-lockup-light.svg" alt="" width={981} height={174} />
      </a>

      <nav className="v5-nav" aria-label={t.a11y.mainNav}>
        {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
      </nav>

      <div className="v5-header-actions">
        <div className="v5-lang" role="group" aria-label={t.footer.langLabel}>
          <button type="button" aria-pressed={lang === 'es'} onClick={() => setLang('es')}>ES</button>
          <span>/</span>
          <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
        </div>
        <a className="v5-header-cta" href="#contact">{c.cta}</a>
        <button type="button" className="v5-menu" aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <span /><span />
        </button>
      </div>

      {open && (
        <nav className="v5-mobile-nav" aria-label={t.a11y.mainNav}>
          {links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
          <a href="#contact" onClick={() => setOpen(false)}>{c.cta}</a>
        </nav>
      )}
    </header>
  )
}
