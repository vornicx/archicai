function EcosystemBar() {
  const host = typeof window !== 'undefined' ? window.location.host : ''
  const current =
    host.startsWith('midas.') ? 'midas' :
    host.startsWith('apollo.') ? 'apollo' :
    'hub'

  return (
    <div className="ecosystem-bar" aria-label="Archic ecosystem navigation">
      <div className="container-page">
        <nav aria-label="Ecosystem" className="ecosystem-bar-inner">
          <span className="tag-mono ecosystem-bar-label" aria-hidden="true">[ ECOSYSTEM ]</span>
          <a
            href="https://archic.es"
            className={`ecosystem-link ${current === 'hub' ? 'is-current' : ''}`}
            aria-current={current === 'hub' ? 'page' : undefined}
          >
            archic<span aria-hidden="true">.es</span>
          </a>
          <span className="ecosystem-sep" aria-hidden="true">/</span>
          <a
            href="https://midas.archic.es"
            className={`ecosystem-link ${current === 'midas' ? 'is-current' : ''}`}
            aria-current={current === 'midas' ? 'page' : undefined}
          >
            midas
          </a>
          <span className="ecosystem-sep" aria-hidden="true">/</span>
          <a
            href="https://apollo.archic.es"
            className={`ecosystem-link ${current === 'apollo' ? 'is-current' : ''}`}
            aria-current={current === 'apollo' ? 'page' : undefined}
          >
            apollo
          </a>
          <span className="ecosystem-bar-status" aria-hidden="true">
            <span className="ecosystem-dot" /> SYS · OK
          </span>
        </nav>
      </div>
    </div>
  )
}

export default EcosystemBar
