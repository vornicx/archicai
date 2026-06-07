import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="section-padding">
      <div className="container-page text-center">
        <div className="section-label justify-center">404</div>
        <h1 className="heading-serif text-[2.4rem] md:text-[3rem] mb-5">Page not found.</h1>
        <p className="mx-auto max-w-md text-[color:var(--muted)] mb-8 leading-relaxed">
          The page you were looking for doesn't exist. Head back to Archic or check Midas.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-primary">Archic home</Link>
          <Link to="/midas" className="btn-secondary">Midas</Link>
        </div>
      </div>
    </section>
  )
}

export default NotFound
