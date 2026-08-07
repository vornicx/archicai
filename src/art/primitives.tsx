/**
 * Primitivas del sistema gráfico de Archic.
 *
 * Todo el imaginario del sitio es vectorial y propio: no hay fotos de stock ni
 * peticiones a terceros, así que no hay licencias que respetar ni recursos que
 * bloqueen el renderizado. El motivo común es el arco de medio punto de la
 * fotografía de portada — la misma figura que da nombre a la marca.
 *
 * Los colores se toman de las variables CSS (`--blue`, `--gold`…), de modo que
 * un mismo dibujo funciona sobre papel y sobre el azul profundo de Labs sin
 * duplicar código.
 */

/** Ancho de trazo base. Fino y constante: el dibujo debe leerse como plano. */
export const STROKE = 1.25

/**
 * Camino de un arco de medio punto: rectángulo rematado por un semicírculo.
 * El radio es siempre la mitad del ancho, que es lo que hace que la figura se
 * lea como arco y no como rectángulo redondeado.
 */
export function archPath(x: number, y: number, w: number, h: number): string {
  const r = w / 2
  return `M ${x} ${y + h} L ${x} ${y + r} A ${r} ${r} 0 0 1 ${x + w} ${y + r} L ${x + w} ${y + h} Z`
}

/**
 * Grano de papel. Un único `feTurbulence` reutilizado por referencia de id, en
 * lugar de un PNG de textura: pesa ~0 y escala a cualquier densidad de pantalla.
 */
export function GrainDefs({ id = 'ar-grain' }: { id?: string }) {
  return (
    <filter id={id} x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.5" />
      </feComponentTransfer>
    </filter>
  )
}

/**
 * Capa de grano a pantalla completa para las secciones de papel. Decorativa y
 * sin coste de interacción: `pointer-events: none` va en el CSS.
 */
export function GrainOverlay({ className = '' }: { className?: string }) {
  return (
    <svg className={`ar-grain ${className}`} aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <defs>
        <GrainDefs id="ar-grain-filter" />
      </defs>
      <rect width="100%" height="100%" filter="url(#ar-grain-filter)" />
    </svg>
  )
}

/**
 * Retícula de arcos usada como fondo de sección. Se dibuja en trazo muy suave;
 * su función es dar profundidad al papel, no competir con el texto.
 */
export function ArchLattice({
  columns = 6,
  className = '',
}: {
  columns?: number
  className?: string
}) {
  const unit = 100 / columns
  return (
    <svg
      className={`ar-lattice ${className}`}
      viewBox={`0 0 ${columns * 40} 120`}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      {Array.from({ length: columns }, (_, i) => (
        <path
          key={i}
          d={archPath(i * 40 + 4, 20, 32, 100)}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          opacity={0.5 - Math.abs(i - (columns - 1) / 2) * (0.35 / columns)}
        />
      ))}
      <line x1="0" y1="119" x2={columns * 40} y2="119" stroke="currentColor" strokeWidth={STROKE} opacity="0.35" />
      {/* `unit` queda documentado para quien ajuste la densidad de la retícula */}
      <desc>{`Retícula de ${columns} arcos, ${unit.toFixed(1)}% de ancho cada uno`}</desc>
    </svg>
  )
}

/**
 * Filete de arcos para separar secciones. Sustituye a la línea horizontal seca
 * y repite el motivo de marca a escala pequeña.
 */
export function ArchRule({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`ar-arch-rule ${className}`}
      viewBox="0 0 240 14"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <line x1="0" y1="13" x2="96" y2="13" stroke="currentColor" strokeWidth={STROKE} opacity="0.35" />
      <path d={archPath(104, 1, 32, 12)} fill="none" stroke="currentColor" strokeWidth={STROKE} />
      <line x1="144" y1="13" x2="240" y2="13" stroke="currentColor" strokeWidth={STROKE} opacity="0.35" />
    </svg>
  )
}
