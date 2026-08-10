type LogoProps = {
  className?: string
  /** Max lockup/mark height in px (desktop). Scales down on small screens. */
  size?: number
  /** Min height in px (mobile). */
  minSize?: number
  showWordmark?: boolean
  /** Hide the wordmark below 480px (keeps the header tidy on small phones). */
  compactWordmark?: boolean
  /** Use the light (white) variant, for dark backgrounds. */
  light?: boolean
  title?: string
}

/**
 * Marca oficial de Archic. Sólo se permiten los SVG canónicos de
 * `public/brand`: monograma y lockup, en variante dark (tinta) o light (blanco).
 */
export default function Logo({
  className,
  size = 28,
  minSize,
  showWordmark = true,
  compactWordmark = false,
  light = false,
  title = 'Archic',
}: LogoProps) {
  const min = minSize ?? Math.round(size * 0.8)
  const variant = light ? 'light' : 'dark'

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
          src={`/brand/archic-lockup-${variant}.svg`}
          alt=""
          width={981}
          height={174}
          aria-hidden="true"
        />
      )}
      {(!showWordmark || compactWordmark) && (
        <img
          className="ar-logo-mark"
          src={`/brand/archic-mark-${variant}.svg`}
          alt=""
          width={459}
          height={412}
          aria-hidden="true"
        />
      )}
    </span>
  )
}
