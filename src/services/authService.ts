// src/services/authService.ts
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  UserCredential
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User as AppUser } from '../types/course';

export class AuthService {
  /**
   * Iniciar sesión con email y contraseña
   */
  static async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Actualizar último login
      await this.updateLastLogin(userCredential.user.uid);
      
      return userCredential.user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Registrar nuevo usuario
   */
  static async register(email: string, password: string, displayName?: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Actualizar perfil
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }
      
      // Crear documento de usuario en Firestore
      await this.createUserDocument(userCredential.user, displayName);
      
      return userCredential.user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Cerrar sesión
   */
  static async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Enviar email de recuperación de contraseña
   */
  static async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Obtener información del usuario actual
   */
  static async getCurrentUser(): Promise<AppUser | null> {
    const user = auth.currentUser;
    if (!user) return null;

    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        return userDoc.data() as AppUser;
      }
      return null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Actualizar perfil de usuario
   */
  static async updateUserProfile(updates: Partial<AppUser>): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Verificar si el email está autorizado
   */
  static isAuthorizedEmail(email: string): boolean {
    const authorizedDomains = process.env.REACT_APP_AUTH_DOMAIN_WHITELIST?.split(',') || [];
    const domain = email.split('@')[1];
    return authorizedDomains.includes(domain);
  }

  /**
   * Crear documento de usuario en Firestore
   */
  private static async createUserDocument(user: User, displayName?: string): Promise<void> {
    const userData: AppUser = {
      uid: user.uid,
      email: user.email!,
      displayName: displayName || user.displayName || '',
      photoURL: user.photoURL || '',
      role: this.getRoleFromEmail(user.email!),
      createdAt: new Date(),
      lastLoginAt: new Date()
    };

    await setDoc(doc(db, 'users', user.uid), userData);
  }

  /**
   * Actualizar último login
   */
  private static async updateLastLogin(uid: string): Promise<void> {
    try {
      await updateDoc(doc(db, 'users', uid), {
        lastLoginAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  }

  /**
   * Determinar rol basado en el email
   */
  private static getRoleFromEmail(email: string): 'student' | 'teacher' | 'admin' {
    const domain = email.split('@')[1];
    
    if (domain.includes('admin')) return 'admin';
    if (domain.includes('profesor') || domain.includes('teacher')) return 'teacher';
    return 'student';
  }

  /**
   * Manejar errores de autenticación
   */
  private static handleAuthError(error: any): Error {
    const errorMessages: Record<string, string> = {
      'auth/user-not-found': 'No existe una cuenta con este email',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/email-already-in-use': 'Ya existe una cuenta con este email',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
      'auth/invalid-email': 'Email inválido',
      'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
      'auth/too-many-requests': 'Demasiados intentos fallidos. Intenta más tarde',
      'auth/network-request-failed': 'Error de conexión. Verifica tu internet'
    };

    const errorCode = error.code || 'auth/unknown-error';
    const message = errorMessages[errorCode] || 'Error de autenticación desconocido';
    
    return new Error(message);
  }
}

// Funciones de conveniencia para compatibilidad
export const registerUser = async (email: string, password: string): Promise<User | null> => {
  const authService = new AuthService();
  try {
    const result = await authService.register(email, password);
    return result.user;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email: string, password: string): Promise<User | null> => {
  const authService = new AuthService();
  try {
    const result = await authService.login(email, password);
    return result.user;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  const authService = new AuthService();
  try {
    await authService.logout();
  } catch (error) {
    throw error;
  }
};
