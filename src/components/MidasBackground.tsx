const PARTICLES = Array.from({ length: 22 }, (_, index) => index)

function MidasBackground() {
  return (
    <div className="midas-background" aria-hidden="true">
      <div className="midas-aurora" />
      <div className="midas-particle-field">
        {PARTICLES.map((particle) => (
          <span key={particle} className="midas-particle" />
        ))}
      </div>
    </div>
  )
}

export default MidasBackground
