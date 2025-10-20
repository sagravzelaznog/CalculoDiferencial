// src/components/modules/ModuleCard.tsx
import React from 'react';
import { Module } from '../../types/course';
import { Clock, CheckCircle, PlayCircle, Lock } from 'lucide-react';

interface ModuleCardProps {
  module: Module;
  progress: number;
  isUnlocked: boolean;
  onStart: () => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ 
  module, 
  progress, 
  isUnlocked,
  onStart 
}) => {
  const isCompleted = progress === 100;
  const canStart = isUnlocked && !isCompleted;

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 ${
      isUnlocked ? 'hover:shadow-lg' : 'opacity-60'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isCompleted ? 'bg-green-100' : isUnlocked ? 'bg-blue-100' : 'bg-gray-100'
          }`}>
            {isCompleted ? (
              <CheckCircle className="h-6 w-6 text-green-600" />
            ) : isUnlocked ? (
              <PlayCircle className="h-6 w-6 text-blue-600" />
            ) : (
              <Lock className="h-6 w-6 text-gray-400" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {module.title}
            </h3>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>{module.duration} horas</span>
            </div>
          </div>
        </div>
        
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          isCompleted 
            ? 'bg-green-100 text-green-800' 
            : isUnlocked 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          Módulo {module.order}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-3">{module.description}</p>
      
      {/* Prerequisites */}
      {module.prerequisites.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">Prerrequisitos:</p>
          <div className="flex flex-wrap gap-1">
            {module.prerequisites.map((prereq, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                Módulo {prereq.split('-')[1]}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progreso</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              isCompleted ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Stats */}
      <div className="flex justify-between text-sm text-gray-500 mb-4">
        <span>{module.lessons.length} lecciones</span>
        <span>{module.exercises.length} ejercicios</span>
      </div>
      
      {/* Action Button */}
      <button
        onClick={onStart}
        disabled={!canStart}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
          isCompleted
            ? 'bg-green-100 text-green-700 cursor-default'
            : canStart
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isCompleted ? (
          <div className="flex items-center justify-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Completado
          </div>
        ) : canStart ? (
          progress === 0 ? 'Comenzar' : 'Continuar'
        ) : (
          'Bloqueado'
        )}
      </button>
    </div>
  );
};
