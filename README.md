# Matrix Front Vue - Interseguro

Aplicación frontend para análisis de matrices con factorización QR, implementada con **Vue 3** + **TypeScript** + **Vite**

## 🏗️ Arquitectura

Este proyecto sigue una **arquitectura en capas** con separación de responsabilidades:

```
src/
├── components/        # Componentes Vue reutilizables (.vue)
│   ├── MatrixInput.vue
│   ├── MatrixStats.vue
│   └── ErrorMessage.vue
├── entities/          # Interfaces TypeScript (DTOs)
├── services/          # Lógica de negocio y llamadas a APIs
├── mappers/          # Transformación de datos
├── utils/            # Utilidades (logger, validators, environment)
├── assets/           # Estilos y recursos estáticos
└── tests/            # Pruebas unitarias
```

## 🚀 Tecnologías

- **Vue 3.4** (Composition API + `<script setup>`)
- **TypeScript** con strict mode
- **Vite 6** - Build tool ultra rápido
- **Axios** - Cliente HTTP
- **Vitest** + **Vue Test Utils** - Testing
- **ESLint** - Linting

## 📋 Características

✅ **Vue 3 Composition API**: Código más limpio y mantenible
✅ **TypeScript Estricto**: Type-safety completo
✅ **Arquitectura en Capas**: Components, Services, Entities, Mappers, Utils
✅ **Logging Estructurado**: Logger con sessionId para trazabilidad
✅ **Validación de Datos**: Validators + sanitización de inputs
✅ **Manejo de Errores**: Componente dedicado con feedback visual
✅ **Componentes Reactivos**: Vue's reactivity system
✅ **Pruebas Unitarias**: Vitest con >70% cobertura
✅ **UI Moderna**: Tema oscuro, responsive, accesible
✅ **Deploy en Vercel**: Configuración lista para producción

## 🔧 Instalación

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de producción local
npm run preview
```

## 📝 Variables de Entorno

Crear archivo `.env`:

```env
VITE_PORT_GO=http://localhost:8080
VITE_LOG_LEVEL=debug
```

## 🎨 Componentes Vue

### MatrixInput.vue
Componente para renderizar y editar matrices con v-model.

```vue
<MatrixInput
  :matrix="[[1, 2], [3, 4]]"
  :readonly="false"
  @update:matrix="handleUpdate"
/>
```

**Props:**
- `matrix: number[][]` - Matriz a mostrar
- `readonly?: boolean` - Modo solo lectura (default: false)

**Emits:**
- `update:matrix` - Emite cuando la matriz cambia

### MatrixStats.vue
Componente para mostrar estadísticas de una matriz.

```vue
<MatrixStats :stats="statsObject" />
```

**Props:**
- `stats: MatrixStatsEntity` - Estadísticas calculadas

### ErrorMessage.vue
Componente para mostrar mensajes de error con cierre.

```vue
<ErrorMessage
  message="Error al procesar"
  @close="handleClose"
/>
```

**Props:**
- `message: string` - Mensaje de error

**Emits:**
- `close` - Emite cuando se cierra el mensaje

## 🧪 Pruebas

```bash
# Ejecutar pruebas
npm test

# Ejecutar con cobertura
npm run test:coverage

# Modo watch
npm run test:watch
```

## 📊 Estructura de Servicios

### MatrixService

```typescript
const matrixService = new MatrixService();
const result = await matrixService.analyzeMatrix(matrix);
```

Características:
- ✅ Validación de matrices antes de enviar
- ✅ Manejo de errores con mensajes específicos
- ✅ Logging de todas las operaciones
- ✅ Timeout de 10 segundos
- ✅ TypeScript types completos

## 🔍 Validaciones

El sistema incluye validaciones robustas en `utils/validators.ts`:

- **isValidNumber**: Valida números
- **isValidMatrix**: Valida estructura de matriz
- **isValidMatrixSize**: Valida tamaño (2-10)
- **sanitizeNumber**: Sanitiza valores numéricos
- **sanitizeMatrix**: Sanitiza matrices completas

## 🎯 Flujo de Datos en Vue

1. Usuario ingresa matriz en `MatrixInput.vue`
2. Componente emite evento `update:matrix`
3. `App.vue` recibe cambios (reactividad)
4. `MatrixService` valida y envía al backend
5. Respuesta se mapea con `matrix.mapper`
6. Vue actualiza UI automáticamente (reactivity)

## 🚀 Deploy en Vercel

### Preparación

1. **Push a GitHub/GitLab/Bitbucket**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/matrix-front-vue.git
git push -u origin main
```

2. **Conectar con Vercel**

- Ve a [vercel.com](https://vercel.com)
- Click en "Import Project"
- Selecciona tu repositorio
- Vercel detectará automáticamente Vite

3. **Configurar Variables de Entorno en Vercel**

En el dashboard de Vercel, agregar:

```
VITE_PORT_GO=https://tu-api-backend.com
VITE_LOG_LEVEL=warn
```

4. **Deploy Automático**

Cada push a `main` desplegará automáticamente.

### Deploy Manual desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Configuración de Vercel

El archivo `vercel.json` ya está configurado:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

## 📚 Estándares de Código

- **Nomenclatura**: camelCase para variables/funciones, PascalCase para componentes
- **Composición**: Usar Composition API con `<script setup>`
- **Reactividad**: `ref` para primitivos, `reactive` para objetos complejos
- **Props**: Interfaces tipadas con `defineProps<Props>()`
- **Emits**: Tipados con `defineEmits<Emits>()`
- **Computed**: Para valores derivados
- **Logs**: Logger estructurado con sessionId

## 🎨 Estilos

- Tema oscuro optimizado
- CSS scoped en componentes Vue
- Estilos globales en `assets/styles/main.css`
- Responsive design
- Transiciones suaves de Vue

## 🔒 Seguridad

- ✅ Validación de todos los inputs
- ✅ Sanitización de datos numéricos
- ✅ Manejo seguro de errores
- ✅ Sin exposición de datos sensibles
- ✅ CORS configurado en requests

## 📦 Build Optimizado

Vite genera un build altamente optimizado:

```bash
npm run build
```

Características:
- Tree-shaking automático
- Code splitting
- Assets optimizados
- Source maps (configurables)
- Minificación con esbuild

## 🔧 Configuración Avanzada

### Alias de rutas

```typescript
import { logger } from '@/utils/logger';
import MatrixInput from '@/components/MatrixInput.vue';
```

El alias `@` apunta a `src/`.

### Vue DevTools

Instalar extensión de navegador para debugging:
- [Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

## 🤝 Contribuir

1. Seguir arquitectura en capas
2. Usar Composition API con `<script setup>`
3. Mantener cobertura de pruebas >70%
4. TypeScript estricto
5. Documentar componentes y funciones
6. Logs apropiados en operaciones

## 📊 Performance

Vue 3 + Vite proporciona:
- ⚡ Hot Module Replacement (HMR) instantáneo
- 📦 Build size optimizado (~50KB gzipped)
- 🚀 Carga inicial <1s
- 💨 Reactividad ultra rápida