---
name: "Project Guidelines"
description: "These rules apply to any prompt in this workspace. They define when to activate each skill and the global conventions for structure, UI and SEO. Always follow these guidelines in addition to the specific instructions of each skill."
applyTo: "**"
---

# Project Guidelines

Estas reglas aplican a cualquier prompt en este workspace.

## Skill Activation

- Antes de responder, proponer cambios o editar archivos, identifica que skill aplica y cargala.
- Si el trabajo toca varias areas, carga todas las skills relevantes antes de continuar.
- Las reglas detalladas de cada area viven en `.github/instructions/*.instructions.md`; usa la skill y su instruction correspondiente como una sola fuente de criterio.
- No inventes convenciones paralelas cuando una skill ya define la regla del proyecto.

### Role

Usa siempre la instruction `role` como criterio base de comportamiento y formato de respuesta para este workspace.

- Archivo: `.github/instructions/role.instructions.md`.
- Esta instruction define el rol base de frontend y diseno, cuando anunciar complejidad o integraciones externas, y como cerrar cada respuesta con preguntas de validacion y una seccion final `Tasks`.

### Infrastructure

Usa la skill `infrastructure` siempre que el trabajo toque la estructura de `src/**` o decisiones de arquitectura, incluyendo:

- `src/App.tsx`, `src/main.tsx`, routes, pages y layouts.
- `src/application/**`, `src/components/**`, `src/hooks/**`, `src/helpers/**`, `src/lib/**`, `src/data/**`.
- `src/zustand/**`, contexts, services, naming, ubicacion de archivos y dependencias entre capas.
- Cabeceras `//* @type`, `//* @context`, `//* @utility` y comentarios de regiones del DOM.

### Design System

Usa la skill `design-system` siempre que el trabajo toque el sistema visual, incluyendo:

- Clases de Tailwind, `className`, estilos, colores, spacing, tipografia, motion, z-index y dark mode.
- `src/index.css`, `tailwind.config.ts`, `postcss.config.js`, `components.json` y documentacion de tokens.
- Tokens, utilidades generadas por `@theme inline`, configuracion de shadcn y consumo visual de componentes.

### SEO

Usa la skill `seo` siempre que el trabajo toque SEO o metadata, incluyendo:

- `index.html`, `<head>`, title, description, canonical, robots, Open Graph y Twitter cards.
- Assets publicos de SEO como `og-cover`, `favicon` y `apple-touch-icon`.
- Metadata por ruta, previews sociales, structured data y documentacion SEO.

## Global Rules

- Mantene los cambios minimos y alineados con la arquitectura y el sistema visual existentes.
- Si una tarea mezcla estructura, UI y SEO, combina las skills en lugar de elegir solo una.
- Si no hay una skill especifica para la tarea, igual respeta esta instruccion global y las convenciones ya presentes en el repo.