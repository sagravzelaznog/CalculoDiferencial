// Configuración de Firebase para el curso de Cálculo Diferencial
// IMPORTANTE: Reemplaza estos valores con tus credenciales reales de Firebase

const firebaseConfig = {
  apiKey: "AIzaSyCxtuk-lke_oxXzN8xWY37eRjpiXWM5kxc",
  authDomain: "cursocalculodiferencial-49648.firebaseapp.com",
  projectId: "cursocalculodiferencial-49648",
  storageBucket: "cursocalculodiferencial-49648.firebasestorage.app",
  messagingSenderId: "617467179231",
  appId: "1:617467179231:web:593e3b771d0d207a87b96a",
  measurementId: "G-LRYT2Y0XWB"
};

// Inicializar Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };