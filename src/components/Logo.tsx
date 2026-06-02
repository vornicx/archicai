type LogoProps = {
  className?: string
  showWordmark?: boolean
  title?: string
}

function Logo({ className, showWordmark = true, title = 'Archic' }: LogoProps) {
  return (
    <span className={`archic-logo inline-flex items-center gap-2.5 ${className ?? ''}`} aria-label={title}>
      <svg
        className="archic-mark"
        viewBox="0 0 40 40"
        width="40"
        height="40"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="archic-logo-gold" x1="4" y1="4" x2="36" y2="36">
            <stop offset="0%" stopColor="#fff7da" />
            <stop offset="28%" stopColor="#e8cc78" />
            <stop offset="62%" stopColor="#b8943c" />
            <stop offset="100%" stopColor="#6f4d16" />
          </linearGradient>
          <linearGradient id="archic-logo-ink" x1="6" y1="8" x2="30" y2="34">
            <stop offset="0%" stopColor="#3c2b0f" />
            <stop offset="100%" stopColor="#8b6421" />
          </linearGradient>
          <radialGradient id="archic-logo-touch" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#fff8de" stopOpacity="1" />
            <stop offset="46%" stopColor="#e2be5d" stopOpacity="0.52" />
            <stop offset="100%" stopColor="#b8943c" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle className="logo-halo" cx="20" cy="20" r="18" fill="url(#archic-logo-touch)" />
        <path
          className="logo-orbit logo-orbit-outer"
          d="M6.2 26.5C6.2 16.8 12.3 8.9 20 8.9s13.8 7.9 13.8 17.6"
          stroke="url(#archic-logo-ink)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          className="logo-orbit logo-orbit-inner"
          d="M11.4 26.1c0-6.2 3.9-11.2 8.6-11.2s8.6 5 8.6 11.2"
          stroke="url(#archic-logo-gold)"
          strokeWidth="2.45"
          strokeLinecap="round"
        />
        <circle className="logo-node logo-node-top" cx="20" cy="8.9" r="3" fill="url(#archic-logo-gold)" />
        <circle className="logo-node" cx="6.2" cy="26.5" r="2.6" fill="#fff8df" />
        <circle className="logo-node" cx="33.8" cy="26.5" r="2.6" fill="#fff8df" />
        <circle className="logo-core" cx="20" cy="24.1" r="4.9" fill="url(#archic-logo-gold)" />
        <circle cx="20" cy="24.1" r="2" fill="#fff7d7" opacity="0.9" />
      </svg>

      {showWordmark && (
        <span className="midas-wordmark font-semibold uppercase leading-none tracking-[0.22em] text-[13px]">
          Archic
        </span>
      )}
    </span>
  )
}

export default Logo
