// src/components/exercises/ExerciseEngine.tsx
import React, { useState, useEffect } from 'react';
import { Exercise } from '../../types/course';
import { CheckCircle, XCircle, Lightbulb, RotateCcw } from 'lucide-react';

interface ExerciseEngineProps {
  exercise: Exercise;
  onAnswer: (isCorrect: boolean, timeSpent: number) => void;
  onNext?: () => void;
  showHints?: boolean;
}

export const ExerciseEngine: React.FC<ExerciseEngineProps> = ({ 
  exercise, 
  onAnswer,
  onNext,
  showHints = true
}) => {
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [currentHint, setCurrentHint] = useState(0);
  const [startTime] = useState(Date.now());
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;

    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const correct = checkAnswer(userAnswer);
    
    setIsCorrect(correct);
    setShowResult(true);
    setAttempts(prev => prev + 1);
    
    onAnswer(correct, timeSpent);
  };

  const checkAnswer = (answer: string): boolean => {
    const normalizedAnswer = answer.trim().toLowerCase();
    const normalizedCorrect = exercise.correctAnswer.toString().toLowerCase();
    
    // Para cálculos numéricos, permitir diferentes formatos
    if (exercise.type === 'calculation') {
      const numAnswer = parseFloat(normalizedAnswer);
      const numCorrect = parseFloat(normalizedCorrect);
      
      if (!isNaN(numAnswer) && !isNaN(numCorrect)) {
        return Math.abs(numAnswer - numCorrect) < 0.001;
      }
    }
    
    return normalizedAnswer === normalizedCorrect;
  };

  const showNextHint = () => {
    if (currentHint < exercise.hints.length - 1) {
      setCurrentHint(prev => prev + 1);
    }
  };

  const resetExercise = () => {
    setUserAnswer('');
    setShowResult(false);
    setIsCorrect(null);
    setCurrentHint(0);
    setAttempts(0);
  };

  const renderExercise = () => {
    switch (exercise.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {exercise.options?.map((option, index) => (
              <label 
                key={index} 
                className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  userAnswer === option 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={userAnswer === option}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                  disabled={showResult}
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );
      
      case 'true-false':
        return (
          <div className="space-y-3">
            {['Verdadero', 'Falso'].map((option) => (
              <label 
                key={option}
                className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  userAnswer === option 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={userAnswer === option}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                  disabled={showResult}
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );
      
      case 'fill-blank':
        return (
          <div className="space-y-4">
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: exercise.question }}
            />
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              placeholder="Ingresa tu respuesta"
              disabled={showResult}
            />
          </div>
        );
      
      case 'calculation':
        return (
          <div className="space-y-4">
            <div 
              className="bg-gray-50 p-6 rounded-lg prose max-w-none"
              dangerouslySetInnerHTML={{ __html: exercise.question }}
            />
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="Ingresa tu respuesta"
                disabled={showResult}
              />
              <span className="text-gray-500 text-sm">Puntos: {exercise.points}</span>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            exercise.difficulty === 'easy' 
              ? 'bg-green-100 text-green-800'
              : exercise.difficulty === 'medium'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {exercise.difficulty === 'easy' ? 'Fácil' : 
             exercise.difficulty === 'medium' ? 'Medio' : 'Difícil'}
          </span>
          <span className="text-sm text-gray-500">
            {exercise.points} puntos
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            Intento {attempts + 1}
          </span>
          {attempts > 0 && (
            <button
              onClick={resetExercise}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Reiniciar ejercicio"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Exercise Content */}
      <div className="mb-6">
        {renderExercise()}
      </div>

      {/* Hints */}
      {showHints && exercise.hints.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700 flex items-center">
              <Lightbulb className="h-4 w-4 mr-1" />
              Pistas ({currentHint + 1}/{exercise.hints.length})
            </h4>
            {currentHint < exercise.hints.length - 1 && (
              <button
                onClick={showNextHint}
                className="text-sm text-blue-600 hover:text-blue-700"
                disabled={showResult}
              >
                Ver siguiente pista
              </button>
            )}
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              {exercise.hints[currentHint]}
            </p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-between items-center">
        <button
          onClick={handleSubmit}
          disabled={!userAnswer.trim() || showResult}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {showResult ? 'Respuesta Enviada' : 'Verificar Respuesta'}
        </button>

        {onNext && showResult && (
          <button
            onClick={onNext}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Siguiente Ejercicio
          </button>
        )}
      </div>

      {/* Result */}
      {showResult && (
        <div className={`mt-6 p-4 rounded-lg ${
          isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-start space-x-3">
            {isCorrect ? (
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
            )}
            <div className="flex-1">
              <h4 className={`font-medium ${
                isCorrect ? 'text-green-800' : 'text-red-800'
              }`}>
                {isCorrect ? '¡Correcto!' : 'Incorrecto'}
              </h4>
              <p className={`text-sm mt-1 ${
                isCorrect ? 'text-green-700' : 'text-red-700'
              }`}>
                {isCorrect 
                  ? `Ganaste ${exercise.points} puntos`
                  : `La respuesta correcta es: ${exercise.correctAnswer}`
                }
              </p>
            </div>
          </div>
          
          <div className="mt-3">
            <h5 className="font-medium text-gray-800 mb-2">Explicación:</h5>
            <div 
              className="prose prose-sm max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: exercise.explanation }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
