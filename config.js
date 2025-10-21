// Configuración de Firebase para Desarrollo - Cálculo Diferencial
// Este archivo contiene configuraciones adicionales para desarrollo local

// Configuración de desarrollo
const DEV_CONFIG = {
    // Configuración de Firebase
    firebase: {
        apiKey: "AIzaSyCxtuk-lke_oxXzN8xWY37eRjpiXWM5kxc",
        authDomain: "cursocalculodiferencial-49648.firebaseapp.com",
        projectId: "cursocalculodiferencial-49648",
        storageBucket: "cursocalculodiferencial-49648.firebasestorage.app",
        messagingSenderId: "617467179231",
        appId: "1:617467179231:web:593e3b771d0d207a87b96a",
        measurementId: "G-LRYT2Y0XWB"
    },
    
    // Configuración de la aplicación
    app: {
        name: "Curso de Cálculo Diferencial",
        version: "1.0.0",
        environment: "development",
        debug: true
    },
    
    // Configuración de módulos
    modules: {
        count: 5,
        list: [
            { id: 1, name: "Relaciones y Funciones", file: "modulo1_relaciones_funciones.html" },
            { id: 2, name: "Límites", file: "modulo2_limites.html" },
            { id: 3, name: "Continuidad", file: "modulo3_continuidad.html" },
            { id: 4, name: "La Derivada", file: "modulo4_la_derivada.html" },
            { id: 5, name: "Aplicaciones de la Derivada", file: "modulo5_aplicaciones_derivada.html" }
        ]
    },
    
    // Configuración de evaluación
    evaluation: {
        passingScore: 70,
        maxAttempts: 3,
        timeLimitMinutes: 120,
        allowRetake: true
    },
    
    // Configuración de recursos
    resources: {
        enableOfflineMode: false,
        cacheDurationHours: 24,
        maxFileSizeMB: 50,
        allowedFileTypes: ['pdf', 'html', 'css', 'js', 'png', 'jpg', 'svg']
    },
    
    // Configuración de seguridad
    security: {
        enableHTTPS: true,
        sessionTimeoutMinutes: 60,
        maxLoginAttempts: 5,
        passwordMinLength: 6,
        requireEmailVerification: false
    },
    
    // Configuración de desarrollo
    development: {
        enableConsoleLogs: true,
        enablePerformanceMonitoring: true,
        enableErrorReporting: true,
        mockData: false
    }
};

// Configuración de producción
const PROD_CONFIG = {
    ...DEV_CONFIG,
    app: {
        ...DEV_CONFIG.app,
        environment: "production",
        debug: false
    },
    development: {
        enableConsoleLogs: false,
        enablePerformanceMonitoring: true,
        enableErrorReporting: true,
        mockData: false
    },
    security: {
        ...DEV_CONFIG.security,
        requireEmailVerification: true
    }
};

// Función para obtener la configuración según el entorno
function getConfig() {
    const isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1' ||
                         window.location.hostname.includes('dev');
    
    return isDevelopment ? DEV_CONFIG : PROD_CONFIG;
}

// Función para inicializar la configuración
function initializeConfig() {
    const config = getConfig();
    
    // Configurar Firebase
    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(config.firebase);
    }
    
    // Configurar logging
    if (config.development.enableConsoleLogs) {
        console.log('🔧 Modo de desarrollo activado');
        console.log('📊 Configuración:', config);
    }
    
    // Configurar monitoreo de rendimiento
    if (config.development.enablePerformanceMonitoring) {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`⚡ Tiempo de carga: ${loadTime.toFixed(2)}ms`);
        });
    }
    
    return config;
}

// Función para validar la configuración
function validateConfig(config) {
    const required = ['firebase', 'app', 'modules'];
    const missing = required.filter(key => !config[key]);
    
    if (missing.length > 0) {
        console.error('❌ Configuración incompleta. Faltan:', missing);
        return false;
    }
    
    // Validar configuración de Firebase
    const firebaseRequired = ['apiKey', 'authDomain', 'projectId'];
    const firebaseMissing = firebaseRequired.filter(key => !config.firebase[key]);
    
    if (firebaseMissing.length > 0) {
        console.error('❌ Configuración de Firebase incompleta. Faltan:', firebaseMissing);
        return false;
    }
    
    console.log('✅ Configuración válida');
    return true;
}

// Función para obtener información del módulo actual
function getCurrentModuleInfo() {
    const path = window.location.pathname;
    const config = getConfig();
    
    for (let module of config.modules.list) {
        if (path.includes(module.file)) {
            return module;
        }
    }
    
    return null;
}

// Función para obtener el siguiente módulo
function getNextModule(currentModuleId) {
    const config = getConfig();
    const currentIndex = config.modules.list.findIndex(m => m.id === currentModuleId);
    
    if (currentIndex < config.modules.list.length - 1) {
        return config.modules.list[currentIndex + 1];
    }
    
    return null;
}

// Función para obtener el módulo anterior
function getPreviousModule(currentModuleId) {
    const config = getConfig();
    const currentIndex = config.modules.list.findIndex(m => m.id === currentModuleId);
    
    if (currentIndex > 0) {
        return config.modules.list[currentIndex - 1];
    }
    
    return null;
}

// Exportar funciones para uso global
window.CONFIG = {
    get: getConfig,
    init: initializeConfig,
    validate: validateConfig,
    getCurrentModule: getCurrentModuleInfo,
    getNextModule: getNextModule,
    getPreviousModule: getPreviousModule
};

// Inicializar automáticamente
document.addEventListener('DOMContentLoaded', function() {
    const config = initializeConfig();
    validateConfig(config);
});

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DEV_CONFIG,
        PROD_CONFIG,
        getConfig,
        initializeConfig,
        validateConfig
    };
}
