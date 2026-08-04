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
      {showWordmark && (
        <img
          className="ar-logo-full"
          src="/archic-logo.png"
          alt=""
          width={640}
          height={154}
          aria-hidden="true"
        />
      )}
      {(!showWordmark || compactWordmark) && (
        <img
          className="ar-logo-mark"
          src="/archic-mark.png"
          alt=""
          width={192}
          height={189}
          aria-hidden="true"
        />
      )}
    </span>
  )
}
