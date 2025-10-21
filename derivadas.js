/**
 * Módulo de Derivadas - Cálculo Diferencial
 * Funciones matemáticas y herramientas interactivas para el aprendizaje de derivadas
 */

class DerivadaCalculator {
    constructor() {
        this.functions = new Map();
        this.initializeBasicFunctions();
    }

    initializeBasicFunctions() {
        // Funciones trigonométricas
        this.functions.set('sin', {
            derivative: 'cos',
            latex: '\\sin(x) \\rightarrow \\cos(x)'
        });
        
        this.functions.set('cos', {
            derivative: '-sin',
            latex: '\\cos(x) \\rightarrow -\\sin(x)'
        });
        
        this.functions.set('tan', {
            derivative: 'sec^2',
            latex: '\\tan(x) \\rightarrow \\sec^2(x)'
        });

        // Funciones exponenciales y logarítmicas
        this.functions.set('exp', {
            derivative: 'exp',
            latex: 'e^x \\rightarrow e^x'
        });
        
        this.functions.set('ln', {
            derivative: '1/x',
            latex: '\\ln(x) \\rightarrow \\frac{1}{x}'
        });
    }

    // Calcular derivada de una función polinómica
    derivativePolynomial(expression) {
        // Simplificación básica para polinomios
        const terms = expression.split(/[+-]/);
        const derivatives = terms.map(term => {
            term = term.trim();
            
            // Manejar términos con potencia
            if (term.includes('x^')) {
                const match = term.match(/(\d*\.?\d*)x\^(\d+)/);
                if (match) {
                    const coefficient = parseFloat(match[1]) || 1;
                    const power = parseInt(match[2]);
                    const newCoefficient = coefficient * power;
                    const newPower = power - 1;
                    
                    if (newPower === 0) {
                        return `${newCoefficient}`;
                    } else if (newPower === 1) {
                        return `${newCoefficient}x`;
                    } else {
                        return `${newCoefficient}x^${newPower}`;
                    }
                }
            }
            
            // Manejar términos lineales
            if (term.includes('x') && !term.includes('^')) {
                const coefficient = parseFloat(term.replace('x', '')) || 1;
                return `${coefficient}`;
            }
            
            // Constantes
            if (!term.includes('x')) {
                return '0';
            }
            
            return term;
        });
        
        return derivatives.filter(derivative => derivative !== '0').join(' + ');
    }

    // Calcular derivada usando reglas básicas
    calculateDerivative(expression) {
        try {
            // Limpiar la expresión
            expression = expression.replace(/\s/g, '');
            
            // Verificar si es un polinomio simple
            if (this.isSimplePolynomial(expression)) {
                return this.derivativePolynomial(expression);
            }
            
            // Verificar funciones especiales
            for (const [funcName, funcData] of this.functions) {
                if (expression.includes(funcName)) {
                    return funcData.derivative;
                }
            }
            
            return 'Función no reconocida';
        } catch (error) {
            return 'Error en el cálculo';
        }
    }

    isSimplePolynomial(expression) {
        // Verificar si la expresión es un polinomio simple
        const polynomialPattern = /^[\d\s\.\+\-\*x\^\(\)]+$/;
        return polynomialPattern.test(expression);
    }

    // Generar ejercicios aleatorios
    generateRandomExercise() {
        const exercises = [
            {
                function: 'x^3 + 2x^2 - 5x + 1',
                answer: '3x^2 + 4x - 5',
                explanation: 'Aplicando la regla de la potencia a cada término'
            },
            {
                function: 'x^4 - 3x^2 + 7',
                answer: '4x^3 - 6x',
                explanation: 'Derivando término por término'
            },
            {
                function: '5x^2 + 3x - 2',
                answer: '10x + 3',
                explanation: 'Regla de la potencia y derivada de constante'
            },
            {
                function: 'sin(x) + cos(x)',
                answer: 'cos(x) - sin(x)',
                explanation: 'Derivadas de funciones trigonométricas'
            },
            {
                function: 'e^x + ln(x)',
                answer: 'e^x + 1/x',
                explanation: 'Derivadas de funciones exponenciales y logarítmicas'
            }
        ];
        
        return exercises[Math.floor(Math.random() * exercises.length)];
    }

    // Validar respuesta del estudiante
    validateAnswer(studentAnswer, correctAnswer) {
        // Normalizar respuestas
        const normalize = (answer) => {
            return answer.replace(/\s/g, '').toLowerCase();
        };
        
        const normalizedStudent = normalize(studentAnswer);
        const normalizedCorrect = normalize(correctAnswer);
        
        return normalizedStudent === normalizedCorrect;
    }
}

class GraphPlotter {
    constructor() {
        this.defaultRange = [-5, 5];
        this.defaultHeight = 300;
        this.defaultWidth = 500;
    }

    // Graficar función y su derivada
    plotFunctionAndDerivative(functionStr, containerId) {
        try {
            const derivative = this.calculateNumericDerivative(functionStr);
            
            functionPlot({
                target: containerId,
                width: this.defaultWidth,
                height: this.defaultHeight,
                grid: true,
                data: [
                    {
                        fn: functionStr,
                        color: 'blue',
                        graphType: 'polyline'
                    },
                    {
                        fn: derivative,
                        color: 'red',
                        graphType: 'polyline'
                    }
                ]
            });
        } catch (error) {
            console.error('Error al graficar:', error);
        }
    }

    // Calcular derivada numéricamente
    calculateNumericDerivative(functionStr, point = null) {
        // Esta es una implementación simplificada
        // En una aplicación real usarías una librería como math.js
        const h = 0.001;
        
        // Función simplificada para derivadas comunes
        if (functionStr.includes('x^2')) {
            return functionStr.replace('x^2', '2*x');
        } else if (functionStr.includes('x^3')) {
            return functionStr.replace('x^3', '3*x^2');
        } else if (functionStr.includes('sin(x)')) {
            return functionStr.replace('sin(x)', 'cos(x)');
        } else if (functionStr.includes('cos(x)')) {
            return functionStr.replace('cos(x)', '-sin(x)');
        } else if (functionStr.includes('e^x')) {
            return 'e^x';
        }
        
        return 'derivada';
    }

    // Graficar recta tangente
    plotTangent(functionStr, point, containerId) {
        try {
            const h = 0.001;
            
            // Evaluar función en el punto (simplificado)
            const y = this.evaluateFunction(functionStr, point);
            const derivative = this.calculateNumericDerivative(functionStr, point);
            
            // Calcular pendiente (simplificado)
            const slope = this.evaluateFunction(derivative, point);
            const intercept = y - slope * point;
            
            functionPlot({
                target: containerId,
                width: this.defaultWidth,
                height: this.defaultHeight,
                grid: true,
                data: [
                    {
                        fn: functionStr,
                        color: 'blue',
                        graphType: 'polyline'
                    },
                    {
                        fn: `${slope} * x + ${intercept}`,
                        color: 'red',
                        graphType: 'polyline'
                    }
                ]
            });
        } catch (error) {
            console.error('Error al graficar tangente:', error);
        }
    }

    evaluateFunction(functionStr, x) {
        // Evaluación simplificada de funciones
        try {
            const func = new Function('x', `return ${functionStr}`);
            return func(x);
        } catch (error) {
            return 0;
        }
    }
}

class ExerciseGenerator {
    constructor() {
        this.difficultyLevels = ['básico', 'intermedio', 'avanzado'];
        this.topics = [
            'regla_potencia',
            'regla_producto',
            'regla_cociente',
            'regla_cadena',
            'trigonometricas',
            'exponenciales',
            'implicitas'
        ];
    }

    generateExercise(topic, difficulty = 'básico') {
        const exercises = {
            regla_potencia: {
                básico: [
                    {
                        question: 'Deriva: f(x) = x^4',
                        answer: '4x^3',
                        explanation: 'Aplicando la regla de la potencia: d/dx[x^n] = nx^(n-1)'
                    },
                    {
                        question: 'Deriva: f(x) = 3x^2 + 2x - 1',
                        answer: '6x + 2',
                        explanation: 'Derivando término por término'
                    }
                ],
                intermedio: [
                    {
                        question: 'Deriva: f(x) = 2x^5 - 4x^3 + x^2 - 7x + 3',
                        answer: '10x^4 - 12x^2 + 2x - 7',
                        explanation: 'Aplicando la regla de la potencia a cada término'
                    }
                ]
            },
            regla_producto: {
                básico: [
                    {
                        question: 'Deriva: f(x) = x^2 * sin(x)',
                        answer: '2x*sin(x) + x^2*cos(x)',
                        explanation: 'Regla del producto: (uv)\' = u\'v + uv\''
                    }
                ]
            },
            trigonometricas: {
                básico: [
                    {
                        question: 'Deriva: f(x) = sin(x) + cos(x)',
                        answer: 'cos(x) - sin(x)',
                        explanation: 'Derivadas de funciones trigonométricas'
                    }
                ]
            }
        };

        const topicExercises = exercises[topic];
        if (!topicExercises || !topicExercises[difficulty]) {
            return this.getDefaultExercise();
        }

        const availableExercises = topicExercises[difficulty];
        return availableExercises[Math.floor(Math.random() * availableExercises.length)];
    }

    getDefaultExercise() {
        return {
            question: 'Deriva: f(x) = x^2',
            answer: '2x',
            explanation: 'Aplicando la regla de la potencia'
        };
    }

    // Generar examen completo
    generateExam(numQuestions = 5) {
        const exam = [];
        const topics = Object.keys(this.topics);
        
        for (let i = 0; i < numQuestions; i++) {
            const randomTopic = topics[Math.floor(Math.random() * topics.length)];
            const exercise = this.generateExercise(randomTopic, 'intermedio');
            exam.push({
                id: i + 1,
                ...exercise,
                topic: randomTopic
            });
        }
        
        return exam;
    }
}

class ProgressTracker {
    constructor() {
        this.progress = {
            concepto: 0,
            reglas: 0,
            especiales: 0,
            superiores: 0,
            implicita: 0
        };
        this.totalExercises = 0;
        this.correctAnswers = 0;
    }

    updateProgress(topic, score) {
        this.progress[topic] = score;
        this.updateProgressBar();
    }

    updateProgressBar() {
        const totalProgress = Object.values(this.progress).reduce((sum, score) => sum + score, 0);
        const maxPossible = Object.keys(this.progress).length * 100;
        const percentage = (totalProgress / maxPossible) * 100;
        
        // Actualizar barra de progreso en la interfaz
        const progressBar = document.querySelector('.progress-fill');
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }
        
        return percentage;
    }

    recordExerciseResult(correct) {
        this.totalExercises++;
        if (correct) {
            this.correctAnswers++;
        }
    }

    getScore() {
        if (this.totalExercises === 0) return 0;
        return (this.correctAnswers / this.totalExercises) * 100;
    }

    getDetailedProgress() {
        return {
            overall: this.updateProgressBar(),
            byTopic: this.progress,
            exercises: {
                total: this.totalExercises,
                correct: this.correctAnswers,
                score: this.getScore()
            }
        };
    }
}

// Instancias globales
const derivadaCalculator = new DerivadaCalculator();
const graphPlotter = new GraphPlotter();
const exerciseGenerator = new ExerciseGenerator();
const progressTracker = new ProgressTracker();

// Funciones de utilidad global
function showNotification(message, type = 'info') {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

function formatLatex(latexString) {
    // Función para formatear LaTeX en el DOM
    if (typeof MathJax !== 'undefined') {
        MathJax.typesetPromise([latexString]);
    }
    return latexString;
}

function animateProgress(elementId, targetValue, duration = 1000) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startValue = 0;
    const startTime = performance.now();
    
    function updateProgress(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = startValue + (targetValue - startValue) * progress;
        
        element.style.width = `${currentValue}%`;
        
        if (progress < 1) {
            requestAnimationFrame(updateProgress);
        }
    }
    
    requestAnimationFrame(updateProgress);
}

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DerivadaCalculator,
        GraphPlotter,
        ExerciseGenerator,
        ProgressTracker
    };
}
