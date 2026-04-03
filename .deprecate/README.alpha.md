# Design Base - Alpha

## Arquitectura de Componentes

### Estructura general

```
src/
├── application/          # Screaming architecture por feature
│   └── {feature}/
│       ├── components/   # Organismos del feature
│       ├── hooks/        # Hooks específicos del feature
│       ├── helpers/      # Funciones utilitarias del feature
│       ├── layouts/      # Layouts específicos
│       ├── contexts/     # Estado del feature
│       └── services/     # Acceso a datos / API
├── components/
│   ├── ui/               # Atoms (shadcn)
│   └── core/             # Organismos reutilizables cross-feature
├── hooks/                # Hooks genéricos reutilizables
├── helpers/              # Funciones simples repetidas más de una vez
├── layouts/              # Layouts de página
├── pages/                # Páginas (componen organismos)
├── data/                 # Data / mock
├── zustand/              # Estado global por feature (Zustand)
│   └── {feature}/
│       ├── feature.mock.ts   # Datos mock / constantes del feature
│       └── feature.slice.ts  # Store de Zustand del feature
└── lib/                  # Utilidades base
```

### Reglas de organización

- **Pages**: solo componen, layouts, organisms y atoms. No contienen lógica de UI compleja
- **Organisms** (`application/{feature}/components/`): unidades de negocio autocontenidas. No se subdividen; consumen atoms y componentes de `core/`
- **Core** (`components/core/`): organismos reutilizables entre múltiples features
- **Atoms** (`components/ui/`): componentes base de shadcn
- **Application**: screaming architecture — cada carpeta representa un dominio de negocio

### Criterios de ubicación

| Pregunta | Ubicación |
|---|---|
| ¿Es un componente base sin lógica de negocio? | `components/ui/` |
| ¿Es un organismo usado en más de un feature? | `components/core/` |
| ¿Es un organismo atado a un solo feature? | `application/{feature}/components/` |
| ¿Es un hook que puede usarse sin conocer el feature? | `src/hooks/` |
| ¿Es un hook que solo aplica dentro de un feature? | `application/{feature}/hooks/` |
| ¿Es una función simple repetida más de una vez? | `src/helpers/` o `application/{feature}/helpers/` según alcance |
| ¿Es estado específico de un dominio? | `application/{feature}/contexts/` |

### Estado global — Zustand (`src/zustand/`)

Se usa Zustand para comunicación global entre componentes distantes. Cada feature tiene su propia carpeta con dos archivos:

```
src/zustand/
├── auth/
│   ├── auth.mock.ts      # Mock de usuarios, delays de simulación
│   └── auth.slice.ts     # Store: user, login, register, logout
├── videos/
│   ├── videos.mock.ts    # Re-exporta data mock de videos, canales, categorías
│   └── videos.slice.ts   # Store: filtrado, video actual, búsqueda, likes, suscripciones
└── ui/
    ├── ui.mock.ts         # Constantes de UI (sidebar default, breakpoints)
    └── ui.slice.ts        # Store: sidebar collapsed
```

#### Reglas del directorio `zustand/`

- **Separación por feature**: cada carpeta corresponde a un dominio de negocio (`auth`, `videos`, `ui`)
- **`feature.mock.ts`**: contiene datos mock, constantes y funciones auxiliares de datos. Es la fuente de verdad de la data que consume el slice
- **`feature.slice.ts`**: crea el store de Zustand con `create<T>()`. Contiene estado y acciones para controlar lógica/UI en componentes distantes
- **Solo estado global**: no se usa para estado local de formularios o UI efímera. Solo datos externos (o mocks) y estado que necesitan compartir componentes que no son padre-hijo
- **Consumo directo**: los componentes importan el hook del slice (`useAuthStore`, `useVideosStore`, `useUiStore`) sin providers ni wrappers

#### Stores actuales

| Store | Archivo | Responsabilidad |
|---|---|---|
| `useAuthStore` | `zustand/auth/auth.slice.ts` | Sesión de usuario: login, register, logout, isLoading |
| `useVideosStore` | `zustand/videos/videos.slice.ts` | Videos, categorías, canales, filtrado, búsqueda, likes, suscripciones |
| `useUiStore` | `zustand/ui/ui.slice.ts` | Estado de sidebar (collapsed/expanded) |
