// src/types/course.ts
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: 'student' | 'teacher' | 'admin';
  createdAt: Date;
  lastLoginAt: Date;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  duration: number; // en horas
  order: number;
  prerequisites: string[];
  lessons: Lesson[];
  exercises: Exercise[];
  assessment: Assessment;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  videoUrl?: string;
  interactiveElements: InteractiveElement[];
  order: number;
  estimatedTime: number; // en minutos
  isPublished: boolean;
}

export interface InteractiveElement {
  id: string;
  type: 'graph' | 'calculator' | 'simulation' | 'quiz';
  title: string;
  content: string;
  config: Record<string, any>;
}

export interface Exercise {
  id: string;
  moduleId: string;
  lessonId?: string;
  type: 'multiple-choice' | 'fill-blank' | 'graphing' | 'calculation' | 'true-false';
  question: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  hints: string[];
  tags: string[];
  isPublished: boolean;
}

export interface Assessment {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  questions: Exercise[];
  timeLimit: number; // en minutos
  passingScore: number; // porcentaje
  maxAttempts: number;
  isPublished: boolean;
}

export interface UserProgress {
  userId: string;
  moduleId: string;
  completedLessons: string[];
  completedExercises: string[];
  assessmentAttempts: AssessmentAttempt[];
  currentLesson?: string;
  lastAccessed: Date;
  totalTimeSpent: number; // en minutos
  createdAt: Date;
  updatedAt: Date;
}

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  score: number;
  answers: Record<string, any>;
  timeSpent: number; // en minutos
  completedAt: Date;
  passed: boolean;
}

export interface CourseStats {
  totalModules: number;
  completedModules: number;
  totalLessons: number;
  completedLessons: number;
  totalExercises: number;
  completedExercises: number;
  averageScore: number;
  totalTimeSpent: number;
  streak: number; // días consecutivos
  lastActivity: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

export interface CourseSettings {
  enableNotifications: boolean;
  enableDarkMode: boolean;
  enableOfflineMode: boolean;
  language: 'es' | 'en';
  mathRenderer: 'katex' | 'mathjax';
  fontSize: 'small' | 'medium' | 'large';
  theme: 'light' | 'dark' | 'auto';
}
