# 🚀 Guía de Deploy en Vercel

Esta guía te ayudará a desplegar tu aplicación Vue + Vite en Vercel en minutos.

## ✅ Pre-requisitos

- Cuenta en [GitHub](https://github.com) (o GitLab/Bitbucket)
- Cuenta en [Vercel](https://vercel.com) (gratis)
- Repositorio Git del proyecto

## 📦 Paso 1: Preparar el Proyecto

### 1.1 Verificar archivos necesarios

Asegúrate de tener estos archivos:

- ✅ `vercel.json` - Configuración de Vercel
- ✅ `.gitignore` - Ignorar node_modules y dist
- ✅ `package.json` - Con script `build`
- ✅ `.env.example` - Template de variables

### 1.2 Configurar variables de entorno locales

```bash
cp .env.example .env
```

Editar `.env`:
```env
VITE_PORT_GO=http://localhost:8080
VITE_LOG_LEVEL=debug
```

### 1.3 Probar build localmente

```bash
npm install
npm run build
npm run preview
```

Si funciona correctamente, continuar.

## 🐙 Paso 2: Subir a GitHub

### 2.1 Inicializar Git (si no está inicializado)

```bash
git init
git add .
git commit -m "Initial commit - Vue Matrix App"
```

### 2.2 Crear repositorio en GitHub

1. Ve a [github.com/new](https://github.com/new)
2. Nombre: `matrix-front-vue`
3. Descripción: `Frontend Vue para análisis de matrices QR`
4. Visibilidad: Public o Private
5. Click "Create repository"

### 2.3 Conectar y push

```bash
git remote add origin https://github.com/TU-USUARIO/matrix-front-vue.git
git branch -M main
git push -u origin main
```

## ☁️ Paso 3: Deploy en Vercel

### Opción A: Deploy desde Dashboard (Recomendado)

1. **Login en Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Click "Continue with GitHub"
   - Autoriza Vercel

2. **Importar Proyecto**
   - Click "Add New Project"
   - Click "Import Git Repository"
   - Busca `matrix-front-vue`
   - Click "Import"

3. **Configurar Proyecto**
   
   Vercel detectará automáticamente:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Variables de Entorno**
   
   Click "Environment Variables" y agregar:
   
   ```
   Name: VITE_PORT_GO
   Value: https://tu-backend-api.com
   
   Name: VITE_LOG_LEVEL
   Value: warn
   ```

5. **Deploy**
   - Click "Deploy"
   - Espera 1-2 minutos
   - ✅ ¡Tu app está en línea!

### Opción B: Deploy desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (seguir prompts)
vercel

# Deploy a producción
vercel --prod
```

## 🌍 Paso 4: Verificar Deploy

Tu aplicación estará disponible en:
```
https://matrix-front-vue.vercel.app
```

O con dominio custom:
```
https://tu-dominio.com
```

### Verificar funcionalidad:

1. ✅ La página carga correctamente
2. ✅ Puedes ingresar una matriz
3. ✅ El botón "Enviar Matriz" funciona
4. ✅ Se muestran resultados (si el backend está disponible)
5. ✅ Los estilos se ven correctos
6. ✅ No hay errores en consola del navegador

## 🔄 Paso 5: Deploy Automático

Vercel configurará **deploy automático**:

- ✅ Push a `main` → Deploy a producción
- ✅ Pull request → Deploy preview
- ✅ Rollback automático si falla

### Hacer cambios:

```bash
# Hacer cambios en el código
git add .
git commit -m "feat: mejora en UI"
git push

# Vercel desplegará automáticamente
```

## 🎨 Paso 6: Configuración Avanzada

### 6.1 Dominio Personalizado

1. En dashboard de Vercel, click en tu proyecto
2. Settings → Domains
3. Agregar tu dominio (ej: `matrix.tuempresa.com`)
4. Configurar DNS según instrucciones

### 6.2 Variables de Entorno por Ambiente

```bash
# Production
VITE_PORT_GO=https://api.produccion.com
VITE_LOG_LEVEL=error

# Preview
VITE_PORT_GO=https://api.staging.com
VITE_LOG_LEVEL=warn

# Development
VITE_PORT_GO=http://localhost:8080
VITE_LOG_LEVEL=debug
```

### 6.3 Analytics (Opcional)

En Vercel dashboard:
- Settings → Analytics
- Enable Analytics
- Ver métricas de performance

## 🐛 Troubleshooting

### Error: "Build failed"

```bash
# Limpiar cache
rm -rf node_modules dist
npm install
npm run build
```

### Error: "Cannot find module"

Verificar `package.json` tiene todas las dependencias:
```json
{
  "dependencies": {
    "axios": "^1.7.9",
    "vue": "^3.4.21"
  }
}
```

### Error: Variables de entorno no funcionan

- En Vercel, deben empezar con `VITE_`
- Reiniciar deploy después de agregar variables
- Verificar no hay typos

### Error: 404 en rutas

Verificar `vercel.json` tiene:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## 📊 Monitoreo

### Logs en tiempo real

```bash
vercel logs
```

### Inspeccionar deploy

```bash
vercel inspect
```

## 🔒 Seguridad

### Variables sensibles

❌ NO commitear `.env` al repositorio
✅ Usar variables de entorno de Vercel
✅ Mantener `.env` en `.gitignore`

### CORS

Si tienes problemas de CORS, configurar en tu backend:

```javascript
// Backend
app.use(cors({
  origin: ['https://matrix-front-vue.vercel.app']
}));
```

## 📈 Performance

Vercel optimiza automáticamente:

- ✅ Edge Network global (CDN)
- ✅ Compresión gzip/brotli
- ✅ HTTP/2
- ✅ Cache inteligente
- ✅ Image optimization

## 🎯 Checklist Final

Antes de considerar el deploy completo:

- [ ] Build local exitoso
- [ ] Tests pasando (`npm test`)
- [ ] Variables de entorno configuradas
- [ ] Backend API accesible
- [ ] Dominio configurado (opcional)
- [ ] Analytics habilitado (opcional)
- [ ] Documentación actualizada
- [ ] README con URL del deploy

## 📚 Recursos

- [Vercel Docs](https://vercel.com/docs)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)
- [Vue Deployment](https://vuejs.org/guide/best-practices/production-deployment.html)

## 💡 Tips

1. **Deploy Preview**: Cada PR crea un deploy preview automático
2. **Rollback**: Puedes volver a cualquier deploy anterior en 1 click
3. **Branches**: Configura diferentes branches para staging/production
4. **Logs**: Vercel guarda logs de cada deploy
5. **Cache**: Vercel cachea builds, deployments son más rápidos

## 🎉 ¡Listo!

Tu aplicación Vue está desplegada en Vercel con:
- ✅ Deploy automático en cada push
- ✅ HTTPS gratis
- ✅ CDN global
- ✅ Preview deployments
- ✅ Zero configuration

**URL de producción**: `https://matrix-front-vue.vercel.app`

---

¿Preguntas? Consulta [Vercel Support](https://vercel.com/support)
