# Million Frontend

Aplicación web para la búsqueda y visualización de propiedades inmobiliarias de lujo, construida con Next.js 15 y React 19.

## 🚀 Características

- **Búsqueda avanzada**: Filtrado de propiedades por nombre, dirección y rango de precios
- **Interfaz responsiva**: Diseño optimizado para dispositivos móviles y desktop
- **Renderizado del lado del servidor**: Optimización de rendimiento con Next.js App Router
- **Suspense**: Carga asíncrona de componentes con skeleton loaders
- **Turbopack**: Compilación ultrarrápida en desarrollo

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15.5.4
- **Biblioteca UI**: React 19.1.0
- **Lenguaje**: TypeScript 5.9.3
- **Estilos**: Tailwind CSS 4.1.14
- **Formularios**: Formik 2.4.6
- **Iconos**: Lucide React 0.545.0
- **Utilidades**: clsx, tailwind-merge, class-variance-authority
- **Linter/Formatter**: Biome 2.2.0
- **Testing**: Vitest 3.2.4, React Testing Library 16.3.0

## 📋 Requisitos Previos

- Node.js 20.x o superior
- npm, yarn, pnpm o bun
- API backend ejecutándose en `http://localhost:5004`

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd million_frontend
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
# o
pnpm install
# o
bun install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
million_frontend/
├── src/
│   ├── app/
│   │   ├── (index)/
│   │   │   ├── components/
│   │   │   │   ├── Filters.tsx          # Filtros de búsqueda
│   │   │   │   ├── Properties.tsx       # Listado de propiedades
│   │   │   │   ├── PropertyCard.tsx     # Tarjeta individual de propiedad
│   │   │   │   ├── PropertiesSkeleton.tsx  # Loading state
│   │   │   │   └── Search.tsx           # Buscador
│   │   │   ├── models/
│   │   │   │   └── property.model.ts    # Interfaces TypeScript
│   │   │   ├── services/
│   │   │   │   └── property.service.ts  # Llamadas a API
│   │   │   └── page.tsx                 # Página principal
│   │   ├── [id]/
│   │   │   └── page.tsx                 # Página de detalle de propiedad
│   │   └── layout.tsx                   # Layout principal
│   ├── components/
│   │   ├── Header.tsx                   # Encabezado
│   │   ├── Input.tsx                    # Input reutilizable
│   │   └── Slider.tsx                   # Slider de precios
│   ├── ui/
│   │   └── fonts.ts                     # Configuración de fuentes
│   ├── utils/
│   │   └── priceFormater.ts             # Utilidad para formatear precios
│   └── lib/
│       └── utils.ts                     # Utilidades generales
├── public/                              # Recursos estáticos
└── package.json
```

## 🎨 Características Principales

### Filtrado de Propiedades

La aplicación permite filtrar propiedades mediante:
- **Rango de precios**: Desde $1M hasta cualquier límite superior
- **Nombre**: Búsqueda por nombre de propiedad
- **Dirección**: Búsqueda por ubicación

Los filtros se gestionan mediante URL search params, permitiendo compartir enlaces con filtros aplicados.

### Componentes Principales

- **`Properties`** (`src/app/(index)/components/Properties.tsx`): Renderiza el grid de propiedades
- **`Filters`** (`src/app/(index)/components/Filters.tsx`): Gestiona los filtros activos
- **`Search`** (`src/app/(index)/components/Search.tsx`): Formulario de búsqueda
- **`PropertyCard`** (`src/app/(index)/components/PropertyCard.tsx`): Tarjeta de propiedad individual

## 📜 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo con Turbopack
- `npm run build` - Compila la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter con Biome
- `npm run format` - Formatea el código con Biome
- `npm test` - Ejecuta los tests unitarios
- `npm run test:watch` - Ejecuta los tests en modo watch
- `npm run test:ui` - Abre la interfaz de Vitest
- `npm run test:coverage` - Genera reporte de cobertura

## 🔌 API

La aplicación se conecta a un backend REST en `http://localhost:5004/api/properties`.

### Endpoint principal:
```
POST /api/properties
Content-Type: application/json

{
  "minPrice": number,
  "maxPrice": number,
  "name": string,
  "address": string
}
```

## 🎯 Modelo de Datos

```typescript
interface Property {
  idOwner: string;
  name: string;
  address: string;
  price: number;
  image: string;
}
```

## 🚀 Despliegue

La forma más sencilla de desplegar esta aplicación es usando [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<url-del-repositorio>)

Consulta la [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.

## 📝 Configuración de Código

El proyecto usa **Biome** para linting y formateo. La configuración se encuentra en `biome.json`.

## 🧪 Testing

El proyecto utiliza **Vitest** y **React Testing Library** para tests unitarios.

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ver UI interactiva de tests
npm run test:ui

# Generar reporte de cobertura
npm run test:coverage
```

### Estructura de Tests

Los tests se ubican junto a los archivos que prueban con la extensión `.test.ts` o `.test.tsx`:

- `src/utils/priceFormater.test.ts` - Tests de utilidades
- `src/app/(index)/components/PropertyCard.test.tsx` - Tests de componentes
- `src/app/(index)/services/property.service.test.ts` - Tests de servicios

### Convenciones

- Usar `describe` para agrupar tests relacionados
- Nombrar tests de forma descriptiva con `it("should...")`
- Mockear dependencias externas (fetch, Next.js hooks)
- Usar `@testing-library/react` para tests de componentes
- Verificar tanto casos exitosos como casos de error

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado.

## 📞 Soporte

Para soporte, abre un issue en el repositorio.
