type LogoProps = {
  className?: string
  showWordmark?: boolean
  title?: string
}

/**
 * Archic mark — "Horizon".
 *
 * Three nested arcs read as layered memory across a long horizon
 * (the wedge: agentic memory for long-horizon agents). A single
 * filled node sits off-center on the outer arc — a retrieved memory,
 * pulled from depth. The deliberate asymmetry is the signature:
 * it's not a generic concentric mark, it's recall happening.
 *
 * Pure monochrome, uses currentColor.
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
        {/* horizon line */}
        <line x1="2" y1="22" x2="30" y2="22" />
        {/* outer arc — long horizon */}
        <path d="M3 22 A 13 13 0 0 1 29 22" />
        {/* middle arc */}
        <path d="M7.5 22 A 8.5 8.5 0 0 1 24.5 22" />
        {/* inner arc — the agent's working context */}
        <path d="M12 22 A 4 4 0 0 1 20 22" />
        {/* retrieved memory — off-center on the outer arc (≈ 145°) */}
        <circle cx="5.35" cy="14.55" r="1.7" fill="currentColor" stroke="none" />
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
