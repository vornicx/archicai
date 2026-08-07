# Checklist antes de publicar comercialmente

Este documento recoge lo único que la web **no puede resolver desde el código**:
datos que solo existen fuera del repositorio y acciones que hay que hacer en
plataformas de terceros.

Mientras quede algo del bloque 1 sin rellenar, las páginas legales muestran un
marcador visible de «pendiente» en lugar de inventarse el dato — nada falso se
publica — pero **el sitio no cumple el artículo 10 de la LSSI-CE** si además se
están ofreciendo servicios a cambio de precio.

---

## 1. Identificación legal — bloqueante

Todo esto vive en [`src/legal/company.ts`](../src/legal/company.ts).

| Campo | Qué poner | Estado |
| --- | --- | --- |
| `legalName` | Autónomo: nombre y apellidos completos tal y como figuran en el DNI. Sociedad: denominación social con su forma jurídica (p. ej. `Archic Software, S.L.`). | ⬜ pendiente |
| `taxId` | NIF (autónomo) o CIF/NIF (sociedad). | ⬜ pendiente |
| `address` | Domicilio fiscal o social completo: calle, número, código postal, municipio y provincia. | ⬜ pendiente |
| `phone` | Teléfono de contacto. No es obligatorio si el correo es un canal realmente efectivo, pero la AEPD y las autoridades de consumo esperan un segundo canal directo. Si se decide publicar solo correo, dejarlo en `null` y anotar aquí la decisión. | ⬜ pendiente |
| `registry` | Sociedad: registro mercantil, tomo, folio, hoja y número de inscripción. **Autónomo: poner `false`**, no `null` — así el aviso legal omite la sección en lugar de marcarla como incompleta. | ⬜ pendiente |
| `lastUpdated` | Fecha en la que se revisaron los textos legales por última vez (ISO). | actualizar al rellenar |

> Situación declarada a 7 de agosto de 2026: todavía no hay alta como autónomo
> ni sociedad constituida. Hasta que la haya, la web puede seguir publicada como
> presentación, pero conviene no cerrar contratos ni facturar a través de ella.

Al rellenar `registry` como `false` (autónomo), revisar también que el aviso
legal no mencione «sociedad» en ningún punto.

## 2. Datos locales — condicionan el posicionamiento en Écija y Sevilla

En [`src/seo/localBusiness.ts`](../src/seo/localBusiness.ts):

- `streetAddress` — solo rellenar **si la ficha de Google Business Profile va a
  mostrar dirección exacta**. Si se trabaja sin oficina abierta al público, se
  deja en `null` y se configura la ficha como «área de servicio».
- `telephone` — debe coincidir **carácter a carácter** con el de la ficha de GBP.
- `googleBusinessProfile` — URL de la ficha una vez verificada; se emite como
  `sameAs` y ayuda a que Google case la web con la ficha.

La coherencia NAP (nombre, dirección, teléfono) entre web, GBP y directorios es
una de las señales que más pesa en el paquete local. Un teléfono escrito de dos
formas distintas cuenta como dos negocios distintos.

## 3. Google Search Console

1. La propiedad ya está verificada por etiqueta HTML (el `meta` de verificación
   se inyecta desde `scripts/generate-static-pages.ts`; no borrarlo).
2. Enviar `https://archic.es/sitemap.xml` en **Sitemaps**.
3. Usar **Inspección de URL → Solicitar indexación** en la portada y en cada
   landing. Es la vía más rápida para que entren páginas nuevas.
4. Revisar a las dos semanas: *Cobertura* (que no haya «Detectada, actualmente
   sin indexar») y *Mejoras → Resultados enriquecidos* (FAQ, LocalBusiness,
   Breadcrumb).

## 4. Google Business Profile — lo que de verdad decide la primera página local

Sin ficha verificada no se aparece en el paquete de mapas, que es lo que ocupa
las primeras posiciones en búsquedas como «diseño web Écija». Es gratis y es la
acción con mayor retorno de toda esta lista.

- Categoría principal: **Diseñador de sitios web**. Secundarias: *Servicio de
  informática*, *Consultor de software*.
- Área de servicio: Écija, Sevilla, Carmona, Osuna, Marchena, Utrera, Dos
  Hermanas, Palma del Río.
- Descripción: reutilizar el párrafo de `answer` en `src/i18n/content.ts`.
- Subir fotos reales (espacio de trabajo, capturas de proyectos) y publicar una
  novedad al mes.
- Pedir reseñas a los primeros clientes. Es el factor con más peso del paquete
  local y no se puede sustituir con nada del código.

## 5. Bing Webmaster Tools

Importa la propiedad directamente desde Search Console. Bing alimenta a
ChatGPT y a Copilot, así que también cuenta para la visibilidad en asistentes.

## 6. Si algún día se añade analítica o cualquier recurso externo

Ahora mismo el sitio no instala cookies ni hace peticiones a terceros, y las
políticas lo afirman explícitamente. En cuanto se añada Google Analytics, un
mapa incrustado, un vídeo de YouTube, un chat o tipografías desde un CDN:

1. Hay que **bloquear la carga hasta que exista consentimiento** previo,
   granular y revocable (art. 22.2 LSSI-CE).
2. Hay que añadir el banner y un panel de gestión de preferencias.
3. Hay que actualizar la política de cookies (sección 2 y 3) y la de privacidad
   (destinatarios y transferencias internacionales).
4. Hay que añadir el proveedor a `PROCESSORS` en `src/legal/company.ts`.

El texto actual afirma que no hay cookies. Dejarlo sin tocar mientras se carga
un script de terceros convierte una política correcta en una declaración falsa.

## 7. Rastreadores de IA

`public/robots.txt` permite explícitamente a GPTBot, ClaudeBot, PerplexityBot,
Google-Extended y compañía. Es una decisión deliberada: es la condición para que
estos asistentes puedan citar a Archic. Si algún día se quiere revertir, cambiar
`Allow: /` por `Disallow: /` en el bloque correspondiente.

## 8. Antes de decir que hay clientes

La sección de proyectos está etiquetada como «ejemplo conceptual» en el HTML y
en los datos estructurados. En cuanto haya un caso real:

- Sustituir el ejemplo por el caso, con resultado medible si lo hay.
- Quitar la etiqueta de «ejemplo conceptual» **solo** de ese elemento.
- Pedir permiso por escrito al cliente antes de usar su nombre o su logotipo.
