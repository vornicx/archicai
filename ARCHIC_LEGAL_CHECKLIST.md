# Archic — Checklist legal de entrega

**Estado:** obligatorio para todos los proyectos antes de producción  
**Última revisión:** 11 de agosto de 2026  
**Responsable:** Archic  

> Este checklist es un control operativo de entrega. No sustituye asesoramiento jurídico especializado. Si la clasificación de un servicio, el tratamiento de datos o una obligación sectorial no está clara, el estado debe ser **REVISAR** y no se aprueba producción hasta resolverlo.

## Regla de uso

Cada proyecto debe tener una copia de este checklist cumplimentada.

Estados permitidos:

- **OK** — comprobado y resuelto.
- **NO APLICA** — comprobado, con motivo documentado.
- **REVISAR** — existe duda, falta información o requiere validación jurídica/técnica.

**No se entrega a producción con ningún punto obligatorio en REVISAR.**

---

## 0. Ficha de control

- Proyecto:
- Cliente / titular del servicio:
- Dominio:
- País(es) objetivo:
- Fecha de revisión:
- Revisado por:
- Tipo de servicio: corporativa / reservas / e-commerce / plataforma / SaaS / marketplace / otro
- ¿Permite cuentas de usuario?:
- ¿Permite contenido, anuncios, productos, opiniones, archivos o publicaciones de terceros?:
- ¿Permite contratar con terceros a través de la plataforma?:
- ¿Está dirigido o es accesible de forma relevante a menores?:
- Resultado global: **OK / REVISAR**

---

# 1. Identificación del prestador y LSSI

| Control | Estado | Evidencia / notas |
|---|---|---|
| Titular legal correctamente identificado |  |  |
| NIF/CIF u otros datos societarios necesarios |  |  |
| Domicilio y medios de contacto reales |  |  |
| Email de contacto operativo |  |  |
| Datos registrales cuando correspondan |  |  |
| Aviso legal accesible desde todas las páginas |  |  |
| Condiciones de contratación cuando exista contratación online |  |  |
| Información previa a la contratación clara y accesible |  |  |
| Precios, impuestos, gastos y condiciones mostrados correctamente cuando proceda |  |  |

---

# 2. RGPD y protección de datos

| Control | Estado | Evidencia / notas |
|---|---|---|
| Responsable del tratamiento identificado |  |  |
| Finalidades de cada tratamiento documentadas |  |  |
| Base jurídica identificada para cada finalidad |  |  |
| Política de privacidad adaptada al proyecto real |  |  |
| Formularios incluyen información de privacidad adecuada |  |  |
| Solo se solicitan datos necesarios (minimización) |  |  |
| Plazos de conservación definidos |  |  |
| Derechos de los interesados y canal para ejercerlos |  |  |
| Encargados del tratamiento identificados |  |  |
| Contratos/DPA con proveedores cuando correspondan |  |  |
| Transferencias internacionales revisadas |  |  |
| Logs y datos técnicos contemplados |  |  |
| Datos sensibles/especiales revisados expresamente |  |  |
| Menores: edad, consentimiento y tratamiento revisados si aplica |  |  |
| Medidas técnicas y organizativas razonables implantadas |  |  |
| Procedimiento de brechas/incidentes definido para sistemas que gestionen datos personales |  |  |

---

# 3. Cookies, tracking y comunicaciones

| Control | Estado | Evidencia / notas |
|---|---|---|
| Inventario real de cookies/SDKs/scripts realizado |  |  |
| Cookies no necesarias bloqueadas antes del consentimiento cuando corresponda |  |  |
| Banner permite aceptar y rechazar con claridad equivalente |  |  |
| Gestión/revocación del consentimiento disponible |  |  |
| Política de cookies coincide con lo que realmente carga la web |  |  |
| Analytics revisado |  |  |
| Pixels publicitarios / remarketing revisados |  |  |
| Consentimiento y prueba de consentimiento cuando proceda |  |  |
| Email/SMS/WhatsApp comercial: base legal y mecanismo de baja revisados |  |  |

---

# 4. Consumidores, contratación y e-commerce

Marcar **NO APLICA** de forma motivada si el proyecto no vende ni permite contratar a consumidores.

| Control | Estado | Evidencia / notas |
|---|---|---|
| Identidad del vendedor/prestador visible antes de contratar |  |  |
| Características esenciales del producto/servicio claras |  |  |
| Precio total e impuestos claros |  |  |
| Gastos adicionales informados antes de pagar |  |  |
| Condiciones de pago y ejecución/entrega |  |  |
| Política de cancelación/desistimiento cuando corresponda |  |  |
| Reembolsos y devoluciones cuando correspondan |  |  |
| Garantías legales cuando correspondan |  |  |
| Confirmación de la contratación en soporte duradero cuando proceda |  |  |
| Botón final de compra/reserva deja clara la obligación de pago cuando exista |  |  |
| No existen dark patterns ni decisiones de interfaz engañosas |  |  |

---

# 5. DSA — Digital Services Act / Reglamento (UE) 2022/2065

## 5.1 DSA Gate — revisión OBLIGATORIA en todos los proyectos

**Nunca marcar el DSA como NO APLICA sin completar primero esta clasificación.**

### A. ¿El servicio actúa como intermediario?

Comprobar si el producto presta alguno de estos servicios respecto de información proporcionada por usuarios/terceros:

- transmisión de información (*mere conduit*),
- almacenamiento temporal automático (*caching*),
- almacenamiento de información proporcionada por un usuario a petición de este (*hosting*).

**Si NO:** DSA = **NO APLICA**, documentar por qué.  
Ejemplo habitual: web corporativa que solo publica contenido del propio negocio y recibe formularios/reservas para ese mismo negocio, sin alojar ni difundir públicamente información de terceros como función del servicio.

**Si SÍ:** continuar.

### B. ¿Es un servicio de hosting?

Preguntas prácticas:

- ¿usuarios o terceros suben contenido, archivos, productos, anuncios, opiniones, perfiles o información?
- ¿esa información se almacena a petición de esos usuarios/terceros?

Si sí, clasificar como posible **hosting** y revisar las obligaciones aplicables a esta categoría.

### C. ¿Es además una plataforma online?

Preguntar:

- ¿el servicio almacena información de usuarios/terceros y además la difunde al público a petición de esos usuarios?
- ¿esa difusión es una función sustancial y no meramente menor/auxiliar?

Si sí, clasificar como posible **plataforma online**.

Ejemplos que activan revisión reforzada:

- marketplace,
- portal de anuncios/listados de terceros,
- red/comunidad social,
- plataforma de reseñas o publicaciones de usuarios,
- app store,
- plataforma de contenido compartido,
- plataforma de viajes/alojamiento que intermedia entre terceros,
- sistema donde distintos comerciantes ofrecen bienes/servicios a consumidores.

### D. ¿Permite contratos a distancia entre consumidores y comerciantes terceros?

Si sí, activar además el bloque **Marketplace / trazabilidad de comerciantes**.

### E. Tamaño y exenciones

- Determinar si el prestador es microempresa/pequeña empresa a efectos de las exenciones que correspondan.
- No asumir que ser pequeño elimina el DSA entero: algunas obligaciones pueden seguir siendo aplicables según la categoría de servicio.
- Si la plataforma pudiera alcanzar umbrales o requisitos reforzados, elevar a **REVISAR**.

### Resultado DSA

- Clasificación: **NO INTERMEDIARIO / INTERMEDIARIO / HOSTING / PLATAFORMA ONLINE / MARKETPLACE / REVISAR**
- DSA: **NO APLICA / APLICA / REVISAR**
- Motivo:
- Obligaciones activadas:
- Validación jurídica necesaria: **SÍ / NO**

---

## 5.2 Si DSA APLICA — controles de implementación

La lista exacta depende de la categoría, tamaño y funcionalidades. Revisar el Reglamento vigente antes de cerrar el proyecto.

### Servicios intermediarios — base

| Control | Estado | Evidencia / notas |
|---|---|---|
| Clasificación jurídica del servicio documentada |  |  |
| Punto de contacto exigible correctamente implementado |  |  |
| Términos y condiciones describen restricciones/moderación cuando corresponda |  |  |
| Requisitos de transparencia aplicables identificados |  |  |
| Procedimientos internos para órdenes/solicitudes de autoridades cuando sean aplicables |  |  |

### Hosting

| Control | Estado | Evidencia / notas |
|---|---|---|
| Mecanismo de notificación y acción sobre contenido ilegal revisado (art. 16) |  |  |
| Flujo para acusar recibo y comunicar decisión cuando corresponda |  |  |
| Exposición de motivos ante decisiones de retirada/restricción revisada (art. 17) |  |  |
| Moderación documentada y trazable |  |  |
| Procedimiento para sospechas de determinados delitos graves revisado cuando aplique |  |  |

### Plataforma online

| Control | Estado | Evidencia / notas |
|---|---|---|
| Sistema interno de reclamaciones revisado cuando sea exigible (art. 20) |  |  |
| Información sobre resolución extrajudicial revisada cuando corresponda (art. 21) |  |  |
| Trusted flaggers / tratamiento prioritario revisado cuando corresponda |  |  |
| Dark patterns evitados y UX revisada expresamente |  |  |
| Transparencia publicitaria revisada si existen anuncios (art. 26) |  |  |
| Sistemas de recomendación revisados si existen |  |  |
| Protección de menores revisada si la plataforma es accesible a menores (art. 28 y guías vigentes) |  |  |
| Obligaciones de transparencia y reporting aplicables revisadas |  |  |
| Envío de exposiciones de motivos a la DSA Transparency Database revisado cuando corresponda |  |  |
| Publicación periódica del número medio mensual de destinatarios en la UE revisada cuando corresponda |  |  |

### Marketplace / contratos consumidor ↔ comerciante tercero

| Control | Estado | Evidencia / notas |
|---|---|---|
| Trazabilidad/verificación de comerciantes revisada (art. 30) |  |  |
| Información de comerciantes mostrada correctamente |  |  |
| Diseño de la interfaz permite al comerciante cumplir obligaciones de información y seguridad (art. 31) |  |  |
| Procedimiento ante productos/servicios ilegales revisado |  |  |
| Información a consumidores afectados cuando proceda |  |  |
| Protección de consumidores coordinada con normativa de consumo y seguridad de producto |  |  |

### VLOP/VLOSE

Si existe cualquier posibilidad razonable de entrar en esta categoría: **REVISAR con asesoramiento especializado**. Las obligaciones reforzadas no se implementan a partir de este checklist genérico.

---

# 6. Accesibilidad

| Control | Estado | Evidencia / notas |
|---|---|---|
| Navegación mediante teclado |  |  |
| Estados de foco visibles |  |  |
| Contraste suficiente |  |  |
| Labels y nombres accesibles |  |  |
| HTML semántico |  |  |
| Imágenes con tratamiento alt adecuado |  |  |
| Formularios accesibles y errores comprensibles |  |  |
| Motion respeta preferencias de movimiento reducido |  |  |
| Requisitos legales específicos de accesibilidad revisados según cliente/servicio |  |  |

---

# 7. Propiedad intelectual y contenido

| Control | Estado | Evidencia / notas |
|---|---|---|
| Cliente tiene derecho a usar logos, textos, fotos y vídeos aportados |  |  |
| Recursos de terceros tienen licencia compatible con uso comercial |  |  |
| Licencias de fuentes revisadas |  |  |
| Créditos/atribuciones incorporados cuando sean obligatorios |  |  |
| No se usan marcas/fotos/contenidos de terceros como si fueran del cliente |  |  |
| Contenido generado por IA revisado antes de publicación |  |  |

---

# 8. Seguridad y proveedores

| Control | Estado | Evidencia / notas |
|---|---|---|
| HTTPS y configuración segura |  |  |
| Secretos fuera del frontend/repositorio |  |  |
| Roles/permisos mínimos necesarios |  |  |
| Validación de inputs y controles de abuso |  |  |
| Backups/recuperación revisados si el sistema almacena datos operativos |  |  |
| Proveedores críticos inventariados |  |  |
| Supabase/Vercel/Resend/analytics/etc. revisados según uso real |  |  |
| Logs no exponen datos/secretos indebidamente |  |  |
| Sistema preparado para eliminar/exportar datos cuando proceda |  |  |

---

# 9. Revisión sectorial

Marcar las normativas adicionales que puedan afectar al proyecto:

- [ ] Restauración / reservas
- [ ] Hoteles / turismo
- [ ] Inmobiliario
- [ ] Automoción / alquiler
- [ ] Salud
- [ ] Finanzas / seguros
- [ ] Educación / menores
- [ ] Empleo / RRHH
- [ ] E-commerce / productos físicos
- [ ] Alcohol / tabaco / productos restringidos
- [ ] Geolocalización
- [ ] IA / decisiones automatizadas
- [ ] Otro: __________

Si el sector tiene obligaciones específicas relevantes: **REVISAR** hasta documentarlas.

---

# 10. Release Gate legal de Archic

Un proyecto solo puede marcarse **LEGAL READY** cuando:

- [ ] RGPD revisado y adaptado al tratamiento real.
- [ ] Cookies/tracking revisados sobre el sitio desplegado, no solo sobre la documentación.
- [ ] Aviso legal e información del prestador correctos.
- [ ] Consumo/contratación revisado cuando corresponda.
- [ ] **DSA Gate completado obligatoriamente y clasificación documentada.**
- [ ] Accesibilidad legal/técnica revisada según alcance.
- [ ] Propiedad intelectual/licencias revisadas.
- [ ] Proveedores y tratamiento de datos revisados.
- [ ] Revisión sectorial completada.
- [ ] No queda ningún estado **REVISAR** abierto.

**Resultado final:** ☐ LEGAL READY  ☐ NO READY

Fecha:  
Responsable:  
Notas finales:

---

## Fuentes normativas de referencia

- Reglamento (UE) 2022/2065 — Digital Services Act: https://eur-lex.europa.eu/eli/reg/2022/2065/oj
- Comisión Europea — Digital Services Act: https://digital-strategy.ec.europa.eu/en/policies/digital-services-act
- Comisión Europea — DSA Questions & Answers: https://digital-strategy.ec.europa.eu/en/faqs/digital-services-act-questions-and-answers
- Comisión Europea — DSA transparency: https://digital-strategy.ec.europa.eu/en/policies/dsa-brings-transparency
- Comisión Europea — DSA guidelines: https://digital-strategy.ec.europa.eu/en/policies/dsa-guidelines

## Norma interna Archic

**El DSA no se presupone aplicable ni inaplicable. Se comprueba y se documenta en todos los proyectos.**
