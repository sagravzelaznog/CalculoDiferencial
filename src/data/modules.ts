// src/data/modules.ts
import { Module, Lesson, Exercise, Assessment } from '../types/course';

export const modules: Module[] = [
  {
    id: 'modulo-1',
    title: 'Relaciones y Funciones',
    description: 'Comprende los conceptos fundamentales de relaciones y funciones, sus propiedades y representaciones gráficas.',
    duration: 12,
    order: 1,
    prerequisites: [],
    lessons: [
      {
        id: 'leccion-1-1',
        moduleId: 'modulo-1',
        title: 'Conceptos Básicos',
        content: `
          <h2>Definición de Relación y Función</h2>
          <p>Una <strong>relación</strong> es un conjunto de pares ordenados (x, y) donde x pertenece al conjunto A e y pertenece al conjunto B.</p>
          <p>Una <strong>función</strong> es una relación especial donde cada elemento del dominio tiene exactamente una imagen en el codominio.</p>
          
          <h3>Notación Funcional</h3>
          <p>Si f es una función que mapea x a y, escribimos:</p>
          <ul>
            <li>f: A → B (función de A a B)</li>
            <li>y = f(x) (y es función de x)</li>
            <li>f(x) = expresión (regla de correspondencia)</li>
          </ul>
          
          <h3>Dominio y Rango</h3>
          <p><strong>Dominio:</strong> Conjunto de todos los valores de entrada (x)</p>
          <p><strong>Rango:</strong> Conjunto de todos los valores de salida (y)</p>
        `,
        interactiveElements: [
          {
            id: 'graph-1-1',
            type: 'graph',
            title: 'Visualizador de Funciones',
            content: 'Grafica diferentes tipos de funciones y observa su dominio y rango',
            config: {
              functions: ['x^2', 'sqrt(x)', '1/x', 'sin(x)'],
              showDomain: true,
              showRange: true
            }
          }
        ],
        order: 1,
        estimatedTime: 30,
        isPublished: true
      },
      {
        id: 'leccion-1-2',
        moduleId: 'modulo-1',
        title: 'Propiedades de Funciones',
        content: `
          <h2>Tipos de Funciones según su Correspondencia</h2>
          
          <h3>Función Inyectiva (Uno a Uno)</h3>
          <p>Diferentes elementos del dominio tienen diferentes imágenes.</p>
          <p><strong>Prueba:</strong> Si f(a) = f(b), entonces a = b</p>
          
          <h3>Función Sobreyectiva (Sobre)</h3>
          <p>Todos los elementos del codominio tienen al menos una preimagen.</p>
          
          <h3>Función Biyectiva</h3>
          <p>Es tanto inyectiva como sobreyectiva.</p>
          
          <h2>Funciones Pares e Impares</h2>
          <p><strong>Función Par:</strong> f(-x) = f(x) (simétrica respecto al eje Y)</p>
          <p><strong>Función Impar:</strong> f(-x) = -f(x) (simétrica respecto al origen)</p>
        `,
        interactiveElements: [
          {
            id: 'quiz-1-2',
            type: 'quiz',
            title: 'Identificar Tipos de Funciones',
            content: 'Clasifica las funciones mostradas según sus propiedades',
            config: {
              questions: [
                {
                  function: 'x^2',
                  correctAnswer: 'par'
                },
                {
                  function: 'x^3',
                  correctAnswer: 'impar'
                }
              ]
            }
          }
        ],
        order: 2,
        estimatedTime: 45,
        isPublished: true
      }
    ],
    exercises: [
      {
        id: 'ejercicio-1-1',
        moduleId: 'modulo-1',
        lessonId: 'leccion-1-1',
        type: 'multiple-choice',
        question: '¿Cuál de las siguientes relaciones es una función?',
        options: [
          '{(1,2), (2,3), (1,4)}',
          '{(1,2), (2,3), (3,4)}',
          '{(1,2), (2,3), (2,4)}',
          '{(1,2), (1,3), (1,4)}'
        ],
        correctAnswer: '{(1,2), (2,3), (3,4)}',
        explanation: 'Una función debe tener exactamente una imagen para cada elemento del dominio. Solo la opción B cumple esta condición.',
        difficulty: 'easy',
        points: 10,
        hints: [
          'Recuerda que en una función, cada elemento del dominio debe tener exactamente una imagen',
          'Revisa si algún elemento del dominio aparece más de una vez'
        ],
        tags: ['funciones', 'relaciones', 'dominio'],
        isPublished: true
      },
      {
        id: 'ejercicio-1-2',
        moduleId: 'modulo-1',
        lessonId: 'leccion-1-2',
        type: 'true-false',
        question: 'La función f(x) = x² es una función par',
        correctAnswer: true,
        explanation: 'f(-x) = (-x)² = x² = f(x), por lo tanto es una función par.',
        difficulty: 'easy',
        points: 10,
        hints: [
          'Para verificar si es par, evalúa f(-x)',
          'Si f(-x) = f(x), entonces es par'
        ],
        tags: ['funciones-pares', 'simetría'],
        isPublished: true
      }
    ],
    assessment: {
      id: 'evaluacion-1',
      moduleId: 'modulo-1',
      title: 'Evaluación: Relaciones y Funciones',
      description: 'Demuestra tu comprensión de los conceptos básicos de relaciones y funciones',
      questions: [],
      timeLimit: 60,
      passingScore: 70,
      maxAttempts: 3,
      isPublished: true
    },
    isPublished: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'modulo-2',
    title: 'Límites',
    description: 'Comprende el concepto de límite como fundamento del cálculo diferencial y aplica técnicas para calcular límites.',
    duration: 16,
    order: 2,
    prerequisites: ['modulo-1'],
    lessons: [
      {
        id: 'leccion-2-1',
        moduleId: 'modulo-2',
        title: 'Concepto de Límite',
        content: `
          <h2>Definición Intuitiva de Límite</h2>
          <p>El límite de f(x) cuando x tiende a a es L si podemos hacer que f(x) esté tan cerca de L como queramos, tomando x suficientemente cerca de a.</p>
          
          <h3>Notación</h3>
          <p>lim<sub>x→a</sub> f(x) = L</p>
          
          <h2>Definición Formal (ε-δ)</h2>
          <p>Para todo ε > 0, existe un δ > 0 tal que si 0 < |x - a| < δ, entonces |f(x) - L| < ε</p>
          
          <h2>Límites Laterales</h2>
          <p><strong>Límite por la izquierda:</strong> lim<sub>x→a⁻</sub> f(x)</p>
          <p><strong>Límite por la derecha:</strong> lim<sub>x→a⁺</sub> f(x)</p>
          <p>El límite existe si y solo si ambos límites laterales existen y son iguales.</p>
        `,
        interactiveElements: [
          {
            id: 'simulation-2-1',
            type: 'simulation',
            title: 'Explorador de Límites',
            content: 'Interactúa con diferentes funciones y observa cómo se comportan cerca de puntos específicos',
            config: {
              functions: ['x^2', 'sin(x)/x', '1/x', 'sqrt(x)'],
              showEpsilonDelta: true,
              interactiveMode: true
            }
          }
        ],
        order: 1,
        estimatedTime: 50,
        isPublished: true
      }
    ],
    exercises: [
      {
        id: 'ejercicio-2-1',
        moduleId: 'modulo-2',
        lessonId: 'leccion-2-1',
        type: 'calculation',
        question: 'Calcula el límite: lim<sub>x→2</sub> (x² - 4)/(x - 2)',
        correctAnswer: '4',
        explanation: 'Factorizando: (x² - 4)/(x - 2) = (x + 2)(x - 2)/(x - 2) = x + 2. Por lo tanto, lim<sub>x→2</sub> (x + 2) = 4',
        difficulty: 'medium',
        points: 15,
        hints: [
          'Factoriza el numerador',
          'Simplifica la expresión cancelando términos comunes',
          'Evalúa el límite de la expresión simplificada'
        ],
        tags: ['limites', 'factorizacion', 'simplificacion'],
        isPublished: true
      }
    ],
    assessment: {
      id: 'evaluacion-2',
      moduleId: 'modulo-2',
      title: 'Evaluación: Límites',
      description: 'Demuestra tu habilidad para calcular límites usando diferentes técnicas',
      questions: [],
      timeLimit: 90,
      passingScore: 70,
      maxAttempts: 3,
      isPublished: true
    },
    isPublished: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'modulo-3',
    title: 'Continuidad',
    description: 'Profundiza en el concepto de continuidad y sus aplicaciones en el análisis de funciones.',
    duration: 8,
    order: 3,
    prerequisites: ['modulo-2'],
    lessons: [],
    exercises: [],
    assessment: {
      id: 'evaluacion-3',
      moduleId: 'modulo-3',
      title: 'Evaluación: Continuidad',
      description: 'Demuestra tu comprensión de la continuidad de funciones',
      questions: [],
      timeLimit: 60,
      passingScore: 70,
      maxAttempts: 3,
      isPublished: true
    },
    isPublished: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'modulo-4',
    title: 'La Derivada',
    description: 'Comprende el concepto de derivada, sus interpretaciones y técnicas de derivación.',
    duration: 20,
    order: 4,
    prerequisites: ['modulo-3'],
    lessons: [],
    exercises: [],
    assessment: {
      id: 'evaluacion-4',
      moduleId: 'modulo-4',
      title: 'Evaluación: La Derivada',
      description: 'Demuestra tu habilidad para calcular derivadas usando diferentes reglas',
      questions: [],
      timeLimit: 120,
      passingScore: 70,
      maxAttempts: 3,
      isPublished: true
    },
    isPublished: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'modulo-5',
    title: 'Aplicaciones de la Derivada',
    description: 'Aplica el concepto de derivada en la resolución de problemas de optimización y análisis de funciones.',
    duration: 8,
    order: 5,
    prerequisites: ['modulo-4'],
    lessons: [],
    exercises: [],
    assessment: {
      id: 'evaluacion-5',
      moduleId: 'modulo-5',
      title: 'Evaluación: Aplicaciones de la Derivada',
      description: 'Demuestra tu capacidad para aplicar derivadas en problemas prácticos',
      questions: [],
      timeLimit: 90,
      passingScore: 70,
      maxAttempts: 3,
      isPublished: true
    },
    isPublished: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

export const getModuleById = (id: string): Module | undefined => {
  return modules.find(module => module.id === id);
};

export const getModulesByPrerequisites = (completedModules: string[]): Module[] => {
  return modules.filter(module => 
    module.prerequisites.every(prereq => completedModules.includes(prereq))
  );
};

export const getTotalModules = (): number => {
  return modules.length;
};

export const getTotalLessons = (): number => {
  return modules.reduce((total, module) => total + module.lessons.length, 0);
};

export const getTotalExercises = (): number => {
  return modules.reduce((total, module) => total + module.exercises.length, 0);
};
