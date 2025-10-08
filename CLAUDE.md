# Guía de Contexto para Claude Code - Million Frontend

## 📋 Descripción del Proyecto

**Million Frontend** es una aplicación web para la búsqueda y visualización de propiedades inmobiliarias de lujo. El proyecto utiliza Next.js 15 con App Router, React 19, TypeScript, y Tailwind CSS.

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas

```
million_frontend/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── (index)/           # Grupo de rutas para la página principal
│   │   │   ├── components/    # Componentes específicos de la página principal
│   │   │   ├── models/        # Interfaces y tipos TypeScript
│   │   │   ├── services/      # Servicios de API
│   │   │   └── page.tsx       # Página principal
│   │   ├── [id]/              # Ruta dinámica para detalle de propiedad
│   │   └── layout.tsx         # Layout raíz
│   ├── components/            # Componentes reutilizables globales
│   ├── ui/                    # Configuración de UI (fuentes, temas)
│   ├── utils/                 # Utilidades y helpers
│   └── lib/                   # Librerías y configuraciones
├── public/                    # Recursos estáticos
└── package.json
```

### Tecnologías Clave

- **Next.js 15.5.4**: Framework principal con App Router y Server Components
- **React 19.1.0**: Biblioteca UI con nuevas características de Suspense
- **TypeScript 5.9.3**: Tipado estático
- **Tailwind CSS 4.1.14**: Estilos utility-first
- **Formik 2.4.6**: Gestión de formularios
- **Biome 2.2.0**: Linter y formatter (reemplaza ESLint + Prettier)
- **Turbopack**: Bundler ultrarrápido para desarrollo

## 🎯 Características Principales

### 1. Sistema de Filtrado de Propiedades

- **Ubicación**: `src/app/(index)/components/Filters.tsx`
- **Filtros disponibles**:
  - Rango de precios (minPrice, maxPrice)
  - Nombre de propiedad
  - Dirección
- **Gestión de estado**: URL Search Params (permite compartir enlaces con filtros)
- **Funcionalidad**: Los filtros se pueden eliminar individualmente con botones "x"

### 2. Búsqueda y Listado

- **Search**: `src/app/(index)/components/Search.tsx` - Formulario de búsqueda
- **Properties**: `src/app/(index)/components/Properties.tsx` - Server Component que renderiza el grid
- **PropertyCard**: `src/app/(index)/components/PropertyCard.tsx` - Tarjeta individual
- **PropertiesSkeleton**: Loading state durante la carga de datos

### 3. Server Components y Suspense

- La página principal usa Suspense para carga asíncrona
- Properties es un Server Component que hace fetch de datos
- Skeleton loader muestra estado de carga

## 🔌 API y Servicios

### Backend Connection

- **URL Base**: `http://localhost:5004`
- **Endpoint principal**: `POST /api/properties`
- **Servicio**: `src/app/(index)/services/property.service.ts`

### Modelo de Datos

```typescript
interface Property {
  idOwner: string;    // ID único de la propiedad
  name: string;       // Nombre de la propiedad
  address: string;    // Dirección
  price: number;      // Precio en USD
  image: string;      // URL de la imagen
}

interface PropertyQuery {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
}
```

## 🎨 Estilos y Diseño

### Sistema de Diseño

- **Responsive**: Mobile-first con breakpoints de Tailwind
- **Fuentes**: Cairo (títulos) y Montserrat (cuerpo) - configuradas en `src/ui/fonts.ts`
- **Grid**: Auto-fit responsive grid para tarjetas de propiedades
- **Animaciones**: tw-animate-css para animaciones

### Componentes Reutilizables

- **Input**: `src/components/Input.tsx` - Input estilizado reutilizable
- **Slider**: `src/components/Slider.tsx` - Slider para rango de precios
- **Header**: `src/components/Header.tsx` - Encabezado de la aplicación

## 📝 Convenciones de Código

### Estilo de Código

- **Linter**: Biome (configurado en `biome.json`)
- **Comandos**:
  - `npm run lint` - Verificar código
  - `npm run format` - Formatear código

### Patrones Importantes

1. **Server Components por defecto**: Los componentes en app/ son Server Components
2. **"use client"**: Agregar solo cuando se necesiten hooks o interactividad
3. **Async/Await**: Para Server Components que hacen fetch de datos
4. **URL Search Params**: Para filtros y estado compartible

### Nomenclatura

- **Componentes**: PascalCase (ej: `PropertyCard.tsx`)
- **Servicios**: camelCase con sufijo `.service.ts`
- **Modelos**: camelCase con sufijo `.model.ts`
- **Utilidades**: camelCase en carpeta `utils/`

## 🚀 Scripts de Desarrollo

```bash
npm run dev      # Desarrollo con Turbopack (puerto 3000)
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Verificar código con Biome
npm run format   # Formatear código con Biome
```

## 🔍 Áreas de Mejora Conocidas

1. **Página de detalle**: `src/app/[id]/page.tsx` está pendiente de implementación
2. **Variables de entorno**: No hay archivo `.env.example` configurado
3. **Manejo de errores**: Falta implementar error boundaries y manejo de errores de API
4. **Testing**: No hay tests configurados
5. **Caché**: Se podría optimizar el caché de datos con Next.js

## 🎯 Guías para Claude

### Al Agregar Nuevas Características

1. **Verificar la estructura**: ¿Es un componente global o específico de una ruta?
2. **Server vs Client**: ¿Necesita interactividad o puede ser Server Component?
3. **Tipado**: Siempre usar TypeScript, agregar tipos en `models/` si es necesario
4. **Responsive**: Asegurar que funcione en mobile y desktop
5. **Formatear**: Ejecutar `npm run format` después de cambios

### Al Hacer Refactoring

1. **Mantener la estructura**: Respetar la separación de components/services/models
2. **No romper Server Components**: Evitar agregar "use client" innecesariamente
3. **Preservar filtros**: El sistema de URL params es importante para UX
4. **Actualizar tipos**: Si cambias interfaces, verificar todos los usos

### Al Debuggear

1. **Console.log**: Hay un `console.log(data)` en `property.service.ts:18`
2. **API**: Verificar que el backend esté corriendo en puerto 5004
3. **Turbopack**: A veces reiniciar el servidor resuelve problemas de caché
4. **Biome**: Los errores de linter pueden causar problemas de build

## 📦 Dependencias Importantes

### Producción
- `class-variance-authority`: Para variantes de componentes
- `clsx` + `tailwind-merge`: Para manejo de clases CSS
- `formik`: Gestión de formularios
- `lucide-react`: Iconos SVG

### Desarrollo
- `@biomejs/biome`: Linting y formatting
- `@tailwindcss/postcss`: Compilación de Tailwind
- `tw-animate-css`: Animaciones con Tailwind

## 🔐 Consideraciones de Seguridad

- No hay autenticación implementada actualmente
- Las llamadas a API no incluyen headers de autenticación
- No hay validación de entrada en el lado del servidor

## 🌐 Despliegue

- **Plataforma recomendada**: Vercel (optimizado para Next.js)
- **Variables de entorno necesarias**: Configurar URL de API en producción
- **Build**: Usar `npm run build` antes de desplegar

---

## 💡 Notas Adicionales

- El proyecto usa **Turbopack** en desarrollo, que es más rápido que Webpack
- La aplicación está en **español** - mantener este idioma en textos y comentarios
- El diseño es **mobile-responsive** con enfoque en desktop para propiedades de lujo
- Los precios se formatean con la utilidad `formatPrice` en `src/utils/priceFormater.ts`
