# Design Base - Project Design

## Indice

- [Objetivo](#objetivo)
- [Alcance](#alcance)
- [Mapa del proyecto](#mapa-del-proyecto)
- [Capas de arquitectura](#capas-de-arquitectura)
- [Flujo de composicion](#flujo-de-composicion)
- [Inventario de componentes](#inventario-de-componentes)
- [Estado y fronteras de datos](#estado-y-fronteras-de-datos)
- [Estilos y sistema visual](#estilos-y-sistema-visual)
- [Tooling y calidad](#tooling-y-calidad)
- [Hallazgos verificados](#hallazgos-verificados)
- [Criterios de evolucion](#criterios-de-evolucion)
- [Documentacion relacionada](#documentacion-relacionada)

## Objetivo

### Observacion

`PROJECT-DESIGN.md` consolida el contrato estructural del workspace desde una mirada agnostica a la logica de negocio. La meta no es describir flujos funcionales ni semantica del producto, sino fijar como se organiza, compone y extiende el proyecto.

### Evidencia

- El documento integra lo que hoy esta repartido entre `README.md`, `README.alpha.md`, `design-token.md` y `SEO.md`.
- La evidencia se toma del arbol real del repositorio, del runtime shell y de la configuracion de tooling.
- Los nombres concretos de carpetas actuales se usan como evidencia de implementacion, no como regla de dominio.

### Interpretacion

Este README funciona como mapa de diseño del proyecto: define donde vive cada pieza, como se conecta con el resto y que limites conviene preservar cuando el sistema crezca.

## Alcance

### Observacion

El documento cubre capas de codigo, shell de ejecucion, composicion de UI, estado, datos, estilos, assets publicos y herramientas de desarrollo. No define reglas de negocio, contenido editorial ni decisiones de SEO especificas.

### Evidencia

- Incluye estructura raiz y `src/`.
- Incluye providers, routing, layouts, pages, componentes, stores, mocks y configuracion.
- Excluye comportamiento funcional detallado de cada feature.
- Excluye copy, naming de producto y detalles de indexacion ya cubiertos por documentacion dedicada.

### Interpretacion

Separar estructura de negocio evita que el contrato de arquitectura cambie cada vez que cambian las features, las pantallas o la marca.

## Mapa del proyecto

### Observacion

El repositorio separa claramente dos superficies: la plataforma tecnica en la raiz y la implementacion de la aplicacion dentro de `src/`.

### Evidencia

```text
.
├── index.html
├── public/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── App.css
│   ├── application/
│   ├── components/
│   ├── data/
│   ├── helpers/
│   ├── hooks/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   └── zustand/
├── components.json
├── vite.config.ts
├── vitest.config.ts
├── playwright.config.ts
├── playwright-fixture.ts
├── tailwind.config.ts
├── postcss.config.js
├── eslint.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── README.md
├── README.alpha.md
├── design-token.md
└── SEO.md
```

### Interpretacion

La raiz concentra contratos de build, tooling, shell HTML y documentacion. `src/` concentra las capas operativas de la aplicacion y por eso es el lugar donde deben vivir las decisiones de composicion, reutilizacion y estado.

## Capas de arquitectura

### Bootstrap y app shell

#### Observacion

El arranque de la aplicacion esta encapsulado en una cadena simple: documento HTML, bootstrap de React y shell global con providers.

#### Evidencia

```text
index.html
  -> src/main.tsx
  -> src/App.tsx
  -> QueryClientProvider
  -> TooltipProvider
  -> Toaster / Sonner
  -> BrowserRouter
  -> layouts y pages
```

- `index.html` define el contenedor `#root` y el documento base.
- `src/main.tsx` monta React y solo importa `App.tsx` e `index.css`.
- `src/App.tsx` centraliza providers globales y la tabla de rutas.

#### Interpretacion

La cadena de bootstrap esta bien contenida: el entrypoint es minimo y cualquier decision global de runtime queda visible en un unico archivo de shell.

### Routing y layouts

#### Observacion

El routing se define de forma centralizada y separa rutas con shell compartido de rutas standalone.

#### Evidencia

```text
/
  -> MainLayout
/search
  -> MainLayout
/watch/:id
  -> MainLayout
/login
  -> pantalla standalone
/register
  -> pantalla standalone
*
  -> NotFound
```

- `src/layouts/MainLayout.tsx` compone `Header`, `Sidebar` y `Outlet`.
- Las rutas principales reutilizan el mismo layout.
- Las pantallas de acceso quedan fuera del shell principal.
- La ruta catch-all vive en la misma tabla central.

#### Interpretacion

La organizacion actual permite distinguir rapido entre navegacion de aplicacion y pantallas aisladas. Ese corte es util para futuras guardas, variantes de shell o shells adicionales.

### UI reusable y UI por feature

#### Observacion

La UI esta distribuida en cinco niveles de responsabilidad: pages, layouts, organismos por feature, fragments y componentes reutilizables.

#### Evidencia

- `src/pages/`: composicion por ruta.
- `src/layouts/`: shells estructurales compartidos.
- `src/application/{feature}/components/`: organismos acotados a un dominio.
- `src/application/{feature}/components/fragments/`: piezas irreducibles del organismo, reutilizables dentro del feature.
- `src/components/core/`: organismos reutilizables entre multiples dominios.
- `src/components/fragments/`: fragments globales reutilizables entre cualquier feature.
- `src/components/ui/`: primitives y wrappers base apoyados en shadcn/radix.
- `src/application/{feature}/contexts/`: opcion de estado acotado al feature cuando haga falta.

#### Interpretacion

Los fragments representan la capa mas granular de composicion dentro de un organismo. Son piezas irreducibles que encapsulan markup y estilos repetidos sin logica de negocio propia. Un fragment pertenece a un feature cuando solo ese feature lo consume, y se promueve a global cuando mas de un feature lo necesita. Esta capa evita que los organismos acumulen markup duplicado y permite reutilizar patrones visuales sin elevar la pieza a primitive.

### Hooks, helpers y utilidades base

#### Observacion

La capa transversal esta reservada para logica reutilizable y helpers de bajo acoplamiento.

#### Evidencia

- `src/hooks/use-mobile.tsx` expone un hook responsive compartible.
- `src/hooks/use-toast.ts` concentra el estado y despacho de toasts.
- `src/lib/utils.ts` expone `cn()` como utilidad base para clases.
- `src/helpers/` existe como espacio de utilidades globales, aunque hoy no tiene archivos.

#### Interpretacion

La estructura deja claro que una utilidad solo debe salir del feature cuando su alcance deja de ser local. Eso preserva cohesion y reduce dependencias cruzadas innecesarias.

### Shell publico y assets compartidos

#### Observacion

El proyecto trata al documento HTML y a los assets publicos como parte explicita del diseño de entrega, no como detalle accesorio.

#### Evidencia

- `index.html` define head, meta base y punto de montaje.
- `public/robots.txt` expone contrato de crawl.
- `public/favicon.ico` y `public/placeholder.svg` forman parte del paquete publico.

#### Interpretacion

El shell publico debe documentarse junto con la arquitectura porque condiciona como se monta la SPA, como se entrega la marca y que archivos quedan fuera del bundle de `src/`.

## Flujo de composicion

### Observacion

La composicion del proyecto sigue una direccion descendente y bastante predecible desde el shell hasta los primitives.

### Evidencia

```text
index.html
  -> main.tsx
  -> App.tsx
  -> layout o page
  -> application/*/components o components/core/*
  -> application/*/components/fragments/* o components/fragments/*
  -> components/ui/*
  -> hooks / zustand / data / lib
```

- Las pages ensamblan organismos y leen el estado necesario para la ruta.
- Los layouts resuelven estructura compartida, no contenido especifico.
- Los organismos por feature consumen core, fragments y ui.
- Los fragments encapsulan markup irreducible y reutilizable dentro de su organismo o feature.
- Los primitives no conocen rutas, stores ni contexto de negocio.

### Interpretacion

Este flujo reduce el acoplamiento vertical y vuelve mas simple localizar donde debe entrar un cambio: shell, pagina, organismo, primitive o capa de estado.

## Inventario de componentes

### Observacion

El proyecto ya tiene un inventario de componentes mas amplio que el documentado hasta ahora, especialmente en shell reusable y primitives UI.

### Evidencia

- Layouts actuales: `MainLayout`.
- Pages actuales: `Home`, `Search`, `Watch`, `Login`, `Register`, `NotFound`.
- Core actuales: `CategoryChips`, `Header`, `NavLink`, `Sidebar`, `VideoCard`, `VideoCardSkeleton`.
- Organismos de feature actuales: `LoginForm`, `RegisterForm`, `RelatedVideos`, `SearchResults`, `VideoActions`, `VideoDescription`, `VideoGrid`, `VideoPlayer`.
- Fragments de feature actuales: `auth/FormField`.
- Primitives de formulario e input: `button`, `input`, `textarea`, `checkbox`, `radio-group`, `select`, `slider`, `switch`, `input-otp`, `calendar`, `form`, `label`.
- Primitives de navegacion y disclosure: `accordion`, `breadcrumb`, `collapsible`, `command`, `context-menu`, `dropdown-menu`, `menubar`, `navigation-menu`, `pagination`, `sheet`, `sidebar`, `tabs`.
- Primitives de overlay y feedback: `alert`, `alert-dialog`, `dialog`, `drawer`, `hover-card`, `popover`, `toast`, `toaster`, `sonner`, `tooltip`.
- Primitives de superficie y visualizacion: `aspect-ratio`, `avatar`, `badge`, `card`, `carousel`, `chart`, `progress`, `resizable`, `scroll-area`, `separator`, `skeleton`, `table`, `toggle`, `toggle-group`.

### Interpretacion

El inventario muestra que el sistema no solo tiene base de atoms, sino tambien shell reusable y organismos listos para reutilizacion. Eso vuelve importante seguir cuidando el corte entre `core`, `ui` y `application`.

## Estado y fronteras de datos

### Observacion

La arquitectura actual combina estado local de componente, estado global por feature, capa mock de datos y un shell ya preparado para server state.

### Evidencia

- `src/zustand/{feature}/feature.mock.ts + feature.slice.ts` define el patron de store compartido por dominio.
- Stores actuales: `auth`, `videos`, `ui`.
- `src/data/mockData.ts` centraliza tipos base, generadores y helpers de mocks.
- `src/application/auth/contexts/AuthContext.tsx` expone una alternativa basada en Context para un feature puntual.
- `src/App.tsx` monta `QueryClientProvider`, por lo que la aplicacion ya reserva espacio para server state.
- No hay carpetas `services/` activas en los features actuales, aunque la estructura esta prevista en la documentacion alpha.

### Interpretacion

El proyecto esta en un estado mock-first con frontera clara para evolucionar. El estado global no invade todo el arbol y el shell ya deja lugar para una futura integracion con fuentes remotas.

## Estilos y sistema visual

### Observacion

La capa visual se reparte entre documentacion de tokens, configuracion runtime y primitives que consumen esas decisiones.

### Evidencia

- `design-token.md` define la fundacion de primitive tokens y su naming.
- `src/index.css` materializa variables CSS globales, mapping de color, radios, animaciones y utilidades custom.
- `tailwind.config.ts` extiende colores, radios, keyframes y animaciones sobre esa base.
- `components.json` fija la integracion de shadcn con aliases, CSS entry y convenciones del proyecto.
- `src/components/ui/` es la superficie donde esas decisiones se vuelven componentes concretos.
- `src/App.css` existe en el arbol, pero no forma parte del flujo principal de estilos cargado por `main.tsx`.

### Interpretacion

La semantic layer ya esta parcialmente operativa en runtime aunque la documentacion de tokens viva por separado. El punto importante es que el contrato visual no reside en un solo archivo, sino en la combinacion de tokens, CSS variables, Tailwind y primitives.

## Tooling y calidad

### Observacion

La raiz del proyecto ya define un stack completo de build, lint, estilos y pruebas, aunque no todas las piezas estan materializadas con el mismo nivel de profundidad.

### Evidencia

- `package.json` expone scripts para `dev`, `build`, `build:dev`, `lint`, `test`, `test:watch` y `preview`.
- `vite.config.ts` define alias `@`, plugin React SWC, dedupe de dependencias y servidor en puerto `8080`.
- `eslint.config.js` combina reglas base de TypeScript, React Hooks y React Refresh.
- `tsconfig.json` y `tsconfig.app.json` fijan paths y un nivel de strictness relajado.
- `postcss.config.js` conecta Tailwind y Autoprefixer.
- `vitest.config.ts` declara entorno `jsdom`, globals y setup file.
- `playwright.config.ts` y `playwright-fixture.ts` preparan la superficie de E2E sobre una base compartida.

### Interpretacion

El proyecto ya tiene contrato de herramienta suficiente para desarrollo serio. La diferencia entre lo declarado y lo efectivamente usado debe tratarse como deuda visible, no como detalle oculto.

## Hallazgos verificados

### Observacion

El analisis del workspace muestra varias capas reales que faltaban en la documentacion y algunos contratos declarados que todavia no estan cerrados en implementacion.

### Evidencia

- `README.alpha.md` cubre bien la organizacion por feature, pero no documenta bootstrap, providers, shell publico, runtime theme ni tooling.
- `design-token.md` documenta familias tipograficas (`Poppins` e `Inter`) que hoy no se reflejan en el body runtime, donde `index.css` usa `Roboto`.
- `vitest.config.ts` referencia `src/test/setup.ts`, pero ese archivo no existe actualmente.
- No se encontraron archivos `*.test.*` ni `*.spec.*` dentro de `src/`.
- `playwright.config.ts` y `playwright-fixture.ts` existen, pero no hay specs E2E en el repo.
- `src/application/auth/contexts/AuthContext.tsx` duplica una responsabilidad ya resuelta con Zustand y no esta conectado al shell raiz.
- `QueryClientProvider` esta montado, pero React Query no aparece consumido fuera del bootstrap.
- `src/helpers/` esta reservado por arquitectura, pero hoy esta vacio.
- `src/App.css` parece residuo del scaffold inicial y no participa del import chain activo.
- Conviven `bun.lock`, `bun.lockb` y `package-lock.json`, por lo que el contrato de package manager no queda explicito en la superficie del repositorio.

### Interpretacion

Estos puntos no rompen la arquitectura, pero si conviene tratarlos como decisiones visibles. Documentarlos evita que parezcan inconsistencias accidentales o que otros colaboradores abran capas paralelas sin querer.

## Criterios de evolucion

### Observacion

La arquitectura actual ya define suficientes slots para crecer sin abrir carpetas ad hoc ni mezclar niveles de responsabilidad.

### Evidencia

- Nuevo shell global, nuevo provider o nueva politica de routing: `src/App.tsx` y `src/layouts/`.
- Nuevo organismo acotado a una feature: `src/application/{feature}/components/`.
- Nuevo fragment acotado a una feature: `src/application/{feature}/components/fragments/`.
- Nuevo fragment reutilizable entre features: `src/components/fragments/`.
- Nuevo hook, helper, context o service de un feature: `src/application/{feature}/hooks`, `helpers`, `contexts` o `services`.
- Nuevo organismo reutilizable entre features: `src/components/core/`.
- Nuevo primitive o extension de shadcn: `src/components/ui/`.
- Nuevo estado global compartido: `src/zustand/{feature}/`.
- Nueva utilidad transversal: `src/hooks/`, `src/helpers/` o `src/lib/` segun nivel de abstraccion.
- Nuevo token runtime o nueva regla global de estilo: `src/index.css` y `tailwind.config.ts`.
- Nuevo asset publico o ajuste del documento base: `public/` e `index.html`.

### Interpretacion

Si cada cambio entra por el slot correcto, la arquitectura sigue siendo agnostica, legible y facil de extender. Si una pieza necesita renombrarse cuando cambia una pantalla concreta, probablemente esta ubicada en la capa equivocada.

## Documentacion relacionada

- [README.md](./README.md)
- [README.alpha.md](./README.alpha.md)
- [design-token.md](./design-token.md)
- [SEO.md](./SEO.md)
