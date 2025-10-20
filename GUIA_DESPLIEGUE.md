# GUÍA DE DESPLIEGUE EN NETLIFY

## PREPARACIÓN DEL PROYECTO

### 1. Configuración Inicial

```bash
# Clonar el repositorio
git clone <tu-repositorio>
cd curso-calculo-diferencial

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
cp env.example .env.local
```

### 2. Configuración de Firebase

#### Crear Proyecto en Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Habilita Authentication y Firestore Database
4. Configura las reglas de seguridad

#### Configurar Authentication
```javascript
// En Firebase Console > Authentication > Sign-in method
// Habilitar: Email/Password
// Configurar dominios autorizados
```

#### Configurar Firestore
```javascript
// Reglas de Firestore (firestore.rules)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuarios pueden leer/escribir sus propios datos
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Progreso del usuario
    match /userProgress/{progressId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    // Módulos del curso (solo lectura)
    match /modules/{moduleId} {
      allow read: if request.auth != null;
    }
    
    // Ejercicios (solo lectura)
    match /exercises/{exerciseId} {
      allow read: if request.auth != null;
    }
  }
}
```

### 3. Variables de Entorno

Configura las siguientes variables en Netlify:

```bash
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=tu_api_key_aqui
REACT_APP_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=tu_proyecto_id
REACT_APP_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
REACT_APP_FIREBASE_APP_ID=tu_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=tu_measurement_id

# Application Configuration
REACT_APP_APP_NAME=Curso de Cálculo Diferencial
REACT_APP_ENVIRONMENT=production
REACT_APP_AUTH_DOMAIN_WHITELIST=estudiante.edu.mx,profesor.edu.mx,admin.edu.mx
```

---

## DESPLIEGUE EN NETLIFY

### Método 1: Despliegue desde GitHub

1. **Conectar Repositorio**
   - Ve a [Netlify Dashboard](https://app.netlify.com/)
   - Click en "New site from Git"
   - Conecta tu repositorio de GitHub

2. **Configurar Build Settings**
   ```
   Build command: npm run build
   Publish directory: build
   ```

3. **Configurar Variables de Entorno**
   - Ve a Site settings > Environment variables
   - Agrega todas las variables de Firebase

4. **Desplegar**
   - Click en "Deploy site"
   - Netlify construirá y desplegará automáticamente

### Método 2: Despliegue Manual

```bash
# Construir el proyecto
npm run build

# Instalar Netlify CLI
npm install -g netlify-cli

# Login en Netlify
netlify login

# Desplegar
netlify deploy --prod --dir=build
```

### Método 3: Drag & Drop

1. Ejecuta `npm run build`
2. Ve a Netlify Dashboard
3. Arrastra la carpeta `build` a la zona de deploy

---

## CONFIGURACIÓN POST-DESPLIEGUE

### 1. Dominio Personalizado

```bash
# En Netlify Dashboard > Domain settings
# Agregar dominio personalizado
# Configurar DNS records:
# CNAME: www -> tu-sitio.netlify.app
# A: @ -> 75.2.60.5
```

### 2. HTTPS

- Netlify proporciona HTTPS automáticamente
- Para dominios personalizados, configura SSL en Domain settings

### 3. Formularios

```javascript
// Para formularios de contacto (opcional)
// Netlify detecta automáticamente formularios HTML
// No requiere configuración adicional
```

### 4. Redirects y Headers

El archivo `netlify.toml` ya está configurado con:
- Redirects para SPA
- Headers de seguridad
- Configuración de caché

---

## MONITOREO Y MANTENIMIENTO

### 1. Analytics

```javascript
// Firebase Analytics ya está configurado
// Ver métricas en Firebase Console > Analytics
```

### 2. Error Tracking

```javascript
// Para tracking de errores, considera agregar:
// - Sentry
// - LogRocket
// - Bugsnag
```

### 3. Performance Monitoring

```javascript
// Netlify proporciona métricas básicas
// Para análisis avanzado, considera:
// - Google PageSpeed Insights
// - WebPageTest
// - Lighthouse CI
```

---

## COMANDOS ÚTILES

### Desarrollo Local

```bash
# Iniciar servidor de desarrollo
npm start

# Construir para producción
npm run build

# Ejecutar tests
npm test

# Linting
npm run lint
npm run lint:fix

# Type checking
npm run type-check
```

### Netlify CLI

```bash
# Login
netlify login

# Ver sitios
netlify sites:list

# Ver logs
netlify logs

# Abrir sitio
netlify open

# Desplegar preview
netlify deploy

# Desplegar producción
netlify deploy --prod
```

---

## SOLUCIÓN DE PROBLEMAS

### Errores Comunes

1. **Build Fails**
   ```bash
   # Verificar variables de entorno
   # Revisar logs de build en Netlify
   # Verificar que todas las dependencias estén instaladas
   ```

2. **Firebase Auth No Funciona**
   ```bash
   # Verificar configuración de dominios autorizados
   # Revisar reglas de Firestore
   # Confirmar variables de entorno
   ```

3. **Páginas No Cargan**
   ```bash
   # Verificar configuración de redirects en netlify.toml
   # Confirmar que el build se completó correctamente
   ```

### Logs y Debugging

```bash
# Ver logs en tiempo real
netlify logs --site=tu-sitio-id

# Debug local
REACT_APP_DEBUG_MODE=true npm start
```

---

## OPTIMIZACIONES

### 1. Performance

```javascript
// Ya implementado:
// - Code splitting con React.lazy
// - Optimización de imágenes
// - Compresión gzip
// - Caché de archivos estáticos
```

### 2. SEO

```html
<!-- En public/index.html -->
<meta name="description" content="Curso interactivo de cálculo diferencial">
<meta name="keywords" content="cálculo, matemáticas, educación">
<meta property="og:title" content="Curso de Cálculo Diferencial">
<meta property="og:description" content="Aprende cálculo diferencial de manera interactiva">
```

### 3. PWA (Progressive Web App)

```javascript
// Para convertir en PWA:
// 1. Agregar service worker
// 2. Configurar manifest.json
// 3. Implementar offline functionality
```

---

## SEGURIDAD

### 1. Headers de Seguridad

Ya configurados en `netlify.toml`:
- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Content-Security-Policy

### 2. Autenticación

- Solo emails autorizados pueden registrarse
- Sesiones con timeout automático
- Validación de dominios

### 3. Datos Sensibles

- Variables de entorno no expuestas
- Reglas de Firestore restrictivas
- Validación en frontend y backend

---

## BACKUP Y RECUPERACIÓN

### 1. Código Fuente

```bash
# Backup automático con Git
git push origin main
```

### 2. Base de Datos

```bash
# Firebase Firestore backup automático
# Configurar en Firebase Console > Backup
```

### 3. Configuración

```bash
# Exportar configuración de Netlify
netlify sites:list
netlify sites:get --site=tu-sitio-id
```

---

## ESCALABILIDAD

### 1. CDN

- Netlify proporciona CDN global automáticamente
- Archivos estáticos servidos desde múltiples ubicaciones

### 2. Caché

```toml
# Configurado en netlify.toml
[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 3. Monitoreo

```javascript
// Implementar métricas de performance
// Monitorear errores en producción
// Tracking de uso de características
```

---

## CONCLUSIÓN

Esta guía proporciona todos los pasos necesarios para desplegar exitosamente el curso de cálculo diferencial en Netlify. El proyecto está optimizado para:

- **Rendimiento**: Carga rápida y experiencia fluida
- **Seguridad**: Autenticación robusta y protección de datos
- **Escalabilidad**: Arquitectura preparada para crecimiento
- **Mantenibilidad**: Código limpio y documentado

Para soporte adicional, consulta la documentación oficial de [Netlify](https://docs.netlify.com/) y [Firebase](https://firebase.google.com/docs).
