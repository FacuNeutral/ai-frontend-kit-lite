# Design Tokens

## Objetivo

Documentar la fundacion de primitive tokens del proyecto. En esta capa importa la estructura del sistema y la consistencia del naming; los valores actuales son referenciales y no deben tomarse como definitivos.

## Convencion de Naming

### Observacion

Los tokens deben mantener nombres intuitivos, estables y desacoplados del componente final. La prioridad es describir categoria y rol, no la pantalla donde se usan ni el valor visual puntual.

### Evidencia

```txt
category-role-variant-state
```

```txt
color-primary
color-primary-hover
gradient-secondary
spacing-md
motion-duration-fast
z-modal
```

### Interpretacion

Esta convencion permite que los tokens se mantengan estables y reutilizables sin depender de una capa semantica intermedia. Los componentes consumen directamente los primitives de la paleta.

## Estado Actual del Sistema

### Observacion

La fundacion actual cubre color, gradient, spacing, size, breakpoint, container, aspect-ratio, border, typography, motion, elevation, blur, opacity y z-index.

### Evidencia

| Grupo | Proposito |
|---|---|
| `color` | Definir la paleta base desacoplada del uso final |
| `gradient` | Resolver superficies y transiciones de color reutilizables |
| `spacing` | Normalizar separaciones internas y externas |
| `size` | Escalar medidas de iconos, controles y piezas base |
| `breakpoint` | Establecer cortes responsivos del layout |
| `container` | Limitar anchos maximos de regiones principales |
| `aspect-ratio` | Estandarizar proporciones de media y cards |
| `border` | Separar grosor y radio de borde |
| `typography` | Definir familia, escala, peso y line-height |
| `motion` | Homogeneizar tiempos y easing |
| `elevation` | Reutilizar sombras por nivel de profundidad |
| `blur` | Aplicar desenfoques de superficie u overlay |
| `opacity` | Codificar estados de atenuacion |
| `z-index` | Controlar jerarquia de capas |

### Interpretacion

La cobertura actual resuelve las bases del sistema visual sin acoplar tokens a componentes concretos. Los componentes consumen directamente los primitives de la paleta usando utilidades de Tailwind con variante `dark:` para dark mode.

## Inventario de Tokens

### Color

Paleta base desacoplada del uso final y preparada para branding flexible.

```scss
// light
$color-neutral-off: #838383;
$color-neutral: #E3E8E8;
// dark
$color-neutral-off-dark: #4D4D4D;
$color-neutral-dark: #1A1A1A;

$color-primary-off: #4DC5AC;
$color-primary: #5EE1C0;
$color-primary-hover: #3CB48E;

$color-accent-off: #F2A365;
$color-accent: #F9C784;
$color-accent-hover: #E5944B;

$color-secondary-off: #F2B880;
$color-secondary: #F9C784;
$color-secondary-hover: #E5944B;

$color-tertiary-off: #F2994A;
$color-tertiary: #F2994A;
$color-tertiary-hover: #D87A2B;

$color-info: #56CCF2;
$color-warning: #F2C94C;
$color-success: #6FCF97;
$color-error: #EB5757;
```

### Gradient

Variantes base desacopladas del uso en pantallas o componentes.

```scss
$gradient-primary: linear-gradient(135deg, $color-primary 0%, $color-accent 100%);
$gradient-secondary: linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 100%);
$gradient-tertiary: linear-gradient(180deg, rgba(26,26,26,0) 0%, rgba(26,26,26,0.72) 100%);
```

### Spacing

Escala consistente para evitar hardcode en componentes.

```scss
$spacing-xs: 0.4rem;
$spacing-sm: 0.8rem;
$spacing-md: 1.2rem;
$spacing-lg: 1.6rem;
$spacing-xl: 2.4rem;
$spacing-2xl: 3.2rem;
```

### Size

Tamanos reutilizables para iconos, inputs y elementos base.

```scss
$size-xs: 1.6rem;
$size-sm: 2.4rem;
$size-md: 3.2rem;
$size-lg: 4.8rem;
```

### Breakpoint

Puntos de quiebre del layout responsivo.

```scss
$breakpoint-xs: 360px;
$breakpoint-sm: 480px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
```

### Container

Anchuras maximas para layout y regiones principales.

```scss
$container-sm: 48rem;
$container-md: 64rem;
$container-lg: 80rem;
$container-xl: 96rem;
```

### Aspect-Ratio

Relaciones reutilizables para media cards, covers y video.

```scss
$aspect-square: 1 / 1;
$aspect-video: 16 / 9;
$aspect-portrait: 3 / 4;
```

### Border

Separacion de concerns entre grosor y radio.

```scss
$border-width-sm: 1px;
$border-width-md: 2px;

$radius-sm: 0.8rem;
$radius-md: 1.2rem;
$radius-lg: 2.4rem;
```

### Typography

Escala tipografica base del sistema.

```scss
$font-family-primary: 'Poppins';
$font-family-secondary: 'Inter';

$font-size-xs: 0.8rem;
$font-size-sm: 1.2rem;
$font-size-base: 1.6rem;
$font-size-lg: 2rem;
$font-size-xl: 3.2rem;

$font-weight-light: 300;
$font-weight-regular: 400;
$font-weight-medium: 500;
$font-weight-bold: 700;
$font-weight-ultra-bold: 900;

$line-height-sm: 2rem;
$line-height-md: 2.8rem;
$line-height-lg: 3.2rem;
```

### Motion

Control consistente de duraciones y easing.

```scss
$motion-duration-fast: 120ms;
$motion-duration-normal: 240ms;
$motion-duration-slow: 400ms;

$motion-ease-standard: ease-in-out;
```

### Elevation

Sombras reutilizables por nivel de profundidad.

```scss
$shadow-sm: 0 2px 4px rgba(0,0,0,0.08);
$shadow-md: 0 4px 12px rgba(0,0,0,0.12);
```

### Blur

Efectos de glassmorphism, overlays y fondos difusos.

```scss
$blur-sm: 4px;
$blur-md: 8px;
$blur-lg: 16px;
```

### Opacity

Estados de atenuacion y deshabilitado.

```scss
$opacity-disabled: 0.4;
$opacity-muted: 0.7;
```

### Z-Index

Jerarquia base de capas interactivas.

```scss
$z-base: 1;
$z-dropdown: 100;
$z-modal: 1000;
$z-toast: 1100;
```

## Reglas de Uso

- Definir solo primitive tokens en esta capa.
- Evitar nombres acoplados a componentes o pantallas.
- Evitar nombres basados en valores puros como `green-500` o `16px`.
- Mantener variantes intuitivas como `primary`, `secondary` y `tertiary` cuando el grupo lo necesite.
- **No usar capa semantica intermedia.** Los componentes referencian directamente los primitives de la paleta (ej. `bg-neutral-dark`, `text-primary`, `border-neutral-off-dark`).
- **Ningun componente debe definir colores, espaciados ni tokens de forma manual internamente.** Todo valor visual debe provenir de las CSS custom properties o de las utilidades de Tailwind generadas desde los tokens. Solo se permite hardcoding cuando el token necesario no existe en el sistema y su adicion no esta justificada.
- **Dark mode se implementa con la variante `dark:` de Tailwind.** Cada clase que cambia entre light y dark lleva su par explicito (ej. `bg-neutral dark:bg-neutral-dark`). Los primitive tokens son invariantes; el cambio se resuelve en el componente con la variante `dark:`.
- **La paleta neutral usa solo 4 tokens.** `neutral` y `neutral-off` son los valores light; `neutral-off-dark` y `neutral-dark` son los valores dark. No existen tokens `neutral-white` ni `neutral-light`.

### Mapeos light → dark habituales

| Rol visual | Light | Dark |
|---|---|---|
| Fondo principal | `bg-neutral` | `dark:bg-neutral-dark` |
| Texto principal | `text-neutral-dark` | `dark:text-neutral` |
| Fondo card/popover | `bg-neutral` | `dark:bg-neutral-dark` |
| Fondo muted/chips | `bg-neutral` | `dark:bg-neutral-off-dark` |
| Texto secundario | `text-neutral-off-dark` | `dark:text-neutral-off` |
| Borde por defecto | `border-neutral` | `dark:border-neutral-off-dark` |
| Error/destructivo | `bg-error` / `text-error` | (invariante) |
| Ring de foco | `ring-primary` | (invariante) |

## Anti-Patrones Evitados

### Observacion

Los nombres acoplados a implementacion puntual y las capas de indirecion innecesarias erosionan la reutilizacion y vuelven fragil la evolucion del sistema.

### Evidencia

- `padding-card`
- `color-green-500`
- `border-radius-primary`
- duplicaciones de variantes sin criterio estable
- `bg-background`, `text-foreground`, `bg-muted` u otros tokens semanticos intermedios — usar directamente los primitives de la paleta
- `neutral-white`, `neutral-light` u otros tokens superfluos — la paleta neutral se resuelve con 4 tokens: `neutral`, `neutral-off`, `neutral-off-dark`, `neutral-dark`
- `var(--background)` con redefinicion en `:root`/`.dark` — preferir variante `dark:` de Tailwind

### Interpretacion

Si un token necesita renombrarse cuando cambia un componente o una vista, ese token probablemente esta definido en la capa incorrecta.

## Proximo Paso Recomendado

1. ~~Definir semantic tokens.~~ Descartado — se usa consumo directo de primitives.
2. ~~Exportar los primitives a CSS variables y Tailwind.~~ Implementado.
3. ~~Implementar dark mode.~~ Implementado con variante `dark:` de Tailwind.
4. Documentar ejemplos de consumo en componentes para que el sistema no se quede solo en el inventario.
