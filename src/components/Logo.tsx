type LogoProps = {
  className?: string
  showWordmark?: boolean
  title?: string
}

/**
 * Archic mark — "Keystone".
 *
 * A monolithic arch (flat base, semicircular crown) with a circular
 * aperture punched through its center. The arch references the project's
 * name and its architectural premise — load-bearing structure built from
 * first principles. The aperture is the agent: a single point of focus
 * inside the structure.
 *
 * Designed to read as one bold silhouette at favicon scale, in the
 * lineage of Anthropic's asterisk, OpenAI's knot, or Mistral's mark —
 * a single memorable shape, not a decorated illustration.
 */
function Logo({ className, showWordmark = true, title = 'Archic' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ''}`} aria-label={title}>
      <svg
        viewBox="0 0 32 32"
        width="22"
        height="22"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 28 L4 16 A12 12 0 0 1 28 16 L28 28 L20 28 L20 18 A4 4 0 0 0 12 18 L12 28 Z"
        />
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
