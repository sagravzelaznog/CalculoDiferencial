// src/services/progressService.ts
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { UserProgress, ModuleProgress, LessonProgress } from '../types/course';

export class ProgressService {
  private static instance: ProgressService;
  
  static getInstance(): ProgressService {
    if (!ProgressService.instance) {
      ProgressService.instance = new ProgressService();
    }
    return ProgressService.instance;
  }

  async getUserProgress(userId: string): Promise<Record<string, UserProgress>> {
    try {
      const progressRef = doc(db, 'userProgress', userId);
      const progressSnap = await getDoc(progressRef);
      
      if (progressSnap.exists()) {
        return progressSnap.data() as Record<string, UserProgress>;
      }
      
      return {};
    } catch (error) {
      console.error('Error getting user progress:', error);
      return {};
    }
  }

  async updateModuleProgress(
    userId: string, 
    moduleId: string, 
    progress: Partial<ModuleProgress>
  ): Promise<void> {
    try {
      const progressRef = doc(db, 'userProgress', userId);
      const progressSnap = await getDoc(progressRef);
      
      const currentProgress = progressSnap.exists() 
        ? progressSnap.data() as Record<string, UserProgress>
        : {};

      if (!currentProgress[moduleId]) {
        currentProgress[moduleId] = {
          moduleId,
          completed: false,
          progress: 0,
          lastAccessed: new Date(),
          lessonsCompleted: [],
          exercisesCompleted: [],
          totalTimeSpent: 0,
          score: 0
        };
      }

      currentProgress[moduleId] = {
        ...currentProgress[moduleId],
        ...progress,
        lastAccessed: new Date()
      };

      await setDoc(progressRef, currentProgress, { merge: true });
    } catch (error) {
      console.error('Error updating module progress:', error);
      throw error;
    }
  }

  async updateLessonProgress(
    userId: string,
    moduleId: string,
    lessonId: string,
    completed: boolean
  ): Promise<void> {
    try {
      const progressRef = doc(db, 'userProgress', userId);
      const progressSnap = await getDoc(progressRef);
      
      const currentProgress = progressSnap.exists() 
        ? progressSnap.data() as Record<string, UserProgress>
        : {};

      if (!currentProgress[moduleId]) {
        currentProgress[moduleId] = {
          moduleId,
          completed: false,
          progress: 0,
          lastAccessed: new Date(),
          lessonsCompleted: [],
          exercisesCompleted: [],
          totalTimeSpent: 0,
          score: 0
        };
      }

      const moduleProgress = currentProgress[moduleId];
      
      if (completed && !moduleProgress.lessonsCompleted.includes(lessonId)) {
        moduleProgress.lessonsCompleted.push(lessonId);
      }

      // Calcular progreso del módulo
      const totalLessons = 5; // Esto debería venir de los datos del módulo
      moduleProgress.progress = (moduleProgress.lessonsCompleted.length / totalLessons) * 100;
      
      if (moduleProgress.progress >= 100) {
        moduleProgress.completed = true;
      }

      await setDoc(progressRef, currentProgress, { merge: true });
    } catch (error) {
      console.error('Error updating lesson progress:', error);
      throw error;
    }
  }

  async updateExerciseProgress(
    userId: string,
    moduleId: string,
    exerciseId: string,
    isCorrect: boolean,
    score: number
  ): Promise<void> {
    try {
      const progressRef = doc(db, 'userProgress', userId);
      const progressSnap = await getDoc(progressRef);
      
      const currentProgress = progressSnap.exists() 
        ? progressSnap.data() as Record<string, UserProgress>
        : {};

      if (!currentProgress[moduleId]) {
        currentProgress[moduleId] = {
          moduleId,
          completed: false,
          progress: 0,
          lastAccessed: new Date(),
          lessonsCompleted: [],
          exercisesCompleted: [],
          totalTimeSpent: 0,
          score: 0
        };
      }

      const moduleProgress = currentProgress[moduleId];
      
      if (!moduleProgress.exercisesCompleted.includes(exerciseId)) {
        moduleProgress.exercisesCompleted.push(exerciseId);
      }

      // Actualizar puntuación
      moduleProgress.score += score;

      await setDoc(progressRef, currentProgress, { merge: true });
    } catch (error) {
      console.error('Error updating exercise progress:', error);
      throw error;
    }
  }

  async getModuleStats(userId: string): Promise<{
    totalModules: number;
    completedModules: number;
    totalLessons: number;
    completedLessons: number;
    totalExercises: number;
    completedExercises: number;
    averageScore: number;
  }> {
    try {
      const userProgress = await this.getUserProgress(userId);
      
      const stats = {
        totalModules: 5, // Esto debería venir de los datos
        completedModules: 0,
        totalLessons: 0,
        completedLessons: 0,
        totalExercises: 0,
        completedExercises: 0,
        averageScore: 0
      };

      let totalScore = 0;
      let moduleCount = 0;

      Object.values(userProgress).forEach(progress => {
        if (progress.completed) {
          stats.completedModules++;
        }
        
        stats.completedLessons += progress.lessonsCompleted.length;
        stats.completedExercises += progress.exercisesCompleted.length;
        
        totalScore += progress.score;
        moduleCount++;
      });

      stats.averageScore = moduleCount > 0 ? totalScore / moduleCount : 0;

      return stats;
    } catch (error) {
      console.error('Error getting module stats:', error);
      return {
        totalModules: 5,
        completedModules: 0,
        totalLessons: 0,
        completedLessons: 0,
        totalExercises: 0,
        completedExercises: 0,
        averageScore: 0
      };
    }
  }
}

// Instancia singleton
export const progressService = ProgressService.getInstance();
