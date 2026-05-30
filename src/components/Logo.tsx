type LogoProps = {
  className?: string
  showWordmark?: boolean
  title?: string
}

/**
 * Archic logo — three nested arcs representing the layered stack
 * (Atlas → Origin → Apollo), anchored by a focal node representing
 * the agent acting from first principles.
 *
 * Pure monochrome, uses currentColor so it inherits text color.
 */
function Logo({ className, showWordmark = true, title = 'Archic' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ''}`} aria-label={title}>
      <svg
        viewBox="0 0 32 32"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        {/* outermost arc — execution layer (Apollo) */}
        <path d="M3 22 A 13 13 0 0 1 29 22" />
        {/* middle arc — governance layer (Origin) */}
        <path d="M7.5 22 A 8.5 8.5 0 0 1 24.5 22" />
        {/* inner arc — memory layer (Atlas) */}
        <path d="M12 22 A 4 4 0 0 1 20 22" />
        {/* baseline */}
        <line x1="2" y1="22" x2="30" y2="22" />
        {/* focal node — the agent */}
        <circle cx="16" cy="22" r="1.6" fill="currentColor" stroke="none" />
      </svg>
      {showWordmark && (
        <span className="font-display text-[17px] font-medium tracking-[-0.02em] leading-none">
          Archic
        </span>
      )}
    </span>
  )
}

export default Logo
