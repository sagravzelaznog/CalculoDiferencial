# 📚 Curso Interactivo de Cálculo Diferencial

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/your-site-name/deploys)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Una plataforma educativa moderna y interactiva para aprender cálculo diferencial, diseñada con las mejores prácticas de desarrollo web y pedagogía digital.

## ✨ Características Principales

### 🎓 Contenido Educativo
- **5 Módulos Secuenciales**: Desde relaciones y funciones hasta aplicaciones de derivadas
- **Lecciones Interactivas**: Contenido multimedia con gráficos dinámicos
- **Ejercicios Variados**: Opción múltiple, cálculos, gráficos y más
- **Evaluaciones Automáticas**: Sistema de calificación con retroalimentación inmediata

### 🔐 Autenticación Segura
- **Control de Acceso por Email**: Solo dominios autorizados pueden registrarse
- **Firebase Authentication**: Sistema robusto y escalable
- **Roles de Usuario**: Estudiante, Profesor, Administrador
- **Recuperación de Contraseña**: Proceso automatizado y seguro

### 📊 Seguimiento de Progreso
- **Dashboard Personalizado**: Estadísticas detalladas de aprendizaje
- **Progreso en Tiempo Real**: Sincronización automática con Firebase
- **Métricas de Rendimiento**: Tiempo invertido, ejercicios completados, calificaciones
- **Sistema de Logros**: Badges y certificaciones por completar módulos

### 🎨 Interfaz Moderna
- **Diseño Responsive**: Optimizado para todos los dispositivos
- **Tema Oscuro/Claro**: Personalización visual
- **Animaciones Fluidas**: Experiencia de usuario excepcional
- **Accesibilidad**: Compatible con tecnologías asistivas

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** - Framework de estilos utilitarios
- **Framer Motion** - Animaciones y transiciones
- **React Router** - Enrutamiento de aplicación

### Backend y Servicios
- **Firebase Authentication** - Autenticación de usuarios
- **Firestore** - Base de datos NoSQL en tiempo real
- **Firebase Analytics** - Métricas y análisis de uso
- **Netlify** - Hosting y despliegue automático

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **Prettier** - Formateo de código
- **Jest** - Testing framework
- **React Testing Library** - Testing de componentes

## 📋 Requisitos del Sistema

### Para Desarrolladores
- Node.js 18+
- npm 9+
- Git
- Cuenta de Firebase
- Cuenta de Netlify

### Para Usuarios
- Navegador moderno (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Conexión a internet
- Email autorizado (@estudiante.edu.mx, @profesor.edu.mx, @admin.edu.mx)

## 🛠️ Instalación y Configuración

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/curso-calculo-diferencial.git
cd curso-calculo-diferencial
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno
```bash
cp env.example .env.local
```

Edita `.env.local` con tus credenciales de Firebase:
```env
REACT_APP_FIREBASE_API_KEY=tu_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=tu_proyecto_id
# ... más variables
```

### 4. Configurar Firebase
1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita Authentication y Firestore
3. Configura las reglas de seguridad
4. Obtén las credenciales de configuración

### 5. Ejecutar en Desarrollo
```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 📚 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── auth/           # Componentes de autenticación
│   ├── modules/        # Componentes de módulos
│   ├── exercises/      # Motor de ejercicios
│   └── common/         # Componentes comunes
├── pages/              # Páginas principales
├── hooks/              # Custom hooks
├── services/           # Servicios de API
├── types/              # Definiciones de TypeScript
├── data/               # Datos estáticos
├── config/             # Configuración
└── styles/             # Estilos globales
```

## 🎯 Módulos del Curso

### 1. Relaciones y Funciones (12 horas)
- Conceptos básicos de relaciones y funciones
- Dominio y rango
- Propiedades de funciones
- Funciones elementales
- Transformaciones de funciones

### 2. Límites (16 horas)
- Concepto intuitivo y formal de límite
- Propiedades de límites
- Técnicas de cálculo
- Límites especiales
- Continuidad

### 3. Continuidad (8 horas)
- Definición formal de continuidad
- Tipos de discontinuidades
- Propiedades de funciones continuas
- Teoremas fundamentales

### 4. La Derivada (20 horas)
- Concepto de derivada
- Reglas de derivación
- Derivadas de funciones especiales
- Derivadas de orden superior
- Derivación implícita

### 5. Aplicaciones de la Derivada (8 horas)
- Análisis de funciones
- Optimización
- Problemas aplicados
- Velocidad y aceleración

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm start              # Inicia servidor de desarrollo
npm run build          # Construye para producción
npm test               # Ejecuta tests
npm run eject          # Expone configuración de Create React App

# Calidad de Código
npm run lint           # Ejecuta ESLint
npm run lint:fix       # Corrige errores de linting automáticamente
npm run type-check     # Verifica tipos de TypeScript

# Despliegue
npm run build:netlify  # Build optimizado para Netlify
```

## 🚀 Despliegue en Netlify

### Método Automático (Recomendado)
1. Conecta tu repositorio de GitHub a Netlify
2. Configura las variables de entorno en Netlify Dashboard
3. El despliegue se realizará automáticamente en cada push

### Método Manual
```bash
npm run build
netlify deploy --prod --dir=build
```

Para más detalles, consulta la [Guía de Despliegue](GUIA_DESPLIEGUE.md).

## 📖 Documentación

- **[Documentación Técnica](DOCUMENTACION_TECNICA.md)** - Arquitectura y implementación
- **[Guía de Despliegue](GUIA_DESPLIEGUE.md)** - Instrucciones de despliegue
- **[Guía de Usuario](GUIA_USUARIO.md)** - Manual para estudiantes
- **[Planeación Didáctica](planeacionCD.MD)** - Diseño pedagógico del curso

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Tests con cobertura
npm run test:coverage

# Tests en modo watch
npm run test:watch
```

### Estructura de Tests
```
src/
├── components/
│   └── __tests__/     # Tests de componentes
├── services/
│   └── __tests__/     # Tests de servicios
└── utils/
    └── __tests__/     # Tests de utilidades
```

## 🤝 Contribución

### Cómo Contribuir
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

### Estándares de Código
- Usa TypeScript para todo el código nuevo
- Sigue las convenciones de ESLint configuradas
- Escribe tests para nuevas funcionalidades
- Documenta funciones y componentes complejos
- Usa commits semánticos

## 📊 Métricas y Analytics

### Firebase Analytics
- Eventos de usuario automáticos
- Métricas de engagement
- Análisis de comportamiento de aprendizaje
- Reportes de progreso

### Métricas de Performance
- Core Web Vitals
- Tiempo de carga de páginas
- Métricas de interacción
- Análisis de errores

## 🔒 Seguridad

### Medidas Implementadas
- Autenticación robusta con Firebase
- Validación de dominios de email
- Headers de seguridad en Netlify
- Reglas de Firestore restrictivas
- Sanitización de inputs del usuario

### Reporte de Vulnerabilidades
Si encuentras una vulnerabilidad de seguridad, por favor:
1. **NO** abras un issue público
2. Envía un email a: seguridad@curso-calculo.edu.mx
3. Incluye detalles de la vulnerabilidad
4. Espera respuesta en 48 horas

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Equipo

- **Desarrollo Frontend**: Equipo de Desarrollo Educativo
- **Diseño UX/UI**: Diseñadores de Experiencia de Usuario
- **Contenido Pedagógico**: Catedráticos de Matemáticas
- **DevOps**: Equipo de Infraestructura

## 📞 Soporte

### Para Estudiantes
- **Email**: soporte@curso-calculo.edu.mx
- **Horario**: Lunes a Viernes, 9:00 - 18:00
- **Chat en Vivo**: Disponible en la plataforma

### Para Desarrolladores
- **Issues**: Usa GitHub Issues para reportar bugs
- **Discusiones**: GitHub Discussions para preguntas
- **Documentación**: Consulta la documentación técnica

## 🗺️ Roadmap

### Versión 1.1 (Q1 2025)
- [ ] Modo offline mejorado
- [ ] Aplicación móvil nativa
- [ ] Integración con LMS
- [ ] Más tipos de ejercicios

### Versión 1.2 (Q2 2025)
- [ ] Inteligencia artificial para tutoría
- [ ] Análisis predictivo de rendimiento
- [ ] Gamificación avanzada
- [ ] Colaboración entre estudiantes

### Versión 2.0 (Q3 2025)
- [ ] Cálculo integral
- [ ] Cálculo multivariable
- [ ] Ecuaciones diferenciales
- [ ] Plataforma multi-materia

## 🙏 Agradecimientos

- **Firebase** por la infraestructura de backend
- **Netlify** por el hosting y CI/CD
- **React Team** por el framework de UI
- **Tailwind CSS** por el sistema de estilos
- **Comunidad Open Source** por las herramientas utilizadas

---

## 📈 Estadísticas del Proyecto

![GitHub stars](https://img.shields.io/github/stars/tu-usuario/curso-calculo-diferencial?style=social)
![GitHub forks](https://img.shields.io/github/forks/tu-usuario/curso-calculo-diferencial?style=social)
![GitHub issues](https://img.shields.io/github/issues/tu-usuario/curso-calculo-diferencial)
![GitHub pull requests](https://img.shields.io/github/issues-pr/tu-usuario/curso-calculo-diferencial)

---

**¡Gracias por usar el Curso Interactivo de Cálculo Diferencial!** 🎓

Si este proyecto te ha sido útil, considera darle una ⭐ en GitHub.
