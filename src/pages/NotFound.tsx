import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

function NotFound() {
  return (
    <section className="ar-section" style={{ borderTop: 0 }}>
      <div className="ar-container">
        <div className="ar-empty">
          <Logo size={34} />
          <p className="ar-eyebrow" style={{ marginTop: 28 }}>Error 404</p>
          <h1 className="ar-h2" style={{ maxWidth: '18ch' }}>Esta página no existe</h1>
          <p className="ar-lead">
            El enlace es incorrecto o el contenido se ha movido. Vuelve al inicio o escríbenos y lo
            resolvemos.
          </p>
          <div className="ar-empty-actions">
            <Link to="/" className="ar-btn ar-btn-primary">
              Volver al inicio
            </Link>
            <a href="mailto:vornic@archic.es" className="ar-btn ar-btn-ghost">
              Contactar
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotFound
