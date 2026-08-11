import { Helmet } from 'react-helmet-async'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioExperience from '../components/StudioExperience'
import { useLang } from '../i18n/LanguageContext'

export default function NotFound() {
  const { t, lang } = useLang()
  const n = t.notFound
  const home = lang === 'en' ? '/en/' : '/'
  const contact = lang === 'en' ? '/en/contact/' : '/contact/'

  return (
    <div className="as-site as-seo-page as-notfound-page">
      <Helmet htmlAttributes={{ lang }}>
        <title>{n.title} | Archic</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <StudioExperience />
      <StudioHeader />
      <section className="as-seo-hero">
        <div className="as-seo-hero-main" data-reveal="hero">
          <div className="as-seo-layer">ARCHIC / 404</div>
          <h1>{n.title}<br /><em>{lang === 'es' ? 'Volvamos a lo importante.' : 'Back to what matters.'}</em></h1>
          <p className="as-seo-hero-lead">{n.body}</p>
          <div className="as-seo-actions">
            <a className="as-btn as-btn-metal" href={home}>{n.home}<i className="as-arrow" aria-hidden="true" /></a>
            <a className="as-seo-chip" href={contact}>{n.contact}<i className="as-arrow" aria-hidden="true" /></a>
          </div>
        </div>
      </section>
      <StudioFooter />
    </div>
  )
}
