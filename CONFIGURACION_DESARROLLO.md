# CONFIGURACIÓN DE DESARROLLO - CURSO DE CÁLCULO DIFERENCIAL

## Configuración Inicial del Entorno de Desarrollo

### 1. Prerrequisitos

Asegúrate de tener instalado:
- Node.js 18+ 
- npm 9+
- Git
- Editor de código (VS Code recomendado)

### 2. Configuración del Proyecto

```bash
# Clonar repositorio
git clone <repository-url>
cd curso-calculo-diferencial

# Instalar dependencias
npm install

# Configurar variables de entorno
cp env.example .env.local
```

### 3. Configuración de Firebase

#### Crear Proyecto Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea nuevo proyecto: "curso-calculo-diferencial"
3. Habilita Authentication y Firestore

#### Configurar Authentication
```javascript
// En Firebase Console > Authentication > Sign-in method
// Habilitar: Email/Password
// Configurar dominios autorizados:
// - estudiante.edu.mx
// - profesor.edu.mx  
// - admin.edu.mx
```

#### Configurar Firestore
```javascript
// Crear colecciones iniciales:
// - users
// - modules  
// - exercises
// - userProgress
```

### 4. Variables de Entorno

Edita `.env.local`:
```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=tu_api_key_aqui
REACT_APP_FIREBASE_AUTH_DOMAIN=curso-calculo-diferencial.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=curso-calculo-diferencial
REACT_APP_FIREBASE_STORAGE_BUCKET=curso-calculo-diferencial.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef
REACT_APP_FIREBASE_MEASUREMENT_ID=G-ABCDEFGHIJ

# Application Configuration
REACT_APP_APP_NAME=Curso de Cálculo Diferencial
REACT_APP_ENVIRONMENT=development
REACT_APP_AUTH_DOMAIN_WHITELIST=estudiante.edu.mx,profesor.edu.mx,admin.edu.mx
REACT_APP_DEBUG_MODE=true
```

### 5. Configuración de VS Code

#### Extensiones Recomendadas
```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "firebase.vscode-firebase-explorer",
    "ms-vscode.vscode-json"
  ]
}
```

#### Configuración de Workspace
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "typescript",
    "typescriptreact": "typescriptreact"
  }
}
```

### 6. Scripts de Desarrollo

```bash
# Desarrollo
npm start                    # Servidor de desarrollo en puerto 3000
npm run build               # Build de producción
npm run test                # Ejecutar tests
npm run test:watch          # Tests en modo watch

# Calidad de código
npm run lint                # ESLint
npm run lint:fix            # Corregir errores automáticamente
npm run type-check          # Verificar tipos TypeScript
npm run format              # Prettier

# Utilidades
npm run analyze             # Análisis del bundle
npm run build:netlify       # Build optimizado para Netlify
```

### 7. Estructura de Archivos

```
curso-calculo-diferencial/
├── public/                 # Archivos estáticos
│   ├── index.html
│   ├── manifest.json
│   └── favicon.ico
├── src/                    # Código fuente
│   ├── components/         # Componentes React
│   │   ├── auth/          # Autenticación
│   │   ├── modules/       # Módulos del curso
│   │   ├── exercises/     # Ejercicios
│   │   └── common/        # Componentes comunes
│   ├── pages/             # Páginas principales
│   ├── hooks/             # Custom hooks
│   ├── services/          # Servicios de API
│   ├── types/             # Definiciones TypeScript
│   ├── data/              # Datos estáticos
│   ├── config/            # Configuración
│   ├── utils/             # Utilidades
│   └── styles/            # Estilos globales
├── tests/                 # Tests
├── docs/                  # Documentación
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── netlify.toml
└── README.md
```

### 8. Configuración de Git

```bash
# Configurar usuario
git config user.name "Tu Nombre"
git config user.email "tu@email.com"

# Crear rama de desarrollo
git checkout -b develop

# Configurar hooks de pre-commit
npm install --save-dev husky lint-staged
```

#### Pre-commit Hooks
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ]
  }
}
```

### 9. Configuración de Testing

#### Jest Configuration
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/reportWebVitals.ts'
  ]
};
```

#### Setup Tests
```typescript
// src/setupTests.ts
import '@testing-library/jest-dom';

// Mock de Firebase
jest.mock('./config/firebase', () => ({
  auth: {},
  db: {},
  analytics: null
}));
```

### 10. Configuración de ESLint

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    '@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
```

### 11. Configuración de Prettier

```javascript
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### 12. Configuración de Tailwind CSS

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          // ... más colores
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
};
```

### 13. Configuración de TypeScript

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"]
    }
  }
}
```

### 14. Configuración de Firebase Emulators

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login en Firebase
firebase login

# Inicializar emuladores
firebase init emulators

# Configurar firebase.json
{
  "emulators": {
    "auth": {
      "port": 9099
    },
    "firestore": {
      "port": 8080
    },
    "functions": {
      "port": 5001
    }
  }
}

# Ejecutar emuladores
firebase emulators:start
```

### 15. Configuración de Netlify CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login en Netlify
netlify login

# Configurar sitio
netlify init

# Desplegar preview
netlify deploy

# Desplegar producción
netlify deploy --prod
```

### 16. Scripts de Utilidad

```json
{
  "scripts": {
    "dev": "npm start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write src/**/*.{ts,tsx,json,css,md}",
    "type-check": "tsc --noEmit",
    "analyze": "npm run build && npx bundle-analyzer build/static/js/*.js",
    "firebase:emulators": "firebase emulators:start",
    "netlify:dev": "netlify dev",
    "netlify:deploy": "netlify deploy --prod --dir=build"
  }
}
```

### 17. Configuración de Debugging

#### VS Code Launch Configuration
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src"
    },
    {
      "name": "Attach to Chrome",
      "type": "chrome",
      "request": "attach",
      "port": 9222,
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

### 18. Configuración de Performance

#### Bundle Analyzer
```bash
# Instalar bundle analyzer
npm install --save-dev webpack-bundle-analyzer

# Analizar bundle
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

#### Performance Monitoring
```typescript
// src/utils/performance.ts
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
};
```

### 19. Configuración de Seguridad

#### Content Security Policy
```html
<!-- En public/index.html -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.gstatic.com; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;">
```

#### Validación de Entrada
```typescript
// src/utils/validation.ts
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

### 20. Configuración de CI/CD

#### GitHub Actions
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm test -- --coverage --watchAll=false
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=build
        env:
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

### 21. Configuración de Monitoreo

#### Error Tracking
```typescript
// src/utils/errorTracking.ts
export const trackError = (error: Error, context: string) => {
  console.error(`Error in ${context}:`, error);
  
  // Enviar a servicio de tracking
  if (process.env.NODE_ENV === 'production') {
    // Sentry, LogRocket, etc.
  }
};
```

#### Analytics
```typescript
// src/utils/analytics.ts
import { logEvent } from 'firebase/analytics';
import { analytics } from '../config/firebase';

export const trackEvent = (eventName: string, parameters?: any) => {
  if (analytics) {
    logEvent(analytics, eventName, parameters);
  }
};
```

### 22. Configuración de Accesibilidad

#### Testing de Accesibilidad
```bash
# Instalar axe-core
npm install --save-dev @axe-core/react

# Configurar en setupTests.ts
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);
```

#### Configuración de Screen Reader
```typescript
// src/utils/accessibility.ts
export const announceToScreenReader = (message: string) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};
```

### 23. Configuración de Internacionalización

```bash
# Instalar react-i18next
npm install react-i18next i18next i18next-browser-languagedetector
```

```typescript
// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // Traducciones en inglés
        }
      },
      es: {
        translation: {
          // Traducciones en español
        }
      }
    },
    lng: 'es',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });
```

### 24. Configuración de PWA

```json
// public/manifest.json
{
  "short_name": "Cálculo Diferencial",
  "name": "Curso de Cálculo Diferencial",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

### 25. Configuración Final

#### Verificación de Configuración
```bash
# Script de verificación
npm run type-check && npm run lint && npm test
```

#### Checklist de Configuración
- [ ] Node.js 18+ instalado
- [ ] Variables de entorno configuradas
- [ ] Firebase configurado
- [ ] Extensiones de VS Code instaladas
- [ ] Tests ejecutándose correctamente
- [ ] Linting funcionando
- [ ] Build de producción exitoso
- [ ] Emuladores de Firebase funcionando
- [ ] Netlify CLI configurado

---

## Comandos de Desarrollo Rápido

```bash
# Iniciar desarrollo completo
npm run dev

# Solo backend (Firebase emulators)
npm run firebase:emulators

# Solo frontend con Netlify
npm run netlify:dev

# Verificar todo
npm run type-check && npm run lint && npm test

# Desplegar
npm run netlify:deploy
```

---

*Esta configuración te permitirá desarrollar el curso de cálculo diferencial de manera eficiente y profesional.*
