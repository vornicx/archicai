import { useEffect, useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { STUDIO } from '../content/studio'

export default function StudioHeader() {
  const { lang, setLang, t } = useLang()
  const s = STUDIO[lang]
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 36)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#capabilities', label: s.nav.capabilities },
    { href: '#systems', label: s.nav.systems },
    { href: '#sectors', label: s.nav.sectors },
    { href: '#studio', label: s.nav.about },
  ]

  return (
    <header className="sx-header" data-solid={solid || open}>
      <a className="sx-brand" href={lang === 'en' ? '/en/' : '/'} aria-label="Archic">
        <img className="sx-brand-lockup" src="/brand/archic-lockup-light.svg" alt="" width={981} height={174} />
      </a>

      <nav className="sx-nav" aria-label={t.a11y.mainNav}>
        {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
      </nav>

      <div className="sx-header-actions">
        <div className="sx-lang" role="group" aria-label={t.footer.langLabel}>
          <button type="button" aria-pressed={lang === 'es'} onClick={() => setLang('es')}>ES</button>
          <span aria-hidden="true">/</span>
          <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
        </div>
        <a className="sx-header-cta" href="#contact">{s.nav.cta}<span aria-hidden="true">↗</span></a>
        <button
          type="button"
          className="sx-burger"
          aria-expanded={open}
          aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
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
          <a href="#contact" onClick={() => setOpen(false)}>{s.nav.cta}</a>
        </nav>
      )}
    </header>
  )
}
