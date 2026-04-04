---
name: commits
description: 'Use when creating, reviewing, or assisting with git commits. Covers conventional commit format, types, multi-type strategy, guided flow, and anti-patterns. Triggers: commit, git commit, conventional commit, commit message, changelog, version, push, staging.'
argument-hint: 'Describe los cambios realizados o pedi asistencia para generar el commit.'
---

# Commits

## When to Use

- Crear o revisar mensajes de commit.
- Asistir al usuario con el flujo de commit (status → add → commit → push).
- Detectar tipo, scope y descripcion a partir de cambios en el workspace.
- Validar que un commit cumpla formato y reglas convencionales.

## Procedure

1. Ejecuta `git status` o `git diff --stat` para detectar archivos modificados.
2. Analiza los cambios y determina tipo(s) y scope(s).
3. Si hay multiples tipos, usa `asking question` para que el usuario elija: commit combinado, commits separados, o respuesta libre.
4. Genera el mensaje de commit con el formato obligatorio (type, scope, description, Tasks, Context, Impact).
5. Valida contra la checklist: 1 intencion, tipo correcto, descripcion ≤ 50 chars, Tasks y Context presentes.
6. Usa `asking question` para que el usuario confirme el commit, lo edite manualmente, o pida regenerar con ajustes.
7. Sugeri el siguiente paso (`git add`, `git commit`, `git push`).
8. Usa `asking question` para confirmar el push antes de ejecutarlo.
9. Si el push falla por conflictos, usa `asking question` para que el usuario elija: cancelar, o forzar con `--force`.
10. Si el usuario elige `--force`, usa `asking question` adicional para confirmar la accion destructiva antes de ejecutarla.

## Required Output

- Mensaje de commit completo siguiendo el formato convencional.
- Tipo correcto segun prioridad (`fix > feat > refactor > perf > docs > style > chore`).
- Tasks, Context e Impact explicitos.
- Si hay multiples tipos acoplados, agrupar Tasks por tipo bajo el PRIMARY_TYPE.

## Instruction

- [Commits instruction](../../instructions/commits.instructions.md)
