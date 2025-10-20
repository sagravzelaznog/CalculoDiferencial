// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import ModuleCard from '../components/modules/ModuleCard';
import { modules, getModulesByPrerequisites } from '../data/modules';
import { ProgressService } from '../services/progressService';
import { UserProgress } from '../types/course';
import { LogOut, User, Trophy, Clock, BookOpen } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, appUser, logout } = useAuth();
  const [userProgress, setUserProgress] = useState<Record<string, UserProgress>>({});
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalModules: modules.length,
    completedModules: 0,
    totalLessons: 0,
    completedLessons: 0,
    totalExercises: 0,
    completedExercises: 0,
    totalTimeSpent: 0,
    averageScore: 0
  });

  useEffect(() => {
    loadUserProgress();
  }, [user]);

  const loadUserProgress = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const progressData: Record<string, UserProgress> = {};

      for (const module of modules) {
        const progress = await ProgressService.getUserProgress(user.uid, module.id);
        if (progress) {
          progressData[module.id] = progress;
        }
      }

      setUserProgress(progressData);
      calculateStats(progressData);
    } catch (error) {
      console.error('Error loading user progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (progressData: Record<string, UserProgress>) => {
    const completedModules = Object.values(progressData).filter(
      progress => progress.completedLessons.length === modules.find(m => m.id === progress.moduleId)?.lessons.length
    ).length;

    const totalLessons = modules.reduce((total, module) => total + module.lessons.length, 0);
    const completedLessons = Object.values(progressData).reduce(
      (total, progress) => total + progress.completedLessons.length, 0
    );

    const totalExercises = modules.reduce((total, module) => total + module.exercises.length, 0);
    const completedExercises = Object.values(progressData).reduce(
      (total, progress) => total + progress.completedExercises.length, 0
    );

    const totalTimeSpent = Object.values(progressData).reduce(
      (total, progress) => total + progress.totalTimeSpent, 0
    );

    const averageScore = Object.values(progressData).reduce((total, progress) => {
      const moduleAssessments = progress.assessmentAttempts;
      if (moduleAssessments.length > 0) {
        const latestScore = moduleAssessments[moduleAssessments.length - 1].score;
        return total + latestScore;
      }
      return total;
    }, 0) / Math.max(completedModules, 1);

    setStats({
      totalModules: modules.length,
      completedModules,
      totalLessons,
      completedLessons,
      totalExercises,
      completedExercises,
      totalTimeSpent,
      averageScore: Math.round(averageScore)
    });
  };

  const getModuleProgress = (moduleId: string): number => {
    const progress = userProgress[moduleId];
    if (!progress) return 0;

    const module = modules.find(m => m.id === moduleId);
    if (!module) return 0;

    const totalLessons = module.lessons.length;
    const completedLessons = progress.completedLessons.length;
    
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  };

  const isModuleUnlocked = (moduleId: string): boolean => {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return false;

    return module.prerequisites.every(prereq => {
      const prereqProgress = getModuleProgress(prereq);
      return prereqProgress === 100;
    });
  };

  const handleStartModule = (moduleId: string) => {
    // Navegar al módulo
    console.log('Starting module:', moduleId);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando tu progreso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Curso de Cálculo Diferencial
                </h1>
                <p className="text-gray-600">
                  Bienvenido, {appUser?.displayName || user?.email}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Trophy className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Módulos Completados</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.completedModules}/{stats.totalModules}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Lecciones</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.completedLessons}/{stats.totalLessons}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <User className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ejercicios</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.completedExercises}/{stats.totalExercises}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tiempo Total</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {Math.round(stats.totalTimeSpent / 60)}h
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Módulos del Curso
          </h2>
          <p className="text-gray-600 mb-6">
            Completa todos los módulos para dominar el cálculo diferencial
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              progress={getModuleProgress(module.id)}
              isUnlocked={isModuleUnlocked(module.id)}
              onStart={() => handleStartModule(module.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
