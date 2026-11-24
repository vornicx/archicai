import { useLang } from '../i18n/LanguageContext'
import { LEGAL_PATHS } from '../legal/documents'
import { ARCHIC_FOUNDERS } from '../config/contact'

const COPY = {
  es: {
    tagline: 'Diseño y tecnología. Studio para empresas, Lab para productos propios.',
    location: 'Desde España · Clientes en todo el mundo',
    legal: 'Legal',
    rights: 'Todos los derechos reservados.',
    explore: 'Explorar',
    call: 'Llamar',
    email: 'Correo',
    contact: 'Contacto',
    founders: 'FUNDADOR',
    foundersTitle: 'Una dirección clara.',
    foundersLead: 'Producto, tecnología y relación con clientes desde el inicio de cada proyecto.',
    pages: [
      ['Archic Studio', 'studio'],
      ['Archic Lab', 'lab'],
      ['Midas', 'lab/midas'],
      ['Presence', 'presence'],
      ['Control', 'control'],
      ['Business', 'business'],
      ['Contacto', 'contact'],
    ],
  },
  en: {
    tagline: 'Design and technology. Studio for businesses, Lab for our own products.',
    location: 'Based in Spain · Worldwide clients',
    legal: 'Legal',
    rights: 'All rights reserved.',
    explore: 'Explore',
    call: 'Call',
    email: 'Email',
    contact: 'Contact',
    founders: 'FOUNDER',
    foundersTitle: 'One clear direction.',
    foundersLead: 'Product, technology and client relationships from the beginning of every project.',
    pages: [
      ['Archic Studio', 'studio'],
      ['Archic Lab', 'lab'],
      ['Midas', 'lab/midas'],
      ['Presence', 'presence'],
      ['Control', 'control'],
      ['Business', 'business'],
      ['Contact', 'contact'],
    ],
  },
}

function path(lang: 'es' | 'en', slug = '') {
  if (!slug) return lang === 'en' ? '/en/' : '/'
  return lang === 'en' ? `/en/${slug}/` : `/${slug}/`
}

export default function StudioFooter() {
  const { lang, t } = useLang()
  const c = COPY[lang]
  const year = new Date().getFullYear()
  const isStudio = typeof window !== 'undefined' && /^\/(?:en\/)?studio\/?$/.test(window.location.pathname)

  return (
    <footer className="as-footer">
      {isStudio && (
        <section className="as-footer-founders" aria-labelledby="as-founders-title">
          <div className="as-footer-founders-intro">
            <span>{c.founders}</span>
            <h2 id="as-founders-title">{c.foundersTitle}</h2>
            <p>{c.foundersLead}</p>
          </div>
          <div className="as-footer-founders-list">
            {ARCHIC_FOUNDERS.map((founder, index) => (
              <article key={founder.email}>
                <span>0{index + 1}</span>
                <div>
                  <strong>{founder.name}</strong>
                  <p>{founder.role} · {founder.focus}</p>
                </div>
                <div className="as-footer-founder-links">
                  <a href={`mailto:${founder.email}`}>{founder.email}</a>
                  <a href={`tel:${founder.phone}`}>{founder.phoneDisplay}</a>
                  <div className="al-message-links"><a href={founder.whatsappUrl}>WhatsApp</a><a href={founder.messageUrl}>iMessage / SMS</a></div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <div className="as-footer-top">
        <div className="as-footer-brand">
          <a href={path(lang)} aria-label={lang === 'es' ? 'Archic · inicio' : 'Archic · home'}>
            <span className="as-brand as-brand--footer"><img className="as-brand-light" src="/brand/archic-lockup-light.svg" alt="" width={1744} height={280} /><img className="as-brand-dark" src="/brand/archic-lockup-dark.svg" alt="" width={1744} height={280} /></span>
          </a>
          <p>{c.tagline}</p>
        </div>

        <nav className="as-footer-nav" aria-label={c.explore}>
          <span>{c.explore}</span>
          {c.pages.map(([label, slug]) => <a href={path(lang, slug)} key={slug}>{label}</a>)}
        </nav>

        <div className="as-footer-contact">
          <span>{c.contact}</span>
          <div className="as-footer-contact-people">
            {ARCHIC_FOUNDERS.map((founder) => (
              <div className="as-footer-contact-person" key={founder.email}>
                <div className="as-footer-contact-identity">
                  <strong className="as-footer-contact-name">{founder.name}</strong>
                  <span>{founder.role}</span>
                </div>
                <a className="as-footer-phone" href={`tel:${founder.phone}`}>
                  <small>{c.call}</small>
                  {founder.phoneDisplay}
                </a>
                <a className="as-footer-mail" href={`mailto:${founder.email}`}>
                  <small>{c.email}</small>
                  {founder.email}
                </a>
                <div className="al-message-links"><a href={founder.whatsappUrl} data-archic-intent="footer:whatsapp">WhatsApp</a><a href={founder.messageUrl} data-archic-intent="footer:message">iMessage / SMS</a></div>
              </div>
            ))}
          </div>
        </div>

        <nav className="as-footer-legal" aria-label={c.legal}>
          <span>{c.legal}</span>
          <a href={LEGAL_PATHS.legal[lang]}>{t.legal.legalNotice}</a>
          <a href={LEGAL_PATHS.privacy[lang]}>{t.legal.privacy}</a>
          <a href={LEGAL_PATHS.cookies[lang]}>{t.legal.cookies}</a>
        </nav>
      </div>

      <div className="as-footer-bottom">
        <span>© {year} Archic — {c.rights}</span>
        <span>{c.location}</span>
      </div>
    </footer>
  )
}
