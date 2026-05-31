type LogoProps = {
  className?: string
  showWordmark?: boolean
  title?: string
}

/**
 * Archic mark — "Midas Arch".
 *
 * A single keystone arch rendered in molten gold gradient: the
 * structural metaphor for long-horizon memory (the arch holds weight
 * across time) fused with the Midas palette of the new brand system.
 *
 * The gradient runs from warm champagne to deep antique gold with a
 * specular highlight on the crown — the "touch" that turns the
 * silhouette precious. A single inlaid node sits at the keystone:
 * the retrieved memory, the moment of recall.
 */
function Logo({ className, showWordmark = true, title = 'Archic' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ''}`} aria-label={title}>
      <svg
        viewBox="0 0 32 32"
        width="24"
        height="24"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="archic-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F0D78C" />
            <stop offset="35%" stopColor="#D4B87A" />
            <stop offset="65%" stopColor="#B8943C" />
            <stop offset="100%" stopColor="#8A6A28" />
          </linearGradient>
          <linearGradient id="archic-gold-soft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5E2A8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#B8943C" stopOpacity="0.7" />
          </linearGradient>
          <radialGradient id="archic-gold-spec" cx="0.5" cy="0.2" r="0.6">
            <stop offset="0%" stopColor="#FFF6DC" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#FFF6DC" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* keystone arch silhouette */}
        <path
          d="M4 28 L4 16 A12 12 0 0 1 28 16 L28 28 L21 28 L21 17 A5 5 0 0 0 11 17 L11 28 Z"
          fill="url(#archic-gold)"
        />
        {/* crown specular highlight */}
        <path
          d="M4 28 L4 16 A12 12 0 0 1 28 16 L28 28 L21 28 L21 17 A5 5 0 0 0 11 17 L11 28 Z"
          fill="url(#archic-gold-spec)"
        />
        {/* inner aperture edge — subtle inner glow line */}
        <path
          d="M11 28 L11 17 A5 5 0 0 1 21 17 L21 28"
          fill="none"
          stroke="url(#archic-gold-soft)"
          strokeWidth="0.6"
          opacity="0.7"
        />
        {/* keystone node — retrieved memory */}
        <circle cx="16" cy="9" r="1.6" fill="#FFF1C2" />
        <circle cx="16" cy="9" r="0.7" fill="#8A6A28" />
      </svg>
      {showWordmark && (
        <span
          className="font-display text-[17px] font-medium tracking-[-0.01em] leading-none"
          style={{
            backgroundImage: 'linear-gradient(90deg, #111 0%, #B8943C 50%, #111 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Archic
        </span>
      )}
    </span>
  )
}

export default Logo
