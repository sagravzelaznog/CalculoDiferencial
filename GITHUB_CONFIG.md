# Configuración de GitHub - Curso de Cálculo Diferencial

## 📋 Información del Repositorio

### Nombre del Repositorio
```
curso-calculo-diferencial
```

### Descripción
```
Curso interactivo de Cálculo Diferencial con sistema de autenticación, módulos interactivos y ejercicios con retroalimentación inmediata. Desarrollado con HTML5, CSS3, JavaScript, Bootstrap 5 y Firebase.
```

### Temas (Topics)
```
calculo-diferencial
matematicas
educacion
firebase
bootstrap
javascript
html5
css3
interactivo
ejercicios
autenticacion
```

### Sitio Web
```
https://jmgv-ptel.github.io/curso-calculo-diferencial
```

## 🔧 Configuración del Repositorio

### Configuración General
- **Visibilidad**: Público
- **Descripción**: Curso interactivo de Cálculo Diferencial
- **Sitio web**: https://jmgv-ptel.github.io/curso-calculo-diferencial
- **Temáticas**: matemáticas, educación, firebase, bootstrap

### Configuración de Issues
- **Issues habilitadas**: Sí
- **Templates**: Bug report, Feature request, Content improvement
- **Labels**: bug, enhancement, content, documentation, help-wanted, good-first-issue

### Configuración de Pull Requests
- **PR habilitadas**: Sí
- **Template**: Pull request template incluido
- **Revisión requerida**: Sí
- **Checks requeridos**: Verificación automática

### Configuración de GitHub Pages
- **Habilitado**: Sí
- **Fuente**: Deploy from a branch
- **Rama**: main
- **Carpeta**: / (root)

### Configuración de GitHub Actions
- **Habilitado**: Sí
- **Workflow**: Verificación automática en push y PR
- **Permisos**: Read and write

## 📁 Estructura del Repositorio

```
curso-calculo-diferencial/
├── 📄 index.html                          # Página principal
├── 📚 modulo1_relaciones_funciones.html   # Módulos del curso
├── 📚 modulo2_limites.html
├── 📚 modulo3_continuidad.html
├── 📚 modulo4_la_derivada.html
├── 📚 modulo5_aplicaciones_derivada.html
├── 📚 ejercicios_modulo1.html             # Ejercicios complementarios
├── ⚙️ firebase-config.js                   # Configuración Firebase
├── ⚙️ auth-manager.js                      # Gestión de autenticación
├── ⚙️ config.js                           # Configuración general
├── ⚙️ module-navigation.js                 # Navegación entre módulos
├── 🛠️ server.py                           # Servidor local
├── 🛠️ check_dependencies.py              # Verificador de dependencias
├── 📦 package.json                        # Configuración del proyecto
├── 📖 README.md                           # Documentación principal
├── 📄 LICENSE                             # Licencia MIT
├── 📋 CONTRIBUTING.md                     # Guía de contribución
├── 📝 CHANGELOG.md                        # Historial de cambios
├── 🔒 SECURITY.md                         # Política de seguridad
├── 👥 CONTRIBUTORS.md                     # Lista de contribuidores
├── 📦 DEPENDENCIES.md                     # Documentación de dependencias
├── 🚀 GITHUB_PAGES.md                     # Configuración de GitHub Pages
├── 🚀 INSTALACION.md                      # Guía de instalación
├── ⚡ INICIO_RAPIDO.md                     # Guía de inicio rápido
├── 📚 README_MODULO1.md                   # Documentación del Módulo 1
├── 🔧 .gitignore                          # Archivos a ignorar
├── 🔧 .gitattributes                      # Configuración de Git
└── 📁 .github/                            # Configuración de GitHub
    ├── 📁 workflows/
    │   └── verify.yml                     # Verificación automática
    ├── 📁 ISSUE_TEMPLATE/
    │   ├── bug_report.md
    │   ├── feature_request.md
    │   └── content_improvement.md
    └── pull_request_template.md
```

## 🏷️ Labels del Repositorio

### Labels por Tipo
- **bug** - Algo no funciona
- **enhancement** - Nueva funcionalidad o mejora
- **content** - Mejoras en contenido educativo
- **documentation** - Mejoras en documentación
- **help-wanted** - Ayuda extra necesaria
- **good-first-issue** - Bueno para principiantes

### Labels por Prioridad
- **priority-high** - Alta prioridad
- **priority-medium** - Prioridad media
- **priority-low** - Baja prioridad

### Labels por Estado
- **needs-triage** - Necesita revisión
- **in-progress** - En progreso
- **blocked** - Bloqueado
- **duplicate** - Duplicado
- **invalid** - Inválido
- **wontfix** - No se corregirá

## 🔄 Workflows de GitHub Actions

### Verificación Automática
```yaml
name: Verificación del Curso de Cálculo Diferencial
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
```

### Verificaciones Incluidas
- ✅ Estructura de archivos
- ✅ Sintaxis HTML/CSS/JavaScript
- ✅ Configuración de Firebase
- ✅ Recursos CDN
- ✅ Derechos de autor
- ✅ Documentación

## 📊 Estadísticas del Repositorio

### Métricas del Proyecto
- **Archivos HTML**: 6
- **Archivos JavaScript**: 5
- **Archivos Python**: 2
- **Archivos de documentación**: 10
- **Líneas de código**: 15,000+
- **Tamaño del repositorio**: ~50MB

### Métricas de Uso
- **Estrellas**: 0 (nuevo repositorio)
- **Forks**: 0 (nuevo repositorio)
- **Issues**: 0 (nuevo repositorio)
- **Pull Requests**: 0 (nuevo repositorio)

## 🚀 Proceso de Despliegue

### Despliegue Automático
1. **Push a main** → Verificación automática
2. **Verificación exitosa** → Despliegue a GitHub Pages
3. **Disponibilidad** → https://jmgv-ptel.github.io/curso-calculo-diferencial

### Tiempo de Despliegue
- **Verificación**: 1-2 minutos
- **Despliegue**: 2-3 minutos
- **Total**: 5 minutos

## 🔒 Seguridad

### Configuración de Seguridad
- **Dependabot**: Habilitado para dependencias
- **Code scanning**: Habilitado
- **Secret scanning**: Habilitado
- **Branch protection**: Habilitado para main

### Permisos
- **Actions**: Read and write
- **Contents**: Read
- **Metadata**: Read
- **Pull requests**: Read and write

## 📞 Soporte

### Recursos de Ayuda
- **Issues**: Sistema de issues de GitHub
- **Discussions**: GitHub Discussions
- **Documentación**: README.md y archivos de documentación
- **Email**: Contacto a través del perfil del proyecto

### Contacto
- **GitHub**: @jmgv-ptel
- **Email**: Contacto a través del perfil
- **Sitio web**: https://jmgv-ptel.github.io/curso-calculo-diferencial

## 🔄 Mantenimiento

### Tareas Regulares
- **Revisar issues**: Semanalmente
- **Actualizar dependencias**: Mensualmente
- **Revisar seguridad**: Mensualmente
- **Actualizar documentación**: Según sea necesario

### Actualizaciones
- **Versión actual**: 1.0.0
- **Última actualización**: Enero 2025
- **Próxima revisión**: Febrero 2025

---

© JMGV-PTEL-2025. TODOS LOS DERECHOS RESERVADOS.
