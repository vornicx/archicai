# Manifiesto Técnico de Archic

## Hacia una persistencia de contexto determinista: Por qué fundamos Archic

El estado actual de los agentes de IA sufre de amnesia estructural. Las arquitecturas contemporáneas confían la "memoria" a ventanas de contexto masivas o a capas RAG genéricas. Ambas soluciones son parches costosos: las primeras degradan la atención del modelo de forma lineal; las segundas recuperan fragmentos de texto basados en similitud semántica superficial, perdiendo el hilo conductor de la tarea original.

En **Archic**, no construimos envoltorios de API ni copilotos conversacionales. Desarrollamos la infraestructura de memoria profunda que permite a los agentes operar en horizontes de días y semanas, manteniendo la consistencia de sus objetivos y herramientas sin saturar la ventana de contexto.

### Tres verdades técnicas

1. **La memoria es un problema de sistemas, no de embeddings:** Indexar vectores no es recordar. El SDK Midas implementa grafos de ejecución dinámicos que permiten al agente consolidar sus experiencias y descartar el ruido de manera autónoma.

2. **Si no es determinista, no es infraestructura:** El software empresarial no puede depender de la suerte. Evaluamos cada iteración de nuestra arquitectura mediante un arnés de pruebas (*eval harness*) estricto que mide el *Recall@K* real ante pérdidas de información complejas.

3. **Ingeniería abierta sobre promesas de marketing:** Compartimos nuestras limitaciones con la misma transparencia que nuestros éxitos. Preferimos un recall verificado de 0.83 antes que una promesa comercial de perfección que se rompe en producción.
