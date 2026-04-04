---
name: "Commits"
description: "Use when creating, reviewing, or assisting with git commits. Defines format, types, rules, flow, and anti-patterns for conventional commits."
applyTo: "**"
---

# Commits

Reglas para crear commits claros, atomicos y convencionales. Aplican a cualquier area del workspace.

## Idioma de escritura

- commit name: `english`
- commit description: `english`
- assistant response: `spanish`

## Formato obligatorio

```
<TYPE>(<scope>): <description>

# Tasks
- ...

# Context
- ...

# Impact
- ...
```

## Types

| Tipo       | Uso                   |
| ---------- | --------------------- |
| `feat`     | nueva funcionalidad   |
| `fix`      | correccion de bug     |
| `refactor` | mejora interna        |
| `perf`     | mejora de performance |
| `docs`     | documentacion         |
| `style`    | formato / estilos     |
| `test`     | testing               |
| `chore`    | tareas internas       |

## Reglas de descripcion

- Maximo 200 caracteres.
- Verbo en presente imperativo (`add`, `fix`, `remove`).
- Sin punto final.
- 1 commit = 1 intencion.

## Prioridad de tipos

```
fix > feat > refactor > perf > docs > style > chore
```

El tipo principal es el de mayor impacto.

## Multi-type commits

### Si NO se puede dividir (cambios acoplados)

Usar el tipo de mayor prioridad como `PRIMARY_TYPE` y agrupar tasks por tipo:

```
<PRIMARY_TYPE>(<scope>): <description>

# Tasks

## fix
- ...

## feat
- ...

# Context
- ...

# Impact
- ...
```

## Flujo paso a paso

### Step 1 — Ver cambios

```bash
git status
```

Verificar archivos modificados y nuevos.

### Step 2 — Analizar cambios automaticamente

- ¿Es una feature? → `feat`
- ¿Es un bug? → `fix`
- ¿Hay multiples cambios? → intentar separar commits.

### Step 3 — Preparar staging

```bash
git add <files>
```

Preferir staging selectivo sobre `git add .`.

### Step 4 — Crear commit

```bash
git commit
```

Escribir mensaje siguiendo el formato obligatorio.

### Step 5 — Validacion

Checklist:

- [ ] ¿1 sola intencion?
- [ ] ¿Tipo correcto?
- [ ] ¿Descripcion clara y ≤ 200 chars?
- [ ] ¿Tasks explican el cambio?
- [ ] ¿Context explica el por que?

### Step 6 — Subir cambios

```bash
git push origin <branch>
```

## Flujo asistido (LLM / Copilot)

1. **Detectar cambios** — listar archivos modificados, identificar tipo y scope.
2. **Validar estructura** — si hay multiples tipos, preguntar al usuario con `asking question`:
   - Opcion 1: commit combinado (multi-type, mas simple).
   - Opcion 2: commits separados (staging parcial, historial mas limpio).
   - Opcion 3: respuesta libre del usuario.
3. **Generar commit** — proponer mensaje con formato obligatorio.
4. **Confirmar commit** — preguntar al usuario con `asking question`:
   - Opcion 1: confirmar y ejecutar el commit propuesto.
   - Opcion 2: denegar y regenerar con ajustes.
   - Opcion 3: editar manualmente (el usuario escribe su propio mensaje).
5. **Siguiente paso** — sugerir `git add`, `git commit`, luego `git push`.
6. **Confirmar push** — preguntar al usuario con `asking question`:
   - Opcion 1: confirmar y ejecutar `git push origin <branch>`.
   - Opcion 2: cancelar push (solo commit local).
   - Opcion 3: respuesta libre del usuario.
7. **Conflictos en push** — si el push falla por conflictos, preguntar al usuario con `asking question`:
   - Opcion 1: cancelar y resolver conflictos manualmente.
   - Opcion 2: forzar push con `--force`.
   - Opcion 3: respuesta libre del usuario.
8. **Confirmar force push** — solo si el usuario eligio `--force` en el paso anterior, preguntar con `asking question`:
   - Opcion 1: confirmar `git push --force` (accion destructiva, sobrescribe historial remoto).
   - Opcion 2: cancelar force push.

## Anti-patrones

- Commits grandes con multiples intenciones.
- Descripciones vagas (`fix stuff`, `update`).
- Mezclar logica distinta en un solo commit.
- No explicar contexto ni impacto.
- Commits sin estructura.

## Buenas practicas

- Commits pequeños y claros.
- Usar convenciones estandar.
- Explicar el "por que" en Context.
- Separar responsabilidades.
- Mantener historial limpio.

## Ejemplo

```
fix(product-card): resolve price rendering and add fallback

# Tasks

## fix
- Fix price rendering when value is null
- Prevent UI break on missing currency

## feat
- Add fallback price label ("Contact")
- Introduce reusable price formatter

# Context
- Bug occurred when products had incomplete data
- Required adding fallback logic tightly coupled with fix

# Impact
- Fixes broken UI in product cards
- Improves resilience of pricing system
- No breaking changes
```
