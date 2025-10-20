import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { courseModules } from '../../data/modules';
import LessonCard from '../../components/modules/LessonCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { logoutUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const ModuleDetail: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  const module = courseModules.find(m => m.id === moduleId);

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Módulo no encontrado</h1>
          <p className="text-xl text-gray-600 mb-8">El módulo que buscas no existe</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                ← Volver al Dashboard
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-800">{module.title}</h1>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Descripción del módulo */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Descripción del Módulo</h2>
          <p className="text-gray-600 leading-relaxed">{module.description}</p>
        </div>

        {/* Lecciones */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Lecciones del Módulo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {module.lessons.map((lesson, index) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                moduleId={moduleId!}
                lessonNumber={index + 1}
              />
            ))}
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">💡 Consejos para este módulo</h3>
          <ul className="text-blue-700 space-y-2">
            <li>• Estudia las lecciones en orden secuencial</li>
            <li>• Completa todos los ejercicios para reforzar el aprendizaje</li>
            <li>• No dudes en repetir las lecciones si es necesario</li>
            <li>• Toma notas mientras estudias</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetail;
