## Objetivo

Reorganizar la presencia web de Archic en **tres sitios separados**, cada uno en su propio repo y subdominio, con `archic.es` como sitio madre de marca + hub de productos.

```text
archic.es           → Marca, manifiesto, hub de productos (este repo, adelgazado)
midas.archic.es     → Sitio de Midas (nuevo repo, contenido movido desde aquí)
apollo.archic.es    → Sitio de Apollo (nuevo repo, ya planificado)
```

Cada subdominio es un proyecto Lovable independiente con su propio deploy, analytics y diseño. Compartimos identidad por convención visual, no por código.

---

## Reparto de contenido

### `archic.es` (este repo, `archicai`) — adelgazar
Queda como **manifiesto + hub**. Una sola página larga, editorial:
- Hero Archic (visión, memoria/control/ejecución como capas auditables).
- Por qué existe Archic (2–3 párrafos editoriales).
- **Products hub**: cards a Midas, Apollo, Eval, Origin/Atlas (con StatusBadge: Active / North-star). Cada card enlaza al subdominio o al repo.
- Visión / capas del ecosistema (reutiliza `LAYERS` de `src/data/ecosystem.ts`).
- Footer con enlaces a todos los subdominios + GitHub org.

**Se elimina** de este repo:
- `/midas` y todos sus componentes (`Hero`, `Benchmarks`, `ArchTable`, `Whitepaper`, `SdkSection`, `ExtendedDocs`, `BenchmarkBars`).
- `/docs/comparisons` y `/docs/comparisons/:slug` (las comparisons son **de Midas**, se mueven a midas.archic.es).
- Datos asociados: `src/data/comparisons.ts`.
- Logo de Apollo (`src/assets/apollo-logo.svg`) ya no es necesario aquí.
- Link "Midas", "Apollo", "Compare" del header → se simplifica a un header de marca (un solo nivel).

### `midas.archic.es` (repo nuevo `midas-web`)
Proyecto Lovable nuevo. Contenido:
- Hero Midas, Benchmarks, ArchTable, Whitepaper, SdkSection, ExtendedDocs.
- `/docs/comparisons` y `/docs/comparisons/:slug` con todo el contenido actual de `src/data/comparisons.ts`.
- Header propio: logo Midas + nav (Benchmarks, Architecture, SDK, Compare) + link "← Archic" al sitio madre.
- Mantiene la línea visual actual (oro sobre negro, serif editorial). Se puede pulir más, pero no es objetivo de este plan.

### `apollo.archic.es` (repo nuevo `apollo-web`)
Ya planificado en mensajes anteriores. Diseño terminal/CLI (cian-verde sobre negro). Fuera del alcance de los cambios en **este** repo.

---

## Cambios concretos en `archicai` (este repo)

### Rutas y router
- `src/App.tsx`: dejar **solo** `/` → `<ArchicHome />` y `*` → `<NotFound />`. Eliminar `/midas`, `/docs/comparisons`, `/docs/comparisons/:slug`.
- Quitar `MidasBackground` del shell si solo se usaba en Midas; o mantenerlo si encaja con la home de marca (decidir al implementar mirando el render).

### `ArchicHome.tsx` — rediseñar como manifiesto + hub
Secciones:
1. Hero Archic (texto editorial, sin CTAs a Midas internos — los CTAs llevan a subdominios externos).
2. **Why Archic** (manifesto corto).
3. **Products** — grid de cards:
   - **Midas** (Active) → `https://midas.archic.es`
   - **Apollo** (Active) → `https://apollo.archic.es`
   - **Eval** (Active, vive dentro de Midas repo) → enlace a GitHub
   - **Origin / Atlas** (North-star) → enlace a repo
   - **Nexus / Forge** (Planned) → solo descripción
4. **Vision / Layers** — reutilizar `LAYERS` con `StatusBadge`.
5. CTA final + GitHub org.

### Header — simplificar
- Quitar nav de rutas (`Archic`, `Midas`, `Apollo`, `Compare`).
- Dejar logo + anchors internos del manifiesto (`Why`, `Products`, `Vision`) + un único botón externo "GitHub".
- Eliminar dropdown de comparisons y drawer mobile complejo.

### Componentes a borrar
- `Hero.tsx`, `Benchmarks.tsx`, `BenchmarkBars.tsx`, `ArchTable.tsx`, `Whitepaper.tsx`, `SdkSection.tsx`, `ExtendedDocs.tsx`.
- `pages/MidasPage.tsx`, `pages/ComparisonsIndex.tsx`, `pages/ComparisonPage.tsx`.
- `data/comparisons.ts`.
- `assets/apollo-logo.svg`.
- Cualquier import huérfano resultante (verificar con build).

### Componentes a conservar
- `Logo`, `Footer`, `MidasBackground` (renombrar mentalmente como fondo de marca), `StatusBadge`, `Manifesto`, `Pillars`, `Principles`, `Ecosystem`, `Composition`, `Cycle`, `Resources`, `Builders`, `ClosingCTA`, `DocsSection`, `StackOverview`. Revisar cuáles usa realmente `ArchicHome` y eliminar el resto.

### SEO
- `index.html`: title/description de marca pura ("Archic — Memory, control and execution for agentic systems").
- `ArchicHome` Helmet: canonical `https://archic.es/`, JSON-LD `Organization` con `sameAs` apuntando a los subdominios.
- `public/sitemap.xml`: dejar solo `/`. Quitar `/midas` y `/docs/...`.
- `public/robots.txt`: sin cambios salvo apuntar al sitemap nuevo.

### CNAME / deploy
- `public/CNAME` sigue siendo `archic.es`. Sin cambios en `.github/workflows/deploy.yml`.

### Memoria del proyecto
- Crear `mem://index.md` con regla core: "archic.es es solo marca + hub. Midas vive en midas.archic.es (repo aparte). Apollo en apollo.archic.es (repo aparte). No re-añadir páginas de producto aquí."

---

## Lo que NO hace este plan

- **No crea** los proyectos `midas-web` ni `apollo-web` — son proyectos Lovable independientes. Para cada uno te paso un prompt de arranque cuando estés listo (como hicimos con Apollo).
- **No migra** la conexión del subdominio `midas.archic.es` — eso se hace en Project Settings → Domains del nuevo proyecto Midas una vez creado y publicado.
- **No toca** tipografía, paleta ni `index.css` del sitio actual más allá de lo necesario para que la home reducida se vea coherente.

---

## Orden de ejecución sugerido (cuando pases a build)

1. Crear primero el proyecto nuevo `midas-web` y verificar que `midas.archic.es` resuelve (te paso prompt aparte).
2. Una vez Midas vive en su subdominio, ejecutar este plan: vaciar `archicai` y dejarlo como hub.
3. Apollo en paralelo, independiente.

¿Implemento el paso 2 (adelgazar este repo a marca + hub) o prefieres que primero te dé el prompt de arranque para `midas-web` y migrar Midas antes de borrar nada de aquí?
