// Sistema de Autenticación para Cálculo Diferencial
import { auth, db } from './firebase-config.js';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc,
  query,
  where,
  getDocs
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

class AuthManager {
  constructor() {
    this.currentUser = null;
    this.isAdmin = false;
    this.init();
  }

  async init() {
    // Escuchar cambios en el estado de autenticación
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.currentUser = user;
        await this.checkAdminStatus(user.uid);
        this.updateUI();
      } else {
        this.currentUser = null;
        this.isAdmin = false;
        this.updateUI();
      }
    });
  }

  async checkAdminStatus(uid) {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        this.isAdmin = userData.role === 'admin';
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      this.isAdmin = false;
    }
  }

  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: this.getErrorMessage(error.code) };
    }
  }

  async register(email, password, userData = {}) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Guardar datos adicionales del usuario en Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        name: userData.name || '',
        role: 'student', // Por defecto es estudiante
        createdAt: new Date(),
        courseAccess: {
          calculoDiferencial: true
        },
        progress: {
          modulo1: 0,
          modulo2: 0,
          modulo3: 0,
          modulo4: 0,
          modulo5: 0
        }
      });

      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: this.getErrorMessage(error.code) };
    }
  }

  async logout() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      return { success: false, error: this.getErrorMessage(error.code) };
    }
  }

  async updateUserProgress(modulo, progreso) {
    if (!this.currentUser) return { success: false, error: 'Usuario no autenticado' };

    try {
      const userRef = doc(db, 'users', this.currentUser.uid);
      await setDoc(userRef, {
        [`progress.modulo${modulo}`]: progreso
      }, { merge: true });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getAllUsers() {
    if (!this.isAdmin) return { success: false, error: 'Acceso denegado' };

    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const users = [];
      usersSnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, users };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateUserRole(userId, newRole) {
    if (!this.isAdmin) return { success: false, error: 'Acceso denegado' };

    try {
      await setDoc(doc(db, 'users', userId), {
        role: newRole
      }, { merge: true });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  getErrorMessage(errorCode) {
    const errorMessages = {
      'auth/user-not-found': 'Usuario no encontrado',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/email-already-in-use': 'El email ya está registrado',
      'auth/weak-password': 'La contraseña es muy débil',
      'auth/invalid-email': 'Email inválido',
      'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
      'auth/network-request-failed': 'Error de conexión'
    };
    
    return errorMessages[errorCode] || 'Error desconocido';
  }

  updateUI() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const userInfo = document.getElementById('userInfo');
    const logoutBtn = document.getElementById('logoutBtn');
    const adminPanel = document.getElementById('adminPanel');

    if (this.currentUser) {
      // Usuario autenticado
      if (loginForm) loginForm.style.display = 'none';
      if (registerForm) registerForm.style.display = 'none';
      if (userInfo) {
        userInfo.style.display = 'block';
        userInfo.innerHTML = `
          <div class="user-welcome">
            <h3>¡Bienvenido, ${this.currentUser.email}!</h3>
            <p>Rol: ${this.isAdmin ? 'Administrador' : 'Estudiante'}</p>
          </div>
        `;
      }
      if (logoutBtn) logoutBtn.style.display = 'block';
      if (adminPanel && this.isAdmin) adminPanel.style.display = 'block';
      
      // Mostrar contenido del curso
      this.showCourseContent();
    } else {
      // Usuario no autenticado
      if (loginForm) loginForm.style.display = 'block';
      if (userInfo) userInfo.style.display = 'none';
      if (logoutBtn) logoutBtn.style.display = 'none';
      if (adminPanel) adminPanel.style.display = 'none';
      
      // Ocultar contenido del curso
      this.hideCourseContent();
    }
  }

  showCourseContent() {
    const courseContent = document.getElementById('courseContent');
    if (courseContent) courseContent.style.display = 'block';
  }

  hideCourseContent() {
    const courseContent = document.getElementById('courseContent');
    if (courseContent) courseContent.style.display = 'none';
  }

  isAuthenticated() {
    return this.currentUser !== null;
  }

  hasAccess() {
    return this.isAuthenticated();
  }
}

// Crear instancia global
const authManager = new AuthManager();

// Exportar para uso en otros archivos
export default authManager;
