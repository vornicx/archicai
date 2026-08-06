/**
 * Lámina de proyecto: la geometría de la marca Archic trazada como un plano de
 * arquitecto que se dibuja solo al cargar.
 *
 * Es la pieza que sostiene el hero. Al no publicar todavía casos de clientes,
 * la propia web es la muestra de trabajo, y este dibujo es su gesto central:
 * el vértice del logotipo —dos trazos que bajan desde un punto y una barra
 * dorada— desarrollado con líneas de cota, ejes y circunferencias de replanteo.
 *
 * Todo es SVG y CSS: sin librerías, sin lienzo, sin peticiones. Se anima con
 * stroke-dashoffset, que el navegador compone en GPU, y se desactiva por
 * completo con prefers-reduced-motion.
 */

type Props = {
  /** Retrasa el inicio del trazado, para encadenarlo con la entrada del hero. */
  delay?: number
  className?: string
}

/* Cada trazo declara cuándo entra, como fracción del trazado completo. Se
   dibuja de fuera hacia dentro: primero la lámina y los ejes, luego la
   estructura, y la barra dorada al final como remate.

   Las longitudes no se calculan a mano: cada `path` lleva `pathLength="1"`,
   que normaliza su longitud real a la unidad, así el dasharray funciona igual
   para una recta, un arco o un rectángulo cerrado. */
const STROKES: { d: string; at: number; gold?: boolean; thin?: boolean }[] = [
  // marco de la lámina
  { d: 'M16 16 H184 V184 H16 Z', at: 0, thin: true },
  // ejes de replanteo
  { d: 'M100 26 V174', at: 0.1, thin: true },
  { d: 'M26 100 H174', at: 0.14, thin: true },
  // circunferencia de replanteo, en dos mitades para que cierre siempre
  { d: 'M100 36 A64 64 0 0 1 100 164', at: 0.2, thin: true },
  { d: 'M100 36 A64 64 0 0 0 100 164', at: 0.2, thin: true },
  // el vértice de la marca, a escala
  { d: 'M100 52 L154 148', at: 0.42 },
  { d: 'M100 52 L46 148', at: 0.42 },
  // línea de cota inferior con sus remates
  { d: 'M46 162 H154', at: 0.68, thin: true },
  { d: 'M46 157 V167', at: 0.68, thin: true },
  { d: 'M154 157 V167', at: 0.68, thin: true },
  // la barra dorada del logotipo: el último trazo
  { d: 'M68 118 H132', at: 0.82, gold: true },
]

export default function BlueprintMark({ delay = 0, className }: Props) {
  return (
    <svg
      className={`ar-bp ${className ?? ''}`}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {STROKES.map((s) => (
        <path
          key={s.d}
          d={s.d}
          pathLength={1}
          className={`ar-bp-stroke${s.gold ? ' is-gold' : ''}${s.thin ? ' is-thin' : ''}`}
          style={{ '--at': `${delay + s.at * 1500}ms` } as React.CSSProperties}
        />
      ))}
    </svg>
  )
}
