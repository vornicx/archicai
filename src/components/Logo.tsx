type LogoProps = {
  className?: string
  title?: string
}

function Logo({ className, title = 'Archic' }: LogoProps) {
  return (
    <span className={`archic-logo ${className ?? ''}`} aria-label={title}>
      <svg
        className="archic-mark"
        viewBox="0 0 40 40"
        width="30"
        height="30"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5 34 L5 23 Q5 9 20 5 Q35 9 35 23 L35 34"
          stroke="var(--ink-strong)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 34 L13 25 Q13 17 20 14 Q27 17 27 25 L27 34"
          stroke="var(--ink-strong)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="20" r="1.9" fill="var(--gold)" />
        <circle cx="20" cy="32.4" r="1.9" fill="var(--gold)" />
      </svg>
      <span className="archic-divider" aria-hidden="true" />
      <span className="archic-wordmark">Archic</span>
    </span>
  )
}

export default Logo
