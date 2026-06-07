## Objetivo

Separar la marca **Archic** (visión, manifesto, ecosistema) de la zona de producto **Midas**, manteniendo todo en el mismo proyecto con React Router.

## Estructura de rutas

```text
/           → Home Archic (nueva)
/midas      → Sitio actual tal cual (Hero, Benchmarks, ArchTable, Whitepaper, SDK, ExtendedDocs)
*           → NotFound
```

Navegación compartida: el `Header` mostrará "Archic" (link a `/`) y "Midas" (link a `/midas`), más los anchors internos cuando estemos en `/midas`.

## Cambios

1. **Router**
   - Añadir `react-router-dom` (ya está en deps si no, instalar).
   - `src/main.tsx`: envolver `<App />` en `<BrowserRouter>`.
   - `src/App.tsx`: sustituir el render actual por `<Routes>` con `/` → `<ArchicHome />`, `/midas` → `<MidasPage />`, `*` → `<NotFound />`. `MidasBackground`, `Header` y `Footer` quedan dentro del shell común.

2. **Mover sitio actual a Midas**
   - Crear `src/pages/MidasPage.tsx` que renderiza exactamente lo que hoy hay en `App.tsx` (Hero, Benchmarks, ArchTable, Whitepaper, SdkSection, ExtendedDocs). Sin tocar esos componentes.

3. **Nueva home Archic** (`src/pages/ArchicHome.tsx`)
   Contenido centrado en **qué es Archic, por qué se creó y la visión**:
   - **Hero Archic**: titular sobre la visión (memoria, control y ejecución como capas auditables para agentes), subtítulo, CTA a `/midas` ("Ver Midas, el primer producto") y a GitHub.
   - **Por qué existe Archic**: 2–3 párrafos editoriales con la razón de creación (problema de agentes sin memoria duradera, falta de evaluación honesta, ecosistemas cerrados).
   - **Visión / North-star**: las capas del ecosistema (Midas, Origin, Apollo, Atlas, Nexus, Forge) reutilizando `LAYERS` de `src/data/ecosystem.ts`, con badges de estado (Active / Parked).
   - **Estado actual**: Midas es la punta de lanza activa; lo demás está parked. CTA final a `/midas`.
   - Reutiliza tokens y componentes existentes (`heading-serif`, `editorial-panel`, `StatusBadge`) — sin tocar tipografía, logo ni paleta.

4. **Header**
   - Adaptar `NAV_LINKS` para que dependa de la ruta: en `/` muestra links a secciones de Archic; en `/midas` mantiene los actuales (Midas, Benchmarks, Architecture, SDK).
   - Añadir siempre los dos enlaces raíz: "Archic" (`/`) y "Midas" (`/midas`).

5. **SEO**
   - `index.html`: el head actual está enfocado a Midas. Cambiarlo a sitewide Archic (title/description sobre Archic; quitar canonical fijo `/`).
   - Añadir `react-helmet-async` + `HelmetProvider` en `main.tsx`.
   - `ArchicHome`: `<Helmet>` con title/desc/canonical `/` y JSON-LD `Organization`.
   - `MidasPage`: `<Helmet>` con title/desc/canonical `/midas` y JSON-LD `SoftwareApplication` (el que hoy está en `index.html`).
   - Actualizar `public/sitemap.xml` con `/` y `/midas`.

6. **No tocar**
   - Logo, tipografías, paleta, `index.css`, `tailwind.config.js`, ni los componentes Midas existentes.

## Archivos

- Nuevos: `src/pages/ArchicHome.tsx`, `src/pages/MidasPage.tsx`, `src/pages/NotFound.tsx`.
- Editados: `src/App.tsx`, `src/main.tsx`, `src/components/Header.tsx`, `src/constants.ts` (NAV por ruta), `index.html`, `public/sitemap.xml`, `package.json` (deps).

¿Lo implemento así?
