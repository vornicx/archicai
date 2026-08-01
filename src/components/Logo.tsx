type LogoProps = {
  className?: string
  size?: number
  showWordmark?: boolean
  title?: string
}

export default function Logo({
  className,
  size = 28,
  showWordmark = true,
  title = 'Archic',
}: LogoProps) {
  return (
    <span className={`ar-logo ${className ?? ''}`} aria-label={title} role="img">
      <svg
        className="ar-logo-mark"
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        {/* geometric A monogram: two diagonals, gold crossbar, base rule */}
        <path
          d="M16 4.5 L27 27"
          stroke="var(--blue-deep)"
          strokeWidth="2.4"
          strokeLinecap="square"
        />
        <path
          d="M16 4.5 L5 27"
          stroke="var(--blue-deep)"
          strokeWidth="2.4"
          strokeLinecap="square"
        />
        <path d="M10 19.5 H22" stroke="var(--gold)" strokeWidth="2.4" strokeLinecap="square" />
        <path
          d="M2.5 30 H29.5"
          stroke="var(--blue-deep)"
          strokeWidth="1.2"
          strokeLinecap="square"
          opacity="0.35"
        />
      </svg>
      {showWordmark && <span className="ar-logo-word">ARCHIC</span>}
    </span>
  )
}
