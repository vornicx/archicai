import { useEffect, useState } from 'react'
import { useLang } from '../i18n/LanguageContext'

const COPY = {
  es: { work: 'Qué hacemos', approach: 'Enfoque', sectors: 'Sectores', cta: 'Hablar con Archic' },
  en: { work: 'What we do', approach: 'Approach', sectors: 'Sectors', cta: 'Talk to Archic' },
}

export default function StudioHeader() {
  const { lang, setLang, t } = useLang()
  const c = COPY[lang]
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#work', label: c.work },
    { href: '#approach', label: c.approach },
    { href: '#sectors', label: c.sectors },
  ]

  return (
    <header className="ax-header" data-solid={solid || open}>
      <a href={lang === 'en' ? '/en/' : '/'} className="ax-brand" aria-label="Archic">
        <img src="/brand/archic-lockup-light.svg" alt="" width={981} height={174} />
      </a>

      <nav className="ax-nav" aria-label={t.a11y.mainNav}>
        {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
      </nav>

      <div className="ax-header-actions">
        <div className="ax-lang" role="group" aria-label={t.footer.langLabel}>
          <button type="button" aria-pressed={lang === 'es'} onClick={() => setLang('es')}>ES</button>
          <span>/</span>
          <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
        </div>
        <a className="ax-header-cta" href="#contact">{c.cta}<span>↗</span></a>
        <button
          type="button"
          className="ax-menu"
          aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      {open && (
        <nav className="ax-mobile-nav" aria-label={t.a11y.mainNav}>
          {links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
          <a href="#contact" onClick={() => setOpen(false)}>{c.cta}</a>
        </nav>
      )}
    </header>
  )
}
