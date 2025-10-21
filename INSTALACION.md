# Guía de Instalación Rápida - Sistema de Control de Acceso

## 🚀 Instalación en 5 Pasos

### Paso 1: Configurar Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto: "calculo-diferencial"
3. Habilita **Authentication** > Sign-in method > **Email/Password**
4. Habilita **Firestore Database** (modo de prueba)

### Paso 2: Obtener Credenciales
1. Ve a Project Settings > General
2. Haz clic en "Add app" > Web app
3. Copia la configuración de Firebase

### Paso 3: Configurar Archivos
1. Copia `firebase-config.example.js` como `firebase-config.js`
2. Reemplaza los valores con tus credenciales reales
3. Copia las reglas de `firestore-rules.txt` en Firebase Console > Firestore > Rules

### Paso 4: Crear Usuario Administrador
1. Abre `index.html` en tu navegador
2. Regístrate con tu email
3. En Firebase Console > Firestore, busca tu usuario
4. Cambia el campo `role` de `student` a `admin`

### Paso 5: ¡Listo!
- Los estudiantes pueden registrarse y acceder al curso
- Los administradores pueden gestionar usuarios
- El progreso se guarda automáticamente

## 🔧 Configuración Avanzada

### Personalizar Módulos
Edita `index.html` línea 200+ para agregar/modificar módulos:

```html
<div class="module-card" data-module="6">
    <div class="module-title">
        <i class="fas fa-chart-bar"></i> Módulo 6: Nuevo Tema
    </div>
    <div class="module-description">
        Descripción del nuevo módulo
    </div>
    <div class="progress-bar">
        <div class="progress-fill" style="width: 0%"></div>
    </div>
</div>
```

### Cambiar Colores del Tema
Edita los estilos CSS en `index.html`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #28a745;
    --danger-color: #dc3545;
}
```

### Agregar Nuevos Roles
En `auth-manager.js`, modifica la función de registro:

```javascript
role: userData.role || 'student', // Agregar validación de roles
```

## 📊 Funcionalidades Incluidas

✅ **Autenticación Completa**
- Login/Registro con email
- Recuperación de contraseña
- Logout seguro

✅ **Control de Acceso**
- Solo usuarios autenticados ven el contenido
- Roles de estudiante y administrador
- Protección de archivos PDF

✅ **Seguimiento de Progreso**
- Progreso por módulo
- Persistencia en Firestore
- Visualización en tiempo real

✅ **Panel de Administración**
- Ver todos los usuarios
- Exportar datos a CSV
- Gestión de roles

✅ **Interfaz Moderna**
- Diseño responsive
- Bootstrap 5
- Iconos Font Awesome
- Animaciones suaves

## 🛡️ Seguridad

- Contraseñas hasheadas por Firebase
- Tokens JWT para autenticación
- Reglas de Firestore para protección de datos
- Validación de roles en cliente y servidor

## 📱 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Dispositivos móviles
- ✅ Tablets
- ✅ PWA compatible

## 🆘 Solución de Problemas

### Error: "Firebase not initialized"
- Verifica que `firebase-config.js` existe
- Confirma que las credenciales son correctas

### Error: "Permission denied"
- Revisa las reglas de Firestore
- Confirma que Authentication está habilitado

### Los PDFs no se abren
- Verifica que los archivos PDF existen
- Confirma permisos de lectura del navegador

## 📞 Soporte

Para problemas técnicos:
1. Revisa la consola del navegador (F12)
2. Verifica la configuración de Firebase
3. Confirma que todos los archivos están presentes

---

**¡El sistema está listo para usar!** 🎉
