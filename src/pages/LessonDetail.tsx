import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { courseModules } from '../../data/modules';
import ExerciseEngine from '../../components/exercises/ExerciseEngine';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { logoutUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const LessonDetail: React.FC = () => {
  const { moduleId, lessonId } = useParams<{ moduleId: string; lessonId: string }>();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exerciseResults, setExerciseResults] = useState<boolean[]>([]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  const module = courseModules.find(m => m.id === moduleId);
  const lesson = module?.lessons.find(l => l.id === lessonId);

  if (!module || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Lección no encontrada</h1>
          <p className="text-xl text-gray-600 mb-8">La lección que buscas no existe</p>
          <Link
            to="/dashboard"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
          >
            Volver al Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logoutUser();
    navigate('/login');
  };

  const handleExerciseComplete = (isCorrect: boolean) => {
    const newResults = [...exerciseResults];
    newResults[currentExerciseIndex] = isCorrect;
    setExerciseResults(newResults);
    
    // Avanzar al siguiente ejercicio después de un breve delay
    setTimeout(() => {
      if (currentExerciseIndex < (lesson.exercises?.length || 0) - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
      }
    }, 2000);
  };

  const currentExercise = lesson.exercises?.[currentExerciseIndex];
  const completedExercises = exerciseResults.filter(result => result !== undefined).length;
  const totalExercises = lesson.exercises?.length || 0;
  const correctAnswers = exerciseResults.filter(result => result === true).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link
                to={`/modules/${moduleId}`}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                ← Volver al Módulo
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-800">{lesson.title}</h1>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progreso de ejercicios */}
        {totalExercises > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Progreso de Ejercicios</h2>
              <span className="text-sm text-gray-600">
                {completedExercises} de {totalExercises} completados
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedExercises / totalExercises) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Correctas: {correctAnswers}</span>
              <span>Incorrectas: {completedExercises - correctAnswers}</span>
            </div>
          </div>
        )}

        {/* Contenido de la lección */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div 
            className="lesson-content prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: lesson.content.replace(/\n/g, '<br/>') }}
          />
        </div>

        {/* Ejercicios */}
        {totalExercises > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Ejercicios ({currentExerciseIndex + 1} de {totalExercises})
              </h2>
              <div className="flex space-x-2">
                {lesson.exercises?.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentExerciseIndex
                        ? 'bg-blue-500'
                        : index < currentExerciseIndex
                        ? exerciseResults[index] === true
                          ? 'bg-green-500'
                          : 'bg-red-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {currentExercise && (
              <ExerciseEngine
                exercise={currentExercise}
                onComplete={handleExerciseComplete}
              />
            )}

            {/* Navegación entre ejercicios */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setCurrentExerciseIndex(Math.max(0, currentExerciseIndex - 1))}
                disabled={currentExerciseIndex === 0}
                className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                ← Anterior
              </button>
              
              <button
                onClick={() => setCurrentExerciseIndex(Math.min(totalExercises - 1, currentExerciseIndex + 1))}
                disabled={currentExerciseIndex === totalExercises - 1}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Siguiente →
              </button>
            </div>
          </div>
        )}

        {/* Resumen final */}
        {completedExercises === totalExercises && totalExercises > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                ¡Lección Completada!
              </h3>
              <p className="text-green-700 mb-4">
                Has completado todos los ejercicios de esta lección.
              </p>
              <div className="text-sm text-green-600">
                Respuestas correctas: {correctAnswers} de {totalExercises}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonDetail;
