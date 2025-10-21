// Sistema de Navegación entre Módulos - Cálculo Diferencial
// Este archivo proporciona navegación consistente entre todos los módulos

class ModuleNavigation {
    constructor() {
        this.modules = {
            1: {
                title: "Relaciones y Funciones",
                file: "modulo1_relaciones_funciones.html",
                description: "Conceptos fundamentales de relaciones y funciones"
            },
            2: {
                title: "Límites",
                file: "modulo2_limites.html",
                description: "Concepto de límite como fundamento del cálculo"
            },
            3: {
                title: "Continuidad",
                file: "modulo3_continuidad.html",
                description: "Análisis de continuidad en funciones"
            },
            4: {
                title: "La Derivada",
                file: "modulo4_la_derivada.html",
                description: "Concepto de derivada y técnicas de derivación"
            },
            5: {
                title: "Aplicaciones de la Derivada",
                file: "modulo5_aplicaciones_derivada.html",
                description: "Optimización y análisis de funciones"
            }
        };
        
        this.currentModule = this.getCurrentModule();
        this.init();
    }
    
    init() {
        this.createNavigationBar();
        this.addNavigationButtons();
        this.updateProgress();
    }
    
    getCurrentModule() {
        const path = window.location.pathname;
        for (let [id, module] of Object.entries(this.modules)) {
            if (path.includes(module.file)) {
                return parseInt(id);
            }
        }
        return 1; // Default
    }
    
    createNavigationBar() {
        // Crear barra de navegación si no existe
        if (!document.getElementById('module-navigation')) {
            const navHTML = `
                <nav id="module-navigation" class="module-nav">
                    <div class="container">
                        <div class="nav-content">
                            <div class="nav-brand">
                                <a href="index.html">
                                    <i class="fas fa-calculator"></i>
                                    Cálculo Diferencial
                                </a>
                            </div>
                            <div class="nav-modules">
                                ${Object.entries(this.modules).map(([id, module]) => `
                                    <a href="${module.file}" 
                                       class="nav-module ${this.currentModule == id ? 'active' : ''}"
                                       data-module="${id}">
                                        <span class="module-number">${id}</span>
                                        <span class="module-title">${module.title}</span>
                                    </a>
                                `).join('')}
                            </div>
                            <div class="nav-controls">
                                <button id="prev-module" class="nav-btn" title="Módulo Anterior">
                                    <i class="fas fa-chevron-left"></i>
                                </button>
                                <button id="next-module" class="nav-btn" title="Siguiente Módulo">
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                                <a href="index.html" class="nav-btn" title="Volver al Inicio">
                                    <i class="fas fa-home"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            `;
            
            // Insertar al inicio del body
            document.body.insertAdjacentHTML('afterbegin', navHTML);
            
            // Agregar estilos
            this.addNavigationStyles();
        }
    }
    
    addNavigationStyles() {
        const styles = `
            <style>
                .module-nav {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 1rem 0;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                }
                
                .nav-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 1rem;
                }
                
                .nav-brand a {
                    color: white;
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 1.2rem;
                }
                
                .nav-modules {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }
                
                .nav-module {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    border-radius: 25px;
                    text-decoration: none;
                    color: white;
                    transition: all 0.3s ease;
                    background: rgba(255,255,255,0.1);
                }
                
                .nav-module:hover {
                    background: rgba(255,255,255,0.2);
                    transform: translateY(-2px);
                }
                
                .nav-module.active {
                    background: rgba(255,255,255,0.3);
                    font-weight: 600;
                }
                
                .module-number {
                    background: rgba(255,255,255,0.2);
                    border-radius: 50%;
                    width: 25px;
                    height: 25px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8rem;
                    font-weight: 600;
                }
                
                .nav-controls {
                    display: flex;
                    gap: 0.5rem;
                }
                
                .nav-btn {
                    background: rgba(255,255,255,0.1);
                    border: none;
                    color: white;
                    padding: 0.5rem;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-decoration: none;
                }
                
                .nav-btn:hover {
                    background: rgba(255,255,255,0.2);
                    transform: translateY(-2px);
                }
                
                .nav-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                @media (max-width: 768px) {
                    .nav-content {
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                    
                    .nav-modules {
                        justify-content: center;
                    }
                    
                    .nav-module {
                        padding: 0.3rem 0.8rem;
                        font-size: 0.9rem;
                    }
                    
                    .module-title {
                        display: none;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
    
    addNavigationButtons() {
        // Botones de navegación anterior/siguiente
        const prevBtn = document.getElementById('prev-module');
        const nextBtn = document.getElementById('next-module');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.goToPreviousModule());
            prevBtn.disabled = this.currentModule <= 1;
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.goToNextModule());
            nextBtn.disabled = this.currentModule >= Object.keys(this.modules).length;
        }
    }
    
    goToPreviousModule() {
        if (this.currentModule > 1) {
            const prevModule = this.currentModule - 1;
            window.location.href = this.modules[prevModule].file;
        }
    }
    
    goToNextModule() {
        if (this.currentModule < Object.keys(this.modules).length) {
            const nextModule = this.currentModule + 1;
            window.location.href = this.modules[nextModule].file;
        }
    }
    
    updateProgress() {
        // Actualizar progreso del módulo actual
        const progressElement = document.querySelector('.progress-bar .progress-fill');
        if (progressElement) {
            // Simular progreso basado en actividades completadas
            const completedActivities = document.querySelectorAll('.completed').length;
            const totalActivities = document.querySelectorAll('[data-activity]').length;
            const progress = totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0;
            
            progressElement.style.width = progress + '%';
        }
    }
    
    // Método para marcar actividad como completada
    markActivityComplete(activityId) {
        const activity = document.querySelector(`[data-activity="${activityId}"]`);
        if (activity) {
            activity.classList.add('completed');
            this.updateProgress();
        }
    }
    
    // Método para obtener información del módulo actual
    getCurrentModuleInfo() {
        return this.modules[this.currentModule];
    }
    
    // Método para navegar a un módulo específico
    goToModule(moduleId) {
        if (this.modules[moduleId]) {
            window.location.href = this.modules[moduleId].file;
        }
    }
}

// Inicializar navegación cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    window.moduleNavigation = new ModuleNavigation();
});

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModuleNavigation;
}
