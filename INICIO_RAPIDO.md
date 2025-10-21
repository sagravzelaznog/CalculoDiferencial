# 🚀 Guía de Inicio Rápido - Curso de Cálculo Diferencial

## ⚡ Inicio en 3 Pasos

### 1. Verificar Dependencias
```bash
python check_dependencies.py
```

### 2. Iniciar Servidor Local
```bash
python server.py
```

### 3. Abrir en Navegador
```
http://localhost:8000
```

---

## 📋 Archivos del Curso

### 🏠 Página Principal
- **`index.html`** - Sistema de autenticación y acceso al curso

### 📚 Módulos Interactivos
- **`modulo1_relaciones_funciones.html`** - Relaciones y Funciones
- **`modulo2_limites.html`** - Límites
- **`modulo3_continuidad.html`** - Continuidad
- **`modulo4_la_derivada.html`** - La Derivada
- **`modulo5_aplicaciones_derivada.html`** - Aplicaciones de la Derivada

### ⚙️ Archivos de Configuración
- **`firebase-config.js`** - Configuración de Firebase
- **`auth-manager.js`** - Gestión de autenticación
- **`config.js`** - Configuración general
- **`module-navigation.js`** - Navegación entre módulos

### 🛠️ Herramientas de Desarrollo
- **`server.py`** - Servidor HTTP local
- **`check_dependencies.py`** - Verificador de dependencias
- **`package.json`** - Configuración del proyecto

### 📖 Documentación
- **`README.md`** - Documentación principal
- **`INSTALACION.md`** - Guía de instalación
- **`README_MODULO1.md`** - Documentación del Módulo 1

---

## 🔧 Comandos Útiles

### Desarrollo
```bash
# Iniciar servidor de desarrollo
python server.py

# Verificar dependencias
python check_dependencies.py

# Servir con Node.js (alternativo)
npx serve .
```

### Navegación
- **Página principal**: `http://localhost:8000`
- **Módulo 1**: `http://localhost:8000/modulo1_relaciones_funciones.html`
- **Módulo 2**: `http://localhost:8000/modulo2_limites.html`
- **Módulo 3**: `http://localhost:8000/modulo3_continuidad.html`
- **Módulo 4**: `http://localhost:8000/modulo4_la_derivada.html`
- **Módulo 5**: `http://localhost:8000/modulo5_aplicaciones_derivada.html`

---

## 🎯 Características del Curso

### ✅ Funcionalidades Implementadas
- **Autenticación completa** con Firebase
- **5 módulos interactivos** con contenido didáctico
- **Navegación fluida** entre módulos
- **Sistema de progreso** por estudiante
- **Ejercicios interactivos** con retroalimentación
- **Gráficos dinámicos** con Chart.js
- **Notación matemática** con MathJax
- **Diseño responsive** con Bootstrap 5

### 🔐 Seguridad
- Autenticación basada en Firebase
- Control de acceso por roles
- Protección de datos de usuario
- Validación de formularios

### 📱 Compatibilidad
- ✅ Chrome, Firefox, Safari, Edge
- ✅ Dispositivos móviles
- ✅ Tablets
- ✅ PWA compatible

---

## 🆘 Solución de Problemas

### Error: "Firebase not initialized"
1. Verifica que `firebase-config.js` existe
2. Confirma que las credenciales son correctas
3. Revisa la consola del navegador (F12)

### Error: "Permission denied"
1. Revisa las reglas de Firestore
2. Confirma que Authentication está habilitado
3. Verifica que el usuario esté autenticado

### Los módulos no cargan
1. Ejecuta `python check_dependencies.py`
2. Verifica que todos los archivos HTML existen
3. Revisa la consola del navegador para errores

### Problemas de CORS
1. Usa el servidor local (`python server.py`)
2. No abras archivos directamente desde el sistema de archivos
3. Asegúrate de usar `http://localhost:8000`

---

## 📞 Soporte

Para problemas técnicos:
1. **Revisa la consola del navegador** (F12)
2. **Ejecuta el verificador de dependencias** (`python check_dependencies.py`)
3. **Verifica la configuración de Firebase**
4. **Confirma que todos los archivos están presentes**

---

## 🎉 ¡Listo para Usar!

El curso de Cálculo Diferencial está completamente funcional y listo para ser utilizado por estudiantes e instructores.

**¡Disfruta aprendiendo cálculo diferencial!** 📚✨
