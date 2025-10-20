// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { AuthService } from '../services/authService';
import { User as AppUser } from '../types/course';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setError(null);
      
      if (user) {
        try {
          const appUserData = await AuthService.getCurrentUser();
          setAppUser(appUserData);
        } catch (err) {
          console.error('Error loading user data:', err);
          setError('Error al cargar datos del usuario');
        }
      } else {
        setAppUser(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      if (!AuthService.isAuthorizedEmail(email)) {
        throw new Error('Este email no está autorizado para acceder al curso');
      }
      
      await AuthService.login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, displayName?: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      if (!AuthService.isAuthorizedEmail(email)) {
        throw new Error('Este email no está autorizado para registrarse');
      }
      
      await AuthService.register(email, password, displayName);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrarse');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await AuthService.logout();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cerrar sesión');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      setError(null);
      await AuthService.resetPassword(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar email de recuperación');
      throw err;
    }
  };

  const updateProfile = async (updates: Partial<AppUser>): Promise<void> => {
    try {
      setError(null);
      await AuthService.updateUserProfile(updates);
      
      // Recargar datos del usuario
      const updatedUser = await AuthService.getCurrentUser();
      setAppUser(updatedUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar perfil');
      throw err;
    }
  };

  return {
    user,
    appUser,
    loading,
    error,
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
    isAuthenticated: !!user,
    isAuthorized: !!appUser
  };
};
