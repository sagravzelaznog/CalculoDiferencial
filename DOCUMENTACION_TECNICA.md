# DOCUMENTACIÓN TÉCNICA: CURSO DE CÁLCULO DIFERENCIAL

## INFORMACIÓN DEL PROYECTO

**Nombre:** Curso Interactivo de Cálculo Diferencial  
**Versión:** 1.0.0  
**Tecnologías:** React, TypeScript, Firebase Auth, Netlify  
**Autor:** Equipo de Desarrollo Educativo  
**Fecha:** Diciembre 2024  

---

## ARQUITECTURA DEL SISTEMA

### Stack Tecnológico
- **Frontend:** React 18 + TypeScript
- **Autenticación:** Firebase Authentication
- **Base de Datos:** Firebase Firestore
- **Hosting:** Netlify
- **Estilos:** Tailwind CSS + Framer Motion
- **Matemáticas:** MathJax + KaTeX
- **Gráficos:** Chart.js + D3.js
- **Testing:** Jest + React Testing Library

### Estructura de Directorios
```
curso-calculo-diferencial/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── modules/
│   │   ├── exercises/
│   │   ├── dashboard/
│   │   └── common/
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Module.tsx
│   │   └── Profile.tsx
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   ├── types/
│   └── styles/
├── docs/
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── USER_GUIDE.md
├── tests/
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── netlify.toml
```

---

## CONFIGURACIÓN DE AUTENTICACIÓN

### Firebase Authentication Setup

#### 1. Configuración de Firebase
```typescript
// src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
```

#### 2. Servicio de Autenticación
```typescript
// src/services/authService.ts
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  User
} from 'firebase/auth';
import { auth } from '../config/firebase';

export class AuthService {
  static async login(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }

  static async register(email: string, password: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }

  static async logout(): Promise<void> {
    await signOut(auth);
  }

  static async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  }
}
```

#### 3. Hook de Autenticación
```typescript
// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading };
};
```

---

## ESTRUCTURA DE MÓDULOS

### Modelo de Datos
```typescript
// src/types/course.ts
export interface Module {
  id: string;
  title: string;
  description: string;
  duration: number; // en horas
  lessons: Lesson[];
  exercises: Exercise[];
  assessment: Assessment;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  interactiveElements: InteractiveElement[];
}

export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'graphing' | 'calculation';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Assessment {
  id: string;
  questions: Exercise[];
  timeLimit: number; // en minutos
  passingScore: number; // porcentaje
}
```

### Componente de Módulo
```typescript
// src/components/modules/ModuleCard.tsx
import React from 'react';
import { Module } from '../../types/course';

interface ModuleCardProps {
  module: Module;
  progress: number;
  onStart: () => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ 
  module, 
  progress, 
  onStart 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          {module.title}
        </h3>
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
          {module.duration}h
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{module.description}</p>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progreso</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <button
        onClick={onStart}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        {progress === 0 ? 'Comenzar' : 'Continuar'}
      </button>
    </div>
  );
};
```

---

## SISTEMA DE EJERCICIOS INTERACTIVOS

### Motor de Ejercicios
```typescript
// src/components/exercises/ExerciseEngine.tsx
import React, { useState } from 'react';
import { Exercise } from '../../types/course';

interface ExerciseEngineProps {
  exercise: Exercise;
  onAnswer: (isCorrect: boolean) => void;
}

export const ExerciseEngine: React.FC<ExerciseEngineProps> = ({ 
  exercise, 
  onAnswer 
}) => {
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    const isCorrect = userAnswer === exercise.correctAnswer.toString();
    setShowResult(true);
    onAnswer(isCorrect);
  };

  const renderExercise = () => {
    switch (exercise.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-2">
            {exercise.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  onChange={(e) => setUserAnswer(e.target.value)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      
      case 'fill-blank':
        return (
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            placeholder="Ingresa tu respuesta"
          />
        );
      
      case 'calculation':
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div dangerouslySetInnerHTML={{ __html: exercise.question }} />
            </div>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              placeholder="Ingresa tu respuesta"
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
          {exercise.difficulty}
        </span>
      </div>
      
      {renderExercise()}
      
      <div className="mt-6 flex justify-between">
        <button
          onClick={handleSubmit}
          disabled={!userAnswer}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Verificar Respuesta
        </button>
      </div>
      
      {showResult && (
        <div className="mt-4 p-4 rounded-lg bg-gray-50">
          <h4 className="font-semibold mb-2">Explicación:</h4>
          <p dangerouslySetInnerHTML={{ __html: exercise.explanation }} />
        </div>
      )}
    </div>
  );
};
```

---

## CONFIGURACIÓN DE NETLIFY

### Archivo netlify.toml
```toml
# netlify.toml
[build]
  publish = "build"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[context.production]
  command = "npm run build"

[context.deploy-preview]
  command = "npm run build"
```

### Variables de Entorno
```bash
# .env.production
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

---

## SISTEMA DE PROGRESO Y EVALUACIÓN

### Servicio de Progreso
```typescript
// src/services/progressService.ts
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface UserProgress {
  userId: string;
  moduleId: string;
  completedLessons: string[];
  completedExercises: string[];
  assessmentScore?: number;
  lastAccessed: Date;
}

export class ProgressService {
  static async getUserProgress(userId: string, moduleId: string): Promise<UserProgress | null> {
    const docRef = doc(db, 'userProgress', `${userId}_${moduleId}`);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as UserProgress;
    }
    return null;
  }

  static async updateProgress(
    userId: string, 
    moduleId: string, 
    progress: Partial<UserProgress>
  ): Promise<void> {
    const docRef = doc(db, 'userProgress', `${userId}_${moduleId}`);
    await setDoc(docRef, {
      userId,
      moduleId,
      ...progress,
      lastAccessed: new Date()
    }, { merge: true });
  }

  static async completeLesson(userId: string, moduleId: string, lessonId: string): Promise<void> {
    const currentProgress = await this.getUserProgress(userId, moduleId);
    const completedLessons = currentProgress?.completedLessons || [];
    
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
      await this.updateProgress(userId, moduleId, { completedLessons });
    }
  }

  static async completeExercise(userId: string, moduleId: string, exerciseId: string): Promise<void> {
    const currentProgress = await this.getUserProgress(userId, moduleId);
    const completedExercises = currentProgress?.completedExercises || [];
    
    if (!completedExercises.includes(exerciseId)) {
      completedExercises.push(exerciseId);
      await this.updateProgress(userId, moduleId, { completedExercises });
    }
  }
}
```

---

## INTERFAZ DE USUARIO

### Dashboard Principal
```typescript
// src/pages/Dashboard.tsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { ModuleCard } from '../components/modules/ModuleCard';
import { modules } from '../data/modules';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Curso de Cálculo Diferencial
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Hola, {user?.email}</span>
              <button
                onClick={() => AuthService.logout()}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Módulos del Curso
          </h2>
          <p className="text-gray-600">
            Completa todos los módulos para dominar el cálculo diferencial
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              progress={0} // Se calculará dinámicamente
              onStart={() => {
                // Navegar al módulo
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
};
```

---

## CONFIGURACIÓN DE DESPLIEGUE

### Scripts de Build
```json
// package.json
{
  "name": "curso-calculo-diferencial",
  "version": "1.0.0",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "build:netlify": "npm run build && npm run test"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "firebase": "^9.17.0",
    "tailwindcss": "^3.2.0",
    "framer-motion": "^8.5.0",
    "mathjax": "^3.2.0",
    "katex": "^0.16.0",
    "chart.js": "^4.2.0",
    "d3": "^7.8.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^4.9.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.0",
    "jest": "^29.3.0"
  }
}
```

### Configuración de TypeScript
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "es6"
    ],
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
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}
```

---

## SEGURIDAD Y AUTORIZACIÓN

### Middleware de Autenticación
```typescript
// src/components/auth/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
```

### Validación de Email
```typescript
// src/utils/emailValidation.ts
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isAuthorizedEmail = (email: string): boolean => {
  const authorizedDomains = [
    'estudiante.edu.mx',
    'profesor.edu.mx',
    'admin.edu.mx'
  ];
  
  const domain = email.split('@')[1];
  return authorizedDomains.includes(domain);
};
```

---

## TESTING Y CALIDAD

### Tests Unitarios
```typescript
// tests/components/ModuleCard.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModuleCard } from '../../src/components/modules/ModuleCard';

const mockModule = {
  id: '1',
  title: 'Relaciones y Funciones',
  description: 'Conceptos fundamentales',
  duration: 12,
  lessons: [],
  exercises: [],
  assessment: { id: '1', questions: [], timeLimit: 60, passingScore: 70 }
};

describe('ModuleCard', () => {
  it('renders module information correctly', () => {
    render(<ModuleCard module={mockModule} progress={0} onStart={jest.fn()} />);
    
    expect(screen.getByText('Relaciones y Funciones')).toBeInTheDocument();
    expect(screen.getByText('Conceptos fundamentales')).toBeInTheDocument();
    expect(screen.getByText('12h')).toBeInTheDocument();
  });

  it('calls onStart when button is clicked', () => {
    const mockOnStart = jest.fn();
    render(<ModuleCard module={mockModule} progress={0} onStart={mockOnStart} />);
    
    fireEvent.click(screen.getByText('Comenzar'));
    expect(mockOnStart).toHaveBeenCalledTimes(1);
  });
});
```

---

## MONITOREO Y ANALYTICS

### Servicio de Analytics
```typescript
// src/services/analyticsService.ts
import { logEvent } from 'firebase/analytics';
import { analytics } from '../config/firebase';

export class AnalyticsService {
  static trackModuleStart(moduleId: string, userId: string): void {
    logEvent(analytics, 'module_start', {
      module_id: moduleId,
      user_id: userId,
      timestamp: new Date().toISOString()
    });
  }

  static trackExerciseComplete(exerciseId: string, isCorrect: boolean): void {
    logEvent(analytics, 'exercise_complete', {
      exercise_id: exerciseId,
      is_correct: isCorrect,
      timestamp: new Date().toISOString()
    });
  }

  static trackAssessmentComplete(moduleId: string, score: number): void {
    logEvent(analytics, 'assessment_complete', {
      module_id: moduleId,
      score: score,
      timestamp: new Date().toISOString()
    });
  }
}
```

---

## GUÍA DE DESPLIEGUE

### Pasos para Desplegar en Netlify

1. **Preparar el Proyecto**
   ```bash
   git clone <repository-url>
   cd curso-calculo-diferencial
   npm install
   ```

2. **Configurar Variables de Entorno**
   - Crear archivo `.env.production`
   - Agregar las variables de Firebase
   - Configurar en Netlify Dashboard

3. **Configurar Firebase**
   - Crear proyecto en Firebase Console
   - Habilitar Authentication y Firestore
   - Configurar reglas de seguridad

4. **Desplegar en Netlify**
   ```bash
   npm run build
   # Subir carpeta build/ a Netlify
   ```

5. **Configurar Dominio Personalizado**
   - Agregar dominio en Netlify
   - Configurar DNS
   - Habilitar HTTPS

---

## MANTENIMIENTO Y ACTUALIZACIONES

### Estrategia de Versionado
- **Semantic Versioning:** MAJOR.MINOR.PATCH
- **Releases:** Etiquetas de Git para versiones
- **Changelog:** Documentación de cambios

### Monitoreo de Errores
```typescript
// src/services/errorService.ts
import { logEvent } from 'firebase/analytics';

export class ErrorService {
  static logError(error: Error, context: string): void {
    logEvent(analytics, 'error_occurred', {
      error_message: error.message,
      error_stack: error.stack,
      context: context,
      timestamp: new Date().toISOString()
    });
  }
}
```

---

## CONCLUSIÓN

Esta documentación proporciona una guía completa para crear e implementar un curso interactivo de cálculo diferencial con autenticación por correo y despliegue en Netlify. El sistema incluye:

- **Autenticación segura** con Firebase
- **Contenido interactivo** con ejercicios dinámicos
- **Seguimiento de progreso** en tiempo real
- **Interfaz moderna** y responsive
- **Despliegue automatizado** en Netlify
- **Monitoreo y analytics** integrados

El curso está diseñado para ser escalable, mantenible y proporcionar una experiencia de aprendizaje excepcional para los estudiantes de cálculo diferencial.
