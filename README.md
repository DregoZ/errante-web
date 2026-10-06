# Errante — Coctelería de Autor & Barra Móvil para Eventos

Sitio web comercial y catálogo interactivo para servicio profesional de coctelería premium para eventos (bodas, corporativos y celebraciones privadas). Desarrollado con Angular moderno (Standalone Architecture, Signals, SCSS y enrutamiento con lazy loading).

---

## 🍸 Características Principales

- **Arquitectura Standalone & Signals**: Componentes 100% standalone sin NgModules innecesarios y estado reactivo optimizado.
- **Catálogo Desacoplado**: Gestión de carta y eventos mediante modelos tipados y fuentes de datos estáticas (`src/assets/content/`).
- **Filtros Dinámicos**: Exploración y filtrado por categorías de cócteles en tiempo real sin recarga de página.
- **Páginas de Detalle & SEO**: URLs amigables (`/carta/:slug`) con metaetiquetas dinámicas, Open Graph y Schema.org.
- **Solicitud de Presupuesto**: Formulario reactivo validado con cálculo de referencias y desacoplamiento de servicio de envío.
- **Diseño Responsive & Accesible**: Estética premium (paleta obsidiana y dorados), contrastes WCAG y navegación móvil fluida.

---

## 🚀 Puesta en Marcha

### Prerrequisitos
- **Node.js** (v18.19+ o v20+)
- **npm** (v9+)

### Instalación
```bash
npm install
```

### Servidor de Desarrollo
Inicia el servidor local de desarrollo en `http://localhost:4200/`:
```bash
npm start
```

### Compilación para Producción
Genera los artefactos de producción optimizados en el directorio `dist/errante-web`:
```bash
npm run build
```

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/           # Modelos TypeScript y servicios (Cocktail, Event, Contact, SEO)
│   ├── features/       # Vistas principales (Home, Carta, Detalle, Eventos, Nosotros, Contacto)
│   ├── layout/         # Componentes estructurales (Header con menú móvil, Footer)
│   ├── shared/         # Componentes UI reutilizables (Cards, Filtros, Galería Lightbox, CTA)
│   ├── app.config.ts   # Configuración de proveedores y enrutamiento
│   └── app.routes.ts   # Definición de rutas con lazy loading
├── assets/
│   ├── content/        # Datos estructurados en JSON (cocktails.json, events.json, site.json)
│   └── images/         # Recursos gráficos e imágenes
└── styles.scss         # Variables de diseño, tipografía y utilidades globales
```

---

## 📄 Licencia
Privado / Todos los derechos reservados para Errante Coctelería.
