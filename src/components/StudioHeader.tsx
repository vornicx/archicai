import { useEffect, useState } from 'react'
import { useLang } from '../i18n/LanguageContext'

const LABELS = {
  es: { capabilities: 'Capacidades', concepts: 'Conceptos', system: 'Sistema', cta: 'Empezar proyecto' },
  en: { capabilities: 'Capabilities', concepts: 'Concepts', system: 'System', cta: 'Start a project' },
}

export default function StudioHeader() {
  const { lang, setLang, t } = useLang()
  const labels = LABELS[lang]
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#capabilities', label: labels.capabilities },
    { href: '#concepts', label: labels.concepts },
    { href: '#system', label: labels.system },
  ]

  return (
    <header className="sx-topbar" data-solid={solid || open}>
      <a href={lang === 'en' ? '/en/' : '/'} className="sx-brand" aria-label="Archic">
        <img src="/brand/archic-lockup-light.svg" alt="" width={981} height={174} />
      </a>

      <nav className="sx-nav" aria-label={t.a11y.mainNav}>
        {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
      </nav>

      <div className="sx-header-right">
        <div className="sx-lang" role="group" aria-label={t.footer.langLabel}>
          <button type="button" aria-pressed={lang === 'es'} onClick={() => setLang('es')}>ES</button>
          <span aria-hidden="true">/</span>
          <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
        </div>
        <a className="sx-header-cta" href="#contact">{labels.cta}<span aria-hidden="true">↗</span></a>
        <button
          type="button"
          className="sx-burger"
          aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <svg width="22" height="14" viewBox="0 0 22 14" aria-hidden="true">
            <path d={open ? 'M3 1 L19 13 M19 1 L3 13' : 'M0 2 H22 M0 12 H22'} stroke="currentColor" strokeWidth="1.25" />
          </svg>
        </button>
      </div>

      {open && (
        <nav className="sx-mobile-nav" aria-label={t.a11y.mainNav}>
          {links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
          <a href="#contact" onClick={() => setOpen(false)}>{labels.cta}</a>
        </nav>
      )}
    </header>
  )
}
