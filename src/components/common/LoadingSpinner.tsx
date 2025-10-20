import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="relative">
          {/* Spinner principal */}
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          
          {/* Spinner secundario */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-12 border-4 border-transparent border-t-blue-300 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Cargando Curso...
        </h2>
        <p className="text-gray-500">
          Preparando tu experiencia de aprendizaje
        </p>
        
        {/* Puntos animados */}
        <div className="flex justify-center mt-4 space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
