import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Logo from '../components/Logo'
import { CONTACT_MAIL } from '../i18n/content'
import { useLang } from '../i18n/LanguageContext'

function NotFound() {
  const { t, lang } = useLang()
  const n = t.notFound

  return (
    <>
      <Helmet>
        <title>{n.title} | Archic</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <section className="ar-section" style={{ borderTop: 0 }}>
        <div className="ar-container">
          <div className="ar-empty">
            <Logo size={34} />
            <p className="ar-eyebrow" style={{ marginTop: 28 }}>{n.eyebrow}</p>
            <h1 className="ar-h2" style={{ maxWidth: '18ch' }}>{n.title}</h1>
            <p className="ar-lead">{n.body}</p>
            <div className="ar-empty-actions">
              <Link to={lang === 'en' ? '/en/' : '/'} className="ar-btn ar-btn-primary">
                {n.home}
              </Link>
              <a href={`mailto:${CONTACT_MAIL}`} className="ar-btn ar-btn-ghost">
                {n.contact}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default NotFound
