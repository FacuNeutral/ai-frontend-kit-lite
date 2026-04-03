# StreamVault — Configuración SEO y Meta Tags

## Marca

**StreamVault** es la marca elegida para la plataforma de video en streaming. El dominio canónico es `https://streamvault.app/`.

---

## Meta tags definidos en `index.html`

### Básicos (HTML estándar)

| Meta | Valor | Propósito |
|---|---|---|
| `<title>` | StreamVault — Tu plataforma de video en streaming | Título que aparece en la pestaña del navegador y como enlace azul en los resultados de Google. |
| `description` | StreamVault es la plataforma de streaming donde descubrís, mirás y compartís los mejores videos... | Texto que Google muestra debajo del título en los resultados de búsqueda (snippet). |
| `author` | StreamVault | Identifica al autor/organización del sitio. |
| `keywords` | streaming, videos, plataforma, ver videos, contenido, entretenimiento | Palabras clave temáticas (bajo impacto en SEO moderno, pero útil para contexto). |
| `robots` | index, follow | Indica a los buscadores que indexen la página y sigan los enlaces. |
| `canonical` | https://streamvault.app/ | URL canónica para evitar contenido duplicado. |

### Cómo se ve en Google

```
StreamVault — Tu plataforma de video en streaming
https://streamvault.app/
StreamVault es la plataforma de streaming donde descubrís, mirás y compartís
los mejores videos. Contenido curado, búsqueda inteligente y una experiencia fluida.
```

---

### Open Graph (Facebook, LinkedIn, WhatsApp, etc.)

| Meta | Valor | Propósito |
|---|---|---|
| `og:title` | StreamVault — Tu plataforma de video en streaming | Título del card al compartir el link. |
| `og:description` | Descubrí, mirá y compartí los mejores videos en StreamVault... | Descripción en el card. |
| `og:type` | website | Tipo de contenido (website, article, video, etc.). |
| `og:url` | https://streamvault.app/ | URL canónica del recurso compartido. |
| `og:site_name` | StreamVault | Nombre del sitio que aparece en el card. |
| `og:locale` | es_AR | Idioma y región del contenido. |
| `og:image` | https://streamvault.app/og-cover.png | Imagen del card (1200×630px recomendado). |
| `og:image:width` | 1200 | Ancho de la imagen en px. |
| `og:image:height` | 630 | Alto de la imagen en px. |
| `og:image:alt` | StreamVault — Plataforma de video en streaming | Texto alternativo de la imagen. |

### Cómo luce al compartir en redes (Open Graph card)

```
┌──────────────────────────────────────────────┐
│  ┌────────────────────────────────────────┐  │
│  │                                        │  │
│  │          og-cover.png                  │  │
│  │          (1200 × 630)                  │  │
│  │                                        │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  streamvault.app                             │
│  StreamVault — Tu plataforma de video        │
│  en streaming                                │
│  Descubrí, mirá y compartí los mejores       │
│  videos en StreamVault.                      │
└──────────────────────────────────────────────┘
```

---

### Twitter Card

| Meta | Valor | Propósito |
|---|---|---|
| `twitter:card` | summary_large_image | Tipo de card: imagen grande con resumen. |
| `twitter:site` | @streamvault | Cuenta de Twitter/X del sitio. |
| `twitter:creator` | @streamvault | Cuenta del creador del contenido. |
| `twitter:title` | StreamVault — Tu plataforma de video en streaming | Título en el card de Twitter. |
| `twitter:description` | Descubrí, mirá y compartí los mejores videos en StreamVault. | Descripción en el card. |
| `twitter:image` | https://streamvault.app/og-cover.png | Imagen del card. |
| `twitter:image:alt` | StreamVault — Plataforma de video en streaming | Alt text de la imagen. |

### Cómo luce en Twitter/X

```
┌──────────────────────────────────────────────┐
│  ┌────────────────────────────────────────┐  │
│  │                                        │  │
│  │          og-cover.png                  │  │
│  │       (summary_large_image)            │  │
│  │                                        │  │
│  └────────────────────────────────────────┘  │
│  StreamVault — Tu plataforma de video        │
│  en streaming                                │
│  Descubrí, mirá y compartí los mejores       │
│  videos en StreamVault.                      │
│  streamvault.app                             │
└──────────────────────────────────────────────┘
```

---

## Pendientes

- [ ] Crear la imagen `public/og-cover.png` (1200×630px) con branding de StreamVault.
- [ ] Agregar un `favicon.ico` y `apple-touch-icon.png` con el logo de StreamVault.
- [ ] Si se implementan páginas dinámicas (ej: `/watch/:id`), generar meta tags por video con SSR o pre-rendering.
