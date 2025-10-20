# API REFERENCE - CURSO DE CÁLCULO DIFERENCIAL

## Información General

Esta documentación describe la API del Curso Interactivo de Cálculo Diferencial, construida con Firebase como backend y React como frontend.

---

## Autenticación

### AuthService

Servicio principal para manejo de autenticación de usuarios.

#### Métodos

##### `login(email: string, password: string): Promise<User>`
Inicia sesión con email y contraseña.

**Parámetros:**
- `email` (string): Email del usuario
- `password` (string): Contraseña del usuario

**Retorna:** Promise<User> - Usuario autenticado

**Errores:**
- `auth/user-not-found`: Usuario no encontrado
- `auth/wrong-password`: Contraseña incorrecta
- `auth/invalid-email`: Email inválido

**Ejemplo:**
```typescript
try {
  const user = await AuthService.login('estudiante@estudiante.edu.mx', 'password123');
  console.log('Usuario autenticado:', user);
} catch (error) {
  console.error('Error de autenticación:', error.message);
}
```

##### `register(email: string, password: string, displayName?: string): Promise<User>`
Registra un nuevo usuario.

**Parámetros:**
- `email` (string): Email del usuario
- `password` (string): Contraseña del usuario
- `displayName` (string, opcional): Nombre para mostrar

**Retorna:** Promise<User> - Usuario registrado

**Errores:**
- `auth/email-already-in-use`: Email ya registrado
- `auth/weak-password`: Contraseña muy débil

##### `logout(): Promise<void>`
Cierra la sesión del usuario actual.

##### `resetPassword(email: string): Promise<void>`
Envía email de recuperación de contraseña.

##### `isAuthorizedEmail(email: string): boolean`
Verifica si un email está autorizado para registrarse.

---

## Gestión de Progreso

### ProgressService

Servicio para manejo del progreso del usuario en el curso.

#### Métodos

##### `getUserProgress(userId: string, moduleId: string): Promise<UserProgress | null>`
Obtiene el progreso del usuario en un módulo específico.

**Parámetros:**
- `userId` (string): ID del usuario
- `moduleId` (string): ID del módulo

**Retorna:** Promise<UserProgress | null>

**Ejemplo:**
```typescript
const progress = await ProgressService.getUserProgress('user123', 'modulo-1');
if (progress) {
  console.log('Lecciones completadas:', progress.completedLessons.length);
}
```

##### `updateProgress(userId: string, moduleId: string, progress: Partial<UserProgress>): Promise<void>`
Actualiza el progreso del usuario.

**Parámetros:**
- `userId` (string): ID del usuario
- `moduleId` (string): ID del módulo
- `progress` (Partial<UserProgress>): Datos de progreso a actualizar

##### `completeLesson(userId: string, moduleId: string, lessonId: string): Promise<void>`
Marca una lección como completada.

##### `completeExercise(userId: string, moduleId: string, exerciseId: string): Promise<void>`
Marca un ejercicio como completado.

---

## Modelos de Datos

### User
```typescript
interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: 'student' | 'teacher' | 'admin';
  createdAt: Date;
  lastLoginAt: Date;
}
```

### Module
```typescript
interface Module {
  id: string;
  title: string;
  description: string;
  duration: number; // en horas
  order: number;
  prerequisites: string[];
  lessons: Lesson[];
  exercises: Exercise[];
  assessment: Assessment;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Lesson
```typescript
interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  videoUrl?: string;
  interactiveElements: InteractiveElement[];
  order: number;
  estimatedTime: number; // en minutos
  isPublished: boolean;
}
```

### Exercise
```typescript
interface Exercise {
  id: string;
  moduleId: string;
  lessonId?: string;
  type: 'multiple-choice' | 'fill-blank' | 'graphing' | 'calculation' | 'true-false';
  question: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  hints: string[];
  tags: string[];
  isPublished: boolean;
}
```

### UserProgress
```typescript
interface UserProgress {
  userId: string;
  moduleId: string;
  completedLessons: string[];
  completedExercises: string[];
  assessmentAttempts: AssessmentAttempt[];
  currentLesson?: string;
  lastAccessed: Date;
  totalTimeSpent: number; // en minutos
  createdAt: Date;
  updatedAt: Date;
}
```

---

## Hooks Personalizados

### useAuth

Hook para manejo de autenticación en componentes React.

#### Retorna
```typescript
{
  user: User | null;
  appUser: AppUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: Partial<AppUser>) => Promise<void>;
  isAuthenticated: boolean;
  isAuthorized: boolean;
}
```

#### Ejemplo de Uso
```typescript
import { useAuth } from '../hooks/useAuth';

const LoginComponent = () => {
  const { login, loading, error } = useAuth();
  
  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
    } catch (err) {
      console.error('Error:', err);
    }
  };
  
  return (
    // JSX del componente
  );
};
```

---

## Componentes Principales

### ExerciseEngine

Componente para renderizar y manejar ejercicios interactivos.

#### Props
```typescript
interface ExerciseEngineProps {
  exercise: Exercise;
  onAnswer: (isCorrect: boolean, timeSpent: number) => void;
  onNext?: () => void;
  showHints?: boolean;
}
```

#### Ejemplo de Uso
```typescript
<ExerciseEngine
  exercise={exercise}
  onAnswer={(isCorrect, timeSpent) => {
    console.log(`Respuesta ${isCorrect ? 'correcta' : 'incorrecta'} en ${timeSpent}s`);
  }}
  onNext={() => loadNextExercise()}
  showHints={true}
/>
```

### ModuleCard

Componente para mostrar información de un módulo del curso.

#### Props
```typescript
interface ModuleCardProps {
  module: Module;
  progress: number;
  isUnlocked: boolean;
  onStart: () => void;
}
```

---

## Configuración de Firebase

### Firestore Rules

```javascript
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

### Authentication Configuration

```javascript
// Configuración en Firebase Console
{
  "signInOptions": [
    {
      "provider": "password",
      "requireDisplayName": false
    }
  ],
  "authorizedDomains": [
    "estudiante.edu.mx",
    "profesor.edu.mx", 
    "admin.edu.mx"
  ]
}
```

---

## Manejo de Errores

### Códigos de Error Comunes

#### Autenticación
- `auth/user-not-found`: Usuario no encontrado
- `auth/wrong-password`: Contraseña incorrecta
- `auth/email-already-in-use`: Email ya registrado
- `auth/weak-password`: Contraseña muy débil
- `auth/invalid-email`: Email inválido
- `auth/user-disabled`: Usuario deshabilitado
- `auth/too-many-requests`: Demasiados intentos

#### Firestore
- `permission-denied`: Sin permisos para la operación
- `not-found`: Documento no encontrado
- `already-exists`: Documento ya existe
- `failed-precondition`: Condición previa fallida

### Manejo de Errores en Componentes

```typescript
const handleError = (error: any) => {
  const errorMessages: Record<string, string> = {
    'auth/user-not-found': 'No existe una cuenta con este email',
    'auth/wrong-password': 'Contraseña incorrecta',
    'permission-denied': 'No tienes permisos para realizar esta acción'
  };
  
  const errorCode = error.code || 'unknown-error';
  const message = errorMessages[errorCode] || 'Error desconocido';
  
  return message;
};
```

---

## Testing

### Tests Unitarios

```typescript
// Ejemplo de test para AuthService
import { AuthService } from '../services/authService';

describe('AuthService', () => {
  test('should validate email format', () => {
    expect(AuthService.isAuthorizedEmail('test@estudiante.edu.mx')).toBe(true);
    expect(AuthService.isAuthorizedEmail('test@gmail.com')).toBe(false);
  });
});
```

### Tests de Integración

```typescript
// Ejemplo de test para componente
import { render, screen, fireEvent } from '@testing-library/react';
import { ExerciseEngine } from '../components/exercises/ExerciseEngine';

describe('ExerciseEngine', () => {
  test('should render exercise question', () => {
    const mockExercise = {
      id: '1',
      question: '¿Cuál es la derivada de x²?',
      type: 'multiple-choice',
      options: ['2x', 'x', '2', 'x²'],
      correctAnswer: '2x',
      // ... otros campos
    };
    
    render(<ExerciseEngine exercise={mockExercise} onAnswer={jest.fn()} />);
    
    expect(screen.getByText('¿Cuál es la derivada de x²?')).toBeInTheDocument();
  });
});
```

---

## Optimización y Performance

### Lazy Loading

```typescript
// Carga perezosa de componentes
const ModulePage = lazy(() => import('../pages/ModulePage'));
const ExercisePage = lazy(() => import('../pages/ExercisePage'));

// Uso con Suspense
<Suspense fallback={<LoadingSpinner />}>
  <ModulePage />
</Suspense>
```

### Memoización

```typescript
// Memoización de componentes costosos
const ExpensiveComponent = memo(({ data }) => {
  return <div>{/* Renderizado costoso */}</div>;
});

// Memoización de cálculos
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

---

## Seguridad

### Validación de Inputs

```typescript
// Validación de email
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Sanitización de HTML
const sanitizeHTML = (html: string): string => {
  return DOMPurify.sanitize(html);
};
```

### Headers de Seguridad

```toml
# netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline'"
```

---

## Monitoreo y Analytics

### Eventos Personalizados

```typescript
// Tracking de eventos de usuario
import { logEvent } from 'firebase/analytics';

const trackExerciseComplete = (exerciseId: string, isCorrect: boolean) => {
  logEvent(analytics, 'exercise_complete', {
    exercise_id: exerciseId,
    is_correct: isCorrect,
    timestamp: new Date().toISOString()
  });
};
```

### Métricas de Performance

```typescript
// Medición de tiempo de carga
const measurePageLoad = () => {
  const startTime = performance.now();
  
  window.addEventListener('load', () => {
    const loadTime = performance.now() - startTime;
    logEvent(analytics, 'page_load_time', {
      load_time: loadTime,
      page: window.location.pathname
    });
  });
};
```

---

## Extensibilidad

### Plugins de Ejercicios

```typescript
// Sistema de plugins para nuevos tipos de ejercicios
interface ExercisePlugin {
  type: string;
  render: (exercise: Exercise) => React.ReactNode;
  validate: (answer: any, correctAnswer: any) => boolean;
}

const registerExercisePlugin = (plugin: ExercisePlugin) => {
  // Registro del plugin
};
```

### Temas Personalizados

```typescript
// Sistema de temas
interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
  fonts: {
    primary: string;
    math: string;
  };
}

const applyTheme = (theme: Theme) => {
  // Aplicación del tema
};
```

---

## Troubleshooting

### Problemas Comunes

#### Error de Conexión a Firebase
```typescript
// Verificar configuración
const checkFirebaseConfig = () => {
  const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // ...
  };
  
  Object.entries(config).forEach(([key, value]) => {
    if (!value) {
      console.error(`Missing Firebase config: ${key}`);
    }
  });
};
```

#### Problemas de Rendimiento
```typescript
// Profiling de componentes
import { Profiler } from 'react';

const onRenderCallback = (id, phase, actualDuration) => {
  console.log(`${id} (${phase}) took ${actualDuration}ms`);
};

<Profiler id="ExerciseEngine" onRender={onRenderCallback}>
  <ExerciseEngine {...props} />
</Profiler>
```

---

## Changelog

### v1.0.0 (Diciembre 2024)
- Lanzamiento inicial
- 5 módulos de cálculo diferencial
- Sistema de autenticación completo
- Ejercicios interactivos
- Dashboard de progreso
- Despliegue en Netlify

---

## Soporte

Para soporte técnico o preguntas sobre la API:

- **Email**: dev@curso-calculo.edu.mx
- **Documentación**: [docs.curso-calculo.edu.mx](https://docs.curso-calculo.edu.mx)
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/curso-calculo-diferencial/issues)

---

*Última actualización: Diciembre 2024*
