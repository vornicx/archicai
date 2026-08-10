import { useLang } from '../i18n/LanguageContext'
import { LEGAL_PATHS } from '../legal/documents'
import { CONTACT_MAIL } from '../i18n/content'

const COPY = {
  es: {
    tagline: 'Sistemas digitales para negocios excepcionales.',
    location: 'España · Remote & on-site',
    legal: 'Legal',
    rights: 'Todos los derechos reservados.',
    explore: 'Explorar',
    pages: [
      ['Presence', 'presence'],
      ['Control', 'control'],
      ['Business', 'business'],
      ['Studio', 'studio'],
      ['Contacto', 'contact'],
    ],
  },
  en: {
    tagline: 'Digital systems for exceptional businesses.',
    location: 'Spain · Remote & on-site',
    legal: 'Legal',
    rights: 'All rights reserved.',
    explore: 'Explore',
    pages: [
      ['Presence', 'presence'],
      ['Control', 'control'],
      ['Business', 'business'],
      ['Studio', 'studio'],
      ['Contact', 'contact'],
    ],
  },
}

function path(lang: 'es' | 'en', slug: string) {
  return lang === 'en' ? `/en/${slug}/` : `/${slug}/`
}

export default function StudioFooter() {
  const { lang, t } = useLang()
  const c = COPY[lang]
  const year = new Date().getFullYear()

  return (
    <footer className="as-footer">
      <div className="as-footer-top">
        <div className="as-footer-brand">
          <img src="/brand/archic-lockup-light.svg" alt="Archic" width={981} height={174} />
          <p>{c.tagline}</p>
        </div>

        <nav className="as-footer-nav" aria-label={c.explore}>
          <span>{c.explore}</span>
          {c.pages.map(([label, slug]) => <a href={path(lang, slug)} key={slug}>{label}</a>)}
        </nav>

        <div className="as-footer-contact">
          <span>CONTACT</span>
          <a href={`mailto:${CONTACT_MAIL}`}>{CONTACT_MAIL}</a>
        </div>

        <nav className="as-footer-legal" aria-label={c.legal}>
          <span>{c.legal}</span>
          <a href={LEGAL_PATHS.legal[lang]}>{t.legal.legalNotice}</a>
          <a href={LEGAL_PATHS.privacy[lang]}>{t.legal.privacy}</a>
          <a href={LEGAL_PATHS.cookies[lang]}>{t.legal.cookies}</a>
        </nav>
      </div>

      <div className="as-footer-bottom">
        <span>© {year} ARCHIC — {c.rights}</span>
        <span>{c.location}</span>
      </div>
    </footer>
  )
}
