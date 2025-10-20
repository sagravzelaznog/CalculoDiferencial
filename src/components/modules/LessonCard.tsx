import React from 'react';
import { Link } from 'react-router-dom';
import { Lesson } from '../../types/course';

interface LessonCardProps {
  lesson: Lesson;
  moduleId: string;
  lessonNumber: number;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, moduleId, lessonNumber }) => {
  const hasExercises = lesson.exercises && lesson.exercises.length > 0;
  const exerciseCount = lesson.exercises?.length || 0;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 text-blue-800 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm">
            {lessonNumber}
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{lesson.title}</h3>
        </div>
        {hasExercises && (
          <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
            {exerciseCount} ejercicio{exerciseCount !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      <div className="mb-4">
        <p className="text-gray-600 text-sm line-clamp-3">
          {lesson.content.substring(0, 150)}...
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Link
          to={`/modules/${moduleId}/lessons/${lesson.id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 text-sm"
        >
          Ver Lección
        </Link>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>~15 min</span>
        </div>
      </div>

      {/* Indicador de progreso (simulado) */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span>Progreso</span>
          <span>0%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div className="bg-blue-500 h-1 rounded-full w-0 transition-all duration-300"></div>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
