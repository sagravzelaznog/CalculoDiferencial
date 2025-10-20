import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Dashboard from './pages/Dashboard';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ModuleDetail from './pages/ModuleDetail';
import LessonDetail from './pages/LessonDetail';
import LoadingSpinner from './components/common/LoadingSpinner';

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Routes>
        {/* Rutas públicas */}
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" replace /> : <LoginForm />} 
        />
        <Route 
          path="/register" 
          element={user ? <Navigate to="/dashboard" replace /> : <RegisterForm />} 
        />
        
        {/* Ruta raíz - redirige según autenticación */}
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
        />
        
        {/* Rutas protegidas */}
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/modules/:moduleId" 
          element={user ? <ModuleDetail /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/modules/:moduleId/lessons/:lessonId" 
          element={user ? <LessonDetail /> : <Navigate to="/login" replace />} 
        />
        
        {/* Ruta 404 */}
        <Route 
          path="*" 
          element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">Página no encontrada</p>
                <a 
                  href="/dashboard" 
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
                >
                  Volver al Dashboard
                </a>
              </div>
            </div>
          } 
        />
      </Routes>
    </div>
  );
};

export default App;
