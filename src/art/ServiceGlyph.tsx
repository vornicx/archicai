/**
 * Glifos de servicio: el mismo arco de marca, resuelto tres veces.
 *
 * Son decorativos (`aria-hidden`): el significado ya está en el `<h3>` que
 * acompañan, así que repetirlo en un `<title>` solo añadiría ruido al lector de
 * pantalla.
 */
import { archPath, STROKE } from './primitives'

const VIEWBOX = 96

type GlyphProps = { className?: string }

function Shell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      className={`ar-glyph ${className ?? ''}`}
      viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

/** Páginas web: el arco es la ventana del navegador. */
export function GlyphWeb({ className }: GlyphProps) {
  return (
    <Shell className={className}>
      <path d={archPath(14, 12, 68, 72)} stroke="currentColor" strokeWidth={STROKE} />
      {/* Barra de navegador dentro del arco */}
      <path d="M18 40 H78" stroke="currentColor" strokeWidth={STROKE} opacity="0.5" />
      <circle cx="26" cy="32" r="2.2" fill="currentColor" opacity="0.55" />
      <circle cx="34" cy="32" r="2.2" fill="currentColor" opacity="0.35" />
      <circle cx="42" cy="32" r="2.2" fill="currentColor" opacity="0.2" />
      {/* Contenido: un titular y dos líneas de texto */}
      <rect x="24" y="50" width="34" height="4" rx="2" fill="currentColor" opacity="0.75" />
      <rect x="24" y="60" width="48" height="2.5" rx="1.25" fill="currentColor" opacity="0.35" />
      <rect x="24" y="68" width="38" height="2.5" rx="1.25" fill="currentColor" opacity="0.35" />
    </Shell>
  )
}

/** Mantenimiento: el arco sostenido, con el ciclo de revisión alrededor. */
export function GlyphMaintenance({ className }: GlyphProps) {
  return (
    <Shell className={className}>
      <path d={archPath(26, 24, 44, 60)} stroke="currentColor" strokeWidth={STROKE} />
      {/* Ciclo: arco abierto con punta de flecha, no un círculo cerrado */}
      <path
        d="M14 56 A34 34 0 0 1 82 56"
        stroke="currentColor"
        strokeWidth={STROKE}
        opacity="0.55"
        strokeLinecap="round"
      />
      <path d="M76 48 L82 56 L74 59" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
      {/* Marca de verificación: la revisión que pasa */}
      <path
        d="M39 58 L45 64 L58 48"
        stroke="currentColor"
        strokeWidth={STROKE * 1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Shell>
  )
}

/** Software a medida: el arco construido por piezas que encajan. */
export function GlyphSoftware({ className }: GlyphProps) {
  return (
    <Shell className={className}>
      <path d={archPath(14, 12, 68, 72)} stroke="currentColor" strokeWidth={STROKE} opacity="0.4" />
      {/* Dovelas: las piezas que forman el arco, dibujadas como módulos */}
      <rect x="22" y="52" width="24" height="14" rx="2" stroke="currentColor" strokeWidth={STROKE} />
      <rect x="50" y="52" width="24" height="14" rx="2" stroke="currentColor" strokeWidth={STROKE} />
      <rect x="36" y="70" width="24" height="14" rx="2" stroke="currentColor" strokeWidth={STROKE} />
      {/* Conectores entre módulos */}
      <path d="M46 59 H50" stroke="currentColor" strokeWidth={STROKE} />
      <path d="M34 66 V70 H36" stroke="currentColor" strokeWidth={STROKE} opacity="0.6" />
      <path d="M62 66 V70 H60" stroke="currentColor" strokeWidth={STROKE} opacity="0.6" />
      {/* Clave del arco */}
      <path d="M48 24 L56 38 H40 Z" stroke="currentColor" strokeWidth={STROKE} strokeLinejoin="round" />
    </Shell>
  )
}

/** Registro por id de servicio, para que la home no tenga que ramificar. */
export const SERVICE_GLYPHS: Record<string, (props: GlyphProps) => React.ReactElement> = {
  web: GlyphWeb,
  mantenimiento: GlyphMaintenance,
  software: GlyphSoftware,
}
