function Hero() {
  return (
    <section id="top" className="section-padding" style={{ paddingTop: '9rem', paddingBottom: '7rem' }}>
      <div className="container-page" style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
        <div className="section-label">Infrastructure &amp; Systems</div>

        <h1 className="heading-serif" style={{ fontSize: '4.2rem', maxWidth: '800px', marginBottom: '2rem' }}>
          Intelligent memory for long-horizon agents.
        </h1>

        <p className="text-[1.25rem] leading-relaxed mb-14" style={{ color: '#8A8A8A', maxWidth: '680px' }}>
          <strong style={{ color: '#FFFFFF', fontWeight: 500 }}>Archic</strong> builds the persistent
          memory infrastructure that enables autonomous systems to operate deterministically
          across days and weeks. Without context window saturation. Without state degradation.
        </p>

        <div className="flex flex-wrap gap-6 items-center">
          <a href="https://github.com/vornicx/origin-lab" target="_blank" rel="noopener noreferrer" className="btn-primary">
            Clone SDK
          </a>
          <a href="#whitepaper" className="btn-secondary">
            Read the whitepaper <span>&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
