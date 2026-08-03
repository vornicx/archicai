type LogoProps = {
  className?: string
  /** Max mark size in px (desktop). The mark scales down on small screens. */
  size?: number
  /** Min mark size in px (mobile). */
  minSize?: number
  showWordmark?: boolean
  /** Hide the wordmark below 480px (keeps the header tidy on small phones). */
  compactWordmark?: boolean
  title?: string
}

export default function Logo({
  className,
  size = 28,
  minSize,
  showWordmark = true,
  compactWordmark = false,
  title = 'Archic',
}: LogoProps) {
  const min = minSize ?? Math.round(size * 0.8)

  return (
    <span
      className={`ar-logo ${compactWordmark ? 'ar-logo-compact' : ''} ${className ?? ''}`}
      aria-label={title}
      role="img"
      style={
        {
          '--logo-min': `${min}px`,
          '--logo-max': `${size}px`,
        } as React.CSSProperties
      }
    >
      <svg
        className="ar-logo-mark"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        focusable="false"
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
