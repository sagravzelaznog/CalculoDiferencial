# 🧮 Curso Interactivo de Cálculo Diferencial

## 🚀 Inicio Rápido

```bash
# 1. Verificar dependencias
python check_dependencies.py

# 2. Iniciar servidor local
python server.py

# 3. Abrir en navegador
# http://localhost:8000
```

## 📚 Módulos del Curso

### ✅ Módulos Completados
- **Módulo 1**: [Relaciones y Funciones](modulo1_relaciones_funciones.html) - Conceptos fundamentales
- **Módulo 2**: [Límites](modulo2_limites.html) - Fundamentos del cálculo
- **Módulo 3**: [Continuidad](modulo3_continuidad.html) - Análisis de funciones
- **Módulo 4**: [La Derivada](modulo4_la_derivada.html) - Técnicas de derivación
- **Módulo 5**: [Aplicaciones](modulo5_aplicaciones_derivada.html) - Optimización y análisis

## 🎯 Características Principales

### 🔐 Sistema de Autenticación
- **Login/Registro** con Firebase Authentication
- **Control de acceso** por roles (estudiante/admin)
- **Recuperación de contraseña** automática
- **Seguimiento de progreso** por usuario

### 📖 Contenido Interactivo
- **Explicaciones teóricas** con ejemplos visuales
- **Ejercicios interactivos** con retroalimentación inmediata
- **Gráficos dinámicos** con Chart.js
- **Notación matemática** con MathJax
- **Navegación fluida** entre módulos

### 🛠️ Tecnologías Utilizadas
- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Framework**: Bootstrap 5
- **Backend**: Firebase (Authentication + Firestore)
- **Librerías**: Chart.js, MathJax, Font Awesome
- **Servidor**: Python HTTP Server

## 📁 Estructura del Proyecto

```
calculo diferencial/
├── 📄 index.html                          # Página principal
├── 📚 modulo1_relaciones_funciones.html   # Módulo 1
├── 📚 modulo2_limites.html                # Módulo 2
├── 📚 modulo3_continuidad.html            # Módulo 3
├── 📚 modulo4_la_derivada.html            # Módulo 4
├── 📚 modulo5_aplicaciones_derivada.html  # Módulo 5
├── ⚙️ firebase-config.js                   # Configuración Firebase
├── ⚙️ auth-manager.js                      # Gestión de autenticación
├── ⚙️ config.js                           # Configuración general
├── ⚙️ module-navigation.js                # Navegación entre módulos
├── 🛠️ server.py                           # Servidor local
├── 🛠️ check_dependencies.py               # Verificador de dependencias
├── 📦 package.json                        # Configuración del proyecto
└── 📖 Documentación/
    ├── README.md
    ├── INSTALACION.md
    ├── INICIO_RAPIDO.md
    └── README_MODULO1.md
```

## 🔧 Instalación y Configuración

### Requisitos Previos
- Python 3.6+ (para servidor local)
- Navegador web moderno
- Conexión a internet (para recursos CDN)

### Configuración de Firebase
1. Crear proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilitar Authentication (Email/Password)
3. Habilitar Firestore Database
4. Copiar credenciales a `firebase-config.js`

### Instalación Local
```bash
# Clonar o descargar el proyecto
cd "calculo diferencial"

# Verificar dependencias
python check_dependencies.py

# Iniciar servidor
python server.py
```

## 🎓 Uso del Curso

### Para Estudiantes
1. **Registrarse** con email y contraseña
2. **Navegar** por los módulos secuencialmente
3. **Completar** ejercicios y actividades
4. **Seguir** el progreso personal

### Para Instructores
1. **Acceder** como administrador
2. **Monitorear** progreso de estudiantes
3. **Exportar** datos de usuarios
4. **Personalizar** contenido según necesidades

## 🔍 Verificación del Sistema

### Comando de Verificación
```bash
python check_dependencies.py
```

### Qué Verifica
- ✅ Existencia de todos los archivos
- ✅ Estructura HTML correcta
- ✅ Configuración de Firebase
- ✅ Recursos CDN disponibles
- ✅ Enlaces de navegación
- ✅ Consistencia entre módulos

## 🚀 Despliegue

### Desarrollo Local
```bash
python server.py
# http://localhost:8000
```

### Producción
```bash
# Subir archivos a servidor web
# Configurar Firebase para dominio de producción
# Actualizar configuración en firebase-config.js
```

## 📊 Estadísticas del Proyecto

- **5 módulos** completos e interactivos
- **100+ ejercicios** con retroalimentación
- **50+ gráficos** dinámicos
- **100% responsive** para móviles
- **0 dependencias** externas críticas

## 🆘 Soporte y Solución de Problemas

### Problemas Comunes
1. **Error de Firebase**: Verificar configuración
2. **Módulos no cargan**: Ejecutar verificador de dependencias
3. **Problemas de CORS**: Usar servidor local
4. **Errores de JavaScript**: Revisar consola del navegador

### Recursos de Ayuda
- [Documentación Firebase](https://firebase.google.com/docs)
- [Guía Bootstrap 5](https://getbootstrap.com/docs/5.3/)
- [MathJax Documentation](https://docs.mathjax.org/)

## 📄 Licencia

Este proyecto está desarrollado con fines educativos y está disponible bajo licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:
1. Fork del proyecto
2. Crear rama para nueva funcionalidad
3. Commit de cambios
4. Push a la rama
5. Crear Pull Request

---

**¡Disfruta aprendiendo Cálculo Diferencial!** 🎉📚
