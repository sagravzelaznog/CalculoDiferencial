// CONFIGURACIÓN DE FIREBASE - ARCHIVO DE EJEMPLO
// Copia este archivo como firebase-config.js y reemplaza los valores con tus credenciales reales

const firebaseConfig = {
  // Reemplaza con tu API Key de Firebase
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  
  // Reemplaza con tu Auth Domain
  authDomain: "tu-proyecto-calculo.firebaseapp.com",
  
  // Reemplaza con tu Project ID
  projectId: "tu-proyecto-calculo",
  
  // Reemplaza con tu Storage Bucket
  storageBucket: "tu-proyecto-calculo.appspot.com",
  
  // Reemplaza con tu Messaging Sender ID
  messagingSenderId: "123456789012",
  
  // Reemplaza con tu App ID
  appId: "1:123456789012:web:abcdef123456789"
};

// PASOS PARA CONFIGURAR:
// 1. Ve a https://console.firebase.google.com/
// 2. Crea un nuevo proyecto llamado "calculo-diferencial" (o el nombre que prefieras)
// 3. Habilita Authentication > Sign-in method > Email/Password
// 4. Habilita Firestore Database
// 5. Ve a Project Settings > General > Your apps > Web app
// 6. Copia la configuración y reemplaza los valores arriba
// 7. Guarda este archivo como firebase-config.js (sin .example)

// Inicializar Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
